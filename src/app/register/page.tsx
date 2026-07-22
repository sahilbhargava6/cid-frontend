'use client';

import React, { useState, Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

function RegisterContent() {
  const { register, loading } = useAuth();
  const searchParams = useSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const reqLength = password.length >= 8;
  const reqUpper = /[A-Z]/.test(password);
  const reqLower = /[a-z]/.test(password);
  const reqNumber = /[0-9]/.test(password);
  const reqSymbol = /[^A-Za-z0-9]/.test(password);
  const allReqsMet = reqLength && reqUpper && reqLower && reqNumber && reqSymbol;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!allReqsMet) {
      const missing = [];
      if (!reqLength) missing.push('at least 8 characters');
      if (!reqUpper) missing.push('one uppercase letter');
      if (!reqLower) missing.push('one lowercase letter');
      if (!reqNumber) missing.push('one number');
      if (!reqSymbol) missing.push('one symbol (!@#$%^&*)');
      setError(`Password must include: ${missing.join(', ')}.`);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await register(name, email, password);
    } catch (err: any) {
      console.error('Registration error:', err);
      const pwdErrors = err.response?.data?.errors?.password;
      setError(
        err.response?.data?.message ||
        err.response?.data?.errors?.email?.[0] ||
        (Array.isArray(pwdErrors) ? pwdErrors.join(' • ') : pwdErrors) ||
        'Registration failed. Please try again.'
      );
    }
  };

  const bookParam = searchParams.get('book');
  const loginLink = bookParam ? `/login?book=${bookParam}` : '/login';

  return (
    <div className="glass-dashboard-bg glass-dashboard-container flex items-center justify-center px-4 transition-colors duration-300">
      <div className="glass-dashboard-card w-full max-w-md p-8 rounded-2xl border relative z-10 transition-all duration-300">

        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-6">
          <Image src="/images/logo.webp" alt="consider-itdone Logo" width={64} height={64} className="h-16 w-auto object-contain mb-3 filter drop-shadow-sm" priority />
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white">
            Create Account
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Register to book premium services
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-3.5 rounded-xl text-xs font-semibold mb-5">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-white/40 dark:bg-black/30 border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/40 dark:bg-black/30 border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/40 dark:bg-black/30 border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              placeholder="••••••••"
            />
            {password.length > 0 && (
              <div className="mt-2 p-3 bg-slate-50/80 dark:bg-black/30 border border-slate-200/60 dark:border-slate-800 rounded-xl space-y-1.5 text-[11px]">
                <p className="font-bold text-slate-700 dark:text-slate-300 mb-1">Password Requirements:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 font-semibold">
                  <span className={`flex items-center gap-1.5 ${reqLength ? 'text-green-600 dark:text-green-400' : 'text-slate-400'}`}>
                    <span>{reqLength ? '✓' : '•'}</span> At least 8 characters
                  </span>
                  <span className={`flex items-center gap-1.5 ${reqUpper ? 'text-green-600 dark:text-green-400' : 'text-slate-400'}`}>
                    <span>{reqUpper ? '✓' : '•'}</span> One uppercase (A-Z)
                  </span>
                  <span className={`flex items-center gap-1.5 ${reqLower ? 'text-green-600 dark:text-green-400' : 'text-slate-400'}`}>
                    <span>{reqLower ? '✓' : '•'}</span> One lowercase (a-z)
                  </span>
                  <span className={`flex items-center gap-1.5 ${reqNumber ? 'text-green-600 dark:text-green-400' : 'text-slate-400'}`}>
                    <span>{reqNumber ? '✓' : '•'}</span> One number (0-9)
                  </span>
                  <span className={`flex items-center gap-1.5 sm:col-span-2 ${reqSymbol ? 'text-green-600 dark:text-green-400' : 'text-slate-400'}`}>
                    <span>{reqSymbol ? '✓' : '•'}</span> One symbol (!@#$%^&*)
                  </span>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full bg-white/40 dark:bg-black/30 border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.98] disabled:opacity-50 text-white rounded-xl py-3 text-sm font-bold shadow-lg shadow-amber-500/20 transition-all duration-200 mt-4 cursor-pointer"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          <p>
            Already have an account?{' '}
            <Link href={loginLink} className="text-amber-500 hover:underline font-bold">
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default function Register() {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-amber-500 border-t-transparent"></div>
      </div>
    }>
      <RegisterContent />
    </Suspense>
  );
}
