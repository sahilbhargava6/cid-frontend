'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { ServiceData, defaultTimeSlots, fetchServices, getServiceByKeyAsync, getServiceByKey } from '@/data/servicesData';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import bookingService, { Booking } from '@/services/bookingService';
import documentService, { Document } from '@/services/documentService';
import ProtectedRoute from '@/components/ProtectedRoute';
import { DashboardLayout } from '@/components/dashboard/Layout';
import { ChatPanel } from '@/components/dashboard/ChatPanel';
import { useSearchParams } from 'next/navigation';
import api from '@/lib/api';

const parsePriceToNumber = (priceStr?: string): number | undefined => {
  if (!priceStr) return undefined;
  const num = parseFloat(priceStr.replace(/[^0-9.-]+/g, ""));
  return isNaN(num) ? undefined : num;
};

function DashboardContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  // File upload state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [selectedTicketId, setSelectedTicketId] = useState<string>('');
  const [uploadName, setUploadName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Booking Wizard states
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [serviceType, setServiceType] = useState<'tax_prep' | 'virtual_bookkeeping' | 'solar' | 'accounts_and_logistics' | 'procurement'>('tax_prep');
  const [scheduledAt, setScheduledAt] = useState('');
  const [inputParams, setInputParams] = useState<Record<string, any>>({});
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  // Client Details / Chat Modal state
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Auto-booking and payment states
  const [autoBooking, setAutoBooking] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Credit Card Form States
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");

  const loadDashboardData = async () => {
    try {
      const [bookingsData, docsData] = await Promise.all([
        bookingService.getBookings(),
        documentService.getDocuments(),
      ]);
      setBookings(bookingsData);
      setDocuments(docsData);
    } catch (error) {
      console.error('Failed to load user portal data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    const bookParam = searchParams.get('book');
    const dateParam = searchParams.get('date');
    const timeParam = searchParams.get('time');
    const paymentParam = searchParams.get('payment');

    if (bookParam && dateParam && timeParam && paymentParam === 'true') {
      if (autoBooking || createdBooking) return;

      const performAutoBooking = async () => {
        setAutoBooking(true);
        try {
          let hours = "09";
          let minutes = "00";
          try {
            const [timeStr, modifier] = timeParam.split(" ");
            const [h, m] = timeStr.split(":");
            let hNum = parseInt(h, 10);
            if (modifier === "PM" && hNum !== 12) hNum += 12;
            if (modifier === "AM" && hNum === 12) hNum = 0;
            hours = String(hNum).padStart(2, "0");
            minutes = m.padStart(2, "0");
          } catch (e) {
            console.error("Error parsing timeParam:", e);
          }
          const formattedDate = `${dateParam} ${hours}:${minutes}:00`;

          let mappedService = bookParam;
          if (bookParam === 'virtual_bookkeeping') mappedService = 'bookkeeping';
          if (bookParam === 'accounts_and_logistics') mappedService = 'small_business';
          
          const svc = await getServiceByKeyAsync(mappedService);
          let priceNum: number | undefined = undefined;

          // Try to extract price from the selected slot label first
          if (svc && svc.timeSlots) {
            const slot = svc.timeSlots.find(
              (s) => s.time.toLowerCase().replace(/\s/g, '') === timeParam.toLowerCase().replace(/\s/g, '')
            );
            if (slot) {
              const priceMatch = slot.label.match(/\$(\d+(\.\d+)?)/);
              if (priceMatch) {
                priceNum = parseFloat(priceMatch[1]);
              }
            }
          }

          if (priceNum === undefined) {
            priceNum = parsePriceToNumber(svc?.price);
          }

          if (priceNum === undefined) {
             const fallbackMap: Record<string, string> = {
               'tax_prep': '299',
               'bookkeeping': '350',
               'small_business': '1200',
               'procurement': '1000'
             };
             priceNum = parsePriceToNumber(fallbackMap[mappedService]);
          }

          const response = await bookingService.createBooking({
            service_type: mappedService as any,
            scheduled_at: formattedDate,
            input_parameters: { notes: "Auto-booked via page selection scheduler modal" },
            price: priceNum,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
          });
          setCreatedBooking(response);
          setShowPaymentModal(true);

          // Clear query parameters from address bar to prevent duplicate bookings on refresh
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (error) {
          console.error("Auto booking failed:", error);
          alert("Failed to auto-create booking. Please try booking directly inside the portal.");
        } finally {
          setAutoBooking(false);
        }
      };

      performAutoBooking();
    } else if (bookParam) {
      if (['tax_prep', 'virtual_bookkeeping', 'solar', 'accounts_and_logistics', 'procurement'].includes(bookParam)) {
        setServiceType(bookParam as any);
        setIsWizardOpen(true);
        setWizardStep(2);
      } else if (bookParam === 'general') {
        setIsWizardOpen(true);
        setWizardStep(1);
      }
    }
  }, [searchParams]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;
    setUploading(true);
    setUploadSuccess(false);
    try {
      await documentService.uploadDocument(uploadFile, selectedTicketId || undefined, uploadName || undefined);
      setUploadFile(null);
      setUploadName('');
      setSelectedTicketId('');
      setUploadSuccess(true);
      await loadDashboardData();
    } catch (error) {
      console.error('File upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (id: number) => {
    try {
      await documentService.downloadDocument(id);
    } catch (error) {
      console.error('Download trigger failed:', error);
    }
  };

  const downloadICS = (booking: Booking) => {
    const title = `consider-itdone: ${booking.service_type.replace(/_/g, ' ').toUpperCase()}`;
    const desc = `Scheduled Session with consider-itdone. Booking ID: #${booking.id}`;

    const start = booking.scheduled_at ? new Date(booking.scheduled_at) : new Date();
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    const formatICSDate = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d\d\d/g, "");
    };

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//consider-itdone//Session Booking Calendar//EN",
      "BEGIN:VEVENT",
      `UID:booking-${booking.id}@consideritdone.com`,
      `DTSTAMP:${formatICSDate(new Date())}`,
      `DTSTART:${formatICSDate(start)}`,
      `DTEND:${formatICSDate(end)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${desc}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `CID-Booking-${booking.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleServiceSelect = (type: any) => {
    setServiceType(type);
    setInputParams({}); // reset parameters
    setWizardStep(2);
  };

  const handleParamChange = (key: string, value: any) => {
    setInputParams(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingLoading(true);
    setBookingError(null);
    try {
      const svc = await getServiceByKeyAsync(serviceType);
      
      let priceNum = parsePriceToNumber(svc?.price) || parsePriceToNumber(getServicePriceEstimate());

      // If a specific time slot is selected, check if it has a custom price in its label
      if (svc?.timeSlots && scheduledAt) {
        const timePart = scheduledAt.split(' ').slice(1).join(' '); // e.g. "09:00 AM"
        const slot = svc.timeSlots.find((s: any) => s.time === timePart);
        if (slot) {
          const match = slot.label.match(/\$(\d+(\.\d{1,2})?)/);
          if (match) {
            priceNum = parseFloat(match[1]);
          }
        }
      }

      await bookingService.createBooking({
        service_type: serviceType as any,
        scheduled_at: scheduledAt || undefined,
        input_parameters: inputParams,
        price: priceNum,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      });
      setIsWizardOpen(false);
      setWizardStep(1);
      setScheduledAt('');
      setInputParams({});
      await loadDashboardData();
    } catch (error: any) {
      console.error('Failed to create booking:', error);
      setBookingError(error.response?.data?.message || 'Failed to submit booking request. Please check connections.');
    } finally {
      setBookingLoading(false);
    }
  };

  const getServicePriceEstimate = () => {
    let mappedService = serviceType;
    const svc = getServiceByKey(mappedService);
    if (svc && svc.price) return svc.price;

    switch (serviceType) {
      case 'tax_prep': return '$299.00';
      case 'virtual_bookkeeping': return '$350.00 / month';
      case 'accounts_and_logistics': return '$1,200.00 / month';
      case 'procurement': return '$1,000.00 Base Sourcing Fee';
      default: return 'Contact for quote';
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-amber-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Welcome Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Welcome, {user?.name}!</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Manage your bookings and secure documents below.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-sm rounded-xl transition-all shadow-sm cursor-pointer"
            >
              Go to Home Page
            </Link>
            <Link
              href="/services"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
            >
              Book a Service
            </Link>
          </div>
        </div>

        {/* Dashboard Grid (Dashboard v4 style layout) */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">

          {/* LEFT 2 COLUMNS: Projects (Bookings) Grid Widget */}
          <div className="xl:col-span-2 space-y-6">

            {/* BOOKINGS WRAPPER (v4 style header + grid) */}
            <div className="glass-dashboard-card rounded-3xl p-6 shadow-xl space-y-6">

              {/* Stats & Header Row */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/10 dark:border-white/5">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Your Booked Services</h3>
                  <p className="text-xs text-slate-400 mt-1">Status overview and scheduling</p>
                </div>

                <div className="flex gap-6 text-slate-700 dark:text-slate-300">
                  <div className="pr-4 border-r border-white/10 dark:border-white/5">
                    <div className="text-xl font-black text-amber-500">{bookings.filter(b => b.status === 'pending').length}</div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Pending</div>
                  </div>
                  <div className="pr-4 border-r border-white/10 dark:border-white/5">
                    <div className="text-xl font-black text-green-500">{bookings.filter(b => b.status === 'completed').length}</div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Completed</div>
                  </div>
                  <div>
                    <div className="text-xl font-black text-slate-900 dark:text-white">{bookings.length}</div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total</div>
                  </div>
                </div>
              </div>

              {/* Bookings Card Grid */}
              {bookings.length === 0 ? (
                <p className="text-sm text-slate-500 dark:text-slate-400 py-6 text-center">You have no active bookings. Book a service to get started!</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bookings.map((booking) => {
                    const isCompleted = booking.status === 'completed';
                    const progressPercent = isCompleted ? 100 : booking.status === 'pending' ? 40 : 70;
                    const progressBg = isCompleted ? 'bg-green-500' : 'bg-amber-500';

                    return (
                      <div
                        key={booking.id}
                        onClick={() => setSelectedBooking(booking)}
                        className="p-4 bg-white/10 dark:bg-slate-950/20 border border-white/10 dark:border-white/5 rounded-2xl flex flex-col justify-between h-48 hover:scale-[1.01] hover:bg-white/15 dark:hover:bg-slate-950/30 transition-all duration-200 cursor-pointer"
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                            ID: #{booking.id}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400/80">
                            {booking.scheduled_at ? new Date(booking.scheduled_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Date Pending'}
                          </span>
                        </div>

                        {/* Mid Section */}
                        <div className="my-3">
                          <p className="text-base font-black text-slate-800 dark:text-white capitalize truncate">
                            {booking.service_type.replace(/_/g, ' ')}
                          </p>
                          <p className="text-xs text-slate-400 capitalize mt-1">
                            Status: {booking.status.replace(/_/g, ' ')}
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
                            {booking.payment_status !== 'paid' ? (
                              <span className="inline-flex px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-500/10">
                                Unpaid (${booking.price || '0.00'})
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2.5 py-1 rounded-lg">Paid ✓</span>
                            )}
                          </div>
                          <span className={`inline-flex px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${isCompleted ? 'text-green-500 bg-green-500/10' : 'text-amber-500 bg-amber-500/10'
                            }`}>
                            {booking.status.replace(/_/g, ' ')}
                          </span>
                        </div>
                        {booking.payment_status !== 'paid' && booking.price && parseFloat(booking.price) > 0 && (
                          <div className="mt-3">
                            <button
                              onClick={async (e) => {
                                e.stopPropagation();
                                try {
                                  const res = await api.post(`/bookings/${booking.id}/checkout`);
                                  if (res.data && res.data.url) {
                                    window.location.href = res.data.url;
                                  }
                                } catch (error: any) {
                                  console.error("Stripe checkout error:", error);
                                  const msg = error.response?.data?.error || "Failed to initiate checkout. Please ensure the admin has set a valid price.";
                                  alert(msg);
                                }
                              }}
                              className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white text-[10px] uppercase tracking-wider font-bold rounded-lg shadow-md transition-all"
                            >
                              Pay Now (${booking.price})
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* DOCUMENT FILES VAULT */}
            <div className="glass-dashboard-card rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Uploaded Document Vault</h3>

              {documents.length === 0 ? (
                <p className="text-sm text-slate-500 dark:text-slate-400">No documents found. Use the uploader tool to share paperwork securely.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="p-4 bg-white/10 dark:bg-slate-950/20 border border-white/10 dark:border-white/5 rounded-2xl flex items-center justify-between gap-3">
                      <div className="overflow-hidden flex items-center gap-3">
                        <span className="relative rounded-xl bg-amber-500/10 p-2.5 text-amber-600 dark:text-amber-400">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </span>
                        <div className="overflow-hidden">
                          <p className="text-sm font-semibold truncate text-slate-800 dark:text-slate-200">{doc.name}</p>
                          <p className="text-[10px] text-slate-400 uppercase mt-0.5">{doc.file_type || 'File'}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownload(doc.id)}
                        className="p-2 bg-white/20 dark:bg-slate-800/50 text-amber-600 dark:text-amber-500 border border-white/25 dark:border-white/5 rounded-xl hover:bg-white/40 dark:hover:bg-slate-700/50 transition-all flex-shrink-0"
                        title="Download file"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: Document Uploader Form */}
          <div className="space-y-6">

            {/* SECURE FILE UPLOADER */}
            <div className="glass-dashboard-card rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Secure Upload Tool</h3>

              {uploadSuccess && (
                <div className="p-3 bg-green-500/10 border border-green-500/25 text-green-700 dark:text-green-400 text-xs font-semibold rounded-xl mb-2">
                  Document uploaded and secured successfully!
                </div>
              )}

              <form onSubmit={handleUpload} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Document Display Name</label>
                  <input
                    type="text"
                    value={uploadName}
                    onChange={(e) => setUploadName(e.target.value)}
                    placeholder="e.g. W2-Form-2025"
                    className="w-full bg-white/20 dark:bg-slate-900/30 border border-white/25 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Associate with Booking</label>
                  <select
                    value={selectedTicketId}
                    onChange={(e) => setSelectedTicketId(e.target.value)}
                    className="w-full bg-white/20 dark:bg-slate-900/30 border border-white/25 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="" className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white">General Upload (No Booking)</option>
                    {bookings.map((b) => (
                      <option key={b.id} value={b.id} className="bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white">
                        #{b.id} - {b.service_type.replace(/_/g, ' ')}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">File Attachment</label>
                  <input
                    type="file"
                    required
                    onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                    className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-500/10 file:text-amber-700 dark:file:bg-slate-900 dark:file:text-slate-300 hover:file:bg-amber-500/20 cursor-pointer"
                  />
                </div>

                <button
                  type="submit"
                  disabled={uploading || !uploadFile}
                  className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white rounded-xl py-3 text-sm font-bold shadow-md shadow-amber-500/10 transition-all mt-4"
                >
                  {uploading ? 'Encrypting & Uploading...' : 'Securely Upload'}
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>

      {/* DYNAMIC MULTI-STEP BOOKING WIZARD MODAL */}
      {isWizardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div
            className="glass-dashboard-card w-full max-w-xl rounded-3xl p-6 sm:p-8 border border-white/10 dark:border-white/5 shadow-2xl relative animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsWizardOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {bookingError && (
              <div className="p-3 bg-red-500/10 border border-red-500/25 text-red-600 dark:text-red-400 text-xs font-semibold rounded-xl mb-4">
                {bookingError}
              </div>
            )}

            {/* STEP 1: SELECT SERVICE */}
            {wizardStep === 1 && (
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">Book a Premium Service</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Select one of our core services to start configuration</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => handleServiceSelect('tax_prep')}
                    className="p-4 bg-white/5 dark:bg-black/20 hover:bg-amber-500/10 border border-white/10 dark:border-white/5 rounded-2xl text-left hover:scale-[1.02] transition-all"
                  >
                    <h4 className="text-sm font-black text-slate-800 dark:text-white">Tax Preparation</h4>
                    <p className="text-[10px] text-slate-400 mt-1">Stress-free resolution & optimized returns</p>
                  </button>

                  <button
                    onClick={() => handleServiceSelect('virtual_bookkeeping')}
                    className="p-4 bg-white/5 dark:bg-black/20 hover:bg-amber-500/10 border border-white/10 dark:border-white/5 rounded-2xl text-left hover:scale-[1.02] transition-all"
                  >
                    <h4 className="text-sm font-black text-slate-800 dark:text-white">Virtual Bookkeeping</h4>
                    <p className="text-[10px] text-slate-400 mt-1">Daily reconciliation & financial clarity</p>
                  </button>

                  <button
                    onClick={() => handleServiceSelect('accounts_and_logistics')}
                    className="p-4 bg-white/5 dark:bg-black/20 hover:bg-amber-500/10 border border-white/10 dark:border-white/5 rounded-2xl text-left hover:scale-[1.02] transition-all"
                  >
                    <h4 className="text-sm font-black text-slate-800 dark:text-white">Accounts & Logistics</h4>
                    <p className="text-[10px] text-slate-400 mt-1">Unified accounts & front desk optimizations</p>
                  </button>

                  <button
                    onClick={() => handleServiceSelect('procurement')}
                    className="p-4 bg-white/5 dark:bg-black/20 hover:bg-amber-500/10 border border-white/10 dark:border-white/5 rounded-2xl text-left hover:scale-[1.02] transition-all"
                  >
                    <h4 className="text-sm font-black text-slate-800 dark:text-white">Procurement Services</h4>
                    <p className="text-[10px] text-slate-400 mt-1">Sourcing anything from cars to real estate</p>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: DYNAMIC PARAMETERS FORM */}
            {wizardStep === 2 && (
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">Configure Parameters</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Enter specifications for your <span className="capitalize text-amber-500 font-bold">{serviceType.replace(/_/g, ' ')}</span> request</p>

                <div className="space-y-4 mb-6">
                  {/* Tax Prep Custom Fields */}
                  {serviceType === 'tax_prep' && (
                    <>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Filing Tax Year</label>
                        <input
                          type="number"
                          placeholder="e.g. 2025"
                          onChange={(e) => handleParamChange('tax_year', e.target.value)}
                          className="w-full bg-white/10 dark:bg-slate-900/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Filing Status</label>
                        <select
                          onChange={(e) => handleParamChange('filing_status', e.target.value)}
                          className="w-full bg-white/10 dark:bg-slate-900/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                        >
                          <option value="single">Single</option>
                          <option value="married_joint">Married Filing Jointly</option>
                          <option value="head_household">Head of Household</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* Virtual Bookkeeping Custom Fields */}
                  {serviceType === 'virtual_bookkeeping' && (
                    <>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Company Legal Name</label>
                        <input
                          type="text"
                          placeholder="Nova Tech Ltd"
                          onChange={(e) => handleParamChange('company_name', e.target.value)}
                          className="w-full bg-white/10 dark:bg-slate-900/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Software Platform</label>
                        <select
                          onChange={(e) => handleParamChange('system', e.target.value)}
                          className="w-full bg-white/10 dark:bg-slate-900/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                        >
                          <option value="QuickBooks">QuickBooks Online</option>
                          <option value="Xero">Xero Accounting</option>
                          <option value="Wave">Wave / Other</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* Accounts & Logistics Custom Fields */}
                  {serviceType === 'accounts_and_logistics' && (
                    <>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Company Legal Name</label>
                        <input
                          type="text"
                          placeholder="Swift Deliveries Inc"
                          onChange={(e) => handleParamChange('company_name', e.target.value)}
                          className="w-full bg-white/10 dark:bg-slate-900/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Scheduling System Integration</label>
                        <select
                          onChange={(e) => handleParamChange('optimization', e.target.value)}
                          className="w-full bg-white/10 dark:bg-slate-900/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                        >
                          <option value="Setmore Front Desk">Setmore Integration</option>
                          <option value="Calendly">Calendly Integration</option>
                        </select>
                      </div>
                    </>
                  )}

                  {/* Procurement Custom Fields */}
                  {serviceType === 'procurement' && (
                    <>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Item Category</label>
                        <select
                          onChange={(e) => handleParamChange('item_category', e.target.value)}
                          className="w-full bg-white/10 dark:bg-slate-900/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                        >
                          <option value="automobile">Automobile / Vehicle</option>
                          <option value="real_estate">Real Estate / Homes</option>
                          <option value="electronics">Electronics / Hardware</option>
                          <option value="other">Other Sourcing Request</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Target Item & Budget</label>
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Tesla Model Y"
                            onChange={(e) => handleParamChange('target_item', e.target.value)}
                            className="w-full bg-white/10 dark:bg-slate-900/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                          />
                          <input
                            type="number"
                            placeholder="Max Budget ($)"
                            onChange={(e) => handleParamChange('max_budget', e.target.value)}
                            className="w-full bg-white/10 dark:bg-slate-900/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setWizardStep(1)}
                    className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-xs font-bold rounded-xl text-slate-700 dark:text-slate-300 hover:bg-white/10 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setWizardStep(3)}
                    className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-md shadow-amber-500/10 transition-all"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: SCHEDULE DATE & SUBMIT */}
            {wizardStep === 3 && (
              <form onSubmit={handleCreateBooking}>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">Schedule & Finish</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Choose a date to finalize your service request configuration</p>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Target Start Date</label>
                    <input
                      type="date"
                      required
                      value={scheduledAt}
                      onChange={(e) => setScheduledAt(e.target.value)}
                      className="w-full bg-white/10 dark:bg-slate-900/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20 text-center">
                    <p className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">Estimated Base Pricing</p>
                    <p className="text-2xl font-black text-slate-800 dark:text-white mt-1">
                      {getServicePriceEstimate()}
                    </p>
                    <p className="text-[9px] text-slate-400 mt-1">Estimates are finalized by admin oversight upon ticket confirmation.</p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setWizardStep(2)}
                    className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-xs font-bold rounded-xl text-slate-700 dark:text-slate-300 hover:bg-white/10 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={bookingLoading}
                    className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-md shadow-amber-500/10 transition-all"
                  >
                    {bookingLoading ? 'Submitting...' : 'Confirm Request'}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* CLIENT BOOKING DETAIL & LIVE CHAT MODAL */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div
            className="glass-dashboard-card w-full max-w-xl rounded-3xl p-6 border border-white/10 dark:border-white/5 shadow-2xl relative animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-lg font-black text-slate-800 dark:text-white capitalize mb-2">
              {selectedBooking.service_type.replace(/_/g, ' ')} Request Details
            </h3>

            <div className="grid grid-cols-3 gap-4 text-xs mb-4 p-3 bg-white/5 rounded-xl border border-white/5 items-center">
              <div>
                <span className="text-slate-400 font-bold text-[9px] uppercase tracking-wider block">Status</span>
                <span className="text-slate-800 dark:text-slate-200 capitalize font-medium">{selectedBooking.status.replace(/_/g, ' ')}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold text-[9px] uppercase tracking-wider block">Price</span>
                <span className="text-slate-800 dark:text-slate-200 font-medium">${selectedBooking.price || '0.00'} ({selectedBooking.payment_status})</span>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => downloadICS(selectedBooking)}
                  className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold rounded-xl border border-amber-500/25 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Add to Calendar
                </button>
              </div>
            </div>

            {/* Booking Progress Stepper Timeline */}
            <div className="my-6">
              <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider block mb-3">Booking Progress</span>
              <div className="relative flex items-center justify-between w-full">
                {/* Horizontal line */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200/20 dark:bg-slate-700/30 z-0" />

                {[
                  { step: "Drafting", key: "Drafting" },
                  { step: "Review", key: "Review" },
                  { step: "Filing", key: "Filing" },
                  { step: "Completed", key: "Completed" }
                ].map((s, idx) => {
                  const milestones = ["Drafting", "Review", "Filing", "Completed"];
                  const currentIdx = milestones.indexOf(selectedBooking.milestone || "Drafting");
                  const isPassed = currentIdx >= idx;

                  return (
                    <div key={s.step} className="relative z-10 flex flex-col items-center gap-1.5">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${isPassed
                        ? "bg-amber-500 text-white shadow-lg shadow-amber-500/25"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-400"
                        }`}>
                        {isPassed ? "✓" : idx + 1}
                      </div>
                      <span className={`text-[10px] font-bold ${isPassed ? "text-slate-800 dark:text-slate-200" : "text-slate-400"}`}>
                        {s.step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live Chat Panel Component */}
            <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-2">
              Live Chat & Document Exchange
            </h4>
            <ChatPanel ticketId={selectedBooking.id} />
          </div>
        </div>
      )}
      {/* PAYMENT OPTION MODAL */}
      {showPaymentModal && createdBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div
            className="glass-dashboard-card w-full max-w-md rounded-3xl p-6 sm:p-8 border border-white/10 dark:border-white/5 shadow-2xl relative animate-scale-in text-slate-800 dark:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setShowPaymentModal(false);
                setCreatedBooking(null);
                setPaymentSuccess(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">
              Payment Checkout
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Secure payment processing for your scheduled session
            </p>

            {paymentSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500 border border-green-500/25">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Payment Completed!</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Your booking #{createdBooking.id} is confirmed. An expert will reach out to you shortly.
                </p>
                <button
                  onClick={() => {
                    setShowPaymentModal(false);
                    setCreatedBooking(null);
                    setPaymentSuccess(false);
                  }}
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-lg cursor-pointer mt-4"
                >
                  Close & View Dashboard
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Summary Info */}
                <div className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Service</span>
                    <span className="font-bold capitalize text-slate-800 dark:text-white">{createdBooking.service_type.replace(/_/g, ' ')}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Scheduled At</span>
                    <span className="font-bold text-slate-800 dark:text-white">{createdBooking.scheduled_at}</span>
                  </div>
                  <div className="border-t border-slate-200/50 dark:border-white/5 my-2 pt-2 flex justify-between items-center text-sm">
                    <span className="text-slate-800 dark:text-slate-200 font-bold">Total Price</span>
                    <span className="font-black text-amber-500">
                      {createdBooking.price ? `$${createdBooking.price}` : (() => {
                        let mappedType: string = createdBooking.service_type;
                        if (createdBooking.service_type === 'bookkeeping') mappedType = 'virtual_bookkeeping';
                        if (createdBooking.service_type === 'small_business') mappedType = 'accounts_and_logistics';
                        const svc = getServiceByKey(mappedType);
                        if (svc && svc.price) return svc.price;

                        return createdBooking.service_type === 'tax_prep' ? '$299.00' :
                          createdBooking.service_type === 'bookkeeping' ? '$350.00' :
                            createdBooking.service_type === 'small_business' ? '$1,200.00' :
                              createdBooking.service_type === 'procurement' ? '$1,000.00' : 'Contact for Quote';
                      })()}
                    </span>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex bg-slate-100 dark:bg-slate-950/60 p-1.5 rounded-xl border border-slate-200/50 dark:border-white/5">
                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${paymentMethod === "card" ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
                      }`}
                  >
                    Credit / Debit Card
                  </button>
                  <button
                    onClick={() => setPaymentMethod("paypal")}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${paymentMethod === "paypal" ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
                      }`}
                  >
                    PayPal / Wire
                  </button>
                </div>

                {paymentMethod === "card" ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        required
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-white/10 dark:bg-slate-900/30 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Card Number</label>
                      <input
                        type="text"
                        required
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                        placeholder="4111 2222 3333 4444"
                        className="w-full bg-white/10 dark:bg-slate-900/30 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Expiry Date</label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full bg-white/10 dark:bg-slate-900/30 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">CVV / CVC</label>
                        <input
                          type="password"
                          required
                          maxLength={3}
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="***"
                          className="w-full bg-white/10 dark:bg-slate-900/30 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50/50 dark:bg-slate-950/20 border border-dashed border-slate-200 dark:border-white/10 rounded-2xl text-center space-y-2">
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">PayPal & Wire Transfers</p>
                    <p className="text-[11px] text-slate-400">
                      Choose this option to receive an invoice via email. You can pay online via PayPal or complete a direct bank transfer prior to your scheduled slot.
                    </p>
                  </div>
                )}

                <div className="flex gap-4 pt-4 border-t border-slate-200/50 dark:border-white/5">
                  <button
                    onClick={async () => {
                      setShowPaymentModal(false);
                      setCreatedBooking(null);
                      await loadDashboardData();
                      alert("Booking saved as Unpaid. You can settle the invoice at any time.");
                    }}
                    className="flex-1 py-3 border border-slate-300 dark:border-slate-700 text-xs font-bold rounded-full text-slate-700 dark:text-slate-300 hover:bg-white/10 transition-colors"
                  >
                    Pay Later
                  </button>
                  <button
                    onClick={async () => {
                      if (paymentMethod === 'card' && (!cardName || !cardNumber || !cardExpiry || !cardCvc)) {
                        alert("Please fill in all credit card details.");
                        return;
                      }
                      setPaymentLoading(true);
                      try {
                        // Simulate payment processing latency
                        await new Promise((resolve) => setTimeout(resolve, 1500));

                        // Update booking to Paid status
                        const priceEstimate =
                          createdBooking.service_type === 'tax_prep' ? '299.00' :
                            createdBooking.service_type === 'bookkeeping' ? '350.00' :
                              createdBooking.service_type === 'small_business' ? '1200.00' :
                                createdBooking.service_type === 'procurement' ? '1000.00' : '0.00';

                        await bookingService.updateBooking(createdBooking.id, {
                          payment_status: 'paid',
                          price: priceEstimate
                        });
                        setPaymentSuccess(true);
                        await loadDashboardData();
                      } catch (error) {
                        console.error("Payment simulator failed:", error);
                        alert("Payment simulated gateway declined. Please check details.");
                      } finally {
                        setPaymentLoading(false);
                      }
                    }}
                    className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-full shadow-lg shadow-amber-500/15 transition-all"
                  >
                    {paymentLoading ? "Processing..." : "Pay Now"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default function ClientDashboard() {
  return (
    <ProtectedRoute>
      <Suspense fallback={
        <div className="flex h-screen w-screen items-center justify-center bg-slate-50 dark:bg-slate-900">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-amber-500 border-t-transparent"></div>
        </div>
      }>
        <DashboardContent />
      </Suspense>
    </ProtectedRoute>
  );
}
