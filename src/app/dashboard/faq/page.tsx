"use client";

import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/dashboard/Layout";
import FAQ from "@/components/FAQ";
import Link from "next/link";

export default function DashboardFaqPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Frequently Asked Questions
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Find quick answers and guidance on our Tax Preparation, Virtual Bookkeeping, Solar, and Logistics services.
              </p>
            </div>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs rounded-xl transition-all self-start sm:self-center"
            >
              ← Back to Dashboard
            </Link>
          </div>

          {/* FAQ Container */}
          <div className="glass-dashboard-card rounded-3xl p-6 sm:p-8 border border-white/10 dark:border-white/5 shadow-xl bg-white/50 dark:bg-slate-900/50">
            <FAQ />
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
