'use client';

import React, { useEffect, useState } from 'react';
import documentService, { Document } from '@/services/documentService';
import bookingService, { Booking } from '@/services/bookingService';

export default function ClientDocumentsVault() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'tax_filing' | 'receipt' | 'procurement_manifest' | 'other'>('all');
  
  // Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadCategory, setUploadCategory] = useState<'tax_filing' | 'receipt' | 'procurement_manifest' | 'other'>('other');
  const [ticketId, setTicketId] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Preview State
  const [previewDoc, setPreviewDoc] = useState<Document | null>(null);

  const loadData = async () => {
    try {
      const docs = await documentService.getDocuments();
      setDocuments(docs);
      const bks = await bookingService.getBookings();
      setBookings(bks);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      await documentService.uploadDocument(
        selectedFile,
        ticketId ? parseInt(ticketId, 10) : undefined,
        selectedFile.name,
        uploadCategory
      );
      setSuccess('Document uploaded and encrypted successfully!');
      setSelectedFile(null);
      setTicketId('');
      await loadData();
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to upload document.');
    } finally {
      setUploading(false);
    }
  };

  const filteredDocs = documents.filter(
    (doc) => activeTab === 'all' || doc.category === activeTab
  );

  if (loading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-amber-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-4 sm:p-6" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div>
        <h1 className="text-2xl font-black text-slate-800 dark:text-white">Secure Document Vault</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Upload and manage your secure documents. All files are fully encrypted at rest.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Upload Column */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm space-y-4 h-fit">
          <h2 className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
            Upload Document
          </h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                Select File (Max 10MB)
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-500/10 file:text-amber-500 hover:file:bg-amber-500/20"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                Category
              </label>
              <select
                value={uploadCategory}
                onChange={(e) => setUploadCategory(e.target.value as any)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-amber-500"
              >
                <option value="other">Other / General</option>
                <option value="tax_filing">Tax Filing</option>
                <option value="receipt">Receipt / Invoice</option>
                <option value="procurement_manifest">Procurement Manifest</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                Associated Booking (Optional)
              </label>
              <select
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-amber-500"
              >
                <option value="">None / General</option>
                {bookings.map((bk) => (
                  <option key={bk.id} value={bk.id}>
                    #{bk.id} - {bk.service_type.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}
            {success && <p className="text-xs text-green-500">{success}</p>}

            <button
              type="submit"
              disabled={uploading || !selectedFile}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-amber-500/10"
            >
              {uploading ? 'Encrypting & Uploading...' : 'Upload & Encrypt'}
            </button>
          </form>
        </div>

        {/* Vault Grid Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            {[
              { key: 'all', label: 'All Files' },
              { key: 'tax_filing', label: 'Tax Filings' },
              { key: 'receipt', label: 'Receipts' },
              { key: 'procurement_manifest', label: 'Manifests' },
              { key: 'other', label: 'Other' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === tab.key
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/10'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Files Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredDocs.length === 0 ? (
              <div className="col-span-2 text-center py-16 text-slate-400 dark:text-slate-500 text-xs">
                No documents found in this category.
              </div>
            ) : (
              filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:border-amber-500/30 transition-all group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                        {doc.category.replace(/_/g, ' ')}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400">
                        #{doc.id}
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-slate-800 dark:text-white truncate" title={doc.name}>
                      {doc.name}
                    </h3>
                    <p className="text-[10px] text-slate-400">
                      Uploaded {new Date(doc.created_at).toLocaleDateString()} • {doc.file_type?.toUpperCase() || 'File'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                    <button
                      onClick={() => setPreviewDoc(doc)}
                      className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-[11px] font-semibold transition-all"
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => documentService.downloadDocument(doc.id)}
                      className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-[11px] font-semibold transition-all flex items-center justify-center"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-4xl w-full h-[80vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950/40">
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">{previewDoc.name}</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Secure Decrypted View</p>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 bg-slate-100 dark:bg-black/20 p-2 flex items-center justify-center">
              {['png', 'jpg', 'jpeg', 'gif'].includes(previewDoc.file_type?.toLowerCase() || '') ? (
                <img
                  src={documentService.getPreviewUrl(previewDoc.id)}
                  alt={previewDoc.name}
                  className="max-h-full max-w-full object-contain rounded-lg"
                />
              ) : previewDoc.file_type?.toLowerCase() === 'pdf' ? (
                <iframe
                  src={documentService.getPreviewUrl(previewDoc.id)}
                  className="w-full h-full rounded-lg border-0"
                  title="PDF Preview"
                />
              ) : (
                <div className="text-center space-y-3">
                  <p className="text-xs text-slate-500">
                    Preview not available for this file type.
                  </p>
                  <button
                    onClick={() => {
                      documentService.downloadDocument(previewDoc.id);
                      setPreviewDoc(null);
                    }}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-semibold shadow-md shadow-amber-500/10 transition-all"
                  >
                    Download File
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
