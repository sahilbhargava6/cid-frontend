"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";

const Background3D = dynamic(() => import("@/components/Background3D"), {
  ssr: false,
});

export default function AboutPage() {
  const [scale, setScale] = useState(1);
  const [leftOffset, setLeftOffset] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const scaleFactor = Math.min(width / 1920, 1);
      setScale(scaleFactor);
      setLeftOffset((width - 1920 * scaleFactor) / 2);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Background3D />
      <Navbar />
      
      <main 
        className="w-full bg-[#FFFFFF] overflow-x-hidden flex items-start justify-center pt-[76px] lg:pt-[90px]"
        style={{
          paddingBottom: `${(1500 - 1500 * scale)}px` // Prevent scaling clipping issues for 1500px canvas height
        }}
      >
        {/* 1920x1500 Pixel-Perfect Canvas Container */}
        <div 
          className="relative flex-shrink-0 select-none origin-top-left"
          style={{
            width: "1920px",
            height: "1500px",
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

          {/* Page Title */}
          <h1 
            className="absolute left-[216px] top-[230px] w-[500px] h-[170px] font-black text-[64px] leading-[77px] flex items-center select-none"
            style={{
              fontFamily: "Inter, sans-serif",
              background: "linear-gradient(90deg, #5C1A0F 0%, #0A1E35 36.06%, #0D2B1A 64.9%, #3D0A1E 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            About Us
          </h1>

          {/* Side Subtitle Pill */}
          <div 
            className="absolute left-[216px] top-[490px] w-[450px] h-[86px] rounded-[30px] z-10 flex items-center justify-center px-6 shadow-sm bg-[rgba(10,30,53,0.05)] border border-slate-200/50"
          >
            <span 
              className="font-bold text-[24px] leading-[29px] text-[#0A1E35] text-center"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Our Mission & Philosophy
            </span>
          </div>

          {/* Main About Details Card */}
          <div 
            className="absolute left-[216px] top-[620px] w-[1488px] h-[720px] rounded-[30px] z-10 p-12 shadow-sm border border-slate-100/50 bg-white/40 backdrop-blur-md"
          >
            <p 
              className="text-[28px] leading-[44px] font-light text-slate-700 mb-8"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              At <strong className="font-bold text-[#E85D3A]">Consider It Done</strong>, we believe execution is everything. We serve as a premium administrative, logistical, and specialized task partner for busy individuals and expanding small businesses across the United States. 
            </p>

            <div className="grid grid-cols-2 gap-12 mt-12">
              <div>
                <h4 className="text-[32px] font-bold text-[#0A1E35] mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
                  Why Partner With Us?
                </h4>
                <ul className="space-y-4 text-[22px] font-light text-slate-600" style={{ fontFamily: "Inter, sans-serif" }}>
                  <li className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#3FA672] flex-shrink-0" />
                    100% US-Based Experts & Coordinators
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#3FA672] flex-shrink-0" />
                    Strict Data Privacy & Security Protocols
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#3FA672] flex-shrink-0" />
                    No-Gimmicks Performance Guarantees
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#3FA672] flex-shrink-0" />
                    Custom Integrations tailored to your needs
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-[32px] font-bold text-[#0A1E35] mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
                  Our Dynamic Services
                </h4>
                <p className="text-[22px] leading-[36px] font-light text-slate-600 mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
                  We unify essential personal and business workflows under one virtual roof. From global procurement and supply logistics to tax preparations, virtual bookkeeping, and home solar engineering audits, our teams ensure every task is considered done.
                </p>
                <Link 
                  href="/services" 
                  className="px-8 py-3 bg-[#E85D3A] hover:bg-[#C44A2A] text-white font-extrabold text-[20px] rounded-full inline-block shadow-sm transition-transform hover:scale-[1.03]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </>
  );
}
