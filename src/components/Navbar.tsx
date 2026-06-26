"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#why-us" },
  { label: "Contact us", href: "#contact" },
];

export default function Navbar() {
  const auth = useAuth();
  const user = auth ? auth.user : null;
  const [mobileOpen, setMobileOpen] = useState(false);

  const dashboardPath = user
    ? (user.email.includes("admin") || user.email.includes("owner")
      ? "/admin/dashboard"
      : "/dashboard")
    : "/login";

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
      className="absolute lg:fixed top-2 lg:top-4 left-4 right-4 z-50 transition-all duration-300 max-w-7xl mx-auto"
    >
      <nav
        aria-label="Main navigation"
        className="w-full h-[60px] lg:h-[80px] px-6 lg:px-10 rounded-full border border-white/40 bg-white/40 dark:bg-black/10 backdrop-blur-md flex items-center justify-between shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
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
            width={40}
            height={40}
            className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg"
            priority
          />
          <div className="block">
            <span
              className="text-[14px] sm:text-base lg:text-[20px] font-bold tracking-tight"
              style={{
                fontFamily: "var(--font-heading)",
                color: "#ffffff",
              }}
            >
              Consider it Done
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-bold transition-colors duration-200 hover:text-[#E06D53] tracking-wide"
              style={{ color: "#ffffff" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center">
          <a
            href={dashboardPath}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-bold text-[#ffffff] hover:text-[#E06D53] transition-all duration-200"
          >
            {user ? "Go to Dashboard" : "Sign in/Sign up"}
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span
              className={`block h-0.5 bg-[#ffffff] transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
            />
            <span
              className={`block h-0.5 bg-[#ffffff] transition-all duration-300 ${mobileOpen ? "opacity-0 scale-0" : ""
                }`}
            />
            <span
              className={`block h-0.5 bg-[#ffffff] transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-x-4 top-[76px] z-40 transition-all duration-300 ${mobileOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={() => setMobileOpen(false)}
        />

        {/* Menu panel */}
        <div
          className={`relative bg-white/80 dark:bg-black/80 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl p-6 transition-transform duration-300 ${mobileOpen ? "translate-y-0" : "-translate-y-4"
            }`}
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200 hover:bg-black/5 hover:text-[#E06D53]"
                style={{ color: "#ffffff" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200/50 flex flex-col gap-2">
            <a
              href={dashboardPath}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-full text-base font-semibold border border-[#ffffff]/30 w-full transition-all duration-200"
              style={{
                color: "#ffffff",
              }}
            >
              {user ? "Go to Dashboard" : "Sign in/Sign up"}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
