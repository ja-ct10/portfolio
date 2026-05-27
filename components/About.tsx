"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function About() {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="animate-fade-up delay-2">
      <div className="card p-7">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 28,
            alignItems: "flex-start",
          }}
          className="about-inner"
        >
          {/* LEFT — photo with hover swap + overlay */}
          <motion.div
            className="about-photo-wrap"
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            style={{
              position: "relative",
              flexShrink: 0,
              width: 280,
              height: 310,
              borderRadius: 12,
              overflow: "hidden",
              border: "1px solid var(--border)",
              cursor: "pointer",
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Base image — glasses on head */}
            <Image
              src="/images/DSC_0169.JPG"
              alt="Julie Ann Tiron"
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
              priority
            />

            {/* Hover image — glasses on */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  key="hover-img"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  style={{ position: "absolute", inset: 0 }}
                >
                  <Image
                    src="/images/DSC_0165.JPG"
                    alt="Julie Ann Tiron with glasses"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dark overlay on hover */}
            <motion.div
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.35 }}
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.50)",
                pointerEvents: "none",
              }}
            />
          </motion.div>

          {/* RIGHT — text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="section-subtitle">
              01 - Introduction
            </div>
            <h2 className="section-title mb-4">About</h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: 2.0, fontSize: 15 }}>
              I am a third-year BS Information Technology student aspiring to become a{" "}
              <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>cybersecurity professional</span>
              ,{" "}
              <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>database administrator</span>
              , or{" "}
              <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>backend developer</span>
              . I have experience working with Java, C#, Python, HTML/CSS, JavaScript, Node.js,
              and SQL, and I also build mobile applications. I participate in various competitions
              to further develop my skills by creating real-world applications. Currently,{" "}
              <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>
                I am working on a SaaS-based CRM system
              </span>
              , which is helping me enhance my backend development and database design skills, as
              I am also responsible for creating the system's ERD.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .about-inner {
            flex-direction: column !important;
          }
          .about-photo-wrap {
            width: 100% !important;
            height: 220px !important;
          }
        }
      `}</style>
    </section>
  );
}