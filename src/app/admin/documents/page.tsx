'use client';

import React, { useEffect, useState } from 'react';
import documentService, { Document } from '@/services/documentService';

export default function DocumentsVault() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocs, setFilteredDocs] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');

  const loadDocuments = async () => {
    try {
      const data = await documentService.getDocuments();
      setDocuments(data);
      setFilteredDocs(data);
    } catch (error) {
      console.error('Failed to load documents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  useEffect(() => {
    let result = documents;

    if (typeFilter !== 'ALL') {
      result = result.filter(d => (d.file_type || '').toUpperCase() === typeFilter);
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(d => 
        d.name.toLowerCase().includes(q) ||
        d.user_id.toString().includes(q) ||
        (d.operational_ticket_id && d.operational_ticket_id.toString().includes(q)) ||
        (d.file_type && d.file_type.toLowerCase().includes(q))
      );
    }

    setFilteredDocs(result);
  }, [searchQuery, typeFilter, documents]);

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

  // Get unique file types for filter
  const fileTypes = ['ALL', ...Array.from(new Set(documents.map(d => (d.file_type || 'UNKNOWN').toUpperCase())))];

  return (
    <div className="space-y-6">
      
      {/* FILTER & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors duration-300">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Type:</span>
          {fileTypes.map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                typeFilter === type
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/15'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search docs by name, client ID, ticket #..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>
      </div>

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
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No documents found matching your search criteria.
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 font-semibold">#{doc.id}</td>
                    <td className="p-4">#{doc.user_id}</td>
                    <td className="p-4 font-medium text-slate-500">
                      {doc.operational_ticket_id ? `#${doc.operational_ticket_id}` : 'General'}
                    </td>
                    <td className="p-4 truncate max-w-xs font-medium text-slate-800 dark:text-white">{doc.name}</td>
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
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 rounded-lg text-xs font-semibold text-white shadow-md shadow-amber-500/10 transition-all cursor-pointer"
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
