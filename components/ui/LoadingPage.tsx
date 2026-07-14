"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingPageProps {
  onComplete?: () => void;
}

export default function LoadingPage({ onComplete }: LoadingPageProps) {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exit" | "done">("loading");
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const alreadyPlayed = useRef(false);

  const DURATION = 2400;

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && sessionStorage.getItem("portfolio-loaded")) {
      alreadyPlayed.current = true;
      setPhase("done");
      onComplete?.();
    }
  }, [onComplete]);

  useEffect(() => {
    if (!mounted || alreadyPlayed.current) return;
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const raw = Math.min(elapsed / DURATION, 1);
      const eased = raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2;
      const next = Math.min(Math.round(eased * 100), 100);
      setProgress(next);
      if (next < 100) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setPhase("exit");
          onComplete?.();
          sessionStorage.setItem("portfolio-loaded", "1");
          setTimeout(() => setPhase("done"), 800);
        }, 400);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [mounted, onComplete]);

  if (!mounted || phase === "done") return null;

  const nameChars = "Julie Ann Tiron".split("");

  return (
    <AnimatePresence>
      <motion.div
          className="loader-root"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Subtle grid bg */}
          <div className="loader-grid" />
          <div className="loader-vignette" />

          {/* Corner marks */}
          <motion.div
            className="loader-corner loader-corner-tl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
          <motion.div
            className="loader-corner loader-corner-tr"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
          <motion.div
            className="loader-corner loader-corner-bl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <motion.div
            className="loader-corner loader-corner-br"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />

          <div className="loader-content">
            {/* Staggered character reveal */}
            <motion.div
              className="loader-name-chars"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.04, delayChildren: 0.3 } },
              }}
            >
              {nameChars.map((char, i) => (
                <motion.span
                  key={i}
                  className={`loader-char ${i >= 9 ? "italic" : ""}`}
                  variants={{
                    hidden: { opacity: 0, y: 40, rotateX: -90 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>

            {/* Subtitle badge */}
            <motion.div
              className="loader-badge"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              Portfolio · 2026
            </motion.div>

            {/* Minimal progress line */}
            <motion.div
              className="loader-track-wrap"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "center" }}
            >
              <div className="loader-track">
                <motion.div
                  className="loader-bar"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="loader-progress-ends">
                <span className="loader-progress-label">LOADING</span>
                <span className="loader-progress-pct">{progress}%</span>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            className="loader-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            Loading Experience
          </motion.div>
        </motion.div>
    </AnimatePresence>
  );
}
