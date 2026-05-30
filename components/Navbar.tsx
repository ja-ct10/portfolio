"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import GooeyNav from "./GooeyNav";

const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Competitions", href: "#competitions" },
  { label: "Gallery", href: "#gallery" },
];

type NavbarProps = {
  visible?: boolean;
};

export default function Navbar({ visible = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 48);

      const scrollPosition = window.scrollY + 160; // Offset for navbar active section detection

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
