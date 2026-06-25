'use client';

import React, { useEffect, useState } from 'react';
import bookingService, { Booking, TicketStatus, PaymentStatus } from '@/services/bookingService';
import api from '@/lib/api';

export default function BookingsManager() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  
  // Filter and search states
  const [activeTab, setActiveTab] = useState<'all' | TicketStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Form states for the quick editor modal
  const [editStatus, setEditStatus] = useState<TicketStatus>('pending');
  const [editPaymentStatus, setEditPaymentStatus] = useState<PaymentStatus>('unpaid');
  const [editPrice, setEditPrice] = useState<string>('');
  const [updating, setUpdating] = useState(false);

  const loadBookings = async () => {
    try {
      const data = await bookingService.getBookings();
      setBookings(data);
      setFilteredBookings(data);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  // Filter logic based on tabs and search query
  useEffect(() => {
    let result = bookings;

    if (activeTab !== 'all') {
      result = result.filter((b) => b.status === activeTab);
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (b) => 
          b.service_type.toLowerCase().includes(query) || 
          b.id.toString().includes(query) ||
          b.user_id.toString().includes(query)
      );
    }

    setFilteredBookings(result);
  }, [activeTab, searchQuery, bookings]);

  const openEditor = (booking: Booking) => {
    setSelectedBooking(booking);
    setEditStatus(booking.status);
    setEditPaymentStatus(booking.payment_status);
    setEditPrice(booking.price || '');
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;
    setUpdating(true);
    try {
      await api.put(`/bookings/${selectedBooking.id}`, {
        status: editStatus,
        payment_status: editPaymentStatus,
        price: editPrice
      });
      await loadBookings();
      setSelectedBooking(null);
    } catch (error) {
      console.error('Failed to update booking:', error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-amber-500 border-t-transparent"></div>
      </div>
    );
  }

  const tabs: { label: string; value: 'all' | TicketStatus }[] = [
    { label: 'All Requests', value: 'all' },
    { label: 'Pending Review', value: 'pending' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' },
  ];

  return (
    <div className="space-y-6">
      
      {/* FILTER TABS & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
        
        {/* Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                activeTab === tab.value
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/15'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by ID or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

      </div>

      {/* DATAGRID DATA TABLE */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-colors duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                <th className="p-4">ID</th>
                <th className="p-4">Client Name</th>
                <th className="p-4">Service</th>
                <th className="p-4">Status</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Price</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-sm text-slate-700 dark:text-slate-300">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No bookings match the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-semibold">#{booking.id}</td>
                    <td className="p-4 font-medium">{booking.user_id ? 'John Client' : 'Guest'}</td>
                    <td className="p-4 capitalize">{booking.service_type.replace('_', ' ')}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        booking.status === 'completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-950/20 dark:text-green-400' 
                          : booking.status === 'pending' 
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/20 dark:text-amber-400' 
                          : booking.status === 'cancelled'
                          ? 'bg-red-100 text-red-800 dark:bg-red-950/20 dark:text-red-400'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-950/20 dark:text-blue-400'
                      }`}>
                        {booking.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        booking.payment_status === 'paid' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-950/20 dark:text-green-400' 
                          : booking.payment_status === 'partial' 
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/20 dark:text-amber-400' 
                          : 'bg-red-100 text-red-800 dark:bg-red-950/20 dark:text-red-400'
                      }`}>
                        {booking.payment_status}
                      </span>
                    </td>
                    <td className="p-4 font-semibold">${booking.price || '0.00'}</td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => openEditor(booking)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg text-xs font-semibold text-slate-700 dark:text-white transition-all"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* QUICK ACTION EDIT MODAL */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden animate-scale-in">
            <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800 dark:text-white">
                Manage Booking #{selectedBooking.id}
              </h3>
              <button 
                onClick={() => setSelectedBooking(null)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Status</label>
                <select 
                  value={editStatus} 
                  onChange={(e) => setEditStatus(e.target.value as TicketStatus)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white focus:outline-none"
                >
                  <option value="pending">Pending Review</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Payment Status</label>
                <select 
                  value={editPaymentStatus} 
                  onChange={(e) => setEditPaymentStatus(e.target.value as PaymentStatus)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white focus:outline-none"
                >
                  <option value="unpaid">Unpaid</option>
                  <option value="partial">Partial</option>
                  <option value="paid">Paid</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Quoted Price ($)</label>
                <input 
                  type="number"
                  step="0.01"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white focus:outline-none"
                  placeholder="0.00"
                />
              </div>

              {/* JSONB parameters viewer */}
              {selectedBooking.input_parameters && (
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Service Intake Parameters</span>
                  <pre className="text-xs text-slate-600 dark:text-slate-400 overflow-x-auto whitespace-pre-wrap font-mono">
                    {JSON.stringify(selectedBooking.input_parameters, null, 2)}
                  </pre>
                </div>
              )}

              <div className="flex gap-3 justify-end pt-3 border-t border-slate-200 dark:border-slate-700">
                <button 
                  type="button"
                  onClick={() => setSelectedBooking(null)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={updating}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 rounded-xl text-sm font-semibold text-white shadow-md shadow-amber-500/20 transition-all"
                >
                  {updating ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
