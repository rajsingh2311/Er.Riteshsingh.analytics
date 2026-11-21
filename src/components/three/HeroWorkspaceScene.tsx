import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { createStudioEnvironment, detectSoftwareWebGL, isWebGLAvailable } from "./webglUtils";

/**
 * Hero 3D scene: a professional analyst seated at a desk, typing on a laptop,
 * with a live Power BI-style dashboard on the monitor and floating KPI tags.
 * Borderless and transparent so it blends into the hero background.
 * The camera auto-fits the whole workspace into the available area.
 */

type Disposable = { dispose: () => void };

const COLORS = {
  skin: "#c68a5e",
  hair: "#1c1917",
  blazer: "#1f2a44",
  shirt: "#e8f1fb",
  pants: "#2b3442",
  shoes: "#111827",
  deskTop: "#5b4636",
  metal: "#1f2937",
  chair: "#1e293b",
  teal: "#2dd4bf",
  purple: "#a855f7",
};

// ---------- Canvas textures ----------

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawDashboard(ctx: CanvasRenderingContext2D, bars: number[], line: number[]) {
  const W = ctx.canvas.width;
  const H = ctx.canvas.height;
  ctx.fillStyle = "#0b1220";
  ctx.fillRect(0, 0, W, H);

  // Header
  ctx.fillStyle = "#111a2e";
  ctx.fillRect(0, 0, W, 38);
  ctx.fillStyle = COLORS.teal;
  ctx.font = "bold 18px 'Segoe UI', Arial, sans-serif";
  ctx.fillText("Power BI · Group MIS Dashboard", 16, 25);
  ctx.fillStyle = "#64748b";
  ctx.font = "13px 'Segoe UI', Arial, sans-serif";
  ctx.fillText("Live · 30+ campuses", W - 150, 25);

  // KPI cards
  const kpis = [
    { v: "30+", l: "Campuses", c: COLORS.teal },
    { v: "65%", l: "Faster leads", c: "#60a5fa" },
    { v: "12h", l: "Saved / week", c: COLORS.purple },
  ];
  kpis.forEach((k, i) => {
    const x = 16 + i * ((W - 32) / 3);
    const w = (W - 32) / 3 - 10;
    ctx.fillStyle = "#111a2e";
    roundRect(ctx, x, 50, w, 62, 8);
    ctx.fill();
    ctx.fillStyle = k.c;
    ctx.font = "bold 26px 'Segoe UI', Arial, sans-serif";
    ctx.fillText(k.v, x + 12, 84);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "13px 'Segoe UI', Arial, sans-serif";
    ctx.fillText(k.l, x + 12, 103);
  });

  // Bar chart
  const chartX = 16;
  const chartY = 126;
  const chartW = W * 0.52;
  const chartH = H - chartY - 16;
  ctx.fillStyle = "#111a2e";
  roundRect(ctx, chartX, chartY, chartW, chartH, 8);
  ctx.fill();
  const bw = (chartW - 30) / bars.length;
  bars.forEach((b, i) => {
    const h = (chartH - 30) * b;
    const grad = ctx.createLinearGradient(0, chartY + chartH - 12 - h, 0, chartY + chartH - 12);
    grad.addColorStop(0, i % 2 ? COLORS.purple : COLORS.teal);
    grad.addColorStop(1, "rgba(45,212,191,0.25)");
    ctx.fillStyle = grad;
    roundRect(ctx, chartX + 15 + i * bw + 3, chartY + chartH - 12 - h, bw - 6, h, 3);
    ctx.fill();
  });

  // Line chart
  const lx = chartX + chartW + 10;
  const lw = W - lx - 16;
  ctx.fillStyle = "#111a2e";
  roundRect(ctx, lx, chartY, lw, chartH, 8);
  ctx.fill();
  ctx.strokeStyle = "#60a5fa";
  ctx.lineWidth = 3;
  ctx.beginPath();
  line.forEach((p, i) => {
    const x = lx + 12 + (i / (line.length - 1)) * (lw - 24);
    const y = chartY + chartH - 14 - p * (chartH - 34);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.fillStyle = "#94a3b8";
  ctx.font = "12px 'Segoe UI', Arial, sans-serif";
  ctx.fillText("Fee collection trend", lx + 12, chartY + 18);
}

function makeCodeTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 384;
  c.height = 256;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#0b1220";
  ctx.fillRect(0, 0, c.width, c.height);
  const lines: Array<[string, string]> = [
    ["#a855f7", "SELECT campus,"],
    ["#e2e8f0", "  SUM(fee_collected) AS fees,"],
    ["#e2e8f0", "  COUNT(admission_id) AS admits"],
    ["#a855f7", "FROM school_mis"],
    ["#a855f7", "WHERE"],
    ["#e2e8f0", "  session = '2026-27'"],
    ["#a855f7", "GROUP BY campus"],
    ["#a855f7", "ORDER BY fees DESC;"],
    ["#2dd4bf", "-- 30 rows · refreshed to Power BI"],
  ];
  ctx.font = "16px Consolas, 'Courier New', monospace";
  lines.forEach(([col, txt], i) => {
    ctx.fillStyle = "#475569";
    ctx.fillText(String(i + 1).padStart(2, " "), 10, 30 + i * 24);
    ctx.fillStyle = col;
    ctx.fillText(txt, 40, 30 + i * 24);
  });
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeTagTexture(value: string, label: string, accent: string): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 150;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.fillStyle = "rgba(11,18,32,0.92)";
  roundRect(ctx, 6, 6, c.width - 12, c.height - 12, 26);
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = accent;
  ctx.stroke();
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.arc(46, c.height / 2, 11, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 52px 'Segoe UI', Arial, sans-serif";
  ctx.fillText(value, 74, 92);
  const vw = ctx.measureText(value).width;
  ctx.fillStyle = "#cbd5e1";
  ctx.font = "30px 'Segoe UI', Arial, sans-serif";
  ctx.fillText(label, 74 + vw + 18, 90);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeGlowTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, "rgba(45,212,191,0.45)");
  g.addColorStop(0.45, "rgba(45,212,191,0.14)");
  g.addColorStop(1, "rgba(45,212,191,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ---------- Component ----------

const HeroWorkspaceScene = () => {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [supported] = useState<boolean>(() => isWebGLAvailable());

  useEffect(() => {
    if (!supported) return;
    const host = hostRef.current;
    if (!host) return;

    const soft = detectSoftwareWebGL();
    const small = window.innerWidth < 768;

    const renderer = new THREE.WebGLRenderer({
      antialias: !soft,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setPixelRatio(soft ? 1 : Math.min(window.devicePixelRatio, small ? 1.5 : 2));
    renderer.shadowMap.enabled = !soft;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);
    const w0 = Math.max(host.clientWidth, 280);
    const h0 = Math.max(host.clientHeight, 260);
    renderer.setSize(w0, h0);
    Object.assign(renderer.domElement.style, {
      display: "block",
      width: "100%",
      height: "100%",
      touchAction: "pan-y",
    });
    host.appendChild(renderer.domElement);

    const disposables: Disposable[] = [];
    const track = <T extends Disposable>(x: T): T => {
      disposables.push(x);
      return x;
    };

    const scene = new THREE.Scene();
    const envTex = track(createStudioEnvironment(renderer));
    scene.environment = envTex;

    const camera = new THREE.PerspectiveCamera(30, w0 / h0, 0.05, 100);

    const world = new THREE.Group();
    scene.add(world);
    const model = new THREE.Group(); // everything that must stay in frame
    world.add(model);

    const mat = (color: string, roughness = 0.6, metalness = 0, extra: THREE.MeshStandardMaterialParameters = {}) =>
      track(new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra }));
    const add = (
      geo: THREE.BufferGeometry,
      material: THREE.Material,
      x: number,
      y: number,
      z: number,
      parent: THREE.Object3D = model,
    ) => {
      const mesh = new THREE.Mesh(track(geo), material);
      mesh.position.set(x, y, z);
      mesh.castShadow = !soft;
      mesh.receiveShadow = !soft;
      parent.add(mesh);
      return mesh;
    };
    const rbox = (w: number, h: number, d: number, r = 0.02) => new RoundedBoxGeometry(w, h, d, 4, r);

    const skin = mat(COLORS.skin, 0.55);
    const hairMat = mat(COLORS.hair, 0.8);
    const blazer = mat(COLORS.blazer, 0.75);
    const shirt = mat(COLORS.shirt, 0.7);
    const pants = mat(COLORS.pants, 0.8);
    const shoeMat = mat(COLORS.shoes, 0.45, 0.1);
    const metal = mat(COLORS.metal, 0.35, 0.75);
    const chrome = mat("#9ca3af", 0.25, 0.9);
    const fabric = mat(COLORS.chair, 0.92);
    const wood = mat(COLORS.deskTop, 0.5, 0.05);
    const alu = mat("#cbd5e1", 0.32, 0.7);
    const dark = mat("#0f172a", 0.4, 0.3);

    // ---------- Desk ----------
    add(rbox(1.5, 0.05, 0.7, 0.012), wood, 0, 0.725, 0);
    for (const sx of [-0.7, 0.7]) {
      for (const sz of [-0.3, 0.3]) add(rbox(0.04, 0.7, 0.04, 0.008), metal, sx, 0.35, sz);
    }
    add(rbox(1.38, 0.04, 0.03, 0.008), metal, 0, 0.66, -0.3); // back rail

    // ---------- Monitor with live dashboard ----------
    add(new THREE.CylinderGeometry(0.12, 0.13, 0.015, 32), metal, 0, 0.757, -0.2);
    add(rbox(0.045, 0.3, 0.03, 0.008), metal, 0, 0.9, -0.225);
    add(rbox(0.8, 0.48, 0.03, 0.012), dark, 0, 1.13, -0.2);
    const dashCanvas = document.createElement("canvas");
    dashCanvas.width = 640;
    dashCanvas.height = 380;
    const dashCtx = dashCanvas.getContext("2d")!;
    let bars = [0.45, 0.62, 0.5, 0.78, 0.66, 0.84, 0.7, 0.92];
    let line = [0.2, 0.35, 0.3, 0.5, 0.45, 0.62, 0.7, 0.82];
    drawDashboard(dashCtx, bars, line);
    const dashTex = track(new THREE.CanvasTexture(dashCanvas));
    dashTex.colorSpace = THREE.SRGBColorSpace;
    const screenMat = track(new THREE.MeshBasicMaterial({ map: dashTex, toneMapped: false }));
    const screen = new THREE.Mesh(track(new THREE.PlaneGeometry(0.76, 0.44)), screenMat);
    screen.position.set(0, 1.13, -0.184);
    model.add(screen);

    // ---------- Laptop ----------
    add(rbox(0.36, 0.018, 0.25, 0.006), alu, 0.02, 0.759, 0.13);
    const keys = new THREE.Mesh(track(new THREE.PlaneGeometry(0.31, 0.12)), dark);
    keys.rotation.x = -Math.PI / 2;
    keys.position.set(0.02, 0.7685, 0.16);
    model.add(keys);
    const lidPivot = new THREE.Group();
    lidPivot.position.set(0.02, 0.768, 0.005);
    lidPivot.rotation.x = -0.28;
    model.add(lidPivot);
    add(rbox(0.36, 0.24, 0.012, 0.006), alu, 0, 0.12, 0, lidPivot);
    const codeTex = track(makeCodeTexture());
    const lidScreen = new THREE.Mesh(
      track(new THREE.PlaneGeometry(0.33, 0.21)),
      track(new THREE.MeshBasicMaterial({ map: codeTex, toneMapped: false })),
    );
    lidScreen.position.set(0, 0.12, 0.0065);
    lidPivot.add(lidScreen);

    // ---------- Desk props ----------
    const mug = mat("#e2e8f0", 0.35);
    add(new THREE.CylinderGeometry(0.038, 0.034, 0.09, 24), mug, 0.5, 0.795, 0.12);
    const handle = add(new THREE.TorusGeometry(0.024, 0.007, 10, 20), mug, 0.543, 0.8, 0.12);
    handle.rotation.y = Math.PI / 2;
    add(new THREE.CylinderGeometry(0.033, 0.033, 0.004, 24), mat("#3b2416", 0.3), 0.5, 0.838, 0.12);
    add(new THREE.CylinderGeometry(0.06, 0.05, 0.1, 24), mat("#334155", 0.7), -0.58, 0.8, -0.16);
    const leafMat = mat("#34d399", 0.6);
    for (let i = 0; i < 7; i++) {
      const leaf = add(new THREE.SphereGeometry(1, 12, 10), leafMat, -0.58, 0.92, -0.16);
      leaf.scale.set(0.022, 0.1, 0.01);
      leaf.rotation.set(Math.sin(i * 1.7) * 0.5, (i / 7) * Math.PI * 2, 0.35 + (i % 3) * 0.15);
    }
    add(rbox(0.2, 0.012, 0.27, 0.004), mat(COLORS.teal, 0.6), -0.36, 0.756, 0.13).rotation.y = 0.25;

    // ---------- Office chair ----------
    add(rbox(0.46, 0.07, 0.44, 0.03), fabric, 0, 0.47, 0.68);
    const back = add(rbox(0.44, 0.56, 0.06, 0.03), fabric, 0, 0.82, 0.93);
    back.rotation.x = 0.12;
    add(new THREE.CylinderGeometry(0.025, 0.025, 0.32, 16), chrome, 0, 0.28, 0.68);
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const spoke = add(rbox(0.3, 0.03, 0.04, 0.008), metal, Math.cos(a) * 0.15, 0.08, 0.68 + Math.sin(a) * 0.15);
      spoke.rotation.y = -a;
      add(new THREE.SphereGeometry(0.025, 12, 10), dark, Math.cos(a) * 0.29, 0.03, 0.68 + Math.sin(a) * 0.29);
    }

    // ---------- The professional (seated, facing the desk / -Z) ----------
    const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
    const UP = V(0, 1, 0);
    const limb = (a: THREE.Vector3, b: THREE.Vector3, r: number, m: THREE.Material) => {
      const mesh = new THREE.Mesh(track(new THREE.CapsuleGeometry(r, 1, 6, 14)), m);
      mesh.castShadow = !soft;
      mesh.receiveShadow = !soft;
      model.add(mesh);
      const set = (p: THREE.Vector3, q: THREE.Vector3) => {
        const dir = q.clone().sub(p);
        const len = Math.max(dir.length(), 0.001);
        mesh.position.copy(p).add(q).multiplyScalar(0.5);
        mesh.quaternion.setFromUnitVectors(UP, dir.normalize());
        // CapsuleGeometry(r, 1) is 1 + 2r tall; scale so the limb spans exactly a→b
        mesh.scale.set(1, len / (1 + 2 * r), 1);
      };
      set(a, b);
      // Rounded joint at the start point (shoulder / elbow / hip / knee)
      add(new THREE.SphereGeometry(r * 1.02, 14, 12), m, a.x, a.y, a.z);
      return set;
    };

    // Hips & legs
    add(rbox(0.34, 0.14, 0.28, 0.06), pants, 0, 0.56, 0.72);
    for (const sx of [-0.1, 0.1]) {
      limb(V(sx, 0.55, 0.7), V(sx, 0.54, 0.38), 0.068, pants); // thigh
      limb(V(sx, 0.53, 0.37), V(sx, 0.1, 0.35), 0.056, pants); // shin
      add(rbox(0.1, 0.07, 0.21, 0.03), shoeMat, sx, 0.045, 0.31);
    }

    // Torso (blazer) with shirt and collar
    const torso = add(new THREE.CapsuleGeometry(0.14, 0.3, 8, 18), blazer, 0, 0.86, 0.73);
    torso.scale.set(1.18, 1, 0.78);
    torso.rotation.x = -0.1;
    const shirtV = add(rbox(0.09, 0.18, 0.02, 0.01), shirt, 0, 0.96, 0.627);
    shirtV.rotation.x = -0.1;

    // Neck & head
    add(new THREE.CylinderGeometry(0.045, 0.05, 0.09, 16), skin, 0, 1.1, 0.7);
    const head = new THREE.Group();
    head.position.set(0, 1.235, 0.69);
    model.add(head);
    const skull = add(new THREE.SphereGeometry(0.105, 28, 22), skin, 0, 0, 0, head);
    skull.scale.set(0.92, 1.12, 1);
    const hair = add(
      new THREE.SphereGeometry(0.112, 28, 18, 0, Math.PI * 2, 0, Math.PI * 0.52),
      hairMat,
      0,
      0.022,
      0.01,
      head,
    );
    hair.scale.set(0.96, 1.05, 1.02);
    // Back of the head: hair down to the nape (sits inside the face at the front, so only shows behind/sides)
    const backHair = add(new THREE.SphereGeometry(0.106, 28, 20), hairMat, 0, -0.004, 0.02, head);
    backHair.scale.set(0.95, 1.02, 0.96);
    for (const sx of [-0.098, 0.098]) add(new THREE.SphereGeometry(0.022, 12, 10), skin, sx, -0.005, 0.01, head);
    add(new THREE.SphereGeometry(0.018, 12, 10), skin, 0, -0.01, -0.105, head); // nose
    const frame = mat("#0f172a", 0.3, 0.6);
    for (const sx of [-0.042, 0.042]) {
      const lens = add(new THREE.TorusGeometry(0.026, 0.004, 8, 24), frame, sx, 0.018, -0.1, head);
      lens.rotation.y = 0;
    }
    add(new THREE.BoxGeometry(0.03, 0.004, 0.004), frame, 0, 0.02, -0.102, head);

    // Arms (upper arm static, forearm + hand animated for typing)
    const shoulders = [V(-0.2, 1.0, 0.72), V(0.2, 1.0, 0.72)];
    const elbows = [V(-0.24, 0.81, 0.56), V(0.24, 0.81, 0.56)];
    const handBase = [V(-0.075, 0.786, 0.2), V(0.105, 0.786, 0.2)];
    const forearmSet: Array<(a: THREE.Vector3, b: THREE.Vector3) => void> = [];
    const hands: THREE.Mesh[] = [];
    for (let i = 0; i < 2; i++) {
      limb(shoulders[i], elbows[i], 0.052, blazer);
      forearmSet.push(limb(elbows[i], handBase[i], 0.042, blazer));
      const hand = add(new THREE.SphereGeometry(0.038, 16, 12), skin, handBase[i].x, handBase[i].y, handBase[i].z - 0.03);
      hand.scale.set(1, 0.55, 1.35);
      hands.push(hand);
    }

    // ---------- Floating KPI tags (part of the 3D scene, so they never cover page text) ----------
    const tagDefs: Array<[string, string, string, THREE.Vector3]> = [
      ["30+", "Campuses", COLORS.teal, V(-0.78, 1.5, -0.05)],
      ["65%", "Faster leads", "#60a5fa", V(0.88, 1.38, -0.12)],
      ["12+ hrs", "Saved/week", COLORS.purple, V(0.92, 0.62, 0.3)],
    ];
    const tags = tagDefs.map(([v, l, c, p]) => {
      const tex = track(makeTagTexture(v, l, c));
      const sp = new THREE.Sprite(track(new THREE.SpriteMaterial({ map: tex, transparent: true, toneMapped: false })));
      sp.scale.set(0.56, 0.164, 1);
      sp.position.copy(p);
      model.add(sp);
      return { sp, base: p.clone() };
    });

    // Orient the workspace so the monitor and the person's profile both read well
    model.rotation.y = 0.6;

    // ---------- Floor glow & soft shadow (not part of framing) ----------
    const glow = new THREE.Mesh(
      track(new THREE.PlaneGeometry(2.8, 2.8)),
      track(new THREE.MeshBasicMaterial({ map: track(makeGlowTexture()), transparent: true, depthWrite: false })),
    );
    glow.rotation.x = -Math.PI / 2;
    glow.position.y = 0.002;
    world.add(glow);
    if (!soft) {
      const shadowCatcher = new THREE.Mesh(
        track(new THREE.PlaneGeometry(3.2, 3.2)),
        track(new THREE.ShadowMaterial({ opacity: 0.35 })),
      );
      shadowCatcher.rotation.x = -Math.PI / 2;
      shadowCatcher.receiveShadow = true;
      world.add(shadowCatcher);
    }

    // ---------- Lights ----------
    scene.add(new THREE.HemisphereLight(0xbfe6ff, 0x0b1020, 0.75));
    const key = new THREE.DirectionalLight(0xffffff, 1.7);
    key.position.set(2.4, 4, 2.8);
    key.castShadow = !soft;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -1.8;
    key.shadow.camera.right = 1.8;
    key.shadow.camera.top = 1.8;
    key.shadow.camera.bottom = -1.8;
    key.shadow.bias = -0.0005;
    scene.add(key);
    const rimTeal = new THREE.PointLight(0x2dd4bf, 5, 6);
    rimTeal.position.set(-1.6, 1.7, -1.1);
    scene.add(rimTeal);
    const rimPurple = new THREE.PointLight(0xa855f7, 3.5, 6);
    rimPurple.position.set(1.7, 1.3, -1.3);
    scene.add(rimPurple);
    const screenGlow = new THREE.PointLight(0x7dd3fc, 1.1, 1.4);
    screenGlow.position.set(0, 1.1, 0.05);
    model.add(screenGlow);

    // ---------- Auto-fit camera ----------
    model.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const viewDir = V(1.0, 0.42, 0.62).normalize();
    const fit = () => {
      const vFov = THREE.MathUtils.degToRad(camera.fov);
      const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
      const halfW = Math.hypot(size.x, size.z) / 2;
      const halfH = size.y / 2;
      const dist = (Math.max(halfH / Math.tan(vFov / 2), (halfW * 0.92) / Math.tan(hFov / 2)) + halfW * 0.35) * 1.03;
      camera.position.copy(center).addScaledVector(viewDir, dist);
      camera.lookAt(center);
      camera.near = 0.05;
      camera.far = dist + 20;
      camera.updateProjectionMatrix();
    };
    fit();

    // ---------- Interaction: gentle turn toward the pointer ----------
    let targetYaw = 0;
    let targetPitch = 0;
    const onPointer = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / Math.max(window.innerWidth / 2, 1);
      const ny = (e.clientY - (r.top + r.height / 2)) / Math.max(window.innerHeight / 2, 1);
      targetYaw = THREE.MathUtils.clamp(nx, -1, 1) * 0.22;
      targetPitch = THREE.MathUtils.clamp(ny, -1, 1) * 0.05;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    // ---------- Resize ----------
    const ro = new ResizeObserver((entries) => {
      const e = entries[0];
      if (!e) return;
      const w = Math.max(Math.floor(e.contentRect.width), 260);
      const h = Math.max(Math.floor(e.contentRect.height), 240);
      camera.aspect = w / h;
      renderer.setSize(w, h);
      fit();
    });
    ro.observe(host);

    // ---------- Visibility (pause when off-screen or tab hidden) ----------
    let visible = true;
    const io = new IntersectionObserver((ents) => {
      visible = ents[0]?.isIntersecting ?? true;
    });
    io.observe(host);

    // ---------- Animation ----------
    const clock = new THREE.Clock();
    let lastDash = 0;
    let raf = 0;
    const tmpA = V(0, 0, 0);
    const tmpB = V(0, 0, 0);
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      const t = clock.getElapsedTime();

      // Turn toward pointer
      world.rotation.y += (targetYaw - world.rotation.y) * 0.05;
      world.rotation.x += (targetPitch - world.rotation.x) * 0.05;

      // Typing hands
      for (let i = 0; i < 2; i++) {
        const tap = Math.max(0, Math.sin(t * 13 + i * 1.9)) * 0.012;
        const slide = Math.sin(t * 2.3 + i) * 0.012;
        tmpB.copy(handBase[i]).add(V(slide, tap, 0));
        forearmSet[i](elbows[i], tmpB);
        hands[i].position.set(tmpB.x, tmpB.y, tmpB.z - 0.03);
      }

      // Head: glance between laptop and monitor, breathing
      const glance = (Math.sin(t * 0.45) + 1) / 2;
      head.rotation.x = 0.16 - glance * 0.2;
      head.rotation.y = Math.sin(t * 0.3) * 0.08;
      torso.scale.y = 1 + Math.sin(t * 1.6) * 0.008;

      // Floating KPI tags
      tags.forEach(({ sp, base }, i) => {
        tmpA.copy(base);
        tmpA.y += Math.sin(t * 1.1 + i * 2.1) * 0.03;
        sp.position.copy(tmpA);
      });

      // Live dashboard refresh
      if (t - lastDash > 1.4) {
        lastDash = t;
        bars = bars.map((b) => THREE.MathUtils.clamp(b + (Math.random() - 0.45) * 0.16, 0.25, 0.98));
        line = [...line.slice(1), THREE.MathUtils.clamp(line[line.length - 1] + (Math.random() - 0.4) * 0.14, 0.15, 0.95)];
        drawDashboard(dashCtx, bars, line);
        dashTex.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      ro.disconnect();
      io.disconnect();
      disposables.forEach((d) => {
        try {
          d.dispose();
        } catch {
          /* ignore */
        }
      });
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentElement === host) host.removeChild(renderer.domElement);
    };
  }, [supported]);

  if (!supported) return null;

  return (
    <div
      ref={hostRef}
      className="relative w-full h-[340px] xs:h-[380px] sm:h-[440px] lg:h-[540px]"
      role="img"
      aria-label="3D illustration of Ritesh Singh working at a desk with a live Power BI dashboard"
    />
  );
};

export default HeroWorkspaceScene;
