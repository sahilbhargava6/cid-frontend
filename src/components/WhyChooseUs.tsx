"use client";
 
import { useState, useEffect } from "react";
import { useSiteConfig, WhyChooseUsCard } from "@/data/siteConfigData";

export default function WhyChooseUs() {
  const config = useSiteConfig();

  const { whyChooseUsTitle, whyChooseUsLeft, whyChooseUsRight1, whyChooseUsRight2 } = config;

  const getPoints = (card: WhyChooseUsCard) => {
    if (card.points && Array.isArray(card.points) && card.points.length > 0) {
      return card.points;
    }
    if (card.description) {
      return card.description.split(",").map(item => item.trim()).filter(Boolean);
    }
    return [];
  };

  return (
    <section
      aria-labelledby="why-choose-us-heading"
      className="w-full relative py-20 lg:py-32 overflow-hidden bg-white/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section Header (Moving Ticker Marquee) */}
        <div className="relative w-full overflow-hidden py-6 bg-[#F4F7FA]/40 backdrop-blur-[1px] border-y border-[#E85D3A]/15 mb-20 select-none">
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes marquee-why {
              0% { transform: translateX(60vw); }
              100% { transform: translateX(-100%); }
            }
            .marquee-why {
              display: inline-flex;
              animation: marquee-why 18s linear infinite;
              will-change: transform;
            }
            .marquee-why:hover {
              animation-play-state: paused;
            }
          `}} />
          <div className="marquee-why flex-col items-center justify-center text-center gap-1 whitespace-nowrap">
            <span
              className="block text-2xl md:text-3xl font-extrabold tracking-tight"
              style={{ color: "#0E2D53", fontFamily: "var(--font-heading)" }}
            >
              {whyChooseUsTitle}
            </span>
          </div>
        </div>

        {/* ================= DESKTOP TRIANGLE LAYOUT (>= 768px) ================= */}
        <div className="hidden md:block relative w-[900px] h-[580px] mx-auto">
          {/* SVG Connecting Arrows */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#E85D3A" />
              </marker>
            </defs>
            
            {/* Arrow 1: You Plan (Top Center) <-> You Save (Bottom Left) */}
            <path
              d="M 342 239 Q 230 230 251 325"
              fill="none"
              stroke="#E85D3A"
              strokeWidth="3.5"
              strokeOpacity="0.85"
              markerStart="url(#arrow)"
              markerEnd="url(#arrow)"
              strokeDasharray="8 6"
              filter="url(#glow)"
              className="animate-[dash_40s_linear_infinite]"
            />
            
            {/* Arrow 2: You Save (Bottom Left) <-> You Decide (Bottom Right) */}
            <path
              d="M 293 429 Q 450 510 607 429"
              fill="none"
              stroke="#E85D3A"
              strokeWidth="3.5"
              strokeOpacity="0.85"
              markerStart="url(#arrow)"
              markerEnd="url(#arrow)"
              strokeDasharray="8 6"
              filter="url(#glow)"
              className="animate-[dash_40s_linear_infinite]"
            />
            
            {/* Arrow 3: You Plan (Top Center) <-> You Decide (Bottom Right) */}
            <path
              d="M 558 239 Q 670 230 649 325"
              fill="none"
              stroke="#E85D3A"
              strokeWidth="3.5"
              strokeOpacity="0.85"
              markerStart="url(#arrow)"
              markerEnd="url(#arrow)"
              strokeDasharray="8 6"
              filter="url(#glow)"
              className="animate-[dash_40s_linear_infinite]"
            />
          </svg>

          {/* Circle 1: Top Center (You Plan - We Implement) */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 z-10 w-[270px] h-[270px] rounded-full p-6 flex flex-col justify-center items-center text-center transition-all duration-500 hover:scale-[1.03] border-2 border-slate-200 shadow-[0_8px_32px_rgba(14,45,83,0.06)] hover:shadow-[0_16px_48px_rgba(232,93,58,0.15)] backdrop-blur-xl overflow-hidden bg-gradient-to-br from-white/95 to-white/60"
          >
            <h3
              className="text-lg md:text-xl font-black mb-4 tracking-tight leading-tight drop-shadow-sm"
              style={{ color: "#E85D3A" }}
            >
              {whyChooseUsLeft.title}
            </h3>
            <div className="w-full flex justify-center">
              <ul className="text-left text-[11px] sm:text-[12px] leading-[1.6] font-extrabold text-[#0E2D53] space-y-2.5 list-none max-w-[200px]">
                {getPoints(whyChooseUsLeft).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E85D3A] shrink-0 mt-[5px]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Circle 2: Bottom Left (You Save - We Strive) */}
          <div
            className="absolute left-2 bottom-4 z-10 w-[270px] h-[270px] rounded-full p-6 flex flex-col justify-center items-center text-center transition-all duration-500 hover:scale-[1.03] border-2 border-slate-200 shadow-[0_8px_32px_rgba(14,45,83,0.06)] hover:shadow-[0_16px_48px_rgba(232,93,58,0.15)] backdrop-blur-xl overflow-hidden bg-gradient-to-br from-white/95 to-white/60"
          >
            <h3
              className="text-lg md:text-xl font-black mb-4 tracking-tight leading-tight drop-shadow-sm"
              style={{ color: "#E85D3A" }}
            >
              {whyChooseUsRight1.title}
            </h3>
            <div className="w-full flex justify-center">
              <ul className="text-left text-[11px] sm:text-[12px] leading-[1.6] font-extrabold text-[#0E2D53] space-y-2.5 list-none max-w-[200px]">
                {getPoints(whyChooseUsRight1).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E85D3A] shrink-0 mt-[5px]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Circle 3: Bottom Right (You Decide - We Execute) */}
          <div
            className="absolute right-2 bottom-4 z-10 w-[270px] h-[270px] rounded-full p-6 flex flex-col justify-center items-center text-center transition-all duration-500 hover:scale-[1.03] border-2 border-slate-200 shadow-[0_8px_32px_rgba(14,45,83,0.06)] hover:shadow-[0_16px_48px_rgba(232,93,58,0.15)] backdrop-blur-xl overflow-hidden bg-gradient-to-br from-white/95 to-white/60"
          >
            <h3
              className="text-lg md:text-xl font-black mb-4 tracking-tight leading-tight drop-shadow-sm"
              style={{ color: "#E85D3A" }}
            >
              {whyChooseUsRight2.title}
            </h3>
            <div className="w-full flex justify-center">
              <ul className="text-left text-[11px] sm:text-[12px] leading-[1.6] font-extrabold text-[#0E2D53] space-y-2.5 list-none max-w-[200px]">
                {getPoints(whyChooseUsRight2).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E85D3A] shrink-0 mt-[5px]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ================= MOBILE STACK LAYOUT (< 768px) ================= */}
        <div className="flex md:hidden flex-col items-center gap-8">
          {/* Card 1 */}
          <div className="w-[290px] h-[290px] rounded-full p-6 flex flex-col justify-center items-center text-center border-2 border-slate-200 shadow-lg backdrop-blur-md bg-white/70">
            <h3 className="text-lg font-black mb-3 text-[#E85D3A]">{whyChooseUsLeft.title}</h3>
            <div className="w-full flex justify-center">
              <ul className="text-left text-xs font-extrabold text-[#0E2D53] space-y-1.5 list-none max-w-[200px]">
                {getPoints(whyChooseUsLeft).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E85D3A] shrink-0 mt-[5px]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Down Arrow */}
          <svg className="w-8 h-8 text-[#E85D3A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-6l-7 7-7-7" />
          </svg>

          {/* Card 2 */}
          <div className="w-[290px] h-[290px] rounded-full p-6 flex flex-col justify-center items-center text-center border-2 border-slate-200 shadow-lg backdrop-blur-md bg-white/70">
            <h3 className="text-lg font-black mb-3 text-[#E85D3A]">{whyChooseUsRight1.title}</h3>
            <div className="w-full flex justify-center">
              <ul className="text-left text-xs font-extrabold text-[#0E2D53] space-y-1.5 list-none max-w-[200px]">
                {getPoints(whyChooseUsRight1).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E85D3A] shrink-0 mt-[5px]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Down Arrow */}
          <svg className="w-8 h-8 text-[#E85D3A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-6l-7 7-7-7" />
          </svg>

          {/* Card 3 */}
          <div className="w-[290px] h-[290px] rounded-full p-6 flex flex-col justify-center items-center text-center border-2 border-slate-200 shadow-lg backdrop-blur-md bg-white/70">
            <h3 className="text-lg font-black mb-3 text-[#E85D3A]">{whyChooseUsRight2.title}</h3>
            <div className="w-full flex justify-center">
              <ul className="text-left text-xs font-extrabold text-[#0E2D53] space-y-1.5 list-none max-w-[200px]">
                {getPoints(whyChooseUsRight2).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E85D3A] shrink-0 mt-[5px]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
