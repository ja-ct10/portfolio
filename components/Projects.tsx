"use client";
import { ArrowRight, ExternalLink, Cpu } from "lucide-react";

const projects = [
  { 
    name: "Enroll360",
    description: "Web-based school enrollment system",
    tags: ["WEB", "LARAVEL", "MYSQL"],
    href: "https://github.com/ja-ct10/School-Management-System.git",
  },
  {
    name: "iBrgy",
    description: "Mobile app for certificate requests and communication in barangay",
    tags: ["MOBILE", "ANDROID", "FIREBASE"],
    href: "https://github.com/ja-ct10/Barangay-Management-System.git",
  },
  {
    name: "CoinStrike",
    description: "A browser-playable 2D side-scrolling action platformer",
    tags: ["WEB", "PYGAME"],
    href: "https://github.com/ja-ct10/CoinStrike.git",
  },
];

export default function Projects() {
  return (
    <section className="animate-fade-up delay-2">
      <div className="card p-7">
        {/* Label */}
        <div className="section-subtitle mb-2">
          04 — Selected Work
        </div>

        {/* Title row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="section-title">Projects</h2>
          {/*
          <a href="#" className="view-all">
            View All <ArrowRight size={14} />
          </a>
          */}
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.name}
              className="project-card"
            >
              {/* Top row — tags + external icon */}
              <div style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Cpu size={13} color="var(--text-secondary)" />
                  <span style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 11, fontWeight: 500,
                    color: "var(--text-secondary)",
                    letterSpacing: "0.08em",
                  }}>
                    {project.tags.join(" · ")}
                  </span>
                </div>
                <a href={project.href} target="_blank" rel="noreferrer">
                  <ExternalLink size={14} color="var(--text-secondary)" />
                </a>
              </div>

              {/* Name */}
              <p className="section-title">
                {project.name}
              </p>

              {/* Description */}
              <p style={{
                color: "var(--text-secondary)",
                fontSize: 13,
                lineHeight: 1.6,
              }}>
                {project.description}
              </p>

              {/* View project link */}
              
              <a href={project.href} className="view-all" >
                View project <ArrowRight size={13} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}