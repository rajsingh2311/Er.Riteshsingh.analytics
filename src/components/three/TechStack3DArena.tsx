import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ChevronDown, ChevronUp, RotateCcw, Sparkles, Zap, ZoomIn, ZoomOut } from "lucide-react";
import {
  createStudioEnvironment,
  detectSoftwareWebGL,
  isLightThemeActive,
  isWebGLAvailable,
  scheduleAfterSoftwareDraw,
} from "./webglUtils";

export interface TechSphereItem {
  id: string;
  name: string;
  shortLabel: string;
  category: string;
  level: number;
  summary: string;
  color: string;
  accentHex: string;
}

const MIN_ZOOM = 0.75;
const MAX_ZOOM = 2.6;

const TECH_SPHERES: TechSphereItem[] = [
  {
    id: "powerbi",
    name: "Power BI (DAX)",
    shortLabel: "Power BI",
    category: "Business Intelligence",
    level: 90,
    summary: "Executive MIS dashboards, DAX measures & star-schema modeling across 30+ campuses.",
    color: "#f59e0b",
    accentHex: "#fef3c7",
  },
  {
    id: "excel",
    name: "MS Excel (MOS Expert)",
    shortLabel: "Excel",
    category: "Analytics & Modeling",
    level: 92,
    summary: "Microsoft Office Specialist certified — Power Query, PivotTables, RFM & dynamic models.",
    color: "#16a34a",
    accentHex: "#dcfce7",
  },
  {
    id: "sql",
    name: "SQL",
    shortLabel: "SQL",
    category: "Data Engineering",
    level: 85,
    summary: "Complex joins, CTEs, analytical window functions & multi-source data preparation.",
    color: "#0ea5e9",
    accentHex: "#e0f2fe",
  },
  {
    id: "python",
    name: "Python",
    shortLabel: "Python",
    category: "Data Science",
    level: 80,
    summary: "Pandas, NumPy, Scikit-Learn predictive classifiers & automated ETL scripting.",
    color: "#3b82f6",
    accentHex: "#dbeafe",
  },
  {
    id: "make",
    name: "Make.com",
    shortLabel: "Make.com",
    category: "Workflow Automation",
    level: 86,
    summary: "Real-time Meta Ads → Google Sheets → CRM pipelines cutting SLA by 65%.",
    color: "#9333ea",
    accentHex: "#f3e8ff",
  },
  {
    id: "n8n",
    name: "N8N",
    shortLabel: "N8N",
    category: "Workflow Automation",
    level: 84,
    summary: "Self-hosted webhook orchestrations, event routing & automated alert flows.",
    color: "#f43f5e",
    accentHex: "#ffe4e6",
  },
  {
    id: "wati",
    name: "WATI & CRM",
    shortLabel: "WATI",
    category: "Marketing Ops",
    level: 85,
    summary: "Automated WhatsApp lead follow-ups, interview scheduling & funnel attribution.",
    color: "#10b981",
    accentHex: "#d1fae5",
  },
  {
    id: "spss",
    name: "SPSS Statistics",
    shortLabel: "SPSS",
    category: "Statistical Rigor",
    level: 78,
    summary: "Chi-Square, T-Test, ANOVA & quantitative hypothesis testing for consumer research.",
    color: "#6366f1",
    accentHex: "#e0e7ff",
  },
  {
    id: "dax",
    name: "DAX & Power Query",
    shortLabel: "DAX",
    category: "BI Architecture",
    level: 88,
    summary: "Time-intelligence KPIs, cohort calculations & automated refresh transformations.",
    color: "#eab308",
    accentHex: "#fef9c3",
  },
  {
    id: "sixsigma",
    name: "Lean Six Sigma",
    shortLabel: "6σ Green",
    category: "Process Optimization",
    level: 84,
    summary: "Grant Thornton Green Belt certified — DMAIC, Pareto root-cause & bottleneck analysis.",
    color: "#06b6d4",
    accentHex: "#cffafe",
  },
  {
    id: "sap",
    name: "SAP / ERP",
    shortLabel: "SAP ERP",
    category: "Enterprise Operations",
    level: 70,
    summary: "Industrial plant telemetry, inventory metrics & cross-functional ops reporting.",
    color: "#2563eb",
    accentHex: "#dbeafe",
  },
  {
    id: "appsscript",
    name: "Apps Script",
    shortLabel: "Scripts",
    category: "Automation",
    level: 82,
    summary: "Single-click offer letters, automated HR trackers & scheduled KPI digests.",
    color: "#14b8a6",
    accentHex: "#ccfbf1",
  },
];

interface SphereBody {
  group: THREE.Group;
  hitMesh: THREE.Mesh;
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  radius: number;
  rotSpeed: THREE.Vector3;
  index: number;
}

const _raycaster = new THREE.Raycaster();
const _pointer = new THREE.Vector2();
const _diff = new THREE.Vector3();
const _planePoint = new THREE.Vector3();
const _plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

function createTechSphereTexture(item: TechSphereItem): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.scale(2, 2);
    // Rich dark-tinted studio ceramic base with brand color band
    const bgGrad = ctx.createLinearGradient(0, 0, 512, 512);
    bgGrad.addColorStop(0, "#0f172a");
    bgGrad.addColorStop(0.5, "#1e293b");
    bgGrad.addColorStop(1, "#090d16");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 512, 512);

    // Subtle horizontal accent bands so sphere reads crisply from every angle
    ctx.fillStyle = item.color;
    ctx.fillRect(0, 148, 512, 10);
    ctx.fillRect(0, 354, 512, 10);

    // Soft radial aura behind center text (repeated at 0deg and 180deg longitude)
    [128, 384].forEach((cx) => {
      const aura = ctx.createRadialGradient(cx, 256, 12, cx, 256, 118);
      aura.addColorStop(0, `${item.color}44`);
      aura.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = aura;
      ctx.fillRect(cx - 120, 136, 240, 240);

      // Clean badge circle
      ctx.beginPath();
      ctx.arc(cx, 256, 86, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(15, 23, 42, 0.88)";
      ctx.fill();
      ctx.lineWidth = 5;
      ctx.strokeStyle = item.color;
      ctx.stroke();

      // Main tool label
      ctx.fillStyle = "#f8fafc";
      ctx.font = "700 32px 'Space Grotesk', system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(item.shortLabel, cx, 244);

      // Proficiency percentage
      ctx.fillStyle = item.color;
      ctx.font = "600 22px 'JetBrains Mono', monospace";
      ctx.fillText(`${item.level}%`, cx, 286);
    });
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  return tex;
}

const TechStack3DArena = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [dockExpanded, setDockExpanded] = useState<boolean>(true);
  const [webglReady, setWebglReady] = useState<boolean>(true);
  const [contextLost, setContextLost] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(1);
  const [wheelActive, setWheelActive] = useState<boolean>(false);

  const zoomRef = useRef<number>(1);
  const wheelActiveRef = useRef<boolean>(false);
  const applyZoomFnRef = useRef<((z: number) => void) | null>(null);
  const scatterFnRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    wheelActiveRef.current = wheelActive;
  }, [wheelActive]);

  const broadcastZoom = useCallback((nextZoom: number) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("three-viewport-update", {
        detail: { zoom: nextZoom, mode: "arena" },
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

  useEffect(() => {
    const mount = containerRef.current;
    if (!mount) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isWebGLAvailable()) {
      setWebglReady(false);
      return;
    }

    const isSoftwareGl = detectSoftwareWebGL();
    const isSmall = window.innerWidth < 768;
    let isLight = isLightThemeActive();

    const scene = new THREE.Scene();
    const width = mount.clientWidth || 840;
    const height = mount.clientHeight || 420;

    let baseCamZ = width < 520 ? 14.5 : width < 780 ? 12.6 : 11.4;
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.25, baseCamZ);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setWebglReady(false);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const basePixelRatio = isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, isSmall ? 1.5 : 2);
    const hdPixelRatio = isSoftwareGl
      ? 1
      : Math.min(Math.max(window.devicePixelRatio, 1.5) * (isSmall ? 1.25 : 1.55), 3);
    let currentPixelRatio = basePixelRatio;
    renderer.setPixelRatio(currentPixelRatio);

    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.touchAction = "pan-y";

    mount.innerHTML = "";
    mount.appendChild(renderer.domElement);

    applyZoomFnRef.current = (nextZ: number) => {
      const nextDpr = nextZ > 1.14 ? hdPixelRatio : basePixelRatio;
      if (Math.abs(nextDpr - currentPixelRatio) > 0.05) {
        currentPixelRatio = nextDpr;
        renderer.setPixelRatio(currentPixelRatio);
      }
    };

    const envTexture = createStudioEnvironment(renderer);
    scene.environment = envTexture;
    const maxAnisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 16);

    // Lighting
    const hemiLight = new THREE.HemisphereLight(
      isLight ? 0xf0f9ff : 0xbae6fd,
      isLight ? 0xe2e8f0 : 0x1e1b4b,
      isLight ? 1.25 : 0.8
    );
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.0);
    keyLight.position.set(6, 9, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x8b5cf6, 1.3);
    rimLight.position.set(-7, -3, -5);
    scene.add(rimLight);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const textures: THREE.Texture[] = [envTexture];

    // Build 12 Composite 3D PBR Tech Spheres
    const sphereGeo = new THREE.SphereGeometry(1, 36, 28);
    const ringGeo = new THREE.TorusGeometry(1.03, 0.032, 12, 48);
    geometries.push(sphereGeo, ringGeo);

    const bodies: SphereBody[] = [];
    const hitMeshes: THREE.Mesh[] = [];

    TECH_SPHERES.forEach((item, idx) => {
      const group = new THREE.Group();
      const radius = 0.72 + (item.level - 70) * 0.0085;

      const tex = createTechSphereTexture(item);
      tex.anisotropy = maxAnisotropy;
      textures.push(tex);

      const sphereMat = new THREE.MeshPhysicalMaterial({
        map: tex,
        metalness: 0.28,
        roughness: 0.16,
        clearcoat: 0.9,
        clearcoatRoughness: 0.1,
      });
      materials.push(sphereMat);

      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      sphereMesh.scale.setScalar(radius);
      sphereMesh.userData = { index: idx };
      sphereMesh.layers.enable(1);
      group.add(sphereMesh);

      const ringMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(item.color),
        metalness: 0.85,
        roughness: 0.2,
        emissive: new THREE.Color(item.color),
        emissiveIntensity: 0.25,
      });
      materials.push(ringMat);
      const trimRing = new THREE.Mesh(ringGeo, ringMat);
      trimRing.scale.setScalar(radius);
      trimRing.rotation.x = Math.PI / 2;
      group.add(trimRing);

      const col = idx % 4;
      const row = Math.floor(idx / 4);
      const startX = (col - 1.5) * 2.1 + (row % 2 === 0 ? -0.35 : 0.35);
      const startY = (1 - row) * 1.65;
      const startZ = Math.sin(idx * 1.4) * 1.1;

      group.position.set(startX, startY, startZ);
      group.rotation.y = -Math.PI / 2 + (idx % 3) * 0.15;
      scene.add(group);

      hitMeshes.push(sphereMesh);
      bodies.push({
        group,
        hitMesh: sphereMesh,
        pos: group.position.clone(),
        vel: new THREE.Vector3(
          Math.sin(idx * 2.1) * 0.35,
          Math.cos(idx * 1.7) * 0.35,
          Math.sin(idx * 0.9) * 0.2
        ),
        radius,
        rotSpeed: new THREE.Vector3(
          0.12 + (idx % 3) * 0.06,
          0.22 + (idx % 4) * 0.05,
          0.08
        ),
        index: idx,
      });
    });

    // Scatter / Energy Pulse handler
    scatterFnRef.current = () => {
      bodies.forEach((b, idx) => {
        const angle = (idx / bodies.length) * Math.PI * 2 + Math.random() * 0.4;
        b.vel.x += Math.cos(angle) * 5.2;
        b.vel.y += Math.sin(angle) * 4.2;
        b.vel.z += (Math.random() - 0.5) * 3.0;
      });
    };

    // Interactive pointer repulsor, click raycasting & HD zoom
    _raycaster.layers.set(1);
    let pointerActive = false;
    const pointerWorld = new THREE.Vector3();
    let lastHoverCheck = 0;

    const updatePointer = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      _pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      _pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      _raycaster.setFromCamera(_pointer, camera);
      _raycaster.ray.intersectPlane(_plane, _planePoint);
      pointerWorld.copy(_planePoint);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      pointerActive = true;
      updatePointer(e);

      const now = performance.now();
      if (now - lastHoverCheck > 50) {
        lastHoverCheck = now;
        const hits = _raycaster.intersectObjects(hitMeshes, false);
        renderer.domElement.style.cursor = hits.length > 0 ? "pointer" : "default";
      }
    };

    const onPointerLeave = () => {
      pointerActive = false;
      renderer.domElement.style.cursor = "default";
    };

    const onPointerDown = (e: PointerEvent) => {
      setWheelActive(true);
      updatePointer(e);
      const hits = _raycaster.intersectObjects(hitMeshes, false);
      if (hits.length > 0) {
        const hitIdx = hits[0].object.userData.index as number;
        setSelectedIdx(hitIdx);
        const clickedBody = bodies[hitIdx];
        clickedBody.vel.z += 2.2;
        bodies.forEach((other) => {
          if (other.index === hitIdx) return;
          _diff.subVectors(other.pos, clickedBody.pos);
          const dist = Math.max(0.5, _diff.length());
          if (dist < 4.5) {
            _diff.normalize().multiplyScalar((4.5 - dist) * 1.15);
            other.vel.add(_diff);
          }
        });
      }
    };

    const onDocPointerDown = (e: PointerEvent) => {
      if (!mount.contains(e.target as Node)) {
        setWheelActive(false);
      }
    };

    const onWheel = (e: WheelEvent) => {
      const allowWheel = e.ctrlKey || e.metaKey || e.shiftKey || wheelActiveRef.current;
      if (!allowWheel) return;
      e.preventDefault();
      const delta = -Math.sign(e.deltaY) * (Math.abs(e.deltaY) > 40 ? 0.2 : 0.12);
      updateZoom((prev) => prev + delta);
    };

    const onDoubleClick = () => {
      updateZoom((prev) => (prev > 1.35 ? 1 : 1.9));
    };

    let pinchDist = 0;
    let pinchStartZoom = 1;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        pinchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        pinchStartZoom = zoomRef.current;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && pinchDist > 10) {
        e.preventDefault();
        const currDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        updateZoom(pinchStartZoom * (currDist / pinchDist));
      }
    };

    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerleave", onPointerLeave);
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerdown", onDocPointerDown);
    mount.addEventListener("wheel", onWheel, { passive: false });
    mount.addEventListener("dblclick", onDoubleClick);
    mount.addEventListener("touchstart", onTouchStart, { passive: true });
    mount.addEventListener("touchmove", onTouchMove, { passive: false });

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setContextLost(true);
    };
    const onContextRestored = () => setContextLost(false);
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);
    renderer.domElement.addEventListener("webglcontextrestored", onContextRestored);

    const themeObserver = new MutationObserver(() => {
      const nextLight = isLightThemeActive();
      if (nextLight === isLight) return;
      isLight = nextLight;
      hemiLight.color.setHex(isLight ? 0xf0f9ff : 0xbae6fd);
      hemiLight.groundColor.setHex(isLight ? 0xe2e8f0 : 0x1e1b4b);
      hemiLight.intensity = isLight ? 1.25 : 0.8;
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const w = Math.max(260, Math.floor(entry.contentRect.width));
      const h = Math.max(280, Math.floor(entry.contentRect.height));
      camera.aspect = w / h;
      baseCamZ = w < 520 ? 14.5 : w < 780 ? 12.6 : 11.4;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(mount);

    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(mount);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    let frameId = 0;
    let disposed = false;
    const clock = new THREE.Clock();

    const tick = () => {
      if (disposed) return;
      const dt = Math.min(clock.getDelta(), 0.04);

      if (isVisible) {
        // Smooth HD camera dolly zoom
        const targetZ = baseCamZ / zoomRef.current;
        camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 7, dt);

        const aspect = camera.aspect;
        const boundX = Math.max(2.9, Math.min(5.2, aspect * 2.55));
        const boundY = 2.45;
        const boundZ = 2.0;

        if (!prefersReducedMotion) {
          for (let i = 0; i < bodies.length; i++) {
            const b = bodies[i];
            b.vel.x += -b.pos.x * 1.15 * dt;
            b.vel.y += -b.pos.y * 1.25 * dt;
            b.vel.z += -b.pos.z * 1.4 * dt;

            if (pointerActive) {
              _diff.subVectors(b.pos, pointerWorld);
              const dist = _diff.length();
              const influence = b.radius + 1.55;
              if (dist < influence && dist > 0.001) {
                const push = ((influence - dist) / influence) * 14.0 * dt;
                _diff.normalize().multiplyScalar(push);
                b.vel.add(_diff);
              }
            }

            const damp = Math.exp(-1.55 * dt);
            b.vel.multiplyScalar(damp);
            b.pos.addScaledVector(b.vel, dt);

            if (b.pos.x > boundX - b.radius) {
              b.pos.x = boundX - b.radius;
              b.vel.x *= -0.7;
            } else if (b.pos.x < -boundX + b.radius) {
              b.pos.x = -boundX + b.radius;
              b.vel.x *= -0.7;
            }
            if (b.pos.y > boundY - b.radius) {
              b.pos.y = boundY - b.radius;
              b.vel.y *= -0.7;
            } else if (b.pos.y < -boundY + b.radius) {
              b.pos.y = -boundY + b.radius;
              b.vel.y *= -0.7;
            }
            if (b.pos.z > boundZ - b.radius) {
              b.pos.z = boundZ - b.radius;
              b.vel.z *= -0.7;
            } else if (b.pos.z < -boundZ + b.radius) {
              b.pos.z = -boundZ + b.radius;
              b.vel.z *= -0.7;
            }
          }

          for (let i = 0; i < bodies.length; i++) {
            for (let j = i + 1; j < bodies.length; j++) {
              const a = bodies[i];
              const b = bodies[j];
              _diff.subVectors(b.pos, a.pos);
              const dist = _diff.length();
              const minDist = a.radius + b.radius + 0.1;

              if (dist < minDist && dist > 0.0001) {
                const overlap = (minDist - dist) * 0.5;
                _diff.divideScalar(dist);
                a.pos.addScaledVector(_diff, -overlap);
                b.pos.addScaledVector(_diff, overlap);

                const rvx = b.vel.x - a.vel.x;
                const rvy = b.vel.y - a.vel.y;
                const rvz = b.vel.z - a.vel.z;
                const velAlongNormal = rvx * _diff.x + rvy * _diff.y + rvz * _diff.z;

                if (velAlongNormal < 0) {
                  const restitution = 0.72;
                  const impulse = (-(1 + restitution) * velAlongNormal) * 0.5;
                  a.vel.addScaledVector(_diff, -impulse);
                  b.vel.addScaledVector(_diff, impulse);
                }
              }
            }
          }

          for (let i = 0; i < bodies.length; i++) {
            const b = bodies[i];
            b.group.position.copy(b.pos);
            b.group.rotation.y += (b.rotSpeed.y + b.vel.x * 0.16) * dt;
            b.group.rotation.x = THREE.MathUtils.damp(
              b.group.rotation.x,
              b.vel.y * 0.18,
              4,
              dt
            );
          }
        }

        renderer.render(scene, camera);
      }

      if (isSoftwareGl) {
        scheduleAfterSoftwareDraw(renderer, tick, (id) => {
          frameId = id;
        });
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      applyZoomFnRef.current = null;
      themeObserver.disconnect();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerleave", onPointerLeave);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerdown", onDocPointerDown);
      mount.removeEventListener("wheel", onWheel);
      mount.removeEventListener("dblclick", onDoubleClick);
      mount.removeEventListener("touchstart", onTouchStart);
      mount.removeEventListener("touchmove", onTouchMove);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      renderer.domElement.removeEventListener("webglcontextrestored", onContextRestored);
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      renderer.dispose();
    };
  }, [updateZoom]);

  const activeItem = TECH_SPHERES[selectedIdx];
  const isHdActive = zoom > 1.14;

  return (
    <div className="relative w-full flex flex-col rounded-2xl overflow-hidden border border-border/80 bg-card/40 select-none">
      {/* Subtle stage lighting backdrop */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 48%, hsl(var(--primary) / 0.12), transparent 68%)",
        }}
      />

      {/* Top Spec Line + HD Zoom Controls */}
      <div className="relative z-10 px-4 pt-3.5 pb-1 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-muted-foreground">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: activeItem.color }}
          />
          <span className="font-semibold text-foreground truncate">{activeItem.name}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums text-primary font-semibold shrink-0">{activeItem.level}%</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden lg:inline">
            {wheelActive ? "Scroll to HD zoom · Click outside for page" : "Move cursor to repel · Click + scroll for HD zoom"}
          </span>
          <div className="inline-flex items-center gap-0.5 rounded-lg border border-border/80 bg-card/95 p-0.5">
            <button
              type="button"
              onClick={() => updateZoom((z) => z - 0.3)}
              disabled={zoom <= MIN_ZOOM}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/70 disabled:opacity-40 transition-colors cursor-pointer"
              aria-label="Zoom out 3D tech spheres"
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
              onClick={() => updateZoom((z) => z + 0.3)}
              disabled={zoom >= MAX_ZOOM}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/70 disabled:opacity-40 transition-colors cursor-pointer"
              aria-label="Zoom in 3D tech spheres HD"
              title="HD Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => updateZoom(1)}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors cursor-pointer"
              aria-label="Reset 3D zoom"
              title="Reset zoom"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Isolated WebGL Canvas Container tagged for 3D-only Circle Scroller */}
      {webglReady && !contextLost ? (
        <div
          ref={containerRef}
          data-3d-viewport="true"
          data-three-zoom={zoom.toFixed(2)}
          data-three-mode="arena"
          className="relative w-full h-[340px] sm:h-[400px] md:h-[440px]"
        />
      ) : (
        <div className="w-full h-[340px] sm:h-[400px] flex flex-col items-center justify-center p-6 text-center bg-card">
          <Sparkles className="w-8 h-8 text-primary mb-2" />
          <p className="text-sm font-semibold text-foreground">Interactive 3D Tech Stack</p>
          <p className="text-xs text-muted-foreground mt-1">Switch to Skill Matrix view to browse all tools.</p>
        </div>
      )}

      {/* Collapsible Bottom Inspector Dock (solid surface, zero backdrop-blur over WebGL) */}
      <div className="relative z-10 mx-auto mb-3 w-[calc(100%-24px)] max-w-[680px] flex flex-col items-center">
        <button
          type="button"
          onClick={() => setDockExpanded((v) => !v)}
          className="mb-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-card border border-border text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors"
          aria-expanded={dockExpanded}
        >
          {dockExpanded ? (
            <>
              <ChevronDown className="w-3 h-3" />
              <span>Hide Inspector</span>
            </>
          ) : (
            <>
              <ChevronUp className="w-3 h-3" />
              <span>Show Inspector</span>
            </>
          )}
        </button>

        {dockExpanded && (
          <div className="w-full rounded-xl bg-card/95 border border-border/90 px-3.5 py-2.5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-foreground">{activeItem.name}</span>
                <span className="text-muted-foreground" aria-hidden="true">·</span>
                <span className="text-muted-foreground text-[11px]">{activeItem.category}</span>
              </div>
              <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 leading-snug line-clamp-2 sm:line-clamp-1">
                {activeItem.summary}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => scatterFnRef.current?.()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 shrink-0" />
                <span>Scatter Pulse</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechStack3DArena;
