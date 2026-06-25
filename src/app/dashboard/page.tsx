'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import bookingService, { Booking } from '@/services/bookingService';
import documentService, { Document } from '@/services/documentService';
import ProtectedRoute from '@/components/ProtectedRoute';
import { DashboardLayout } from '@/components/dashboard/Layout';
import { ChatPanel } from '@/components/dashboard/ChatPanel';
import { useSearchParams } from 'next/navigation';

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
    if (bookParam) {
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
      await bookingService.createBooking({
        service_type: serviceType as any,
        scheduled_at: scheduledAt || undefined,
        input_parameters: inputParams,
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
          <button 
            onClick={() => { setIsWizardOpen(true); setWizardStep(1); }}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-amber-500/25 transition-all self-start sm:self-center cursor-pointer"
          >
            Book a Service
          </button>
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
            
            <div className="grid grid-cols-2 gap-4 text-xs mb-4 p-3 bg-white/5 rounded-xl border border-white/5">
              <div>
                <span className="text-slate-400 font-bold text-[9px] uppercase tracking-wider block">Status</span>
                <span className="text-slate-800 dark:text-slate-200 capitalize font-medium">{selectedBooking.status.replace(/_/g, ' ')}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold text-[9px] uppercase tracking-wider block">Price</span>
                <span className="text-slate-800 dark:text-slate-200 font-medium">${selectedBooking.price || '0.00'} ({selectedBooking.payment_status})</span>
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
