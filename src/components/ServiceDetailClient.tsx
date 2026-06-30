"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ServiceDetail {
  title: string;
  image: string;
  bgColor: string;
  textColor: string;
  headerColor: string;
  description: string;
}

const serviceDetailsData: Record<string, ServiceDetail> = {
  procurement: {
    title: "Procurement & Sourcing Services",
    image: "/images/services/Procurement.webp",
    bgColor: "rgba(63, 166, 114, 0.2)",
    textColor: "#0D2B1A",
    headerColor: "#3FA672",
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
    headerColor: "#E8503A",
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
    headerColor: "#2D6FA3",
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
    headerColor: "#E8728C",
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
    headerColor: "#3FA672",
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

  const dashboardPath = user
    ? (user.email.includes("admin") || user.email.includes("owner")
      ? "/admin/dashboard"
      : "/dashboard")
    : "/login";

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
      <Navbar />
      <main 
        className="w-full min-h-screen bg-[#FFFFFF] overflow-x-hidden flex items-start justify-center pt-[120px]"
        style={{
          paddingBottom: `${(2080 - 2080 * scale)}px` // Prevent scaling clipping issues for 2080px canvas height
        }}
      >
        {/* 1920x2080 Pixel-Perfect Canvas Container */}
        <div 
          className="relative flex-shrink-0 select-none origin-top-left"
          style={{
            width: "1920px",
            height: "2080px",
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
          className="absolute left-[216px] top-[230px] w-[315px] h-[170px] font-black text-[64px] leading-[77px] flex items-center select-none"
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

        {/* Main Card Image */}
        <Link href="/services" className="absolute left-[216px] top-[643px] w-[577px] h-[577px] rounded-[30px] overflow-hidden shadow-lg border border-slate-100/50 hover:scale-[1.02] transition-all duration-300 z-10 cursor-pointer bg-white">
          <img 
            src={details.image} 
            alt={details.title} 
            className="w-full h-full object-cover"
          />
        </Link>

        {/* Title Backing (Rectangle 6) */}
        <div 
          className="absolute left-[994px] top-[738px] w-[662px] h-[123px] rounded-[30px] z-10"
          style={{
            backgroundColor: details.bgColor,
          }}
        />

        {/* Title Text (Procurement & Sourcing Services) */}
        <div 
          className="absolute left-[1019px] top-[775px] w-[613px] h-[44px] font-semibold text-[36px] leading-[44px] flex items-center justify-center text-center z-15"
          style={{
            fontFamily: "Inter, sans-serif",
            color: details.textColor
          }}
        >
          {details.title}
        </div>

        {/* Book a Session Title */}
        <h3 
          className="absolute left-[834px] top-[879px] w-[331px] h-[105px] font-semibold text-[40px] leading-[48px] flex items-center z-10"
          style={{
            fontFamily: "Inter, sans-serif",
            color: details.headerColor
          }}
        >
          Book a Session
        </h3>

        {/* Date Card Backing (Rectangle 7) */}
        <div 
          className="absolute left-[834px] top-[984px] w-[870px] h-[236px] rounded-[30px] z-10"
          style={{
            backgroundColor: details.bgColor,
          }}
        />

        {/* Find a Date Text */}
        <div 
          className="absolute left-[886px] top-[1002px] w-[695px] h-[84px] font-light text-[32px] leading-[39px] flex items-center z-15"
          style={{
            fontFamily: "Inter, sans-serif",
            color: details.textColor
          }}
        >
          Find a Date
        </div>

        {/* Date Options Links */}
        {["This Week", "6-12 July", "13-19 July", "20-26 July"].map((dateVal, index) => {
          const leftCoords = [886, 1076, 1266, 1475];
          const bookingUrl = user 
            ? `/dashboard?book=${service}&date=${encodeURIComponent(dateVal)}` 
            : `/login?book=${service}&date=${encodeURIComponent(dateVal)}`;
          
          return (
            <Link 
              key={dateVal}
              href={bookingUrl}
              className="absolute w-[179px] h-[84px] top-[1088px] font-light text-[32px] leading-[39px] flex items-center justify-center text-center cursor-pointer hover:bg-white/30 rounded-xl transition-colors duration-200 z-15 border border-transparent hover:border-white/10"
              style={{
                left: `${leftCoords[index]}px`,
                fontFamily: "Inter, sans-serif",
                color: details.textColor
              }}
            >
              {dateVal}
            </Link>
          );
        })}

        {/* Description Title */}
        <h3 
          className="absolute left-[216px] top-[1222px] w-[331px] h-[105px] font-semibold text-[40px] leading-[48px] flex items-center z-10"
          style={{
            fontFamily: "Inter, sans-serif",
            color: details.headerColor
          }}
        >
          Description
        </h3>

        {/* Description Box Backing (Rectangle 8) */}
        <div 
          className="absolute left-[216px] top-[1327px] w-[1488px] h-[716px] rounded-[30px] z-10"
          style={{
            backgroundColor: details.bgColor,
          }}
        />

        {/* Description Detailed Content Text */}
        <div 
          className="absolute left-[273px] top-[1362px] w-[1386px] h-[637px] font-light text-[32px] leading-[39px] flex items-center z-15 whitespace-pre-line"
          style={{
            fontFamily: "Inter, sans-serif",
            color: details.textColor
          }}
        >
          {details.description}
        </div>

      </div>
    </main>
    <Footer />
  </>
);
}
