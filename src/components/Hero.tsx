"use client";

import { useState } from "react";
import Image from "next/image";

interface ServiceHoverDetail {
  title: string;
  bullets: string[];
}

const serviceDetails: Record<string, ServiceHoverDetail> = {
  procurement: {
    title: "Procurement & Sourcing Services",
    bullets: ["Global item sourcing", "Automobiles & real estate", "Supplier negotiations", "Import logistics management"],
  },
  business: {
    title: "Small Business Management Solutions",
    bullets: ["Unified accounts", "Front desk optimization", "Logistics coordination", "Cross-selling support"],
  },
  tax: {
    title: "Tax Preparation & Resolution",
    bullets: ["Tax filing", "Tax optimization", "Tax issue resolution", "Compliance support"],
  },
  solar: {
    title: "Solar Energy Solutions",
    bullets: ["Clean electricity", "Lower utility bills", "Custom roof designs", "No gimmicks guarantee"],
  },
  bookkeeping: {
    title: "Virtual Bookkeeping",
    bullets: ["Daily transaction tracking", "Bank accounts reconciliation", "Monthly financial statements", "Year-end tax readiness"],
  },
};

const cardPositions: Record<string, string> = {
  solar: "top-[18%] left-[43%]",
  business: "top-[45%] left-[23%]",
  tax: "top-[50%] left-[43%]",
  bookkeeping: "top-[25%] left-[45%]",
  procurement: "top-[45%] left-[50%]",
};

export default function Hero() {
  const [activeHover, setActiveHover] = useState<string | null>(null);

  const activeDetail = activeHover ? serviceDetails[activeHover] : null;

  return (
    <section
      aria-labelledby="hero-heading"
      className="w-full overflow-hidden bg-slate-200 pt-[76px] lg:pt-0"
      onClick={() => setActiveHover(null)}
    >
      <div className="relative w-full aspect-[16/9] select-none">
        {/* Main Background Image - Fits exactly to 16:9 container */}
        <img
          src="/images/hero.webp"
          alt="Consider It Done Premium Services Layout"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none"
        />

        {/* Interactive Overlays & Hover Zones (With glass bubbles removed) */}

        {/* 1. Solar (Roof) - 2.png */}
        <div
          onMouseEnter={() => setActiveHover("solar")}
          onMouseLeave={() => setActiveHover(null)}
          onClick={(e) => {
            e.stopPropagation();
            setActiveHover(activeHover === "solar" ? null : "solar");
          }}
          className="absolute top-[18%] left-[25%] w-[16%] h-[24%] cursor-pointer group z-10"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Glowing Aura Halo */}
            <div 
              className={`absolute inset-0 rounded-full transition-all duration-500 pointer-events-none opacity-0 blur-xl ${
                activeHover === "solar" ? "opacity-100 scale-[1.3] animate-pulse" : ""
              }`}
              style={{
                background: "radial-gradient(circle, rgba(46,158,90,0.45) 0%, rgba(46,158,90,0) 70%)"
              }}
            />
            <Image
              src="/images/services/2.webp"
              alt="Solar Installer"
              fill
              priority
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              sizes="250px"
            />
          </div>
        </div>

        {/* 2. Business Management (Bottom Left) - 1.png */}
        <div
          onMouseEnter={() => setActiveHover("business")}
          onMouseLeave={() => setActiveHover(null)}
          onClick={(e) => {
            e.stopPropagation();
            setActiveHover(activeHover === "business" ? null : "business");
          }}
          className="absolute top-[70%] left-[10%] w-[12%] h-[32%] cursor-pointer group z-10"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Glowing Aura Halo */}
            <div 
              className={`absolute inset-0 rounded-full transition-all duration-500 pointer-events-none opacity-0 blur-xl ${
                activeHover === "business" ? "opacity-100 scale-[1.3] animate-pulse" : ""
              }`}
              style={{
                background: "radial-gradient(circle, rgba(27,94,146,0.45) 0%, rgba(27,94,146,0) 70%)"
              }}
            />
            <Image
              src="/images/services/1.webp"
              alt="Business Manager"
              fill
              priority
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              sizes="200px"
            />
          </div>
        </div>

        {/* 3. Tax Preparation (Bottom Center-Left) - 3.png */}
        <div
          onMouseEnter={() => setActiveHover("tax")}
          onMouseLeave={() => setActiveHover(null)}
          onClick={(e) => {
            e.stopPropagation();
            setActiveHover(activeHover === "tax" ? null : "tax");
          }}
          className="absolute top-[75%] left-[28%] w-[14%] h-[22%] cursor-pointer group z-10"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Glowing Aura Halo */}
            <div 
              className={`absolute inset-0 rounded-full transition-all duration-500 pointer-events-none opacity-0 blur-xl ${
                activeHover === "tax" ? "opacity-100 scale-[1.3] animate-pulse" : ""
              }`}
              style={{
                background: "radial-gradient(circle, rgba(232,93,58,0.45) 0%, rgba(232,93,58,0) 70%)"
              }}
            />
            <Image
              src="/images/services/3.webp"
              alt="Tax Specialist"
              fill
              priority
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              sizes="220px"
            />
          </div>
        </div>

        {/* 4. Bookkeeping (Right Balcony) - 5.png */}
        <div
          onMouseEnter={() => setActiveHover("bookkeeping")}
          onMouseLeave={() => setActiveHover(null)}
          onClick={(e) => {
            e.stopPropagation();
            setActiveHover(activeHover === "bookkeeping" ? null : "bookkeeping");
          }}
          className="absolute top-[33.5%] left-[73%] w-[14%] h-[39%] cursor-pointer group z-10"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Glowing Aura Halo */}
            <div 
              className={`absolute inset-0 rounded-full transition-all duration-500 pointer-events-none opacity-0 blur-xl ${
                activeHover === "bookkeeping" ? "opacity-100 scale-[1.3] animate-pulse" : ""
              }`}
              style={{
                background: "radial-gradient(circle, rgba(46,158,90,0.45) 0%, rgba(46,158,90,0) 70%)"
              }}
            />
            <img
              src="/images/services/5.webp"
              alt="Virtual Bookkeeper"
              loading="eager"
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 relative z-10"
            />
          </div>
        </div>



        {/* 6. Procurement (Bottom Right) - 6.png */}
        <div
          onMouseEnter={() => setActiveHover("procurement")}
          onMouseLeave={() => setActiveHover(null)}
          onClick={(e) => {
            e.stopPropagation();
            setActiveHover(activeHover === "procurement" ? null : "procurement");
          }}
          className="absolute top-[70%] left-[75%] w-[30%] h-[40%] cursor-pointer group z-10"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Glowing Aura Halo */}
            <div 
              className={`absolute inset-0 rounded-full transition-all duration-500 pointer-events-none opacity-0 blur-xl ${
                activeHover === "procurement" ? "opacity-100 scale-[1.3] animate-pulse" : ""
              }`}
              style={{
                background: "radial-gradient(circle, rgba(232,93,58,0.45) 0%, rgba(232,93,58,0) 70%)"
              }}
            />
            <Image
              src="/images/services/6.webp"
              alt="Procurement Partners"
              fill
              priority
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              sizes="300px"
            />
          </div>
        </div>

        {/* Premium Floating Glassmorphic Details Card - Shows as pop-up on hover */}
        {activeDetail && activeHover && (
          <div className={`absolute ${cardPositions[activeHover] || "top-[25%] left-[48%]"} max-md:left-1/2 max-md:-translate-x-1/2 max-md:top-[6%] max-md:w-[90%] max-md:max-w-[280px] w-[330px] rounded-[24px] bg-white/20 dark:bg-black/30 border border-white/20 dark:border-white/10 backdrop-blur-md p-4 md:p-6 flex flex-col text-white shadow-2xl transition-all duration-300 z-20 pointer-events-none`}>
            <h3 
              className="text-sm md:text-xl font-bold tracking-tight mb-2 md:mb-3 leading-tight"
              style={{ color: "#ffffff" }}
            >
              {activeDetail.title}
            </h3>

            {/* Divider line as seen in screenshot */}
            <hr className="border-white/30 mb-3 md:mb-5" />

            <ul className="space-y-2 md:space-y-3.5 text-[10px] md:text-xs sm:text-sm font-semibold text-white/95">
              {activeDetail.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-1.5 md:gap-2">
                  <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-white mt-1.5 flex-shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Bottom indicator stripe - smaller on mobile/tablet to prevent covering characters */}
        <div className="absolute bottom-2 md:bottom-6 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm px-3 md:px-6 py-1 md:py-2 rounded-full border border-white/10 z-10">
          <p className="text-[8px] md:text-xs font-semibold text-white/95 uppercase tracking-widest text-center whitespace-nowrap">
            💡 Hover or tap the 6 team characters to explore core services
          </p>
        </div>
      </div>
    </section>
  );
}
