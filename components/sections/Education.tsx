"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useParallax } from "@/hooks";
import { GraduationCap, Calendar, MapPin, BookOpen } from "lucide-react";

const highlights = [
  "Specializing in backend development and database design",
  "Active in coding competitions and hackathons",
  "Building full-stack web and mobile applications",
  "Learning blockchain development and cybersecurity",
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const { y: headingY } = useParallax(sectionRef, 0.15);

  return (
    <section id="education" ref={sectionRef}>
      <motion.div style={{ y: headingY }}>
        <div className="section-subtitle mb-2">04 - ACADEMIC BACKGROUND</div>
        <h2 className="section-title mb-8">Education<span style={{ color: "rgba(255,255,255,0.7)" }}>.</span></h2>
      </motion.div>

      <motion.div
        className="edu-card-main"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        {/* Top strip */}
        <div className="edu-card-strip">
          <span className="edu-card-status">ONGOING</span>
          <span className="edu-card-year">
            <Calendar size={11} />
            2023 - Present
          </span>
        </div>

        {/* Main content */}
        <div className="edu-card-content">
          <div className="edu-card-icon">
            <GraduationCap size={28} strokeWidth={1.5} />
          </div>

          <div className="edu-card-info">
            <h3 className="edu-card-degree">BS Information Technology</h3>
            <div className="edu-card-school">
              <MapPin size={12} />
              <span>STI College Global City</span>
            </div>
            <p className="edu-card-desc">
              Fourth-year student focused on building reliable systems, designing databases, and developing secure applications. Consistently participating in hackathons and tech events to sharpen real-world development skills.
            </p>
          </div>
        </div>

        {/* Highlights */}
        <motion.div
          className="edu-card-highlights"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              className="edu-highlight-item"
              variants={fadeUp}
              transition={{ duration: 0.4 }}
            >
              <BookOpen size={12} className="edu-highlight-icon" />
              <span>{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
