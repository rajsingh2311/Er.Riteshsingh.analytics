import { useEffect, useState } from "react";

/**
 * Returns true only on non-mobile viewports (>= 768px) when the user has NOT
 * requested reduced motion. Defaults to false before mount so mobile devices,
 * reduced-motion users, and initial SEO/first-paint never download or mount
 * Three.js bundles.
 */
export function useShouldRender3D(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluate = () => {
      setEnabled(desktopQuery.matches && !reducedMotionQuery.matches);
    };

    evaluate();

    desktopQuery.addEventListener("change", evaluate);
    reducedMotionQuery.addEventListener("change", evaluate);

    return () => {
      desktopQuery.removeEventListener("change", evaluate);
      reducedMotionQuery.removeEventListener("change", evaluate);
    };
  }, []);

  return enabled;
}
