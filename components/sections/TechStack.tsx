"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useParallax } from "@/hooks";

import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiSharp,
  SiPython,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMysql,
  SiAndroid,
  SiFirebase,
  SiGit,
  SiGithub,
  SiJira,
  SiPostman,
  SiFigma,
  SiTrello,
} from "react-icons/si";

import { FaJava, FaToolbox } from "react-icons/fa";
import { DiMsqlServer } from "react-icons/di";
import { VscCode } from "react-icons/vsc";

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

type StackItemProps = {
  name: string;
  color: string;
  icon: React.ReactNode;
};

function StackCard({
  name,
  color,
  icon,
  index,
}: StackItemProps & { index: number }) {
  const { ref, visible } = useInView();

  return (
    <div
      ref={ref}
      className="tech-card-compact"
      style={
        {
          "--tech-accent": color,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(14px) scale(0.98)",
          transition: `opacity 0.5s ease ${index * 0.035}s, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.035}s`,
        } as React.CSSProperties
      }
    >
      <div className="tech-icon-wrap">
        <div className="tech-icon-container" style={{ color }}>
          {icon}
        </div>
      </div>
      <p className="tech-name-compact">{name}</p>
    </div>
  );
}

function Section({
  title,
  items,
}: {
  title: string;
  items: StackItemProps[];
}) {
  return (
    <article className="tech-category">
      <div className="tech-category-header">
        <p className="tech-section-label">{title}</p>
        <span className="tech-category-count">{items.length}</span>
      </div>

      <div className="tech-stack-grid">
        {items.map((item, index) => (
          <StackCard key={item.name} index={index} {...item} />
        ))}
      </div>
    </article>
  );
}

const frontend: StackItemProps[] = [
  { name: "HTML5", color: "#E34F26", icon: <SiHtml5 size={20} /> },
  { name: "CSS3", color: "#1572B6", icon: <SiCss size={20} /> },
  { name: "JavaScript", color: "#F7DF1E", icon: <SiJavascript size={20} /> },
  { name: "TypeScript", color: "#3178C6", icon: <SiTypescript size={20} /> },
  { name: "React", color: "#61DAFB", icon: <SiReact size={20} /> },
  { name: "Next.js", color: "#FFFFFF", icon: <SiNextdotjs size={20} /> },
  { name: "Tailwind CSS", color: "#06B6D4", icon: <SiTailwindcss size={20} /> },
];

const backend: StackItemProps[] = [
  { name: "Java", color: "#F89820", icon: <FaJava size={20} /> },
  { name: "C#", color: "#9B4F96", icon: <SiSharp size={20} /> },
  { name: "Python", color: "#3776AB", icon: <SiPython size={20} /> },
  { name: "Node.js", color: "#339933", icon: <SiNodedotjs size={20} /> },
  { name: "Express.js", color: "#FFFFFF", icon: <SiExpress size={20} /> },
  { name: "PostgreSQL", color: "#4169E1", icon: <SiPostgresql size={20} /> },
  { name: "MySQL", color: "#4479A1", icon: <SiMysql size={20} /> },
  { name: "SQL Server", color: "#CC2927", icon: <DiMsqlServer size={20} /> },
];

const mobile: StackItemProps[] = [
  { name: "Android", color: "#3DDC84", icon: <SiAndroid size={20} /> },
  { name: "Firebase", color: "#FFCA28", icon: <SiFirebase size={20} /> },
];

const tools: StackItemProps[] = [
  { name: "Git", color: "#F05032", icon: <SiGit size={20} /> },
  { name: "GitHub", color: "#ffffff", icon: <SiGithub size={20} /> },
  { name: "VS Code", color: "#007ACC", icon: <VscCode size={20} /> },
  { name: "Kiro", color: "#888888", icon: <FaToolbox size={20} /> },
  { name: "Jira", color: "#0052CC", icon: <SiJira size={20} /> },
  { name: "Postman", color: "#FF6C37", icon: <SiPostman size={20} /> },
  { name: "Figma", color: "#F24E1E", icon: <SiFigma size={20} /> },
  { name: "Trello", color: "#0079BF", icon: <SiTrello size={20} /> },
];

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const { y: headingY } = useParallax(sectionRef, 0.2);
  const { y: gridY } = useParallax(sectionRef, 0.35);
  const { y: orbY, disabled: orbDisabled } = useParallax(sectionRef, 0.6);

  return (
    <section
      id="tech-stack"
      className="tech-stack-section"
      ref={sectionRef}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "20%",
          left: "60%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--accent), transparent 70%)",
          opacity: orbDisabled ? 0 : 0.06,
          pointerEvents: "none",
          zIndex: 0,
          y: orbY,
        }}
      />

      <motion.div style={{ y: headingY, position: "relative", zIndex: 1 }}>
        <div className="section-subtitle">02 - Capabilities</div>
        <h2 className="section-title mb-6 sm:mb-8">Tech Stack</h2>
      </motion.div>

      <motion.div style={{ y: gridY, position: "relative", zIndex: 1 }}>
        <div className="tech-categories">
          <Section title="Frontend" items={frontend} />
          <Section title="Backend" items={backend} />
          <Section title="Mobile" items={mobile} />
          <Section title="Developer Tools" items={tools} />
        </div>
      </motion.div>
    </section>
  );
}
