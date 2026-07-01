"use client";

import React, { useState, useEffect } from "react";
import { getSiteConfig, saveSiteConfig, resetSiteConfig, type SiteConfig, type HeroHoverItem, type FAQCategory, type FAQItem } from "@/data/siteConfigData";

export default function SiteSettingsPage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [activeTab, setActiveTab] = useState<"general" | "hero" | "whyus" | "faqs" | "about">("general");
  const [successMsg, setSuccessMsg] = useState("");

  // Hero section editing states
  const [selectedHeroKey, setSelectedHeroKey] = useState<string>("procurement");
  const [newBulletText, setNewBulletText] = useState("");

  // About us editing states
  const [newAboutBulletText, setNewAboutBulletText] = useState("");

  // FAQ editing states
  const [selectedFaqCatIndex, setSelectedFaqCatIndex] = useState<number>(0);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newAnswerText, setNewAnswerText] = useState("");

  useEffect(() => {
    setConfig(getSiteConfig());
  }, []);

  if (!config) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  const handleSave = (updated: SiteConfig) => {
    saveSiteConfig(updated);
    setConfig(updated);
    showSuccess("Configuration saved successfully!");
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to restore all website content to defaults? This will erase your custom edits.")) {
      resetSiteConfig();
      const fresh = getSiteConfig();
      setConfig(fresh);
      showSuccess("Restored default website content!");
    }
  };

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // Helper to handle general text input updates
  const updateConfigField = (field: keyof SiteConfig, value: any) => {
    const updated = { ...config, [field]: value };
    handleSave(updated);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Website Settings</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage the text, content, and FAQs displayed on the customer landing page.</p>
        </div>
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl text-sm font-semibold transition duration-150"
        >
          Reset to Defaults
        </button>
      </div>

      {/* Success Alert Banner */}
      {successMsg && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl flex items-center gap-3 animate-fade-in shadow-sm">
          <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-semibold text-sm">{successMsg}</span>
        </div>
      )}

      {/* Tabs Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Navigation Links */}
        <div className="w-full lg:w-64 flex-shrink-0 flex flex-row lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab("general")}
            className={`px-4 py-3 rounded-xl text-left font-bold text-sm transition whitespace-nowrap ${activeTab === "general"
                ? "bg-amber-500/10 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 lg:border-l-4 lg:border-amber-500 lg:rounded-l-none"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/30 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
          >
            📋 Brand & Contact
          </button>
          <button
            onClick={() => setActiveTab("hero")}
            className={`px-4 py-3 rounded-xl text-left font-bold text-sm transition whitespace-nowrap ${activeTab === "hero"
                ? "bg-amber-500/10 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 lg:border-l-4 lg:border-amber-500 lg:rounded-l-none"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/30 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
          >
            🦸 Hero Hover Cards
          </button>
          <button
            onClick={() => setActiveTab("whyus")}
            className={`px-4 py-3 rounded-xl text-left font-bold text-sm transition whitespace-nowrap ${activeTab === "whyus"
                ? "bg-amber-500/10 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 lg:border-l-4 lg:border-amber-500 lg:rounded-l-none"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/30 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
          >
            🤔 Why Choose Us
          </button>
          <button
            onClick={() => setActiveTab("faqs")}
            className={`px-4 py-3 rounded-xl text-left font-bold text-sm transition whitespace-nowrap ${activeTab === "faqs"
                ? "bg-amber-500/10 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 lg:border-l-4 lg:border-amber-500 lg:rounded-l-none"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/30 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
          >
            💬 FAQ Accordion
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`px-4 py-3 rounded-xl text-left font-bold text-sm transition whitespace-nowrap ${activeTab === "about"
                ? "bg-amber-500/10 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 lg:border-l-4 lg:border-amber-500 lg:rounded-l-none"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/30 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
          >
            ℹ️ About Us Page
          </button>
        </div>

        {/* Right Side: Tab Contents */}
        <div className="flex-1 bg-white text-slate-800 dark:text-slate-800 border border-slate-200/80 rounded-3xl p-6 lg:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          {/* TAB 1: GENERAL BRAND & CONTACT */}
          {activeTab === "general" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-800">Brand & Contact Information</h2>
              <hr className="border-slate-100" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Brand Title</label>
                  <input
                    type="text"
                    value={config.brandName}
                    onChange={(e) => updateConfigField("brandName", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white dark:bg-white text-slate-800 dark:text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 text-sm font-semibold"
                    placeholder="consider-itdone"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Contact Email</label>
                  <input
                    type="email"
                    value={config.contactEmail}
                    onChange={(e) => updateConfigField("contactEmail", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white dark:bg-white text-slate-800 dark:text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 text-sm font-semibold"
                    placeholder="info@consideritdone.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Contact Phone</label>
                  <input
                    type="text"
                    value={config.contactPhone}
                    onChange={(e) => updateConfigField("contactPhone", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white dark:bg-white text-slate-800 dark:text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 text-sm font-semibold"
                    placeholder="(973) 555-0199"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Contact Address</label>
                  <input
                    type="text"
                    value={config.contactAddress}
                    onChange={(e) => updateConfigField("contactAddress", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white dark:bg-white text-slate-800 dark:text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 text-sm font-semibold"
                    placeholder="Lake Hopatcong, NJ 07849"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HERO HOVER CARDS */}
          {activeTab === "hero" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-800">Hero Hover Glass Cards</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Customize the popups visible when hovering over the character elements.</p>
                </div>
                <select
                  value={selectedHeroKey}
                  onChange={(e) => setSelectedHeroKey(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white dark:bg-white text-sm font-bold text-slate-800 dark:text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                >
                  <option value="solar">Solar (Roof)</option>
                  <option value="business">Business Solutions (Bottom Left)</option>
                  <option value="tax">Tax Preparation (Bottom Center-Left)</option>
                  <option value="bookkeeping">Bookkeeping (Right Balcony)</option>
                  <option value="procurement">Procurement (Bottom Right)</option>
                </select>
              </div>
              <hr className="border-slate-100" />

              {(() => {
                const hoverItem = config.heroHovers[selectedHeroKey];
                if (!hoverItem) return null;

                const updateHoverTitle = (val: string) => {
                  const updatedHovers = {
                    ...config.heroHovers,
                    [selectedHeroKey]: { ...hoverItem, title: val }
                  };
                  updateConfigField("heroHovers", updatedHovers);
                };

                const deleteBullet = (bulletIndex: number) => {
                  const filteredBullets = hoverItem.bullets.filter((_, idx) => idx !== bulletIndex);
                  const updatedHovers = {
                    ...config.heroHovers,
                    [selectedHeroKey]: { ...hoverItem, bullets: filteredBullets }
                  };
                  updateConfigField("heroHovers", updatedHovers);
                };

                const addBullet = () => {
                  if (!newBulletText.trim()) return;
                  const updatedBullets = [...hoverItem.bullets, newBulletText.trim()];
                  const updatedHovers = {
                    ...config.heroHovers,
                    [selectedHeroKey]: { ...hoverItem, bullets: updatedBullets }
                  };
                  updateConfigField("heroHovers", updatedHovers);
                  setNewBulletText("");
                };

                return (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Card Popup Title</label>
                      <input
                        type="text"
                        value={hoverItem.title}
                        onChange={(e) => updateHoverTitle(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white dark:bg-white text-slate-800 dark:text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 text-sm font-semibold"
                        placeholder="Procurement & Sourcing Services"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Bullet Points</label>
                      <ul className="space-y-2 mt-2">
                        {hoverItem.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200/60 text-slate-800 dark:text-slate-800">
                            <span className="text-sm font-semibold">{bullet}</span>
                            <button
                              onClick={() => deleteBullet(idx)}
                              className="text-xs text-rose-500 hover:text-rose-700 font-bold px-2 py-1 rounded hover:bg-rose-50 transition"
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>

                      {/* Add Bullet Control */}
                      <div className="flex gap-2 mt-4">
                        <input
                          type="text"
                          value={newBulletText}
                          onChange={(e) => setNewBulletText(e.target.value)}
                          placeholder="Add details / bullet point..."
                          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white dark:bg-white text-slate-800 dark:text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                          onKeyDown={(e) => e.key === "Enter" && addBullet()}
                        />
                        <button
                          onClick={addBullet}
                          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-bold shadow-sm transition"
                        >
                          Add Bullet
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB 3: WHY CHOOSE US */}
          {activeTab === "whyus" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-800">Why Choose Us Block Configuration</h2>
              <hr className="border-slate-100" />

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Section Headline Title</label>
                  <input
                    type="text"
                    value={config.whyChooseUsTitle}
                    onChange={(e) => updateConfigField("whyChooseUsTitle", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white dark:bg-white text-slate-800 dark:text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 text-sm font-semibold"
                    placeholder="Why Smart People Work With Us"
                  />
                </div>

                {/* Left block settings */}
                {/* Left block settings */}
                <div className="p-5 border border-slate-200/80 rounded-2xl bg-slate-50/50 space-y-4">
                  <h3 className="text-sm font-bold text-slate-700 dark:text-slate-700">Left Column Card (Tall block)</h3>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Card Title</label>
                    <input
                      type="text"
                      value={config.whyChooseUsLeft.title}
                      onChange={(e) => {
                        const updated = {
                          ...config,
                          whyChooseUsLeft: { ...config.whyChooseUsLeft, title: e.target.value }
                        };
                        handleSave(updated);
                      }}
                      className="w-full px-4 py-2 border border-slate-200 bg-white dark:bg-white text-slate-800 dark:text-slate-800 rounded-xl text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Card Description text (comma-separated)</label>
                    <textarea
                      value={config.whyChooseUsLeft.description}
                      onChange={(e) => {
                        const updated = {
                          ...config,
                          whyChooseUsLeft: { ...config.whyChooseUsLeft, description: e.target.value }
                        };
                        handleSave(updated);
                      }}
                      className="w-full px-4 py-2 border border-slate-200 bg-white dark:bg-white text-slate-800 dark:text-slate-800 rounded-xl text-sm font-semibold h-20 resize-none"
                    />
                  </div>
                </div>

                {/* Right block card 1 settings */}
                <div className="p-5 border border-slate-200/80 rounded-2xl bg-slate-50/50 space-y-4">
                  <h3 className="text-sm font-bold text-slate-700 dark:text-slate-700">Right Column - Card 1 (You Save)</h3>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Card Title</label>
                    <input
                      type="text"
                      value={config.whyChooseUsRight1.title}
                      onChange={(e) => {
                        const updated = {
                          ...config,
                          whyChooseUsRight1: { ...config.whyChooseUsRight1, title: e.target.value }
                        };
                        handleSave(updated);
                      }}
                      className="w-full px-4 py-2 border border-slate-200 bg-white dark:bg-white text-slate-800 dark:text-slate-800 rounded-xl text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Card Points / Description (comma-separated)</label>
                    <textarea
                      value={Array.isArray(config.whyChooseUsRight1.points) ? config.whyChooseUsRight1.points.join(", ") : (config.whyChooseUsRight1.description || "")}
                      onChange={(e) => {
                        const pts = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
                        const updated = {
                          ...config,
                          whyChooseUsRight1: { 
                            ...config.whyChooseUsRight1, 
                            points: pts,
                            description: e.target.value 
                          }
                        };
                        handleSave(updated);
                      }}
                      className="w-full px-4 py-2 border border-slate-200 bg-white dark:bg-white text-slate-800 dark:text-slate-800 rounded-xl text-sm font-semibold h-20 resize-none"
                    />
                  </div>
                </div>

                {/* Right block card 2 settings */}
                <div className="p-5 border border-slate-200/80 rounded-2xl bg-slate-50/50 space-y-4">
                  <h3 className="text-sm font-bold text-slate-700 dark:text-slate-700">Right Column - Card 2 (You Decide)</h3>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Card Title</label>
                    <input
                      type="text"
                      value={config.whyChooseUsRight2.title}
                      onChange={(e) => {
                        const updated = {
                          ...config,
                          whyChooseUsRight2: { ...config.whyChooseUsRight2, title: e.target.value }
                        };
                        handleSave(updated);
                      }}
                      className="w-full px-4 py-2 border border-slate-200 bg-white dark:bg-white text-slate-800 dark:text-slate-800 rounded-xl text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Card Points / Description (comma-separated)</label>
                    <textarea
                      value={Array.isArray(config.whyChooseUsRight2.points) ? config.whyChooseUsRight2.points.join(", ") : (config.whyChooseUsRight2.description || "")}
                      onChange={(e) => {
                        const pts = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
                        const updated = {
                          ...config,
                          whyChooseUsRight2: { 
                            ...config.whyChooseUsRight2, 
                            points: pts,
                            description: e.target.value 
                          }
                        };
                        handleSave(updated);
                      }}
                      className="w-full px-4 py-2 border border-slate-200 bg-white dark:bg-white text-slate-800 dark:text-slate-800 rounded-xl text-sm font-semibold h-20 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FAQS ACCORDION */}
          {activeTab === "faqs" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-800">FAQ Accordion Manager</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Manage questions and answers sorted by categories.</p>
                </div>
                <select
                  value={selectedFaqCatIndex}
                  onChange={(e) => setSelectedFaqCatIndex(parseInt(e.target.value))}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white dark:bg-white text-sm font-bold text-slate-800 dark:text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                >
                  {config.faqs.map((cat, idx) => (
                    <option key={idx} value={idx}>{cat.category}</option>
                  ))}
                </select>
              </div>
              <hr className="border-slate-100" />

              {(() => {
                const category = config.faqs[selectedFaqCatIndex];
                if (!category) return null;

                const deleteQuestion = (qIndex: number) => {
                  const updatedQuestions = category.questions.filter((_, idx) => idx !== qIndex);
                  const updatedFaqs = config.faqs.map((c, idx) =>
                    idx === selectedFaqCatIndex ? { ...c, questions: updatedQuestions } : c
                  );
                  updateConfigField("faqs", updatedFaqs);
                };

                const addQuestion = () => {
                  if (!newQuestionText.trim() || !newAnswerText.trim()) return;
                  const newQ: FAQItem = { q: newQuestionText.trim(), a: newAnswerText.trim() };
                  const updatedQuestions = [...category.questions, newQ];
                  const updatedFaqs = config.faqs.map((c, idx) =>
                    idx === selectedFaqCatIndex ? { ...c, questions: updatedQuestions } : c
                  );
                  updateConfigField("faqs", updatedFaqs);
                  setNewQuestionText("");
                  setNewAnswerText("");
                };

                return (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      {category.questions.map((faq, idx) => (
                        <div key={idx} className="p-4 bg-slate-50 border border-slate-200/70 rounded-2xl relative group text-slate-800 dark:text-slate-800">
                          <button
                            onClick={() => deleteQuestion(idx)}
                            className="absolute top-4 right-4 text-xs text-rose-500 hover:text-rose-700 font-bold px-2 py-1 rounded hover:bg-rose-50 transition"
                          >
                            Delete FAQ
                          </button>
                          <h4 className="text-sm font-bold text-[#1b5e92] pr-20">{faq.q}</h4>
                          <p className="text-xs text-slate-500 mt-2 leading-relaxed">{faq.a}</p>
                        </div>
                      ))}
                    </div>

                    {/* Add FAQ panel */}
                    <div className="p-6 border border-amber-200/60 bg-amber-50/15 rounded-2xl space-y-4 text-slate-800 dark:text-slate-800">
                      <h4 className="text-sm font-bold text-amber-800">Add New Question in Category &quot;{category.category}&quot;</h4>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Question Text</label>
                        <input
                          type="text"
                          value={newQuestionText}
                          onChange={(e) => setNewQuestionText(e.target.value)}
                          placeholder="e.g. How long do reports take to prepare?"
                          className="w-full px-4 py-2 border border-slate-200 bg-white dark:bg-white text-slate-800 dark:text-slate-800 rounded-xl text-sm font-semibold focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Answer Text</label>
                        <textarea
                          value={newAnswerText}
                          onChange={(e) => setNewAnswerText(e.target.value)}
                          placeholder="e.g. We typically deliver reports within 3-5 business days depending on transaction size..."
                          className="w-full px-4 py-2 border border-slate-200 bg-white dark:bg-white text-slate-800 dark:text-slate-800 rounded-xl text-sm font-semibold h-24 resize-none focus:outline-none"
                        />
                      </div>
                      <button
                        onClick={addQuestion}
                        className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-bold transition shadow-sm"
                      >
                        Create FAQ Entry
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB 5: ABOUT US PAGE */}
          {activeTab === "about" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-800">About Us Page Content</h2>
              <hr className="border-slate-100" />

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Pill Subtitle / Mission Tag</label>
                  <input
                    type="text"
                    value={config.aboutPill}
                    onChange={(e) => updateConfigField("aboutPill", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white dark:bg-white text-slate-800 dark:text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 text-sm font-semibold"
                    placeholder="Our Mission & Philosophy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Main Intro Paragraph</label>
                  <textarea
                    value={config.aboutIntro}
                    onChange={(e) => updateConfigField("aboutIntro", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white dark:bg-white text-slate-800 dark:text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 text-sm font-semibold h-28 resize-none"
                    placeholder="At consider-itdone..."
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column: Why Partner With Us */}
                  <div className="p-5 border border-slate-200/80 rounded-2xl bg-slate-50/50 space-y-4">
                    <h3 className="text-sm font-bold text-slate-700 dark:text-slate-700">Left Column: Bullet Points</h3>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Column Header</label>
                      <input
                        type="text"
                        value={config.aboutCol1Header}
                        onChange={(e) => updateConfigField("aboutCol1Header", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-200 bg-white dark:bg-white text-slate-800 dark:text-slate-800 rounded-xl text-sm font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Bullet Items</label>
                      <ul className="space-y-2 mt-2">
                        {config.aboutCol1Bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-center justify-between gap-3 p-2.5 bg-white border border-slate-200/60 text-slate-800 dark:text-slate-800">
                            <span className="text-xs font-semibold">{bullet}</span>
                            <button
                              onClick={() => {
                                const filtered = config.aboutCol1Bullets.filter((_, i) => i !== idx);
                                updateConfigField("aboutCol1Bullets", filtered);
                              }}
                              className="text-[10px] text-rose-500 hover:text-rose-700 font-bold px-2 py-0.5"
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>

                      <div className="flex gap-2 mt-3">
                        <input
                          type="text"
                          value={newAboutBulletText}
                          onChange={(e) => setNewAboutBulletText(e.target.value)}
                          placeholder="Add new partner reason..."
                          className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white dark:bg-white text-slate-800 dark:text-slate-800 text-xs font-semibold focus:outline-none"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              if (!newAboutBulletText.trim()) return;
                              const updated = [...config.aboutCol1Bullets, newAboutBulletText.trim()];
                              updateConfigField("aboutCol1Bullets", updated);
                              setNewAboutBulletText("");
                            }
                          }}
                        />
                        <button
                          onClick={() => {
                            if (!newAboutBulletText.trim()) return;
                            const updated = [...config.aboutCol1Bullets, newAboutBulletText.trim()];
                            updateConfigField("aboutCol1Bullets", updated);
                            setNewAboutBulletText("");
                          }}
                          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Dynamic Services Description */}
                  <div className="p-5 border border-slate-200/80 rounded-2xl bg-slate-50/50 space-y-4">
                    <h3 className="text-sm font-bold text-slate-700 dark:text-slate-700">Right Column: Overview Text</h3>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Column Header</label>
                      <input
                        type="text"
                        value={config.aboutCol2Header}
                        onChange={(e) => updateConfigField("aboutCol2Header", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-200 bg-white dark:bg-white text-slate-800 dark:text-slate-800 rounded-xl text-sm font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Overview Paragraph</label>
                      <textarea
                        value={config.aboutCol2Text}
                        onChange={(e) => updateConfigField("aboutCol2Text", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-200 bg-white dark:bg-white text-slate-800 dark:text-slate-800 rounded-xl text-sm font-semibold h-36 resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
