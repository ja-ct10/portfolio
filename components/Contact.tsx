"use client";
import { ArrowRight, Mail, Phone, MapPin, XCircle, CheckCircle2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useEffect, useState } from "react";

export default function Contact() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastType] = useState<"success" | "error" | null>(null);
  const [toastText, setToastText] = useState("");

  const closeToast = () => {
    setToastOpen(false);
    setToastType(null);
    setToastText("");
  };

  useEffect(() => {
    if (!toastOpen) return;
    const timer = window.setTimeout(closeToast, 4200);
    return () => window.clearTimeout(timer);
  }, [toastOpen]);

  const sendEmail = async () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    setNameError("");
    setEmailError("");
    setMessageError("");

    let hasError = false;

    if (!trimmedName) {
      setNameError("Name is required.");
      hasError = true;
    }

    if (!trimmedEmail) {
      setEmailError("Email is required.");
      hasError = true;
    } else if (!trimmedEmail.includes("@") || !trimmedEmail.toLowerCase().includes(".com")) {
      setEmailError("Please enter a valid email with @ and .com.");
      hasError = true;
    }

    if (!trimmedMessage) {
      setMessageError("Message is required.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: trimmedName,
          from_email: trimmedEmail,
          message: trimmedMessage,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setToastType("success");
      setToastText("Message sent successfully!");
      setToastOpen(true);

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      setToastType("error");
      setToastText("Failed to send message.");
      setToastOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="animate-fade-up delay-5">
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      <div className="card p-7">

        {/* Header row — label + badge perfectly aligned */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div className="section-subtitle" style={{ marginBottom: 0 }}>
            07 — Get in Touch
          </div>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "8px 18px",
            border: "1px solid var(--border)",
            borderRadius: 999,
            background: "var(--text-primary)",
            fontFamily: "var(--font-mono), monospace",
            fontSize: 11, fontWeight: 600,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: "var(--bg)",
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "var(--bg)",
              display: "inline-block",
              animation: "blink 1.2s ease-in-out infinite",
            }} />
            Available for Internships
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">

          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>

            {/* Big heading */}
            <h2 style={{
              fontFamily: "var(--font-heading), serif",
              fontSize: "clamp(36px, 5vw, 52px)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              marginBottom: 20,
            }}>
              Let&apos;s make{" "}
              <span style={{ fontStyle: "italic", fontWeight: 400, color: "var(--text-secondary)" }}>
                something
              </span>{" "}
              worth shipping.
            </h2>

            {/* Subtext */}
            <p style={{
              color: "var(--text-secondary)", fontSize: 14,
              lineHeight: 1.7, marginBottom: 40,
            }}>
              Have a project, internship, or just want to say hi? Drop a
              message — I usually reply within a day.
            </p>

            {/* Divider */}
            <div style={{ height: 1, background: "var(--border)", marginBottom: 24 }} />

            {/* Contact info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>

              {/* Email */}
              <div style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "16px 0",
                borderBottom: "1px solid var(--border)",
              }}>
                <Mail size={15} color="var(--text-primary)" />
                <div>
                  <p style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 10, letterSpacing: "0.1em",
                    textTransform: "uppercase", color: "var(--text-primary)",
                    marginBottom: 3,
                  }}>Email</p>
                  <a href="mailto:tironjulieann10@gmail.com" style={{
                    fontSize: 13.5, fontWeight: 600,
                    color: "var(--text-primary)", textDecoration: "none",
                  }}>
                    tironjulieann10@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "16px 0",
                borderBottom: "1px solid var(--border)",
              }}>
                <Phone size={15} color="var(--text-primary)" />
                <div>
                  <p style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 10, letterSpacing: "0.1em",
                    textTransform: "uppercase", color: "var(--text-primary)",
                    marginBottom: 3,
                  }}>Phone</p>
                  <a href="tel:+639569128159" style={{
                    fontSize: 13.5, fontWeight: 600,
                    color: "var(--text-primary)", textDecoration: "none",
                  }}>
                    +63 956 912 8159
                  </a>
                </div>
              </div>

              {/* Location */}
              <div style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "16px 0",
              }}>
                <MapPin size={15} color="var(--text-primary)" />
                <div>
                  <p style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: 10, letterSpacing: "0.1em",
                    textTransform: "uppercase", color: "var(--text-primary)",
                    marginBottom: 3,
                  }}>Location</p>
                  <p style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text-primary)" }}>
                    Taguig City, PH
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

            {/* Name */}
            <input
              type="text"
              placeholder="Your name"
              style={{
                width: "100%", background: "var(--bg)",
                border: `1px solid ${nameError ? "rgb(239 68 68)" : "var(--border)"}`, borderRadius: 10,
                padding: "14px 16px", fontSize: 14,
                color: "var(--text-primary)", outline: "none",
                fontFamily: "var(--font-body), sans-serif",
              }}
              onFocus={e => (e.currentTarget.style.borderColor = "var(--text-primary)")}
              onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
              value={name}
              onChange={e => {
                setName(e.target.value);
                if (nameError) setNameError("");
              }}
            />
            {nameError && (
              <p className="mt-2 text-sm text-red-500">{nameError}</p>
            )}

            {/* Email */}
            <input
              type="email"
              placeholder="Your email"
              style={{
                width: "100%", background: "var(--bg)",
                border: `1px solid ${emailError ? "rgb(239 68 68)" : "var(--border)"}`, borderRadius: 10,
                padding: "14px 16px", fontSize: 14,
                color: "var(--text-primary)", outline: "none",
                fontFamily: "var(--font-body), sans-serif",
              }}
              onFocus={e => (e.currentTarget.style.borderColor = "var(--text-primary)")}
              onBlur={e => {
                const value = email.trim();
                if (!value) {
                  setEmailError("Email is required.");
                } else if (!value.includes("@") || !value.toLowerCase().includes(".com")) {
                  setEmailError("Please enter a valid email");
                }
                e.currentTarget.style.borderColor = "var(--border)";
              }}
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                if (emailError) setEmailError("");
              }}
            />
            {emailError && (
              <p className="mt-2 text-sm text-red-500">{emailError}</p>
            )}

            {/* Message */}
            <textarea
              placeholder="Your message"
              rows={5}
              style={{
                width: "100%", background: "var(--bg)",
                border: `1px solid ${messageError ? "rgb(239 68 68)" : "var(--border)"}`, borderRadius: 10,
                padding: "14px 16px", fontSize: 14,
                color: "var(--text-primary)", outline: "none",
                resize: "none", fontFamily: "var(--font-body), sans-serif",
              }}
              onFocus={e => (e.currentTarget.style.borderColor = "var(--text-primary)")}
              onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
              value={message}
              onChange={e => {
                setMessage(e.target.value);
                if (messageError) setMessageError("");
              }}
            />
            {messageError && (
              <p className="mt-2 text-sm text-red-500">{messageError}</p>
            )}

            {/* Submit button */}

            <button
              type="button"
              className={`btn-send-message ${isSubmitting ? "opacity-60 cursor-not-allowed" : ""}`}
              onClick={sendEmail}
              disabled={isSubmitting}
            >
              Send message <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>

      {toastOpen && (
        <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
          <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-slate-950/95 px-5 py-4 shadow-[0_30px_90px_rgba(15,23,42,0.55)] backdrop-blur-xl text-white transition duration-300 ease-out">
            <div className="flex items-start gap-4">
              <div className={`grid h-11 w-11 place-items-center rounded-2xl ${toastType === "success" ? "bg-emerald-500/15 text-emerald-300" : "bg-rose-500/15 text-rose-300"}`}>
                {toastType === "success" ? (
                  <CheckCircle2 size={24} />
                ) : (
                  <XCircle size={24} />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">
                  {toastType === "success" ? "Success" : "Error"}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-300">
                  {toastText}
                </p>
              </div>
              <button
                type="button"
                onClick={closeToast}
                aria-label="Dismiss toast"
                className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-200 transition hover:bg-white/10 hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}