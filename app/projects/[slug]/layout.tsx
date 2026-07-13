import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Study | Julie Ann Tiron",
  description: "Detailed case study of a project by Julie Ann Tiron",
};

export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
