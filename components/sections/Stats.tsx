"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useParallax } from "@/hooks";

const stats = [
  { value: 20, suffix: "+", label: "Technologies" },
  { value: 5, suffix: "+", label: "Competitions" },
  { value: 4, suffix: "+", label: "Projects" },
  { value: null, suffix: "∞", label: "Curiosity" },
];

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function useCountUp(target: number | null, duration = 1400, started: boolean) {
  const [display, setDisplay] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!started || target === null) return;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      setDisplay(Math.round(eased * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDone(true);
      }
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count: target === null ? null : display, done };
}

function StatCell({
  value,
  suffix,
  label,
  index,
  started,
  isLast,
  total,
}: {
  value: number | null;
  suffix: string;
  label: string;
  index: number;
  started: boolean;
  isLast: boolean;
  total: number;
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

  const { count, done } = useCountUp(value, 1400, go);

  return (
    <div
      className={`stats-cell ${!isLast ? "stats-cell--bordered" : ""}`}
    >
      <div className="stats-cell-inner">
        <p className="stats-cell-value">
          <span className={`stats-value-text ${done || value === null ? "stats-value-done" : ""}`}>
            {value === null ? "∞" : `${count}${suffix}`}
          </span>
        </p>
        <p className="stats-cell-label">{label}</p>
      </div>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const { y: gridY } = useParallax(sectionRef as React.RefObject<HTMLElement | null>, 0.25);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div ref={sectionRef} style={{ y: gridY }}>
      <div
        ref={ref}
        className="stats-grid-enhanced"
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
            total={stats.length}
          />
        ))}
      </div>
    </motion.div>
  );
}
