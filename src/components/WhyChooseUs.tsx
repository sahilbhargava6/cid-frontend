"use client";
 
import { useState, useEffect } from "react";
import { getSiteConfig } from "@/data/siteConfigData";

export default function WhyChooseUs() {
  const [config, setConfig] = useState(() => getSiteConfig());

  useEffect(() => {
    setConfig(getSiteConfig());
  }, []);

  const { whyChooseUsTitle, whyChooseUsLeft, whyChooseUsRight1, whyChooseUsRight2 } = config;

  return (
    <section
      id="why-us"
      className="py-20 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight"
            style={{ color: "#0E2D53", fontFamily: "var(--font-heading)" }}
          >
            {whyChooseUsTitle}
          </h2>
          <div className="w-16 h-1 bg-[#E85D3A] mx-auto rounded-full" />
        </div>

        {/* Two Columns Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

          {/* Left Block - Centered tall card */}
          <div
            className="group rounded-[32px] p-8 md:p-12 flex flex-col justify-center items-center text-center transition-all duration-500 hover:scale-[1.02] border border-white/40 dark:border-white/10 shadow-[0_12px_40px_rgba(15,17,23,0.04)] hover:shadow-[0_20px_50px_rgba(232,93,58,0.15)] min-h-[300px] backdrop-blur-md relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(235,241,245,0.4) 100%)",
            }}
          >
            {/* Background glowing circle */}
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-[#E85D3A]/5 blur-2xl group-hover:bg-[#E85D3A]/10 transition-colors duration-500" />

            <div className="w-16 h-16 rounded-2xl bg-[#E85D3A]/10 flex items-center justify-center text-3xl mb-6 shadow-sm">
              {whyChooseUsLeft.icon}
            </div>

            <h3
              className="text-xl md:text-2xl font-bold mb-4 tracking-tight"
              style={{ color: "#E85D3A" }}
            >
              {whyChooseUsLeft.title}
            </h3>
            <ul
              className="list-disc pl-5 text-sm md:text-base leading-relaxed font-bold max-w-sm text-[#0E2D53] text-left"
            >
              {whyChooseUsLeft.description.split(",").map((item, idx) => (
                <li key={idx} className="mt-1"> {item.trim()} </li>
              ))}
            </ul>
          </div>

          {/* Right Block - Stacked Cards */}
          <div className="flex flex-col gap-6 justify-between">

            {/* Card 1 */}
            <div
              className="group rounded-[28px] p-6 md:p-8 flex items-start gap-5 transition-all duration-500 hover:scale-[1.02] border border-white/40 dark:border-white/10 shadow-[0_12px_40px_rgba(15,17,23,0.04)] hover:shadow-[0_15px_30px_rgba(46,158,90,0.1)] backdrop-blur-md flex-1 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(235,241,245,0.4) 100%)",
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-[#2E9E5A]/10 flex items-center justify-center text-xl shrink-0">
                {whyChooseUsRight1.icon}
              </div>
              <div>
                <h4
                  className="text-xl md:text-2xl font-bold mb-2 tracking-tight"
                  style={{ color: "#E85D3A" }}
                >
                  {whyChooseUsRight1.title}
                </h4>
                {whyChooseUsRight1.points && (
                  <ul className="list-disc pl-5 text-xs sm:text-sm leading-relaxed font-bold text-[#0E2D53]">
                    {whyChooseUsRight1.points.map((p, idx) => (
                      <li key={idx}> {p} </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="group rounded-[28px] p-6 md:p-8 flex items-start gap-5 transition-all duration-500 hover:scale-[1.02] border border-white/40 dark:border-white/10 shadow-[0_12px_40px_rgba(15,17,23,0.04)] hover:shadow-[0_15px_30px_rgba(27,94,146,0.1)] backdrop-blur-md flex-1 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(235,241,245,0.4) 100%)",
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-[#1B5E92]/10 flex items-center justify-center text-xl shrink-0">
                {whyChooseUsRight2.icon}
              </div>
              <div>
                <h4
                  className="text-xl md:text-2xl font-bold mb-2 tracking-tight"
                  style={{ color: "#E85D3A" }}
                >
                  {whyChooseUsRight2.title}
                </h4>
                {whyChooseUsRight2.points && (
                  <ul className="list-disc pl-5 text-xs sm:text-sm leading-relaxed font-bold text-[#0E2D53]">
                    {whyChooseUsRight2.points.map((p, idx) => (
                      <li key={idx}> {p} </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

