"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";

const Background3D = dynamic(() => import("@/components/Background3D"), {
  ssr: false,
});

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Background3D />
      <Navbar />
      
      <main className="flex-grow">
        {/* Dark Hero Header Banner for High Visibility of White Navbar */}
        <div className="w-full bg-gradient-to-r from-[#0E2D53] to-[#1B5E92] pt-32 sm:pt-40 pb-20 text-center relative overflow-hidden">
          {/* Subtle background glow */}
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

        {/* High-Contrast Card Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-10 pb-20 relative z-10">
          <div className="rounded-[28px] border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 sm:p-10 md:p-12 shadow-[0_15px_40px_rgba(15,17,23,0.06)]">
            <div className="space-y-8 text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
              
              <section>
                <h2 className="text-lg sm:text-xl font-bold mb-3 text-[#E85D3A] tracking-tight">
                  1. Introduction
                </h2>
                <p>
                  Consider It Done ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy describes how we collect, use, disclose, and safeguard your personal information when you use our website, client portals, and virtual business or home services (including tax preparation, virtual bookkeeping, solar systems sourcing, small business management, and procurement).
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl font-bold mb-3 text-[#E85D3A] tracking-tight">
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
                <h2 className="text-lg sm:text-xl font-bold mb-3 text-[#E85D3A] tracking-tight">
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
                <h2 className="text-lg sm:text-xl font-bold mb-3 text-[#E85D3A] tracking-tight">
                  4. GLBA & Financial Privacy Compliance
                </h2>
                <p>
                  Because we provide virtual bookkeeping and tax preparation services, we strictly adhere to the Federal Trade Commission (FTC) Safeguards Rule and the Gramm-Leach-Bliley Act (GLBA). We do not disclose non-public personal financial information to third parties, except as permitted or required by law to process transactions on your behalf (e.g., submitting documents directly to the IRS).
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl font-bold mb-3 text-[#E85D3A] tracking-tight">
                  5. California Privacy Rights (CCPA/CPRA)
                </h2>
                <p>
                  If you are a California resident, you have specific rights under the California Consumer Privacy Act. These include the right to request access to the categories and specific pieces of personal information we collect, the right to request deletion of your information, and the right to opt-out of any sales of personal information. Consider It Done does not sell personal information.
                </p>
              </section>

              <section>
                <h2 className="text-lg sm:text-xl font-bold mb-3 text-[#E85D3A] tracking-tight">
                  6. Information Security
                </h2>
                <p>
                  We implement robust security measures to protect your sensitive financial and personal details. This includes end-to-end SSL/TLS encryption for all document transfers, secure multi-factor authentication for portal logins, and restricted physical and digital access controls on databases.
                </p>
              </section>

              <section className="border-t border-slate-100 dark:border-slate-800 pt-6">
                <h2 className="text-lg sm:text-xl font-bold mb-3 text-[#E85D3A] tracking-tight">
                  7. Contact Us
                </h2>
                <p className="mb-4">
                  If you have questions or concerns about this Privacy Policy, please contact us at:
                </p>
                <div className="p-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl text-xs sm:text-sm space-y-1.5">
                  <p className="font-extrabold text-slate-800 dark:text-slate-100">Consider It Done Privacy Team</p>
                  <p><span className="font-semibold text-slate-400">Email:</span> privacy@consideritdone.com</p>
                  <p><span className="font-semibold text-slate-400">Toll-Free Phone:</span> (888) 123-4567</p>
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
