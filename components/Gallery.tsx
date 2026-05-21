"use client";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const images = [
  "/images/android-hackathon.jpg",
  "/images/code-fest.jpg",
  "/images/it-olympics.jpeg",
  "/images/hackathon.jpg",
  "/images/hackathon-1.jpg",
  "/images/hackathon-2.jpg",
  "/images/hackathon-3.jpeg",
];

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <section className="animate-fade-up delay-5">
      <div className="section-subtitle">
        06 — Moments
      </div>

      {/* Title row with buttons aligned right */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-5">
        <h2 className="section-title">Gallery</h2>

        {/* Nav buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            style={{
              width: 36, height: 36,
              borderRadius: "50%",
              border: "1px solid var(--border)",
              background: "var(--surface)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              color: "var(--text-primary)",
              transition: "border-color 0.18s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--text-primary)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll("right")}
            style={{
              width: 36, height: 36,
              borderRadius: "50%",
              border: "1px solid var(--border)",
              background: "var(--surface)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              color: "var(--text-primary)",
              transition: "border-color 0.18s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--text-primary)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Scroll Container — no relative positioning needed for buttons anymore */}
      <div ref={containerRef} className="gallery-scroll">
        {images.map((src, i) => (
          <div className="gallery-item" key={i}>
            <Image
              src={src}
              alt={`Gallery photo ${i + 1}`}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

    </section>
  );
}