"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import GooeyNav from "./GooeyNav";

const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Education", href: "#education" },
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

  // Ref to track whether scroll detection is temporarily disabled (during programmatic scroll)
  const isScrollingToRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 48);

      // Skip scroll-based active detection while a programmatic scroll is in progress
      if (isScrollingToRef.current) return;

      // Use 20% of viewport height as the detection point (catches sections near top of viewport)
      const scrollPosition = window.scrollY + window.innerHeight * 0.2;

      // Check if we're at or near the bottom of the page — deactivate nav pill (contact area)
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 300;
      if (atBottom) {
        setActiveSection(-1);
        return;
      }

      // Check if we're in the contact section — deactivate nav pill
      const contactEl = document.querySelector("#contact");
      if (contactEl) {
        const contactTop = contactEl.getBoundingClientRect().top + window.scrollY;
        if (scrollPosition >= contactTop) {
          setActiveSection(-1);
          return;
        }
      }

      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const link = NAV_LINKS[i];
        if (link.href === "#top") {
          if (window.scrollY < 120) {
            setActiveSection(0);
            break;
          }
          continue;
        }

        const el = document.querySelector(link.href);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          if (scrollPosition >= top) {
            setActiveSection(i);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);

    // Immediately set active section to the clicked item
    const clickedIndex = NAV_LINKS.findIndex((link) => link.href === href);
    setActiveSection(clickedIndex);

    // Disable scroll-based detection while smooth scrolling is in progress
    isScrollingToRef.current = true;
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingToRef.current = false;
    }, 1000);

    if (href === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`site-nav${scrolled ? " site-nav--shrunk" : ""}${visible ? " site-nav--visible" : ""}${menuOpen ? " site-nav--open" : ""}`}
    >
      <div className="site-nav-shell">
        <div className="site-nav-inner">
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

          <nav className="site-nav-links" aria-label="Main navigation">
            <GooeyNav
              items={NAV_LINKS}
              activeIndex={activeSection}
              layout="horizontal"
              onItemClick={(href) => scrollTo(href)}
            />
          </nav>

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
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

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
