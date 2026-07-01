"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getSiteConfig } from "@/data/siteConfigData";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact us", href: "/contact-us" },
];

export default function Navbar() {
  const auth = useAuth();
  const user = auth ? auth.user : null;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [config, setConfig] = useState(() => getSiteConfig());

  useEffect(() => {
    setConfig(getSiteConfig());
  }, []);

  const dashboardPath = user
    ? (user.email.includes("admin") || user.email.includes("owner")
      ? "/admin/dashboard"
      : "/dashboard")
    : "/login";

  return (
    <header className="fixed top-4 left-0 right-0 z-50 w-full px-4 flex justify-center select-none">
      {/* Capsule Navbar Box */}
      <nav
        className="w-full max-w-[1488px] h-[86px] rounded-[30px] flex items-center justify-between px-6 lg:px-12 shadow-lg border border-white/10 relative transition-all duration-300"
        style={{
          backgroundColor: "rgba(10, 30, 53, 0.55)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* Logo and Brand Title */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer hover:opacity-90">
          <Image 
            src="/Consider_it_done_LOGO_4.webp" 
            alt="Logo" 
            width={62} 
            height={62} 
            className="w-[52px] h-[52px] lg:w-[62px] lg:h-[62px] object-contain hover:scale-105 transition-transform duration-200"
            priority
          />
          <span 
            className="hidden sm:inline font-semibold text-[22px] lg:text-[32px] tracking-tight"
            style={{
              fontFamily: "Inter, sans-serif",
              color: "#DDF0F7"
            }}
          >
            {config.brandName}
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-semibold text-[18px] lg:text-[22px] hover:text-white transition-colors duration-200"
              style={{
                fontFamily: "Inter, sans-serif",
                color: "#DDF0F7"
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA Sign In/Up Button */}
        <div className="hidden md:flex items-center">
          <Link
            href={dashboardPath}
            className="px-6 py-2.5 rounded-full font-semibold text-[18px] lg:text-[22px] transition-all duration-300 bg-white/10 hover:bg-white/20 text-[#DDF0F7] hover:text-white border border-white/10 hover:border-white/20"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {user ? "Dashboard" : "Sign in/up"}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`block h-0.5 w-full bg-[#DDF0F7] transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[9px]" : ""}`} />
            <span className={`block h-0.5 w-full bg-[#DDF0F7] transition-all duration-300 ${mobileOpen ? "opacity-0 scale-0" : ""}`} />
            <span className={`block h-0.5 w-full bg-[#DDF0F7] transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[9px]" : ""}`} />
          </div>
        </button>

        {/* Mobile menu drawer */}
        {mobileOpen && (
          <div 
            className="absolute top-[96px] left-0 right-0 rounded-2xl p-6 border border-white/10 shadow-2xl flex flex-col gap-4 z-50 md:hidden"
            style={{
              backgroundColor: "rgba(10, 30, 53, 0.95)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-semibold text-lg hover:text-white py-2 border-b border-white/5"
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: "#DDF0F7"
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={dashboardPath}
              onClick={() => setMobileOpen(false)}
              className="mt-2 py-3 rounded-xl font-semibold text-center text-white bg-white/10 hover:bg-white/20 border border-white/10"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {user ? "Dashboard" : "Sign in/up"}
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
