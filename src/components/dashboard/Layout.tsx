'use client';

import React from 'react';
import { TopBar } from './TopBar';
import { Overlay } from './Overlay';
import { Sidebar } from './Sidebar';
import { DashboardProvider } from './Provider';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <DashboardProvider>
      <div className="glass-dashboard-bg glass-dashboard-container flex">
        {/* Mobile menu overlay */}
        <Overlay />
        
        {/* Sidebar */}
        <Sidebar mobileOrientation="start" />
        
        {/* Main Content Area */}
        <div className="flex flex-col flex-1 h-screen overflow-hidden">
          <TopBar />
          
          <main className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6 lg:p-8 glass-dashboard-main">
            <div className="max-w-7xl mx-auto glass-dashboard-content p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-xl min-h-[calc(100vh-6rem)] sm:min-h-[calc(100vh-8rem)]">
              {children}
            </div>
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
}
