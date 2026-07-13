'use client';

import React, { useEffect, useState } from 'react';
import bookingService, { Booking } from '@/services/bookingService';
import { getServiceByKey, defaultTimeSlots } from '@/data/servicesData';
import { ChatPanel } from '@/components/dashboard/ChatPanel';

interface ClientUser {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal & Edit states
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [editStatus, setEditStatus] = useState<string>('');
  const [editPaymentStatus, setEditPaymentStatus] = useState<string>('');
  const [editPrice, setEditPrice] = useState<string>('');
  const [editServiceType, setEditServiceType] = useState<string>('');
  const [editDate, setEditDate] = useState<string>('');
  const [editTime, setEditTime] = useState<string>('09:00 AM');
  const [saving, setSaving] = useState(false);

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

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleSelectBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setEditStatus(booking.status);
    setEditPaymentStatus(booking.payment_status);
    setEditPrice(booking.price || '0.00');
    setEditServiceType(booking.service_type);
    
    // Parse scheduled_at for date and time slot
    if (booking.scheduled_at) {
      try {
        const parts = booking.scheduled_at.split(' ');
        if (parts.length >= 2) {
          setEditDate(parts[0]);
          const [hStr, mStr] = parts[1].split(':');
          let h = parseInt(hStr, 10);
          let ampm = 'AM';
          if (h >= 12) {
            ampm = 'PM';
            if (h > 12) h -= 12;
          }
          if (h === 0) {
            h = 12;
          }
          setEditTime(`${String(h).padStart(2, '0')}:${mStr} ${ampm}`);
        }
      } catch (e) {
        console.error("Error parsing scheduled_at:", e);
      }
    } else {
      setEditDate('');
      setEditTime('09:00 AM');
    }
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;
    setSaving(true);

    let hours = "09";
    let minutes = "00";
    try {
      const [timeStr, modifier] = editTime.split(" ");
      const [h, m] = timeStr.split(":");
      let hNum = parseInt(h, 10);
      if (modifier === "PM" && hNum !== 12) hNum += 12;
      if (modifier === "AM" && hNum === 12) hNum = 0;
      hours = String(hNum).padStart(2, "0");
      minutes = m.padStart(2, "0");
    } catch (e) {
      console.error("Error formatting time for update:", e);
    }
    const formattedScheduledAt = editDate ? `${editDate} ${hours}:${minutes}:00` : selectedBooking.scheduled_at;

    try {
      const updated = await bookingService.updateBooking(selectedBooking.id, {
        status: editStatus as any,
        payment_status: editPaymentStatus as any,
        price: editPrice,
        service_type: editServiceType as any,
        scheduled_at: formattedScheduledAt,
      });
      
      // Update local booking states
      setSelectedBooking(null);
      await loadDashboardData();
    } catch (error) {
      console.error('Failed to update booking:', error);
      alert('Error saving changes. Ensure the backend is fully updated.');
    } finally {
      setSaving(false);
    }
  };

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
              
              // Eager loaded client user details
              const clientName = (booking as any).user?.name || `Client #${booking.user_id}`;
              
              return (
                <div 
                  key={booking.id} 
                  onClick={() => handleSelectBooking(booking)}
                  className="p-4 bg-white/10 dark:bg-slate-950/20 border border-white/10 dark:border-white/5 rounded-2xl flex flex-col justify-between h-48 hover:scale-[1.01] hover:bg-white/15 dark:hover:bg-slate-950/30 transition-all duration-200 cursor-pointer"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                      {clientName}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400/80">
                      {booking.scheduled_at ? new Date(booking.scheduled_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }) : 'N/A'}
                    </span>
                  </div>

                  {/* Mid Section */}
                  <div className="my-3">
                    <p className="text-sm font-black text-slate-800 dark:text-white capitalize truncate">
                      {booking.service_type.replace(/_/g, ' ')}
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
                      {booking.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* CLIENT DETAILS & BOOKING EDIT MODAL */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div 
            className="glass-dashboard-card w-full max-w-5xl max-h-[95vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border border-white/10 dark:border-white/5 shadow-2xl relative animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={() => setSelectedBooking(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6 border-b border-white/10 pb-4">
              Client & Service Request Details
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column: Client info & Edit Form */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Client Profile and service details */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Client Profile</h4>
                      <div className="p-3 bg-white/5 dark:bg-black/20 rounded-xl border border-white/5">
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                          {(selectedBooking as any).user?.name || 'N/A'}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          ✉️ {(selectedBooking as any).user?.email || 'N/A'}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-2">
                          Client ID: #{(selectedBooking as any).user?.id || selectedBooking.user_id}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Service & Date</h4>
                      <div className="p-3 bg-white/5 dark:bg-black/20 rounded-xl border border-white/5">
                        <p className="text-sm font-black text-amber-500 capitalize">
                          {selectedBooking.service_type.replace(/_/g, ' ')}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          📅 Scheduled: {selectedBooking.scheduled_at ? new Date(selectedBooking.scheduled_at).toLocaleString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }) : 'Not Scheduled'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Request parameters */}
                  <div>
                    <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Request Parameters</h4>
                    <div className="p-3 bg-white/5 dark:bg-black/20 rounded-xl border border-white/5 h-40 overflow-y-auto space-y-2 text-xs">
                      {selectedBooking.input_parameters ? (
                        Object.entries(selectedBooking.input_parameters).map(([key, val]) => (
                          <div key={key} className="border-b border-white/5 pb-1.5 last:border-0 last:pb-0">
                            <span className="font-bold text-slate-400 uppercase tracking-wide text-[9px] block">
                              {key.replace(/_/g, ' ')}
                            </span>
                            <span className="text-slate-800 dark:text-slate-200 font-medium">
                              {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-slate-500 italic">No additional parameters provided.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Edit / Management Form */}
                <form onSubmit={handleSaveChanges} className="space-y-4 border-t border-white/10 pt-4">
                  <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Update Status, Rescheduling & Billing</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Work Status</label>
                      <select 
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                        className="w-full bg-white/20 dark:bg-slate-900/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      >
                        <option value="pending" className="bg-slate-100 dark:bg-slate-900">Pending</option>
                        <option value="in_progress" className="bg-slate-100 dark:bg-slate-900">In Progress</option>
                        <option value="completed" className="bg-slate-100 dark:bg-slate-900">Completed</option>
                        <option value="cancelled" className="bg-slate-100 dark:bg-slate-900">Cancelled</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Payment Status</label>
                      <select 
                        value={editPaymentStatus}
                        onChange={(e) => setEditPaymentStatus(e.target.value)}
                        className="w-full bg-white/20 dark:bg-slate-900/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      >
                        <option value="unpaid" className="bg-slate-100 dark:bg-slate-900">Unpaid</option>
                        <option value="partial" className="bg-slate-100 dark:bg-slate-900">Partial</option>
                        <option value="paid" className="bg-slate-100 dark:bg-slate-900">Paid</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Assign Price ($)</label>
                      <input 
                        type="number"
                        step="0.01"
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                        className="w-full bg-white/20 dark:bg-slate-900/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Service Type</label>
                      <select 
                        value={editServiceType}
                        onChange={(e) => setEditServiceType(e.target.value)}
                        className="w-full bg-white/20 dark:bg-slate-900/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      >
                        <option value="tax_prep">Tax Prep</option>
                        <option value="bookkeeping">Virtual Bookkeeping</option>
                        <option value="small_business">Small Business Management</option>
                        <option value="solar">Solar Energy</option>
                        <option value="procurement">Procurement & Sourcing</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Reschedule Date</label>
                      <input 
                        type="date"
                        value={editDate}
                        onChange={(e) => setEditDate(e.target.value)}
                        className="w-full bg-white/20 dark:bg-slate-900/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Reschedule Time Slot</label>
                      <select 
                        value={editTime}
                        onChange={(e) => setEditTime(e.target.value)}
                        className="w-full bg-white/20 dark:bg-slate-900/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      >
                        {(() => {
                          const svc = getServiceByKey(editServiceType);
                          const slots = (svc && svc.timeSlots && svc.timeSlots.length > 0) ? svc.timeSlots : defaultTimeSlots;
                          // If editTime is not in the list, we still want to show it as an option so the select doesn't break
                          const isEditTimeInSlots = slots.some(s => s.time === editTime);
                          return (
                            <>
                              {!isEditTimeInSlots && <option value={editTime}>{editTime} (Custom)</option>}
                              {slots.map(s => (
                                <option key={s.time} value={s.time}>{s.time} ({s.label})</option>
                              ))}
                            </>
                          );
                        })()}
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button 
                      type="button"
                      onClick={() => setSelectedBooking(null)}
                      className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-xs font-bold rounded-xl text-slate-700 dark:text-slate-300 hover:bg-white/10 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={saving}
                      className="px-5 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md shadow-amber-500/10 transition-all"
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Column: Live Chat Panel */}
              <div className="border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1">
                    Live Chat & Document Exchange
                  </h4>
                  <p className="text-xs text-slate-400 mb-2">
                    Direct conversation with the client regarding this service request.
                  </p>
                </div>
                <ChatPanel ticketId={selectedBooking.id} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


