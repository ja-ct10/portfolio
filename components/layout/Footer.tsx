"use client";

import { Linkedin, Github, Instagram, Facebook } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/julie-ann-tiron/",
    icon: Linkedin,
  },
  {
    name: "GitHub",
    href: "https://github.com/ja-ct10",
    icon: Github,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/ja_ct10/",
    icon: Instagram,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/julieann.tiron",
    icon: Facebook,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-80px" });

  return (
    <footer className="w-full" ref={footerRef}>
      {/* Gradient separator line */}
      <div className="footer-gradient-separator" />

      {/* Main Section - 3-Column Grid */}
      <motion.div
        className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Column 1: Bio */}
        <motion.div className="flex flex-col gap-4" variants={itemVariants}>
          <Image
            src="/images/logo.png"
            alt="Julie Ann Tiron"
            width={100}
            height={32}
            style={{ objectFit: "contain" }}
          />
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            IT Student, Aspiring Backend Developer &amp; Cybersecurity
            Professional. Passionate about building secure, scalable systems and
            continuously learning new technologies.
          </p>
        </motion.div>

        {/* Column 2: Navigation */}
        <motion.div className="flex flex-col gap-4" variants={itemVariants}>
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--text-secondary)]">
            Navigation
          </span>
          <nav className="grid grid-cols-2 gap-x-6 gap-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="footer-nav-link"
              >
                <span className="footer-nav-link-text">{link.label}</span>
              </a>
            ))}
          </nav>
        </motion.div>

        {/* Column 3: Socials */}
        <motion.div className="flex flex-col gap-4" variants={itemVariants}>
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--text-secondary)]">
            Connect
          </span>
          <div className="flex gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  className="footer-social-icon"
                  whileHover={{ scale: 1.18, rotate: 8 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Icon size={18} />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Section - Copyright */}
      <motion.div
        className="flex flex-col items-center justify-between gap-2 border-t border-[var(--border)] pt-6 pb-6 text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--text-secondary)] sm:flex-row"
        variants={itemVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <span>&copy; 2026 Julie Ann Tiron</span>
        <span>All Rights Reserved</span>
      </motion.div>
    </footer>
  );
}
