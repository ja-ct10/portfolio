"use client";

interface EducationEntry {
  period: string;
  status: string;
  course: string;
  school: string;
  description: string;
}

const entries: EducationEntry[] = [
  {
    period: "2023 — PRESENT",
    status: "ONGOING",
    course: "BS INFORMATION TECHNOLOGY",
    school: "STI College Global City",
    description:
      "Third-year student specializing in backend development, database design, and cybersecurity. Active in coding competitions and hackathons.",
  },
  {
    period: "2021 — 2023",
    status: "GRADUATED",
    course: "HUMANITIES AND SOCIAL SCIENCES (HUMSS) STRAND",
    school: "University of Makati",
    description: "",
  },
  {
    period: "2017 — 2021",
    status: "GRADUATED",
    course: "JUNIOR HIGH SCHOOL",
    school: "Tibagan High School",
    description: "",
  },
  {
    period: "2011 — 2017",
    status: "GRADUATED",
    course: "ELEMENTARY EDUCATION",
    school: "East Rembo Elementary School",
    description: "",
  },
];

function GraduationCapIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--text-primary)"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3.33 2 8.67 2 12 0v-5" />
    </svg>
  );
}

function EducationCard({ entry }: { entry: EducationEntry }) {
  return (
    <div className="project-card" style={{ gap: 0, padding: "20px" }}>
      <div className="edu-card-inner">
        {/* Icon badge */}
        <div className="edu-icon">
          <GraduationCapIcon />
        </div>

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1, minWidth: 0 }}>
          {/* Period + status row — wraps on mobile */}
          <div className="edu-meta">
            <span className="edu-period">{entry.period}</span>
            <span style={{ color: "var(--text-secondary)", fontSize: 11 }}>·</span>
            <span className="edu-status">{entry.status}</span>
          </div>

          {/* Course — allows wrapping on small screens */}
          <p
            className="section-title"
            style={{ fontSize: "clamp(15px, 2.5vw, 20px)", wordBreak: "break-word" }}
          >
            {entry.course}
          </p>

          {/* School */}
          <span className="edu-school">{entry.school}</span>

          {/* Description */}
          {entry.description ? (
            <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7, marginTop: 4 }}>
              {entry.description}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function Education() {
  return (
    <section>
        <div className="card p-7">
          <div className="section-subtitle">04 — Academic Background</div>
          <h2 className="section-title mb-6">Education</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {entries.map((entry) => (
              <EducationCard key={entry.school} entry={entry} />
            ))}
          </div>
        </div>
      </section>
  );
}