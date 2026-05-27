"use client";
import { ArrowRight, ExternalLink, Cpu, ImageIcon } from "lucide-react";
import { ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Project {
  name: string;
  description: string;
  tags: string[];
  href: string;
  image?: string; // path to your screenshot, e.g. "/images/enroll360.png"
}

// ─── Preview Shell ────────────────────────────────────────────────────────────

function PreviewShell({
  children,
  style = {},
}: {
  children: ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: 190,
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Project Preview ──────────────────────────────────────────────────────────
// Shows the image if provided, otherwise a neutral placeholder.

function ProjectPreview({ image, name }: { image?: string; name: string }) {
  if (image) {
    return (
      <PreviewShell>
        <img
          src={image}
          alt={`${name} preview`}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
        {/* Black overlay */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.30)", pointerEvents: "none" }} />
      </PreviewShell>
    );
  }

  // Placeholder shown until an image is added
  return (
    <PreviewShell style={{ background: "var(--tag-bg)" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          color: "var(--text-secondary)",
        }}
      >
        <ImageIcon size={28} strokeWidth={1.5} />
        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: "0.08em" }}>
          No preview yet
        </span>
      </div>
    </PreviewShell>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
// Add your screenshot path to `image` for each project.
// Images should live in your /public folder, e.g. /public/images/enroll360.png

const projects: Project[] = [
  {
    name: "Enroll360",
    description: "Web-based school enrollment system",
    tags: ["WEB", "LARAVEL", "MYSQL"],
    href: "https://github.com/ja-ct10/School-Management-System.git",
    image: "/images/enroll360.png",
  },
  {
    name: "iBrgy",
    description: "Mobile app for certificate requests and communication in barangay",
    tags: ["MOBILE", "ANDROID", "FIREBASE"],
    href: "https://github.com/ja-ct10/Barangay-Management-System.git",
    image: "/images/ibrgy.png", 
  },
  {
    name: "CoinStrike",
    description: "A browser-playable 2D side-scrolling action platformer",
    tags: ["WEB", "PYGAME"],
    href: "https://github.com/ja-ct10/CoinStrike.git",
    image: "/images/coinstrike.png", 
  },
];

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="project-card">
      <ProjectPreview image={project.image} name={project.name} />

      <div style={{ padding: "16px 20px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
        {/* Tags row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Cpu size={13} color="var(--text-secondary)" />
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                fontWeight: 500,
                color: "var(--text-secondary)",
                letterSpacing: "0.08em",
              }}
            >
              {project.tags.join(" · ")}
            </span>
          </div>
          <a href={project.href} target="_blank" rel="noreferrer">
            <ExternalLink size={14} color="var(--text-secondary)" />
          </a>
        </div>

        {/* Name */}
        <p className="section-title">{project.name}</p>

        {/* Description */}
        <p style={{ color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.6 }}>
          {project.description}
        </p>

        {/* Link */}
        <a href={project.href} className="view-all" target="_blank" rel="noreferrer">
          View project <ArrowRight size={13} />
        </a>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Projects() {
  return (
    <section className="animate-fade-up delay-2">
      <div className="card p-7">
        <div className="section-subtitle mb-2">04 — Selected Work</div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="section-title">Projects</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}