export default function Marquee() {
  const items = [
    "Available for Internships",
    "Cybersecurity",
    "Backend Development",
    "Database Design",
    "Mobile Development",
    "Open to Collaborate",
  ];

  return (
    <div className="border-y border-[var(--border)] py-3 overflow-hidden relative">
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="marquee-track">
        {/* Render twice for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 20,
              fontFamily: "var(--font-mono), monospace",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--text-secondary)",
              whiteSpace: "nowrap",
              paddingRight: 20,
            }}
          >
            {item}
            <span style={{ color: "var(--text-muted)", fontSize: 11 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}