'use client';

import React from 'react';
import { SidebarHeader } from './SidebarHeader';
import { SidebarItems } from './SidebarItems';
import { useDashboardContext } from './Provider';

interface SidebarProps {
  mobileOrientation: 'start' | 'end';
}

const style = {
  mobileOrientation: {
    start: 'left-0',
    end: 'right-0',
  },
  close: 'hidden lg:block',
  open: 'fixed top-0 bottom-0 z-40 w-10/12 sm:w-64 block',
  default:
    'h-screen overflow-y-auto lg:relative lg:w-64 bg-white/20 dark:bg-slate-900/30 backdrop-blur-xl border-r border-white/20 dark:border-white/5 transition-all duration-300',
};

export function Sidebar({ mobileOrientation }: SidebarProps) {
  const { isOpen } = useDashboardContext();
  
  return (
    <aside
      className={`${style.default} 
         ${style.mobileOrientation[mobileOrientation]} 
         ${isOpen ? style.open : style.close}`}
    >
      <div className="pb-32 lg:pb-6">
        <SidebarHeader />
        <SidebarItems />
      </div>
    </aside>
  );
}
