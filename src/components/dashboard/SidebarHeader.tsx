import React from 'react';

const inlineStyle = {
  backgroundColor: '#f96057',
  boxShadow: '24px 0 0 0 #f8ce52, 48px 0 0 0 #5fcf65',
};

export function SidebarHeader() {
  return (
    <div className="flex flex-col h-20 justify-center px-6 border-b border-white/10 dark:border-slate-800/50">
      <div className="flex items-center gap-3">
        <img src="/images/logo.png" alt="Consider It Done" className="h-8 w-auto object-contain" />
        <span className="font-heading font-extrabold text-sm tracking-tight text-slate-800 dark:text-white uppercase">
          Consider It Done
        </span>
      </div>
      <div className="mt-2 flex pl-1">
        <div className="h-2 w-2 rounded-full" style={inlineStyle} />
      </div>
    </div>
  );
}
