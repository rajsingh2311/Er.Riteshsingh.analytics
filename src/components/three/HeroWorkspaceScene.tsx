import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { Eye, Laptop, Monitor, RotateCcw, User, ZoomIn, ZoomOut } from "lucide-react";
import { createStudioEnvironment, detectSoftwareWebGL, isWebGLAvailable } from "./webglUtils";

/**
 * Hero 3D scene: a professional analyst seated at a desk, typing on a laptop,
 * with a live Full-HD Power BI dashboard on the monitor and floating KPI tags.
 * Supports:
 *  - Interactive 3rd-person Desk View with OrbitControls
 *  - Analyst POV ("Model POV") seeing through the analyst's eyes over his typing hands
 *  - 1-click HD Monitor & SQL Laptop close-ups
 *  - Smooth HD Zooming (0.8x - 3.2x) with dynamic pixel-ratio supersampling
 */

type Disposable = { dispose: () => void };
type ViewMode = "desk" | "pov" | "monitor" | "laptop";

const MIN_ZOOM = 0.8;
const MAX_ZOOM = 3.2;

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

// ---------- High-DPI Canvas textures (3x Full HD logical scaling) ----------

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawDashboard(ctx: CanvasRenderingContext2D, bars: number[], line: number[], scale = 3) {
  const W = 640;
  const H = 380;
  ctx.save();
  ctx.setTransform(scale, 0, 0, scale, 0, 0);

  ctx.fillStyle = "#0b1220";
  ctx.fillRect(0, 0, W, H);

  // Header
  ctx.fillStyle = "#111a2e";
  ctx.fillRect(0, 0, W, 38);
  ctx.fillStyle = COLORS.teal;
  ctx.font = "bold 18px 'Segoe UI', Arial, sans-serif";
  ctx.fillText("Power BI · Group MIS Dashboard", 16, 25);
  ctx.fillStyle = "#64748b";
  ctx.font = "12px 'Segoe UI', Arial, sans-serif";
  ctx.fillText("LIVE · 30+ CAMPUSES · HD", W - 166, 24);

  // KPI cards
  const kpis = [
    { v: "30+", l: "Campuses", c: COLORS.teal, delta: "+4 YoY" },
    { v: "65%", l: "Faster leads", c: "#60a5fa", delta: "SLA <10m" },
    { v: "12h", l: "Saved / week", c: COLORS.purple, delta: "Auto MIS" },
  ];
  kpis.forEach((k, i) => {
    const x = 16 + i * ((W - 32) / 3);
    const w = (W - 32) / 3 - 10;
    ctx.fillStyle = "#111a2e";
    roundRect(ctx, x, 48, w, 66, 8);
    ctx.fill();
    ctx.strokeStyle = "rgba(148,163,184,0.16)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = k.c;
    ctx.font = "bold 26px 'Segoe UI', Arial, sans-serif";
    ctx.fillText(k.v, x + 12, 82);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "12px 'Segoe UI', Arial, sans-serif";
    ctx.fillText(k.l, x + 12, 102);
    ctx.fillStyle = k.c;
    ctx.font = "bold 10px Consolas, monospace";
    ctx.fillText(k.delta, x + w - 58, 66);
  });

  // Bar chart
  const chartX = 16;
  const chartY = 126;
  const chartW = W * 0.54;
  const chartH = H - chartY - 16;
  ctx.fillStyle = "#111a2e";
  roundRect(ctx, chartX, chartY, chartW, chartH, 8);
  ctx.fill();

  ctx.fillStyle = "#94a3b8";
  ctx.font = "bold 11px 'Segoe UI', Arial, sans-serif";
  ctx.fillText("Campus Enrollment & Collection Index", chartX + 12, chartY + 18);

  // Subtle horizontal reference grid
  ctx.strokeStyle = "rgba(148,163,184,0.12)";
  ctx.lineWidth = 1;
  for (let g = 0; g < 3; g++) {
    const gy = chartY + 42 + g * 54;
    ctx.beginPath();
    ctx.moveTo(chartX + 12, gy);
    ctx.lineTo(chartX + chartW - 12, gy);
    ctx.stroke();
  }

  const bw = (chartW - 30) / bars.length;
  const campusCodes = ["GZB", "LKO", "KAN", "NOI", "VAR", "PAT", "AGRA", "DEL"];
  bars.forEach((b, i) => {
    const maxBarH = chartH - 56;
    const h = maxBarH * b;
    const bx = chartX + 15 + i * bw + 3;
    const by = chartY + chartH - 24 - h;
    const grad = ctx.createLinearGradient(0, by, 0, chartY + chartH - 24);
    grad.addColorStop(0, i % 2 ? COLORS.purple : COLORS.teal);
    grad.addColorStop(1, "rgba(45,212,191,0.22)");
    ctx.fillStyle = grad;
    roundRect(ctx, bx, by, bw - 6, h, 3);
    ctx.fill();

    // Crisp value & campus code readable when zoomed in HD or in POV
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "bold 9px Consolas, monospace";
    ctx.textAlign = "center";
    ctx.fillText(`${Math.round(b * 100)}`, bx + (bw - 6) / 2, by - 4);
    ctx.fillStyle = "#64748b";
    ctx.fillText(campusCodes[i % campusCodes.length], bx + (bw - 6) / 2, chartY + chartH - 9);
  });
  ctx.textAlign = "left";

  // Line chart
  const lx = chartX + chartW + 10;
  const lw = W - lx - 16;
  ctx.fillStyle = "#111a2e";
  roundRect(ctx, lx, chartY, lw, chartH, 8);
  ctx.fill();

  ctx.fillStyle = "#94a3b8";
  ctx.font = "bold 11px 'Segoe UI', Arial, sans-serif";
  ctx.fillText("Fee Collection Trend (FY 26-27)", lx + 12, chartY + 18);

  // Trend grid
  ctx.strokeStyle = "rgba(148,163,184,0.12)";
  ctx.lineWidth = 1;
  for (let g = 0; g < 3; g++) {
    const gy = chartY + 48 + g * 50;
    ctx.beginPath();
    ctx.moveTo(lx + 12, gy);
    ctx.lineTo(lx + lw - 12, gy);
    ctx.stroke();
  }

  // Soft area fill under trend
  ctx.beginPath();
  line.forEach((p, i) => {
    const x = lx + 14 + (i / (line.length - 1)) * (lw - 28);
    const y = chartY + chartH - 22 - p * (chartH - 58);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = "#60a5fa";
  ctx.lineWidth = 2.8;
  ctx.stroke();

  // Data nodes on line chart
  line.forEach((p, i) => {
    const x = lx + 14 + (i / (line.length - 1)) * (lw - 28);
    const y = chartY + chartH - 22 - p * (chartH - 58);
    ctx.fillStyle = "#2dd4bf";
    ctx.beginPath();
    ctx.arc(x, y, 3.2, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

function makeCodeTexture(maxAniso: number): THREE.CanvasTexture {
  const scale = 3;
  const c = document.createElement("canvas");
  c.width = 384 * scale;
  c.height = 256 * scale;
  const ctx = c.getContext("2d")!;
  ctx.scale(scale, scale);

  ctx.fillStyle = "#0b1220";
  ctx.fillRect(0, 0, 384, 256);

  // Editor header tab
  ctx.fillStyle = "#111a2e";
  ctx.fillRect(0, 0, 384, 24);
  ctx.fillStyle = "#2dd4bf";
  ctx.font = "bold 10px Consolas, 'Courier New', monospace";
  ctx.fillText("● school_mis_analytics.sql", 10, 15);
  ctx.fillStyle = "#64748b";
  ctx.fillText("SQL · 30 rows", 296, 15);

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
  ctx.font = "14px Consolas, 'Courier New', monospace";
  lines.forEach(([col, txt], i) => {
    ctx.fillStyle = "#475569";
    ctx.fillText(String(i + 1).padStart(2, " "), 10, 48 + i * 22);
    ctx.fillStyle = col;
    ctx.fillText(txt, 38, 48 + i * 22);
  });

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.anisotropy = Math.min(maxAniso, 16);
  return tex;
}

function makeTagTexture(value: string, label: string, accent: string, maxAniso: number): THREE.CanvasTexture {
  const scale = 2;
  const c = document.createElement("canvas");
  c.width = 512 * scale;
  c.height = 150 * scale;
  const ctx = c.getContext("2d")!;
  ctx.scale(scale, scale);

  ctx.clearRect(0, 0, 512, 150);
  ctx.fillStyle = "rgba(11,18,32,0.92)";
  roundRect(ctx, 6, 6, 512 - 12, 150 - 12, 26);
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = accent;
  ctx.stroke();
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.arc(46, 75, 11, 0, Math.PI * 2);
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
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.anisotropy = Math.min(maxAniso, 16);
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
  const [viewMode, setViewMode] = useState<ViewMode>("desk");
  const [zoom, setZoom] = useState<number>(1);
  const [wheelActive, setWheelActive] = useState<boolean>(false);

  const viewModeRef = useRef<ViewMode>(viewMode);
  const zoomRef = useRef<number>(zoom);
  const wheelActiveRef = useRef<boolean>(wheelActive);
  const resetFnRef = useRef<(() => void) | null>(null);
  const applyZoomFnRef = useRef<((nextZoom: number) => void) | null>(null);

  const broadcastViewportMeta = useCallback((nextZoom: number, nextMode: ViewMode) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("three-viewport-update", {
        detail: {
          zoom: nextZoom,
          mode: nextMode === "desk" ? "desk" : "pov",
        },
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
        broadcastViewportMeta(clamped, viewModeRef.current);
        return clamped;
      });
    },
    [broadcastViewportMeta]
  );

  const switchViewMode = useCallback(
    (nextMode: ViewMode) => {
      viewModeRef.current = nextMode;
      setViewMode(nextMode);
      // Reset zoom to crisp 1.0x when switching viewpoints so framing is always centered
      zoomRef.current = 1;
      setZoom(1);
      applyZoomFnRef.current?.(1);
      broadcastViewportMeta(1, nextMode);
    },
    [broadcastViewportMeta]
  );

  useEffect(() => {
    wheelActiveRef.current = wheelActive;
  }, [wheelActive]);

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
    renderer.toneMappingExposure = 1.08;

    const basePixelRatio = soft ? 1 : Math.min(window.devicePixelRatio, small ? 1.5 : 2);
    const hdPixelRatio = soft
      ? 1
      : Math.min(Math.max(window.devicePixelRatio, 1.5) * (small ? 1.25 : 1.55), 3);
    let currentPixelRatio = basePixelRatio;
    renderer.setPixelRatio(currentPixelRatio);

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

    const maxAniso = renderer.capabilities.getMaxAnisotropy();

    const disposables: Disposable[] = [];
    const track = <T extends Disposable>(x: T): T => {
      disposables.push(x);
      return x;
    };

    const scene = new THREE.Scene();
    const envTex = track(createStudioEnvironment(renderer));
    scene.environment = envTex;

    const camera = new THREE.PerspectiveCamera(30, w0 / h0, 0.03, 100);

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

    // ---------- Monitor with Full-HD live Power BI dashboard ----------
    add(new THREE.CylinderGeometry(0.12, 0.13, 0.015, 32), metal, 0, 0.757, -0.2);
    add(rbox(0.045, 0.3, 0.03, 0.008), metal, 0, 0.9, -0.225);
    add(rbox(0.8, 0.48, 0.03, 0.012), dark, 0, 1.13, -0.2);
    const dashScale = soft ? 2 : 3;
    const dashCanvas = document.createElement("canvas");
    dashCanvas.width = 640 * dashScale;
    dashCanvas.height = 380 * dashScale;
    const dashCtx = dashCanvas.getContext("2d")!;
    let bars = [0.45, 0.62, 0.5, 0.78, 0.66, 0.84, 0.7, 0.92];
    let line = [0.2, 0.35, 0.3, 0.5, 0.45, 0.62, 0.7, 0.82];
    drawDashboard(dashCtx, bars, line, dashScale);
    const dashTex = track(new THREE.CanvasTexture(dashCanvas));
    dashTex.colorSpace = THREE.SRGBColorSpace;
    dashTex.minFilter = THREE.LinearMipmapLinearFilter;
    dashTex.magFilter = THREE.LinearFilter;
    dashTex.anisotropy = Math.min(maxAniso, 16);
    const screenMat = track(new THREE.MeshBasicMaterial({ map: dashTex, toneMapped: false }));
    const screen = new THREE.Mesh(track(new THREE.PlaneGeometry(0.76, 0.44)), screenMat);
    screen.position.set(0, 1.13, -0.184);
    model.add(screen);

    // ---------- Laptop with Full-HD SQL editor ----------
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
    const codeTex = track(makeCodeTexture(maxAniso));
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
    const limbDir = V(0, 0, 0);
    const limb = (a: THREE.Vector3, b: THREE.Vector3, r: number, m: THREE.Material) => {
      const mesh = new THREE.Mesh(track(new THREE.CapsuleGeometry(r, 1, 6, 14)), m);
      mesh.castShadow = !soft;
      mesh.receiveShadow = !soft;
      model.add(mesh);
      const set = (p: THREE.Vector3, q: THREE.Vector3) => {
        limbDir.subVectors(q, p);
        const len = Math.max(limbDir.length(), 0.001);
        mesh.position.copy(p).add(q).multiplyScalar(0.5);
        mesh.quaternion.setFromUnitVectors(UP, limbDir.divideScalar(len));
        mesh.scale.set(1, len / (1 + 2 * r), 1);
      };
      set(a, b);
      add(new THREE.SphereGeometry(r * 1.02, 14, 12), m, a.x, a.y, a.z);
      return set;
    };

    // Hips & legs
    add(rbox(0.34, 0.14, 0.28, 0.06), pants, 0, 0.56, 0.72);
    for (const sx of [-0.1, 0.1]) {
      limb(V(sx, 0.55, 0.7), V(sx, 0.54, 0.38), 0.068, pants);
      limb(V(sx, 0.53, 0.37), V(sx, 0.1, 0.35), 0.056, pants);
      add(rbox(0.1, 0.07, 0.21, 0.03), shoeMat, sx, 0.045, 0.31);
    }

    // Torso (blazer) with shirt and collar
    const torso = add(new THREE.CapsuleGeometry(0.14, 0.3, 8, 18), blazer, 0, 0.86, 0.73);
    torso.scale.set(1.18, 1, 0.78);
    torso.rotation.x = -0.1;
    const shirtV = add(rbox(0.09, 0.18, 0.02, 0.01), shirt, 0, 0.96, 0.627);
    shirtV.rotation.x = -0.1;

    // Neck & head (hidden cleanly when camera glides into Analyst POV)
    const neckMesh = add(new THREE.CylinderGeometry(0.045, 0.05, 0.09, 16), skin, 0, 1.1, 0.7);
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

    // ---------- Floating KPI tags ----------
    const tagDefs: Array<[string, string, string, THREE.Vector3]> = [
      ["30+", "Campuses", COLORS.teal, V(-0.78, 1.5, -0.05)],
      ["65%", "Faster leads", "#60a5fa", V(0.88, 1.38, -0.12)],
      ["12+ hrs", "Saved/week", COLORS.purple, V(0.92, 0.62, 0.3)],
    ];
    const tags = tagDefs.map(([v, l, c, p]) => {
      const tex = track(makeTagTexture(v, l, c, maxAniso));
      const sp = new THREE.Sprite(track(new THREE.SpriteMaterial({ map: tex, transparent: true, toneMapped: false })));
      sp.scale.set(0.56, 0.164, 1);
      sp.position.copy(p);
      model.add(sp);
      return { sp, base: p.clone() };
    });

    // Orient the workspace so monitor and analyst profile both read crisply in Desk View
    model.rotation.y = 0.6;

    // ---------- Floor glow & soft shadow ----------
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
    scene.add(new THREE.HemisphereLight(0xbfe6ff, 0x0b1020, 0.78));
    const key = new THREE.DirectionalLight(0xffffff, 1.72);
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

    // ---------- Auto-fit Desk Camera + OrbitControls ----------
    model.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const viewDir = V(1.0, 0.42, 0.62).normalize();
    let baseFitDist = 3.8;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false; // Handled via custom HD zoom system (wheel/pinch/buttons)
    controls.enableDamping = !soft;
    controls.dampingFactor = 0.07;
    controls.minPolarAngle = Math.PI * 0.14;
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.rotateSpeed = 0.65;

    let deskTransitioning = false;
    let zoomDamping = false;
    let isOrbitDragging = false;
    controls.addEventListener("start", () => {
      isOrbitDragging = true;
      deskTransitioning = false;
    });
    controls.addEventListener("end", () => {
      isOrbitDragging = false;
    });

    const computeFitDistance = () => {
      const vFov = THREE.MathUtils.degToRad(30);
      const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
      const halfW = Math.hypot(size.x, size.z) / 2;
      const halfH = size.y / 2;
      return (Math.max(halfH / Math.tan(vFov / 2), (halfW * 0.92) / Math.tan(hFov / 2)) + halfW * 0.35) * 1.03;
    };

    const fitDesk = () => {
      baseFitDist = computeFitDistance();
      if (viewModeRef.current === "desk") {
        const dist = baseFitDist / zoomRef.current;
        camera.fov = 30;
        camera.position.copy(center).addScaledVector(viewDir, dist);
        controls.target.copy(center);
        camera.near = 0.03;
        camera.far = dist + 24;
        camera.updateProjectionMatrix();
        controls.update();
      }
    };
    fitDesk();

    const syncHdPixelRatio = () => {
      const needHd = zoomRef.current > 1.14 || viewModeRef.current !== "desk";
      const nextDpr = needHd ? hdPixelRatio : basePixelRatio;
      if (Math.abs(nextDpr - currentPixelRatio) > 0.05) {
        currentPixelRatio = nextDpr;
        renderer.setPixelRatio(currentPixelRatio);
      }
    };

    applyZoomFnRef.current = () => {
      zoomDamping = true;
      syncHdPixelRatio();
    };

    resetFnRef.current = () => {
      viewModeRef.current = "desk";
      setViewMode("desk");
      zoomRef.current = 1;
      setZoom(1);
      deskTransitioning = true;
      zoomDamping = true;
      syncHdPixelRatio();
      broadcastViewportMeta(1, "desk");
    };

    // ---------- Interaction: pointer look-around + HD wheel/pinch/double-click zoom ----------
    let targetYaw = 0;
    let targetPitch = 0;
    let povLookX = 0;
    let povLookY = 0;

    const onPointer = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / Math.max(r.width / 2, 1);
      const ny = (e.clientY - (r.top + r.height / 2)) / Math.max(r.height / 2, 1);
      if (viewModeRef.current === "desk") {
        targetYaw = THREE.MathUtils.clamp(nx, -1, 1) * 0.14;
        targetPitch = THREE.MathUtils.clamp(ny, -1, 1) * 0.035;
      } else {
        povLookX = THREE.MathUtils.clamp(nx, -1, 1);
        povLookY = THREE.MathUtils.clamp(ny, -1, 1);
      }
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const onHostPointerDown = () => {
      setWheelActive(true);
    };
    const onDocPointerDown = (e: PointerEvent) => {
      if (!host.contains(e.target as Node)) {
        setWheelActive(false);
      }
    };
    const onWheel = (e: WheelEvent) => {
      const allowWheel = e.ctrlKey || e.metaKey || e.shiftKey || wheelActiveRef.current;
      if (!allowWheel) return;
      e.preventDefault();
      const delta = -Math.sign(e.deltaY) * (Math.abs(e.deltaY) > 40 ? 0.22 : 0.12);
      updateZoom((prev) => prev + delta);
    };
    const onDoubleClick = () => {
      updateZoom((prev) => (prev > 1.35 ? 1 : 2.1));
    };

    // Touch two-finger pinch zoom
    let pinchStartDist = 0;
    let pinchStartZoom = 1;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        pinchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY,
        );
        pinchStartZoom = zoomRef.current;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && pinchStartDist > 10) {
        e.preventDefault();
        const currDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY,
        );
        updateZoom(pinchStartZoom * (currDist / pinchStartDist));
      }
    };

    host.addEventListener("pointerdown", onHostPointerDown);
    document.addEventListener("pointerdown", onDocPointerDown);
    host.addEventListener("wheel", onWheel, { passive: false });
    host.addEventListener("dblclick", onDoubleClick);
    host.addEventListener("touchstart", onTouchStart, { passive: true });
    host.addEventListener("touchmove", onTouchMove, { passive: false });

    // ---------- Resize ----------
    const ro = new ResizeObserver((entries) => {
      const e = entries[0];
      if (!e) return;
      const w = Math.max(Math.floor(e.contentRect.width), 260);
      const h = Math.max(Math.floor(e.contentRect.height), 240);
      camera.aspect = w / h;
      renderer.setSize(w, h);
      baseFitDist = computeFitDistance();
      if (viewModeRef.current === "desk") {
        camera.updateProjectionMatrix();
        zoomDamping = true;
      } else {
        camera.updateProjectionMatrix();
      }
    });
    ro.observe(host);

    // ---------- Visibility ----------
    let visible = true;
    const io = new IntersectionObserver((ents) => {
      visible = ents[0]?.isIntersecting ?? true;
    });
    io.observe(host);

    // ---------- Animation (zero per-frame heap allocations) ----------
    const clock = new THREE.Clock();
    let lastDash = 0;
    let raf = 0;
    let prevMode: ViewMode = "desk";

    const tmpA = V(0, 0, 0);
    const tmpB = V(0, 0, 0);
    const tmpOffset = V(0, 0, 0);
    const desiredCamPos = V(0, 0, 0);
    const desiredLookAt = V(0, 0, 0);
    const currentLookAt = center.clone();
    const headWorldPos = V(0, 0, 0);
    const deskDefaultPos = V(0, 0, 0);

    // Pre-allocated local POV targets inside `model` space
    const POV_EYE_LOCAL = V(0, 1.255, 0.545);
    const POV_LOOK_LOCAL = V(0, 1.03, -0.18);
    const MON_EYE_LOCAL = V(0, 1.135, 0.44);
    const MON_LOOK_LOCAL = V(0, 1.13, -0.184);
    const LAP_EYE_LOCAL = V(0.02, 1.015, 0.415);
    const LAP_LOOK_LOCAL = V(0.02, 0.885, 0.04);

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.getElapsedTime();

      const mode = viewModeRef.current;
      if (mode !== prevMode) {
        prevMode = mode;
        syncHdPixelRatio();
        if (mode === "desk") {
          deskTransitioning = true;
          controls.enabled = true;
        } else {
          controls.enabled = false;
          currentLookAt.copy(controls.target);
        }
      }

      // Gentle world parallax only in Desk View when not orbiting; level world cleanly in POV/screen modes
      const goalYaw = mode === "desk" && !isOrbitDragging ? targetYaw : 0;
      const goalPitch = mode === "desk" && !isOrbitDragging ? targetPitch : 0;
      world.rotation.y = THREE.MathUtils.damp(world.rotation.y, goalYaw, 4.5, dt);
      world.rotation.x = THREE.MathUtils.damp(world.rotation.x, goalPitch, 4.5, dt);

      // Typing hands (always alive, visible in foreground during Model POV!)
      for (let i = 0; i < 2; i++) {
        const tap = Math.max(0, Math.sin(t * 13 + i * 1.9)) * 0.012;
        const slide = Math.sin(t * 2.3 + i) * 0.012;
        tmpB.set(handBase[i].x + slide, handBase[i].y + tap, handBase[i].z);
        forearmSet[i](elbows[i], tmpB);
        hands[i].position.set(tmpB.x, tmpB.y, tmpB.z - 0.03);
      }

      // Head animation & breathing
      const glance = (Math.sin(t * 0.45) + 1) / 2;
      head.rotation.x = 0.16 - glance * 0.2;
      head.rotation.y = Math.sin(t * 0.3) * 0.08;
      torso.scale.y = 1 + Math.sin(t * 1.6) * 0.008;

      // Floating KPI tags (fade/hide slightly during tight screen close-ups so they never block screens)
      const hideTags = mode === "monitor" || mode === "laptop";
      tags.forEach(({ sp, base }, i) => {
        sp.visible = !hideTags;
        if (!hideTags) {
          tmpA.copy(base);
          tmpA.y += Math.sin(t * 1.1 + i * 2.1) * 0.03;
          sp.position.copy(tmpA);
        }
      });

      // Live Full-HD dashboard refresh
      if (t - lastDash > 1.4) {
        lastDash = t;
        bars = bars.map((b) => THREE.MathUtils.clamp(b + (Math.random() - 0.45) * 0.16, 0.25, 0.98));
        line = [
          ...line.slice(1),
          THREE.MathUtils.clamp(line[line.length - 1] + (Math.random() - 0.4) * 0.14, 0.15, 0.95),
        ];
        drawDashboard(dashCtx, bars, line, dashScale);
        dashTex.needsUpdate = true;
      }

      // Camera positioning per view mode
      model.updateMatrixWorld(true);
      const z = zoomRef.current;

      if (mode === "desk") {
        const targetFov = 30;
        if (Math.abs(camera.fov - targetFov) > 0.05) {
          camera.fov = THREE.MathUtils.damp(camera.fov, targetFov, 6, dt);
          camera.updateProjectionMatrix();
        }

        const targetDist = baseFitDist / z;
        if (deskTransitioning) {
          deskDefaultPos.copy(center).addScaledVector(viewDir, targetDist);
          camera.position.x = THREE.MathUtils.damp(camera.position.x, deskDefaultPos.x, 6, dt);
          camera.position.y = THREE.MathUtils.damp(camera.position.y, deskDefaultPos.y, 6, dt);
          camera.position.z = THREE.MathUtils.damp(camera.position.z, deskDefaultPos.z, 6, dt);
          controls.target.x = THREE.MathUtils.damp(controls.target.x, center.x, 6, dt);
          controls.target.y = THREE.MathUtils.damp(controls.target.y, center.y, 6, dt);
          controls.target.z = THREE.MathUtils.damp(controls.target.z, center.z, 6, dt);
          if (camera.position.distanceTo(deskDefaultPos) < 0.025) {
            deskTransitioning = false;
            zoomDamping = false;
          }
        } else if (zoomDamping) {
          tmpOffset.subVectors(camera.position, controls.target);
          const curDist = Math.max(0.2, tmpOffset.length());
          const nextDist = THREE.MathUtils.damp(curDist, targetDist, 7.5, dt);
          tmpOffset.normalize().multiplyScalar(nextDist);
          camera.position.copy(controls.target).add(tmpOffset);
          if (Math.abs(nextDist - targetDist) < 0.008) {
            zoomDamping = false;
          }
        }
        controls.update();
      } else {
        // First-person Analyst POV / Monitor HD / Laptop SQL
        let baseFov = 48;
        if (mode === "pov") {
          desiredCamPos.copy(POV_EYE_LOCAL);
          // Subtle breathing bob in first-person POV
          desiredCamPos.y += Math.sin(t * 1.6) * 0.004;
          desiredLookAt.set(
            POV_LOOK_LOCAL.x + povLookX * 0.34,
            POV_LOOK_LOCAL.y - povLookY * 0.22,
            POV_LOOK_LOCAL.z,
          );
          baseFov = 50;
        } else if (mode === "monitor") {
          desiredCamPos.copy(MON_EYE_LOCAL);
          desiredLookAt.set(
            MON_LOOK_LOCAL.x + povLookX * 0.12,
            MON_LOOK_LOCAL.y - povLookY * 0.08,
            MON_LOOK_LOCAL.z,
          );
          baseFov = 44;
        } else {
          desiredCamPos.copy(LAP_EYE_LOCAL);
          desiredLookAt.set(
            LAP_LOOK_LOCAL.x + povLookX * 0.08,
            LAP_LOOK_LOCAL.y - povLookY * 0.06,
            LAP_LOOK_LOCAL.z,
          );
          baseFov = 40;
        }

        // Convert local coordinates inside rotated `model` to world space
        model.localToWorld(desiredCamPos);
        model.localToWorld(desiredLookAt);

        camera.position.x = THREE.MathUtils.damp(camera.position.x, desiredCamPos.x, 6.5, dt);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, desiredCamPos.y, 6.5, dt);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, desiredCamPos.z, 6.5, dt);

        currentLookAt.x = THREE.MathUtils.damp(currentLookAt.x, desiredLookAt.x, 7.5, dt);
        currentLookAt.y = THREE.MathUtils.damp(currentLookAt.y, desiredLookAt.y, 7.5, dt);
        currentLookAt.z = THREE.MathUtils.damp(currentLookAt.z, desiredLookAt.z, 7.5, dt);
        camera.lookAt(currentLookAt);

        // Optical telephoto HD zoom inside POV & screen modes
        const targetFov = THREE.MathUtils.clamp(baseFov / z, 14, 62);
        if (Math.abs(camera.fov - targetFov) > 0.04) {
          camera.fov = THREE.MathUtils.damp(camera.fov, targetFov, 7, dt);
          camera.updateProjectionMatrix();
        }
      }

      // Hide head & neck seamlessly only when camera is close to/inside the analyst's head
      head.getWorldPosition(headWorldPos);
      const camToHead = camera.position.distanceTo(headWorldPos);
      const hideHead = mode !== "desk" && camToHead < 0.42;
      head.visible = !hideHead;
      neckMesh.visible = !hideHead;

      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      host.removeEventListener("pointerdown", onHostPointerDown);
      document.removeEventListener("pointerdown", onDocPointerDown);
      host.removeEventListener("wheel", onWheel);
      host.removeEventListener("dblclick", onDoubleClick);
      host.removeEventListener("touchstart", onTouchStart);
      host.removeEventListener("touchmove", onTouchMove);
      ro.disconnect();
      io.disconnect();
      controls.dispose();
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
  }, [supported, broadcastViewportMeta, updateZoom]);

  if (!supported) return null;

  const isHdActive = zoom > 1.14 || viewMode !== "desk";

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      {/* Isolated 3D viewport tagged so the cyan circle scroller activates ONLY inside */}
      <div
        ref={hostRef}
        data-3d-viewport="true"
        data-three-zoom={zoom.toFixed(2)}
        data-three-mode={viewMode === "desk" ? "desk" : "pov"}
        className={`relative w-full h-[320px] xs:h-[360px] sm:h-[420px] lg:h-[500px] ${
          viewMode === "desk" ? "cursor-grab active:cursor-grabbing" : "cursor-crosshair"
        }`}
        role="img"
        aria-label="Interactive 3D illustration of Ritesh Singh working at a desk with a live Power BI dashboard and analyst POV mode"
      />

      {/* Compact POV & HD Zoom control bar cleanly BELOW the 3D model (never covers the canvas) */}
      <div className="mt-2 w-full max-w-xl flex flex-wrap items-center justify-center gap-1.5 px-2">
        {/* Viewpoint switcher */}
        <div className="inline-flex items-center gap-1 rounded-xl border border-border/80 bg-card/95 p-1 shadow-sm">
          <button
            type="button"
            onClick={() => switchViewMode("desk")}
            className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-mono transition-colors cursor-pointer ${
              viewMode === "desk"
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
            title="3rd-person orbit view"
          >
            <User className="w-3 h-3 shrink-0" />
            <span>Desk</span>
          </button>
          <button
            type="button"
            onClick={() => switchViewMode("pov")}
            className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-mono transition-colors cursor-pointer ${
              viewMode === "pov"
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
            title="See through the 3D analyst's eyes"
          >
            <Eye className="w-3 h-3 shrink-0" />
            <span>Model POV</span>
          </button>
          <button
            type="button"
            onClick={() => switchViewMode("monitor")}
            className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-mono transition-colors cursor-pointer ${
              viewMode === "monitor"
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
            title="Focus Power BI Monitor in HD"
          >
            <Monitor className="w-3 h-3 shrink-0" />
            <span className="hidden xs:inline">BI Screen</span>
          </button>
          <button
            type="button"
            onClick={() => switchViewMode("laptop")}
            className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-mono transition-colors cursor-pointer ${
              viewMode === "laptop"
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
            title="Focus SQL Laptop in HD"
          >
            <Laptop className="w-3 h-3 shrink-0" />
            <span className="hidden xs:inline">SQL</span>
          </button>
        </div>

        {/* HD Zoom Controls */}
        <div className="inline-flex items-center gap-1 rounded-xl border border-border/80 bg-card/95 p-1 shadow-sm">
          <button
            type="button"
            onClick={() => updateZoom((z) => z - 0.35)}
            disabled={zoom <= MIN_ZOOM}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/70 disabled:opacity-40 transition-colors cursor-pointer"
            aria-label="Zoom out 3D workspace"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="min-w-[54px] text-center text-[11px] font-mono tabular-nums text-foreground">
            {Math.round(zoom * 100)}%
            {isHdActive && <span className="ml-0.5 text-[9px] font-bold text-primary">HD</span>}
          </span>
          <button
            type="button"
            onClick={() => updateZoom((z) => z + 0.35)}
            disabled={zoom >= MAX_ZOOM}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/70 disabled:opacity-40 transition-colors cursor-pointer"
            aria-label="Zoom in 3D workspace HD"
            title="HD Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => resetFnRef.current?.()}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-colors cursor-pointer"
            aria-label="Reset 3D camera and zoom"
            title="Reset view"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Subtle contextual micro-hint */}
      <p className="mt-1.5 text-[10px] font-mono text-muted-foreground text-center px-2">
        {viewMode === "pov"
          ? "Analyst POV active · Move pointer to look around desk · Click + scroll or +/- for HD zoom"
          : viewMode === "monitor" || viewMode === "laptop"
            ? "HD Close-up active · Click + scroll or +/- to zoom deeper"
            : wheelActive
              ? "Scroll to HD zoom · Drag to orbit · Double-click for 2× HD · Click outside to scroll page"
              : "Drag to orbit · Click + scroll or +/- for HD zoom · Switch to Model POV"}
      </p>
    </div>
  );
};

export default HeroWorkspaceScene;
