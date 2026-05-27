"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Medal, Award, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

type Competition = {
  id: number;
  icon: React.ReactNode;
  placement: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  details: string;
  certificates: string[];
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
    certificates: ["/certificates/android-hackathon-cert.jpg", "/images/android-hackathon.jpg"],
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
    certificates: ["/certificates/code-fest-cert.jpg", "/images/code-fest.jpg"],
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
    certificates: ["/certificates/hackathon-cert.jpg", "/images/hackathon-1.jpg"],
  },
];

function Modal({ selected, onClose }: { selected: Competition; onClose: () => void }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const total = selected.certificates.length;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>

        <button className="modal-close" onClick={onClose}>
          <X size={15} />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div className="modal-icon">{selected.icon}</div>
          <span className="modal-badge">{selected.placement} · {selected.year}</span>
        </div>

        <h3 className="modal-title">{selected.title}</h3>
        <p className="modal-subtitle">{selected.subtitle}</p>

        <div style={{ marginBottom: 20 }}>
          <div className="modal-photo">
            <Image
              src={selected.certificates[photoIndex]}
              alt={`${selected.title} photo ${photoIndex + 1}`}
              fill style={{ objectFit: "contain" }}
            />
          </div>

          {total > 1 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
              <span className="modal-counter">{photoIndex + 1} / {total}</span>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className="modal-nav-btn"
                  onClick={() => setPhotoIndex(i => Math.max(0, i - 1))}
                  disabled={photoIndex === 0}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  className="modal-nav-btn"
                  onClick={() => setPhotoIndex(i => Math.min(total - 1, i + 1))}
                  disabled={photoIndex === total - 1}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="modal-body">{selected.details}</p>
      </div>
    </div>,
    document.body
  );
}

export default function Competitions() {
  const [selected, setSelected] = useState<Competition | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="animate-fade-up delay-4">
      {mounted && selected && (
        <Modal selected={selected} onClose={() => setSelected(null)} />
      )}

      <div className="card p-7">
        <div className="section-subtitle">06 — Recognition</div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="section-title">Competitions</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {competitions.map((comp) => (
            <div
              key={comp.id}
              onClick={() => setSelected(comp)}
              className="group bg-[var(--bg)] border border-[var(--border)] rounded-[12px] p-5 cursor-pointer transition duration-200 ease-out hover:border-[var(--text-muted)] hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="comp-card-icon">{comp.icon}</div>
                <span className="comp-card-badge">{comp.placement} · {comp.year}</span>
              </div>
              <h3 className="comp-card-title">{comp.title}</h3>
              <p className="comp-card-role">{comp.subtitle}</p>
              <p className="comp-card-desc">{comp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}