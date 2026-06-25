'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import bookingService, { Booking } from '@/services/bookingService';
import documentService, { Document } from '@/services/documentService';
import ProtectedRoute from '@/components/ProtectedRoute';
import { DashboardLayout } from '@/components/dashboard/Layout';

function DashboardContent() {
  const { user } = useAuth();
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  
  // File upload state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [selectedTicketId, setSelectedTicketId] = useState<string>('');
  const [uploadName, setUploadName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

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
        <div className="flex flex-col gap-1.5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Welcome, {user?.name}!</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Manage your bookings and secure documents below.
            </p>
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
                    const progressPercent = isCompleted ? 100 : 40;
                    const progressBg = isCompleted ? 'bg-green-500' : 'bg-amber-500';
                    
                    return (
                      <div key={booking.id} className="p-4 bg-white/10 dark:bg-slate-950/20 border border-white/10 dark:border-white/5 rounded-2xl flex flex-col justify-between h-48 hover:scale-[1.01] transition-transform duration-200">
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
                            {booking.service_type.replace('_', ' ')}
                          </p>
                          <p className="text-xs text-slate-400 capitalize mt-1">
                            Status: {booking.status.replace('_', ' ')}
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
                              <button className="px-3.5 py-1 bg-amber-500 hover:bg-amber-600 rounded-lg text-[10px] font-bold text-white shadow-md shadow-amber-500/10 transition-all">
                                Pay ${booking.price || '0.00'}
                              </button>
                            ) : (
                              <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2.5 py-1 rounded-lg">Paid ✓</span>
                            )}
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
                        #{b.id} - {b.service_type.replace('_', ' ')}
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
    </DashboardLayout>
  );
}

export default function ClientDashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}


