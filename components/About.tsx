"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export default function About() {
  const [hovered, setHovered] = useState(false);

  return (
    <section id="about" className="animate-fade-up delay-2 about-section">
        <div className="section-subtitle">01 - Introduction</div>

        <h2 className="section-title mb-6">About</h2>

        <div className="about-wrapper">
          {/* LEFT — photo with hover swap + subtle glow */}
          <motion.div
            className="about-photo-wrap"
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            onTouchStart={() => setHovered(true)}
            onTouchEnd={() => setTimeout(() => setHovered(false), 600)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.35 }}
          >
            <div className="about-photo">
              <Image
                src="/images/DSC_0169.jpg"
                alt="Julie Ann Tiron"
                fill
                priority
                sizes="(max-width: 1000px) 100vw, 300px"
                style={{
                  objectFit: "cover",
                  objectPosition: "center top",
                }}
              />

              <motion.div
                initial={false}
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.35 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 2,
                }}
              >
                <Image
                  src="/images/DSC_0165.jpg"
                  alt="Julie Ann Tiron with glasses"
                  fill
                  sizes="(max-width: 1000px) 100vw, 300px"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center top",
                  }}
                />
              </motion.div>

              <motion.div
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.35 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.25)",
                  pointerEvents: "none",
                  zIndex: 3,
                }}
              />

              <div className="about-glow" />

              <div className="about-status-wrap">
                <div className="about-status-line" />
                <div className="about-status-bottom">
                  <div className="about-status-pill">
                    <span className="about-status-dot" />
                    AVAILABLE
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — text content */}
          <div className="about-content">
            <div className="about-badge">
              <span className="about-badge-dot" />
              HI, I&apos;M JULIE ANN!
            </div>

            <p className="about-main-text">
              A third-year{" "}
              <span>BS Information Technology</span> student aspiring to become a{" "}
              <span>cybersecurity professional</span>,{" "}
              <span>database administrator</span>, or{" "}
              <span>backend developer</span>. Pursuing this career path isn&apos;t
              easy, especially for someone who doesn&apos;t have a strong background in
              technology. There were times when I struggled to understand concepts and keep up with technical tasks, but I chose to view those challenges as opportunities to learn and grow. However, through continuous learning, participation in
              competitions, and guidance from professors who have shared their knowledge
              and experience, I have gained valuable skills and a deeper understanding
              of the field. Looking back on my journey, these experiences have shown me how much I have grown and have motivated me to continue striving for my goals despite the challenges along the way.
            </p>

            <div className="about-highlight">
              <p>
                Currently building a{" "}
                <span>SaaS-based CRM system</span>, where I&apos;m sharpening my backend
                and database design skills — including the system&apos;s ERD.
              </p>
            </div>

            <div className="about-cards">
              <div className="about-info-card">
                <h4>Backend</h4>
                <p>Focus</p>
              </div>

              <div className="about-info-card">
                <h4>Cybersecurity</h4>
                <p>Interest</p>
              </div>

              <div className="about-info-card">
                <h4>Open</h4>
                <p>For Internships</p>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}
