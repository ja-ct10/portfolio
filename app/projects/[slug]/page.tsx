"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, CheckCircle2 } from "lucide-react";
import { getItemBySlug, getAdjacentItems } from "@/lib/portfolio-data";

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0 },
};

/* ─── Case Study Page ─── */
export default function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const item = getItemBySlug(slug);

  if (!item) {
    return (
      <main className="case-study-page">
        <div className="case-study-content" style={{ textAlign: "center", paddingTop: "120px" }}>
          <h1 style={{ fontFamily: "var(--font-heading), serif", fontSize: "32px", marginBottom: "16px" }}>
            Project not found
          </h1>
          <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>
            The case study you are looking for does not exist.
          </p>
          <Link href="/#portfolio" style={{ color: "var(--accent)", textDecoration: "underline" }}>
            Back to Portfolio
          </Link>
        </div>
      </main>
    );
  }

  const { prev, next } = getAdjacentItems(slug);

  return (
    <main className="case-study-page">
      {/* Top nav bar */}
      <motion.nav
        className="case-study-nav"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link href="/#portfolio" className="case-study-back">
          <ArrowLeft size={14} />
          <span>BACK TO PORTFOLIO</span>
        </Link>
        <Link href="/#portfolio" className="case-study-logo">
          <Image src="/images/logo.png" alt="Logo" width={36} height={36} priority />
        </Link>
      </motion.nav>

      <div className="case-study-content">
        {/* Meta strip */}
        <motion.div
          className="case-study-meta-strip"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="case-study-category-badge">
            {item.category.toUpperCase()}
          </span>
          <span className="case-study-meta-sep">/</span>
          <span>{item.year}</span>
          <span className="case-study-meta-sep">/</span>
          <span>{item.tags.slice(0, 3).join(" - ").toUpperCase()}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="case-study-title"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {item.title}<span className="case-study-title-dot">.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="case-study-subtitle"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {item.subtitle}
        </motion.p>

        {/* View Live Demo button */}
        {item.href && (
          <motion.a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="case-study-live-btn"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.25 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <ExternalLink size={14} />
            <span>View Live Demo</span>
          </motion.a>
        )}

        {/* Hero image panel */}
        <motion.div
          className="case-study-hero-panel"
          variants={fadeScale}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="case-study-hero-label">
            <span>CASE STUDY / {String(item.id).padStart(2, "0")}</span>
            {item.href && (
              <a href={item.href} target="_blank" rel="noreferrer" className="case-study-hero-link">
                LIVE <ExternalLink size={11} />
              </a>
            )}
          </div>
          <div className="case-study-hero-corners">
            <div className="case-study-hero-corner case-study-hero-corner--tl" />
            <div className="case-study-hero-corner case-study-hero-corner--tr" />
            <div className="case-study-hero-corner case-study-hero-corner--bl" />
            <div className="case-study-hero-corner case-study-hero-corner--br" />
          </div>
          <div className="case-study-hero-image">
            <Image
              src={item.image}
              alt={`${item.title} preview`}
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              style={{ objectFit: "contain", objectPosition: "center" }}
              priority
            />
          </div>
        </motion.div>

        {/* Highlights - scroll triggered */}
        {item.highlights && item.highlights.length > 0 && (
          <motion.div
            className="case-study-highlights"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {item.highlights.map((h, i) => (
              <motion.div
                key={i}
                className="case-study-highlight-card"
                variants={fadeUp}
                transition={{ duration: 0.4 }}
              >
                <span className="case-study-highlight-label">{h.label}</span>
                <span className="case-study-highlight-value">{h.value}</span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Overview section - scroll triggered */}
        <motion.section
          className="case-study-section"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="case-study-section-header">
            <span className="case-study-section-num">01</span>
            <h2 className="case-study-section-title">Overview</h2>
          </div>
          <p className="case-study-section-body">{item.details || item.description}</p>
        </motion.section>

        {/* Features + Stack - scroll triggered with stagger */}
        <motion.div
          className="case-study-two-col"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
        >
          {/* Features */}
          {item.features && item.features.length > 0 && (
            <div className="case-study-features">
              <div className="case-study-section-header">
                <span className="case-study-section-num">02</span>
                <span className="case-study-col-label">KEY FEATURES</span>
              </div>
              <h2 className="case-study-col-title">What it does<span className="case-study-title-dot">.</span></h2>
              <motion.ul
                className="case-study-feature-list"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {item.features.map((f, i) => (
                  <motion.li
                    key={i}
                    className="case-study-feature-item"
                    variants={staggerItem}
                    transition={{ duration: 0.4 }}
                  >
                    <CheckCircle2 size={14} className="case-study-feature-icon" />
                    <span>{f}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          )}

          {/* Stack */}
          {item.stack && item.stack.length > 0 && (
            <div className="case-study-stack">
              <div className="case-study-section-header">
                <span className="case-study-section-num">03</span>
                <span className="case-study-col-label">TECH STACK</span>
              </div>
              <h2 className="case-study-col-title">Built with<span className="case-study-title-dot">.</span></h2>
              <motion.div
                className="case-study-stack-chips"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {item.stack.map((s) => (
                  <motion.span
                    key={s}
                    className="case-study-stack-chip"
                    variants={fadeUp}
                    transition={{ duration: 0.3 }}
                  >
                    {s}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Outcomes - scroll triggered with stagger */}
        {item.outcomes && item.outcomes.length > 0 && (
          <motion.section
            className="case-study-outcomes"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
          >
            <div className="case-study-section-header">
              <span className="case-study-section-num">04</span>
              <span className="case-study-col-label">OUTCOMES</span>
            </div>
            <h2 className="case-study-col-title">Impact<span className="case-study-title-dot">.</span></h2>
            <motion.div
              className="case-study-outcome-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {item.outcomes.map((o, i) => (
                <motion.div
                  key={i}
                  className="case-study-outcome-card"
                  variants={fadeUp}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <span className="case-study-outcome-num">RESULT / {String(i + 1).padStart(2, "0")}</span>
                  <p className="case-study-outcome-text">{o}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        )}

        {/* Separator */}
        <motion.div
          className="case-study-separator"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "left" }}
        />

        {/* Prev/Next navigation - scroll triggered */}
        <motion.div
          className="case-study-pagination"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {prev && (
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
              <Link href={`/projects/${prev.slug}`} className="case-study-pagination-link case-study-pagination-prev">
                <span className="case-study-pagination-dir">&larr; PREVIOUS</span>
                <span className="case-study-pagination-title">{prev.title}</span>
                <span className="case-study-pagination-meta">
                  {prev.category.toUpperCase()} - {prev.year}
                </span>
              </Link>
            </motion.div>
          )}
          {next && (
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
              <Link href={`/projects/${next.slug}`} className="case-study-pagination-link case-study-pagination-next">
                <span className="case-study-pagination-dir">NEXT &rarr;</span>
                <span className="case-study-pagination-title">{next.title}</span>
                <span className="case-study-pagination-meta">
                  {next.category.toUpperCase()} - {next.year}
                </span>
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div
          className="case-study-page-footer"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/#portfolio" className="case-study-footer-back">
            &larr; All projects &#10022;
          </Link>
          <span className="case-study-footer-copy">
            &copy; JULIE ANN TIRON - CASE STUDY {String(item.id).padStart(2, "0")} / {String(14).padStart(2, "0")}
          </span>
        </motion.div>
      </div>
    </main>
  );
}
