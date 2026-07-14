"use client";

import { motion } from "framer-motion";
import {
  Server,
  Database,
  Smartphone,
  Code2,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    num: "01",
    icon: Server,
    title: "Backend Development",
    desc: "Designing reliable server-side systems, REST APIs, and business logic with Node.js, Express, Java, and C#.",
    tags: ["Node.js", "Express", "Java", "C#"],
  },
  {
    num: "02",
    icon: Database,
    title: "Database Design",
    desc: "Modeling clean, normalized schemas and ERDs for PostgreSQL, MySQL, and SQL Server - built to scale.",
    tags: ["PostgreSQL", "MySQL", "SQL Server", "ERD"],
  },
  {
    num: "03",
    icon: Smartphone,
    title: "Mobile Development",
    desc: "Building responsive Android applications with clean UI and Firebase-powered realtime backends.",
    tags: ["Android", "Firebase", "Kotlin"],
  },
  {
    num: "04",
    icon: Code2,
    title: "Web Development",
    desc: "Crafting fast, accessible web apps with React, Next.js, TypeScript, and Tailwind CSS.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function Services() {
  return (
    <section id="services" className="services-section">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="section-subtitle mb-2">01 - WHAT I OFFER</div>
        <h2 className="section-title mb-8">
          Services
        </h2>
      </motion.div>

      {/* Card grid with staggered entrance */}
      <motion.div
        className="services-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {services.map((s) => {
          const Icon = s.icon;
          return (
            <motion.article
              key={s.title}
              className="service-card group"
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              {/* Hover gradient */}
              <div className="service-card-glow" aria-hidden="true" />

              {/* Header row */}
              <div className="service-card-header">
                <motion.div
                  className="service-card-icon"
                  whileHover={{ rotate: -8, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Icon size={20} />
                </motion.div>
                <span className="service-card-num">{s.num}</span>
              </div>

              {/* Title */}
              <h3 className="service-card-title">{s.title}</h3>

              {/* Description */}
              <p className="service-card-desc">{s.desc}</p>

              {/* Tags */}
              <div className="service-card-tags">
                {s.tags.map((t) => (
                  <span key={t} className="service-card-tag">{t}</span>
                ))}
              </div>

              {/* Footer */}
              <div className="service-card-footer">
                <span className="service-card-avail">Available</span>
                <ArrowUpRight size={14} className="service-card-arrow" />
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
