import { ArrowRight } from "lucide-react";

const frontend = ["HTML/CSS", "JavaScript","TypeScript", "React", "Next.js", "Tailwind CSS"];
const backend = ["Java", "C#", "Python", "Node.js", "PostgreSQL", "SQL Server", "Express.js"];
const mobile = ["Android (Java)", "Firebase"];

export default function TechStack() {
  return (
    <div className="card p-7 h-full">
      <div>
          {/* Location — Roboto Mono */}
          <div className="flex items-center gap-2 text-[var(--text-secondary)] text-[11px] font-medium uppercase tracking-[0.1em] mb-2 font-[var(--font-mono)]">
            02 - Capabilities
          </div>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
        <h2 className="section-title">Tech Stack</h2>
        <a href="/tech-stack" className="view-all">
          View All <ArrowRight size={14} />
        </a>
      </div>

      <div style={{ marginBottom: 18 }}>
        <p
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: 10,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Frontend
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {frontend.map((tech) => (
            <span key={tech} className="tag">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 18 }}>
        <p
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: 10,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Backend
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {backend.map((tech) => (
            <span key={tech} className="tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div>
        <p
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: 10,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Mobile
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {mobile.map((tech) => (
            <span key={tech} className="tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}