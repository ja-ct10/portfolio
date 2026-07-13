"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useParallax } from "@/hooks";
import ThreeDMarquee, { type MarqueeImage } from "@/components/ui/ThreeDMarquee";

/* ─── Tech logos using cdn.simpleicons.org for official SVG logos ─── */
const techImages: MarqueeImage[] = [
  // Languages
  { src: "https://cdn.simpleicons.org/html5/E34F26", alt: "HTML5", color: "#E34F26" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", alt: "CSS3", color: "#1572B6" },
  { src: "https://cdn.simpleicons.org/javascript/F7DF1E", alt: "JavaScript", color: "#F7DF1E" },
  { src: "https://cdn.simpleicons.org/typescript/3178C6", alt: "TypeScript", color: "#3178C6" },
  { src: "https://cdn.simpleicons.org/python/3776AB", alt: "Python", color: "#3776AB" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", alt: "Java", color: "#ED8B00" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", alt: "C#", color: "#512BD4" },
  // Frameworks
  { src: "https://cdn.simpleicons.org/react/61DAFB", alt: "React", color: "#61DAFB" },
  { src: "https://cdn.simpleicons.org/nextdotjs/ffffff", alt: "Next.js", color: "#ffffff" },
  { src: "https://cdn.simpleicons.org/tailwindcss/06B6D4", alt: "Tailwind", color: "#06B6D4" },
  { src: "https://cdn.simpleicons.org/nodedotjs/339933", alt: "Node.js", color: "#339933" },
  { src: "https://cdn.simpleicons.org/express/ffffff", alt: "Express", color: "#ffffff" },
  { src: "https://cdn.simpleicons.org/laravel/FF2D20", alt: "Laravel", color: "#FF2D20" },
  // Databases
  { src: "https://cdn.simpleicons.org/mysql/4479A1", alt: "MySQL", color: "#4479A1" },
  { src: "https://cdn.simpleicons.org/postgresql/4169E1", alt: "PostgreSQL", color: "#4169E1" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg", alt: "SQL Server", color: "#CC2927" },
  { src: "https://cdn.simpleicons.org/firebase/FFCA28", alt: "Firebase", color: "#FFCA28" },
  // Mobile
  { src: "https://cdn.simpleicons.org/android/3DDC84", alt: "Android", color: "#3DDC84" },
  { src: "https://cdn.simpleicons.org/kotlin/7F52FF", alt: "Kotlin", color: "#7F52FF" },
  // Tools
  { src: "https://cdn.simpleicons.org/git/F05032", alt: "Git", color: "#F05032" },
  { src: "https://cdn.simpleicons.org/github/ffffff", alt: "GitHub", color: "#ffffff" },
  { src: "https://cdn.simpleicons.org/figma/F24E1E", alt: "Figma", color: "#F24E1E" },
  { src: "https://cdn.simpleicons.org/postman/FF6C37", alt: "Postman", color: "#FF6C37" },
  { src: "https://cdn.simpleicons.org/jira/0052CC", alt: "Jira", color: "#0052CC" },
];

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const { y: headingY } = useParallax(sectionRef, 0.15);

  return (
    <section id="tech-stack" ref={sectionRef}>
      <motion.div style={{ y: headingY }} className="techstack-header">
        <div>
          <div className="section-subtitle mb-2">04 - CAPABILITIES</div>
          <h2 className="section-title">
            Tech Stack
          </h2>
        </div>
        <p className="techstack-desc">
          The technologies and tools I use to build modern, scalable applications.
        </p>
      </motion.div>

      <ThreeDMarquee images={techImages} />
    </section>
  );
}
