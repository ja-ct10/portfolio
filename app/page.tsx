"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useReveal } from "@/hooks/useReveal";
import LoadingPage from "@/components/ui/LoadingPage";
import { ScrollProgressBar } from "@/components/ui";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ScrollDown from "@/components/ui/ScrollDown";
import Marquee from "@/components/ui/Marquee";
import Navbar from "@/components/layout/Navbar";
import Stats from "@/components/sections/Stats";
import ScrollToTop from "@/components/ui/ScrollToTop";
import Footer from "@/components/layout/Footer";

// Dynamic imports for heavier sections (loaded after initial paint)
const Services = dynamic(() => import("@/components/sections/Services"), { ssr: false });
const TechStack = dynamic(() => import("@/components/sections/TechStack"), { ssr: false });
const Portfolio = dynamic(() => import("@/components/sections/Portfolio"), { ssr: false });
const Gallery = dynamic(() => import("@/components/sections/Gallery"), { ssr: false });
const Contact = dynamic(() => import("@/components/sections/Contact"), { ssr: false });
const Education = dynamic(() => import("@/components/sections/Education"), { ssr: false });

// ── Reveal wrapper ───────────────────────────────────────────────────────────
function Reveal({
  children,
  className,
  delay = 0,
  threshold,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}) {
  const { ref, visible } = useReveal(threshold);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(40px)",
        transition: visible
          ? `opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}s,
             transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}s`
          : "none",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

function SectionSeparator() {
  return (
    <div className="section-separator">
      <div className="section-separator-line">
        <div className="section-separator-glow" />
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [loaded, setLoaded] = useState(false);

  // On mount: check if loading was already played, and handle hash navigation
  useEffect(() => {
    const alreadyPlayed = sessionStorage.getItem("portfolio-loaded");
    
    if (alreadyPlayed) {
      // Skip loading, show content immediately
      setLoaded(true);
      // If there's a hash (e.g. #portfolio), scroll to it after a brief delay
      if (window.location.hash) {
        const hash = window.location.hash;
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      // First visit: scroll to top, remove hash
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }
  }, []);

  return (
    <>
      <ScrollProgressBar />
      <LoadingPage onComplete={() => setLoaded(true)} />
        
      <Navbar visible={loaded} />
        
      <main
        className="w-full min-h-[100dvh]"
        style={{
          opacity: loaded ? 1 : 0,
          transition: loaded ? "opacity 0.4s ease" : "none",
          pointerEvents: loaded ? "auto" : "none",
        }}
      >
        {/* Hero + Marquee — fills first screen */}
        <Reveal className="hero-below-nav mb-5 flex min-h-[100dvh] flex-col">
          <Hero />
          <Marquee />
          <ScrollDown />
        </Reveal>

        <div className="section-gutter">
        <Reveal className="mb-5" delay={0.05}>
          <Services />
        </Reveal>
        <SectionSeparator />

        <Reveal className="pt-6 sm:pt-12 lg:pt-16 mb-5">
          <About />
        </Reveal>

        <Reveal className="pt-6 sm:pt-8 mb-5">
          <Stats />
        </Reveal>
        <SectionSeparator />

        <Reveal className="pt-8 sm:pt-12 lg:pt-16 mb-5">
          <Education />
        </Reveal>

        <SectionSeparator />

        <Reveal className="pt-8 sm:pt-12 lg:pt-16 mb-5">
          <TechStack />
        </Reveal>

        <SectionSeparator />

        <Reveal className="pt-8 sm:pt-12 lg:pt-16 mb-5">
          <Portfolio />
        </Reveal>

        <SectionSeparator />

        <Reveal className="pt-6 sm:pt-10 mb-8 sm:mb-10">
          <Gallery />
        </Reveal>

        <SectionSeparator />

        <Reveal className="pt-8 sm:pt-12 lg:pt-16 mb-8 sm:mb-10">
          <Contact />
        </Reveal>

        </div>

        <Marquee />

        <div className="section-gutter">
        <Reveal threshold={0.01}>
          <Footer />
        </Reveal>
        </div>

        <ScrollToTop />
      </main>
    </>
  );
}