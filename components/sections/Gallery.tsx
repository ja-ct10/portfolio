"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const images = [
  "/images/android-hackathon.jpg",
  "/images/code-fest.jpg",
  "/images/it-olympics.jpeg",
  "/images/hackathon.jpg",
  "/images/hackathon-1.jpg",
  "/images/hackathon-2.jpg",
  "/images/hackathon-3.jpeg",
  "/images/symph-workshop.png",
  "/images/symph-workshop-1.png",
  "/images/symph-workshop-3.png",
  "/images/symph-workshop-4.png",
  "/images/symph-workshop-5.jpg",
  "/images/kiroverse-workshop.jpg",
  "/images/kiroverse-workshop-2.jpg"
];

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activePage, setActivePage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const calculatePages = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const pages = Math.max(1, Math.ceil(container.scrollWidth / container.clientWidth));
    setTotalPages(pages);
  }, []);

  const updateActivePage = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) {
      setActivePage(0);
      return;
    }
    const pages = Math.max(1, Math.ceil(container.scrollWidth / container.clientWidth));
    const scrollRatio = container.scrollLeft / maxScroll;
    const page = Math.round(scrollRatio * (pages - 1));
    setActivePage(page);
  }, []);

  useEffect(() => {
    calculatePages();
    const handleResize = () => {
      calculatePages();
      updateActivePage();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculatePages, updateActivePage]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      updateActivePage();
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [updateActivePage]);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (lightboxIndex !== null) {
        if (e.key === "ArrowRight") setLightboxIndex((prev) => prev !== null ? Math.min(prev + 1, images.length - 1) : null);
        if (e.key === "ArrowLeft") setLightboxIndex((prev) => prev !== null ? Math.max(prev - 1, 0) : null);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex]);

  const scroll = (dir: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;
    const firstItem = container.firstElementChild as HTMLElement | null;
    if (!firstItem) return;
    const gap = 14;
    const cardWidth = firstItem.offsetWidth + gap;
    container.scrollBy({
      left: dir === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  const scrollToPage = (page: number) => {
    const container = containerRef.current;
    if (!container) return;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const targetScroll = totalPages > 1 ? (page / (totalPages - 1)) * maxScroll : 0;
    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section id="gallery" className="animate-fade-up delay-5" ref={sectionRef}>
        <div className="section-subtitle">05 — Moments</div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-5">
          <h2 className="section-title">Gallery</h2>

          <div className="flex gap-2">
            <motion.button
              onClick={() => scroll("left")}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.92 }}
              className="gallery-nav-btn"
              aria-label="Scroll left"
            >
              <ChevronLeft size={16} />
            </motion.button>
            <motion.button
              onClick={() => scroll("right")}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.92 }}
              className="gallery-nav-btn"
              aria-label="Scroll right"
            >
              <ChevronRight size={16} />
            </motion.button>
          </div>
        </div>

        <div
          ref={containerRef}
          className="gallery-scroll"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {images.map((src, i) => (
            <motion.div
              className="gallery-item"
              key={i}
              style={{ y: parallaxY, scrollSnapAlign: "start" }}
              onClick={() => setLightboxIndex(i)}
            >
              <div className="gallery-image-wrapper">
                <Image
                  src={src}
                  alt={`Gallery photo ${i + 1}`}
                  fill
                  sizes="(max-width: 380px) 250px, (max-width: 640px) 280px, 320px"
                  style={{ objectFit: "contain" }}
                  className="gallery-image"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dot Pagination */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginTop: 20,
          }}
        >
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToPage(i)}
              aria-label={`Go to page ${i + 1}`}
              style={{
                width: activePage === i ? 28 : 10,
                height: 10,
                borderRadius: 9999,
                border: "none",
                padding: 0,
                cursor: "pointer",
                background: activePage === i ? "var(--accent)" : "var(--text-secondary)",
                opacity: activePage === i ? 1 : 0.4,
                transition: "width 0.3s ease, opacity 0.3s ease, background 0.3s ease",
              }}
            />
          ))}
        </div>
      </section>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="gallery-lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              className="gallery-lightbox-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="gallery-lightbox-close"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close lightbox"
              >
                <X size={20} />
              </button>

              <div className="gallery-lightbox-image-wrap">
                <Image
                  src={images[lightboxIndex]}
                  alt={`Gallery photo ${lightboxIndex + 1}`}
                  fill
                  sizes="90vw"
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>

              {/* Lightbox navigation */}
              <div className="gallery-lightbox-nav">
                <button
                  onClick={() => setLightboxIndex(Math.max(0, lightboxIndex - 1))}
                  disabled={lightboxIndex === 0}
                  className="gallery-lightbox-nav-btn"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="gallery-lightbox-counter">
                  {lightboxIndex + 1} / {images.length}
                </span>
                <button
                  onClick={() => setLightboxIndex(Math.min(images.length - 1, lightboxIndex + 1))}
                  disabled={lightboxIndex === images.length - 1}
                  className="gallery-lightbox-nav-btn"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
