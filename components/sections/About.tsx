"use client";
import Image from "next/image";
import { useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { useParallax } from "@/hooks";

export default function About() {
  const [hovered, setHovered] = useState(false);
  const photoRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-60px" });
  const textInView = useInView(textRef, { once: true, margin: "-40px" });

  // Parallax refs + motion values
  const sectionRef = useRef<HTMLElement>(null);
  const { y: photoY } = useParallax(sectionRef, 0.4);
  const { y: textY } = useParallax(sectionRef, 0.2);
  const { y: cardsY } = useParallax(sectionRef, 0.15);

  // 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 150,
    damping: 20,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 16 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  // Mouse spotlight tracking for info cards
  const handleCardMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      e.currentTarget.style.setProperty("--card-mouse-x", `${x}px`);
      e.currentTarget.style.setProperty("--card-mouse-y", `${y}px`);
    },
    []
  );

  return (
    <section id="about" ref={sectionRef} className="animate-fade-up delay-2 about-section">
      <div className="section-subtitle">01 - Introduction</div>

      <h2 className="section-title mb-6">About</h2>

      <div className="about-wrapper">
        {/* LEFT — photo with 3D tilt + gradient border animation */}
        <motion.div
          ref={photoRef}
          className="about-photo-wrap about-photo-wrap--animated"
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          onTouchStart={() => setHovered(true)}
          onTouchEnd={() => setTimeout(() => setHovered(false), 600)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformPerspective: 800,
            transformStyle: "preserve-3d",
            y: photoY,
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.35 }}
        >
          <div className="about-photo">
            <Image
              src="/images/DSC_0169.JPG"
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
                src="/images/DSC_0165.JPG"
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
                <div className="about-status-pill about-status-pill--breathing">
                  <span className="about-status-dot" />
                  AVAILABLE
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT — text content */}
        <motion.div className="about-content" style={{ y: textY }}>
          <div className="about-badge">
            <span className="about-badge-shimmer" />
            <span className="about-badge-text">
              <span className="about-badge-greeting">Hi, I&apos;m</span>{" "}
              <span className="about-badge-name">Julie Ann!</span>
            </span>
          </div>

          <p ref={textRef} className={`about-main-text ${textInView ? "about-text-revealed" : ""}`}>
            A fourth-year{" "}
            <span className="about-highlight-span">BS Information Technology</span> student aspiring to become a{" "}
            <span className="about-highlight-span">cybersecurity professional</span>,{" "}
            <span className="about-highlight-span">database administrator</span>, or{" "}
            <span className="about-highlight-span">backend developer</span>. Pursuing this career path isn&apos;t
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

          <motion.div style={{ y: cardsY }}>
            <div className="about-cards" ref={cardsRef}>
              {[
                { title: "Backend", subtitle: "Focus" },
                { title: "Cybersecurity", subtitle: "Interest" },
                { title: "Open", subtitle: "For Internships" },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  className="about-info-card"
                  custom={i}
                  initial="hidden"
                  animate={cardsInView ? "visible" : "hidden"}
                  variants={cardVariants}
                  onMouseMove={handleCardMouseMove}
                >
                  <div className="about-info-card-accent" />
                  <h4>{card.title}</h4>
                  <p>{card.subtitle}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
