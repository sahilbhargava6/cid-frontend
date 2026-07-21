"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useSiteConfig, getCleanPhone, getCleanEmail } from "@/data/siteConfigData";

const availableServices = [
  "Tax Preparation",
  "Virtual Bookkeeping",
  "Home Solar Systems",
  "Business Accounts & Logistics",
  "Procurement Services",
];

export default function CTA() {
  const config = useSiteConfig();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const validateForm = () => {
    const nextErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) nextErrors.name = "Name is required";
    if (!formData.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      nextErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s\-()]{10,20}$/.test(formData.phone)) {
      nextErrors.phone = "Invalid phone number";
    }
    return nextErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setStatus("submitting");

    try {
      const fullMessage = `Selected Services Needed: ${selectedServices.join(", ") || "None selected"}\n\nMessage:\n${formData.message}`;

      await api.post("/contact", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: fullMessage,
      });

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setSelectedServices([]);
    } catch (err) {
      console.error("Failed to submit CTA contact form:", err);
      setErrors({ form: "Failed to submit request. Please try again later." });
      setStatus("idle");
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      className="section-padding relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0F1117 0%, #1A1D27 40%, #0F1117 100%)",
      }}
    >
      {/* Decorative elements */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-[100px] pointer-events-none"
        style={{ background: "var(--cid-coral)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px] pointer-events-none"
        style={{ background: "var(--cid-blue)" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">

          {/* Left Column - Copy & Trust Info */}
          <div>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 mb-6"
              style={{
                borderColor: "rgba(232, 93, 58, 0.35)",
                backgroundColor: "rgba(232, 93, 58, 0.1)",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--cid-coral)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              <span
                className="text-xs font-semibold"
                style={{ color: "var(--cid-coral-light)" }}
              >
                Free Consultation — No Commitment
              </span>
            </div>

            <h2
              id="cta-heading"
              className="font-bold text-white mb-5"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2rem, 4.5vw, 3rem)",
                lineHeight: 1.15,
              }}
            >
              Ready to Get It{" "}
              <span className="gradient-text">Done?</span>
            </h2>

            <p
              className="text-base lg:text-lg mb-8 leading-relaxed"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              Whether you need individual tax preparation, bookkeeping, solar integration,
              or support with procurement and logistics, we are here. Fill out the form or reach
              out directly to start.
            </p>

            {/* Direct Contact info */}
            <div className="flex flex-col gap-4 mb-8">
              <a
                href={`tel:${getCleanPhone(config.contactPhone)}`}
                className="flex items-center gap-4 group text-white hover:text-[var(--cid-coral-light)] transition-colors duration-200"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--cid-coral)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-[var(--cid-gray-400)]">Call Us Anytime</p>
                  <p className="text-lg font-bold">{config.contactPhone}</p>
                </div>
              </a>

              <a
                href={`mailto:${getCleanEmail(config.contactEmail)}`}
                className="flex items-center gap-4 group text-white hover:text-[var(--cid-coral-light)] transition-colors duration-200"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--cid-coral)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-[var(--cid-gray-400)]">Email Support</p>
                  <p className="text-lg font-bold">{config.contactEmail}</p>
                </div>
              </a>
            </div>

            {/* Trust lines */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs pt-4 border-t border-white/10" style={{ color: "rgba(255,255,255,0.4)" }}>
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                SSL Secured Lead Form
              </span>
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Active across all 50 States
              </span>
            </div>
          </div>

          {/* Right Column - Sleek Lead Capture Form */}
          <div
            className="rounded-3xl p-6 md:p-8"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
            }}
          >
            {status === "success" ? (
              <div className="text-center py-12 px-4 animate-scale-in">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{
                    backgroundColor: "rgba(46, 158, 90, 0.15)",
                    border: "2px solid var(--cid-green)",
                  }}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--cid-green)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Message Sent Successfully!</h3>
                <p className="text-sm text-[var(--cid-gray-400)] max-w-sm mx-auto">
                  Thank you for reaching out. A client specialist will review your request
                  and contact you within the next 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-8 px-6 py-2 rounded-full text-xs font-semibold border text-white transition-all hover:bg-white/10"
                  style={{ borderColor: "rgba(255,255,255,0.2)" }}
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {errors.form && (
                  <div className="p-3.5 bg-rose-500/10 border border-rose-500/25 rounded-xl text-xs font-semibold text-rose-400">
                    {errors.form}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Get Your Free Consultation</h3>
                  <p className="text-xs text-[var(--cid-gray-400)]">
                    Let us know what you need. Our team will map out the ideal strategy.
                  </p>
                </div>

                {/* Name field */}
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-xs font-semibold text-white mb-1.5">
                    Full Name <span className="text-[var(--cid-coral)]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="px-4 py-2.5 rounded-xl text-sm bg-white/5 border text-white placeholder-white/30 focus:outline-none focus:border-[var(--cid-coral)] transition-colors"
                    style={{
                      border: errors.name ? "1px solid var(--cid-coral)" : "1px solid rgba(255,255,255,0.15)",
                    }}
                  />
                  {errors.name && (
                    <span className="text-[10px] text-[var(--cid-coral-light)] mt-1 font-medium">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Contact grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-xs font-semibold text-white mb-1.5">
                      Email Address <span className="text-[var(--cid-coral)]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="px-4 py-2.5 rounded-xl text-sm bg-white/5 border text-white placeholder-white/30 focus:outline-none focus:border-[var(--cid-coral)] transition-colors"
                      style={{
                        border: errors.email ? "1px solid var(--cid-coral)" : "1px solid rgba(255,255,255,0.15)",
                      }}
                    />
                    {errors.email && (
                      <span className="text-[10px] text-[var(--cid-coral-light)] mt-1 font-medium">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="phone" className="text-xs font-semibold text-white mb-1.5">
                      Phone Number <span className="text-[var(--cid-coral)]">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 000-0000"
                      className="px-4 py-2.5 rounded-xl text-sm bg-white/5 border text-white placeholder-white/30 focus:outline-none focus:border-[var(--cid-coral)] transition-colors"
                      style={{
                        border: errors.phone ? "1px solid var(--cid-coral)" : "1px solid rgba(255,255,255,0.15)",
                      }}
                    />
                    {errors.phone && (
                      <span className="text-[10px] text-[var(--cid-coral-light)] mt-1 font-medium">
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                {/* Services checklist */}
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-white mb-2">
                    Services Needed (Select all that apply)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableServices.map((service) => {
                      const isSelected = selectedServices.includes(service);
                      return (
                        <button
                          type="button"
                          key={service}
                          onClick={() => toggleService(service)}
                          className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                          style={{
                            backgroundColor: isSelected
                              ? "var(--cid-coral)"
                              : "rgba(255,255,255,0.05)",
                            color: "white",
                            border: isSelected
                              ? "1px solid var(--cid-coral)"
                              : "1px solid rgba(255,255,255,0.1)",
                          }}
                        >
                          {service}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message area */}
                <div className="flex flex-col">
                  <label htmlFor="message" className="text-xs font-semibold text-white mb-1.5">
                    How Can We Help You?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Provide a brief description of your requirements..."
                    className="px-4 py-2.5 rounded-xl text-sm bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[var(--cid-coral)] transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-glow mt-2 w-full py-3.5 rounded-full text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all"
                  style={{
                    backgroundColor: "var(--cid-coral)",
                    opacity: status === "submitting" ? 0.75 : 1,
                    cursor: status === "submitting" ? "not-allowed" : "pointer",
                  }}
                >
                  {status === "submitting" ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Submitting Request...
                    </>
                  ) : (
                    <>
                      Submit Consultation Request
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
