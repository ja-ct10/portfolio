export default function About() {
  return (
    <section className="animate-fade-up delay-2">
      <div className="card p-7">
        <div className="section-subtitle">
            01 - Introduction
        </div>
        <h2 className="section-title mb-4">
          About
        </h2>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.75, fontSize: 14.5 }}>
          I am a third-year BS Information Technology student aspiring to become a <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>cybersecurity professional</span>
          , <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>database administrator</span>, or <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>backend developer</span>. I have experience working
          with Java, C#, Python, HTML/CSS, JavaScript, Node.js, and SQL, and I also build mobile
          applications. I participate in various competitions to further develop my skills by
          creating real-world applications. Currently, <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>I am working on a SaaS-based CRM system</span>,
          which is helping me enhance my backend development and database design skills, as I am
          also responsible for creating the system's ERD.
        </p>
      </div>
    </section>
  );
}
