"use client";

import { motion } from "framer-motion";
import {
  Server,
  Database,
  Smartphone,
  Code2,
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
    tags: ["Android", "Firebase"],
  },
  {
    num: "04",
    icon: Code2,
    title: "Web Development",
    desc: "Crafting fast, accessible web apps with React, Next.js, TypeScript, and Tailwind CSS.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-12 pt-8 pb-24 sm:pb-32"
    >
      {/* section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="border-t border-white/10 pt-10"
      >
        <div className="section-subtitle">01 - What I Offer</div>

        <h2 className="section-title mb-6">Services</h2>
      </motion.div>

      {/* grid */}
      <div className="mt-12 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 sm:p-7 transition-colors duration-500 hover:border-white/30"
            >
              {/* hover glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(400px circle at 50% 0%, rgba(255,255,255,0.08), transparent 60%)",
                }}
              />

              <div className="relative flex items-start justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-white/[0.04] transition-transform duration-500 group-hover:-rotate-6 group-hover:bg-white group-hover:text-black">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.3em] text-white/40">
                  {s.num}
                </span>
              </div>

              <h3 className="relative mt-6 text-2xl leading-tight font-bold text-[var(--text-primary)]">
                {s.title}
              </h3>

              <p className="relative mt-3 text-sm text-white/60 leading-relaxed">
                {s.desc}
              </p>

              <div className="relative mt-5 flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] tracking-wider text-white/60"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* arrow */}
              <div className="relative mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40">
                  Available
                </span>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
