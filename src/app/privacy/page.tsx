"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React, { useEffect } from "react";
import { useSiteConfig, getCleanPhone } from "@/data/siteConfigData";
import dynamic from "next/dynamic";

const Background3D = dynamic(() => import("@/components/Background3D"), {
  ssr: false,
});

export default function PrivacyPolicy() {
  const config = useSiteConfig();
  useEffect(() => {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");

    // Force light mode to match homepage aesthetic
    root.classList.remove("dark");
    root.classList.add("light");

    return () => {
      root.classList.remove("light");
      if (isDark) {
        root.classList.add("dark");
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-transparent relative">
      <Background3D />
      <Navbar />

      <main className="flex-grow">
        {/* Homepage Theme Hero Header Banner */}
        <div className="w-full bg-gradient-to-r from-[#0E2D53]/95 to-[#1B5E92]/95 backdrop-blur-sm pt-32 sm:pt-40 pb-20 text-center relative overflow-hidden shadow-md">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(232,93,58,0.18),transparent_50%)] pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3"
              style={{ color: "#ffffff", fontFamily: "var(--font-heading)" }}
            >
              Privacy Policy
            </h1>
            <p
              className="text-[11px] sm:text-xs font-bold uppercase tracking-widest"
              style={{ color: "rgba(255, 255, 255, 0.75)" }}
            >
              Last Updated: June 27, 2026
            </p>
          </div>
        </div>

        {/* High-Contrast Glass Card Content Showing 3D Logo & Bubbles Behind */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-10 pb-20 relative z-10">
          <div className="rounded-[28px] border border-slate-200/80 bg-white/60 backdrop-blur-xl p-6 sm:p-10 md:p-12 shadow-[0_15px_40px_rgba(15,17,23,0.08)]">
            <div className="space-y-8 text-sm sm:text-base text-[#0E2D53] leading-relaxed font-semibold">

              <section>
                <h2
                  className="text-lg sm:text-xl font-bold mb-3 tracking-tight"
                  style={{ color: "#E85D3A", fontFamily: "var(--font-heading)" }}
                >
                  1. Introduction
                </h2>
                <p>
                  consider-itdone ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy describes how we collect, use, disclose, and safeguard your personal information when you use our website, client portals, and virtual business or home services (including tax preparation, virtual bookkeeping, solar systems sourcing, small business management, and procurement).
                </p>
              </section>

              <section>
                <h2
                  className="text-lg sm:text-xl font-bold mb-3 tracking-tight"
                  style={{ color: "#E85D3A", fontFamily: "var(--font-heading)" }}
                >
                  2. Information We Collect
                </h2>
                <p className="mb-3">We collect information that identifies, relates to, describes, or is reasonably capable of being associated with you. This includes:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Identifiers:</strong> Name, postal address, email address, telephone number, Social Security Number (for tax preparation), and taxpayer ID.</li>
                  <li><strong>Financial Information:</strong> Bank account numbers, credit card numbers, billing details, balance sheets, and transaction histories (for bookkeeping services).</li>
                  <li><strong>Professional or Employment Information:</strong> Business records, employer details, and business structures.</li>
                  <li><strong>Technical Data:</strong> IP address, browser type, device information, and interaction history.</li>
                </ul>
              </section>

              <section>
                <h2
                  className="text-lg sm:text-xl font-bold mb-3 tracking-tight"
                  style={{ color: "#E85D3A", fontFamily: "var(--font-heading)" }}
                >
                  3. How We Use Your Information
                </h2>
                <p className="mb-3">We utilize your personal information for lawful business operations, including:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Providing and managing tax preparation, bookkeeping, solar consultation, and procurement services.</li>
                  <li>Processing transactions and sending billing notices.</li>
                  <li>Complying with Internal Revenue Service (IRS) regulations and federal/state tax filing compliance rules.</li>
                  <li>Preventing fraud and enhancing system security.</li>
                </ul>
              </section>

              <section>
                <h2
                  className="text-lg sm:text-xl font-bold mb-3 tracking-tight"
                  style={{ color: "#E85D3A", fontFamily: "var(--font-heading)" }}
                >
                  4. GLBA & Financial Privacy Compliance
                </h2>
                <p>
                  Because we provide virtual bookkeeping and tax preparation services, we strictly adhere to the Federal Trade Commission (FTC) Safeguards Rule and the Gramm-Leach-Bliley Act (GLBA). We do not disclose non-public personal financial information to third parties, except as permitted or required by law to process transactions on your behalf (e.g., submitting documents directly to the IRS).
                </p>
              </section>

              <section>
                <h2
                  className="text-lg sm:text-xl font-bold mb-3 tracking-tight"
                  style={{ color: "#E85D3A", fontFamily: "var(--font-heading)" }}
                >
                  5. California Privacy Rights (CCPA/CPRA)
                </h2>
                <p>
                  If you are a California resident, you have specific rights under the California Consumer Privacy Act. These include the right to request access to the categories and specific pieces of personal information we collect, the right to request deletion of your information, and the right to opt-out of any sales of personal information. consider-itdone does not sell personal information.
                </p>
              </section>

              <section>
                <h2
                  className="text-lg sm:text-xl font-bold mb-3 tracking-tight"
                  style={{ color: "#E85D3A", fontFamily: "var(--font-heading)" }}
                >
                  6. Information Security & Encryption
                </h2>
                <p>
                  We implement robust, multi-layered security measures to protect your sensitive financial and personal details. This includes end-to-end SSL/TLS 256-bit encryption for all document transfers, secure session management for portal logins, and restricted physical and digital access controls on our databases in compliance with industry best practices.
                </p>
              </section>

              <section>
                <h2
                  className="text-lg sm:text-xl font-bold mb-3 tracking-tight"
                  style={{ color: "#E85D3A", fontFamily: "var(--font-heading)" }}
                >
                  7. SMS, MMS & Telephone Communications (TCPA Compliance)
                </h2>
                <p className="mb-3">
                  By providing your telephone number on our online contact forms, service booking portals, or account registration screens, you provide express written consent authorizing <strong>consider-itdone LLC</strong> to contact you via voice calls, SMS text messages, and MMS notifications regarding your inquiries, service coordination, appointment schedules, and billing status.
                </p>
                <div className="p-5 bg-white/70 border border-[#E2ECF2] rounded-2xl space-y-2.5 text-xs sm:text-sm shadow-sm">
                  <p className="font-bold text-[#0E2D53] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#E85D3A] inline-block" />
                    SMS Privacy & Carrier Compliance Guarantee:
                  </p>
                  <p className="text-[#0E2D53]">
                    We respect your privacy strictly. <strong>We never sell, rent, license, or share your mobile phone number, SMS opt-in data, or consent status with any third parties, marketing agencies, or external affiliates for promotional or marketing purposes.</strong>
                  </p>
                  <p className="text-[#0E2D53]">
                    You may opt out of receiving SMS notifications from us at any time by replying <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">STOP</code> to any text message, or by emailing <a href="mailto:service@consider-itdone.com" style={{ color: "#2D6FA3" }} className="underline hover:text-[#E85D3A]">service@consider-itdone.com</a>. Standard message and data rates from your wireless carrier may apply.
                  </p>
                </div>
              </section>

              <section>
                <h2
                  className="text-lg sm:text-xl font-bold mb-3 tracking-tight"
                  style={{ color: "#E85D3A", fontFamily: "var(--font-heading)" }}
                >
                  8. Stripe Secure Payment Gateway & Credit Card Tokenization
                </h2>
                <p>
                  When you settle invoices or pay for retainer deposits online, <strong>consider-itdone LLC</strong> utilizes <strong>Stripe Inc.</strong>, a global Level 1 PCI-DSS certified payment gateway, to process credit card, debit card, and ACH transactions. We do not store, process, transmit, or retain raw credit card numbers, CVV codes, or banking PINs on our own servers. All financial transactions are directly tokenized, encrypted, and processed within Stripe’s secure infrastructure in strict accordance with Payment Card Industry Data Security Standards (PCI-DSS).
                </p>
              </section>

              <section className="border-t border-slate-200/60 pt-6">
                <h2
                  className="text-lg sm:text-xl font-bold mb-3 tracking-tight"
                  style={{ color: "#E85D3A", fontFamily: "var(--font-heading)" }}
                >
                  9. Contact Us & Corporate Headquarters
                </h2>
                <p className="mb-4">
                  If you have questions, data privacy requests, or concerns regarding our privacy practices or legal compliance, please reach out to our team directly:
                </p>
                <div className="p-5 bg-white/70 border border-[#E2ECF2] rounded-2xl text-xs sm:text-sm space-y-2 shadow-sm">
                  <p className="font-extrabold text-[#0E2D53] text-base">consider-itdone LLC</p>
                  <p><span className="font-semibold text-slate-400">Headquarters Address:</span> 692 Skyline Drive, Lake Hopatcong, NJ 07849</p>
                  <p><span className="font-semibold text-slate-400">Official Service Email:</span> <a href="mailto:service@consider-itdone.com" style={{ color: "#2D6FA3" }} className="hover:text-[#E85D3A] transition-colors">service@consider-itdone.com</a></p>
                  <p><span className="font-semibold text-slate-400">Direct Telephone:</span> <a href={`tel:${getCleanPhone(config.contactPhone)}`} style={{ color: "#2D6FA3" }} className="hover:text-[#E85D3A] transition-colors">{config.contactPhone}</a></p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
