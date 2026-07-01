"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getServices } from "@/data/servicesData";
import { getSiteConfig } from "@/data/siteConfigData";

const serviceLinks = getServices().map((s) => ({
  label: s.title,
  href: `/services/${s.key}`,
}));

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact-us" },
];

export default function Footer() {
  const [config, setConfig] = useState(() => getSiteConfig());

  useEffect(() => {
    setConfig(getSiteConfig());
  }, []);

  return (
    <footer
      className="relative overflow-hidden border-t border-[#E2ECF2] w-full"
      style={{ backgroundColor: "#FAFAF8" }}
    >
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/Consider_it_done_LOGO_4.webp"
                alt="consider-itdone logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span
                className="text-lg font-bold tracking-tight"
                style={{ fontFamily: "Inter, sans-serif", color: "#1b5e92" }}
              >
                {config.brandName}
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-6 font-semibold"
              style={{ color: "#7A8F9E" }}
            >
              Premium US-based business services. Tax preparation, virtual
              bookkeeping, home solar, small business management, and global
              procurement — all under one roof.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 border border-[#E2ECF2]"
                style={{
                  backgroundColor: "rgba(255,255,255,0.8)",
                  color: "#1b5e92",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 border border-[#E2ECF2]"
                style={{
                  backgroundColor: "rgba(255,255,255,0.8)",
                  color: "#1b5e92",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 border border-[#E2ECF2]"
                style={{
                  backgroundColor: "rgba(255,255,255,0.8)",
                  color: "#1b5e92",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>

              {/* X/Twitter */}
              <a
                href="#"
                aria-label="X (Twitter)"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 border border-[#E2ECF2]"
                style={{
                  backgroundColor: "rgba(255,255,255,0.8)",
                  color: "#1b5e92",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services column */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-wider mb-5"
              style={{ fontFamily: "Inter, sans-serif", color: "#591B1B" }}
            >
              Services
            </h4>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-semibold transition-colors duration-200 hover:text-[#E8503A]"
                    style={{ color: "#7A8F9E" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-wider mb-5"
              style={{ fontFamily: "Inter, sans-serif", color: "#591B1B" }}
            >
              Company
            </h4>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-semibold transition-colors duration-200 hover:text-[#E8503A]"
                    style={{ color: "#7A8F9E" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4
              className="text-sm font-bold uppercase tracking-wider mb-5"
              style={{ fontFamily: "Inter, sans-serif", color: "#591B1B" }}
            >
              Contact
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href={`tel:${config.contactPhone}`}
                className="flex items-center gap-3 text-sm font-semibold transition-colors duration-200 hover:text-[#E8503A]"
                style={{ color: "#7A8F9E" }}
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
                {config.contactPhone}
              </a>
              <a
                href={`mailto:${config.contactEmail}`}
                className="flex items-center gap-3 text-sm font-semibold transition-colors duration-200 hover:text-[#E8503A]"
                style={{ color: "#7A8F9E" }}
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
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                {config.contactEmail}
              </a>
              <div
                className="flex items-start gap-3 text-sm font-semibold"
                style={{ color: "#7A8F9E" }}
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
                  className="mt-0.5 flex-shrink-0"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>
                  {config.contactAddress}
                  <br />
                  <span className="text-[11px]" style={{ color: "#E8503A" }}>
                    100% Virtual Services Available
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t border-[#E2ECF2]"
        style={{ backgroundColor: "#F2F5F8" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-semibold" style={{ color: "#7A8F9E" }}>
            © {new Date().getFullYear()} {config.brandName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-xs font-semibold transition-colors duration-200 hover:text-[#E8503A]"
              style={{ color: "#7A8F9E" }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs font-semibold transition-colors duration-200 hover:text-[#E8503A]"
              style={{ color: "#7A8F9E" }}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
