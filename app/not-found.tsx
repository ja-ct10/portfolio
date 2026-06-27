"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--bg)",
        color: "var(--text-primary)",
        padding: "24px",
        textAlign: "center",
        gap: "24px",
      }}
    >
      {/* Label */}
      <span
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--text-secondary)",
        }}
      >
        Page Not Found
      </span>

      {/* 404 heading */}
      <h1
        style={{
          fontFamily: "var(--font-heading), serif",
          fontSize: "clamp(72px, 15vw, 140px)",
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: "-0.03em",
          color: "var(--text-primary)",
        }}
      >
        404
      </h1>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-body), sans-serif",
          fontSize: "15px",
          lineHeight: 1.6,
          color: "var(--text-secondary)",
          maxWidth: "380px",
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      {/* Divider */}
      <div
        style={{
          width: "60px",
          height: "1px",
          background: "var(--border)",
        }}
      />

      {/* Go Home button */}
      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "12px 28px",
          borderRadius: "999px",
          border: "1px solid var(--border)",
          background: "transparent",
          color: "var(--accent)",
          fontFamily: "var(--font-body), sans-serif",
          fontSize: "14px",
          fontWeight: 500,
          textDecoration: "none",
          transition: "border-color 0.2s ease, background 0.2s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--text-primary)";
          e.currentTarget.style.background = "var(--surface)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.background = "transparent";
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
        Go Home
      </Link>
    </main>
  );
}
