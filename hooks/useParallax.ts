"use client";

import { useEffect, useRef } from "react";
import {
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  type MotionValue,
} from "framer-motion";

/**
 * useParallax
 *
 * Returns a MotionValue<number> representing a vertical parallax offset
 * and a `disabled` boolean indicating whether parallax is inactive.
 *
 * Motion is disabled when:
 *  - The user has `prefers-reduced-motion` enabled, OR
 *  - The viewport width is below 768 px (mobile)
 *
 * @param ref         - Ref attached to the section's outermost element
 * @param speed       - Parallax speed multiplier (range: -3.0 to 3.0).
 *                      Positive = element rises on scroll-down.
 * @param outputRange - Optional [min, max] pixel range.
 *                      Defaults to [speed * -60, speed * 60].
 */
export function useParallax(
  ref: React.RefObject<HTMLElement | null>,
  speed: number,
  outputRange?: [number, number]
): { y: MotionValue<number>; disabled: boolean } {
  // --- Accessibility: reduced-motion ---
  const prefersReducedMotion = useReducedMotion();

  // --- Mobile detection via ref + effect (no re-renders on scroll) ---
  const isMobileRef = useRef<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      isMobileRef.current = window.innerWidth < 768;
    };

    // Initial check
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // --- Scroll tracking tied to this section ---
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // --- Always call both hooks (React rules: no conditional hook calls) ---
  // Static zero value returned when motion is disabled
  const staticY = useMotionValue(0);

  // Compute effective speed: 0 when disabled, actual speed otherwise.
  // We read isMobileRef.current at render time for the initial frame;
  // the effect will update it on resize without causing re-renders.
  const disabled = Boolean(prefersReducedMotion) || isMobileRef.current;
  const effectiveSpeed = disabled ? 0 : speed;
  const range: [number, number] =
    outputRange ?? [effectiveSpeed * -60, effectiveSpeed * 60];

  // Always call useTransform (hooks must not be conditional)
  const animatedY = useTransform(scrollYProgress, [0, 1], range);

  // Return the static value when disabled, animated when enabled
  return {
    y: disabled ? staticY : animatedY,
    disabled,
  };
}
