"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const consent = localStorage.getItem("cid_cookie_consent");
      if (!consent) {
        // Show banner after short 1.5s delay for a smooth entrance
        const timer = setTimeout(() => setShowBanner(true), 1500);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleAccept = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cid_cookie_consent", "accepted");
    }
    setShowBanner(false);
  };

  const handleDecline = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cid_cookie_consent", "declined");
      // Disable GA4 tracking if declined
      (window as any)["ga-disable-G-YJX2CH8TVC"] = true;
    }
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[9999] max-w-md w-[calc(100%-3rem)] animate-in fade-in slide-in-from-bottom-6 duration-500">
      <div className="bg-slate-900/90 dark:bg-slate-900/95 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.65)] text-white relative overflow-hidden group">
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 text-xl shadow-inner mt-0.5">
            🍪
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-extrabold tracking-tight text-white flex items-center gap-2">
              Cookie & Analytics Privacy
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                GDPR / CCPA
              </span>
            </h4>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              We use analytics (`GA4` & `Microsoft Clarity`) to understand audience metrics, enhance browsing, and optimize our US business & home solutions. See our{" "}
              <Link href="/privacy" className="text-amber-400 hover:text-amber-300 underline underline-offset-2 font-semibold">
                Privacy Policy
              </Link>{" "}
              for details.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-4 pt-1">
              <button
                onClick={handleAccept}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl text-xs transition-all duration-200 shadow-lg shadow-amber-500/25 active:scale-95"
              >
                Accept All Cookies
              </button>
              <button
                onClick={handleDecline}
                className="text-slate-300 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
