"use client";

import Image from "next/image";

const steps = [
  {
    number: 1,
    title: "Create Your Account",
    description: "Sign up in just a few clicks to access all our services.",
  },
  {
    number: 2,
    title: "Choose Your Service",
    description: "Browse our Services page or select a service directly from the homepage.",
  },
  {
    number: 3,
    title: "Schedule a Consultation",
    description: "Pick a date and time that works best for you.",
  },
  {
    number: 4,
    title: "Review Our Plan",
    description: "Attend the consultation. If you're happy with our proposed solution, head to your dashboard.",
  },
  {
    number: 5,
    title: "Confirm & Proceed",
    description: "Approve the project and continue with the onboarding process.",
  },
  {
    number: 6,
    title: "Share the Details",
    description: "Provide the necessary information, and we'll take it from there. Sit back while we work our magic.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-16 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-2xl md:text-3xl font-extrabold tracking-tight"
            style={{ color: "#0E2D53", fontFamily: "var(--font-heading)" }}
          >
            How to book a service? It&apos;s Simple!
          </h2>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column - 6-step checklist (Takes 7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-6 items-start">

                {/* Styled Concentric Circular Number */}
                <div className="relative shrink-0 flex items-center justify-center w-14 h-14 rounded-full border border-[#D5EBF7] bg-[#EBF7FD] shadow-[0_0_0_6px_#F4FAFD]">
                  <span className="text-lg font-bold text-[#2D6FA3] font-mono">
                    {step.number}
                  </span>
                </div>

                <div>
                  <h3
                    className="text-base md:text-lg font-extrabold mb-1.5 tracking-tight"
                    style={{ color: "#2D6FA3" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-xs sm:text-sm font-bold leading-relaxed"
                    style={{ color: "#3FA672" }}
                  >
                    {step.description}
                  </p>
                </div>

              </div>
            ))}
          </div>

          {/* Right Column - Mockup image in a peach frame (Takes 5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              className="relative p-5 rounded-[40px] bg-[#FDE2DC] shadow-[0_20px_50px_rgba(224,109,83,0.12)] max-w-full w-[460px] aspect-[4/3] flex items-center justify-center border border-white/50"
            >
              <div className="relative w-full h-full rounded-[28px] bg-white overflow-hidden shadow-inner flex flex-col p-4">

                {/* Mockup layout mimicking the screenshot preview */}
                <div className="flex flex-col gap-2.5 h-full overflow-hidden">

                  {/* One partner title */}
                  <div className="text-[7px] font-extrabold text-[#591B1B] text-center mt-2">
                    One partner for your business essentials.
                  </div>
                  <div className="text-[4px] text-[#E07A6B] text-center max-w-[180px] mx-auto leading-none">
                    Whether it&apos;s managing finances, sourcing products, optimizing operations, or reducing energy costs...
                  </div>

                  {/* 6 mini blocks representation */}
                  <div className="grid grid-cols-6 gap-1 my-1">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <div className="w-full aspect-square rounded-[4px] bg-slate-100 border border-slate-200/50" />
                        <div className="w-full h-2 rounded-[2px] bg-[#DCEFE9]" />
                      </div>
                    ))}
                  </div>

                  {/* Why Smart Businesses header */}
                  <div className="text-[7px] font-extrabold text-[#591B1B] text-center mt-3">
                    Why Smart Businesses Work With Us
                  </div>

                  {/* Two boxes representation */}
                  <div className="grid grid-cols-2 gap-2 mt-1 flex-1 pb-2">
                    <div className="rounded-[6px] bg-[#EBF1F5] p-2 flex flex-col justify-center items-center text-center">
                      <div className="w-12 h-1 bg-[#E05D44] rounded-[1px] mb-1" />
                      <div className="w-16 h-1 bg-[#E07A6B] rounded-[1px]" />
                    </div>
                    <div className="flex flex-col gap-1.5 justify-between">
                      <div className="rounded-[6px] bg-[#EBF1F5] p-2 flex flex-col justify-center">
                        <div className="w-16 h-1 bg-[#E05D44] rounded-[1px] mb-1" />
                        <div className="w-20 h-1 bg-[#E07A6B] rounded-[1px]" />
                      </div>
                      <div className="rounded-[6px] bg-[#EBF1F5] p-2 flex flex-col justify-center">
                        <div className="w-16 h-1 bg-[#E05D44] rounded-[1px] mb-1" />
                        <div className="w-20 h-1 bg-[#E07A6B] rounded-[1px]" />
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
