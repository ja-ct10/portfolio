"use client";
import { useState } from "react";
import { Medal, Award, RotateCw, ArrowRight, ExternalLink, Cpu, ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Category = "project" | "competition" | "workshop" | "seminar";

interface PortfolioItem {
  id: number;
  category: Category;
  title: string;
  subtitle: string;
  description: string;
  details?: string;
  image: string;
  tags?: string[];
  href?: string;
  placement?: string;
  year?: string;
}

const portfolioItems: PortfolioItem[] = [
  // Projects
  {
    id: 1,
    category: "project",
    title: "Enroll360",
    subtitle: "Web-based school enrollment system",
    description: "Designed and developed Enroll360, a web-based school enrollment and payment management system that streamlines student enrollment, re-enrollment, payment tracking, document submission, reporting, and communication between schools and parents through a centralized digital platform.",
    image: "/images/enroll360.png",
    tags: ["WEB", "LARAVEL", "MYSQL"],
    href: "https://github.com/ja-ct10/School-Management-System.git",
  },
  {
    id: 2,
    category: "project",
    title: "iBrgy",
    subtitle: "Mobile app for certificate requests and communication in barangay",
    description: "Created iBrgy, a mobile application for barangay certificate requests and community communication that enables residents to request certificates digitally, receive updates and announcements, and communicate efficiently with barangay officials through a centralized platform.",
    image: "/images/ibrgy.png",
    tags: ["MOBILE", "ANDROID", "FIREBASE"],
    href: "https://github.com/ja-ct10/Barangay-Management-System.git",
  },
  {
    id: 3,
    category: "project",
    title: "CoinStrike",
    subtitle: "A browser-playable 2D side-scrolling action platformer",
    description: "Developed a game entitled CoinStrike, a browser-playable 2D side-scrolling action platformer featuring procedurally generated levels, mission-based progression, weapon combat, combo mechanics, power-ups, score tracking, and a final boss battle that challenges players to survive, complete objectives, and achieve high scores.",
    image: "/images/coinstrike.png",
    tags: ["WEB", "PYGAME"],
    href: "https://coinstrike.vercel.app/",
  },
  // Competitions
  {
    id: 4,
    category: "competition",
    title: "Android Hackathon - 2nd Placer",
    subtitle: "Main Developer",
    description: "Built an e-commerce mobile-based platform under 5 hours with a 3-person team.",
    details:
      "Within a limited time, we were tasked with designing and developing a mobile application based on an e-commerce platform, with the goal of creating a functional and user-friendly app that demonstrates a complete ordering process during the Android Hackathon, a competition under Collaboratech 2026. We were able to create an application named ShopLift, where I served as the main developer, and our team won 2nd place.",
    image: "/images/android-hackathon.jpg",
    placement: "2ND",
    year: "2026",
  },
  {
    id: 5,
    category: "competition",
    title: "Tagisan ng Talino: Code Fest - 2nd Placer",
    subtitle: "Main Developer",
    description: "Built an e-commerce mobile app under 5 hours with a 3-person team.",
    details:
      "We competed in Tagisan ng Talino: CodeFest, a local-level mobile app hackathon, where we were tasked to develop an Android application focused on managing construction inventory and handling the borrowing and returning of construction equipment. The system also required features such as tracking item availability, recording transactions, and generating PDF reports for documentation and monitoring purposes. As the main developer, I was able to design and implement a functional and user-friendly interface, including core features for inventory management and equipment borrowing/returning workflows. The application also emphasized accurate record keeping and efficient data management to support real-world construction site operations.",
    image: "/images/code-fest.jpg",
    placement: "2ND",
    year: "2026",
  },
  {
    id: 6,
    category: "competition",
    title: "hack-it! The New Era of Banking - Participant",
    subtitle: "Main Developer, Database Designer",
    description: "Built AI-assisted KYC insurance platform for faster application review and processing.",
    details:
      "We competed with 12 teams in the 2-day hackathon event hack-It! The New Era of Banking, presenting LifeGard as our contribution—an AI-assisted life insurance system designed to improve underwriting efficiency and application processing speed. LifeGard uses machine learning trained on historical approved and rejected applications to adapt risk assessments based on each insurance company's criteria, including factors such as age and medical conditions. As a decision-support tool, it streamlines the evaluation process while still requiring human underwriters for complex cases such as fraud detection and final approval. Although this was our first hackathon event and we did not win, the experience provided us with valuable learning opportunities and strengthened our skills in innovation, teamwork, and system development.",
    image: "/images/hackathon-1.jpg",
    placement: "PARTICIPANT",
    year: "2025",
  },
  {
    id: 7,
    category: "competition",
    title: "14th IT Skills Olympics - Participant",
    subtitle: "Java Programming",
    description: "Represented my school in a team-based Java Programming Competition, solving algorithmic and coding challenges under time constraints.",
    details:
      "Represented my school as a competitor in the Java Programming Competition, a team-based face-to-face coding contest that challenged participants to solve algorithmic and programming problems using Java within strict time constraints. Working alongside a fellow representative, I applied problem-solving, debugging, and collaboration skills to develop efficient solutions while competing against students from other schools. The experience strengthened my technical knowledge in Java, improved my ability to think critically under pressure, and enhanced my teamwork and communication skills in a competitive environment.",
    image: "/images/it-olympics.jpeg",
    placement: "PARTICIPANT",
    year: "2025",
  },
  // Workshops
  {
    id: 8,
    category: "workshop",
    title: "Build Nights: Design to Code Workshop",
    subtitle: "Kiroverse Workshop Week 2",
    description: "Attended Kiroverse's Design to Code Workshop and learned the complete workflow for transforming Figma designs into production-ready web applications. Gained hands-on experience with Kiro, Figma MCP, design systems, and AI-powered development tools while building a responsive portfolio website using Next.js, React, TypeScript, and Tailwind CSS.",
    image: "/images/kiroverse-workshop-1.jpg",
    placement: "ATTENDEE",
    year: "2026",
  },
  {
    id: 9,
    category: "workshop",
    title: "Exploring the Basics of Figma: From Sketch to Prototype",
    subtitle: "Collab",
    description: "Participated in the Collaboratech 2025: Into the Tech Maze workshop, 'Exploring the Basics of Figma: From Sketch to Prototype,' where I learned the fundamentals of UI/UX design and gained hands-on experience creating designs from scratch using Figma.",
    image: "/images/collaboratech.jpg",
    placement: "Attendee",
    year: "2025",
  },
  // Seminars
  {
    id: 10,
    category: "seminar",
    title: "AI at Work PH 2026",
    subtitle: "Insights into AI Agents, Gemini Enterprise, and Google Workplace AI",
    description: "Attended AI at Work PH 2026 at Seda BGC, organized by Symph and Google. Gained insights into AI Agents, Gemini Enterprise, and Google Workspace, and learned how AI empowers people to work more efficiently, make better decisions, and improve productivity in modern workplaces.",
    image: "/images/symph-workshop-1.png",
    placement: "ATTENDEE",
    year: "2026",
  },
];

type FilterKey = "all" | Category;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "ALL" },
  { key: "project", label: "PROJECT" },
  { key: "competition", label: "COMPETITION" },
  { key: "workshop", label: "WORKSHOP" },
  { key: "seminar", label: "SEMINAR" },
];

function getCount(key: FilterKey): number {
  if (key === "all") return portfolioItems.length;
  return portfolioItems.filter((item) => item.category === key).length;
}

function getBadgeClass(placement?: string) {
  if (placement === "2ND") return "comp-card-badge comp-badge-silver";
  return "comp-card-badge comp-badge-participant";
}

function getIconForPlacement(placement?: string) {
  if (placement === "2ND") return <Medal size={20} />;
  return <Award size={20} />;
}

function getIconClass(placement?: string) {
  if (placement === "2ND") return "comp-card-icon comp-icon-silver";
  return "comp-card-icon comp-icon-participant";
}

/* ─── Category Tag Badge ─── */
function CategoryBadge({ category }: { category: Category }) {
  return (
    <span className="portfolio-category-badge">
      {category.toUpperCase()}
    </span>
  );
}

/* ─── Project Card (image + tags + link) ─── */
function ProjectCard({ item }: { item: PortfolioItem }) {
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
          transition: { duration: 0.25, ease: "easeOut" },
        },
      }}
    >
      {/* Image Preview */}
      <div className="project-preview overflow-hidden relative" style={{ width: "100%", height: "190px" }}>
        {item.image ? (
          <motion.div
            className="w-full h-full relative"
            variants={{
              hover: { scale: 1.05, transition: { duration: 0.4, ease: "easeOut" } },
            }}
            style={{ width: "100%", height: "100%", position: "relative" }}
          >
            <Image
              src={item.image}
              alt={`${item.title} preview`}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              style={{ objectFit: "contain" }}
            />
          </motion.div>
        ) : (
          <div className="project-preview project-preview-placeholder">
            <ImageIcon size={28} strokeWidth={1.5} />
            <span className="project-preview-placeholder-label">No preview yet</span>
          </div>
        )}
        <div className="project-preview-overlay" />

        {/* Category Badge */}
        <div style={{ position: "absolute", top: 12, left: 12, zIndex: 5 }}>
          <CategoryBadge category={item.category} />
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 10, flexGrow: 1 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Cpu size={13} color="var(--text-secondary)" />
            <span className="project-card-tags">{item.tags?.join(" · ")}</span>
          </div>
          {item.href && (
            <motion.a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.1, color: "var(--text-primary)" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <ExternalLink size={14} color="var(--text-secondary)" />
            </motion.a>
          )}
        </div>
        <p className="text-lg font-bold text-[#f0ede8]" style={{ fontFamily: "var(--font-heading), serif" }}>
          {item.title}
        </p>
        <p className="project-card-desc flex-grow" style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
          {item.description}
        </p>
        {item.href && (
          <motion.a
            href={item.href}
            className="view-all mt-auto pt-2"
            target="_blank"
            rel="noreferrer"
            variants={{
              initial: { color: "var(--text-secondary)" },
              hover: { color: "var(--accent)", transition: { duration: 0.2 } },
            }}
          >
            <span>View project</span>
            <motion.span
              variants={{
                initial: { x: 0 },
                hover: { x: 4, transition: { duration: 0.2 } },
              }}
            >
              <ArrowRight size={13} />
            </motion.span>
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Flip Card (competitions, workshops, seminars) ─── */
function FlipCard({ item }: { item: PortfolioItem }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="comp-flip-card-container"
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
    >
      <div className={`comp-flip-card-inner ${isFlipped ? "flipped" : ""}`}>
        {/* FRONT — Image */}
        <div className="comp-flip-card-front">
          <div className="comp-flip-card-front-img-wrap">
            <Image
              src={item.image}
              alt={`${item.title} Preview`}
              fill
              sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 1280px) calc(50vw - 48px), calc(33vw - 32px)"
              style={{ objectFit: "cover", objectPosition: "center top" }}
              priority
            />
            <div className="comp-flip-card-front-overlay" />
          </div>

          <div className="comp-flip-card-front-content">
            <div className="comp-flip-card-front-top">
              <CategoryBadge category={item.category} />
            </div>
            <div className="comp-flip-card-front-bottom">
              <h3 className="comp-flip-card-front-title">{item.title}</h3>
              <div className="comp-flip-card-front-hint">
                <RotateCw size={11} />
                <span>Click to view details</span>
              </div>
            </div>
          </div>
        </div>

        {/* BACK — Details */}
        <div className="comp-flip-card-back">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div className={getIconClass(item.placement)}>{getIconForPlacement(item.placement)}</div>
            <span className={getBadgeClass(item.placement)}>
              {item.placement} · {item.year}
            </span>
          </div>

          <h3 className="comp-card-title">{item.title}</h3>
          <p className="comp-card-role">{item.subtitle}</p>

          <div className="comp-card-desc" onClick={(e) => e.stopPropagation()}>
            <p style={{ fontWeight: 500, color: "var(--text-primary)", marginBottom: 8 }}>
              {item.description}
            </p>
            {item.details && <p>{item.details}</p>}
          </div>

          <a
            href={item.image}
            target="_blank"
            rel="noreferrer"
            className="comp-cert-cta"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Unified Card Renderer ─── */
function PortfolioCard({ item }: { item: PortfolioItem }) {
  if (item.category === "project") {
    return <ProjectCard item={item} />;
  }
  return <FlipCard item={item} />;
}

/* ─── Main Portfolio Section ─── */
export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filtered =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <section id="portfolio" className="animate-fade-up delay-2">
      <div className="card p-5 sm:p-6 lg:p-7">
        <div className="section-subtitle mb-2">04 — Achievements & Activities</div>
        <h2 className="section-title mb-4">Portfolio</h2>

        {/* Filter Bar */}
        <nav
          className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8"
          aria-label="Filter portfolio by category"
        >
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-secondary)",
              marginRight: "4px",
            }}
          >
            FILTER_BY:
          </span>
          <div className="tab-menu" style={{ position: "relative", zIndex: 10 }}>
            {FILTERS.map((filter) => (
              <button
                key={filter.key}
                type="button"
                className="tab-menu-btn relative"
                onClick={() => setActiveFilter(filter.key)}
                aria-pressed={activeFilter === filter.key}
                style={{ position: "relative", zIndex: 1 }}
              >
                {activeFilter === filter.key && (
                  <motion.span
                    layoutId="portfolio-active-pill"
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
                    color: activeFilter === filter.key ? "var(--bg)" : "inherit",
                    transition: "color 0.25s ease",
                  }}
                >
                  {filter.label} ({getCount(filter.key)})
                </span>
              </button>
            ))}
          </div>
        </nav>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3"
          style={{ minHeight: "360px" }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <PortfolioCard item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
