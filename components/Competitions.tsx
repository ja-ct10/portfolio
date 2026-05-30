"use client";
import { useState } from "react";
import { Medal, Award, RotateCw } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

type Competition = {
  id: number;
  icon: React.ReactNode;
  placement: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  details: string;
  certificates: string;
};

const competitions: Competition[] = [
  {
    id: 1,
    icon: <Medal size={20} />,
    placement: "2ND",
    year: "2026",
    title: "Android Hackathon - 2nd Placer",
    subtitle: "Main Developer",
    description: "Built an e-commerce mobile-based platform under 5 hours with a 3-person team.",
    details: "Within a limited time, we were tasked with designing and developing a mobile application based on an e-commerce platform, with the goal of creating a functional and user-friendly app that demonstrates a complete ordering process during the Android Hackathon, a competition under Collaboratech 2026. We were able to create an application named ShopLift, where I served as the main developer, and our team won 2nd place.",
    certificates: "/images/android-hackathon.jpg",
  },
  {
    id: 2,
    icon: <Medal size={20} />,
    placement: "2ND",
    year: "2026",
    title: "Tagisan ng Talino: Code Fest - 2nd Placer",
    subtitle: "Main Developer",
    description: "Built an e-commerce mobile app under 5 hours with a 3-person team.",
    details: "We competed in Tagisan ng Talino: CodeFest, a local-level mobile app hackathon, where we were tasked to develop an Android application focused on managing construction inventory and handling the borrowing and returning of construction equipment. The system also required features such as tracking item availability, recording transactions, and generating PDF reports for documentation and monitoring purposes. As the main developer, I was able to design and implement a functional and user-friendly interface, including core features for inventory management and equipment borrowing/returning workflows. The application also emphasized accurate record keeping and efficient data management to support real-world construction site operations.",
    certificates: "/images/code-fest.jpg",
  },
  {
    id: 3,
    icon: <Award size={20} />,
    placement: "PARTICIPANT",
    year: "2025",
    title: "hack-it! The New Era of Banking - Participant",
    subtitle: "Main Developer, Database Designer",
    description: "Built AI-assisted KYC insurance platform for faster application review and processing.",
    details: "We competed with 12 teams in the 2-day hackathon event hack-It! The New Era of Banking, presenting LifeGard as our contribution—an AI-assisted life insurance system designed to improve underwriting efficiency and application processing speed. LifeGard uses machine learning trained on historical approved and rejected applications to adapt risk assessments based on each insurance company's criteria, including factors such as age and medical conditions. As a decision-support tool, it streamlines the evaluation process while still requiring human underwriters for complex cases such as fraud detection and final approval. Although this was our first hackathon event and we did not win, the experience provided us with valuable learning opportunities and strengthened our skills in innovation, teamwork, and system development.",
    certificates: "/images/hackathon-1.jpg",
  },
];

function getBadgeClass(placement: string) {
  if (placement === "2ND") return "comp-card-badge comp-badge-silver";
  return "comp-card-badge comp-badge-participant";
}

function getIconClass(placement: string) {
  if (placement === "2ND") return "comp-card-icon comp-icon-silver";
  return "comp-card-icon comp-icon-participant";
}

function CompetitionCard({ comp }: { comp: Competition }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="comp-flip-card-container"
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
    >
      <div className={`comp-flip-card-inner ${isFlipped ? "flipped" : ""}`}>

        {/* CARD FRONT — Image Preview */}
        <div className="comp-flip-card-front">
          <div className="comp-flip-card-front-img-wrap">
            <Image
              src={comp.certificates}
              alt={`${comp.title} Preview`}
              fill
              sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 1280px) calc(50vw - 48px), calc(33vw - 32px)"
              style={{ objectFit: "cover", objectPosition: "center top" }}
              priority
            />
            <div className="comp-flip-card-front-overlay" />
          </div>

          <div className="comp-flip-card-front-content">
            <div className="comp-flip-card-front-top" />

            <div className="comp-flip-card-front-bottom">
              <h3 className="comp-flip-card-front-title">{comp.title}</h3>
              <div className="comp-flip-card-front-hint">
                <RotateCw size={11} />
                <span>Click to view details</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD BACK — Description & Details */}
        <div className="comp-flip-card-back">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div className={getIconClass(comp.placement)}>{comp.icon}</div>
            <span className={getBadgeClass(comp.placement)}>
              {comp.placement} · {comp.year}
            </span>
          </div>

          <h3 className="comp-card-title">{comp.title}</h3>
          <p className="comp-card-role">{comp.subtitle}</p>

          <div className="comp-card-desc" onClick={(e) => e.stopPropagation()}>
            <p style={{ fontWeight: 500, color: "var(--text-primary)", marginBottom: 8 }}>
              {comp.description}
            </p>
            <p>{comp.details}</p>
          </div>

          <a
            href={comp.certificates}
            target="_blank"
            rel="noreferrer"
            className="comp-cert-cta"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

      </div>
    </div>
  );
}

export default function Competitions() {
  return (
    <section id="competitions" className="animate-fade-up delay-4">
        <div className="section-subtitle">06 — Recognition</div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">Competitions</h2>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {competitions.map((comp) => (
            <motion.div
              key={comp.id}
              className="w-full"
              variants={{
                hidden: { opacity: 0, y: 24, scale: 0.98 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 260, damping: 24 },
                },
              }}
            >
              <CompetitionCard comp={comp} />
            </motion.div>
          ))}
        </motion.div>
    </section>
  );
}