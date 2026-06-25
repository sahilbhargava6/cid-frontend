'use client';

import React, { useEffect, useState } from 'react';
import documentService, { Document } from '@/services/documentService';

export default function DocumentsVault() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDocuments = async () => {
    try {
      const data = await documentService.getDocuments();
      setDocuments(data);
    } catch (error) {
      console.error('Failed to load documents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleDownload = async (id: number) => {
    try {
      await documentService.downloadDocument(id);
    } catch (error) {
      console.error('Download trigger failed:', error);
    }
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
      
      {/* DOCUMENTS DATAGRID */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                <th className="p-4">ID</th>
                <th className="p-4">Client ID</th>
                <th className="p-4">Ticket</th>
                <th className="p-4">Name</th>
                <th className="p-4">Type</th>
                <th className="p-4">Uploaded</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-sm text-slate-700 dark:text-slate-300">
              {documents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No documents uploaded in the vault yet.
                  </td>
                </tr>
              ) : (
                documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 font-semibold">#{doc.id}</td>
                    <td className="p-4">#{doc.user_id}</td>
                    <td className="p-4 font-medium text-slate-500">
                      {doc.operational_ticket_id ? `#${doc.operational_ticket_id}` : 'General'}
                    </td>
                    <td className="p-4 truncate max-w-xs">{doc.name}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold uppercase bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400">
                        {doc.file_type || 'Unknown'}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-slate-500">
                      {new Date(doc.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleDownload(doc.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 rounded-lg text-xs font-semibold text-white shadow-md shadow-amber-500/10 transition-all"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
