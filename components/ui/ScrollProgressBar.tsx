"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgressBar
 *
 * A fixed thin bar at the very top of the viewport that shows how far
 * the user has scrolled down the page. Uses Framer Motion's `useScroll`
 * so updates bypass the React render cycle (direct DOM mutation).
 *
 * - `scaleX` driven by page-level `scrollYProgress` (0 → 1)
 * - `transformOrigin: "0%"` so it fills from left to right
 * - `aria-hidden` + `pointer-events: none` — decorative, non-interactive
 * - Still renders under `prefers-reduced-motion` (informational, not decorative)
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: "var(--accent)",
        transformOrigin: "0%",
        scaleX,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
}
