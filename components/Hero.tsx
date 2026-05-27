"use client";
import { Download, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const [typingText, setTypingText] = useState("");
  const photoRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = photoRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    el.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
  };

  const handleMouseLeave = () => {
    const el = photoRef.current;
    if (!el) return;
    el.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  useEffect(() => {
    const sequence = [
      { full: "BS INFORMATION TECHNOLOGY", eraseTo: "", pause: 1400 },
      { full: "ASPIRING BACKEND DEVELOPER", eraseTo: "ASPIRING ", pause: 1400 },
      { full: "ASPIRING DATABASE DESIGNER", eraseTo: "", pause: 1400 },
    ];

    let active = true;
    let step = 0;
    let mode: "typing" | "erasing" = "typing";
    let index = 0;
    let currentValue = "";
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const getNextPrefix = (nextFull: string, current: string) => {
      if (nextFull.startsWith(current)) return current.length;
      return 0;
    };

    const tick = () => {
      if (!active) return;
      const item = sequence[step];

      if (mode === "typing") {
        if (index < item.full.length) {
          index += 1;
          currentValue = item.full.slice(0, index);
          setTypingText(currentValue);
          timeoutId = setTimeout(tick, 55);
          return;
        }

        timeoutId = setTimeout(() => {
          mode = "erasing";
          timeoutId = setTimeout(tick, 32);
        }, item.pause);
        return;
      }

      const keepLen = item.eraseTo.length;
      if (index > keepLen) {
        index -= 1;
        currentValue = item.full.slice(0, index);
        setTypingText(currentValue);
        timeoutId = setTimeout(tick, 32);
        return;
      }

      currentValue = item.full.slice(0, keepLen);
      setTypingText(currentValue);
      step = (step + 1) % sequence.length;
      const nextItem = sequence[step];
      index = getNextPrefix(nextItem.full, currentValue);
      currentValue = nextItem.full.slice(0, index);
      setTypingText(currentValue);
      mode = "typing";
      timeoutId = setTimeout(tick, 55);
    };

    tick();

    return () => {
      active = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <section className="animate-fade-up delay-1 overflow-hidden relative min-h-[340px] flex flex-col gap-8 hero-grid p-6 sm:p-8 lg:p-[52px] md:flex-row md:items-center md:justify-between">
        {/* Left content */}
        <div className="flex-1 z-10 min-w-0">
          {/* Location — Roboto Mono */}
          <div className="section-subtitle">
            <MapPin size={12} color="var(--text-primary)" />
            Taguig City, Philippines
          </div>

          {/* Name */}
          <h1
            className="text-[clamp(3.5rem,9vw,5rem)] font-bold leading-[1.05] tracking-[-0.01em] text-[#f0ede8] mb-2"
            style={{ fontFamily: "var(--font-heading), serif" }}
          >
            Julie Ann<br />
            <span style={{ position: "relative", display: "inline-block" }}>
              <span style={{ fontStyle: "italic", fontWeight: 700, color: "#959595" }}>Tiron</span>
              <span
                style={{
                  display: "inline-block",
                  width: "3px",
                  height: "0.80em",
                  background: "#f0ede8",
                  marginLeft: "6px",
                  verticalAlign: "middle",
                  borderRadius: "1px",
                  animation: "blink-cursor 1s steps(2, start) infinite",
                }}
              />
            </span>
          </h1>

          <div className="section-subtitle hero-typewriter" style={{ fontSize: 15 }}>
            <span className="typewriter-text">{typingText}</span>
            <span className="typewriter-cursor">|</span>
          </div>

          {/* Social icons */}
          <div className="flex flex-wrap gap-4 mt-4 mb-7">
            <a href="https://www.linkedin.com/in/julie-ann-tiron/" target="_blank" rel="noreferrer"
              style={{ color: "#9b9590", transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#f0ede8")}
              onMouseLeave={e => (e.currentTarget.style.color = "#9b9590")}
            >
              <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="https://github.com/ja-ct10" target="_blank" rel="noreferrer"
              style={{ color: "#9b9590", transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#f0ede8")}
              onMouseLeave={e => (e.currentTarget.style.color = "#9b9590")}
            >
              <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
            <a href="https://www.instagram.com/ja_ct10/" target="_blank" rel="noreferrer"
              style={{ color: "#9b9590", transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#f0ede8")}
              onMouseLeave={e => (e.currentTarget.style.color = "#9b9590")}
            >
              <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
            <a href="https://www.facebook.com/julieann.tiron" target="_blank" rel="noreferrer"
              style={{ color: "#9b9590", transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#f0ede8")}
              onMouseLeave={e => (e.currentTarget.style.color = "#9b9590")}
            >
              <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 items-center">
            
            <a href="/Tiron_JulieAnn_Resume.pdf"
              download="Tiron_JulieAnn_Resume.pdf"
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                background: "#f0ede8", color: "#1a1814",
                border: "none", borderRadius: 999,
                padding: "10px 22px", fontSize: 13.5, fontWeight: 500,
                textDecoration: "none", cursor: "pointer",
              }}
            >
              <Download size={14} />
              Download CV
            </a>
            
            <a href="mailto:tironjulieann10@gmail.com"
              className="btn-primary"
            >
              <Mail size={14} />
              Send email
            </a>
          </div>
        </div>

        {/* Right — photo with tilt effect */}
        <div
          ref={photoRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative flex-shrink-0 w-full max-w-[280px] h-[300px] mx-auto rounded-[14px] overflow-hidden border border-[var(--border)] transition-transform duration-150 ease-out cursor-pointer md:mx-0 lg:w-[240px] lg:h-[300px]"
          style={{ position: "relative" }}
        >
          <Image
            src="/images/IMG_20260226_191311.jpg"
            alt="Julie Ann Tiron"
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
      </section>
    </>
  );
}