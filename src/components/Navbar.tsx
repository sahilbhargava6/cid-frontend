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
  const [isScrolled, setIsScrolled] = useState(false);

  const dashboardPath = user
    ? (user.email.includes("admin") || user.email.includes("owner")
      ? "/admin/dashboard"
      : "/dashboard")
    : "/login";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position

    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className="fixed top-2 lg:top-4 left-4 right-4 z-50 transition-all duration-500 max-w-7xl mx-auto"
    >
      <nav
        aria-label="Main navigation"
        className="w-full h-[60px] lg:h-[76px] px-6 lg:px-10 rounded-full border border-white/40 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-500"
      >
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes shimmer-logo-text {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          .shimmer-logo-text {
            background: linear-gradient(90deg, #ffffff 0%, #FDE2DC 25%, #EBF7FD 50%, #FDE2DC 75%, #ffffff 100%);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer-logo-text 5s linear infinite;
          }
          .shimmer-logo-text-dark {
            background: linear-gradient(90deg, #0e2d53 0%, #E85D3A 25%, #2d6fa3 50%, #E85D3A 75%, #0e2d53 100%);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer-logo-text 5s linear infinite;
          }
          @keyframes logo-halo-pulse {
            0% {
              filter: drop-shadow(0 0 4px rgba(253, 226, 220, 0.4)) drop-shadow(0 0 8px rgba(220, 239, 233, 0.3));
            }
            50% {
              filter: drop-shadow(0 0 10px rgba(253, 226, 220, 0.7)) drop-shadow(0 0 16px rgba(220, 239, 233, 0.5));
            }
            100% {
              filter: drop-shadow(0 0 4px rgba(253, 226, 220, 0.4)) drop-shadow(0 0 8px rgba(220, 239, 233, 0.3));
            }
          }
          .logo-aura-halo {
            animation: logo-halo-pulse 2.8s infinite ease-in-out;
          }
        `}} />

        {/* Logo */}
        <a
          href="#"
          aria-label="Consider It Done — Home"
          className="flex items-center gap-4 flex-shrink-0 group"
        >
          <div className="relative logo-aura-halo flex items-center justify-center">
            {/* Ambient pulsing glow behind logo */}
            <div className="absolute inset-0 filter blur-md opacity-50 rounded-full animate-pulse scale-90 transition-all duration-500 bg-gradient-to-tr from-[#E85D3A] to-[#2d6fa3]" />
            <Image
              src="/Consider_it_done_LOGO_4.webp"
              alt="Consider It Done logo"
              width={52}
              height={52}
              className="relative w-11 h-11 lg:w-13 lg:h-13 block"
              priority
            />
          </div>
          <div className="block">
            <span
              className="shimmer-logo-text-dark dark:shimmer-logo-text text-[16px] sm:text-lg lg:text-[22px] font-extrabold tracking-tight"
              style={{
                fontFamily: "var(--font-heading)",
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
              className="text-[15px] font-extrabold transition-all duration-300 hover:scale-105 tracking-wide text-[#0E2D53] dark:text-slate-200 hover:text-[#E85D3A] dark:hover:text-[#FF7A55]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center">
          <a
            href={dashboardPath}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-extrabold transition-all duration-300 shadow-sm bg-[#E85D3A] text-white hover:bg-[#C44A2A] hover:shadow-[0_4px_12px_rgba(232,93,58,0.25)]"
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
              className={`block h-0.5 transition-all duration-300 bg-[#0E2D53] dark:bg-white ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              className={`block h-0.5 transition-all duration-300 bg-[#0E2D53] dark:bg-white ${mobileOpen ? "opacity-0 scale-0" : ""}`}
            />
            <span
              className={`block h-0.5 transition-all duration-300 bg-[#0E2D53] dark:bg-white ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-x-4 top-[72px] z-40 transition-all duration-300 ${mobileOpen
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
          className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 shadow-2xl rounded-3xl p-6 transition-transform duration-300"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 hover:text-[#E85D3A]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-col gap-2">
            <a
              href={dashboardPath}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-full text-base font-bold w-full transition-all duration-200 bg-[#E85D3A] text-white hover:bg-[#C44A2A] text-center"
            >
              {user ? "Go to Dashboard" : "Sign in/Sign up"}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

