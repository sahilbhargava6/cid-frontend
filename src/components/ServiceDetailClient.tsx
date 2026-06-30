"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
}

const serviceDetailsData: Record<string, ServiceDetail> = {
  procurement: {
    title: "Procurement & Sourcing Services",
    image: "/images/services/Procurement.webp",
    bgColor: "rgba(63, 166, 114, 0.2)",
    textColor: "#0D2B1A",
    accentBg: "rgba(63, 166, 114, 0.1)",
    description: `Find a Vendor Negotiation & Cost Optimization: looking to buy a car or any large household item and do not want to haggle - Our Experts leverage supply chain knowledge to negotiate the best rates and quality for items, ensuring you get the right products at the right time without overpaying.
· Personalized Errand Services: Dedicated assistants can manage your weekly grocery shopping, pick up prescriptions at local pharmacies, and handle routine post office tasks right in the Lake Hopatcong area.
· Specialized Product Sourcing: Need a specific mobility aid, home medical equipment, or hard-to-find household item? Professionals can source, negotiate prices, and arrange delivery directly to your door.
· Home Setup and Management: Sourcing services can help procure household services such as meal preparation, light housekeeping, and professional organizing tailored specifically to your lifestyle and physical needs.
· Concierge and Transportation: Beyond sourcing goods, these services coordinate and provide door-to-door transportation to medical appointments, social events, and family visits, ensuring safe and reliable travel.`,
  },
  accounts_and_logistics: {
    title: "Small Business Management Solutions",
    image: "/images/services/business.webp",
    bgColor: "rgba(232, 80, 58, 0.2)",
    textColor: "#5C1A0F",
    accentBg: "rgba(232, 80, 58, 0.1)",
    description: `· Administrative Support: Free up your business by outsourcing email management, scheduling, document preparation, and customer correspondence to our professional administrative team.
· Workflow Optimization: We audit your business workflows, install modern SaaS tools, automate repetitive tasks, and design SOPs to make operations run smoothly and efficiently.
· Logistics Coordination: Handling dispatching, inventory count tracking, freight negotiations, and third-party warehouse communications to keep your supply chain moving.
· Invoicing & Billing: Setting up clean invoicing schedules, chasing overdue accounts, and integrating payment processors like Stripe or QuickBooks for seamless cashflow management.`,
  },
  tax_prep: {
    title: "Tax Preparation & Resolution",
    image: "/images/services/tax.webp",
    bgColor: "rgba(45, 111, 163, 0.2)",
    textColor: "#0A1E35",
    accentBg: "rgba(45, 111, 163, 0.1)",
    description: `· Federal & State Filings: Professional year-end tax returns preparation for individuals, partnerships, LLCs, and corporations, ensuring absolute compliance with all tax codes.
· Proactive Deductions Planning: Custom analysis of your business expenses, investments, and structures to legally minimize tax liabilities and maximize write-offs.
· IRS Representation: Active support in responding to IRS notices, back-tax negotiations, installment agreements, and complete audit protection.
· Corporate Structuring: Helping you choose and transition to the most tax-efficient business structures (e.g. S-Corp election) for your long-term growth.`,
  },
  solar: {
    title: "Solar Energy Solutions",
    image: "/images/services/solar.webp",
    bgColor: "rgba(232, 114, 140, 0.2)",
    textColor: "#3D0A1E",
    accentBg: "rgba(232, 114, 140, 0.1)",
    description: `· Custom Panel System Designs: Engineering state-of-the-art rooftop solar layouts custom-fit for your property's structure and sun exposure.
· Energy Savings Audit: Deep historical utility bill analysis to calculate your exact return on investment and payback period before signing.
· Net Metering Integration: Setting up net energy metering (NEM) so you can sell excess solar electricity back to the utility grid for credit.
· Local Rebates & Incentives: Managing federal tax credits (ITC), state solar rebates, and property tax exemptions for maximum savings.`,
  },
  virtual_bookkeeping: {
    title: "Virtual Bookkeeping",
    image: "/images/services/bookkeeping.webp",
    bgColor: "rgba(63, 166, 114, 0.2)",
    textColor: "#0D2B1A",
    accentBg: "rgba(63, 166, 114, 0.1)",
    description: `· Transaction Tracking: Importing, categorizing, and matching all bank and credit card transactions to keep your general ledger updated and accurate.
· Account Reconciliations: Monthly reconciliation of cash accounts, credit cards, merchant processors (PayPal/Square), and business loans.
· Financial Statements: Delivering clean, easy-to-read Balance Sheets, Income Statements, and Cash Flow Reports on the 5th of every month.
· Year-End CPA Packaging: Exporting organized ledgers and receipts packages directly to your tax accountant for a painless filing experience.`,
  }
};

export default function ServiceDetailClient({ service }: { service: string }) {
  const auth = useAuth();
  const user = auth ? auth.user : null;
  const [scale, setScale] = useState(1);
  const [leftOffset, setLeftOffset] = useState(0);

  const details = serviceDetailsData[service] || serviceDetailsData.procurement;

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
          paddingBottom: `${(1250 - 1250 * scale)}px` // Prevent scaling clipping whitespace issues
        }}
      >
        {/* 1920x1250 Pixel-Perfect Canvas Container */}
        <div 
          className="relative flex-shrink-0 select-none origin-top-left"
          style={{
            width: "1920px",
            height: "1250px",
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

          {/* Header Title: Services */}
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

          {/* Left Side: Card Illustration */}
          <Link href="/services" className="absolute left-[166px] top-[490px] w-[309px] h-[309px] rounded-[30px] overflow-hidden shadow-lg border border-slate-100 hover:scale-[1.03] transition-transform duration-300 z-10 cursor-pointer bg-white">
            <img 
              src={details.image} 
              alt={details.title} 
              className="w-full h-full object-cover"
            />
          </Link>

          {/* Title Pill Container (Rectangle next to image) */}
          <div 
            className="absolute left-[520px] top-[490px] w-[500px] h-[86px] rounded-[24px] z-10 flex items-center justify-center px-6 shadow-sm"
            style={{
              backgroundColor: details.bgColor,
            }}
          >
            <span 
              className="font-extrabold text-[24px] leading-[29px] text-center"
              style={{
                fontFamily: "Inter, sans-serif",
                color: details.textColor
              }}
            >
              {details.title}
            </span>
          </div>

          {/* Book a Session Title */}
          <h3 
            className="absolute left-[520px] top-[600px] font-bold text-[28px] leading-[34px]"
            style={{
              fontFamily: "Inter, sans-serif",
              color: "#2E7D52"
            }}
          >
            Book a Session
          </h3>

          {/* Date Selector Card Container */}
          <div 
            className="absolute left-[520px] top-[650px] w-[600px] h-[145px] rounded-[24px] z-10 p-5 shadow-sm border border-slate-100/50"
            style={{
              backgroundColor: details.accentBg
            }}
          >
            <div className="text-[16px] font-semibold text-slate-500 mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
              Find a Date
            </div>
            
            <div className="flex items-center gap-4">
              {["This Week", "6-12 July", "13-19 July", "20-26 July"].map((dateVal) => {
                const bookingUrl = user 
                  ? `/dashboard?book=${service}&date=${encodeURIComponent(dateVal)}` 
                  : `/login?book=${service}&date=${encodeURIComponent(dateVal)}`;
                return (
                  <Link 
                    key={dateVal}
                    href={bookingUrl}
                    className="px-4 py-2 bg-white/70 hover:bg-white text-slate-700 font-semibold text-[15px] rounded-lg shadow-sm transition-all hover:scale-[1.03] active:scale-[0.98] border border-slate-200/50"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {dateVal}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Description Section Header */}
          <h3 
            className="absolute left-[166px] top-[835px] font-bold text-[28px] leading-[34px]"
            style={{
              fontFamily: "Inter, sans-serif",
              color: "#2E7D52"
            }}
          >
            Description
          </h3>

          {/* Large Description Box */}
          <div 
            className="absolute left-[166px] top-[885px] w-[954px] min-h-[280px] rounded-[24px] z-10 p-7 shadow-sm border border-slate-100/50"
            style={{
              backgroundColor: details.accentBg
            }}
          >
            <p 
              className="text-[16px] leading-[26px] font-semibold whitespace-pre-line"
              style={{
                fontFamily: "Inter, sans-serif",
                color: details.textColor
              }}
            >
              {details.description}
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
