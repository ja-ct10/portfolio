"use client";
import { useState } from "react";
import { ArrowRight, ExternalLink, Cpu, ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Project {
  name: string;
  description: string;
  tags: string[];
  category: "web" | "mobile";
  href: string;
  image?: string;
}

function ProjectPreview({ image, name }: { image?: string; name: string }) {
  if (image) {
    return (
      <div className="project-preview overflow-hidden relative" style={{ width: "100%", height: "190px" }}>
        <motion.div
          className="w-full h-full relative"
          variants={{
            hover: { scale: 1.05, transition: { duration: 0.4, ease: "easeOut" } }
          }}
          style={{ width: "100%", height: "100%", position: "relative" }}
        >
          <Image
            src={image}
            alt={`${name} preview`}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            style={{ objectFit: "contain" }}
          />
        </motion.div>
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
    category: "web",
    href: "https://github.com/ja-ct10/School-Management-System.git",
    image: "/images/enroll360.png",
  },
  {
    name: "iBrgy",
    description: "Mobile app for certificate requests and communication in barangay",
    tags: ["MOBILE", "ANDROID", "FIREBASE"],
    category: "mobile",
    href: "https://github.com/ja-ct10/Barangay-Management-System.git",
    image: "/images/ibrgy.png",
  },
  {
    name: "CoinStrike",
    description: "A browser-playable 2D side-scrolling action platformer",
    tags: ["WEB", "PYGAME"],
    category: "web",
    href: "https://coinstrike.vercel.app/",
    image: "/images/coinstrike.png",
  },
];

const TABS = ["All", "Mobile", "Web"] as const;
type Tab = (typeof TABS)[number];

function tabToCategory(tab: Tab): Project["category"] | null {
  if (tab === "All") return null;
  return tab.toLowerCase() as Project["category"];
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      className="project-card flex flex-col h-full overflow-hidden border border-[var(--border)] rounded-[14px] bg-[var(--surface)]"
      whileHover="hover"
      initial="initial"
      variants={{
        initial: { y: 0, borderColor: "var(--border)", boxShadow: "0 4px 12px rgba(0,0,0,0.4)" },
        hover: {
          y: -6,
          borderColor: "rgba(255, 255, 255, 0.18)",
          boxShadow: "0 12px 30px -10px rgba(0,0,0,0.7), 0 0 20px rgba(255,255,255,0.03)",
          transition: { duration: 0.25, ease: "easeOut" }
        }
      }}
    >
      <ProjectPreview image={project.image} name={project.name} />
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 10, flexGrow: 1 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Cpu size={13} color="var(--text-secondary)" />
            <span className="project-card-tags">{project.tags.join(" · ")}</span>
          </div>
          <motion.a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.1, color: "var(--text-primary)" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <ExternalLink size={14} color="var(--text-secondary)" />
          </motion.a>
        </div>
        <p className="text-lg font-bold text-[#f0ede8]" style={{ fontFamily: "var(--font-heading), serif" }}>{project.name}</p>
        <p className="project-card-desc flex-grow" style={{ color: "var(--text-secondary)", fontSize: "13px" }}>{project.description}</p>
        <motion.a
          href={project.href}
          className="view-all mt-auto pt-2"
          target="_blank"
          rel="noreferrer"
          variants={{
            initial: { color: "var(--text-secondary)" },
            hover: { color: "var(--accent)", transition: { duration: 0.2 } }
          }}
        >
          <span>View project</span>
          <motion.span
            variants={{
              initial: { x: 0 },
              hover: { x: 4, transition: { duration: 0.2 } }
            }}
          >
            <ArrowRight size={13} />
          </motion.span>
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState<Tab>("All");

  const category = tabToCategory(activeTab);
  const filtered = category
    ? projects.filter((p) => p.category === category)
    : projects;

  return (
    <section id="projects" className="animate-fade-up delay-2">
      <div className="card p-5 sm:p-6 lg:p-7">
        <div className="section-subtitle mb-2">05 — Selected Work</div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <h2 className="section-title">Projects</h2>

          <nav className="tab-menu" aria-label="Filter projects by category" style={{ position: "relative", zIndex: 10 }}>
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                className={`tab-menu-btn relative`}
                onClick={() => setActiveTab(tab)}
                aria-pressed={activeTab === tab}
                style={{ position: "relative", zIndex: 1 }}
              >
                {activeTab === tab && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "var(--accent)",
                      boxShadow: "0 2px 12px rgba(0, 0, 0, 0.45)",
                      zIndex: -1,
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  style={{
                    color: activeTab === tab ? "var(--bg)" : "inherit",
                    transition: "color 0.25s ease",
                  }}
                >
                  {tab}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
          style={{ minHeight: "360px" }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.name}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}