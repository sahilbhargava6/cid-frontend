"use client";

import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";

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

function InteractiveTilt({ children }: { children: React.ReactNode }) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!elementRef.current) return;
    const rect = elementRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateY = ((x - xc) / xc) * 12; // max 12 deg tilt
    const rotateX = -((y - yc) / yc) * 12;
    setTransform(`perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`);
  };

  const handleMouseLeave = () => {
    setTransform("perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)");
  };

  return (
    <div
      ref={elementRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block transition-transform duration-200 ease-out cursor-default"
      style={{
        transform,
        transformStyle: "preserve-3d",
      }}
    >
      <div style={{ transform: "translateZ(25px)" }}>
        {children}
      </div>
    </div>
  );
}

function DashboardSimulation() {
  const [simStep, setSimStep] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setSimStep((prev) => (prev % 3) + 1);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full rounded-[28px] bg-slate-950 text-white overflow-hidden shadow-inner flex flex-col p-1.5 border border-white/10 font-sans">
      {/* Top window controls */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-slate-900/50">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        </div>
        <div className="text-[9px] sm:text-[10px] tracking-wide text-white/40 font-semibold font-mono">
          consideritdone.com/portal
        </div>
        <div className="w-10" />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Mock Sidebar */}
        <div className="w-[75px] sm:w-[95px] border-r border-white/5 bg-slate-900/30 p-2 flex flex-col gap-2">
          <div className="h-5 w-full rounded bg-white/10 animate-pulse" />
          <div className="h-3 w-5/6 rounded bg-white/5" />
          <div className="h-3 w-4/6 rounded bg-white/5" />
          <div className="h-3 w-5/6 rounded bg-white/5" />
        </div>

        {/* Mock Main Panel */}
        <div className="flex-1 p-3 flex flex-col justify-between overflow-hidden relative">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="h-4 w-20 rounded bg-white/15" />
            <div className="h-5.5 w-5.5 rounded-full bg-[#E85D3A] flex items-center justify-center text-[9px] font-bold">
              U
            </div>
          </div>

          {/* Dynamic Step Content */}
          <div className="flex-1 flex flex-col justify-center items-center py-2 relative">
            
            {/* Step 1: Account Creation */}
            <div className={`transition-all duration-700 absolute inset-0 flex flex-col justify-center items-center gap-2 ${
              simStep === 1 ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
            }`}>
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[16px] text-[#E85D3A] shadow-lg shadow-[#E85D3A]/20">
                👤
              </div>
              <div className="text-[10.5px] font-bold text-white/95">Creating Account...</div>
              <div className="w-28 h-1 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#E85D3A] to-[#FF7A55] animate-[progressBar_4s_ease-in-out_infinite]" />
              </div>
              <div className="text-[8.5px] text-white/50 italic">Generating Client Portal</div>
            </div>

            {/* Step 2: Book Service */}
            <div className={`transition-all duration-700 absolute inset-0 flex flex-col justify-center items-center gap-1.5 ${
              simStep === 2 ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
            }`}>
              <div className="text-[10.5px] font-bold text-white/95 text-center">Scheduling Sourcing Plan</div>
              
              {/* Mock Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 p-1 bg-white/5 rounded-lg w-[160px] relative">
                {[...Array(14)].map((_, i) => (
                  <div key={i} className={`h-3 rounded flex items-center justify-center text-[7px] font-mono ${
                    i === 8 ? "bg-[#E85D3A] text-white font-bold relative z-10" : "bg-white/5 text-white/40"
                  }`}>
                    {15 + i}
                    {i === 8 && (
                      <span className="absolute inset-0 rounded bg-[#E85D3A] animate-ping opacity-60" />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-[8.5px] text-[#2E9E5A] font-bold flex items-center gap-1">
                <span>⚡</span> June 23 selected (10:00 AM)
              </div>
            </div>

            {/* Step 3: Track Status */}
            <div className={`transition-all duration-700 absolute inset-0 flex flex-col justify-center gap-2 px-2 ${
              simStep === 3 ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
            }`}>
              <div className="text-[10.5px] font-bold text-center text-white/95">Real-Time Project Tracker</div>
              
              {/* Progress Bar & Status Ticks */}
              <div className="space-y-1.5 text-[8.5px] font-bold text-white/80">
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#2E9E5A]/20 text-[#2E9E5A] border border-[#2E9E5A]/30 flex items-center justify-center text-[7px]">✓</span>
                  <span className="text-[#2E9E5A]">Account Created</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#2E9E5A]/20 text-[#2E9E5A] border border-[#2E9E5A]/30 flex items-center justify-center text-[7px]">✓</span>
                  <span className="text-[#2E9E5A]">Consultation Complete</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#E85D3A]/20 text-[#FF7A55] border border-[#E85D3A]/30 flex items-center justify-center text-[8px] animate-pulse">⚡</span>
                  <span className="text-[#FF7A55]">Work in Progress (85%)</span>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Steps Nav Indicator dots */}
          <div className="flex items-center justify-center gap-1.5 mt-1">
            {[1, 2, 3].map((step) => (
              <button
                key={step}
                onClick={() => setSimStep(step)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  simStep === step ? "bg-[#E85D3A] w-3" : "bg-white/20"
                }`}
                aria-label={`Go to step ${step}`}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}


export default function HowItWorks() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="how-it-works"
      className="py-16 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section Header with 3D Parallax Tilt */}
        <div className="text-center mb-16">
          <InteractiveTilt>
            <h2
              className="text-2xl md:text-3xl font-extrabold tracking-tight select-none"
              style={{ color: "#0E2D53", fontFamily: "var(--font-heading)" }}
            >
              How to book a service? It&apos;s Simple!
            </h2>
          </InteractiveTilt>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column - 6-step checklist (Takes 7 cols) with 3D tilt panels */}
          <div className="lg:col-span-7 space-y-8">
            {steps.map((step) => (
              <InteractiveTilt key={step.number}>
                <div className="flex gap-6 items-start p-3 sm:p-4 rounded-2xl hover:bg-[#F5FAFD] transition-colors duration-200">

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
              </InteractiveTilt>
            ))}
          </div>

          {/* Right Column - Premium interactive Client Dashboard mockup simulation */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              className="relative p-3 sm:p-5 rounded-[40px] bg-[#FDE2DC] shadow-[0_20px_50px_rgba(224,109,83,0.12)] max-w-full w-[460px] aspect-[4/3] flex items-center justify-center border border-white/50"
            >
              <DashboardSimulation />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
