'use client';

import React, { useState, Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

function LoginContent() {
  const { login, loading } = useAuth();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
    } catch (err: any) {
      console.error('Login error:', err);
      setError(
        err.response?.data?.message ||
        err.response?.data?.errors?.email?.[0] ||
        'Invalid credentials. Please try again.'
      );
    }
  };

  const bookParam = searchParams.get('book');
  const registerLink = bookParam ? `/register?book=${bookParam}` : '/register';

  return (
    <div className="glass-dashboard-bg glass-dashboard-container flex items-center justify-center px-4 transition-colors duration-300">
      {/* Background overlay is provided by glass-dashboard-container::before */}

      <div className="glass-dashboard-card w-full max-w-md p-8 rounded-2xl border relative z-10 transition-all duration-300">

        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-8">
          <Image src="/images/logo.webp" alt="Consider It Done Logo" width={64} height={64} className="h-16 w-auto object-contain mb-4 filter drop-shadow-sm" priority />
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white">
            Welcome Back
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
            Sign in to your premium dashboard
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-4 rounded-xl text-xs font-semibold mb-6">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/40 dark:bg-black/30 border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Password
              </label>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/40 dark:bg-black/30 border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.98] disabled:opacity-50 text-white rounded-xl py-3 text-sm font-bold shadow-lg shadow-amber-500/20 transition-all duration-200 mt-6 cursor-pointer"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          <p>
            Don't have an account?{' '}
            <Link href={registerLink} className="text-amber-500 hover:underline font-bold">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Helpers */}
        <div className="mt-6 pt-6 border-t border-slate-200/50 dark:border-slate-700/30 text-center text-xs text-slate-500 dark:text-slate-400">
          <p className="font-medium">
            Demo Credentials:
          </p>
        </div>

      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-amber-500 border-t-transparent"></div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
