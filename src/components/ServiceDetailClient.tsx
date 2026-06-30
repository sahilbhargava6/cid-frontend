"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import dynamic from "next/dynamic";

const Background3D = dynamic(() => import("@/components/Background3D"), {
  ssr: false,
});

interface ServiceDetail {
  title: string;
  image: string;
  bgColor: string;
  textColor: string;
  accentBg: string;
  description: string;
  bullets: string[];
}

const serviceDetailsData: Record<string, ServiceDetail> = {
  procurement: {
    title: "Procurement & Sourcing Services",
    image: "/images/services/Procurement.webp",
    bgColor: "rgba(63, 166, 114, 0.15)",
    textColor: "#0D2B1A",
    accentBg: "rgba(63, 166, 114, 0.2)",
    description: "Navigate global supply chains with confidence. We handle product sourcing, vendor negotiations, custom bidding protocols, quality control, and international logistics so you can focus on scaling your operations.",
    bullets: [
      "Rigorous vendor vetting & audit processes",
      "Global factory-direct price negotiations",
      "End-to-end shipping, customs & logistics management",
      "100% transparent quality control & assurance guarantees"
    ]
  },
  accounts_and_logistics: {
    title: "Small Business Management Solutions",
    image: "/images/services/business.webp",
    bgColor: "rgba(232, 80, 58, 0.15)",
    textColor: "#5C1A0F",
    accentBg: "rgba(232, 80, 58, 0.2)",
    description: "Free up your internal resources. From workflow automation and project management to logistics coordination, we provide the administrative and operational backbone your small business needs to thrive.",
    bullets: [
      "Process mapping & custom workflow automation",
      "Daily logistics oversight & shipment tracking",
      "Administrative backing & executive support plans",
      "Account structures & key performance metrics tracking"
    ]
  },
  tax_prep: {
    title: "Tax Preparation & Resolution",
    image: "/images/services/tax.webp",
    bgColor: "rgba(45, 111, 163, 0.15)",
    textColor: "#0A1E35",
    accentBg: "rgba(45, 111, 163, 0.2)",
    description: "Take the stress out of tax season. Our certified tax professionals deliver highly accurate filings, proactive deduction planning, corporate structuring recommendations, and reliable IRS representation.",
    bullets: [
      "Accurate Federal, State & Local corporate tax filings",
      "Proactive write-off audits & maximum savings analysis",
      "IRS notice response & audit resolution support",
      "Strategic LLC/C-Corp corporate structure reviews"
    ]
  },
  solar: {
    title: "Solar Energy Solutions",
    image: "/images/services/solar.webp",
    bgColor: "rgba(232, 114, 140, 0.15)",
    textColor: "#3D0A1E",
    accentBg: "rgba(232, 114, 140, 0.2)",
    description: "Future-proof your property and slash operational costs. We offer engineering, rooftop system installations, net metering integrations, and utility billing savings audits with our strict 'No-Gimmicks' guarantee.",
    bullets: [
      "Custom structural engineering & solar panel layouts",
      "Detailed utility bill consumption audits",
      "Local utility net metering & grid connection setup",
      "No-gimmicks performance & equipment warranties"
    ]
  },
  virtual_bookkeeping: {
    title: "Virtual Bookkeeping",
    image: "/images/services/bookkeeping.webp",
    bgColor: "rgba(63, 166, 114, 0.15)",
    textColor: "#0D2B1A",
    accentBg: "rgba(63, 166, 114, 0.2)",
    description: "Keep your numbers clear and tax-ready. We provide daily bank reconciliation, transaction categorization, and clean monthly financial statements so you always know your cash flow position.",
    bullets: [
      "Daily transaction importing & account categorization",
      "Comprehensive bank, credit card & loan reconciliation",
      "Monthly Balance Sheet & Income Statement generation",
      "Flawless year-end books preparation for your CPA"
    ]
  }
};

export default function ServiceDetailClient({ service }: { service: string }) {
  const auth = useAuth();
  const user = auth ? auth.user : null;

  const details = serviceDetailsData[service] || serviceDetailsData.procurement;

  const bookingUrl = user 
    ? `/dashboard?book=${service}` 
    : `/login?book=${service}`;

  return (
    <>
      <Background3D />
      <Navbar />
      
      <main className="w-full bg-[#FFFFFF] min-h-screen pt-[120px] pb-[80px] px-4 flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Faded Background Element (cid ele 1) */}
        <div 
          className="absolute left-0 top-0 w-full h-[600px] bg-cover bg-bottom bg-no-repeat z-0 pointer-events-none"
          style={{
            backgroundImage: "url('/images/hero.webp')"
          }}
        >
          <div className="absolute inset-0 bg-white/88 backdrop-blur-[2px]" />
        </div>

        {/* Premium Themed Glass Card Container */}
        <div className="relative w-full max-w-5xl bg-white/40 dark:bg-black/20 border border-slate-200/50 dark:border-white/10 rounded-[32px] shadow-2xl backdrop-blur-xl p-6 md:p-12 z-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left Side: Card Illustration */}
          <div className="md:col-span-5 w-full aspect-square relative rounded-[28px] overflow-hidden shadow-md border border-slate-100/30 bg-white">
            <Image 
              src={details.image} 
              alt={details.title} 
              fill 
              sizes="(max-width: 768px) 100vw, 400px"
              priority 
              className="object-cover rounded-[28px]"
            />
          </div>

          {/* Right Side: Details & Bullet Points */}
          <div className="md:col-span-7 flex flex-col justify-center text-left">
            {/* Themed Badge */}
            <div 
              className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5 w-max"
              style={{
                backgroundColor: details.bgColor,
                color: details.textColor,
              }}
            >
              Essential Service
            </div>

            {/* Gradient Title */}
            <h1 
              className="text-3xl md:text-4xl font-black tracking-tight mb-5 leading-tight"
              style={{
                fontFamily: "Inter, sans-serif",
                background: "linear-gradient(90deg, #5C1A0F 0%, #0A1E35 36.06%, #0D2B1A 64.9%, #3D0A1E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {details.title}
            </h1>

            {/* Overview Description */}
            <p className="text-slate-600 dark:text-slate-300 text-[14px] md:text-[16px] leading-relaxed mb-6 font-medium">
              {details.description}
            </p>

            {/* Bullets List */}
            <div className="space-y-3.5 mb-8">
              {details.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div 
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: details.accentBg }}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke={details.textColor} strokeWidth="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {bullet}
                  </span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link href={bookingUrl} className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-extrabold transition-all duration-300 bg-[#E85D3A] text-white hover:bg-[#C44A2A] hover:shadow-[0_6px_20px_rgba(232,93,58,0.3)] shadow-md text-center active:scale-[0.98]">
                Book Service Online
              </Link>
              <Link href="/services" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold transition-all duration-300 border border-slate-300 hover:border-slate-400 text-slate-700 dark:text-white text-center hover:bg-slate-50 dark:hover:bg-white/5 active:scale-[0.98]">
                Back to Services
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
