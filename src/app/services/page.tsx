"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";

const Background3D = dynamic(() => import("@/components/Background3D"), {
  ssr: false,
});

interface ServiceInfo {
  key: string;
  title: string;
  image: string;
  bgColor: string;
  textColor: string;
  headerColor: string;
  description: string;
  left: number;
  top: number;
  pillLeft: number;
  pillLabelLeft: number;
  pillLabelTop: number;
  pillLabelWidth: number;
  pillLabelHeight: number;
}

const services: ServiceInfo[] = [
  {
    key: "procurement",
    title: "Procurement & Sourcing Services",
    image: "/images/services/Procurement.webp",
    bgColor: "rgba(63, 166, 114, 0.2)",
    textColor: "#0D2B1A",
    headerColor: "#3FA672",
    description: `· Vendor Negotiation & Cost Optimization: Looking to buy a car or any large household item and do not want to haggle? Our Experts leverage supply chain knowledge to negotiate the best rates and quality for items, ensuring you get the right products at the right time without overpaying.
· Personalized Errand Services: Dedicated assistants can manage your weekly grocery shopping, pick up prescriptions at local pharmacies, and handle routine post office tasks right in the Lake Hopatcong area.
· Specialized Product Sourcing: Need a specific mobility aid, home medical equipment, or hard-to-find household item? Professionals can source, negotiate prices, and arrange delivery directly to your door.
· Home Setup and Management: Sourcing services can help procure household services such as meal preparation, light housekeeping, and professional organizing tailored specifically to your lifestyle and physical needs.
· Concierge and Transportation: Beyond sourcing goods, these services coordinate and provide door-to-door transportation to medical appointments, social events, and family visits, ensuring safe and reliable travel.`,
    left: 166, top: 360, pillLeft: 166, pillLabelLeft: 222, pillLabelTop: 732, pillLabelWidth: 189, pillLabelHeight: 111,
  },
  {
    key: "accounts_and_logistics",
    title: "Small Business Management Solutions",
    image: "/images/services/business.webp",
    bgColor: "rgba(232, 80, 58, 0.2)",
    textColor: "#5C1A0F",
    headerColor: "#E8503A",
    description: `· Insufficient Capital and Cash Flow: Many businesses close their doors simply because they run out of contingency cash or face poor cash flow. Balancing incoming revenue with expenses requires meticulous tracking to avoid sinking.
· Difficulty Finding and Keeping Customers: Standing out in a crowded market and maintaining a steady stream of clients is a persistent struggle.
· Rising Costs and Complexities: Coping with inflation, shifting economic conditions, and the need to integrate costly software can overwhelm limited operational bandwidth.
· Attracting and Retaining Key Talent: Competing for skilled employees is tough. Small businesses must focus on building a unique company culture to make up for lacking the resources of larger corporations.
· Stagnating Growth and Scalability: Many businesses get stuck relying on the same small pool of existing customers. Successfully scaling up requires clear planning, better Biz2Credit strategies, and overcoming fragmented fulfillment.`,
    left: 486, top: 365, pillLeft: 490, pillLabelLeft: 531, pillLabelTop: 732, pillLabelWidth: 218, pillLabelHeight: 111,
  },
  {
    key: "tax_prep",
    title: "Tax Preparation & Resolution for Individuals and LLCs",
    image: "/images/services/tax.webp",
    bgColor: "rgba(45, 111, 163, 0.2)",
    textColor: "#0A1E35",
    headerColor: "#2D6FA3",
    description: `· Separate your personal and business finances immediately. Maintain dedicated bank accounts and credit cards for your LLC to preserve your limited liability protection.
· Track every potential deduction with digital receipts. Capture expenses like home office costs, vehicle mileage, and equipment purchases using apps like QuickBooks Online or Expensify.
· Calculate and pay your quarterly estimated taxes. Avoid underpayment penalties by submitting quarterly payments to the IRS and state via the IRS EFTPS portal.
· Choose the optimal tax classification for your LLC. Evaluate whether filing as a Sole Proprietor, Partnership, S-Corp, or C-Corp minimizes your self-employment tax burden.
· Gather all annual tax documentation early. Collect forms like W-2s, 1099s, K-1s, and business financial statements before scheduling time with a tax professional.`,
    left: 807, top: 365, pillLeft: 811, pillLabelLeft: 851, pillLabelTop: 751, pillLabelWidth: 220, pillLabelHeight: 74,
  },
  {
    key: "solar",
    title: "Solar Energy Solutions",
    image: "/images/services/solar.webp",
    bgColor: "rgba(232, 114, 140, 0.2)",
    textColor: "#3D0A1E",
    headerColor: "#E8728C",
    description: `Have questions about Solar Energy Solutions? We can answer all questions you have about Solar and clear any misconceptions you have:
· Are they really free?
· Do they increase property taxes?
· Do they work during blackouts?
· Is there still a federal tax credit?

Our team provides expert guidance on residential and commercial solar installations, helping you understand the true costs, savings, and incentives available in your area.`,
    left: 1127, top: 365, pillLeft: 1132, pillLabelLeft: 1191, pillLabelTop: 751, pillLabelWidth: 184, pillLabelHeight: 74,
  },
  {
    key: "virtual_bookkeeping",
    title: "Virtual Bookkeeping",
    image: "/images/services/bookkeeping.webp",
    bgColor: "rgba(63, 166, 114, 0.2)",
    textColor: "#0D2B1A",
    headerColor: "#3FA672",
    description: `· Leverage accountant-specific software versions. Use dedicated platforms like QuickBooks Online Accountant or Xero HQ to manage multiple client files from a single dashboard.
· Charge fixed monthly value pricing. Avoid hourly billing by charging flat monthly fees based on transaction volume and the number of bank accounts you reconcile.
· Implement a strict security protocol. Secure client bank data by using password managers like 1Password and requiring multi-factor authentication (MFA) on all financial accounts.
· Establish strict document collection deadlines. Inform clients that missing receipts or statements not uploaded to portals like Hubdoc by your monthly cutoff will delay their financial reporting.`,
    left: 1444, top: 365, pillLeft: 1453, pillLabelLeft: 1516, pillLabelTop: 747, pillLabelWidth: 183, pillLabelHeight: 74,
  },
];

function BulletDescription({ description, headerColor, textColor }: { description: string; headerColor: string; textColor: string }) {
  return (
    <>
      {description.split('\n').filter(line => line.trim()).map((line, idx) => {
        const trimmed = line.trim();
        const isBullet = trimmed.startsWith('·');
        const text = isBullet ? trimmed.slice(1).trim() : trimmed;

        if (isBullet) {
          const colonIdx = text.indexOf(':');
          return (
            <div key={idx} className="flex gap-3 mb-4">
              <span className="flex-shrink-0 mt-[6px] w-[10px] h-[10px] rounded-full" style={{ backgroundColor: headerColor }} />
              <p className="flex-1">
                {colonIdx > -1 ? (
                  <>
                    <span className="font-semibold">{text.slice(0, colonIdx + 1)}</span>
                    {text.slice(colonIdx + 1)}
                  </>
                ) : text}
              </p>
            </div>
          );
        }
        return <p key={idx} className="mb-3">{text}</p>;
      })}
    </>
  );
}

export default function ServicesPage() {
  const auth = useAuth();
  const user = auth ? auth.user : null;
  const [scale, setScale] = useState(1);
  const [leftOffset, setLeftOffset] = useState(0);
  const [activeService, setActiveService] = useState<string | null>(null);

  const [showScheduler, setShowScheduler] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

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

  const activeData = activeService ? services.find(s => s.key === activeService) : null;
  const canvasHeight = activeService ? 1937 : 1080;

  return (
    <>
      <Background3D />
      <Navbar />
      <main
        className="w-full bg-[#FFFFFF] overflow-x-hidden flex items-start justify-center pt-0"
        style={{
          paddingBottom: `${(canvasHeight - canvasHeight * scale)}px`
        }}
      >
        {/* Pixel-Perfect Canvas Container */}
        <div
          className="relative flex-shrink-0 select-none origin-top-left"
          style={{
            width: "1920px",
            height: `${canvasHeight}px`,
            transform: `scale(${scale})`,
            left: `${leftOffset}px`
          }}
        >
          {/* Faded Background Element */}
          <div
            className="absolute left-0 top-0 w-[1920px] h-[800px] bg-cover bg-bottom bg-no-repeat z-0"
            style={{ backgroundImage: "url('/images/hero.webp')" }}
          >
            <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px]" />
          </div>

          {/* Page Header */}
          <h1
            className="absolute left-[166px] top-[160px] w-[315px] h-[170px] font-black text-[64px] leading-[77px] flex items-center select-none"
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

          {/* ===== GRID VIEW (no service selected) ===== */}
          {!activeService && (
            <>
              {/* Service Cards */}
              {services.map((svc) => (
                <button
                  key={svc.key}
                  onClick={() => {
                    setActiveService(svc.key);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="absolute w-[309px] h-[309px] rounded-[30px] overflow-hidden shadow-lg border border-slate-100/50 hover:scale-105 transition-all duration-500 z-10 cursor-pointer bg-white p-0"
                  style={{ left: `${svc.left}px`, top: `${svc.top}px` }}
                >
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}

              {/* Pill Backings */}
              {services.map((svc, i) => {
                const pillBgColors = [
                  "rgba(63, 166, 114, 0.2)",
                  "rgba(232, 80, 58, 0.2)",
                  "rgba(45, 111, 163, 0.2)",
                  "rgba(232, 114, 140, 0.2)",
                  "rgba(63, 166, 114, 0.2)",
                ];
                return (
                  <div
                    key={`pill-${svc.key}`}
                    className="absolute w-[300px] h-[157px] rounded-[30px] z-10"
                    style={{ left: `${svc.pillLeft}px`, top: "711px", backgroundColor: pillBgColors[i] }}
                  />
                );
              })}

              {/* Pill Text Labels */}
              {services.map((svc) => (
                <div
                  key={`label-${svc.key}`}
                  className="absolute font-semibold text-[24px] leading-[29px] flex items-center justify-center text-center z-15"
                  style={{
                    left: `${svc.pillLabelLeft}px`,
                    top: `${svc.pillLabelTop}px`,
                    width: `${svc.pillLabelWidth}px`,
                    height: `${svc.pillLabelHeight}px`,
                    fontFamily: "Inter, sans-serif",
                    color: svc.textColor,
                  }}
                >
                  {svc.title}
                </div>
              ))}
            </>
          )}

          {/* ===== DETAIL VIEW (service selected) ===== */}
          {activeService && activeData && (
            <>
              {/* Back Button */}
              <button
                onClick={() => setActiveService(null)}
                className="absolute left-[216px] top-[340px] z-20 flex items-center gap-3 px-5 py-3 rounded-full transition-all duration-300 hover:bg-black/5 cursor-pointer group"
              >
                <svg className="w-6 h-6 transition-transform group-hover:-translate-x-1" style={{ color: activeData.headerColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <span className="font-bold text-[20px]" style={{ color: activeData.headerColor, fontFamily: "Inter, sans-serif" }}>
                  All Services
                </span>
              </button>

              {/* Mini Thumbnails Row */}
              <div className="absolute left-[600px] top-[345px] flex gap-4 z-20">
                {services.map((svc) => (
                  <button
                    key={`thumb-${svc.key}`}
                    onClick={() => {
                      setActiveService(svc.key);
                      setShowScheduler(false);
                    }}
                    className={`w-[60px] h-[60px] rounded-[14px] overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                      svc.key === activeService
                        ? "border-opacity-100 scale-110 shadow-lg"
                        : "border-transparent opacity-50 hover:opacity-100 hover:scale-105"
                    }`}
                    style={{
                      borderColor: svc.key === activeService ? activeData.headerColor : "transparent",
                    }}
                  >
                    <img src={svc.image} alt={svc.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Main Card Image (matches ServiceDetailClient: 577x577) */}
              <div
                className="absolute left-[216px] top-[500px] w-[577px] h-[577px] rounded-[30px] overflow-hidden shadow-lg border border-slate-100/50 z-10 bg-white"
              >
                <img
                  src={activeData.image}
                  alt={activeData.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title Backing (Rectangle 6) */}
              <div
                className="absolute left-[994px] top-[595px] w-[662px] h-[123px] rounded-[30px] z-10"
                style={{ backgroundColor: activeData.bgColor }}
              />

              {/* Title Text */}
              <div
                className="absolute left-[1019px] top-[632px] w-[613px] h-[44px] font-semibold text-[36px] leading-[44px] flex items-center justify-center text-center z-15"
                style={{ fontFamily: "Inter, sans-serif", color: activeData.textColor }}
              >
                {activeData.title}
              </div>

              {/* Book a Session Title */}
              <h3
                className="absolute left-[834px] top-[736px] w-[331px] h-[105px] font-semibold text-[40px] leading-[48px] flex items-center z-10"
                style={{ fontFamily: "Inter, sans-serif", color: activeData.headerColor }}
              >
                Book a Session
              </h3>

              {/* Date Card Backing (Rectangle 7) */}
              <div
                className="absolute left-[834px] top-[841px] w-[870px] h-[236px] rounded-[30px] z-10"
                style={{ backgroundColor: activeData.bgColor }}
              />

              {/* Find a Date Text */}
              <div
                className="absolute left-[886px] top-[859px] w-[695px] h-[84px] font-light text-[32px] leading-[39px] flex items-center z-15"
                style={{ fontFamily: "Inter, sans-serif", color: activeData.textColor }}
              >
                Find a Date
              </div>

              {/* Date Options Buttons */}
              {["This Week", "6-12 July", "13-19 July", "20-26 July"].map((dateVal, index) => {
                const leftCoords = [886, 1076, 1266, 1475];
                return (
                  <button
                    key={dateVal}
                    onClick={() => {
                      setSelectedWeek(dateVal);
                      setShowScheduler(true);
                    }}
                    className="absolute w-[179px] h-[84px] top-[945px] font-light text-[32px] leading-[39px] flex items-center justify-center text-center cursor-pointer hover:bg-white/30 rounded-xl transition-colors duration-200 z-15 border border-transparent hover:border-white/10"
                    style={{
                      left: `${leftCoords[index]}px`,
                      fontFamily: "Inter, sans-serif",
                      color: activeData.textColor
                    }}
                  >
                    {dateVal}
                  </button>
                );
              })}

              {/* Description Title */}
              <h3
                className="absolute left-[216px] top-[1079px] w-[331px] h-[105px] font-semibold text-[40px] leading-[48px] flex items-center z-10"
                style={{ fontFamily: "Inter, sans-serif", color: activeData.headerColor }}
              >
                Description
              </h3>

              {/* Description Box Backing (Rectangle 8) */}
              <div
                className="absolute left-[216px] top-[1184px] w-[1488px] h-[716px] rounded-[30px] z-10"
                style={{ backgroundColor: activeData.bgColor }}
              />

              {/* Description Detailed Content Text */}
              <div
                className="absolute left-[273px] top-[1219px] w-[1386px] h-[637px] font-light text-[28px] leading-[38px] z-15 overflow-y-auto pr-4"
                style={{ fontFamily: "Inter, sans-serif", color: activeData.textColor }}
              >
                <BulletDescription
                  description={activeData.description}
                  headerColor={activeData.headerColor}
                  textColor={activeData.textColor}
                />
              </div>
            </>
          )}
        </div>

        {/* Scheduler Modal Popup */}
        {showScheduler && activeData && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <div className="bg-white/95 border border-slate-200 shadow-2xl rounded-3xl p-8 max-w-md w-full relative animate-scale-in text-slate-800">
              {/* Close Button */}
              <button
                onClick={() => setShowScheduler(false)}
                className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h3 className="text-xl font-black text-slate-900 mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
                Schedule Session
              </h3>
              <p className="text-xs text-slate-500 mb-6 font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
                Selected Week: {selectedWeek}
              </p>

              <div className="space-y-6">
                {/* Date Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
                    Select Date
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 font-semibold"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>

                {/* Time Slots */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
                    Select Time Slot
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"].map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`py-3 rounded-xl border font-bold text-xs transition-all duration-200 ${
                          selectedTime === t
                            ? "bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-900/10"
                            : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                        }`}
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Proceed Button */}
                <button
                  onClick={() => {
                    if (!selectedDate || !selectedTime) {
                      alert("Please select both a date and a time slot.");
                      return;
                    }
                    const nextUrl = user
                      ? `/dashboard?book=${activeService}&date=${selectedDate}&time=${encodeURIComponent(selectedTime)}&payment=true`
                      : `/login?book=${activeService}&date=${selectedDate}&time=${encodeURIComponent(selectedTime)}&payment=true`;
                    window.location.href = nextUrl;
                  }}
                  className="w-full py-4 text-white font-extrabold text-[16px] rounded-full shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] mt-6"
                  style={{
                    backgroundColor: activeData.headerColor,
                    fontFamily: "Inter, sans-serif"
                  }}
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
