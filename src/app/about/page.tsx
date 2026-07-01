"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteConfig } from "@/data/siteConfigData";
import dynamic from "next/dynamic";

const Background3D = dynamic(() => import("@/components/Background3D"), {
  ssr: false,
});

export default function AboutPage() {
  const [scale, setScale] = useState(1);
  const [leftOffset, setLeftOffset] = useState(0);
  const [config, setConfig] = useState(() => getSiteConfig());

  useEffect(() => {
    setConfig(getSiteConfig());

    const handleResize = () => {
      const width = window.innerWidth;
      const scaleFactor = Math.min(width / 1920, 1);
      setScale(scaleFactor);
      setLeftOffset(0);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Background3D />
      <Navbar />
      
      <main className="w-full bg-[#FFFFFF] overflow-x-hidden min-h-screen">
        {/* ===== MOBILE & TABLET VIEW (< 1024px) ===== */}
        <div className="block lg:hidden pt-32 pb-20 px-4 sm:px-8 max-w-3xl mx-auto relative z-10">
          {/* Page Title */}
          <h1 
            className="font-black text-4xl sm:text-5xl mb-4 select-none"
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

          {/* Subtitle Pill */}
          <div className="inline-block px-5 py-2.5 rounded-2xl bg-[rgba(10,30,53,0.05)] border border-slate-200/60 mb-8 shadow-sm">
            <span className="font-bold text-base sm:text-lg text-[#0A1E35]" style={{ fontFamily: "Inter, sans-serif" }}>
              {config.aboutPill}
            </span>
          </div>

          {/* Main About Card */}
          <div className="rounded-3xl p-6 sm:p-10 shadow-lg border-2 border-slate-200 bg-white/80 backdrop-blur-md space-y-8">
            <p className="text-lg sm:text-xl leading-relaxed font-light text-slate-700" style={{ fontFamily: "Inter, sans-serif" }}>
              {config.aboutIntro}
            </p>

            <div className="border-t border-slate-100 pt-8 space-y-8">
              {/* Col 1 */}
              <div>
                <h4 className="text-2xl sm:text-3xl font-bold text-[#0A1E35] mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
                  {config.aboutCol1Header}
                </h4>
                <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg font-light text-slate-600" style={{ fontFamily: "Inter, sans-serif" }}>
                  {config.aboutCol1Bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#3FA672] flex-shrink-0 mt-2" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 2 */}
              <div className="border-t border-slate-100 pt-8">
                <h4 className="text-2xl sm:text-3xl font-bold text-[#0A1E35] mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
                  {config.aboutCol2Header}
                </h4>
                <p className="text-base sm:text-lg leading-relaxed font-light text-slate-600 mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
                  {config.aboutCol2Text}
                </p>
                <Link 
                  href="/services" 
                  className="px-8 py-3.5 bg-[#E85D3A] hover:bg-[#C44A2A] text-white font-extrabold text-base sm:text-lg rounded-full inline-block shadow-md transition-transform hover:scale-105 active:scale-95"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ===== DESKTOP VIEW (>= 1024px) ===== */}
        <div className="hidden lg:flex items-start justify-center pt-0 overflow-hidden w-full">
          <div 
            className="relative flex-shrink-0 select-none origin-top-left overflow-hidden"
            style={{
              width: `${1920 * scale}px`,
              height: `${1250 * scale}px`
            }}
          >
            {/* 1920x1250 Pixel-Perfect Canvas Container */}
            <div 
              className="absolute top-0 left-0 select-none origin-top-left"
              style={{
                width: "1920px",
                height: "1250px",
                transform: `scale(${scale})`
              }}
            >
              {/* Faded Background Element (cid ele 1) */}
              <div 
                className="absolute left-0 top-0 w-[1920px] h-[800px] bg-cover bg-bottom bg-no-repeat z-0"
                style={{
                  backgroundImage: "url('/images/hero.webp')"
                }}
              >
                <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px]" />
              </div>

              {/* Page Title */}
              <h1 
                className="absolute left-[216px] top-[160px] w-[500px] h-[170px] font-black text-[64px] leading-[77px] flex items-center select-none"
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
                className="absolute left-[216px] top-[320px] w-[450px] h-[86px] rounded-[30px] z-10 flex items-center justify-center px-6 shadow-sm bg-[rgba(10,30,53,0.05)] border border-slate-200/50"
              >
                <span 
                  className="font-bold text-[24px] leading-[29px] text-[#0A1E35] text-center"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {config.aboutPill}
                </span>
              </div>

              {/* Main About Details Card */}
              <div 
                className="absolute left-[216px] top-[430px] w-[1488px] h-[720px] rounded-[30px] z-10 p-12 shadow-lg border-2 border-slate-200 bg-white/60 backdrop-blur-md"
              >
                <p 
                  className="text-[28px] leading-[44px] font-light text-slate-700 mb-8"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {config.aboutIntro}
                </p>

                <div className="grid grid-cols-2 gap-12 mt-12">
                  <div>
                    <h4 className="text-[32px] font-bold text-[#0A1E35] mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
                      {config.aboutCol1Header}
                    </h4>
                    <ul className="space-y-4 text-[22px] font-light text-slate-600" style={{ fontFamily: "Inter, sans-serif" }}>
                      {config.aboutCol1Bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <span className="w-3 h-3 rounded-full bg-[#3FA672] flex-shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-[32px] font-bold text-[#0A1E35] mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
                      {config.aboutCol2Header}
                    </h4>
                    <p className="text-[22px] leading-[36px] font-light text-slate-600 mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
                      {config.aboutCol2Text}
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
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
