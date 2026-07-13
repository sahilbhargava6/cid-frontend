'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import { ServiceData, fetchServices, saveServices, resetService, resetAllServices, addService, deleteService, isCustomService } from '@/data/servicesData';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });


export default function AdminServicesEditor() {
  const [services, setServicesState] = useState<ServiceData[]>([]);
  const [editingService, setEditingService] = useState<ServiceData | null>(null);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    let isMounted = true;
    fetchServices().then(data => {
      if (isMounted) setServicesState(data);
    });
    return () => { isMounted = false; };
  }, []);

  const handleEdit = (svc: ServiceData) => {
    setEditingService({ ...svc });
  };

  const handleFieldChange = (field: keyof ServiceData, value: string) => {
    if (!editingService) return;
    setEditingService({ ...editingService, [field]: value });
  };

  const handleSave = async () => {
    if (!editingService) return;

    if (isCustomService(editingService.key)) {
      // For custom services: delete the old version, add the updated one
      deleteService(editingService.key);
      addService(editingService);
    } else {
      // For default services: save as overrides
      const updated = services.map((s) =>
        s.key === editingService.key ? editingService : s
      );
      await saveServices(updated);
    }

    const latestServices = await fetchServices();
    setServicesState(latestServices);
    setEditingService(null);
    setSaveMessage('Service updated successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleResetOne = async (key: string) => {
    resetService(key);
    // Note: If you reset a service, you need to save the empty override to the backend, or clear it from the backend. 
    // Since we save the diff, saving the current state (with the reset) will push the new list.
    const latestServices = await fetchServices();
    setServicesState(latestServices);
    setSaveMessage(`Service "${key}" reset to defaults.`);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleResetAll = async () => {
    if (confirm('Are you sure you want to reset ALL services to their default text and configuration? This cannot be undone.')) {
      resetAllServices();
      const latestServices = await fetchServices();
      setServicesState(latestServices);
      setSaveMessage('All services have been reset to defaults.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleAddNew = async () => {
    const newKey = `custom_${Date.now()}`;
    const newService: ServiceData = {
      key: newKey,
      title: 'New Service',
      image: '/images/services/Procurement.webp',
      bgColor: 'rgba(100, 100, 200, 0.2)',
      textColor: '#1A1A3D',
      headerColor: '#6464C8',
      description: 'Describe your new service here.',
      left: 0, top: 365, pillLeft: 0, pillLabelLeft: 0, pillLabelTop: 751, pillLabelWidth: 190, pillLabelHeight: 74,
    };
    addService(newService);
    const latestServices = await fetchServices();
    setServicesState(latestServices);
    // Immediately open the edit modal for the new service
    setEditingService({ ...newService });
    setSaveMessage('New service created! Edit the details below.');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleDelete = async (key: string) => {
    if (!confirm('Delete this custom service? This cannot be undone.')) return;
    deleteService(key);
    const latestServices = await fetchServices();
    setServicesState(latestServices);
    setSaveMessage('Custom service deleted.');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-dashboard-card rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/10 dark:border-white/5">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Service Editor
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Edit service names, descriptions, images, and colors. Changes apply across the entire website.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-md shadow-amber-500/10 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Add New Service
            </button>
            <button
              onClick={handleResetAll}
              className="px-4 py-2 border border-red-400/30 text-red-500 text-xs font-bold rounded-xl hover:bg-red-500/10 transition-colors"
            >
              Reset All to Defaults
            </button>
          </div>
        </div>

        {/* Success Message */}
        {saveMessage && (
          <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-xs font-bold text-green-600 dark:text-green-400 animate-fade-in">
            ✓ {saveMessage}
          </div>
        )}

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {services.map((svc) => (
            <div
              key={svc.key}
              className="group relative p-5 bg-white/10 dark:bg-slate-950/20 border border-white/10 dark:border-white/5 rounded-2xl hover:bg-white/15 dark:hover:bg-slate-950/30 transition-all duration-200"
            >
              {/* Service Image Preview */}
              <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-900">
                <Image
                  src={svc.image}
                  alt={svc.title}
                  fill
                  className="object-contain"
                  sizes="300px"
                />
              </div>

              {/* Service Info */}
              <h3 className="text-sm font-black text-slate-800 dark:text-white mb-1 line-clamp-2">
                {svc.title}
              </h3>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  Key: {svc.key}
                </p>
              </div>

              {/* Slots & Prices Display */}
              {svc.timeSlots && svc.timeSlots.length > 0 && (
                <div className="mb-3">
                  <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                    Slots & Prices
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {svc.timeSlots.map((slot, sIdx) => (
                      <span 
                        key={sIdx} 
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 text-[9px] font-medium"
                      >
                        <span className="text-slate-500">🕒 {slot.time}</span>
                        <span className="text-amber-505 text-amber-500 font-bold">{slot.label}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Preview Dots */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-4 h-4 rounded-full border border-white/20"
                    style={{ backgroundColor: svc.headerColor }}
                    title="Header Color"
                  />
                  <span className="text-[9px] text-slate-400">Header</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-4 h-4 rounded-full border border-white/20"
                    style={{ backgroundColor: svc.textColor }}
                    title="Text Color"
                  />
                  <span className="text-[9px] text-slate-400">Text</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-4 h-4 rounded-full border border-white/20"
                    style={{ backgroundColor: svc.bgColor }}
                    title="Background Color"
                  />
                  <span className="text-[9px] text-slate-400">BG</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(svc)}
                  className="flex-1 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold rounded-xl border border-amber-500/25 transition-all cursor-pointer"
                >
                  ✏️ Edit Service
                </button>
                {isCustomService(svc.key) ? (
                  <button
                    onClick={() => handleDelete(svc.key)}
                    className="px-3 py-2 border border-red-400/20 text-[10px] font-bold rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
                  >
                    🗑️ Delete
                  </button>
                ) : (
                  <button
                    onClick={() => handleResetOne(svc.key)}
                    className="px-3 py-2 border border-slate-300/20 dark:border-slate-700/30 text-[10px] font-bold rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div
            className="glass-dashboard-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border border-white/10 dark:border-white/5 shadow-2xl relative animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setEditingService(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-6 border-b border-white/10 pb-4">
              Edit: {editingService.title}
            </h3>

            <div className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Service Title
                </label>
                <input
                  type="text"
                  value={editingService.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  className="w-full bg-white/20 dark:bg-slate-900/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Service Image (Upload File)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          if (typeof reader.result === 'string') {
                            handleFieldChange('image', reader.result);
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                    id="service-image-upload"
                  />
                  <label
                    htmlFor="service-image-upload"
                    className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-colors"
                  >
                    Upload Image File
                  </label>
                  <input
                    type="text"
                    value={editingService.image.startsWith('data:') ? 'Custom Uploaded Image (Base64)' : editingService.image}
                    disabled
                    className="flex-1 bg-white/10 dark:bg-slate-900/20 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-slate-400 cursor-not-allowed"
                  />
                </div>
                {/* Live Image Preview */}
                <div className="mt-2 relative w-full h-32 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-white/5">
                  <Image
                    src={editingService.image}
                    alt="Preview"
                    fill
                    className="object-contain"
                    sizes="300px"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Description
                </label>
                <div className="bg-white/20 dark:bg-slate-900/40 border border-white/10 rounded-xl overflow-hidden [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-white/10 [&_.ql-toolbar]:bg-white/50 dark:[&_.ql-toolbar]:bg-slate-800/80 [&_.ql-container]:border-none [&_.ql-editor]:min-h-[200px] text-slate-800 dark:text-white">
                  <ReactQuill
                    theme="snow"
                    value={editingService.description}
                    onChange={(content) => handleFieldChange('description', content)}
                  />
                </div>
              </div>

              {/* Colors Row */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Header Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={editingService.headerColor}
                      onChange={(e) => handleFieldChange('headerColor', e.target.value)}
                      className="w-10 h-10 rounded-lg border-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={editingService.headerColor}
                      onChange={(e) => handleFieldChange('headerColor', e.target.value)}
                      className="flex-1 bg-white/20 dark:bg-slate-900/40 border border-white/10 rounded-xl px-3 py-2 text-[10px] text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Text Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={editingService.textColor}
                      onChange={(e) => handleFieldChange('textColor', e.target.value)}
                      className="w-10 h-10 rounded-lg border-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={editingService.textColor}
                      onChange={(e) => handleFieldChange('textColor', e.target.value)}
                      className="flex-1 bg-white/20 dark:bg-slate-900/40 border border-white/10 rounded-xl px-3 py-2 text-[10px] text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Background Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editingService.bgColor}
                      onChange={(e) => handleFieldChange('bgColor', e.target.value)}
                      placeholder="rgba(63, 166, 114, 0.2)"
                      className="w-full bg-white/20 dark:bg-slate-900/40 border border-white/10 rounded-xl px-3 py-2 text-[10px] text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Time Slots Editor */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Time Slots
                </label>
                <div className="space-y-2">
                  {(editingService.timeSlots || []).map((slot, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={slot.time}
                        onChange={(e) => {
                          const newSlots = JSON.parse(JSON.stringify(editingService.timeSlots || []));
                          newSlots[index].time = e.target.value;
                          handleFieldChange('timeSlots', newSlots as any);
                        }}
                        placeholder="e.g. 09:00 AM"
                        className="flex-1 bg-white/20 dark:bg-slate-900/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-white"
                      />
                      <input
                        type="text"
                        value={slot.label}
                        onChange={(e) => {
                          const newSlots = JSON.parse(JSON.stringify(editingService.timeSlots || []));
                          newSlots[index].label = e.target.value;
                          handleFieldChange('timeSlots', newSlots as any);
                        }}
                        placeholder="e.g. 1 hr | $75"
                        className="flex-1 bg-white/20 dark:bg-slate-900/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newSlots = (editingService.timeSlots || []).filter((_, i) => i !== index);
                          handleFieldChange('timeSlots', newSlots as any);
                        }}
                        className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-xl transition-colors"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newSlots = [...(editingService.timeSlots || []), { time: '12:00 PM', label: '1 hr' }];
                      handleFieldChange('timeSlots', newSlots as any);
                    }}
                    className="w-full py-2 border border-dashed border-white/20 text-xs font-bold text-slate-500 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    + Add Time Slot
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => setEditingService(null)}
                  className="px-5 py-2.5 border border-slate-300 dark:border-slate-700 text-xs font-bold rounded-xl text-slate-700 dark:text-slate-300 hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-md shadow-amber-500/10 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
