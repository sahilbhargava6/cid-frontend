"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

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
    <div 
      className="w-full min-h-screen bg-[#FFFFFF] overflow-x-hidden flex items-start justify-center"
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

        {/* Custom Navbar Container (Rectangle 4) */}
        <div 
          className="absolute left-[216px] top-[28px] w-[1488px] h-[86px] rounded-[30px] z-20 flex items-center shadow-md border border-white/10"
          style={{
            backgroundColor: "rgba(10, 30, 53, 0.5)",
            backdropFilter: "blur(10px)"
          }}
        >
          {/* Logo image (image 3) */}
          <Link href="/" className="absolute left-[43px] top-[12px] w-[62px] h-[62px] cursor-pointer hover:scale-105 transition-transform duration-200">
            <Image 
              src="/Consider_it_done_LOGO_4.webp" 
              alt="Logo" 
              width={62} 
              height={62} 
              className="object-contain"
              priority
            />
          </Link>

          {/* Consider it Done text */}
          <Link href="/" className="absolute left-[123px] top-[16px] cursor-pointer hover:opacity-90">
            <span 
              className="font-semibold text-[36px] leading-[44px] tracking-tight"
              style={{
                fontFamily: "Inter, sans-serif",
                color: "#DDF0F7"
              }}
            >
              Consider it Done
            </span>
          </Link>

          {/* Nav Links */}
          <Link href="/">
            <span 
              className="absolute left-[474px] top-[19px] w-[103px] h-[52px] font-semibold text-[24px] leading-[29px] flex items-center justify-center cursor-pointer hover:text-white transition-colors"
              style={{ fontFamily: "Inter, sans-serif", color: "#DDF0F7" }}
            >
              Home
            </span>
          </Link>

          <Link href="/services">
            <span 
              className="absolute left-[618px] top-[19px] w-[103px] h-[52px] font-semibold text-[24px] leading-[29px] flex items-center justify-center cursor-pointer text-white underline decoration-2 underline-offset-4"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Services
            </span>
          </Link>

          <Link href="/#why-us">
            <span 
              className="absolute left-[778px] top-[19px] w-[103px] h-[52px] font-semibold text-[24px] leading-[29px] flex items-center justify-center cursor-pointer hover:text-white transition-colors"
              style={{ fontFamily: "Inter, sans-serif", color: "#DDF0F7" }}
            >
              About
            </span>
          </Link>

          <Link href="/#contact">
            <span 
              className="absolute left-[917px] top-[19px] w-[128px] h-[52px] font-semibold text-[24px] leading-[29px] flex items-center justify-center cursor-pointer hover:text-white transition-colors"
              style={{ fontFamily: "Inter, sans-serif", color: "#DDF0F7" }}
            >
              Contact us
            </span>
          </Link>

          {/* Sign in/Sign up Button */}
          <Link href={dashboardPath}>
            <span 
              className="absolute left-[1258px] top-[17px] w-[182px] h-[52px] font-semibold text-[24px] leading-[29px] flex items-center justify-center cursor-pointer hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300"
              style={{ fontFamily: "Inter, sans-serif", color: "#DDF0F7" }}
            >
              {user ? "Dashboard" : "Sign in/up"}
            </span>
          </Link>
        </div>

        {/* Gradient Services Page Header */}
        <h1 
          className="absolute left-[166px] top-[230px] w-[315px] h-[170px] font-black text-[64px] leading-[77px] flex items-center select-none"
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
        <Link href={user ? "/dashboard?book=procurement" : "/login?book=procurement"} className="absolute left-[166px] top-[490px] w-[309px] h-[309px] rounded-[30px] overflow-hidden shadow-lg border border-slate-100 hover:scale-105 transition-transform duration-300 z-10 cursor-pointer bg-white">
          <img 
            src="/images/services/Procurement.webp" 
            alt="Procurement & Sourcing" 
            className="w-full h-full object-cover"
          />
        </Link>

        {/* Card 2: Small Business (Elements -CID (14) 1) */}
        <Link href={user ? "/dashboard?book=accounts_and_logistics" : "/login?book=accounts_and_logistics"} className="absolute left-[486px] top-[495px] w-[309px] h-[309px] rounded-[30px] overflow-hidden shadow-lg border border-slate-100 hover:scale-105 transition-transform duration-300 z-10 cursor-pointer bg-white">
          <img 
            src="/images/services/business.webp" 
            alt="Small Business Management" 
            className="w-full h-full object-cover"
          />
        </Link>

        {/* Card 3: Tax (Elements -CID (13) 1) */}
        <Link href={user ? "/dashboard?book=tax_prep" : "/login?book=tax_prep"} className="absolute left-[807px] top-[495px] w-[309px] h-[309px] rounded-[30px] overflow-hidden shadow-lg border border-slate-100 hover:scale-105 transition-transform duration-300 z-10 cursor-pointer bg-white">
          <img 
            src="/images/services/tax.webp" 
            alt="Tax Preparation" 
            className="w-full h-full object-cover"
          />
        </Link>

        {/* Card 4: Solar (Elements -CID (12) 1) */}
        <Link href={user ? "/dashboard?book=solar" : "/login?book=solar"} className="absolute left-[1127px] top-[495px] w-[310px] h-[309px] rounded-[30px] overflow-hidden shadow-lg border border-slate-100 hover:scale-105 transition-transform duration-300 z-10 cursor-pointer bg-white">
          <img 
            src="/images/services/solar.webp" 
            alt="Solar Solutions" 
            className="w-full h-full object-cover"
          />
        </Link>

        {/* Card 5: Virtual Bookkeeping (Elements -CID (11) 1) */}
        <Link href={user ? "/dashboard?book=virtual_bookkeeping" : "/login?book=virtual_bookkeeping"} className="absolute left-[1444px] top-[495px] w-[309px] h-[309px] rounded-[30px] overflow-hidden shadow-lg border border-slate-100 hover:scale-105 transition-transform duration-300 z-10 cursor-pointer bg-white">
          <img 
            src="/images/services/bookkeeping.webp" 
            alt="Virtual Bookkeeping" 
            className="w-full h-full object-cover"
          />
        </Link>


        {/* --- PILL BUTTON BACKINGS (absolute coords) --- */}

        {/* Pill 1 Background (Rectangle 6) */}
        <div 
          className="absolute left-[166px] top-[841px] w-[300px] h-[157px] rounded-[30px] z-10"
          style={{ backgroundColor: "rgba(63, 166, 114, 0.2)" }}
        />

        {/* Pill 2 Background (Rectangle 7) */}
        <div 
          className="absolute left-[490px] top-[841px] w-[301px] h-[157px] rounded-[30px] z-10"
          style={{ backgroundColor: "rgba(232, 80, 58, 0.2)" }}
        />

        {/* Pill 3 Background (Rectangle 8) */}
        <div 
          className="absolute left-[811px] top-[841px] w-[300px] h-[157px] rounded-[30px] z-10"
          style={{ backgroundColor: "rgba(45, 111, 163, 0.2)" }}
        />

        {/* Pill 4 Background (Rectangle 9) */}
        <div 
          className="absolute left-[1132px] top-[841px] w-[300px] h-[157px] rounded-[30px] z-10"
          style={{ backgroundColor: "rgba(232, 114, 140, 0.2)" }}
        />

        {/* Pill 5 Background (Rectangle 10) */}
        <div 
          className="absolute left-[1453px] top-[841px] w-[300px] h-[157px] rounded-[30px] z-10"
          style={{ backgroundColor: "rgba(63, 166, 114, 0.2)" }}
        />


        {/* --- PILL TEXT LABELS (absolute coords) --- */}

        {/* Text 1: Procurement */}
        <div 
          className="absolute left-[222px] top-[862px] w-[189px] h-[111px] font-semibold text-[24px] leading-[29px] flex items-center justify-center text-center z-15"
          style={{ fontFamily: "Inter, sans-serif", color: "#0D2B1A" }}
        >
          Procurement & Sourcing Services
        </div>

        {/* Text 2: Small Business */}
        <div 
          className="absolute left-[531px] top-[862px] w-[218px] h-[111px] font-semibold text-[24px] leading-[29px] flex items-center justify-center text-center z-15"
          style={{ fontFamily: "Inter, sans-serif", color: "#5C1A0F" }}
        >
          Small Business Management Solutions
        </div>

        {/* Text 3: Tax */}
        <div 
          className="absolute left-[851px] top-[881px] w-[220px] h-[74px] font-semibold text-[24px] leading-[29px] flex items-center justify-center text-center z-15"
          style={{ fontFamily: "Inter, sans-serif", color: "#0A1E35" }}
        >
          Tax Preparation & Resolution
        </div>

        {/* Text 4: Solar */}
        <div 
          className="absolute left-[1191px] top-[881px] w-[184px] h-[74px] font-semibold text-[24px] leading-[29px] flex items-center justify-center text-center z-15"
          style={{ fontFamily: "Inter, sans-serif", color: "#3D0A1E" }}
        >
          Solar Energy Solutions
        </div>

        {/* Text 5: Virtual Bookkeeping */}
        <div 
          className="absolute left-[1516px] top-[877px] w-[183px] h-[74px] font-semibold text-[24px] leading-[29px] flex items-center justify-center text-center z-15"
          style={{ fontFamily: "Inter, sans-serif", color: "#0D2B1A" }}
        >
          Virtual Bookkeeping
        </div>

      </div>
    </div>
  );
}
