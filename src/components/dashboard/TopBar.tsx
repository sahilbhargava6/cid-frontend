'use client';

import React from 'react';
import { useDashboardContext } from './Provider';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

export function TopBar() {
  const { openSidebar } = useDashboardContext();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header className="relative z-20 h-16 w-full flex items-center justify-between px-6 bg-white/10 dark:bg-slate-900/20 backdrop-blur-md border-b border-white/20 dark:border-white/5 transition-all duration-300">
      
      {/* LEFT AREA: Sidenav Toggle for Mobile & Title */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-expanded="false"
          aria-label="Toggle sidenav"
          onClick={openSidebar}
          className="p-1 rounded-lg text-slate-800 dark:text-white hover:bg-white/20 focus:outline-none lg:hidden transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <div className="hidden sm:block">
          <h1 className="text-md font-extrabold text-slate-800 dark:text-white tracking-tight">Portal</h1>
        </div>
      </div>

      {/* RIGHT AREA: Theme toggle, Notifications, User details, Logout */}
      <div className="flex items-center gap-4">
        
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-white/20 transition-all duration-200"
          title="Toggle Light/Dark Theme"
        >
          {theme === 'dark' ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-11.314l.707.707m12.02 11.314l.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {/* Hello Greeting */}
        <span className="hidden md:block text-xs font-bold text-slate-700 dark:text-slate-300">
          Hello, {user?.name}
        </span>

        {/* User Initial Circle / Avatar */}
        <div className="h-9 w-9 rounded-full bg-amber-500 text-white flex items-center justify-center font-extrabold text-sm shadow-md shadow-amber-500/25 uppercase">
          {user?.name?.[0] || 'U'}
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="text-xs font-extrabold text-red-500 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 px-3.5 py-2 rounded-xl transition-all duration-200 border border-red-500/25"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
