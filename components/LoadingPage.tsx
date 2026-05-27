"use client";

import { useEffect, useState, useRef } from "react";

interface LoadingPageProps {
  onComplete?: () => void;
}

export default function LoadingPage({ onComplete }: LoadingPageProps) {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exit" | "done">("loading");
  const [dots, setDots] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  const DURATION = 2800;
  const labels = ["Initializing", "Loading Assets", "Almost Ready"];
  const getLabelIndex = () => {
    if (progress < 40) return 0;
    if (progress < 80) return 1;
    return 2;
  };

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
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
          setTimeout(() => setPhase("done"), 650);
        }, 350);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const id = setInterval(() => setDots((d) => (d + 1) % 4), 500);
    return () => clearInterval(id);
  }, [mounted]);

  if (!mounted || phase === "done") return null;

  return (
    <div className={`loader-root${phase === "exit" ? " exit" : ""}`}>
      <div className="loader-grid" />
      <div className="loader-vignette" />

      {/* Corner marks — hidden on very small screens */}
      <div className="loader-corner loader-corner-tl" />
      <div className="loader-corner loader-corner-tr" />
      <div className="loader-corner loader-corner-bl" />
      <div className="loader-corner loader-corner-br" />

      <div className="loader-content">
        <div className="loader-badge">Portfolio · 2026</div>

        <div className="loader-name">
          <span className="first">Julie Ann</span>
          <span className="last">Tiron</span>
        </div>

        <div className="loader-sep" />

        <div className="loader-track-wrap">
          <div className="loader-track">
            <div className="loader-bar" style={{ width: `${progress}%` }} />
          </div>
          <div className="loader-meta">
            <span className="loader-label">
              {labels[getLabelIndex()]}{"...".slice(0, dots)}
            </span>
            <span className="loader-pct">{progress}%</span>
          </div>
        </div>

        <div className="loader-dots">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={progress >= i * 20 + 10 ? "active" : ""} />
          ))}
        </div>
      </div>

      <div className="loader-footer">Loading Experience</div>
    </div>
  );
}