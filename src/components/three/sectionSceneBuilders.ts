import * as THREE from "three";

export interface SceneHotspotMeta {
  id: string;
  label: string;
  metric: string;
  detail: string;
  accent: string;
  actionLabel?: string;
}

export interface BuiltSectionScene {
  root: THREE.Group;
  interactables: THREE.Object3D[];
  hotspots: SceneHotspotMeta[];
  cameraPos: [number, number, number];
  cameraTarget: [number, number, number];
  update: (
    dt: number,
    elapsed: number,
    activeId: string | null,
    isLight: boolean,
    pulseEnergy: number
  ) => void;
  dispose: () => void;
}

export type SectionSceneVariant =
  | "about-bridge"
  | "capabilities-core"
  | "experience-helix"
  | "education-beacon"
  | "certifications-vault"
  | "projects-topology"
  | "contact-globe";

// Pre-allocated scratch helpers (zero GC inside animation loops)
const _dummy = new THREE.Object3D();
const _vecA = new THREE.Vector3();
const _vecB = new THREE.Vector3();
const _color = new THREE.Color();

function createBeveledPolygonShape(sides: number, radius: number): THREE.Shape {
  const shape = new THREE.Shape();
  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * Math.PI * 2 + Math.PI / sides;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
}

function createDialCanvasTexture(
  title: string,
  subtitle: string,
  accentHex: string,
  maxAniso: number
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.clearRect(0, 0, 512, 512);
    const cx = 256;
    const cy = 256;

    // Outer subtle ring
    ctx.strokeStyle = accentHex;
    ctx.globalAlpha = 0.65;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy, 228, 0, Math.PI * 2);
    ctx.stroke();

    // Precision tick marks
    for (let i = 0; i < 48; i++) {
      const a = (i / 48) * Math.PI * 2;
      const major = i % 6 === 0;
      const r1 = major ? 196 : 208;
      const r2 = 222;
      ctx.strokeStyle = major ? accentHex : "#94a3b8";
      ctx.globalAlpha = major ? 0.9 : 0.45;
      ctx.lineWidth = major ? 3.5 : 1.5;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
      ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
      ctx.stroke();
    }

    // Inner ring
    ctx.globalAlpha = 0.4;
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, 152, 0, Math.PI * 2);
    ctx.stroke();

    // Typography
    ctx.globalAlpha = 0.95;
    ctx.fillStyle = "#f8fafc";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "700 44px system-ui, -apple-system, sans-serif";
    ctx.fillText(title, cx, cy - 16);

    ctx.fillStyle = accentHex;
    ctx.font = "600 24px ui-monospace, monospace";
    ctx.fillText(subtitle, cx, cy + 32);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = Math.min(maxAniso, 8);
  tex.needsUpdate = true;
  return tex;
}

function createMedallionTexture(
  shortTitle: string,
  issuer: string,
  year: string,
  accentHex: string,
  maxAniso: number
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const grad = ctx.createRadialGradient(256, 180, 24, 256, 256, 256);
    grad.addColorStop(0, "#1e293b");
    grad.addColorStop(1, "#0b1120");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    // Metallic rim accent
    ctx.strokeStyle = accentHex;
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(256, 256, 234, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "rgba(255,255,255,0.22)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(256, 256, 204, 0, Math.PI * 2);
    ctx.stroke();

    // Subtle geometric crest
    ctx.strokeStyle = accentHex;
    ctx.globalAlpha = 0.3;
    ctx.lineWidth = 2;
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(256 + Math.cos(a) * 165, 256 + Math.sin(a) * 165);
      ctx.lineTo(256 + Math.cos(a) * 195, 256 + Math.sin(a) * 195);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Year pill header
    ctx.fillStyle = accentHex;
    ctx.font = "700 28px ui-monospace, monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(year, 256, 152);

    // Main title (supports two lines)
    ctx.fillStyle = "#f8fafc";
    ctx.font = "800 50px system-ui, -apple-system, sans-serif";
    const lines = shortTitle.split("\n");
    if (lines.length === 1) {
      ctx.fillText(lines[0], 256, 252);
    } else {
      ctx.fillText(lines[0], 256, 228);
      ctx.fillText(lines[1], 256, 286);
    }

    // Issuer footer
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "600 24px system-ui, -apple-system, sans-serif";
    ctx.fillText(issuer, 256, 362);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = Math.min(maxAniso, 8);
  tex.needsUpdate = true;
  return tex;
}

function disposeGroup(group: THREE.Object3D, textures: THREE.Texture[]) {
  group.traverse((obj) => {
    if (obj instanceof THREE.Mesh || obj instanceof THREE.Line || obj instanceof THREE.Points) {
      obj.geometry?.dispose();
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      mats.forEach((m) => m?.dispose());
    }
  });
  textures.forEach((t) => t.dispose());
}

// ============================================================================
// 1. ABOUT SECTION: Institutional Data Prism & Campus Bridge
// ============================================================================
function buildAboutBridgeScene(isSoftwareGl: boolean, maxAniso: number): BuiltSectionScene {
  const root = new THREE.Group();
  const interactables: THREE.Object3D[] = [];
  const textures: THREE.Texture[] = [];

  const hotspots: SceneHotspotMeta[] = [
    {
      id: "prism",
      label: "Data Transformation Prism",
      metric: "30+ Campuses",
      detail: "Transforms raw school & operational telemetry into unified corporate intelligence.",
      accent: "#06b6d4",
    },
    {
      id: "analytics",
      label: "Analytics Engine",
      metric: "SQL · MOS Excel · Python",
      detail: "First-principles engineering & statistical rigor across 100K+ institutional rows.",
      accent: "#6366f1",
    },
    {
      id: "visualization",
      label: "Executive BI Layer",
      metric: "Power BI · DAX",
      detail: "Drill-down star-schema scorecards built for Principals, Sr. VP & leadership.",
      accent: "#f59e0b",
    },
    {
      id: "automation",
      label: "Automation Pipeline",
      metric: "65% Faster SLA",
      detail: "Make.com, WATI & Apps Script workflows eliminating 12+ hrs/week of manual effort.",
      accent: "#10b981",
    },
  ];

  // Grounded beveled octagonal base
  const plinthShape = createBeveledPolygonShape(8, 2.35);
  const plinthGeo = new THREE.ExtrudeGeometry(plinthShape, {
    depth: 0.24,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 3,
  });
  plinthGeo.rotateX(-Math.PI / 2);
  const plinthMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.72,
    roughness: 0.34,
  });
  const plinth = new THREE.Mesh(plinthGeo, plinthMat);
  plinth.position.y = 0.05;
  plinth.receiveShadow = true;
  plinth.castShadow = true;
  root.add(plinth);

  // Brushed metallic trim collar
  const collarMat = new THREE.MeshPhysicalMaterial({
    color: 0x94a3b8,
    metalness: 0.92,
    roughness: 0.18,
    clearcoat: 0.4,
  });
  const collar = new THREE.Mesh(new THREE.TorusGeometry(2.15, 0.045, 16, 64), collarMat);
  collar.rotation.x = Math.PI / 2;
  collar.position.y = 0.34;
  root.add(collar);

  // Calibration dial decal
  const dialTex = createDialCanvasTexture("DATA BRIDGE", "30+ CAMPUSES", "#22d3ee", maxAniso);
  textures.push(dialTex);
  const dialMat = new THREE.MeshStandardMaterial({
    map: dialTex,
    transparent: true,
    roughness: 0.45,
    metalness: 0.2,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });
  const dial = new THREE.Mesh(new THREE.CircleGeometry(1.75, 48), dialMat);
  dial.rotation.x = -Math.PI / 2;
  dial.position.y = 0.35;
  root.add(dial);

  // Central optical glass triangular prism
  const prismShape = createBeveledPolygonShape(3, 0.82);
  const prismGeo = new THREE.ExtrudeGeometry(prismShape, {
    depth: 1.35,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.05,
    bevelSegments: 3,
  });
  prismGeo.center();
  const prismMat = new THREE.MeshPhysicalMaterial({
    color: 0x38bdf8,
    metalness: 0.08,
    roughness: 0.08,
    transmission: isSoftwareGl ? 0 : 0.88,
    transparent: true,
    opacity: isSoftwareGl ? 0.42 : 1,
    ior: 1.62,
    thickness: 1.2,
    clearcoat: 1,
    depthWrite: false,
  });
  const prismGroup = new THREE.Group();
  prismGroup.position.set(0, 1.32, 0);
  const prismMesh = new THREE.Mesh(prismGeo, prismMat);
  prismMesh.userData.hotspotId = "prism";
  prismMesh.renderOrder = 2;
  prismGroup.add(prismMesh);
  interactables.push(prismMesh);

  // Inner glowing core octahedron
  const innerCoreMat = new THREE.MeshStandardMaterial({
    color: 0x06b6d4,
    emissive: 0x0891b2,
    emissiveIntensity: 0.9,
    metalness: 0.85,
    roughness: 0.16,
  });
  const innerCore = new THREE.Mesh(new THREE.OctahedronGeometry(0.42, 0), innerCoreMat);
  innerCore.userData.hotspotId = "prism";
  prismGroup.add(innerCore);
  interactables.push(innerCore);
  root.add(prismGroup);

  // Three competency pillars around the prism
  const pillarConfigs = [
    { id: "analytics", angle: -Math.PI * 0.78, height: 1.15, color: 0x6366f1 },
    { id: "visualization", angle: 0, height: 1.5, color: 0xf59e0b },
    { id: "automation", angle: Math.PI * 0.78, height: 1.32, color: 0x10b981 },
  ];

  const pillarMeshes: { mesh: THREE.Mesh; cap: THREE.Mesh; baseH: number; id: string }[] = [];
  pillarConfigs.forEach((cfg) => {
    const r = 1.48;
    const x = Math.cos(cfg.angle) * r;
    const z = Math.sin(cfg.angle) * r;

    const geo = new THREE.CylinderGeometry(0.22, 0.28, cfg.height, 6);
    const mat = new THREE.MeshStandardMaterial({
      color: cfg.color,
      emissive: cfg.color,
      emissiveIntensity: 0.25,
      metalness: 0.65,
      roughness: 0.25,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, 0.34 + cfg.height / 2, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData.hotspotId = cfg.id;
    root.add(mesh);
    interactables.push(mesh);

    const cap = new THREE.Mesh(
      new THREE.TorusGeometry(0.26, 0.028, 12, 24),
      new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        metalness: 0.9,
        roughness: 0.15,
      })
    );
    cap.rotation.x = Math.PI / 2;
    cap.position.set(x, 0.36 + cfg.height, z);
    root.add(cap);

    pillarMeshes.push({ mesh, cap, baseH: cfg.height, id: cfg.id });
  });

  // Orbiting 24 campus data nodes via InstancedMesh
  const nodeCount = 24;
  const nodeGeo = new THREE.IcosahedronGeometry(0.065, 0);
  const nodeMat = new THREE.MeshStandardMaterial({
    color: 0x22d3ee,
    emissive: 0x06b6d4,
    emissiveIntensity: 0.55,
    metalness: 0.5,
    roughness: 0.22,
  });
  const nodesInstanced = new THREE.InstancedMesh(nodeGeo, nodeMat, nodeCount);
  nodesInstanced.frustumCulled = false;
  const palette = [0x22d3ee, 0x818cf8, 0xfbbf24, 0x34d399];
  for (let i = 0; i < nodeCount; i++) {
    _color.setHex(palette[i % palette.length]);
    nodesInstanced.setColorAt(i, _color);
  }
  if (nodesInstanced.instanceColor) nodesInstanced.instanceColor.needsUpdate = true;
  root.add(nodesInstanced);

  // Tilted orbital track ring
  const orbitRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.98, 0.018, 12, 80),
    new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.5,
      metalness: 0.85,
      roughness: 0.2,
    })
  );
  orbitRing.position.y = 1.3;
  orbitRing.rotation.set(Math.PI * 0.38, 0.3, 0.15);
  root.add(orbitRing);

  return {
    root,
    interactables,
    hotspots,
    cameraPos: [0.3, 2.55, 5.2],
    cameraTarget: [0, 1.05, 0],
    update: (dt, elapsed, activeId, isLight, pulseEnergy) => {
      plinthMat.color.setHex(isLight ? 0xe2e8f0 : 0x0f172a);
      collarMat.color.setHex(isLight ? 0x64748b : 0x94a3b8);

      prismGroup.rotation.y += dt * (0.42 + pulseEnergy * 1.6);
      prismGroup.position.y = 1.32 + Math.sin(elapsed * 1.4) * 0.12;
      innerCore.rotation.x -= dt * 0.8;
      innerCore.rotation.z += dt * 0.5;
      orbitRing.rotation.z += dt * 0.28;

      pillarMeshes.forEach((p, idx) => {
        const selected = activeId === p.id;
        const targetScale = selected ? 1.18 : 1 + Math.sin(elapsed * 1.8 + idx * 1.7) * 0.05;
        p.mesh.scale.y = THREE.MathUtils.damp(p.mesh.scale.y, targetScale, 7, dt);
        const h = p.baseH * p.mesh.scale.y;
        p.mesh.position.y = 0.34 + h / 2;
        p.cap.position.y = 0.36 + h;
        const mat = p.mesh.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = THREE.MathUtils.damp(
          mat.emissiveIntensity,
          selected ? 0.85 : 0.24,
          7,
          dt
        );
      });

      for (let i = 0; i < nodeCount; i++) {
        const a = (i / nodeCount) * Math.PI * 2 + elapsed * (0.35 + (i % 3) * 0.08);
        const r = 1.85 + Math.sin(elapsed * 1.5 + i) * 0.22 + pulseEnergy * 0.3;
        const y = 1.28 + Math.sin(a * 2 + elapsed) * 0.42;
        _dummy.position.set(Math.cos(a) * r, y, Math.sin(a) * r);
        const s = 0.85 + (i % 4) * 0.12;
        _dummy.scale.setScalar(s);
        _dummy.rotation.set(elapsed + i, elapsed * 0.7, 0);
        _dummy.updateMatrix();
        nodesInstanced.setMatrixAt(i, _dummy.matrix);
      }
      nodesInstanced.instanceMatrix.needsUpdate = true;
    },
    dispose: () => disposeGroup(root, textures),
  };
}

// ============================================================================
// 2. CAPABILITIES SECTION: Adaptive 3-Mode Engineering Core
// ============================================================================
function buildCapabilitiesCoreScene(isSoftwareGl: boolean, maxAniso: number): BuiltSectionScene {
  const root = new THREE.Group();
  const interactables: THREE.Object3D[] = [];
  const textures: THREE.Texture[] = [];

  const hotspots: SceneHotspotMeta[] = [
    {
      id: "0",
      label: "01 · BI & MIS Star-Schema Cube",
      metric: "30+ Campuses · 60% Faster",
      detail: "Unified Power BI star-schema DAX architecture with executive drill-down scorecards.",
      accent: "#f59e0b",
    },
    {
      id: "1",
      label: "02 · Automation Relay Loop",
      metric: "65% Faster Lead SLA",
      detail: "Make.com, N8N & WATI zero-touch event relay connecting Meta Ads to CRM.",
      accent: "#06b6d4",
    },
    {
      id: "2",
      label: "03 · Predictive Six-Sigma Gyro",
      metric: "100K+ Rows Modeled",
      detail: "Python, SQL, SPSS & Lean Six Sigma Green Belt statistical precision.",
      accent: "#a855f7",
    },
  ];

  // Machined circular platform
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.78,
    roughness: 0.3,
  });
  const base = new THREE.Mesh(new THREE.CylinderGeometry(1.95, 2.15, 0.22, 32), baseMat);
  base.position.y = 0.11;
  base.receiveShadow = true;
  root.add(base);

  const dialTex = createDialCanvasTexture("ARCHITECTURE", "3 CORE DOMAINS", "#38bdf8", maxAniso);
  textures.push(dialTex);
  const dial = new THREE.Mesh(
    new THREE.CircleGeometry(1.75, 48),
    new THREE.MeshStandardMaterial({
      map: dialTex,
      transparent: true,
      roughness: 0.4,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    })
  );
  dial.rotation.x = -Math.PI / 2;
  dial.position.y = 0.24;
  root.add(dial);

  // Assembly 0: BI Star-Schema Cube Cluster
  const biGroup = new THREE.Group();
  biGroup.position.set(0, 1.48, 0);
  const cubeOffsets = [
    [0, 0, 0],
    [0.52, 0, 0],
    [-0.52, 0, 0],
    [0, 0.52, 0],
    [0, -0.52, 0],
    [0, 0, 0.52],
    [0, 0, -0.52],
  ];
  cubeOffsets.forEach(([x, y, z], idx) => {
    const isCenter = idx === 0;
    const mat = new THREE.MeshStandardMaterial({
      color: isCenter ? 0xf59e0b : 0xfbbf24,
      emissive: 0xd97706,
      emissiveIntensity: isCenter ? 0.65 : 0.28,
      metalness: 0.72,
      roughness: isCenter ? 0.16 : 0.32,
    });
    const m = new THREE.Mesh(new THREE.BoxGeometry(isCenter ? 0.48 : 0.3, isCenter ? 0.48 : 0.3, isCenter ? 0.48 : 0.3), mat);
    m.position.set(x, y, z);
    m.castShadow = true;
    m.userData.hotspotId = "0";
    biGroup.add(m);
    interactables.push(m);
  });
  root.add(biGroup);

  // Assembly 1: Automation Orbital Relay Loop (Torus Knot + 12 flowing packets)
  const autoGroup = new THREE.Group();
  autoGroup.position.set(0, 1.48, 0);
  const loopGeo = new THREE.TorusKnotGeometry(0.72, 0.085, 96, 16, 2, 3);
  const loopMat = new THREE.MeshPhysicalMaterial({
    color: 0x06b6d4,
    emissive: 0x0891b2,
    emissiveIntensity: 0.45,
    metalness: 0.85,
    roughness: 0.16,
    clearcoat: 0.9,
  });
  const loopMesh = new THREE.Mesh(loopGeo, loopMat);
  loopMesh.castShadow = true;
  loopMesh.userData.hotspotId = "1";
  autoGroup.add(loopMesh);
  interactables.push(loopMesh);

  const packetCount = 12;
  const packets: THREE.Mesh[] = [];
  const packetMat = new THREE.MeshStandardMaterial({
    color: 0x67e8f9,
    emissive: 0x22d3ee,
    emissiveIntensity: 0.9,
    metalness: 0.4,
    roughness: 0.2,
  });
  const packetGeo = new THREE.SphereGeometry(0.09, 14, 14);
  for (let i = 0; i < packetCount; i++) {
    const p = new THREE.Mesh(packetGeo, packetMat);
    p.userData.hotspotId = "1";
    autoGroup.add(p);
    packets.push(p);
  }
  root.add(autoGroup);

  // Assembly 2: Predictive Six-Sigma Gyroscope
  const predGroup = new THREE.Group();
  predGroup.position.set(0, 1.48, 0);
  const outerRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.96, 0.055, 16, 64),
    new THREE.MeshStandardMaterial({ color: 0xa855f7, emissive: 0x7e22ce, emissiveIntensity: 0.4, metalness: 0.88, roughness: 0.18 })
  );
  outerRing.userData.hotspotId = "2";
  const midRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.72, 0.048, 16, 56),
    new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.4, metalness: 0.88, roughness: 0.18 })
  );
  midRing.userData.hotspotId = "2";
  const crystalShell = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.46, 0),
    new THREE.MeshPhysicalMaterial({
      color: 0xc084fc,
      metalness: 0.1,
      roughness: 0.08,
      transmission: isSoftwareGl ? 0 : 0.85,
      transparent: true,
      opacity: isSoftwareGl ? 0.45 : 1,
      ior: 1.7,
      thickness: 1.1,
      depthWrite: false,
    })
  );
  crystalShell.userData.hotspotId = "2";
  predGroup.add(outerRing, midRing, crystalShell);
  interactables.push(outerRing, midRing, crystalShell);
  root.add(predGroup);

  const groups = [biGroup, autoGroup, predGroup];

  return {
    root,
    interactables,
    hotspots,
    cameraPos: [0, 2.3, 4.8],
    cameraTarget: [0, 1.25, 0],
    update: (dt, elapsed, activeId, isLight, pulseEnergy) => {
      baseMat.color.setHex(isLight ? 0xe2e8f0 : 0x0f172a);
      const activeIdx = activeId === "1" ? 1 : activeId === "2" ? 2 : 0;

      groups.forEach((grp, idx) => {
        const isActive = idx === activeIdx;
        const targetScale = isActive ? 1.12 : 0.34;
        const angle = ((idx - activeIdx) * Math.PI * 2) / 3;
        const targetX = isActive ? 0 : Math.sin(angle) * 1.55;
        const targetZ = isActive ? 0.15 : -0.85;
        const targetY = isActive ? 1.52 + Math.sin(elapsed * 1.6) * 0.09 : 0.92;

        const nextScale = THREE.MathUtils.damp(grp.scale.x, targetScale, 6.5, dt);
        grp.scale.setScalar(nextScale);
        grp.position.x = THREE.MathUtils.damp(grp.position.x, targetX, 6.5, dt);
        grp.position.y = THREE.MathUtils.damp(grp.position.y, targetY, 6.5, dt);
        grp.position.z = THREE.MathUtils.damp(grp.position.z, targetZ, 6.5, dt);
      });

      biGroup.rotation.y += dt * (0.55 + pulseEnergy * 1.8);
      biGroup.rotation.x = Math.sin(elapsed * 0.7) * 0.28;

      autoGroup.rotation.y -= dt * (0.45 + pulseEnergy * 1.6);
      packets.forEach((p, idx) => {
        const t = elapsed * 1.1 + (idx / packetCount) * Math.PI * 2;
        const r = 0.72 + Math.cos(3 * t) * 0.26;
        p.position.set(
          r * Math.cos(2 * t),
          Math.sin(3 * t) * 0.32,
          r * Math.sin(2 * t)
        );
      });

      outerRing.rotation.x += dt * 0.65;
      outerRing.rotation.y += dt * 0.42;
      midRing.rotation.y -= dt * 0.9;
      midRing.rotation.z += dt * 0.55;
      crystalShell.rotation.y += dt * (0.7 + pulseEnergy * 2);
    },
    dispose: () => disposeGroup(root, textures),
  };
}

// ============================================================================
// 3. EXPERIENCE SECTION: 3D Career Trajectory Helix
// ============================================================================
function buildExperienceHelixScene(_isSoftwareGl: boolean, maxAniso: number): BuiltSectionScene {
  const root = new THREE.Group();
  const interactables: THREE.Object3D[] = [];
  const textures: THREE.Texture[] = [];

  const hotspots: SceneHotspotMeta[] = [
    {
      id: "0",
      label: "Data Analyst · Jaipuria Group",
      metric: "Dec 2025 — Present",
      detail: "Unified MIS & Power BI ecosystem across 30+ schools · 60% faster reporting.",
      accent: "#06b6d4",
      actionLabel: "Open Role Details",
    },
    {
      id: "1",
      label: "Data Analyst Intern · WTF Gyms",
      metric: "May 2025 — Jul 2025",
      detail: "Meta Ads → Google Sheets → WATI automation cutting response SLA from 30m to <10m.",
      accent: "#10b981",
      actionLabel: "Open Role Details",
    },
    {
      id: "2",
      label: "Student Co-ordinator · JSB Analytics",
      metric: "Sep 2024 — Present",
      detail: "Grew analytics community 50% and mentored 20+ peers on Power BI & storytelling.",
      accent: "#8b5cf6",
      actionLabel: "Open Role Details",
    },
    {
      id: "3",
      label: "Team Leader · Stagnet Research",
      metric: "Jul 2023 — Jul 2024",
      detail: "Led 20 researchers and cut project turnaround by 25% via automated Excel trackers.",
      accent: "#ec4899",
      actionLabel: "Open Role Details",
    },
    {
      id: "4",
      label: "Chemical Engineer · Reliance Jamnagar",
      metric: "Jan 2023 — Jul 2023",
      detail: "Plant telemetry, Pareto diagnosis & yield optimization at world's largest refinery.",
      accent: "#f59e0b",
      actionLabel: "Open Role Details",
    },
  ];

  // Grounded plinth
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.76,
    roughness: 0.32,
  });
  const base = new THREE.Mesh(new THREE.CylinderGeometry(1.75, 1.95, 0.2, 8), baseMat);
  base.position.y = 0.1;
  base.receiveShadow = true;
  root.add(base);

  const dialTex = createDialCanvasTexture("CAREER HELIX", "2023 — 2026", "#22d3ee", maxAniso);
  textures.push(dialTex);
  const dial = new THREE.Mesh(
    new THREE.CircleGeometry(1.5, 48),
    new THREE.MeshStandardMaterial({
      map: dialTex,
      transparent: true,
      roughness: 0.45,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    })
  );
  dial.rotation.x = -Math.PI / 2;
  dial.position.y = 0.22;
  root.add(dial);

  const helixGroup = new THREE.Group();
  root.add(helixGroup);

  // Twin helical spines (TubeGeometry)
  const buildHelixCurve = (phaseOffset: number) => {
    const pts: THREE.Vector3[] = [];
    const steps = 64;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const angle = t * Math.PI * 2.5 + phaseOffset;
      const radius = 1.15 - t * 0.22;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0.32 + t * 2.55, Math.sin(angle) * radius));
    }
    return new THREE.CatmullRomCurve3(pts);
  };

  const spineA = new THREE.Mesh(
    new THREE.TubeGeometry(buildHelixCurve(0), 72, 0.032, 10, false),
    new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.45, metalness: 0.85, roughness: 0.2 })
  );
  const spineB = new THREE.Mesh(
    new THREE.TubeGeometry(buildHelixCurve(Math.PI), 72, 0.026, 10, false),
    new THREE.MeshStandardMaterial({ color: 0x818cf8, emissive: 0x4f46e5, emissiveIntensity: 0.4, metalness: 0.85, roughness: 0.22 })
  );
  helixGroup.add(spineA, spineB);

  // 5 interactive role stations ascending from Reliance (bottom, id "4") to Jaipuria (top, id "0")
  const orderedIds = ["4", "3", "2", "1", "0"];
  const colors = [0xf59e0b, 0xec4899, 0x8b5cf6, 0x10b981, 0x06b6d4];
  const stations: { node: THREE.Mesh; ring: THREE.Mesh; id: string }[] = [];

  orderedIds.forEach((id, step) => {
    const t = step / (orderedIds.length - 1);
    const angle = t * Math.PI * 2.5;
    const radius = 1.15 - t * 0.22;
    const y = 0.46 + t * 2.32;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    // Cross-bridge rung between twin spines
    const rung = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.015, radius * 2, 8),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85, roughness: 0.25 })
    );
    rung.position.set(0, y, 0);
    rung.rotation.set(0, -angle, Math.PI / 2);
    helixGroup.add(rung);

    const nodeMat = new THREE.MeshStandardMaterial({
      color: colors[step],
      emissive: colors[step],
      emissiveIntensity: 0.42,
      metalness: 0.65,
      roughness: 0.2,
    });
    const node = new THREE.Mesh(
      step === 4 ? new THREE.OctahedronGeometry(0.24, 0) : new THREE.DodecahedronGeometry(0.19, 0),
      nodeMat
    );
    node.position.set(x, y, z);
    node.castShadow = true;
    node.userData.hotspotId = id;
    helixGroup.add(node);
    interactables.push(node);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.28, 0.02, 10, 28),
      new THREE.MeshStandardMaterial({ color: colors[step], emissive: colors[step], emissiveIntensity: 0.5, metalness: 0.8, roughness: 0.2 })
    );
    ring.position.set(x, y, z);
    ring.rotation.x = Math.PI / 2;
    helixGroup.add(ring);

    stations.push({ node, ring, id });
  });

  // Rising telemetry particles (InstancedMesh)
  const particleCount = 30;
  const particles = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.032, 8, 8),
    new THREE.MeshStandardMaterial({ color: 0x67e8f9, emissive: 0x06b6d4, emissiveIntensity: 0.75, roughness: 0.2 }),
    particleCount
  );
  particles.frustumCulled = false;
  helixGroup.add(particles);

  return {
    root,
    interactables,
    hotspots,
    cameraPos: [0, 2.1, 4.9],
    cameraTarget: [0, 1.5, 0],
    update: (dt, elapsed, activeId, isLight, pulseEnergy) => {
      baseMat.color.setHex(isLight ? 0xe2e8f0 : 0x0f172a);
      helixGroup.rotation.y += dt * (0.28 + pulseEnergy * 1.4);

      stations.forEach((s, idx) => {
        const selected = activeId === s.id;
        const targetScale = selected ? 1.38 : 1;
        const sc = THREE.MathUtils.damp(s.node.scale.x, targetScale, 7, dt);
        s.node.scale.setScalar(sc);
        s.node.rotation.y += dt * (0.9 + idx * 0.1);
        s.ring.scale.setScalar(selected ? 1.35 : 1 + Math.sin(elapsed * 2 + idx) * 0.06);
        const mat = s.node.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = THREE.MathUtils.damp(mat.emissiveIntensity, selected ? 1.0 : 0.36, 7, dt);
      });

      for (let i = 0; i < particleCount; i++) {
        const t = ((elapsed * 0.16 + i / particleCount) % 1);
        const a = t * Math.PI * 2.5 + (i % 2 === 0 ? 0 : Math.PI);
        const r = (1.15 - t * 0.22) + 0.14;
        _dummy.position.set(Math.cos(a) * r, 0.34 + t * 2.55, Math.sin(a) * r);
        _dummy.scale.setScalar(0.75 + Math.sin(t * Math.PI) * 0.65);
        _dummy.updateMatrix();
        particles.setMatrixAt(i, _dummy.matrix);
      }
      particles.instanceMatrix.needsUpdate = true;
    },
    dispose: () => disposeGroup(root, textures),
  };
}

// ============================================================================
// 4. EDUCATION SECTION: Tiered Academic Pedestal & Astrolabe Beacon
// ============================================================================
function buildEducationBeaconScene(isSoftwareGl: boolean, maxAniso: number): BuiltSectionScene {
  const root = new THREE.Group();
  const interactables: THREE.Object3D[] = [];
  const textures: THREE.Texture[] = [];

  const hotspots: SceneHotspotMeta[] = [
    {
      id: "pgdm",
      label: "PGDM · Business Analytics & Ops",
      metric: "2024 — 2026 · CGPA 7.03",
      detail: "Jaipuria School of Business · CRISP-DM, predictive modeling & executive BI.",
      accent: "#06b6d4",
      actionLabel: "Open PGDM Journey",
    },
    {
      id: "btech",
      label: "B.Tech · Chemical Engineering",
      metric: "2019 — 2023 · CGPA 6.74",
      detail: "SCRIET, CCS University Meerut · SAP ERP, thermodynamic modeling & IIT Roorkee seminars.",
      accent: "#6366f1",
      actionLabel: "Open B.Tech Journey",
    },
    {
      id: "twelfth",
      label: "12th · Physics, Chemistry, Math",
      metric: "2019 · 61% · UP Board",
      detail: "S Devi Inter College, Madhuban, Mau · Quantitative PCM foundation.",
      accent: "#f59e0b",
      actionLabel: "Open 12th Journey",
    },
    {
      id: "tenth",
      label: "10th · Science Stream",
      metric: "81.33% · UP Board",
      detail: "S Devi Inter College, Madhuban, Mau · Core mathematical & scientific distinction.",
      accent: "#10b981",
      actionLabel: "Open 10th Journey",
    },
  ];

  // Four ascending beveled hexagonal academic tiers
  const tierDefs = [
    { id: "tenth", radius: 1.9, y: 0.08, height: 0.22, color: 0x10b981 },
    { id: "twelfth", radius: 1.52, y: 0.36, height: 0.24, color: 0xf59e0b },
    { id: "btech", radius: 1.16, y: 0.66, height: 0.26, color: 0x6366f1 },
    { id: "pgdm", radius: 0.82, y: 0.98, height: 0.28, color: 0x06b6d4 },
  ];

  const tierRefs: { mesh: THREE.Mesh; trim: THREE.Mesh; baseY: number; id: string }[] = [];
  tierDefs.forEach((t) => {
    const shape = createBeveledPolygonShape(6, t.radius);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: t.height,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.035,
      bevelSegments: 2,
    });
    geo.rotateX(-Math.PI / 2);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      emissive: t.color,
      emissiveIntensity: 0.16,
      metalness: 0.72,
      roughness: 0.28,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.y = t.y;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData.hotspotId = t.id;
    root.add(mesh);
    interactables.push(mesh);

    const trim = new THREE.Mesh(
      new THREE.TorusGeometry(t.radius * 0.94, 0.022, 10, 6),
      new THREE.MeshStandardMaterial({
        color: t.color,
        emissive: t.color,
        emissiveIntensity: 0.55,
        metalness: 0.85,
        roughness: 0.18,
      })
    );
    trim.rotation.x = Math.PI / 2;
    trim.rotation.z = Math.PI / 6;
    trim.position.y = t.y + t.height + 0.04;
    root.add(trim);

    tierRefs.push({ mesh, trim, baseY: t.y, id: t.id });
  });

  // Top dial decal
  const dialTex = createDialCanvasTexture("ACADEMICS", "10TH → PGDM", "#38bdf8", maxAniso);
  textures.push(dialTex);
  const dial = new THREE.Mesh(
    new THREE.CircleGeometry(0.68, 36),
    new THREE.MeshStandardMaterial({
      map: dialTex,
      transparent: true,
      roughness: 0.35,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    })
  );
  dial.rotation.x = -Math.PI / 2;
  dial.position.y = 1.31;
  root.add(dial);

  // Rotating Academic Astrolabe Crown
  const astrolabe = new THREE.Group();
  astrolabe.position.set(0, 2.05, 0);
  const brassMat = new THREE.MeshPhysicalMaterial({
    color: 0xf59e0b,
    metalness: 0.94,
    roughness: 0.16,
    clearcoat: 0.6,
  });
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.68, 0.03, 14, 56), brassMat);
  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(0.52, 0.025, 14, 48),
    new THREE.MeshStandardMaterial({ color: 0x22d3ee, emissive: 0x0891b2, emissiveIntensity: 0.45, metalness: 0.85, roughness: 0.2 })
  );
  const beaconCrystal = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.28, 0),
    new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.35,
      metalness: 0.1,
      roughness: 0.08,
      transmission: isSoftwareGl ? 0 : 0.86,
      transparent: true,
      opacity: isSoftwareGl ? 0.52 : 1,
      ior: 1.8,
      thickness: 0.9,
      depthWrite: false,
    })
  );
  beaconCrystal.userData.hotspotId = "pgdm";
  astrolabe.add(ring1, ring2, beaconCrystal);
  interactables.push(beaconCrystal);
  root.add(astrolabe);

  return {
    root,
    interactables,
    hotspots,
    cameraPos: [0.3, 2.6, 4.9],
    cameraTarget: [0, 1.2, 0],
    update: (dt, elapsed, activeId, isLight, pulseEnergy) => {
      tierRefs.forEach((t, idx) => {
        const selected = activeId === t.id;
        const mat = t.mesh.material as THREE.MeshStandardMaterial;
        mat.color.setHex(isLight ? 0xe2e8f0 : 0x1e293b);
        mat.emissiveIntensity = THREE.MathUtils.damp(mat.emissiveIntensity, selected ? 0.68 : 0.18, 7, dt);
        const lift = selected ? 0.12 : 0;
        t.mesh.position.y = THREE.MathUtils.damp(t.mesh.position.y, t.baseY + lift, 7, dt);
        t.trim.position.y = t.mesh.position.y + (0.22 + idx * 0.02) + 0.04;
      });

      astrolabe.position.y = 2.08 + Math.sin(elapsed * 1.6) * 0.08;
      ring1.rotation.y += dt * (0.55 + pulseEnergy * 1.5);
      ring1.rotation.x = Math.PI * 0.2 + Math.sin(elapsed * 0.8) * 0.25;
      ring2.rotation.x -= dt * 0.78;
      ring2.rotation.z += dt * 0.45;
      beaconCrystal.rotation.y -= dt * 0.9;
    },
    dispose: () => disposeGroup(root, textures),
  };
}

// ============================================================================
// 5. CERTIFICATIONS SECTION: 3D Holographic Medallion Vault
// ============================================================================
function buildCertificationsVaultScene(_isSoftwareGl: boolean, maxAniso: number): BuiltSectionScene {
  const root = new THREE.Group();
  const interactables: THREE.Object3D[] = [];
  const textures: THREE.Texture[] = [];

  const certDefs = [
    { id: "iimb", label: "Strategic Management", short: "STRATEGIC\nMGMT", issuer: "IIM Bangalore", year: "JAN 2026", accent: "#f59e0b", detail: "Executive strategic frameworks & competitive advantage · IIM Bangalore." },
    { id: "sixsigma", label: "Lean Six Sigma Green Belt", short: "SIX SIGMA\nGREEN BELT", issuer: "Grant Thornton", year: "NOV 2025", accent: "#10b981", detail: "DMAIC process optimization & statistical quality control · ID 8cc214ce5219." },
    { id: "aiprompts", label: "AI Chat Prompts for BA", short: "AI PROMPTS\nFOR BA", issuer: "LinkedIn Learning", year: "OCT 2025", accent: "#06b6d4", detail: "Applied prompt engineering for requirements & business analytics workflows." },
    { id: "genai", label: "What Is Generative AI?", short: "GENERATIVE\nAI", issuer: "LinkedIn Learning", year: "SEP 2025", accent: "#8b5cf6", detail: "Foundations of modern generative models and enterprise automation." },
    { id: "mdis", label: "International Business", short: "INTL\nBUSINESS", issuer: "MDIS Singapore", year: "MAR 2025", accent: "#ec4899", detail: "Global market expansion & cross-border operations strategy · Singapore." },
    { id: "mos", label: "MOS: Microsoft Excel Expert", short: "MOS EXCEL\nEXPERT", issuer: "Microsoft", year: "MAR 2025", accent: "#22c55e", detail: "Official Microsoft Office Specialist Excel Expert · ID UcLk-sFpA." },
    { id: "googleai", label: "Google AI Essentials", short: "GOOGLE AI\nESSENTIALS", issuer: "Google", year: "JAN 2025", accent: "#3b82f6", detail: "Practical AI productivity & responsible workflow integration · ID B0SW463I0XDY." },
  ];

  const hotspots: SceneHotspotMeta[] = certDefs.map((c) => ({
    id: c.id,
    label: c.label,
    metric: `${c.issuer} · ${c.year}`,
    detail: c.detail,
    accent: c.accent,
    actionLabel: "Inspect Certificate",
  }));

  // Machined vault turntable
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.82,
    roughness: 0.26,
  });
  const base = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.4, 0.2, 40), baseMat);
  base.position.y = 0.1;
  base.receiveShadow = true;
  root.add(base);

  // Central golden-cyan vault spire
  const spireMat = new THREE.MeshPhysicalMaterial({
    color: 0xf59e0b,
    metalness: 0.92,
    roughness: 0.16,
    clearcoat: 0.7,
  });
  const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.34, 1.55, 8), spireMat);
  spire.position.y = 0.96;
  spire.castShadow = true;
  root.add(spire);

  const crown = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.28, 0),
    new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.65, metalness: 0.7, roughness: 0.15 })
  );
  crown.position.y = 1.98;
  root.add(crown);

  // Carousel group of 7 metallic embossed medallions
  const carousel = new THREE.Group();
  root.add(carousel);

  const medallions: { group: THREE.Group; id: string; angle: number }[] = [];
  certDefs.forEach((c, idx) => {
    const angle = (idx / certDefs.length) * Math.PI * 2;
    const radius = 1.72;
    const medGroup = new THREE.Group();
    medGroup.position.set(Math.cos(angle) * radius, 1.24, Math.sin(angle) * radius);
    medGroup.lookAt(Math.cos(angle) * 4, 1.24, Math.sin(angle) * 4);

    // Metallic rim disc
    const rim = new THREE.Mesh(
      new THREE.CylinderGeometry(0.46, 0.46, 0.08, 32),
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(c.accent),
        metalness: 0.88,
        roughness: 0.2,
        clearcoat: 0.6,
      })
    );
    rim.rotation.x = Math.PI / 2;
    rim.castShadow = true;
    rim.userData.hotspotId = c.id;
    medGroup.add(rim);
    interactables.push(rim);

    // Front & back procedural seal faces
    const faceTex = createMedallionTexture(c.short, c.issuer, c.year, c.accent, maxAniso);
    textures.push(faceTex);
    const faceMat = new THREE.MeshStandardMaterial({
      map: faceTex,
      roughness: 0.32,
      metalness: 0.25,
    });
    const front = new THREE.Mesh(new THREE.CircleGeometry(0.42, 32), faceMat);
    front.position.z = 0.044;
    front.userData.hotspotId = c.id;
    const back = new THREE.Mesh(new THREE.CircleGeometry(0.42, 32), faceMat);
    back.rotation.y = Math.PI;
    back.position.z = -0.044;
    back.userData.hotspotId = c.id;
    medGroup.add(front, back);
    interactables.push(front, back);

    carousel.add(medGroup);
    medallions.push({ group: medGroup, id: c.id, angle });
  });

  let carouselYaw = 0;

  return {
    root,
    interactables,
    hotspots,
    cameraPos: [0, 2.05, 5.1],
    cameraTarget: [0, 1.15, 0],
    update: (dt, elapsed, activeId, isLight, pulseEnergy) => {
      baseMat.color.setHex(isLight ? 0xe2e8f0 : 0x0f172a);
      crown.rotation.y += dt * 0.9;
      crown.position.y = 1.98 + Math.sin(elapsed * 2) * 0.06;

      const selectedMed = medallions.find((m) => m.id === activeId);
      if (selectedMed) {
        // Smoothly bring selected medallion toward the +Z front camera axis
        const targetYaw = Math.PI / 2 - selectedMed.angle;
        const deltaAngle = Math.atan2(Math.sin(targetYaw - carouselYaw), Math.cos(targetYaw - carouselYaw));
        carouselYaw += deltaAngle * Math.min(1, dt * 4.5);
      } else {
        carouselYaw += dt * (0.28 + pulseEnergy * 1.4);
      }
      carousel.rotation.y = carouselYaw;

      medallions.forEach((m, idx) => {
        const selected = activeId === m.id;
        const targetScale = selected ? 1.24 : 1;
        const nextScale = THREE.MathUtils.damp(m.group.scale.x, targetScale, 7, dt);
        m.group.scale.setScalar(nextScale);
        m.group.position.y = 1.24 + (selected ? 0.18 : Math.sin(elapsed * 1.8 + idx) * 0.07);
      });
    },
    dispose: () => disposeGroup(root, textures),
  };
}

// ============================================================================
// 6. PROJECTS SECTION: 3D Analytical Terrain & Pipeline Studio
// ============================================================================
function buildProjectsTopologyScene(_isSoftwareGl: boolean, _maxAniso: number): BuiltSectionScene {
  const root = new THREE.Group();
  const interactables: THREE.Object3D[] = [];
  const textures: THREE.Texture[] = [];

  const hotspots: SceneHotspotMeta[] = [
    {
      id: "overview",
      label: "Full Analytical Landscape",
      metric: "6 End-to-End Case Studies",
      detail: "RFM 100K+ segmentation, HR ML flight-risk, SPSS statistics & enterprise BI.",
      accent: "#06b6d4",
      actionLabel: "Show All Projects",
    },
    {
      id: "python",
      label: "Python ML Cluster Space",
      metric: "RFM · Scikit-Learn · SPSS",
      detail: "High-dimensional customer & attrition clustering with live interactive simulator.",
      accent: "#10b981",
      actionLabel: "Open Python Studio",
    },
    {
      id: "powerbi",
      label: "Power BI Star-Schema Matrix",
      metric: "30+ Campuses · 14K+ Leads",
      detail: "Multi-dimensional KPI towers with DAX telemetry and live PBIX/file viewer.",
      accent: "#f59e0b",
      actionLabel: "Open Power BI Hub",
    },
  ];

  // Analytical console chassis
  const deckMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.78,
    roughness: 0.3,
  });
  const deck = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.18, 2.8), deckMat);
  deck.position.y = 0.09;
  deck.receiveShadow = true;
  root.add(deck);

  // Undulating 3D analytical KPI surface (PlaneGeometry with live vertex heights)
  const segX = 28;
  const segZ = 18;
  const surfGeo = new THREE.PlaneGeometry(3.8, 2.4, segX, segZ);
  surfGeo.rotateX(-Math.PI / 2);
  const posAttr = surfGeo.attributes.position as THREE.BufferAttribute;
  const colorArr = new Float32Array(posAttr.count * 3);
  surfGeo.setAttribute("color", new THREE.BufferAttribute(colorArr, 3));

  const surfMat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    metalness: 0.42,
    roughness: 0.32,
    wireframe: false,
    side: THREE.DoubleSide,
  });
  const surface = new THREE.Mesh(surfGeo, surfMat);
  surface.position.y = 0.55;
  surface.userData.hotspotId = "overview";
  root.add(surface);
  interactables.push(surface);

  const wireOverlay = new THREE.Mesh(
    surfGeo,
    new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    })
  );
  wireOverlay.position.y = 0.56;
  root.add(wireOverlay);

  // Power BI KPI Towers (interactive cluster on right)
  const biTowers: { mesh: THREE.Mesh; baseH: number }[] = [];
  const towerPositions = [
    [0.85, -0.55, 0.85],
    [1.32, -0.55, 1.35],
    [0.85, 0.1, 1.1],
    [1.32, 0.1, 1.65],
    [1.08, 0.68, 1.25],
  ];
  towerPositions.forEach(([x, z, h]) => {
    const m = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, h, 0.28),
      new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        emissive: 0xd97706,
        emissiveIntensity: 0.35,
        metalness: 0.7,
        roughness: 0.22,
      })
    );
    m.position.set(x, 0.22 + h / 2, z);
    m.castShadow = true;
    m.userData.hotspotId = "powerbi";
    root.add(m);
    interactables.push(m);
    biTowers.push({ mesh: m, baseH: h });
  });

  // Python ML 3D Scatter Cloud (InstancedMesh on left)
  const scatterCount = 32;
  const scatterSeeds: [number, number, number, number][] = [];
  const scatterMesh = new THREE.InstancedMesh(
    new THREE.IcosahedronGeometry(0.085, 0),
    new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.6,
      metalness: 0.5,
      roughness: 0.2,
    }),
    scatterCount
  );
  scatterMesh.frustumCulled = false;
  scatterMesh.userData.hotspotId = "python";
  const clusterColors = [0x10b981, 0x34d399, 0x22d3ee, 0xa855f7];
  for (let i = 0; i < scatterCount; i++) {
    const cluster = i % 3;
    const cx = -1.15 + (cluster - 1) * 0.35;
    const cz = (cluster - 1) * 0.45;
    const ox = Math.sin(i * 12.9898) * 0.38;
    const oy = 0.85 + Math.abs(Math.cos(i * 78.233)) * 0.95;
    const oz = Math.cos(i * 45.164) * 0.38;
    scatterSeeds.push([cx + ox, oy, cz + oz, i]);
    _color.setHex(clusterColors[i % clusterColors.length]);
    scatterMesh.setColorAt(i, _color);
  }
  if (scatterMesh.instanceColor) scatterMesh.instanceColor.needsUpdate = true;
  root.add(scatterMesh);
  interactables.push(scatterMesh);

  // Connecting ETL Data Arc between Python cluster and Power BI towers
  const arcCurve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-1.1, 1.35, 0),
    new THREE.Vector3(0, 2.35, -0.25),
    new THREE.Vector3(1.15, 1.55, 0)
  );
  const arcTube = new THREE.Mesh(
    new THREE.TubeGeometry(arcCurve, 40, 0.028, 10, false),
    new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.7,
      metalness: 0.75,
      roughness: 0.2,
    })
  );
  root.add(arcTube);

  const arcBeacon = new THREE.Mesh(
    new THREE.SphereGeometry(0.09, 14, 14),
    new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x38bdf8, emissiveIntensity: 1.1 })
  );
  root.add(arcBeacon);

  return {
    root,
    interactables,
    hotspots,
    cameraPos: [0, 2.75, 4.95],
    cameraTarget: [0, 0.9, 0],
    update: (dt, elapsed, activeId, isLight, pulseEnergy) => {
      deckMat.color.setHex(isLight ? 0xe2e8f0 : 0x0f172a);
      const isPython = activeId === "python";
      const isPowerBI = activeId === "powerbi";

      // Animate KPI surface wave
      const colorsAttr = surfGeo.attributes.color as THREE.BufferAttribute;
      const amp = 0.26 + pulseEnergy * 0.2;
      for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i);
        const z = posAttr.getZ(i);
        const y =
          Math.sin(x * 1.55 + elapsed * 1.15) * Math.cos(z * 1.45 - elapsed * 0.85) * amp +
          Math.sin((x + z) * 0.9 + elapsed * 0.7) * 0.12;
        posAttr.setY(i, y);

        const norm = THREE.MathUtils.clamp((y + 0.4) / 0.8, 0, 1);
        if (isPython) {
          _color.setRGB(0.05 + norm * 0.1, 0.45 + norm * 0.48, 0.45 + norm * 0.25);
        } else if (isPowerBI) {
          _color.setRGB(0.55 + norm * 0.42, 0.35 + norm * 0.42, 0.08 + norm * 0.12);
        } else {
          _color.setRGB(0.08 + norm * 0.3, 0.35 + norm * 0.48, 0.62 + norm * 0.34);
        }
        colorsAttr.setXYZ(i, _color.r, _color.g, _color.b);
      }
      posAttr.needsUpdate = true;
      colorsAttr.needsUpdate = true;
      surfGeo.computeVertexNormals();

      // Elevate BI towers when Power BI tab is active
      biTowers.forEach((t, idx) => {
        const target = isPowerBI ? 1.24 : 0.86 + Math.sin(elapsed * 1.6 + idx) * 0.08;
        t.mesh.scale.y = THREE.MathUtils.damp(t.mesh.scale.y, target, 6, dt);
        t.mesh.position.y = 0.22 + (t.baseH * t.mesh.scale.y) / 2;
        const m = t.mesh.material as THREE.MeshStandardMaterial;
        m.emissiveIntensity = THREE.MathUtils.damp(m.emissiveIntensity, isPowerBI ? 0.85 : 0.3, 6, dt);
      });

      // Float Python scatter points
      for (let i = 0; i < scatterCount; i++) {
        const [bx, by, bz, seed] = scatterSeeds[i];
        const boost = isPython ? 1.28 : 0.92;
        _dummy.position.set(
          bx + Math.sin(elapsed * 1.1 + seed) * 0.06,
          by + Math.cos(elapsed * 1.4 + seed) * 0.08 + (isPython ? 0.18 : 0),
          bz + Math.sin(elapsed * 0.9 + seed * 1.3) * 0.06
        );
        _dummy.scale.setScalar(boost);
        _dummy.rotation.set(elapsed + seed, elapsed * 0.6, 0);
        _dummy.updateMatrix();
        scatterMesh.setMatrixAt(i, _dummy.matrix);
      }
      scatterMesh.instanceMatrix.needsUpdate = true;

      // Animate traveling ETL packet along curve
      const pt = arcCurve.getPoint((elapsed * 0.42) % 1, _vecA);
      arcBeacon.position.copy(pt);
    },
    dispose: () => disposeGroup(root, textures),
  };
}

// ============================================================================
// 7. CONTACT SECTION: Interactive Orbital Signal Globe (Noida Hub)
// ============================================================================
function buildContactGlobeScene(isSoftwareGl: boolean, _maxAniso: number): BuiltSectionScene {
  const root = new THREE.Group();
  const interactables: THREE.Object3D[] = [];
  const textures: THREE.Texture[] = [];

  const hotspots: SceneHotspotMeta[] = [
    {
      id: "hub",
      label: "Noida, UP · India Hub",
      metric: "28.62° N · 77.36° E",
      detail: "Sector 62, Noida — Available for Data Analyst, BI & Automation collaborations worldwide.",
      accent: "#06b6d4",
      actionLabel: "Open Contact Form",
    },
    {
      id: "signal",
      label: "Direct Signal Channels",
      metric: "Email · LinkedIn · GitHub",
      detail: "Fast response for analytics consulting, full-time roles, and workflow architecture.",
      accent: "#a855f7",
      actionLabel: "Open Contact Form",
    },
  ];

  // Precision orbital stand base
  const standMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.85,
    roughness: 0.24,
  });
  const stand = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.4, 0.16, 32), standMat);
  stand.position.y = 0.08;
  stand.receiveShadow = true;
  root.add(stand);

  // Tilted globe cradle arc
  const cradle = new THREE.Mesh(
    new THREE.TorusGeometry(1.42, 0.04, 14, 64, Math.PI * 1.15),
    new THREE.MeshPhysicalMaterial({ color: 0x94a3b8, metalness: 0.92, roughness: 0.18, clearcoat: 0.5 })
  );
  cradle.position.set(0, 1.55, 0);
  cradle.rotation.z = -Math.PI * 0.57;
  root.add(cradle);

  // Globe group
  const globeGroup = new THREE.Group();
  globeGroup.position.set(0, 1.55, 0);
  root.add(globeGroup);

  const coreSphere = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.12, 3),
    new THREE.MeshPhysicalMaterial({
      color: 0x0c4a6e,
      emissive: 0x082f49,
      emissiveIntensity: 0.45,
      metalness: 0.4,
      roughness: 0.25,
      transmission: isSoftwareGl ? 0 : 0.35,
      transparent: true,
      opacity: isSoftwareGl ? 0.82 : 0.95,
      clearcoat: 0.8,
    })
  );
  coreSphere.userData.hotspotId = "hub";
  globeGroup.add(coreSphere);
  interactables.push(coreSphere);

  // Geodesic wireframe lattice
  const lattice = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.145, 2),
    new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.34,
    })
  );
  globeGroup.add(lattice);

  // Noida, India Beacon Pin on surface
  const lat = THREE.MathUtils.degToRad(28.6);
  const lon = THREE.MathUtils.degToRad(77.3);
  const rSurf = 1.15;
  const hubPos = new THREE.Vector3(
    rSurf * Math.cos(lat) * Math.cos(lon),
    rSurf * Math.sin(lat),
    rSurf * Math.cos(lat) * Math.sin(lon)
  );
  const hubBeacon = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 16, 16),
    new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      emissive: 0x06b6d4,
      emissiveIntensity: 1.2,
      metalness: 0.3,
      roughness: 0.15,
    })
  );
  hubBeacon.position.copy(hubPos);
  hubBeacon.userData.hotspotId = "hub";
  globeGroup.add(hubBeacon);
  interactables.push(hubBeacon);

  // Expanding pulse halo around Noida hub
  const hubHalo = new THREE.Mesh(
    new THREE.TorusGeometry(0.18, 0.018, 10, 32),
    new THREE.MeshBasicMaterial({ color: 0x67e8f9, transparent: true, opacity: 0.8 })
  );
  hubHalo.position.copy(hubPos);
  hubHalo.lookAt(hubPos.clone().multiplyScalar(2));
  globeGroup.add(hubHalo);

  // 3 Global Signal Transmission Arcs radiating from Noida
  const targets: [number, number][] = [
    [51.5, -0.1], // London
    [37.7, -122.4], // San Francisco
    [1.35, 103.8], // Singapore
  ];
  const signalArcs: { curve: THREE.QuadraticBezierCurve3; dot: THREE.Mesh }[] = [];
  targets.forEach(([tLat, tLon], idx) => {
    const pLat = THREE.MathUtils.degToRad(tLat);
    const pLon = THREE.MathUtils.degToRad(tLon);
    const end = new THREE.Vector3(
      rSurf * Math.cos(pLat) * Math.cos(pLon),
      rSurf * Math.sin(pLat),
      rSurf * Math.cos(pLat) * Math.sin(pLon)
    );
    const mid = hubPos.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(1.78);
    const curve = new THREE.QuadraticBezierCurve3(hubPos.clone(), mid, end);
    const arcColor = idx === 0 ? 0xa855f7 : idx === 1 ? 0x22d3ee : 0xf59e0b;
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 36, 0.018, 8, false),
      new THREE.MeshStandardMaterial({
        color: arcColor,
        emissive: arcColor,
        emissiveIntensity: 0.65,
        metalness: 0.5,
        roughness: 0.25,
      })
    );
    tube.userData.hotspotId = "signal";
    globeGroup.add(tube);
    interactables.push(tube);

    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.058, 12, 12),
      new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: arcColor, emissiveIntensity: 1.2 })
    );
    globeGroup.add(dot);
    signalArcs.push({ curve, dot });
  });

  // Equatorial satellite ring + instanced orbital stars
  const satRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.62, 0.016, 10, 72),
    new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.5, metalness: 0.85, roughness: 0.2 })
  );
  satRing.rotation.x = Math.PI * 0.42;
  satRing.rotation.y = 0.35;
  globeGroup.add(satRing);

  const starCount = 36;
  const stars = new THREE.InstancedMesh(
    new THREE.OctahedronGeometry(0.032, 0),
    new THREE.MeshStandardMaterial({ color: 0x93c5fd, emissive: 0x38bdf8, emissiveIntensity: 0.7 }),
    starCount
  );
  stars.frustumCulled = false;
  root.add(stars);

  return {
    root,
    interactables,
    hotspots,
    cameraPos: [0.4, 2.0, 4.45],
    cameraTarget: [0, 1.48, 0],
    update: (dt, elapsed, _activeId, isLight, pulseEnergy) => {
      standMat.color.setHex(isLight ? 0xe2e8f0 : 0x0f172a);
      globeGroup.rotation.y += dt * (0.26 + pulseEnergy * 1.6);
      satRing.rotation.z += dt * 0.35;

      const haloPhase = (elapsed * 0.9 + pulseEnergy) % 1;
      hubHalo.scale.setScalar(0.85 + haloPhase * 1.45);
      (hubHalo.material as THREE.MeshBasicMaterial).opacity = (1 - haloPhase) * 0.85;

      signalArcs.forEach((arc, idx) => {
        const t = (elapsed * 0.45 + idx * 0.33) % 1;
        arc.curve.getPoint(t, _vecB);
        arc.dot.position.copy(_vecB);
      });

      for (let i = 0; i < starCount; i++) {
        const a = (i / starCount) * Math.PI * 2 + elapsed * 0.14;
        const r = 1.9 + (i % 5) * 0.16;
        const y = 1.55 + Math.sin(i * 2.1 + elapsed * 0.6) * 0.95;
        _dummy.position.set(Math.cos(a) * r, y, Math.sin(a) * r);
        _dummy.scale.setScalar(0.75 + (i % 3) * 0.2);
        _dummy.updateMatrix();
        stars.setMatrixAt(i, _dummy.matrix);
      }
      stars.instanceMatrix.needsUpdate = true;
    },
    dispose: () => disposeGroup(root, textures),
  };
}

export function createSectionScene(
  variant: SectionSceneVariant,
  isSoftwareGl: boolean,
  maxAniso: number
): BuiltSectionScene {
  switch (variant) {
    case "about-bridge":
      return buildAboutBridgeScene(isSoftwareGl, maxAniso);
    case "capabilities-core":
      return buildCapabilitiesCoreScene(isSoftwareGl, maxAniso);
    case "experience-helix":
      return buildExperienceHelixScene(isSoftwareGl, maxAniso);
    case "education-beacon":
      return buildEducationBeaconScene(isSoftwareGl, maxAniso);
    case "certifications-vault":
      return buildCertificationsVaultScene(isSoftwareGl, maxAniso);
    case "projects-topology":
      return buildProjectsTopologyScene(isSoftwareGl, maxAniso);
    case "contact-globe":
      return buildContactGlobeScene(isSoftwareGl, maxAniso);
  }
}
