'use client';

import React, { useEffect, useState } from 'react';
import bookingService, { Booking } from '@/services/bookingService';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const data = await bookingService.getBookings();
        setBookings(data);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
    revenue: bookings
      .filter((b) => b.payment_status === 'paid')
      .reduce((sum, b) => sum + parseFloat(b.price || '0'), 0)
      .toFixed(2),
  };

  if (loading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-amber-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* BOOKINGS WRAPPER (v4 style header + card grid) */}
      <div className="glass-dashboard-card rounded-3xl p-6 shadow-xl space-y-6">
        
        {/* Stats & Header Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/10 dark:border-white/5">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Recent Service Requests</h2>
            <p className="text-xs text-slate-400 mt-1">Admin oversight and status tracking</p>
          </div>
          
          <div className="flex gap-6 text-slate-700 dark:text-slate-300">
            <div className="pr-4 border-r border-white/10 dark:border-white/5">
              <div className="text-xl font-black text-amber-500">{stats.pending}</div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Pending</div>
            </div>
            <div className="pr-4 border-r border-white/10 dark:border-white/5">
              <div className="text-xl font-black text-green-500">{stats.completed}</div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Completed</div>
            </div>
            <div className="pr-4 border-r border-white/10 dark:border-white/5">
              <div className="text-xl font-black text-slate-900 dark:text-white">{stats.total}</div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total</div>
            </div>
            <div>
              <div className="text-xl font-black text-emerald-500">${stats.revenue}</div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Revenue</div>
            </div>
          </div>
        </div>

        {/* Bookings Card Grid (v4 style) */}
        {bookings.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400 py-6 text-center">No service requests found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookings.map((booking) => {
              const isCompleted = booking.status === 'completed';
              const progressPercent = isCompleted ? 100 : booking.status === 'pending' ? 40 : 70;
              const progressBg = isCompleted ? 'bg-green-500' : 'bg-amber-500';
              
              return (
                <div key={booking.id} className="p-4 bg-white/10 dark:bg-slate-950/20 border border-white/10 dark:border-white/5 rounded-2xl flex flex-col justify-between h-48 hover:scale-[1.01] transition-transform duration-200">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                      Client ID: #{booking.user_id}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400/80">
                      {booking.scheduled_at ? new Date(booking.scheduled_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'N/A'}
                    </span>
                  </div>

                  {/* Mid Section */}
                  <div className="my-3">
                    <p className="text-sm font-black text-slate-800 dark:text-white capitalize truncate">
                      {booking.service_type.replace('_', ' ')}
                    </p>
                    <p className="text-[10px] text-slate-400 capitalize mt-1">
                      Request ID: #{booking.id}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between items-center text-[10px] font-bold mb-1">
                      <span className="text-slate-400">Progress</span>
                      <span className="text-slate-800 dark:text-slate-200">{progressPercent}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200/20 dark:bg-slate-800/30 rounded-full overflow-hidden">
                      <div className={`h-full ${progressBg} rounded-full`} style={{ width: `${progressPercent}%` }} />
                    </div>
                  </div>

                  {/* Footer Row */}
                  <div className="flex justify-between items-center pt-3 mt-1 border-t border-white/5">
                    <div>
                      <span className={`inline-flex px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                        booking.payment_status === 'paid' 
                          ? 'text-green-500 bg-green-500/10' 
                          : 'text-red-500 bg-red-500/10'
                      }`}>
                        {booking.payment_status} (${booking.price || '0.00'})
                      </span>
                    </div>
                    <span className={`inline-flex px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                      isCompleted ? 'text-green-500 bg-green-500/10' : 'text-amber-500 bg-amber-500/10'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}


