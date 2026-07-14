"use client";

import { useEffect, useState, useRef } from "react";

interface LoadingPageProps {
  onComplete?: () => void;
}

export default function LoadingPage({ onComplete }: LoadingPageProps) {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "reveal" | "exit" | "done">("loading");
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const alreadyPlayed = useRef(false);

  const DURATION = 2600;

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
          setPhase("reveal");
          setTimeout(() => {
            setPhase("exit");
            onComplete?.();
            sessionStorage.setItem("portfolio-loaded", "1");
            setTimeout(() => setPhase("done"), 700);
          }, 600);
        }, 300);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [mounted, onComplete]);

  if (!mounted || phase === "done") return null;

  const circumference = 2 * Math.PI * 44;
  const strokeOffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`loader-root ${phase === "reveal" ? "reveal" : ""} ${phase === "exit" ? "exit" : ""}`}>
      {/* Animated grid background */}
      <div className="loader-grid" />
      <div className="loader-vignette" />

      {/* Floating particles */}
      <div className="loader-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="loader-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Corner marks */}
      <div className="loader-corner loader-corner-tl" />
      <div className="loader-corner loader-corner-tr" />
      <div className="loader-corner loader-corner-bl" />
      <div className="loader-corner loader-corner-br" />

      <div className="loader-content">
        {/* Circular progress ring */}
        <div className="loader-ring-wrap">
          <svg className="loader-ring" viewBox="0 0 100 100">
            <circle
              className="loader-ring-bg"
              cx="50" cy="50" r="44"
              strokeWidth="1"
              fill="none"
            />
            <circle
              className="loader-ring-progress"
              cx="50" cy="50" r="44"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeOffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="loader-ring-inner">
            <span className="loader-ring-pct">{progress}</span>
          </div>
        </div>

        {/* Name */}
        <div className="loader-name">
          <span className="first">Julie Ann</span>
          <span className="last">Tiron</span>
        </div>

        {/* Badge */}
        <div className="loader-badge">Portfolio · 2026</div>

        {/* Progress bar */}
        <div className="loader-track-wrap">
          <div className="loader-track">
            <div className="loader-bar" style={{ width: `${progress}%` }} />
            <div className="loader-bar-glow" style={{ left: `${progress}%` }} />
          </div>
        </div>

        {/* Status dots */}
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
