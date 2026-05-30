"use client";

import { useState, useEffect, useRef, ComponentType } from "react";
import LoadingPageComponent from "@/components/LoadingPage";

const LoadingPage = LoadingPageComponent as ComponentType<{ onComplete?: () => void }>;

import Hero from "@/components/Hero";
import About from "@/components/About";
import ScrollDown from "@/components/ScrollDown";
import TechStack from "@/components/TechStack";
//import SocialLinks from "@/components/SocialLinks";
import Projects from "@/components/Projects";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import Contact from "@/components/Contact";
import Stats from "@/components/Stats";
import Competitions from "@/components/Competitions";
import ScrollToTop from "@/components/ScrollToTop";
import Navbar from "@/components/Navbar";
import Education from "@/components/Education";

// ── Scroll-reveal hook ───────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

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

  return (
    <>
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
          <About />
        </Reveal>

        <Reveal className="pt-6 sm:pt-8 mb-5">
          <Stats />
        </Reveal>
        <SectionSeparator />

        <Reveal className="pt-8 sm:pt-12 lg:pt-16 mb-5">
          <TechStack />
        </Reveal>

        <SectionSeparator />

        <Reveal className="pt-8 sm:pt-12 lg:pt-16 mb-5">
          <Education />
        </Reveal>

        <SectionSeparator />

        <Reveal className="pt-8 sm:pt-12 lg:pt-16 mb-5">
          <Projects />
        </Reveal>

        <SectionSeparator />

        <Reveal className="pt-8 sm:pt-12 lg:pt-16 mb-5">
          <Competitions />
        </Reveal>

        <SectionSeparator />

        <Reveal className="pt-6 sm:pt-10 mb-8 sm:mb-10">
          <Gallery />
        </Reveal>

        <SectionSeparator />

        <Reveal className="pt-8 sm:pt-12 lg:pt-16 mb-8 sm:mb-10">
          <Contact />
        </Reveal>

        <Reveal threshold={0.01}>
          <Footer />
        </Reveal>
        </div>

        <ScrollToTop />
      </main>
    </>
  );
}