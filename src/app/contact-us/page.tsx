"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import api from "@/lib/api";
import { useSiteConfig } from "@/data/siteConfigData";
import dynamic from "next/dynamic";

const Background3D = dynamic(() => import("@/components/Background3D"), {
  ssr: false,
});

export default function ContactUsPage() {
  const config = useSiteConfig();
  const [scale, setScale] = useState(1);
  const [leftOffset, setLeftOffset] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "procurement",
    message: "",
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const fullMessage = `Selected Service: ${formData.service.toUpperCase()}\n\nMessage:\n${formData.message}`;

      await api.post("/contact", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: fullMessage,
      });

      setSubmitted(true);
    } catch (err: any) {
      console.error("Failed to submit contact form:", err);
      setError(err?.response?.data?.message || "Failed to send contact inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Background3D />
      <Navbar />

      <main className="w-full bg-[#FFFFFF] overflow-x-hidden min-h-screen">
        {/* ===== MOBILE & TABLET VIEW (< 1024px) ===== */}
        <div className="block lg:hidden pt-32 pb-20 px-4 sm:px-8 max-w-3xl mx-auto relative z-10">
          {/* Page Title */}
          <h1
            className="font-black text-4xl sm:text-5xl mb-4 select-none"
            style={{
              fontFamily: "Inter, sans-serif",
              background: "linear-gradient(90deg, #5C1A0F 0%, #0A1E35 36.06%, #0D2B1A 64.9%, #3D0A1E 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Contact Us
          </h1>

          {/* Subtitle Pill */}
          <div className="inline-block px-5 py-2.5 rounded-2xl bg-[rgba(10,30,53,0.05)] border border-slate-200/60 mb-8 shadow-sm">
            <span className="font-bold text-base sm:text-lg text-[#0A1E35]" style={{ fontFamily: "Inter, sans-serif" }}>
              Get a Customized Quote
            </span>
          </div>

          {/* Contact Form Card */}
          <div className="rounded-3xl p-6 sm:p-10 shadow-lg border-2 border-slate-200 bg-white/80 backdrop-blur-md space-y-8">
            {/* Contact Info Header */}
            <div>
              <h4 className="text-2xl sm:text-3xl font-bold text-[#0A1E35] mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
                Reach Out Directly
              </h4>
              <p className="text-base sm:text-lg leading-relaxed font-light text-slate-600 mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
                Have questions about custom pricing, bulk orders, or long-term operational plans? Send us a message or call directly.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-slate-100 text-sm sm:text-base text-slate-700 font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[rgba(10,30,53,0.05)] rounded-full flex items-center justify-center border border-slate-200/50 flex-shrink-0">
                    <svg className="w-5 h-5 text-[#E85D3A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <span>{config.contactPhone}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[rgba(10,30,53,0.05)] rounded-full flex items-center justify-center border border-slate-200/50 flex-shrink-0">
                    <svg className="w-5 h-5 text-[#E85D3A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <span className="truncate">{config.contactEmail}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[rgba(10,30,53,0.05)] rounded-full flex items-center justify-center border border-slate-200/50 flex-shrink-0">
                    <svg className="w-5 h-5 text-[#E85D3A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <span>All 50 US States</span>
                </div>
              </div>
            </div>

            {/* Form Section */}
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-[#0A1E35] mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
                  Thank you!
                </h4>
                <p className="text-base text-slate-500 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                  Your inquiry has been received. Our team will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-4 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-sm font-semibold">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-[#0A1E35] mb-2" style={{ fontFamily: "Inter, sans-serif" }}>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#E85D3A] text-slate-800 font-medium text-base"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#0A1E35] mb-2" style={{ fontFamily: "Inter, sans-serif" }}>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#E85D3A] text-slate-800 font-medium text-base"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-[#0A1E35] mb-2" style={{ fontFamily: "Inter, sans-serif" }}>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#E85D3A] text-slate-800 font-medium text-base"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#0A1E35] mb-2" style={{ fontFamily: "Inter, sans-serif" }}>Select Service</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#E85D3A] text-slate-800 font-medium text-base appearance-none"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      <option value="tax">Tax Preparation</option>
                      <option value="bookkeeping">Virtual Bookkeeping</option>
                      <option value="solar">Home Solar Systems</option>
                      <option value="business">Business Accounts & Logistics</option>
                      <option value="procurement">Procurement Services</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#0A1E35] mb-2" style={{ fontFamily: "Inter, sans-serif" }}>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    placeholder="Tell us about your requirements..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#E85D3A] text-slate-800 font-medium text-base resize-none"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#E85D3A] hover:bg-[#C44A2A] disabled:opacity-50 text-white font-extrabold text-lg rounded-xl shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer mt-2"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {loading ? "Sending Inquiry..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ===== DESKTOP VIEW (>= 1024px) ===== */}
        <div className="hidden lg:flex items-start justify-center pt-0 overflow-hidden w-full">
          <div
            className="relative flex-shrink-0 select-none origin-top-left overflow-hidden"
            style={{
              width: `${1920 * scale}px`,
              height: `${1250 * scale}px`
            }}
          >
            {/* 1920x1250 Pixel-Perfect Canvas Container */}
            <div
              className="absolute top-0 left-0 select-none origin-top-left"
              style={{
                width: "1920px",
                height: "1250px",
                transform: `scale(${scale})`
              }}
            >
              {/* Faded Background Element (cid ele 1) */}
              <div
                className="absolute left-0 top-0 w-[1920px] h-[800px] bg-cover bg-bottom bg-no-repeat z-0"
                style={{
                  backgroundImage: "url('/images/hero.webp')"
                }}
              >
                <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px]" />
              </div>

              {/* Page Title */}
              <h1
                className="absolute left-[216px] top-[160px] w-[500px] h-[170px] font-black text-[64px] leading-[77px] flex items-center select-none"
                style={{
                  fontFamily: "Inter, sans-serif",
                  background: "linear-gradient(90deg, #5C1A0F 0%, #0A1E35 36.06%, #0D2B1A 64.9%, #3D0A1E 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Contact Us
              </h1>

              {/* Side Subtitle Pill */}
              <div
                className="absolute left-[216px] top-[320px] w-[450px] h-[86px] rounded-[30px] z-10 flex items-center justify-center px-6 shadow-sm bg-[rgba(10,30,53,0.05)] border border-slate-200/50"
              >
                <span
                  className="font-bold text-[24px] leading-[29px] text-[#0A1E35] text-center"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Get a Customized Quote
                </span>
              </div>

              {/* Main Contact Form Details Card */}
              <div
                className="absolute left-[216px] top-[430px] w-[1488px] h-[720px] rounded-[30px] z-10 p-12 shadow-lg border-2 border-slate-200 bg-white/60 backdrop-blur-md grid grid-cols-12 gap-12"
              >
                {/* Left Side: Contact Info */}
                <div className="col-span-5 flex flex-col justify-between h-full">
                  <div>
                    <h4 className="text-[36px] font-bold text-[#0A1E35] mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
                      Reach Out Directly
                    </h4>
                    <p className="text-[20px] leading-[34px] font-light text-slate-600 mb-8" style={{ fontFamily: "Inter, sans-serif" }}>
                      Have questions about custom pricing, bulk orders, or long-term operational plans? Send us a message or schedule a phone meeting.
                    </p>
                  </div>

                  <div className="space-y-6 text-[20px] text-slate-700 font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[rgba(10,30,53,0.05)] rounded-full flex items-center justify-center border border-slate-200/50">
                        <svg className="w-6 h-6 text-[#E85D3A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                      </div>
                      <span>{config.contactPhone}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[rgba(10,30,53,0.05)] rounded-full flex items-center justify-center border border-slate-200/50">
                        <svg className="w-6 h-6 text-[#E85D3A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <span>{config.contactEmail}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[rgba(10,30,53,0.05)] rounded-full flex items-center justify-center border border-slate-200/50">
                        <svg className="w-6 h-6 text-[#E85D3A]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                      </div>
                      <span>Serving all 50 US States</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Form */}
                <div className="col-span-7 h-full flex items-center">
                  {submitted ? (
                    <div className="text-center p-8 w-full">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <h4 className="text-[28px] font-bold text-[#0A1E35] mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
                        Thank you!
                      </h4>
                      <p className="text-[18px] text-slate-500 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                        Your inquiry has been received. Our team will contact you shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="w-full space-y-6">
                      {error && (
                        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-sm font-semibold">
                          {error}
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-[#0A1E35] mb-2" style={{ fontFamily: "Inter, sans-serif" }}>Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="John Doe"
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#E85D3A] text-slate-800 font-semibold"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-[#0A1E35] mb-2" style={{ fontFamily: "Inter, sans-serif" }}>Email</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="john@example.com"
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#E85D3A] text-slate-800 font-semibold"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-[#0A1E35] mb-2" style={{ fontFamily: "Inter, sans-serif" }}>Phone</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(555) 000-0000"
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#E85D3A] text-slate-800 font-semibold"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-[#0A1E35] mb-2" style={{ fontFamily: "Inter, sans-serif" }}>Select Service</label>
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#E85D3A] text-slate-800 font-semibold appearance-none"
                            style={{ fontFamily: "Inter, sans-serif" }}
                          >
                            <option value="tax">Tax Preparation</option>
                            <option value="bookkeeping">Virtual Bookkeeping</option>
                            <option value="solar">Home Solar Systems</option>
                            <option value="business">Business Accounts & Logistics</option>
                            <option value="procurement">Procurement Services</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-[#0A1E35] mb-2" style={{ fontFamily: "Inter, sans-serif" }}>Message</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          required
                          placeholder="Tell us about your requirements..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#E85D3A] text-slate-800 font-semibold resize-none"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-[#E85D3A] hover:bg-[#C44A2A] disabled:opacity-50 text-white font-extrabold text-[18px] rounded-full shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer mt-2"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {loading ? "Sending Inquiry..." : "Send Message"}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
