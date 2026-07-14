"use client";
import { ArrowRight, Mail, MapPin, XCircle, CheckCircle2, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParallax } from "@/hooks";

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
  const [shake, setShake] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { y: headingY } = useParallax(sectionRef, 0.2);
  const { y: formY } = useParallax(sectionRef, 0.3);

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

    setNameError(""); setEmailError(""); setMessageError("");
    let hasError = false;

    if (!trimmedName) { setNameError("Name is required."); hasError = true; }
    if (!trimmedEmail) {
      setEmailError("Email is required."); hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setEmailError("Please enter a valid email address."); hasError = true;
    }
    if (!trimmedMessage) { setMessageError("Message is required."); hasError = true; }

    if (hasError) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setIsSubmitting(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { from_name: trimmedName, from_email: trimmedEmail, message: trimmedMessage },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setToastType("success");
      setToastText("Message sent successfully!");
      setToastOpen(true);
      setName(""); setEmail(""); setMessage("");
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
      <section id="contact" ref={sectionRef} className="animate-fade-up delay-5">
        <div className="p-5 sm:p-6 lg:p-7">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <div className="section-subtitle" style={{ marginBottom: 0 }}>07 — Get in Touch</div>
            <span className="contact-available-badge">
              <span className="contact-blink-dot" />
              Available for Internships
            </span>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">

            {/* Left */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <motion.div style={{ y: headingY }}>
              <h2 className="contact-heading">
                Let&apos;s make{" "}
                <span style={{ fontStyle: "italic", fontWeight: 400, color: "var(--text-secondary)" }}>
                  something
                </span>{" "}
                worth shipping.
              </h2>
              <p className="contact-subtext">
                Have a project, internship, or just want to say hi? Drop a message — I usually reply within a day.
              </p>

              <div style={{ height: 1, background: "var(--border)", marginBottom: 24 }} />
              </motion.div>

              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                <div className="contact-info-row">
                  <Mail size={15} color="var(--text-primary)" />
                  <div>
                    <p className="contact-info-label">Email</p>
                    <a href="mailto:tironjulieann10@gmail.com" className="contact-info-value">
                      tironjulieann10@gmail.com
                    </a>
                  </div>
                </div>
                <div className="contact-info-row" style={{ borderBottom: "none" }}>
                  <MapPin size={15} color="var(--text-primary)" />
                  <div>
                    <p className="contact-info-label">Location</p>
                    <p className="contact-info-value">Taguig City, Philippines</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <motion.div
              ref={formRef}
              style={{ y: formY }}
              animate={shake ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : {}}
              transition={{ duration: 0.5 }}
              className="contact-form-wrapper"
            >
              {/* Name field with floating label */}
              <div className="contact-float-group">
                <input
                  type="text"
                  id="contact-name"
                  className={`contact-field-enhanced${nameError ? " error" : ""}`}
                  value={name}
                  onChange={e => { setName(e.target.value); if (nameError) setNameError(""); }}
                  placeholder=" "
                />
                <label htmlFor="contact-name" className="contact-float-label">Your name</label>
                <div className="contact-focus-ring" />
              </div>
              {nameError && <p className="contact-error-text">{nameError}</p>}

              {/* Email field with floating label */}
              <div className="contact-float-group">
                <input
                  type="email"
                  id="contact-email"
                  className={`contact-field-enhanced${emailError ? " error" : ""}`}
                  value={email}
                  onBlur={() => {
                    const v = email.trim();
                    if (!v) setEmailError("Email is required.");
                    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) setEmailError("Please enter a valid email address.");
                  }}
                  onChange={e => { setEmail(e.target.value); if (emailError) setEmailError(""); }}
                  placeholder=" "
                />
                <label htmlFor="contact-email" className="contact-float-label">Your email</label>
                <div className="contact-focus-ring" />
              </div>
              {emailError && <p className="contact-error-text">{emailError}</p>}

              {/* Message field with floating label */}
              <div className="contact-float-group">
                <textarea
                  id="contact-message"
                  rows={5}
                  className={`contact-field-enhanced${messageError ? " error" : ""}`}
                  value={message}
                  onChange={e => { setMessage(e.target.value); if (messageError) setMessageError(""); }}
                  placeholder=" "
                />
                <label htmlFor="contact-message" className="contact-float-label">Your message</label>
                <div className="contact-focus-ring" />
              </div>
              {messageError && <p className="contact-error-text">{messageError}</p>}

              <motion.button
                type="button"
                className={`btn-send-message${isSubmitting ? " opacity-60 cursor-not-allowed" : ""}`}
                onClick={sendEmail}
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send message <ArrowRight size={16} />
                  </>
                )}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {toastOpen && (
          <motion.div
            className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-slate-950/95 px-5 py-4 shadow-[0_30px_90px_rgba(15,23,42,0.55)] backdrop-blur-xl text-white transition duration-300 ease-out">
              <div className="flex items-start gap-4">
                <div className={`grid h-11 w-11 place-items-center rounded-2xl ${toastType === "success" ? "bg-emerald-500/15 text-emerald-300" : "bg-rose-500/15 text-rose-300"}`}>
                  {toastType === "success" ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white">
                    {toastType === "success" ? "Success" : "Error"}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">{toastText}</p>
                </div>
                <button
                  type="button" onClick={closeToast} aria-label="Dismiss toast"
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-200 transition hover:bg-white/10 hover:text-white"
                >✕</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
