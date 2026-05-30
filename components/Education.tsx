"use client";

import { useEffect, useRef } from "react";

interface EducationEntry {
  period: string;
  status: "ONGOING" | "GRADUATED";
  course: string;
  school: string;
  description?: string;
}

const entries: EducationEntry[] = [
  {
    period: "2023 — Present",
    status: "ONGOING",
    course: "BS Information Technology",
    school: "STI College Global City",
    description:
      "Third-year student specializing in backend development, database design, and cybersecurity. Active in coding competitions and hackathons.",
  },
  {
    period: "2021 — 2023",
    status: "GRADUATED",
    course: "Humanities and Social Sciences (HUMSS) Strand",
    school: "University of Makati",
  },
  {
    period: "2017 — 2021",
    status: "GRADUATED",
    course: "Junior High School",
    school: "Tibagan High School",
  },
  {
    period: "2011 — 2017",
    status: "GRADUATED",
    course: "Elementary Education",
    school: "East Rembo Elementary School",
  },
];

function GraduationCapIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3.33 2 8.67 2 12 0v-5" />
    </svg>
  );
}

function useReveal(ref: React.RefObject<HTMLElement | null>, delay = 0) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, delay]);
}

function EducationRow({ entry, index }: { entry: EducationEntry; index: number }) {
  const isFlipped = index % 2 === 1;
  const isFirst = index === 0;
  const base = index * 120;

  const metaRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useReveal(metaRef, base);
  useReveal(nodeRef, base + 80);
  useReveal(cardRef, base + 140);

  return (
    <article className={`edu-row${isFlipped ? " edu-row--flip" : ""}`}>
      <div className="edu-node">
        <div
          ref={nodeRef}
          className={`edu-node-circle edu-reveal from-down${isFirst ? " glow" : ""}`}
        >
          <GraduationCapIcon />
        </div>
      </div>

      <div ref={metaRef} className="edu-tl-meta edu-reveal from-down">
        <span className="edu-tl-year">{entry.period}</span>
        <span className={`edu-tl-status ${entry.status.toLowerCase()}`}>
          {entry.status}
        </span>
      </div>

      <div ref={cardRef} className="edu-tl-card edu-reveal from-down">
        <p className="edu-tl-course">{entry.course}</p>
        <p className="edu-tl-school">{entry.school}</p>
        {entry.description && (
          <>
            <div className="edu-tl-divider" />
            <p className="edu-tl-desc">{entry.description}</p>
          </>
        )}
      </div>
    </article>
  );
}

export default function Education() {
  return (
    <section id="education" className="education-section">
        <div className="section-subtitle">04 — Academic Background</div>
        <h2 className="section-title mb-6">Education</h2>

        <div className="edu-timeline">
          <div className="edu-timeline-spine" aria-hidden="true" />
          {entries.map((entry, i) => (
            <EducationRow key={entry.school} entry={entry} index={i} />
          ))}
        </div>
    </section>
  );
}
