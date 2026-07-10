'use client';

import React from 'react';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl max-w-md w-full text-center border border-green-500/20">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Payment Successful!</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Thank you for your payment. Your booking status has been updated and we will begin processing your request shortly.
        </p>
        <Link 
          href="/dashboard"
          className="block w-full py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-amber-500/20"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
