"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 20, suffix: "+", label: "Technologies" },
  { value: 5,  suffix: "+", label: "Competitions" },
  { value: 3,  suffix: "+", label: "Certifications" },
  { value: null, suffix: "∞", label: "Curiosity" },
];

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function useCountUp(target: number | null, duration = 1400, started: boolean) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!started || target === null) return;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      setDisplay(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return target === null ? null : display;
}

function StatCell({
  value,
  suffix,
  label,
  index,
  started,
  isLast,
}: {
  value: number | null;
  suffix: string;
  label: string;
  index: number;
  started: boolean;
  isLast: boolean;
}) {
  const delayedStart = useRef(false);
  const [go, setGo] = useState(false);

  useEffect(() => {
    if (started && !delayedStart.current) {
      delayedStart.current = true;
      const t = setTimeout(() => setGo(true), index * 120);
      return () => clearTimeout(t);
    }
  }, [started, index]);

  const count = useCountUp(value, 1400, go);

  return (
    <div
      className={`px-6 py-7 ${!isLast ? "border-b border-[var(--border)] sm:border-b-0 sm:border-r" : ""}`}
    >
      <p
        style={{
          fontFamily: "var(--font-heading), serif",
          fontSize: "clamp(28px, 4vw, 40px)",
          fontWeight: 700,
          color: "var(--text-primary)",
          lineHeight: 1,
          marginBottom: 10,
        }}
      >
        {value === null ? "∞" : `${count}${suffix}`}
      </p>
      <p
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--text-secondary)",
        }}
      >
        {label}
      </p>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 border border-[var(--border)] mb-5"
    >
      {stats.map((stat, i) => (
        <StatCell
          key={i}
          value={stat.value}
          suffix={stat.suffix}
          label={stat.label}
          index={i}
          started={started}
          isLast={i === stats.length - 1}
        />
      ))}
    </div>
  );
}