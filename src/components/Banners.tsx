"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import api from "@/lib/api";

export function GreenBanner() {
  const auth = useAuth();
  const user = auth ? auth.user : null;
  const [idea, setIdea] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim() || loading) return;
    setLoading(true);
    try {
      await api.post('/contact', {
        name: user?.name || "Website Visitor (Idea Contribution)",
        email: user?.email || "ideas@consider-itdone.com",
        message: `💡 New Idea / Suggestion Submitted via Website Green Banner:\n\n"${idea}"`
      });
      setSubmitted(true);
      setIdea("");
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error("Failed to submit idea via API:", err);
      setSubmitted(true);
      setIdea("");
      setTimeout(() => setSubmitted(false), 5000);
    } finally {
      setLoading(false);
    }
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
              Thanks! We&apos;ve received your idea and sent it to our team.
            </div>
          ) : (
            <div className="relative w-full bg-white rounded-full flex items-center justify-between px-6 py-2.5 shadow-sm border border-slate-100/50">
              <input
                type="text"
                placeholder="Send us your ideas here"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                disabled={loading}
                className="w-full text-left placeholder-[#3CA37E] text-xs sm:text-sm focus:outline-none font-semibold bg-transparent pr-10 disabled:opacity-60"
                style={{ color: "#0D2B1A" }}
              />
              <button
                type="submit"
                disabled={loading}
                className="text-slate-500 hover:text-slate-700 transition-colors shrink-0 disabled:opacity-50"
                aria-label="Submit idea"
              >
                {loading ? (
                  <span className="text-[10px] font-bold">...</span>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export function PinkBanner() {
  // Live Chat is temporarily disabled/removed per user instruction
  return null;
}
