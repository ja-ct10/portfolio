"use client";
import { ArrowRight, ExternalLink, Cpu, ImageIcon } from "lucide-react";
import { ReactNode } from "react";

interface Project {
  name: string;
  description: string;
  tags: string[];
  href: string;
  image?: string;
}

function ProjectPreview({ image, name }: { image?: string; name: string }) {
  if (image) {
    return (
      <div className="project-preview">
        <img src={image} alt={`${name} preview`} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        <div className="project-preview-overlay" />
      </div>
    );
  }
  return (
    <div className="project-preview project-preview-placeholder">
      <ImageIcon size={28} strokeWidth={1.5} />
      <span className="project-preview-placeholder-label">No preview yet</span>
    </div>
  );
}

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

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="project-card">
      <ProjectPreview image={project.image} name={project.name} />
      <div style={{ padding: "16px 20px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Cpu size={13} color="var(--text-secondary)" />
            <span className="project-card-tags">{project.tags.join(" · ")}</span>
          </div>
          <a href={project.href} target="_blank" rel="noreferrer">
            <ExternalLink size={14} color="var(--text-secondary)" />
          </a>
        </div>
        <p className="section-title">{project.name}</p>
        <p className="project-card-desc">{project.description}</p>
        <a href={project.href} className="view-all" target="_blank" rel="noreferrer">
          View project <ArrowRight size={13} />
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="animate-fade-up delay-2">
      <div className="card p-7">
        <div className="section-subtitle mb-2">05 — Selected Work</div>
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