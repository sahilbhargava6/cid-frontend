"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer 
      className="w-full h-[240px] md:h-[300px] flex flex-col items-center justify-center text-slate-800 select-none px-6 text-center border-t border-slate-100"
      style={{
        background: "linear-gradient(90deg, rgba(232, 80, 58, 0.2) 0%, rgba(45, 111, 163, 0.2) 35.58%, rgba(63, 166, 114, 0.2) 68.27%, rgba(232, 114, 140, 0.2) 100%)",
      }}
    >
      <span 
        className="font-bold text-[18px] md:text-[22px] tracking-tight text-[#0A1E35] leading-snug"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        © {new Date().getFullYear()} Consider It Done. All rights reserved.
      </span>
      
      <div 
        className="flex gap-6 mt-4 font-semibold text-[14px] md:text-[16px] text-slate-700" 
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <Link href="/privacy" className="hover:text-black hover:underline transition-colors">
          Privacy Policy
        </Link>
        <Link href="/terms" className="hover:text-black hover:underline transition-colors">
          Terms of Service
        </Link>
      </div>
    </footer>
  );
}
