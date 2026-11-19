import { useEffect, useRef } from "react";

const InteractiveCursor = () => {
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || prefersReducedMotion) return;

    const ring = ringRef.current;
    if (!ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let currX = -100;
    let currY = -100;
    let isHoveringInteractive = false;
    let visible = false;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        currX = mouseX;
        currY = mouseY;
        visible = true;
        ring.style.opacity = "1";
      }

      const target = e.target as HTMLElement | null;
      const interactive = Boolean(
        target?.closest("a, button, [role='button'], canvas, input, textarea")
      );
      if (interactive !== isHoveringInteractive) {
        isHoveringInteractive = interactive;
        ring.dataset.active = interactive ? "true" : "false";
      }
    };

    const onLeave = () => {
      visible = false;
      ring.style.opacity = "0";
    };

    const animate = () => {
      currX += (mouseX - currX) * 0.18;
      currY += (mouseY - currY) * 0.18;
      const scale = isHoveringInteractive ? 1.45 : 1;
      ring.style.transform = `translate3d(${currX - 18}px, ${currY - 18}px, 0) scale(${scale})`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[90] hidden md:block w-9 h-9 rounded-full border border-primary/60 opacity-0 transition-[opacity,border-color,background-color] duration-200 will-change-transform data-[active=true]:border-primary data-[active=true]:bg-primary/10"
    />
  );
};

export default InteractiveCursor;
