import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ArrowUpRight, ChevronDown, ChevronUp, RotateCcw, Sparkles } from "lucide-react";
import {
  createContactShadowTexture,
  createStudioEnvironment,
  detectSoftwareWebGL,
  isLightThemeActive,
  isWebGLAvailable,
  scheduleAfterSoftwareDraw,
} from "./webglUtils";
import {
  createSectionScene,
  type SceneHotspotMeta,
  type SectionSceneVariant,
} from "./sectionSceneBuilders";

export interface Section3DStageProps {
  variant: SectionSceneVariant;
  badge: string;
  heightClass?: string;
  activeHotspotId?: string | null;
  onHotspotSelect?: (id: string) => void;
  onHotspotAction?: (id: string) => void;
  className?: string;
}

// Reusable scratch vectors for zero-GC raycasting
const _pointerNdc = new THREE.Vector2();
const _raycaster = new THREE.Raycaster();

const Section3DStage = ({
  variant,
  badge,
  heightClass = "h-[300px] sm:h-[340px] md:h-[380px]",
  activeHotspotId,
  onHotspotSelect,
  onHotspotAction,
  className = "",
}: Section3DStageProps) => {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const canvasHostRef = useRef<HTMLDivElement | null>(null);

  const [webglReady, setWebglReady] = useState<boolean>(true);
  const [inRange, setInRange] = useState<boolean>(false);
  const [hudOpen, setHudOpen] = useState<boolean>(true);
  const [hotspots, setHotspots] = useState<SceneHotspotMeta[]>([]);
  const [internalActiveId, setInternalActiveId] = useState<string | null>(null);

  const effectiveActiveId = activeHotspotId !== undefined ? activeHotspotId : internalActiveId;
  const activeIdRef = useRef<string | null>(effectiveActiveId);
  activeIdRef.current = effectiveActiveId;

  const onHotspotSelectRef = useRef(onHotspotSelect);
  onHotspotSelectRef.current = onHotspotSelect;

  const isControlledRef = useRef<boolean>(activeHotspotId !== undefined);
  isControlledRef.current = activeHotspotId !== undefined;

  const pulseEnergyRef = useRef<number>(0);
  const resetCameraFnRef = useRef<(() => void) | null>(null);

  // Viewport-scoped mount/unmount with hysteresis to keep active WebGL contexts <= 3
  useEffect(() => {
    if (!isWebGLAvailable()) {
      setWebglReady(false);
      return;
    }
    const el = outerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInRange(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setInRange(entry.isIntersecting);
        }
      },
      { rootMargin: "260px 0px", threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Initialize Three.js PBR studio scene only while in viewport range
  useEffect(() => {
    if (!webglReady || !inRange) return;
    const host = canvasHostRef.current;
    if (!host) return;

    const isSoftwareGl = detectSoftwareWebGL();
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.5 : 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);

    const width = Math.max(host.clientWidth, 300);
    const height = Math.max(host.clientHeight, 260);
    renderer.setSize(width, height);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.touchAction = "pan-y";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const envTex = createStudioEnvironment(renderer);
    scene.environment = envTex;

    const built = createSectionScene(
      variant,
      isSoftwareGl,
      renderer.capabilities.getMaxAnisotropy()
    );
    scene.add(built.root);
    setHotspots(built.hotspots);
    if (!isControlledRef.current && built.hotspots.length > 0) {
      setInternalActiveId((prev) => prev ?? built.hotspots[0].id);
    }

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 60);
    camera.position.set(...built.cameraPos);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(...built.cameraTarget);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.minPolarAngle = Math.PI * 0.16;
    controls.maxPolarAngle = Math.PI * 0.48;
    controls.rotateSpeed = 0.65;
    controls.update();

    resetCameraFnRef.current = () => {
      camera.position.set(...built.cameraPos);
      controls.target.set(...built.cameraTarget);
      controls.update();
      pulseEnergyRef.current = 0.85;
    };

    // Three-point warm/cool studio lighting rig
    const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x0f172a, 0.95);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff1dc, 2.05);
    keyLight.position.set(4.5, 6.5, 4.5);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.left = -4;
      keyLight.shadow.camera.right = 4;
      keyLight.shadow.camera.top = 4;
      keyLight.shadow.camera.bottom = -4;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.15);
    rimLight.position.set(-4.2, 3.6, -4.5);
    scene.add(rimLight);

    // Soft grounded contact shadow plane
    const shadowTex = createContactShadowTexture();
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.42,
    });
    const shadowPlane = new THREE.Mesh(new THREE.PlaneGeometry(5.8, 5.8), shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0.01;
    scene.add(shadowPlane);

    // Theme synchronization
    let isLight = isLightThemeActive();
    const applyTheme = () => {
      isLight = isLightThemeActive();
      hemiLight.intensity = isLight ? 1.25 : 0.92;
      keyLight.intensity = isLight ? 2.2 : 2.05;
      shadowMat.opacity = isLight ? 0.24 : 0.44;
    };
    applyTheme();
    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Raycasting hover & click handling (throttled pointermove)
    let lastMoveTs = 0;
    let pointerDownX = 0;
    let pointerDownY = 0;

    const findHotspotId = (obj: THREE.Object3D | null): string | null => {
      let cur: THREE.Object3D | null = obj;
      while (cur) {
        if (typeof cur.userData?.hotspotId === "string") {
          return cur.userData.hotspotId;
        }
        cur = cur.parent;
      }
      return null;
    };

    const raycastAt = (clientX: number, clientY: number): string | null => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return null;
      _pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      _pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      _raycaster.setFromCamera(_pointerNdc, camera);
      const hits = _raycaster.intersectObjects(built.interactables, false);
      if (hits.length === 0) return null;
      return findHotspotId(hits[0].object);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastMoveTs < 40) return;
      lastMoveTs = now;
      const hitId = raycastAt(e.clientX, e.clientY);
      renderer.domElement.style.cursor = hitId ? "pointer" : "grab";
    };

    const handlePointerDown = (e: PointerEvent) => {
      pointerDownX = e.clientX;
      pointerDownY = e.clientY;
    };

    const handlePointerUp = (e: PointerEvent) => {
      const moved = Math.hypot(e.clientX - pointerDownX, e.clientY - pointerDownY);
      if (moved > 8) return; // User was orbiting, not clicking
      const hitId = raycastAt(e.clientX, e.clientY);
      if (hitId) {
        pulseEnergyRef.current = 0.9;
        setInternalActiveId(hitId);
        onHotspotSelectRef.current?.(hitId);
      }
    };

    renderer.domElement.addEventListener("pointermove", handlePointerMove);
    renderer.domElement.addEventListener("pointerdown", handlePointerDown);
    renderer.domElement.addEventListener("pointerup", handlePointerUp);

    // WebGL context loss safety
    let contextLost = false;
    const onContextLost = (ev: Event) => {
      ev.preventDefault();
      contextLost = true;
    };
    const onContextRestored = () => {
      contextLost = false;
    };
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);
    renderer.domElement.addEventListener("webglcontextrestored", onContextRestored);

    // ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const w = Math.max(Math.floor(entry.contentRect.width), 280);
      const h = Math.max(Math.floor(entry.contentRect.height), 240);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(host);

    // Frame loop with software-WebGL pacing & reduced-motion support
    let disposed = false;
    let frameId = 0;
    let timerId = 0;
    const clock = new THREE.Clock();
    let elapsed = 0;

    const tick = () => {
      if (disposed) return;
      const rawDt = Math.min(clock.getDelta(), 0.05);
      const dt = prefersReducedMotion ? 0 : rawDt;
      elapsed += dt;

      if (pulseEnergyRef.current > 0.001) {
        pulseEnergyRef.current = THREE.MathUtils.damp(pulseEnergyRef.current, 0, 4.5, rawDt);
      } else {
        pulseEnergyRef.current = 0;
      }

      if (!contextLost) {
        built.update(dt, elapsed, activeIdRef.current, isLight, pulseEnergyRef.current);
        controls.update();
        renderer.render(scene, camera);
      }

      if (isSoftwareGl) {
        scheduleAfterSoftwareDraw(renderer, tick, (id) => {
          timerId = id;
        });
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      window.clearTimeout(timerId);
      resetCameraFnRef.current = null;
      resizeObserver.disconnect();
      themeObserver.disconnect();
      renderer.domElement.removeEventListener("pointermove", handlePointerMove);
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      renderer.domElement.removeEventListener("pointerup", handlePointerUp);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      renderer.domElement.removeEventListener("webglcontextrestored", onContextRestored);
      controls.dispose();
      built.dispose();
      shadowPlane.geometry.dispose();
      shadowMat.dispose();
      shadowTex.dispose();
      envTex.dispose();
      const gl = renderer.getContext();
      renderer.dispose();
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, [variant, webglReady, inRange]);

  const activeMeta =
    hotspots.find((h) => h.id === effectiveActiveId) || hotspots[0] || null;

  const handleSelectChip = (id: string) => {
    pulseEnergyRef.current = 0.8;
    setInternalActiveId(id);
    onHotspotSelect?.(id);
  };

  return (
    <div
      ref={outerRef}
      className={`relative w-full flex flex-col rounded-2xl border border-primary/25 bg-card/45 overflow-hidden select-none ${className}`}
    >
      {/* Title row ABOVE the 3D area, so it never covers the model */}
      <div className="flex items-center justify-between gap-2 px-3 pt-3 pb-1">
        <span className="inline-flex min-w-0 items-center gap-1.5 rounded-lg border border-border/80 bg-card/95 px-2.5 py-1 text-[11px] font-mono text-primary">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span className="truncate">{badge}</span>
        </span>
        <span className="hidden sm:inline-flex shrink-0 rounded-lg border border-border/70 bg-card/90 px-2.5 py-1 text-[10px] font-mono text-muted-foreground">
          Drag to orbit · Click nodes
        </span>
      </div>

      {/* 3D area: only the canvas lives here, nothing is drawn on top of it */}
      <div className={`relative w-full ${heightClass}`}>
        {/* Subtle studio floor vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.10)_0%,transparent_68%)]"
        />

        {/* Dedicated isolated WebGL canvas mount */}
        <div ref={canvasHostRef} className="absolute inset-0 w-full h-full" />

        {/* Graceful fallback if WebGL unavailable */}
        {!webglReady && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <Sparkles className="w-7 h-7 text-primary mb-2" />
            <p className="text-sm font-semibold text-foreground">{badge}</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              Interactive 3D view requires WebGL support in your browser.
            </p>
          </div>
        )}
      </div>

      {/* Control panel BELOW the 3D area (no longer overlaid on the model) */}
      {hotspots.length > 0 && (
        <div className="relative w-full px-3 pb-3 pt-1 mx-auto max-w-2xl flex flex-col items-center">
          <button
            type="button"
            onClick={() => setHudOpen((v) => !v)}
            className="mb-1 inline-flex items-center gap-1 rounded-t-lg border border-b-0 border-border/80 bg-card/95 px-2.5 py-0.5 text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            aria-label={hudOpen ? "Collapse 3D inspector" : "Expand 3D inspector"}
          >
            {hudOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
            <span>{hudOpen ? "Hide HUD" : "Show HUD"}</span>
          </button>

          {hudOpen && activeMeta && (
            <div className="w-full rounded-xl border border-border/80 bg-card/95 px-3 py-2.5 shadow-lg">
              {/* Quick selector buttons */}
              <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
                <div className="flex flex-wrap items-center gap-1">
                  {hotspots.map((item) => {
                    const isSel = item.id === activeMeta.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectChip(item.id)}
                        className={`px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-mono transition-colors cursor-pointer border ${
                          isSel
                            ? "bg-primary text-primary-foreground border-primary font-semibold"
                            : "bg-secondary/70 text-secondary-foreground border-border/70 hover:border-primary/50"
                        }`}
                      >
                        {item.label.split("·")[0].trim()}
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => resetCameraFnRef.current?.()}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-border/80 bg-secondary/60 text-[10px] font-mono text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors cursor-pointer shrink-0"
                  title="Reset 3D camera"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Active node metadata */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1.5 border-t border-border/60">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <span
                      className="inline-block w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: activeMeta.accent }}
                    />
                    <span className="text-xs sm:text-sm font-semibold text-foreground truncate">
                      {activeMeta.label}
                    </span>
                    <span className="text-[11px] font-mono text-primary">{activeMeta.metric}</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-1 mt-0.5">
                    {activeMeta.detail}
                  </p>
                </div>

                {activeMeta.actionLabel && onHotspotAction && (
                  <button
                    type="button"
                    onClick={() => onHotspotAction(activeMeta.id)}
                    className="inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-lg bg-primary/15 border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground text-[11px] font-mono font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-center"
                  >
                    <span>{activeMeta.actionLabel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Section3DStage;
