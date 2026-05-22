import { ChevronLeft } from "lucide-react";

const stacks = {
  Frontend: ["HTML/CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
  Backend: ["Java", "C#", "Python", "Node.js", "PostgreSQL", "SQL Server", "Express.js", "MySQL"],
  Mobile: ["Android (Java)", "Firebase"],
  DeveloperTools: ["Git", "GitHub", "VS Code", "Kiro", "Jira", "Postman", "Figma", "Trello"],
};

export default function TechStackPage() {
  return (
    <main className="mx-auto max-w-[860px] px-5 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-0 md:flex-row md:items-center md:justify-start md:gap-8 mb-9">
        <a href="/" className="inline-flex items-center gap-2 text-[14px] text-[var(--text-secondary)] no-underline">
          <ChevronLeft size={16} />
          Back to Home
        </a>
        <h1 className="text-3xl font-bold tracking-[-0.02em] mt-0 mb-0" style={{ fontFamily: "var(--font-body), sans-serif" }}>
          Tech Stack
        </h1>
      </div>

      <div className="flex flex-col gap-9">
        {Object.entries(stacks).map(([category, techs]) => (
          <div key={category}>
            <h2
              style={{
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 14,
                color: "var(--text-primary)",
              }}
            >
              {category}
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {techs.map((tech) => (
                <span key={tech} className="tag-view-all">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}