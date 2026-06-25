"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why Us", href: "#why-us" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const auth = useAuth();
  const user = auth ? auth.user : null;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const dashboardPath = user
    ? (user.email.includes("admin") || user.email.includes("owner")
      ? "/admin/dashboard"
      : "/dashboard")
    : "/login";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-[0_1px_20px_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between"
      >
        {/* Logo */}
        <a
          href="#"
          aria-label="Consider It Done — Home"
          className="flex items-center gap-3 flex-shrink-0"
        >
          <Image
            src="/Consider_it_done_LOGO_4.png"
            alt="Consider It Done logo"
            width={44}
            height={44}
            className="rounded-lg"
            priority
          />
          <div className="hidden sm:block">
            <span
              className="text-lg font-bold tracking-tight"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--cid-dark)",
              }}
            >
              Consider It{" "}
              <span style={{ color: "var(--cid-coral)" }}>Done</span>
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors duration-200 hover:text-[var(--cid-coral)]"
              style={{ color: "var(--cid-gray-700)" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+18881234567"
            className="text-sm font-medium transition-colors duration-200 hover:text-[var(--cid-coral)]"
            style={{ color: "var(--cid-gray-700)" }}
          >
            (888) 123-4567
          </a>
          <a
            href={dashboardPath}
            className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-900"
            style={{
              borderColor: "var(--cid-gray-300)",
              color: "var(--cid-dark)",
            }}
          >
            {user ? "Go to Dashboard" : "Client Login"}
          </a>
          <a
            href="#contact"
            className="btn-glow inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white"
            style={{
              backgroundColor: "var(--cid-coral)",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Free Consultation
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-[var(--cid-gray-100)] transition-colors"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span
              className={`block h-0.5 bg-[var(--cid-dark)] transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block h-0.5 bg-[var(--cid-dark)] transition-all duration-300 ${
                mobileOpen ? "opacity-0 scale-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 bg-[var(--cid-dark)] transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-0 top-[72px] z-40 transition-all duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Menu panel */}
        <div
          className={`relative bg-white shadow-2xl rounded-b-3xl mx-2 p-6 transition-transform duration-300 ${
            mobileOpen ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200 hover:bg-[var(--cid-gray-100)] hover:text-[var(--cid-coral)]"
                style={{ color: "var(--cid-gray-700)" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-[var(--cid-gray-200)] flex flex-col gap-2">
            <a
              href="tel:+18881234567"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium"
              style={{ color: "var(--cid-gray-500)" }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              (888) 123-4567
            </a>
            <a
              href={dashboardPath}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-full text-base font-semibold border w-full transition-all duration-200"
              style={{
                borderColor: "var(--cid-gray-300)",
                color: "var(--cid-dark)",
              }}
            >
              {user ? "Go to Dashboard" : "Client Login"}
            </a>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="btn-glow flex items-center justify-center gap-2 px-5 py-3 rounded-full text-base font-semibold text-white w-full"
              style={{ backgroundColor: "var(--cid-coral)" }}
            >
              Free Consultation
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
