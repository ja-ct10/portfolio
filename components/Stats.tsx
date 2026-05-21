const stats = [
  { value: "3rd", label: "Year IT Student" },
  { value: "20+", label: "Technologies" },
  { value: "5+", label: "Competitions" },
  { value: "∞", label: "Curiosity" },
];

export default function Stats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 border border-[var(--border)] mb-5">
      {stats.map((stat, i) => (
        <div
          key={i}
          className={`px-6 py-7 ${i < stats.length - 1 ? "border-b border-[var(--border)] sm:border-b-0 sm:border-r" : ""}`}
        >
          <p style={{
            fontFamily: "var(--font-heading), serif",
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 700,
            color: "var(--text-primary)",
            lineHeight: 1,
            marginBottom: 10,
          }}>
            {stat.value}
          </p>
          <p style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
          }}>
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}