"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getServiceByKey, ServiceData } from "@/data/servicesData";

export default function ServiceDetailClient({ service }: { service: string }) {
  const auth = useAuth();
  const user = auth ? auth.user : null;
  const [scale, setScale] = useState(1);
  const [leftOffset, setLeftOffset] = useState(0);

  const [showScheduler, setShowScheduler] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  
  const [currentMonth, setCurrentMonth] = useState(new Date());

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

  const details = getServiceByKey(service) || getServiceByKey('procurement')!;

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
        className="w-full min-h-screen bg-[#FFFFFF] overflow-x-hidden flex items-start justify-center pt-0 relative"
        style={{
          paddingBottom: `${(1937 - 1937 * scale)}px` // Prevent scaling clipping issues for 1937px canvas height
        }}
      >
        {/* 1920x1937 Pixel-Perfect Canvas Container */}
        <div 
          className="relative flex-shrink-0 select-none origin-top-left"
          style={{
            width: "1920px",
            height: "1937px",
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
          className="absolute left-[216px] top-[160px] w-[315px] h-[170px] font-black text-[64px] leading-[77px] flex items-center select-none"
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
        <Link href="/services" className="absolute left-[216px] top-[500px] w-[577px] h-[577px] rounded-[30px] overflow-hidden shadow-lg hover:scale-[1.02] transition-all duration-300 z-10 cursor-pointer bg-transparent">
          <img 
            src={details.image} 
            alt={details.title} 
            className="w-full h-full object-cover"
          />
        </Link>

        {/* Title Backing (Rectangle 6) */}
        <div 
          className="absolute left-[994px] top-[595px] w-[662px] h-[123px] rounded-[30px] z-10"
          style={{
            backgroundColor: details.bgColor,
          }}
        />

        {/* Title Text (Procurement & Sourcing Services) */}
        <div 
          className="absolute left-[1019px] top-[632px] w-[613px] h-[44px] font-semibold text-[36px] leading-[44px] flex items-center justify-center text-center z-15"
          style={{
            fontFamily: "Inter, sans-serif",
            color: details.textColor
          }}
        >
          {details.title}
        </div>

        {/* Book a Session Title */}
        <h3 
          className="absolute left-[834px] top-[736px] w-[331px] h-[105px] font-semibold text-[40px] leading-[48px] flex items-center z-10"
          style={{
            fontFamily: "Inter, sans-serif",
            color: details.headerColor
          }}
        >
          Book a Session
        </h3>

        {/* Date Card Backing (Rectangle 7) - Interactive Clickable */}
        <button 
          onClick={() => {
            setShowScheduler(true);
          }}
          className="absolute left-[834px] top-[841px] w-[870px] h-[236px] rounded-[30px] z-10 flex flex-col justify-center px-12 hover:bg-white/10 active:scale-[0.99] transition-all duration-300 cursor-pointer text-left border border-transparent hover:border-white/20 shadow-md"
          style={{
            backgroundColor: details.bgColor,
          }}
        >
          <div 
            className="font-light text-[40px] leading-[48px]"
            style={{
              fontFamily: "Inter, sans-serif",
              color: details.textColor
            }}
          >
            Find a Date
          </div>
          <div 
            className="font-semibold text-[20px] mt-3 opacity-85 flex items-center gap-2"
            style={{
              fontFamily: "Inter, sans-serif",
              color: details.textColor
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
          style={{
            fontFamily: "Inter, sans-serif",
            color: details.headerColor
          }}
        >
          Description
        </h3>

        {/* Description Box Backing (Rectangle 8) */}
        <div 
          className="absolute left-[216px] top-[1184px] w-[1488px] h-[716px] rounded-[30px] z-10"
          style={{
            backgroundColor: details.bgColor,
          }}
        />

        {/* Description Detailed Content Text */}
        <div 
          className="absolute left-[273px] top-[1219px] w-[1386px] h-[637px] font-light text-[28px] leading-[38px] z-15 overflow-y-auto pr-4"
          style={{
            fontFamily: "Inter, sans-serif",
            color: details.textColor
          }}
        >
          {details.description.split('\n').filter(line => line.trim()).map((line, idx) => {
            const trimmed = line.trim();
            const isBullet = trimmed.startsWith('·');
            const text = isBullet ? trimmed.slice(1).trim() : trimmed;
            
            if (isBullet) {
              const colonIdx = text.indexOf(':');
              return (
                <div key={idx} className="flex gap-3 mb-5">
                  <span className="flex-shrink-0 mt-[6px] w-[10px] h-[10px] rounded-full" style={{ backgroundColor: details.headerColor }} />
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
            return <p key={idx} className="mb-4">{text}</p>;
          })}
        </div>

      </div>

      {/* Scheduler Modal Popup */}
      {showScheduler && (
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
                  // Redirect to login or dashboard
                  const nextUrl = user
                    ? `/dashboard?book=${service}&date=${selectedDate}&time=${encodeURIComponent(selectedTime)}&payment=true`
                    : `/login?book=${service}&date=${selectedDate}&time=${encodeURIComponent(selectedTime)}&payment=true`;
                  window.location.href = nextUrl;
                }}
                className="w-full py-4 text-white font-extrabold text-[16px] rounded-full shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] mt-6"
                style={{
                  backgroundColor: details.headerColor,
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
