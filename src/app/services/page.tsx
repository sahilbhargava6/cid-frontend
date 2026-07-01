"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import { getServices, ServiceData } from "@/data/servicesData";

const Background3D = dynamic(() => import("@/components/Background3D"), {
  ssr: false,
});

interface ServiceInfo extends ServiceData {
  // Layout coordinates are already in ServiceData
}

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
  const [services, setServices] = useState<ServiceInfo[]>([]);

  const [showScheduler, setShowScheduler] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    setServices(getServices() as ServiceInfo[]);
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }
    for (let d = 1; d <= totalDays; d++) {
      days.push(new Date(year, month, d));
    }
    return days;
  };

  const isPastDate = (date: Date | null) => {
    if (!date) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const formatDateString = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  useEffect(() => {
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

  const activeData = activeService ? services.find(s => s.key === activeService) : null;
  const canvasHeight = activeService ? 1937 : 1080;

  return (
    <>
      <Background3D />
      <Navbar />
      
      <main className="w-full bg-[#FFFFFF] overflow-x-hidden min-h-screen">
        {/* ===== MOBILE & TABLET VIEW (< 1024px) ===== */}
        <div className="block lg:hidden pt-32 pb-20 px-4 sm:px-8 max-w-4xl mx-auto relative z-10">
          {/* Page Title */}
          <h1
            className="font-black text-4xl sm:text-5xl mb-8 select-none"
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

          {!activeService ? (
            /* Grid View */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {services.map((svc, i) => {
                const pillBgColors = [
                  "rgba(63, 166, 114, 0.15)",
                  "rgba(232, 80, 58, 0.15)",
                  "rgba(45, 111, 163, 0.15)",
                  "rgba(232, 114, 140, 0.15)",
                  "rgba(63, 166, 114, 0.15)",
                ];
                return (
                  <div
                    key={svc.key}
                    onClick={() => {
                      setActiveService(svc.key);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group rounded-3xl overflow-hidden bg-white/80 border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
                  >
                    <div className="w-full aspect-square relative overflow-hidden bg-slate-50 p-4 flex items-center justify-center">
                      <img
                        src={svc.image}
                        alt={svc.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div 
                      className="p-6 flex flex-col justify-between flex-1"
                      style={{ backgroundColor: pillBgColors[i] }}
                    >
                      <h3 
                        className="font-bold text-xl sm:text-2xl mb-4"
                        style={{ fontFamily: "Inter, sans-serif", color: svc.textColor }}
                      >
                        {svc.title}
                      </h3>
                      <button 
                        className="self-start px-5 py-2.5 rounded-full font-bold text-sm bg-white/90 hover:bg-white text-slate-800 shadow-sm transition-all flex items-center gap-2 group-hover:translate-x-1"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        <span>View Details</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Detail View */
            activeData && (
              <div className="space-y-8 animate-fade-in">
                {/* Back Button */}
                <button
                  onClick={() => setActiveService(null)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm sm:text-base transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  <span>All Services</span>
                </button>

                {/* Main Image */}
                <div className="w-full max-w-sm mx-auto aspect-square rounded-3xl overflow-hidden bg-slate-50 p-6 border border-slate-100 shadow-md flex items-center justify-center">
                  <img src={activeData.image} alt={activeData.title} className="w-full h-full object-contain" />
                </div>

                {/* Title Banner */}
                <div 
                  className="w-full py-5 px-6 rounded-2xl text-center shadow-sm"
                  style={{ backgroundColor: activeData.bgColor }}
                >
                  <h2 
                    className="font-bold text-2xl sm:text-3xl"
                    style={{ fontFamily: "Inter, sans-serif", color: activeData.textColor }}
                  >
                    {activeData.title}
                  </h2>
                </div>

                {/* Book a Session Section */}
                <div>
                  <h3 
                    className="font-bold text-2xl sm:text-3xl mb-4"
                    style={{ fontFamily: "Inter, sans-serif", color: activeData.headerColor }}
                  >
                    Book a Session
                  </h3>
                  <button
                    onClick={() => setShowScheduler(true)}
                    className="w-full p-6 sm:p-8 rounded-3xl flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] border border-slate-200/50"
                    style={{ backgroundColor: activeData.bgColor }}
                  >
                    <div className="font-light text-3xl sm:text-4xl mb-2" style={{ fontFamily: "Inter, sans-serif", color: activeData.textColor }}>
                      Find a Date
                    </div>
                    <div className="font-semibold text-sm sm:text-base opacity-85 flex items-center gap-2 mt-1" style={{ fontFamily: "Inter, sans-serif", color: activeData.textColor }}>
                      <span>Click to select your date & time slot</span>
                      <svg className="w-5 h-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </button>
                </div>

                {/* Description Section */}
                <div>
                  <h3 
                    className="font-bold text-2xl sm:text-3xl mb-4"
                    style={{ fontFamily: "Inter, sans-serif", color: activeData.headerColor }}
                  >
                    Description
                  </h3>
                  <div 
                    className="p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100/60 text-base sm:text-lg leading-relaxed font-light"
                    style={{ backgroundColor: activeData.bgColor, color: activeData.textColor, fontFamily: "Inter, sans-serif" }}
                  >
                    <BulletDescription
                      description={activeData.description}
                      headerColor={activeData.headerColor}
                      textColor={activeData.textColor}
                    />
                  </div>
                </div>

                {/* Mini Thumbnails */}
                <div className="pt-6 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">Switch Service</p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {services.map((svc) => (
                      <button
                        key={`thumb-mob-${svc.key}`}
                        onClick={() => {
                          setActiveService(svc.key);
                          setShowScheduler(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-14 h-14 rounded-2xl overflow-hidden border-2 transition-all p-1 bg-white shadow-sm ${
                          svc.key === activeService ? "scale-110 shadow-md" : "opacity-60 hover:opacity-100"
                        }`}
                        style={{
                          borderColor: svc.key === activeService ? activeData.headerColor : "transparent",
                        }}
                      >
                        <img src={svc.image} alt={svc.title} className="w-full h-full object-contain" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* ===== DESKTOP VIEW (>= 1024px) ===== */}
        <div className="hidden lg:flex items-start justify-center pt-0 overflow-hidden w-full">
          <div
            className="relative flex-shrink-0 select-none origin-top-left overflow-hidden"
            style={{
              width: `${1920 * scale}px`,
              height: `${canvasHeight * scale}px`
            }}
          >
            {/* Pixel-Perfect Canvas Container */}
            <div
              className="absolute top-0 left-0 select-none origin-top-left"
              style={{
                width: "1920px",
                height: `${canvasHeight}px`,
                transform: `scale(${scale})`
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
                      className="absolute w-[309px] h-[309px] rounded-[30px] overflow-hidden hover:scale-105 transition-all duration-500 z-10 cursor-pointer"
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
                    <button
                      key={`label-${svc.key}`}
                      onClick={() => {
                        setActiveService(svc.key);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="absolute font-semibold text-[24px] leading-[29px] flex items-center justify-center text-center z-15 hover:scale-105 transition-all duration-300 cursor-pointer bg-transparent border-0 p-0"
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
                    </button>
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

                  {/* Main Card Image */}
                  <div className="absolute left-[216px] top-[500px] w-[577px] h-[577px] rounded-[30px] overflow-hidden">
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
                  <button
                    onClick={() => {
                      setShowScheduler(true);
                    }}
                    className="absolute left-[834px] top-[841px] w-[870px] h-[236px] rounded-[30px] z-10 flex flex-col justify-center px-12 hover:bg-white/10 active:scale-[0.99] transition-all duration-300 cursor-pointer text-left border border-transparent hover:border-white/20 shadow-md"
                    style={{
                      backgroundColor: activeData.bgColor,
                    }}
                  >
                    <div
                      className="font-light text-[40px] leading-[48px]"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        color: activeData.textColor
                      }}
                    >
                      Find a Date
                    </div>
                    <div
                      className="font-semibold text-[20px] mt-3 opacity-85 flex items-center gap-2"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        color: activeData.textColor
                      }}
                    >
                      <span>Click to select your date & time slot</span>
                      <svg className="w-6 h-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </button>

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
          </div>
        </div>

        {/* Scheduler Modal Popup */}
        {showScheduler && activeData && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <div className="bg-white/95 border border-slate-200 shadow-2xl rounded-3xl p-6 sm:p-8 max-w-md w-full relative animate-scale-in text-slate-800 max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={() => setShowScheduler(false)}
                className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h3 className="text-xl font-black text-slate-900 mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
                Schedule Session
              </h3>

              <div className="space-y-6">
                {/* Custom Calendar Date Picker */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
                    Select Date
                  </label>
                  <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50">
                    <div className="flex items-center justify-between mb-4">
                      <button 
                        type="button"
                        onClick={handlePrevMonth}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <span className="font-bold text-sm text-slate-800">
                        {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                      </span>
                      <button 
                        type="button"
                        onClick={handleNextMonth}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-400 mb-2">
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
                        <div key={day}>{day}</div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {getDaysInMonth(currentMonth).map((day, idx) => {
                        if (!day) {
                          return <div key={`empty-${idx}`} />;
                        }
                        const dateStr = formatDateString(day);
                        const isSelected = selectedDate === dateStr;
                        const isPast = isPastDate(day);
                        return (
                          <button
                            key={dateStr}
                            type="button"
                            disabled={isPast}
                            onClick={() => setSelectedDate(dateStr)}
                            className={`h-9 w-full rounded-xl text-xs font-bold transition-all ${
                              isSelected
                                ? "bg-slate-900 text-white"
                                : isPast
                                  ? "text-slate-200 cursor-not-allowed"
                                  : "text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            {day.getDate()}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
                    Select Time Slot
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { time: "09:00 AM", label: "1 hr | $75" },
                      { time: "11:30 AM", label: "1 hr | $75" },
                      { time: "02:00 PM", label: "1.5 hr | $110" },
                      { time: "04:30 PM", label: "1.5 hr | $110" }
                    ].map(({ time, label }) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 rounded-xl border font-bold text-xs transition-all duration-200 flex flex-col items-center justify-center gap-1 ${
                          selectedTime === time
                            ? "bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-900/10"
                            : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                        }`}
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        <span>{time}</span>
                        <span className={`text-[10px] opacity-75 font-semibold ${selectedTime === time ? "text-white" : "text-slate-400"}`}>{label}</span>
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
                  className="w-full py-4 text-white font-extrabold text-[16px] rounded-full shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] mt-6 cursor-pointer"
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
