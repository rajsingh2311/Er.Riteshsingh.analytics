import { useEffect, useRef } from "react";

const CIRCUMFERENCE = 2 * Math.PI * 19;

/**
 * Glowing cyan circle scroller / reticle that ONLY appears inside 3D model viewports
 * (`[data-3d-viewport="true"]`). Displays a live zoom arc and HD/POV readout while
 * hovering or zooming inside any 3D model, and hides completely over regular page UI.
 */
const InteractiveCursor = () => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<SVGCircleElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || prefersReducedMotion) return;

    const wrap = wrapRef.current;
    const progressCircle = progressRef.current;
    const labelEl = labelRef.current;
    if (!wrap || !progressCircle || !labelEl) return;

    let mouseX = -120;
    let mouseY = -120;
    let currX = -120;
    let currY = -120;
    let inside3D = false;
    let isDragging = false;
    let zoomRatio = 1;
    let activeMode = "";
    let activeViewport: HTMLElement | null = null;
    let wheelBoost = 0;
    let rafId = 0;

    const renderMeta = () => {
      // Normalize zoom 0.75..3.0 into progress 0.12..1.0
      const norm = Math.min(1, Math.max(0.12, (zoomRatio - 0.75) / 2.25));
      progressCircle.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - norm));

      if (activeMode === "pov") {
        labelEl.textContent = zoomRatio > 1.08 ? `POV · ${zoomRatio.toFixed(1)}× HD` : "POV";
      } else if (zoomRatio > 1.12) {
        labelEl.textContent = `${zoomRatio.toFixed(1)}× HD`;
      } else if (zoomRatio < 0.94) {
        labelEl.textContent = `${zoomRatio.toFixed(1)}×`;
      } else {
        labelEl.textContent = "3D";
      }
      wrap.dataset.hd = zoomRatio > 1.12 || activeMode === "pov" ? "true" : "false";
    };

    const syncViewportMeta = (viewport: HTMLElement | null) => {
      if (!viewport) return;
      const z = parseFloat(viewport.dataset.threeZoom || "1");
      if (Number.isFinite(z)) {
        zoomRatio = z;
      }
      activeMode = viewport.dataset.threeMode || "";
      renderMeta();
    };

    const setInsideState = (nextInside: boolean, viewport: HTMLElement | null) => {
      const viewportChanged = viewport !== activeViewport;
      activeViewport = viewport;
      if (nextInside !== inside3D) {
        inside3D = nextInside;
        wrap.style.opacity = nextInside ? "1" : "0";
        if (nextInside) {
          currX = mouseX;
          currY = mouseY;
        }
      }
      if (nextInside && viewportChanged) {
        syncViewportMeta(viewport);
      }
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const target = e.target as HTMLElement | null;
      const viewport = target?.closest("[data-3d-viewport='true']") as HTMLElement | null;
      setInsideState(Boolean(viewport), viewport);
    };

    const onDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-3d-viewport='true']")) {
        isDragging = true;
        wrap.dataset.active = "true";
      }
    };

    const onUp = () => {
      isDragging = false;
      wrap.dataset.active = "false";
    };

    const onLeave = () => {
      isDragging = false;
      setInsideState(false, null);
    };

    const onZoomUpdate = (e: Event) => {
      const detail = (e as CustomEvent<{ zoom?: number; mode?: string }>).detail;
      if (detail) {
        if (typeof detail.zoom === "number") zoomRatio = detail.zoom;
        if (typeof detail.mode === "string") activeMode = detail.mode;
        wheelBoost = 1;
        renderMeta();
      }
    };

    const animate = () => {
      currX += (mouseX - currX) * 0.22;
      currY += (mouseY - currY) * 0.22;
      wheelBoost *= 0.86;
      const zoomScale = 1 + Math.min(0.22, Math.max(-0.08, (zoomRatio - 1) * 0.1));
      const scale = (isDragging ? 0.88 : zoomScale) + wheelBoost * 0.12;
      wrap.style.transform = `translate3d(${currX - 22}px, ${currY - 22}px, 0) scale(${scale.toFixed(3)})`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    window.addEventListener("three-viewport-update", onZoomUpdate);
    document.addEventListener("mouseleave", onLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("three-viewport-update", onZoomUpdate);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[90] hidden md:flex items-center justify-center w-11 h-11 opacity-0 transition-opacity duration-200 will-change-transform group"
    >
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        className="overflow-visible drop-shadow-[0_0_8px_rgba(45,212,191,0.55)]"
      >
        <circle
          cx="22"
          cy="22"
          r="19"
          fill="rgba(45, 212, 191, 0.06)"
          stroke="rgba(45, 212, 191, 0.28)"
          strokeWidth="1.6"
        />
        <circle
          ref={progressRef}
          cx="22"
          cy="22"
          r="19"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * 0.85}
          transform="rotate(-90 22 22)"
          className="transition-[stroke-dashoffset] duration-150"
        />
      </svg>
      <span
        ref={labelRef}
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded bg-background/90 border border-primary/40 px-1.5 py-[1px] text-[9px] font-mono font-semibold tracking-tight text-primary whitespace-nowrap shadow-sm"
      >
        3D
      </span>
    </div>
  );
};

export default InteractiveCursor;
