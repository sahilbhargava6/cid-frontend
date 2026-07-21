"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React, { useEffect } from "react";
import { useSiteConfig, getCleanPhone } from "@/data/siteConfigData";
import dynamic from "next/dynamic";

const Background3D = dynamic(() => import("@/components/Background3D"), {
  ssr: false,
});

export default function TermsOfService() {
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
              Terms of Service
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
                  1. Agreement to Terms
                </h2>
                <p>
                  By accessing or using the services provided by consider-itdone ("we," "our," or "us") via this portal or through virtual client accounts, you agree to be bound by these Terms of Service. If you do not agree to these terms, you must not access or use our services.
                </p>
              </section>

              <section>
                <h2
                  className="text-lg sm:text-xl font-bold mb-3 tracking-tight"
                  style={{ color: "#E85D3A", fontFamily: "var(--font-heading)" }}
                >
                  2. Services Offered
                </h2>
                <p>
                  consider-itdone is a multi-service business support provider. Our virtual offerings include tax resolution, professional bookkeeping, procurement coordination, solar options sourcing, and business administrative setup. All tax preparation is carried out in accordance with IRS guidelines, and final returns are subject to client review and electronic authorization (Form 8879) before submission.
                </p>
              </section>

              <section>
                <h2
                  className="text-lg sm:text-xl font-bold mb-3 tracking-tight"
                  style={{ color: "#E85D3A", fontFamily: "var(--font-heading)" }}
                >
                  3. Client Portal Accounts
                </h2>
                <p>
                  To access client dashboard panels, document repositories, and scheduling calendars, you must create a user account. You are responsible for safeguarding your login credentials (username and password). You agree to immediately notify us of any unauthorized use of your portal account.
                </p>
              </section>

              <section>
                <h2
                  className="text-lg sm:text-xl font-bold mb-3 tracking-tight"
                  style={{ color: "#E85D3A", fontFamily: "var(--font-heading)" }}
                >
                  4. Billing, Stripe Payments and Retainer Fees
                </h2>
                <p>
                  Service rates, retainer deposits, and invoicing terms will be specified in your individual service agreement or booking confirmation. Payment obligations must be settled prior to tax return dispatch or the release of monthly financial reports. All credit card, debit card, and electronic payments are securely processed via <strong>Stripe Inc.</strong> Unpaid balances may result in the temporary suspension of virtual bookkeeping dashboards and account management tools until settlement is confirmed.
                </p>
              </section>

              <section>
                <h2
                  className="text-lg sm:text-xl font-bold mb-3 tracking-tight"
                  style={{ color: "#E85D3A", fontFamily: "var(--font-heading)" }}
                >
                  5. SMS & Telephone Communication Terms (TCPA Compliance)
                </h2>
                <p>
                  By entering your phone number on our site, scheduling a consultation, or registering for a client portal, you agree to receive transactional telephone calls, voice reminders, and SMS text messages from <strong>consider-itdone LLC</strong> and our authorized service coordinators. These communications are strictly for service delivery, appointment scheduling, document verification, and billing updates. Standard messaging and data rates from your wireless provider apply. You may opt out of SMS communications at any time by texting <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">STOP</code> to our messaging number or contacting customer support.
                </p>
              </section>

              <section>
                <h2
                  className="text-lg sm:text-xl font-bold mb-3 tracking-tight"
                  style={{ color: "#E85D3A", fontFamily: "var(--font-heading)" }}
                >
                  6. Limitation of Liability & No-Gimmicks Guarantee
                </h2>
                <p>
                  To the maximum extent permitted by applicable US law, consider-itdone shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues (including losses from IRS penalties arising from incomplete client documents or delayed submissions where documents were not provided to us in a timely manner). Our aggregate liability for any claims shall not exceed the fees paid by you for the specific service in question during the prior 6-month period.
                </p>
              </section>

              <section>
                <h2
                  className="text-lg sm:text-xl font-bold mb-3 tracking-tight"
                  style={{ color: "#E85D3A", fontFamily: "var(--font-heading)" }}
                >
                  7. Governing Law & Jurisdiction
                </h2>
                <p>
                  These Terms of Service and any disputes arising from them shall be governed by and construed in accordance with the laws of the State of New Jersey and applicable federal laws of the United States of America, without regard to conflict of law principles. Any legal action or proceeding shall be brought exclusively in federal or state courts located within the State of New Jersey.
                </p>
              </section>

              <section className="border-t border-slate-200/60 pt-6">
                <h2
                  className="text-lg sm:text-xl font-bold mb-3 tracking-tight"
                  style={{ color: "#E85D3A", fontFamily: "var(--font-heading)" }}
                >
                  8. Modifications & Contact Information
                </h2>
                <p className="mb-4">
                  We reserve the right to modify these Terms of Service at any time. We will alert users to modifications by updating the "Last Updated" date. Continued use of our portal after changes are posted constitutes acceptance of the modified Terms of Service.
                </p>
                <div className="p-5 bg-white/70 border border-[#E2ECF2] rounded-2xl text-xs sm:text-sm space-y-2 shadow-sm">
                  <p className="font-extrabold text-[#0E2D53] text-base">consider-itdone LLC</p>
                  <p><span className="font-semibold text-slate-400">Headquarters Address:</span> 692 Skyline Drive, Lake Hopatcong, NJ 07849</p>
                  <p><span className="font-semibold text-slate-400">Official Support Email:</span> <a href="mailto:service@consider-itdone.com" style={{ color: "#2D6FA3" }} className="hover:text-[#E85D3A] transition-colors">service@consider-itdone.com</a></p>
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
