"use client";

export default function BottomIllustration() {
  return (
    <section className="py-16 bg-[#FAFAF8] border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h2 
          className="text-lg font-bold mb-10 tracking-tight"
          style={{ color: "#8E3D2E", fontFamily: "var(--font-heading)" }}
        >
          Your Growth, Tax, and Logistics Team
        </h2>
        
        {/* Visual team representation layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Business Growth Pro */}
          <div className="flex flex-col items-center p-6 rounded-[24px] bg-white border border-slate-200/40 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-[#DBF4EC] flex items-center justify-center mb-4 text-[#184A3B]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-slate-800 mb-1">Growth & Strategy</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed max-w-[200px] font-semibold">
              Optimizing processes, workflows, and operations to maximize efficiency.
            </p>
          </div>

          {/* Tax Pro */}
          <div className="flex flex-col items-center p-6 rounded-[24px] bg-white border border-slate-200/40 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-[#FFF5F7] flex items-center justify-center mb-4 text-[#E06D53]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-slate-800 mb-1">Tax & Bookkeeping</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed max-w-[200px] font-semibold">
              Minimizing liabilities and keeping your financial ledgers perfectly balanced.
            </p>
          </div>

          {/* Logistics & Sourcing Pro */}
          <div className="flex flex-col items-center p-6 rounded-[24px] bg-white border border-slate-200/40 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-[#EBF3FF] flex items-center justify-center mb-4 text-[#1b5e92]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
                <path d="M12 22v-5" />
                <path d="M17 17H7" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-slate-800 mb-1">Logistics & Procurement</h3>
            <p className="text-[11px] text-slate-500 leading-relaxed max-w-[200px] font-semibold">
              Managing supply chains, vendor relations, and global product sourcing.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
