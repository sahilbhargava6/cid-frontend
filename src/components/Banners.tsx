"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export function GreenBanner() {
  const [idea, setIdea] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;
    setSubmitted(true);
    setIdea("");
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="bg-[#DDEEE9] py-10 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-4">
        <h3
          className="text-lg md:text-[22px] font-extrabold tracking-tight leading-snug"
          style={{ color: "#0D2B1A" }}
        >
          What&apos;s the next thing you&apos;d love to stop worrying about?
        </h3>

        <form onSubmit={handleSubmit} className="w-full max-w-xl flex justify-center">
          {submitted ? (
            <div
              className="text-sm font-bold bg-white px-6 py-3 rounded-full animate-fade-in shadow-sm w-full text-center"
              style={{ color: "#3FA672" }}
            >
              Thanks! We&apos;ve received your request.
            </div>
          ) : (
            <div className="relative w-full bg-white rounded-full flex items-center justify-between px-6 py-2.5 shadow-sm border border-slate-100/50">
              <input
                type="text"
                placeholder="Send us your ideas here"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                className="w-full text-left placeholder-[#3CA37E] text-xs sm:text-sm focus:outline-none font-semibold bg-transparent pr-10"
                style={{ color: "#0D2B1A" }}
              />
              <button
                type="submit"
                className="text-slate-500 hover:text-slate-700 transition-colors shrink-0"
                aria-label="Submit idea"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export function PinkBanner() {
  const auth = useAuth();
  const user = auth ? auth.user : null;
  const chatUrl = user ? "/dashboard" : "/login";

  return (
    <section className="bg-[#FFF5F7] py-6 border-y border-[#E8728C]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
        {/* Pink dot decoration */}
        <div className="w-2.5 h-2.5 rounded-full bg-[#E8728C] shrink-0 animate-pulse" />
        <span className="text-xl sm:text-[28px] font-bold text-[#E8728C] tracking-tight leading-snug">
          Live Chat is just one click away whenever you need us.
        </span>
        <Link
          href={chatUrl}
          className="text-sm font-bold px-5 py-2 rounded-full border border-[#E8728C] text-[#E8728C] hover:bg-[#E8728C] hover:text-white transition-all duration-200"
        >
          Chat Now
        </Link>
      </div>
    </section>
  );
}
