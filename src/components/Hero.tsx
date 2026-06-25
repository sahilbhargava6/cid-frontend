"use client";

import Image from "next/image";

const trustBadges = [
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
    ),
    text: "Guaranteed Accuracy",
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    ),
    text: "US-Based Experts",
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    ),
    text: "No Hidden Fees",
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
    ),
    text: "No Gimmicks",
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
    text: "Trusted by 500+ Businesses",
  },
];

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-[72px]"
      style={{
        background:
          "linear-gradient(180deg, #FFF3EE 0%, #FFF8F5 30%, #FAFAF8 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-20 -right-20 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "var(--cid-coral)" }}
      />
      <div
        className="absolute bottom-0 -left-20 w-[300px] h-[300px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "var(--cid-blue)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Mobile layout */}
        <div className="md:hidden py-8 flex flex-col gap-6">
          <div className="text-center">
            {/* Trust badge */}
            <div
              className="animate-fade-in-down inline-flex items-center gap-2 rounded-full border px-3 py-1.5 mb-5"
              style={{
                borderColor: "rgba(232, 93, 58, 0.25)",
                backgroundColor: "rgba(232, 93, 58, 0.06)",
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
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <span
                className="text-xs font-semibold"
                style={{ color: "var(--cid-coral)" }}
              >
                Serving All 50 US States
              </span>
            </div>

            <h1
              id="hero-heading"
              className="animate-fade-in-up font-bold leading-[1.1] mb-4"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2rem, 7vw, 3.5rem)",
                color: "var(--cid-dark)",
              }}
            >
              Your Business.{" "}
              <span className="gradient-text">Handled.</span>
            </h1>

            <p
              className="animate-fade-in-up delay-200 text-base leading-relaxed max-w-md mx-auto"
              style={{ color: "var(--cid-gray-500)" }}
            >
              Tax prep, bookkeeping, solar, logistics & procurement — all
              under one roof, done right.
            </p>
          </div>

          {/* Hero image - mobile */}
          <div className="animate-scale-in delay-300 relative w-full max-w-[360px] mx-auto">
            <div
              className="relative rounded-3xl overflow-hidden aspect-[4/3] w-full"
              style={{ background: "#F0E5DD" }}
            >
              <Image
                alt="Consider It Done — Professional Business Services"
                src="/hero-bg.png"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 90vw, 45vw"
                priority
              />
            </div>

            {/* Floating card - stat */}
            <div className="animate-float absolute -bottom-3 -left-2 bg-white rounded-xl shadow-lg p-3 flex items-center gap-3 min-w-[160px]">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "rgba(232, 93, 58, 0.1)" }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--cid-coral)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold" style={{ color: "var(--cid-dark)" }}>
                  500+ Clients
                </p>
                <p className="text-xs" style={{ color: "var(--cid-gray-500)" }}>
                  Across the US
                </p>
              </div>
            </div>

            {/* Floating card - rating */}
            <div className="animate-float-slow absolute -top-2 -right-2 bg-white rounded-full shadow-lg px-3 py-1.5 flex items-center gap-1.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="var(--cid-coral)"
                stroke="var(--cid-coral)"
                strokeWidth="2"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="text-sm font-bold" style={{ color: "var(--cid-dark)" }}>
                4.9 Rated
              </span>
            </div>
          </div>

          {/* Marquee badges - mobile */}
          <div className="marquee-container -mx-4 mt-2">
            <div className="marquee-track">
              {[...trustBadges, ...trustBadges].map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full shrink-0 font-medium text-[13px] text-white"
                  style={{ backgroundColor: "var(--cid-blue)" }}
                >
                  {badge.icon}
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA buttons - mobile */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mt-2">
            <a
              href="#contact"
              className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold text-white w-full sm:w-auto justify-center"
              style={{
                backgroundColor: "var(--cid-coral)",
                boxShadow: "0 4px 20px rgba(232, 93, 58, 0.35)",
              }}
            >
              Schedule Free Consultation
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold border-2 w-full sm:w-auto justify-center transition-all duration-200 hover:bg-[var(--cid-dark)] hover:text-white hover:border-[var(--cid-dark)]"
              style={{
                borderColor: "var(--cid-dark)",
                color: "var(--cid-dark)",
              }}
            >
              Explore Services
            </a>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:grid md:grid-cols-[55fr_45fr] gap-12 items-center py-24 lg:py-28">
          {/* Left content */}
          <div>
            <div
              className="animate-fade-in-down inline-flex items-center gap-2 rounded-full border px-4 py-1.5 mb-6"
              style={{
                borderColor: "rgba(232, 93, 58, 0.25)",
                backgroundColor: "rgba(232, 93, 58, 0.06)",
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
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <span
                className="text-xs font-semibold"
                style={{ color: "var(--cid-coral)" }}
              >
                Serving All 50 US States
              </span>
            </div>

            <h1
              className="animate-fade-in-up font-bold leading-[1.08] mb-6"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "var(--cid-dark)",
              }}
            >
              Your Business.
              <br />
              <span className="gradient-text">Handled.</span>
            </h1>

            <p
              className="animate-fade-in-up delay-200 text-lg leading-relaxed max-w-lg mb-6"
              style={{ color: "var(--cid-gray-500)" }}
            >
              Tax preparation, virtual bookkeeping, home solar, small business
              logistics & global procurement — all under one roof. Expert
              service. Zero stress.
            </p>

            {/* Trust pills - desktop */}
            <div className="animate-fade-in-up delay-300 flex flex-wrap gap-2 mb-8">
              {trustBadges.slice(0, 4).map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full font-medium text-[13px] text-white"
                  style={{ backgroundColor: "var(--cid-blue)" }}
                >
                  {badge.icon}
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons - desktop */}
            <div className="animate-fade-in-up delay-400 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold text-white"
                style={{
                  backgroundColor: "var(--cid-coral)",
                  boxShadow: "0 4px 20px rgba(232, 93, 58, 0.35)",
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
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Schedule Free Consultation
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold border-2 transition-all duration-200 hover:bg-[var(--cid-dark)] hover:text-white hover:border-[var(--cid-dark)]"
                style={{
                  borderColor: "var(--cid-dark)",
                  color: "var(--cid-dark)",
                }}
              >
                Explore Services
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
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right - hero image */}
          <div className="flex justify-end">
            <div className="animate-scale-in delay-200 relative w-full max-w-[500px]">
              <div
                className="relative rounded-3xl overflow-hidden aspect-[4/5] w-full"
                style={{ background: "#F0E5DD" }}
              >
                <Image
                  alt="Consider It Done — Professional Business Services"
                  src="/hero-bg.png"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 90vw, 45vw"
                  priority
                />
              </div>

              {/* Floating stat card */}
              <div className="animate-float absolute bottom-8 -left-8 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3 min-w-[190px]">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(232, 93, 58, 0.1)" }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--cid-coral)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: "var(--cid-dark)" }}>
                    500+ Clients Served
                  </p>
                  <p className="text-xs" style={{ color: "var(--cid-gray-500)" }}>
                    Across all 50 states
                  </p>
                  <div className="mt-2 h-1 w-full rounded-full overflow-hidden bg-[var(--cid-gray-100)]">
                    <div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: "var(--cid-coral)",
                        width: "75%",
                        animation: "progressBar 2s ease-out 0.5s forwards",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Floating rating badge */}
              <div className="animate-float-slow absolute top-6 -right-4 bg-white rounded-full shadow-lg px-4 py-2 flex items-center gap-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="var(--cid-coral)"
                  stroke="var(--cid-coral)"
                  strokeWidth="2"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span className="text-base font-bold" style={{ color: "var(--cid-dark)" }}>
                  4.9 Rated
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
