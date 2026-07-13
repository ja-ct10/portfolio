"use client";
import { motion } from "framer-motion";
import LetterGlitch from "@/components/ui/LetterGlitch";

export interface MarqueeImage {
  src: string;
  alt: string;
  color?: string;
}

interface ThreeDMarqueeProps {
  images: MarqueeImage[];
  className?: string;
}

export function ThreeDMarquee({ images, className = "" }: ThreeDMarqueeProps) {
  // Split into 4 even columns, repeat images to fill if needed
  const groupSize = Math.ceil(images.length / 4);
  const imageGroups = Array.from({ length: 4 }, (_, index) =>
    images.slice(index * groupSize, (index + 1) * groupSize)
  );

  return (
    <div className={`marquee-3d-wrapper ${className}`}>
      {/* LetterGlitch background */}
      <div className="marquee-3d-glitch-bg">
        <LetterGlitch
          glitchColors={["#1a1a2e", "#16213e", "#0f3460"]}
          glitchSpeed={70}
          centerVignette={true}
          outerVignette={true}
          smooth={true}
        />
      </div>

      <div className="marquee-3d-viewport">
        <div className="marquee-3d-scene">
          {imageGroups.map((group, idx) => (
            <motion.div
              key={`col-${idx}`}
              className="marquee-3d-column"
            >
              {group.map((image, imgIdx) => (
                <motion.div
                  key={`img-${idx}-${imgIdx}`}
                  className="marquee-3d-card"
                  style={{ "--card-accent": image.color || "#fff" } as React.CSSProperties}
                  whileHover="hovered"
                  initial="rest"
                  variants={{
                    rest: {
                      rotateX: 0,
                      y: 0,
                      scale: 1,
                    },
                    hovered: {
                      rotateX: -55,
                      y: -30,
                      scale: 1.2,
                      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={56}
                    height={56}
                    className="marquee-3d-img"
                    loading="lazy"
                  />
                  {/* Name tooltip - only visible on hover */}
                  <span className="marquee-3d-tooltip">{image.alt}</span>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fade edges */}
      <div className="marquee-3d-fade marquee-3d-fade--top" />
      <div className="marquee-3d-fade marquee-3d-fade--bottom" />
    </div>
  );
}

export default ThreeDMarquee;
