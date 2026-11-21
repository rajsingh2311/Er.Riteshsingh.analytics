import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sparkles,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
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

const MIN_ZOOM = 0.75;
const MAX_ZOOM = 3.0;

// Reusable scratch vectors for zero-GC raycasting & zoom damping
const _pointerNdc = new THREE.Vector2();
const _raycaster = new THREE.Raycaster();
const _camOffset = new THREE.Vector3();

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
  const [zoom, setZoom] = useState<number>(1);
  const [wheelActive, setWheelActive] = useState<boolean>(false);

  const effectiveActiveId = activeHotspotId !== undefined ? activeHotspotId : internalActiveId;
  const activeIdRef = useRef<string | null>(effectiveActiveId);
  activeIdRef.current = effectiveActiveId;

  const onHotspotSelectRef = useRef(onHotspotSelect);
  onHotspotSelectRef.current = onHotspotSelect;

  const isControlledRef = useRef<boolean>(activeHotspotId !== undefined);
  isControlledRef.current = activeHotspotId !== undefined;

  const pulseEnergyRef = useRef<number>(0);
  const zoomRef = useRef<number>(1);
  const wheelActiveRef = useRef<boolean>(false);
  const applyZoomFnRef = useRef<((z: number) => void) | null>(null);
  const resetCameraFnRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    wheelActiveRef.current = wheelActive;
  }, [wheelActive]);

  const broadcastZoom = useCallback((nextZoom: number) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("three-viewport-update", {
        detail: { zoom: nextZoom, mode: "stage" },
      })
    );
  }, []);

  const updateZoom = useCallback(
    (next: number | ((prev: number) => number)) => {
      setZoom((prev) => {
        const raw = typeof next === "function" ? next(prev) : next;
        const clamped = Math.round(THREE.MathUtils.clamp(raw, MIN_ZOOM, MAX_ZOOM) * 100) / 100;
        zoomRef.current = clamped;
        applyZoomFnRef.current?.(clamped);
        broadcastZoom(clamped);
        return clamped;
      });
    },
    [broadcastZoom]
  );

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
    const isSmall = window.innerWidth < 768;
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

    const basePixelRatio = isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, isSmall ? 1.5 : 2);
    const hdPixelRatio = isSoftwareGl
      ? 1
      : Math.min(Math.max(window.devicePixelRatio, 1.5) * (isSmall ? 1.25 : 1.55), 3);
    let currentPixelRatio = zoomRef.current > 1.14 ? hdPixelRatio : basePixelRatio;
    renderer.setPixelRatio(currentPixelRatio);

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

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.04, 60);
    camera.position.set(...built.cameraPos);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(...built.cameraTarget);
    controls.enablePan = false;
    controls.enableZoom = false; // Handled via smooth HD zoom system
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.minPolarAngle = Math.PI * 0.14;
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.rotateSpeed = 0.65;

    // Auto-framing: fit the whole model inside the card at any size/aspect
    built.root.updateMatrixWorld(true);
    const fitBox = new THREE.Box3().setFromObject(built.root);
    const fitCenter = fitBox.getCenter(new THREE.Vector3());
    const fitSize = fitBox.getSize(new THREE.Vector3());
    const halfWidth = Math.hypot(fitSize.x, fitSize.z) / 2;
    const halfHeight = fitSize.y / 2;
    const viewDir = new THREE.Vector3(...built.cameraPos)
      .sub(new THREE.Vector3(...built.cameraTarget))
      .normalize();

    let baseFitDistance = 5;
    let zoomDamping = false;
    let resettingPose = false;
    const defaultCamPos = new THREE.Vector3();

    const computeFitDistance = () => {
      const vFov = THREE.MathUtils.degToRad(camera.fov);
      const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
      const fitH = halfHeight / Math.tan(vFov / 2);
      const fitW = halfWidth / Math.tan(hFov / 2);
      return (Math.max(fitH, fitW) + halfWidth * 0.55) * 1.04;
    };

    const fitCamera = () => {
      baseFitDistance = computeFitDistance();
      const distance = baseFitDistance / zoomRef.current;
      controls.target.copy(fitCenter);
      camera.position.copy(fitCenter).addScaledVector(viewDir, distance);
      camera.near = Math.max(0.02, Math.min(0.05, distance * 0.02));
      camera.far = baseFitDistance + halfWidth * 4 + 14;
      camera.updateProjectionMatrix();
      controls.update();
    };
    fitCamera();

    const syncHdPixelRatio = (z: number) => {
      const nextDpr = z > 1.14 ? hdPixelRatio : basePixelRatio;
      if (Math.abs(nextDpr - currentPixelRatio) > 0.05) {
        currentPixelRatio = nextDpr;
        renderer.setPixelRatio(currentPixelRatio);
      }
    };

    applyZoomFnRef.current = (nextZ: number) => {
      zoomDamping = true;
      resettingPose = false;
      syncHdPixelRatio(nextZ);
    };

    resetCameraFnRef.current = () => {
      zoomRef.current = 1;
      setZoom(1);
      syncHdPixelRatio(1);
      resettingPose = true;
      zoomDamping = true;
      pulseEnergyRef.current = 0.85;
      broadcastZoom(1);
    };

    const onControlStart = () => {
      resettingPose = false;
    };
    controls.addEventListener("start", onControlStart);

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

    // Raycasting hover & click handling + HD wheel/pinch/double-click zoom
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
      setWheelActive(true);
    };

    const handleDocPointerDown = (e: PointerEvent) => {
      if (!host.contains(e.target as Node)) {
        setWheelActive(false);
      }
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

    const handleWheel = (e: WheelEvent) => {
      const allowWheel = e.ctrlKey || e.metaKey || e.shiftKey || wheelActiveRef.current;
      if (!allowWheel) return;
      e.preventDefault();
      const delta = -Math.sign(e.deltaY) * (Math.abs(e.deltaY) > 40 ? 0.22 : 0.12);
      updateZoom((prev) => prev + delta);
    };

    const handleDoubleClick = () => {
      updateZoom((prev) => (prev > 1.35 ? 1 : 2.0));
    };

    // Two-finger touch pinch HD zoom
    let pinchDist = 0;
    let pinchStartZoom = 1;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        pinchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        pinchStartZoom = zoomRef.current;
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && pinchDist > 10) {
        e.preventDefault();
        const currDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        updateZoom(pinchStartZoom * (currDist / pinchDist));
      }
    };

    renderer.domElement.addEventListener("pointermove", handlePointerMove);
    renderer.domElement.addEventListener("pointerdown", handlePointerDown);
    renderer.domElement.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("pointerdown", handleDocPointerDown);
    host.addEventListener("wheel", handleWheel, { passive: false });
    host.addEventListener("dblclick", handleDoubleClick);
    host.addEventListener("touchstart", handleTouchStart, { passive: true });
    host.addEventListener("touchmove", handleTouchMove, { passive: false });

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
      renderer.setSize(w, h);
      baseFitDistance = computeFitDistance();
      camera.updateProjectionMatrix();
      zoomDamping = true;
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

      // Smooth HD camera distance damping without fighting OrbitControls rotation
      const targetDist = baseFitDistance / zoomRef.current;
      if (resettingPose) {
        defaultCamPos.copy(fitCenter).addScaledVector(viewDir, targetDist);
        camera.position.x = THREE.MathUtils.damp(camera.position.x, defaultCamPos.x, 6.5, rawDt);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, defaultCamPos.y, 6.5, rawDt);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, defaultCamPos.z, 6.5, rawDt);
        controls.target.x = THREE.MathUtils.damp(controls.target.x, fitCenter.x, 6.5, rawDt);
        controls.target.y = THREE.MathUtils.damp(controls.target.y, fitCenter.y, 6.5, rawDt);
        controls.target.z = THREE.MathUtils.damp(controls.target.z, fitCenter.z, 6.5, rawDt);
        if (camera.position.distanceTo(defaultCamPos) < 0.025) {
          camera.position.copy(defaultCamPos);
          controls.target.copy(fitCenter);
          resettingPose = false;
          zoomDamping = false;
        }
      } else if (zoomDamping) {
        _camOffset.subVectors(camera.position, controls.target);
        const curDist = Math.max(0.25, _camOffset.length());
        const nextDist = THREE.MathUtils.damp(curDist, targetDist, 7.5, rawDt);
        _camOffset.normalize().multiplyScalar(nextDist);
        camera.position.copy(controls.target).add(_camOffset);
        const nextNear = Math.max(0.02, Math.min(0.05, nextDist * 0.02));
        if (Math.abs(camera.near - nextNear) > 0.002) {
          camera.near = nextNear;
          camera.updateProjectionMatrix();
        }
        if (Math.abs(nextDist - targetDist) < 0.008) {
          zoomDamping = false;
        }
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
      applyZoomFnRef.current = null;
      resetCameraFnRef.current = null;
      resizeObserver.disconnect();
      themeObserver.disconnect();
      controls.removeEventListener("start", onControlStart);
      renderer.domElement.removeEventListener("pointermove", handlePointerMove);
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      renderer.domElement.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("pointerdown", handleDocPointerDown);
      host.removeEventListener("wheel", handleWheel);
      host.removeEventListener("dblclick", handleDoubleClick);
      host.removeEventListener("touchstart", handleTouchStart);
      host.removeEventListener("touchmove", handleTouchMove);
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
  }, [variant, webglReady, inRange, broadcastZoom, updateZoom]);

  const activeMeta =
    hotspots.find((h) => h.id === effectiveActiveId) || hotspots[0] || null;

  const handleSelectChip = (id: string) => {
    pulseEnergyRef.current = 0.8;
    setInternalActiveId(id);
    onHotspotSelect?.(id);
  };

  const isHdActive = zoom > 1.14;

  return (
    <div
      ref={outerRef}
      className={`relative w-full flex flex-col rounded-2xl border border-primary/25 bg-card/45 overflow-hidden select-none ${className}`}
    >
      {/* Title & HD Zoom bar ABOVE the 3D area, so it never covers the model */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 pt-3 pb-1">
        <span className="inline-flex min-w-0 items-center gap-1.5 rounded-lg border border-border/80 bg-card/95 px-2.5 py-1 text-[11px] font-mono text-primary">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span className="truncate">{badge}</span>
        </span>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="hidden lg:inline-flex rounded-lg border border-border/70 bg-card/90 px-2 py-1 text-[10px] font-mono text-muted-foreground">
            {wheelActive ? "Scroll to HD zoom · Click outside for page" : "Drag to orbit · Click + scroll for HD zoom"}
          </span>

          {/* Always-accessible HD Zoom strip */}
          <div className="inline-flex items-center gap-0.5 rounded-lg border border-border/80 bg-card/95 p-0.5">
            <button
              type="button"
              onClick={() => updateZoom((z) => z - 0.35)}
              disabled={zoom <= MIN_ZOOM}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/70 disabled:opacity-40 transition-colors cursor-pointer"
              aria-label="Zoom out 3D model"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="min-w-[48px] text-center text-[10px] font-mono tabular-nums text-foreground">
              {Math.round(zoom * 100)}%
              {isHdActive && <span className="ml-0.5 text-[9px] font-bold text-primary">HD</span>}
            </span>
            <button
              type="button"
              onClick={() => updateZoom((z) => z + 0.35)}
              disabled={zoom >= MAX_ZOOM}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/70 disabled:opacity-40 transition-colors cursor-pointer"
              aria-label="Zoom in 3D model HD"
              title="HD Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => resetCameraFnRef.current?.()}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors cursor-pointer"
              aria-label="Reset 3D camera and zoom"
              title="Reset view"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 3D area: tagged with data-3d-viewport so the circle scroller activates ONLY here */}
      <div
        data-3d-viewport="true"
        data-three-zoom={zoom.toFixed(2)}
        data-three-mode="stage"
        className={`relative w-full ${heightClass}`}
      >
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

      {/* Control panel BELOW the 3D area (never overlaid on the model) */}
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
