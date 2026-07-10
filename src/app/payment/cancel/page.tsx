'use client';

import React from 'react';
import Link from 'next/link';

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl max-w-md w-full text-center border border-red-500/20">
        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Payment Cancelled</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Your payment was cancelled or failed. Your booking has not been processed. You can try paying again from your dashboard.
        </p>
        <Link 
          href="/dashboard"
          className="block w-full py-3 px-4 border-2 border-slate-200 dark:border-slate-700 hover:border-amber-500 hover:text-amber-500 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
