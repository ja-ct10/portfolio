"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useParallax } from "@/hooks";
import {
  portfolioItems,
  FILTERS,
  getCount,
  type FilterKey,
  type PortfolioItem,
  type Category,
} from "@/lib/portfolio-data";

/* ─── Accent gradient map per category ─── */
const ACCENT_GRADIENTS: Record<Category, string> = {
  project: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)",
  competition: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)",
  workshop: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)",
  seminar: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)",
};

const CATEGORY_ICONS: Record<Category, string> = {
  project: "⟨/⟩",
  competition: "⍟",
  workshop: "◈",
  seminar: "◎",
};

/* ─── Portfolio Card ─── */
function PortfolioCard({ item, index }: { item: PortfolioItem; index: number }) {
  return (
    <div className="portfolio-v2-card group">
      {/* Accent gradient background */}
      <div
        className="portfolio-v2-card-gradient"
        style={{ background: ACCENT_GRADIENTS[item.category] }}
      />

      {/* Dotted texture overlay */}
      <div className="portfolio-v2-card-dots" />

      {/* Diagonal sheen sweep on hover */}
      <div className="portfolio-v2-card-sheen" />

      {/* Corner brackets */}
      <div className="portfolio-v2-corner portfolio-v2-corner--tl" />
      <div className="portfolio-v2-corner portfolio-v2-corner--tr" />
      <div className="portfolio-v2-corner portfolio-v2-corner--bl" />
      <div className="portfolio-v2-corner portfolio-v2-corner--br" />

      {/* Card header */}
      <div className="portfolio-v2-card-header">
        <span className="portfolio-v2-category-chip">
          <span className="portfolio-v2-category-icon">{CATEGORY_ICONS[item.category]}</span>
          {item.category.toUpperCase()}
        </span>
        <span className="portfolio-v2-year">/ {item.year}</span>
      </div>

      {/* Preview area - image always visible, no glyph */}
      <div className="portfolio-v2-glyph-area">
        <div className="portfolio-v2-image-wrap">
          <Image
            src={item.image}
            alt={`${item.title} preview`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
            style={{ objectFit: "contain" }}
            className="portfolio-v2-image"
          />
        </div>
      </div>

      {/* "View Live Demo" link bar - only for items with external href */}
      {item.href && (
        <a
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="portfolio-v2-demo-bar"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="portfolio-v2-demo-text">VIEW LIVE DEMO</span>
          <span className="portfolio-v2-demo-icon">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M4 1H13M13 1V10M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>
      )}

      {/* Card body */}
      <div className="portfolio-v2-card-body">
        <div className="portfolio-v2-title-row">
          <h3 className="portfolio-v2-title">{item.title}</h3>
          <span className="portfolio-v2-index">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <p className="portfolio-v2-desc">{item.description}</p>

        {/* Category chips / tags */}
        <div className="portfolio-v2-tags">
          {item.tags.map((tag) => (
            <span key={tag} className="portfolio-v2-tag">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer CTAs */}
        <div className="portfolio-v2-footer">
          <Link
            href={`/projects/${item.slug}`}
            className="portfolio-v2-cta"
          >
            <span className="portfolio-v2-cta-dot" />
            CASE STUDY
          </Link>
          <Link
            href={`/projects/${item.slug}`}
            className="portfolio-v2-view"
          >
            VIEW
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Portfolio Section ─── */
export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const sectionRef = useRef<HTMLElement>(null);
  const { y: headingY } = useParallax(sectionRef, 0.15);

  // Listen for portfolio-filter custom events from Navbar
  useEffect(() => {
    const handleFilter = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const key = customEvent.detail as FilterKey;
      if (["all", "project", "competition", "workshop", "seminar"].includes(key)) {
        setActiveFilter(key);
      }
    };
    window.addEventListener("portfolio-filter", handleFilter);
    return () => window.removeEventListener("portfolio-filter", handleFilter);
  }, []);

  // URL hash sync for shareable filters
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (["all", "project", "competition", "workshop", "seminar"].includes(hash)) {
      setActiveFilter(hash as FilterKey);
    }
  }, []);

  const handleFilterChange = useCallback((key: FilterKey) => {
    setActiveFilter(key);
    // Update URL hash for shareability
    const newHash = key === "all" ? "" : `#${key}`;
    window.history.replaceState(null, "", `${window.location.pathname}${newHash}`);
  }, []);

  const filtered =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <section id="portfolio" className="animate-fade-up delay-2" ref={sectionRef}>
      <div className="portfolio-v2-container">
        <motion.div style={{ y: headingY }}>
          {/* Header */}
          <div className="portfolio-v2-header">
            <div>
              <div className="section-subtitle mb-2">05 - SELECTED WORK</div>
              <h2 className="section-title">Portfolio</h2>
            </div>
            <div className="portfolio-v2-counter">
              <Layers size={14} className="opacity-60" />
              <span>
                {String(filtered.length).padStart(2, "0")} / {String(portfolioItems.length).padStart(2, "0")} SHOWN
              </span>
            </div>
          </div>

          {/* Filter Bar */}
          <nav
            className="portfolio-v2-filters"
            aria-label="Filter portfolio by category"
          >
            <span className="portfolio-v2-filter-label">FILTER_BY:</span>
            <div className="portfolio-v2-filter-pills">
              {FILTERS.map((filter) => (
                <button
                  key={filter.key}
                  type="button"
                  className={`portfolio-v2-filter-btn ${activeFilter === filter.key ? "active" : ""}`}
                  onClick={() => handleFilterChange(filter.key)}
                  aria-pressed={activeFilter === filter.key}
                >
                  {activeFilter === filter.key && (
                    <motion.span
                      layoutId="portfolio-v2-filter-indicator"
                      className="portfolio-v2-filter-bg"
                      transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    />
                  )}
                  <span className="portfolio-v2-filter-text">
                    {filter.label}
                    <span className="portfolio-v2-filter-count">({getCount(filter.key)})</span>
                  </span>
                </button>
              ))}
            </div>
          </nav>
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="portfolio-v2-grid"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92, y: 24 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                className="h-full"
              >
                <PortfolioCard item={item} index={idx} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="portfolio-v2-empty">
            <p>No items found for this filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}
