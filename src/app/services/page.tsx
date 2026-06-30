"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";

const Background3D = dynamic(() => import("@/components/Background3D"), {
  ssr: false,
});

export default function ServicesPage() {
  const auth = useAuth();
  const user = auth ? auth.user : null;
  const [scale, setScale] = useState(1);
  const [leftOffset, setLeftOffset] = useState(0);

  const dashboardPath = user
    ? (user.email.includes("admin") || user.email.includes("owner")
      ? "/admin/dashboard"
      : "/dashboard")
    : "/login";

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // Scale down proportionally if viewport is smaller than 1920px
      const scaleFactor = Math.min(width / 1920, 1);
      setScale(scaleFactor);
      setLeftOffset((width - 1920 * scaleFactor) / 2);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Background3D />
      <Navbar />
      <main 
        className="w-full bg-[#FFFFFF] overflow-x-hidden flex items-start justify-center pt-0"
        style={{
          paddingBottom: `${(1080 - 1080 * scale)}px` // Prevent clipping whitespace issues on scale
        }}
      >
        {/* 1920x1080 Pixel-Perfect Canvas Container */}
        <div 
          className="relative flex-shrink-0 select-none origin-top-left"
          style={{
            width: "1920px",
            height: "1080px",
            transform: `scale(${scale})`,
            left: `${leftOffset}px` // Center the scaled canvas
          }}
        >
          {/* Faded Background Element (cid ele 1) */}
          <div 
            className="absolute left-0 top-0 w-[1920px] h-[800px] bg-cover bg-bottom bg-no-repeat z-0"
            style={{
              backgroundImage: "url('/images/hero.webp')"
            }}
          >
            {/* Semi-transparent white overlay to match Figma fade */}
            <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px]" />
          </div>

        {/* Gradient Services Page Header */}
        <h1 
          className="absolute left-[166px] top-[160px] w-[315px] h-[170px] font-black text-[64px] leading-[77px] flex items-center select-none"
          style={{
            fontFamily: "Inter, sans-serif",
            background: "linear-gradient(90deg, #5C1A0F 0%, #0A1E35 36.06%, #0D2B1A 64.9%, #3D0A1E 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Services
        </h1>

        {/* --- SERVICE CARDS (absolute coords) --- */}

        {/* Card 1: Procurement (Elements -CID (9) 1) */}
        <Link href="/services/procurement" className="absolute left-[166px] top-[360px] w-[309px] h-[309px] rounded-[30px] overflow-hidden shadow-lg border border-slate-100/50 hover:scale-105 transition-transform duration-300 z-10 cursor-pointer bg-white">
          <img 
            src="/images/services/Procurement.webp" 
            alt="Procurement & Sourcing" 
            className="w-full h-full object-cover"
          />
        </Link>

        {/* Card 2: Small Business (Elements -CID (14) 1) */}
        <Link href="/services/accounts_and_logistics" className="absolute left-[486px] top-[365px] w-[309px] h-[309px] rounded-[30px] overflow-hidden shadow-lg border border-slate-100/50 hover:scale-105 transition-transform duration-300 z-10 cursor-pointer bg-white">
          <img 
            src="/images/services/business.webp" 
            alt="Small Business Management" 
            className="w-full h-full object-cover"
          />
        </Link>

        {/* Card 3: Tax (Elements -CID (13) 1) */}
        <Link href="/services/tax_prep" className="absolute left-[807px] top-[365px] w-[309px] h-[309px] rounded-[30px] overflow-hidden shadow-lg border border-slate-100/50 hover:scale-105 transition-transform duration-300 z-10 cursor-pointer bg-white">
          <img 
            src="/images/services/tax.webp" 
            alt="Tax Preparation" 
            className="w-full h-full object-cover"
          />
        </Link>

        {/* Card 4: Solar (Elements -CID (12) 1) */}
        <Link href="/services/solar" className="absolute left-[1127px] top-[365px] w-[310px] h-[309px] rounded-[30px] overflow-hidden shadow-lg border border-slate-100/50 hover:scale-105 transition-transform duration-300 z-10 cursor-pointer bg-white">
          <img 
            src="/images/services/solar.webp" 
            alt="Solar Solutions" 
            className="w-full h-full object-cover"
          />
        </Link>

        {/* Card 5: Virtual Bookkeeping (Elements -CID (11) 1) */}
        <Link href="/services/virtual_bookkeeping" className="absolute left-[1444px] top-[365px] w-[309px] h-[309px] rounded-[30px] overflow-hidden shadow-lg border border-slate-100/50 hover:scale-105 transition-transform duration-300 z-10 cursor-pointer bg-white">
          <img 
            src="/images/services/bookkeeping.webp" 
            alt="Virtual Bookkeeping" 
            className="w-full h-full object-cover"
          />
        </Link>


        {/* --- PILL BUTTON BACKINGS (absolute coords) --- */}

        {/* Pill 1 Background (Rectangle 6) */}
        <div 
          className="absolute left-[166px] top-[711px] w-[300px] h-[157px] rounded-[30px] z-10"
          style={{ backgroundColor: "rgba(63, 166, 114, 0.2)" }}
        />

        {/* Pill 2 Background (Rectangle 7) */}
        <div 
          className="absolute left-[490px] top-[711px] w-[301px] h-[157px] rounded-[30px] z-10"
          style={{ backgroundColor: "rgba(232, 80, 58, 0.2)" }}
        />

        {/* Pill 3 Background (Rectangle 8) */}
        <div 
          className="absolute left-[811px] top-[711px] w-[300px] h-[157px] rounded-[30px] z-10"
          style={{ backgroundColor: "rgba(45, 111, 163, 0.2)" }}
        />

        {/* Pill 4 Background (Rectangle 9) */}
        <div 
          className="absolute left-[1132px] top-[711px] w-[300px] h-[157px] rounded-[30px] z-10"
          style={{ backgroundColor: "rgba(232, 114, 140, 0.2)" }}
        />

        {/* Pill 5 Background (Rectangle 10) */}
        <div 
          className="absolute left-[1453px] top-[711px] w-[300px] h-[157px] rounded-[30px] z-10"
          style={{ backgroundColor: "rgba(63, 166, 114, 0.2)" }}
        />


        {/* --- PILL TEXT LABELS (absolute coords) --- */}

        {/* Text 1: Procurement */}
        <div 
          className="absolute left-[222px] top-[732px] w-[189px] h-[111px] font-semibold text-[24px] leading-[29px] flex items-center justify-center text-center z-15"
          style={{ fontFamily: "Inter, sans-serif", color: "#0D2B1A" }}
        >
          Procurement & Sourcing Services
        </div>

        {/* Text 2: Small Business */}
        <div 
          className="absolute left-[531px] top-[732px] w-[218px] h-[111px] font-semibold text-[24px] leading-[29px] flex items-center justify-center text-center z-15"
          style={{ fontFamily: "Inter, sans-serif", color: "#5C1A0F" }}
        >
          Small Business Management Solutions
        </div>

        {/* Text 3: Tax */}
        <div 
          className="absolute left-[851px] top-[751px] w-[220px] h-[74px] font-semibold text-[24px] leading-[29px] flex items-center justify-center text-center z-15"
          style={{ fontFamily: "Inter, sans-serif", color: "#0A1E35" }}
        >
          Tax Preparation & Resolution
        </div>

        {/* Text 4: Solar */}
        <div 
          className="absolute left-[1191px] top-[751px] w-[184px] h-[74px] font-semibold text-[24px] leading-[29px] flex items-center justify-center text-center z-15"
          style={{ fontFamily: "Inter, sans-serif", color: "#3D0A1E" }}
        >
          Solar Energy Solutions
        </div>

        {/* Text 5: Virtual Bookkeeping */}
        <div 
          className="absolute left-[1516px] top-[747px] w-[183px] h-[74px] font-semibold text-[24px] leading-[29px] flex items-center justify-center text-center z-15"
          style={{ fontFamily: "Inter, sans-serif", color: "#0D2B1A" }}
        >
          Virtual Bookkeeping
        </div>

      </div>
    </main>
    <Footer />
  </>
);
}
