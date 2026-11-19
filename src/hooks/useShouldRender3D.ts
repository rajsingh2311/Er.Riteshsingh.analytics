import { useEffect, useState } from "react";

/**
 * Returns true on all screen sizes (desktop, tablet and mobile) unless the
 * visitor has asked for reduced motion. Defaults to false before mount, so the
 * first paint and search-engine crawlers never download or mount Three.js;
 * the 3D bundles are still lazy-loaded after the page has rendered.
 */
export function useShouldRender3D(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluate = () => {
      setEnabled(!reducedMotionQuery.matches);
    };

    evaluate();

    reducedMotionQuery.addEventListener("change", evaluate);

    return () => {
      reducedMotionQuery.removeEventListener("change", evaluate);
    };
  }, []);

  return enabled;
}
