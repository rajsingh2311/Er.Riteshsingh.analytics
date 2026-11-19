import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ChevronDown, ChevronUp, Layers, RotateCcw, Sparkles } from "lucide-react";
import {
  createContactShadowTexture,
  createStudioEnvironment,
  detectSoftwareWebGL,
  isLightThemeActive,
  isWebGLAvailable,
  scheduleAfterSoftwareDraw,
} from "./webglUtils";

interface AnalyticsPillar {
  id: string;
  label: string;
  metric: string;
  detail: string;
  height: number;
  accentHex: number;
  accentCss: string;
}

const ANALYTICS_PILLARS: AnalyticsPillar[] = [
  {
    id: "powerbi",
    label: "Power BI",
    metric: "30+ Campuses",
    detail: "Unified executive MIS & DAX star-schema reporting architecture",
    height: 2.15,
    accentHex: 0x00e5c3,
    accentCss: "#00e5c3",
  },
  {
    id: "automation",
    label: "Make · N8N",
    metric: "65% Faster SLA",
    detail: "Automated Meta Ads → WATI → CRM pipelines saving 12+ hrs/wk",
    height: 1.95,
    accentHex: 0xa855f7,
    accentCss: "#a855f7",
  },
  {
    id: "excel",
    label: "MOS Excel",
    metric: "100K+ Txns",
    detail: "Dynamic RFM scorecards, Power Query & automated KPI trackers",
    height: 2.25,
    accentHex: 0x22c55e,
    accentCss: "#22c55e",
  },
  {
    id: "sql",
    label: "SQL",
    metric: "Multi-Source ETL",
    detail: "Structured joins, data integrity checks & analytics views",
    height: 1.75,
    accentHex: 0x38bdf8,
    accentCss: "#38bdf8",
  },
  {
    id: "python",
    label: "Python",
    metric: "CRISP-DM ML",
    detail: "Pandas, NumPy & Scikit-Learn attrition and forecasting models",
    height: 1.85,
    accentHex: 0xf59e0b,
    accentCss: "#f59e0b",
  },
  {
    id: "sixsigma",
    label: "Six Sigma",
    metric: "Green Belt",
    detail: "Statistical hypothesis testing (SPSS) & 25% turnaround reduction",
    height: 1.6,
    accentHex: 0xec4899,
    accentCss: "#ec4899",
  },
];

// Reusable math helpers allocated once outside render loop (zero GC)
const _raycaster = new THREE.Raycaster();
const _pointer = new THREE.Vector2();
const _dummy = new THREE.Object3D();

function createBeveledOctagonShape(radius: number): THREE.Shape {
  const shape = new THREE.Shape();
  const sides = 8;
  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * Math.PI * 2 + Math.PI / 8;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
}

function createDialTexture(isLight: boolean): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, 512, 512);
    const cx = 256;
    const cy = 256;

    // Precision concentric rings
    ctx.strokeStyle = isLight ? "rgba(13, 148, 136, 0.38)" : "rgba(0, 229, 195, 0.35)";
    ctx.lineWidth = 2;
    [130, 185, 232].forEach((r) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Degree calibration ticks
    for (let i = 0; i < 72; i++) {
      const a = (i / 72) * Math.PI * 2;
      const major = i % 6 === 0;
      const r1 = major ? 212 : 222;
      const r2 = 232;
      ctx.strokeStyle = major
        ? isLight
          ? "rgba(124, 58, 237, 0.65)"
          : "rgba(168, 85, 247, 0.7)"
        : isLight
          ? "rgba(15, 23, 42, 0.22)"
          : "rgba(148, 163, 184, 0.25)";
      ctx.lineWidth = major ? 3 : 1.5;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
      ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
      ctx.stroke();
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

const AnalyticsCoreScene = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [exploded, setExploded] = useState<boolean>(false);
  const [autoOrbit, setAutoOrbit] = useState<boolean>(true);
  const [dockExpanded, setDockExpanded] = useState<boolean>(true);
  const [webglReady, setWebglReady] = useState<boolean>(true);
  const [contextLost, setContextLost] = useState<boolean>(false);

  const explodedRef = useRef(exploded);
  const autoOrbitRef = useRef(autoOrbit);
  const selectedIdxRef = useRef(selectedIdx);
  const resetCameraFnRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    explodedRef.current = exploded;
  }, [exploded]);

  useEffect(() => {
    autoOrbitRef.current = autoOrbit;
  }, [autoOrbit]);

  useEffect(() => {
    selectedIdxRef.current = selectedIdx;
  }, [selectedIdx]);

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
    let isLight = isLightThemeActive();

    const scene = new THREE.Scene();
    const width = mount.clientWidth || 480;
    const height = mount.clientHeight || 460;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    const defaultCamPos = new THREE.Vector3(0, 3.3, 7.6);
    camera.position.copy(defaultCamPos);

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
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.touchAction = "pan-y";

    mount.innerHTML = "";
    mount.appendChild(renderer.domElement);

    const envTexture = createStudioEnvironment(renderer);
    scene.environment = envTexture;

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

    // 3-Point Studio Lighting (Warm key, Cool Hemisphere fill, Accent rim)
    const hemiLight = new THREE.HemisphereLight(
      isLight ? 0xe0f2fe : 0xbae6fd,
      isLight ? 0xcbd5e1 : 0x1e1b4b,
      isLight ? 1.15 : 0.75
    );
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff4e6, isLight ? 2.1 : 1.9);
    keyLight.position.set(5.5, 8.5, 6);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 22;
      const d = 4.5;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x9333ea, 1.35);
    rimLight.position.set(-5.5, 4.5, -5.5);
    scene.add(rimLight);

    const accentPoint = new THREE.PointLight(0x00e5c3, 1.6, 12, 2);
    accentPoint.position.set(0, 1.2, 0);
    scene.add(accentPoint);

    // Master Sculpture Group (Composite multi-part mechanical/analytics core)
    const masterGroup = new THREE.Group();
    masterGroup.position.y = -0.35;
    scene.add(masterGroup);

    // Track disposable resources
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const textures: THREE.Texture[] = [envTexture];

    // 1. Soft Contact Shadow Plane on ground
    const contactShadowTex = createContactShadowTexture();
    textures.push(contactShadowTex);
    const contactShadowGeo = new THREE.PlaneGeometry(6.8, 6.8);
    geometries.push(contactShadowGeo);
    const contactShadowMat = new THREE.MeshBasicMaterial({
      map: contactShadowTex,
      transparent: true,
      depthWrite: false,
      opacity: isLight ? 0.32 : 0.52,
    });
    materials.push(contactShadowMat);
    const contactShadow = new THREE.Mesh(contactShadowGeo, contactShadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = -1.32;
    masterGroup.add(contactShadow);

    // 2. Machined Octagonal Base Chassis (ExtrudeGeometry with bevels)
    const baseGroup = new THREE.Group();
    masterGroup.add(baseGroup);

    const baseShape = createBeveledOctagonShape(2.15);
    const baseGeo = new THREE.ExtrudeGeometry(baseShape, {
      depth: 0.24,
      bevelEnabled: true,
      bevelThickness: 0.07,
      bevelSize: 0.07,
      bevelSegments: 3,
    });
    baseGeo.rotateX(-Math.PI / 2);
    geometries.push(baseGeo);

    const baseMat = new THREE.MeshPhysicalMaterial({
      color: isLight ? 0x1e293b : 0x0f172a,
      metalness: 0.82,
      roughness: 0.24,
      clearcoat: 0.65,
      clearcoatRoughness: 0.18,
    });
    materials.push(baseMat);

    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -1.12;
    baseMesh.receiveShadow = !isSoftwareGl;
    baseMesh.castShadow = !isSoftwareGl;
    baseGroup.add(baseMesh);

    // Inner Brushed Titanium Collar Ring
    const collarGeo = new THREE.CylinderGeometry(1.58, 1.72, 0.14, 32);
    geometries.push(collarGeo);
    const collarMat = new THREE.MeshPhysicalMaterial({
      color: isLight ? 0x64748b : 0x334155,
      metalness: 0.92,
      roughness: 0.18,
      anisotropy: 0.75,
    });
    materials.push(collarMat);
    const collarMesh = new THREE.Mesh(collarGeo, collarMat);
    collarMesh.position.y = -0.82;
    collarMesh.receiveShadow = !isSoftwareGl;
    baseGroup.add(collarMesh);

    // Precision Calibration Dial Decal (offset in Y + polygonOffset to avoid Z-fighting)
    let dialTex = createDialTexture(isLight);
    dialTex.anisotropy = maxAnisotropy;
    textures.push(dialTex);
    const dialGeo = new THREE.PlaneGeometry(3.45, 3.45);
    geometries.push(dialGeo);
    const dialMat = new THREE.MeshBasicMaterial({
      map: dialTex,
      transparent: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    materials.push(dialMat);
    const dialMesh = new THREE.Mesh(dialGeo, dialMat);
    dialMesh.rotation.x = -Math.PI / 2;
    dialMesh.position.y = -0.73;
    baseGroup.add(dialMesh);

    // 3. Central Optical Glass Data Prism Core + Inner Faceted Crystal
    const coreGroup = new THREE.Group();
    coreGroup.position.y = 0.68;
    masterGroup.add(coreGroup);

    const innerCoreGeo = new THREE.OctahedronGeometry(0.56, 0);
    geometries.push(innerCoreGeo);
    const innerCoreMat = new THREE.MeshStandardMaterial({
      color: 0x00e5c3,
      emissive: 0x0d9488,
      emissiveIntensity: 0.65,
      metalness: 0.35,
      roughness: 0.18,
    });
    materials.push(innerCoreMat);
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    coreGroup.add(innerCoreMesh);

    const outerCrystalGeo = new THREE.IcosahedronGeometry(0.92, 0);
    geometries.push(outerCrystalGeo);
    const outerCrystalMat = new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe,
      metalness: 0.08,
      roughness: 0.06,
      transmission: isSoftwareGl ? 0 : 0.88,
      transparent: true,
      opacity: isSoftwareGl ? 0.32 : 1,
      ior: 1.62,
      thickness: 1.2,
      clearcoat: 1.0,
      depthWrite: false,
    });
    materials.push(outerCrystalMat);
    const outerCrystalMesh = new THREE.Mesh(outerCrystalGeo, outerCrystalMat);
    outerCrystalMesh.renderOrder = 3;
    coreGroup.add(outerCrystalMesh);

    // Wireframe precision geodesic cage around prism
    const cageGeo = new THREE.EdgesGeometry(outerCrystalGeo);
    geometries.push(cageGeo);
    const cageMat = new THREE.LineBasicMaterial({
      color: 0x00e5c3,
      transparent: true,
      opacity: 0.55,
    });
    materials.push(cageMat);
    const cageLines = new THREE.LineSegments(cageGeo, cageMat);
    cageLines.scale.setScalar(1.03);
    coreGroup.add(cageLines);

    // 4. Six Raycastable Live Data Pillars arranged radially on the base
    const pillarsGroup = new THREE.Group();
    masterGroup.add(pillarsGroup);

    const pillarMeshes: THREE.Mesh[] = [];
    const pillarCaps: THREE.Mesh[] = [];
    const pillarBasePositions: THREE.Vector3[] = [];
    const pillarGeo = new THREE.BoxGeometry(0.32, 1, 0.32);
    const capGeo = new THREE.BoxGeometry(0.36, 0.09, 0.36);
    geometries.push(pillarGeo, capGeo);

    ANALYTICS_PILLARS.forEach((pillar, idx) => {
      const angle = (idx / ANALYTICS_PILLARS.length) * Math.PI * 2 - Math.PI / 6;
      const radius = 1.38;
      const px = Math.cos(angle) * radius;
      const pz = Math.sin(angle) * radius;

      const mat = new THREE.MeshPhysicalMaterial({
        color: pillar.accentHex,
        emissive: pillar.accentHex,
        emissiveIntensity: idx === 0 ? 0.55 : 0.22,
        metalness: 0.38,
        roughness: 0.22,
        clearcoat: 0.85,
        clearcoatRoughness: 0.12,
      });
      materials.push(mat);

      const bar = new THREE.Mesh(pillarGeo, mat);
      bar.scale.y = pillar.height;
      bar.position.set(px, -0.75 + pillar.height / 2, pz);
      bar.rotation.y = -angle;
      bar.castShadow = !isSoftwareGl;
      bar.receiveShadow = !isSoftwareGl;
      bar.userData = { pillarIndex: idx };
      bar.layers.enable(1);
      pillarsGroup.add(bar);
      pillarMeshes.push(bar);
      pillarBasePositions.push(new THREE.Vector3(px, 0, pz));

      const capMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: pillar.accentHex,
        emissiveIntensity: 0.8,
        metalness: 0.8,
        roughness: 0.15,
      });
      materials.push(capMat);
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.set(px, -0.75 + pillar.height + 0.05, pz);
      cap.rotation.y = -angle;
      cap.userData = { pillarIndex: idx };
      cap.layers.enable(1);
      pillarsGroup.add(cap);
      pillarCaps.push(cap);
    });

    // 5. Dual Counter-Rotating Gyroscopic Rings
    const ringOuterGroup = new THREE.Group();
    ringOuterGroup.position.y = 0.65;
    masterGroup.add(ringOuterGroup);

    const ring1Geo = new THREE.TorusGeometry(2.15, 0.032, 16, 96);
    const ring2Geo = new THREE.TorusGeometry(2.55, 0.022, 16, 96);
    geometries.push(ring1Geo, ring2Geo);

    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x00e5c3,
      metalness: 0.88,
      roughness: 0.16,
      emissive: 0x0d9488,
      emissiveIntensity: 0.35,
    });
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      metalness: 0.85,
      roughness: 0.2,
      emissive: 0x7e22ce,
      emissiveIntensity: 0.35,
    });
    materials.push(ring1Mat, ring2Mat);

    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2.6;
    ring1.rotation.y = 0.35;
    ringOuterGroup.add(ring1);

    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 3.1;
    ring2.rotation.z = 0.4;
    ringOuterGroup.add(ring2);

    // 6. InstancedMesh Orbital Data Nodes (36 precision micro-nodes)
    const nodeCount = 36;
    const nodeGeo = new THREE.OctahedronGeometry(0.06, 0);
    geometries.push(nodeGeo);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x00e5c3,
      emissiveIntensity: 0.65,
      metalness: 0.5,
      roughness: 0.25,
    });
    materials.push(nodeMat);
    const instancedNodes = new THREE.InstancedMesh(nodeGeo, nodeMat, nodeCount);
    instancedNodes.frustumCulled = false;

    const nodeOrbits = Array.from({ length: nodeCount }, (_, i) => ({
      radius: 2.0 + (i % 3) * 0.42 + (Math.sin(i * 1.7) * 0.15),
      angle: (i / nodeCount) * Math.PI * 2,
      speed: (i % 2 === 0 ? 1 : -1) * (0.18 + (i % 5) * 0.04),
      yOffset: Math.sin(i * 2.3) * 1.15,
      scale: 0.75 + (i % 4) * 0.18,
    }));

    const nodeColor = new THREE.Color();
    for (let i = 0; i < nodeCount; i++) {
      nodeColor.setHex(i % 3 === 0 ? 0x00e5c3 : i % 3 === 1 ? 0xa855f7 : 0x38bdf8);
      instancedNodes.setColorAt(i, nodeColor);
    }
    if (instancedNodes.instanceColor) instancedNodes.instanceColor.needsUpdate = true;
    ringOuterGroup.add(instancedNodes);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.minPolarAngle = Math.PI / 4.5;
    controls.maxPolarAngle = Math.PI / 1.95;
    controls.target.set(0, 0.15, 0);
    controls.update();

    let resettingCamera = false;
    const cancelCameraReset = () => {
      resettingCamera = false;
    };
    controls.addEventListener("start", cancelCameraReset);

    resetCameraFnRef.current = () => {
      resettingCamera = true;
    };

    // Raycasting setup (dedicated layer 1)
    _raycaster.layers.set(1);
    let hoveredPillar = -1;
    let lastRaycastTime = 0;

    const updatePointerCoords = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      _pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      _pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onPointerMove = (event: PointerEvent) => {
      const now = performance.now();
      if (now - lastRaycastTime < 45) return;
      lastRaycastTime = now;

      updatePointerCoords(event);
      _raycaster.setFromCamera(_pointer, camera);
      const hits = _raycaster.intersectObjects([...pillarMeshes, ...pillarCaps], false);
      if (hits.length > 0) {
        const idx = hits[0].object.userData.pillarIndex as number;
        hoveredPillar = idx;
        renderer.domElement.style.cursor = "pointer";
      } else {
        hoveredPillar = -1;
        renderer.domElement.style.cursor = "grab";
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      updatePointerCoords(event);
      _raycaster.setFromCamera(_pointer, camera);
      const hits = _raycaster.intersectObjects([...pillarMeshes, ...pillarCaps], false);
      if (hits.length > 0) {
        const idx = hits[0].object.userData.pillarIndex as number;
        setSelectedIdx(idx);
      }
    };

    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerdown", onPointerDown);

    // WebGL context loss/restore safety
    const onContextLost = (e: Event) => {
      e.preventDefault();
      setContextLost(true);
    };
    const onContextRestored = () => {
      setContextLost(false);
    };
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);
    renderer.domElement.addEventListener("webglcontextrestored", onContextRestored);

    // Theme observer so dark/light mode switches update scene materials smoothly
    const themeObserver = new MutationObserver(() => {
      const nextLight = isLightThemeActive();
      if (nextLight === isLight) return;
      isLight = nextLight;
      hemiLight.color.setHex(isLight ? 0xe0f2fe : 0xbae6fd);
      hemiLight.groundColor.setHex(isLight ? 0xcbd5e1 : 0x1e1b4b);
      hemiLight.intensity = isLight ? 1.15 : 0.75;
      keyLight.intensity = isLight ? 2.1 : 1.9;
      baseMat.color.setHex(isLight ? 0x1e293b : 0x0f172a);
      collarMat.color.setHex(isLight ? 0x64748b : 0x334155);
      contactShadowMat.opacity = isLight ? 0.32 : 0.52;
      const oldTex = dialTex;
      dialTex = createDialTexture(isLight);
      dialTex.anisotropy = maxAnisotropy;
      dialMat.map = dialTex;
      dialMat.needsUpdate = true;
      oldTex.dispose();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // ResizeObserver for crisp responsive framing
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const nextW = Math.max(240, Math.floor(entry.contentRect.width));
      const nextH = Math.max(260, Math.floor(entry.contentRect.height));
      camera.aspect = nextW / nextH;
      camera.updateProjectionMatrix();
      renderer.setSize(nextW, nextH);
    });
    resizeObserver.observe(mount);

    // Pause animation when scrolled out of viewport
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(mount);

    // Pre-warm shaders on GPU
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    let frameId = 0;
    let disposed = false;
    let explodeFactor = 0;
    const clock = new THREE.Clock();

    const tick = () => {
      if (disposed) return;

      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();

      if (isVisible) {
        // Smooth damped exploded-view transition
        const targetExplode = explodedRef.current ? 1 : 0;
        explodeFactor = THREE.MathUtils.damp(explodeFactor, targetExplode, 5.5, delta);

        // Smooth camera reset transition if requested
        if (resettingCamera) {
          camera.position.x = THREE.MathUtils.damp(camera.position.x, defaultCamPos.x, 5, delta);
          camera.position.y = THREE.MathUtils.damp(camera.position.y, defaultCamPos.y, 5, delta);
          camera.position.z = THREE.MathUtils.damp(camera.position.z, defaultCamPos.z, 5, delta);
          if (camera.position.distanceTo(defaultCamPos) < 0.03) {
            camera.position.copy(defaultCamPos);
            resettingCamera = false;
          }
        }

        // Gentle auto-orbit
        if (autoOrbitRef.current && !prefersReducedMotion) {
          masterGroup.rotation.y += delta * 0.22;
        }

        // Core floating & counter-rotation
        const coreTargetY = 0.68 + explodeFactor * 0.72 + (prefersReducedMotion ? 0 : Math.sin(elapsed * 1.4) * 0.07);
        coreGroup.position.y = THREE.MathUtils.damp(coreGroup.position.y, coreTargetY, 6, delta);
        if (!prefersReducedMotion) {
          innerCoreMesh.rotation.y += delta * 0.65;
          innerCoreMesh.rotation.x += delta * 0.35;
          outerCrystalMesh.rotation.y -= delta * 0.35;
          cageLines.rotation.y -= delta * 0.35;
          ring1.rotation.z += delta * 0.28;
          ring2.rotation.y -= delta * 0.22;
        }

        // Base separation in exploded mode
        baseGroup.position.y = THREE.MathUtils.damp(baseGroup.position.y, -explodeFactor * 0.42, 5.5, delta);

        // Animate 6 KPI Pillars with smooth height breathing + selection highlight
        const activeIdx = hoveredPillar >= 0 ? hoveredPillar : selectedIdxRef.current;
        ANALYTICS_PILLARS.forEach((pillar, idx) => {
          const bar = pillarMeshes[idx];
          const cap = pillarCaps[idx];
          const basePos = pillarBasePositions[idx];
          const isFocused = idx === activeIdx;

          const wave = prefersReducedMotion ? 0 : Math.sin(elapsed * 1.8 + idx * 1.05) * 0.12;
          const targetH = pillar.height + wave + (isFocused ? 0.24 : 0);
          bar.scale.y = THREE.MathUtils.damp(bar.scale.y, targetH, 6.5, delta);

          const radialBoost = 1 + explodeFactor * 0.38;
          const tx = basePos.x * radialBoost;
          const tz = basePos.z * radialBoost;
          bar.position.x = THREE.MathUtils.damp(bar.position.x, tx, 6, delta);
          bar.position.z = THREE.MathUtils.damp(bar.position.z, tz, 6, delta);
          bar.position.y = -0.75 + explodeFactor * 0.12 + bar.scale.y / 2;

          cap.position.set(bar.position.x, bar.position.y + bar.scale.y / 2 + 0.055, bar.position.z);

          const mat = bar.material as THREE.MeshPhysicalMaterial;
          const targetEmissive = isFocused ? 0.72 : 0.18;
          mat.emissiveIntensity = THREE.MathUtils.damp(mat.emissiveIntensity, targetEmissive, 7, delta);
        });

        // Update 36 instanced orbital nodes (zero GC)
        for (let i = 0; i < nodeCount; i++) {
          const n = nodeOrbits[i];
          const a = n.angle + (prefersReducedMotion ? 0 : elapsed * n.speed);
          const r = n.radius + explodeFactor * 0.55;
          _dummy.position.set(
            Math.cos(a) * r,
            n.yOffset + (prefersReducedMotion ? 0 : Math.sin(elapsed * 1.2 + i) * 0.14),
            Math.sin(a) * r
          );
          _dummy.rotation.set(a, a * 0.7, 0);
          _dummy.scale.setScalar(n.scale);
          _dummy.updateMatrix();
          instancedNodes.setMatrixAt(i, _dummy.matrix);
        }
        instancedNodes.instanceMatrix.needsUpdate = true;

        controls.update();
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
      themeObserver.disconnect();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      controls.removeEventListener("start", cancelCameraReset);
      controls.dispose();
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      renderer.domElement.removeEventListener("webglcontextrestored", onContextRestored);
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      dialTex.dispose();
      renderer.dispose();
    };
  }, []);

  const activePillar = ANALYTICS_PILLARS[selectedIdx];

  return (
    <div className="relative w-full h-[360px] xs:h-[400px] sm:h-[460px] lg:h-[540px] rounded-2xl overflow-hidden border border-border/80 bg-card/40 select-none">
      {/* Subtle radial atmospheric stage glow behind canvas */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, hsl(var(--primary) / 0.14), transparent 62%)",
        }}
      />

      {/* Minimal top-left specification header (unobtrusive, no backdrop-blur over WebGL) */}
      <div className="pointer-events-none absolute top-3.5 left-4 right-4 z-10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: activePillar.accentCss }}
          />
          <span className="font-semibold text-foreground">{activePillar.label}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums text-primary font-semibold">{activePillar.metric}</span>
        </div>
        <span className="hidden sm:inline text-[11px] font-mono text-muted-foreground">
          Drag to orbit · Click pillars
        </span>
      </div>

      {/* Dedicated isolated WebGL canvas mount */}
      {webglReady && !contextLost ? (
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-card">
          <Sparkles className="w-8 h-8 text-primary mb-3" />
          <p className="text-sm font-semibold text-foreground">Interactive Analytics Engine</p>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs">
            3D WebGL preview paused on this device. Use the controls below to inspect core focus areas.
          </p>
        </div>
      )}

      {/* Unified Collapsible Bottom Control Dock (Zero backdrop-blur over WebGL) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 w-[calc(100%-24px)] max-w-[490px] flex flex-col items-center">
        <button
          type="button"
          onClick={() => setDockExpanded((v) => !v)}
          className="mb-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-card border border-border text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors"
          aria-expanded={dockExpanded}
        >
          {dockExpanded ? (
            <>
              <ChevronDown className="w-3 h-3" />
              <span>Hide Controls</span>
            </>
          ) : (
            <>
              <ChevronUp className="w-3 h-3" />
              <span>Show Controls</span>
            </>
          )}
        </button>

        {dockExpanded && (
          <div className="w-full rounded-xl bg-card/95 border border-border/90 px-3 py-2.5 shadow-xl space-y-2">
            {/* Active pillar description */}
            <p className="text-[11px] sm:text-xs text-muted-foreground leading-snug line-clamp-1">
              {activePillar.detail}
            </p>

            {/* Pillar selector buttons + view controls */}
            <div className="flex flex-wrap items-center justify-between gap-1.5">
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
                {ANALYTICS_PILLARS.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedIdx(idx)}
                    className={`px-2 py-1 rounded-md text-[10px] sm:text-[11px] font-mono whitespace-nowrap shrink-0 transition-colors ${
                      idx === selectedIdx
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "bg-secondary/70 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setExploded((v) => !v)}
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] sm:text-[11px] font-mono whitespace-nowrap shrink-0 border transition-colors ${
                    exploded
                      ? "bg-primary/15 text-primary border-primary/50"
                      : "bg-secondary/60 text-muted-foreground border-border hover:text-foreground"
                  }`}
                  title="Toggle Exploded View"
                >
                  <Layers className="w-3 h-3 shrink-0" />
                  <span>{exploded ? "Assemble" : "Explode"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAutoOrbit((v) => !v);
                    resetCameraFnRef.current?.();
                  }}
                  className="p-1.5 rounded-md bg-secondary/60 text-muted-foreground border border-border hover:text-foreground transition-colors shrink-0"
                  title={autoOrbit ? "Pause Orbit & Reset Camera" : "Resume Orbit & Reset Camera"}
                  aria-label="Reset camera view"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsCoreScene;
