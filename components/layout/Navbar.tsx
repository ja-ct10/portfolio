"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import GooeyNav from "./GooeyNav";

const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Gallery", href: "#gallery" },
];

type NavbarProps = {
  visible?: boolean;
};

export default function Navbar({ visible = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const isScrollingToRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /* ── Scroll-based active section detection ────────────────────────── */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 48);

      if (isScrollingToRef.current) return;

      const scrollPosition = window.scrollY + window.innerHeight * 0.2;

      // Near bottom of page or in contact section — deactivate pill
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 300;
      if (atBottom) {
        setActiveSection(-1);
        return;
      }

      const contactEl = document.querySelector("#contact");
      if (contactEl) {
        const contactTop = contactEl.getBoundingClientRect().top + window.scrollY;
        if (scrollPosition >= contactTop) {
          setActiveSection(-1);
          return;
        }
      }

      // At the top — Home
      if (window.scrollY < 120) {
        setActiveSection(0);
        return;
      }

      // Iterate backwards through NAV_LINKS to find active section
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const link = NAV_LINKS[i];
        if (link.href === "#top") continue;

        const el = document.querySelector(link.href);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPosition >= top) {
            setActiveSection(i);
            return;
          }
        }
      }

      setActiveSection(0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Menu open body lock ──────────────────────────────────────────── */

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* ── Scroll helper ────────────────────────────────────────────────── */

  const scrollTo = useCallback((href: string) => {
    setMenuOpen(false);

    // Set active immediately
    const clickedIndex = NAV_LINKS.findIndex((link) => link.href === href);
    setActiveSection(clickedIndex);

    // Disable scroll detection during smooth scroll
    isScrollingToRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingToRef.current = false;
    }, 1000);

    if (href === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  /* ── Render ───────────────────────────────────────────────────────── */

  return (
    <header
      className={`site-nav${scrolled ? " site-nav--shrunk" : ""}${visible ? " site-nav--visible" : ""}${menuOpen ? " site-nav--open" : ""}`}
    >
      <div className="site-nav-shell">
        <div className="site-nav-inner">
          {/* Brand logo */}
          <button
            type="button"
            className="site-nav-brand"
            onClick={() => scrollTo("#top")}
            aria-label="Home"
          >
            <Image
              src="/images/logo.png"
              alt="JACT"
              width={88}
              height={28}
              className="site-nav-logo-img"
              priority
            />
          </button>

          {/* Desktop nav */}
          <nav className="site-nav-links" aria-label="Main navigation">
            <GooeyNav
              items={NAV_LINKS}
              activeIndex={activeSection}
              layout="horizontal"
              onItemClick={(href) => scrollTo(href)}
            />
          </nav>

          {/* Actions */}
          <div className="site-nav-actions">
            <button
              type="button"
              className="site-nav-cta"
              onClick={() => scrollTo("#contact")}
            >
              Contact Me
            </button>

            <button
              type="button"
              className="site-nav-toggle"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className="site-nav-mobile"
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className="site-nav-mobile-inner"
          onClick={(e) => e.stopPropagation()}
        >
          <GooeyNav
            items={NAV_LINKS}
            activeIndex={activeSection}
            layout="vertical"
            onItemClick={(href) => scrollTo(href)}
          />
          <button
            type="button"
            className="site-nav-mobile-cta"
            onClick={() => scrollTo("#contact")}
          >
            Contact Me
          </button>
        </div>
      </div>
    </header>
  );
}
