// Centralized Site Configuration Store
// Single source of truth for all editable homepage blocks, contact info, and FAQs.

import { useState, useEffect } from "react";
import api from "@/lib/api";

export interface HeroHoverItem {
  key: string;
  title: string;
  bullets: string[];
}

export interface WhyChooseUsCard {
  title: string;
  icon: string;
  description?: string;
  points?: string[];
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface FAQCategory {
  category: string;
  questions: FAQItem[];
}

export interface SiteConfig {
  brandName: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  whyChooseUsTitle: string;
  whyChooseUsLeft: WhyChooseUsCard;
  whyChooseUsRight1: WhyChooseUsCard;
  whyChooseUsRight2: WhyChooseUsCard;
  heroHovers: Record<string, HeroHoverItem>;
  faqs: FAQCategory[];
  aboutPill: string;
  aboutIntro: string;
  aboutCol1Header: string;
  aboutCol1Bullets: string[];
  aboutCol2Header: string;
  aboutCol2Text: string;
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  clarityId?: string;
}

const STORAGE_KEY = "cid_site_config";

export const defaultSiteConfig: SiteConfig = {
  brandName: "consider-itdone",
  contactEmail: "service@consider-itdone.com",
  contactPhone: "732-433-0463",
  contactAddress: "692 Skyline Drive, Lake Hopatcong, NJ 07849",
  googleAnalyticsId: "G-YJX2CH8TVC",
  googleTagManagerId: "GTM-KDFFXMQP",
  clarityId: "",
  whyChooseUsTitle: "Why Smart People Work With Us",
  whyChooseUsLeft: {
    title: "You Plan - We Implement",
    icon: "💼",
    description: "Home Improvement, Household Procurements, Tax Preparation, Miscellaneous",
  },
  whyChooseUsRight1: {
    title: "You Save - We Strive",
    icon: "📈",
    points: [
      "Biggest bang for your buck",
      "Unbeatable value",
      "More for less"
    ]
  },
  whyChooseUsRight2: {
    title: "You Decide - We Execute",
    icon: "🎯",
    points: [
      "Make the right call for right results",
      "Think smart , win big",
      "Help us to help you"
    ]
  },
  aboutPill: "Our Mission & Philosophy",
  aboutIntro: "At consider-itdone, we believe execution is everything. We serve as a premium administrative, logistical, and specialized task partner for busy individuals and expanding small businesses across the United States.",
  aboutCol1Header: "Why Partner With Us?",
  aboutCol1Bullets: [
    "100% US-Based Experts & Coordinators",
    "Strict Data Privacy & Security Protocols",
    "No-Gimmicks Performance Guarantees",
    "Custom Integrations tailored to your needs"
  ],
  aboutCol2Header: "Our Dynamic Services",
  aboutCol2Text: "We unify essential personal and business workflows under one virtual roof. From global procurement and supply logistics to tax preparations, virtual bookkeeping, and home solar engineering audits, our teams ensure every task is considered done.",
  heroHovers: {
    procurement: {
      key: "procurement",
      title: "Procurement & Sourcing Services",
      bullets: ["Global item sourcing", "Automobiles & real estate", "Supplier negotiations", "Import logistics management"],
    },
    business: {
      key: "business",
      title: "Small Business Management Solutions",
      bullets: ["Unified accounts", "Front desk optimization", "Logistics coordination", "Cross-selling support"],
    },
    tax: {
      key: "tax",
      title: "Tax Preparation",
      bullets: ["Tax filing", "Tax optimization", "Tax issue resolution", "Compliance support"],
    },
    solar: {
      key: "solar",
      title: "Solar, Roofing, Gutter and Generac Solutions (NJ/NY/PA)",
      bullets: ["Clean electricity", "Lower utility bills", "Custom roof designs", "No gimmicks guarantee"],
    },
    bookkeeping: {
      key: "bookkeeping",
      title: "Virtual Bookkeeping",
      bullets: ["Daily transaction tracking", "Bank accounts reconciliation", "Monthly financial statements", "Year-end tax readiness"],
    },
  },
  faqs: [
    {
      category: "Tax Preparation",
      questions: [
        {
          q: "What types of tax returns do you handle?",
          a: "We handle individual (1040), small business (Schedule C), partnership (1065), S-Corp (1120-S), and C-Corp (1120) returns. We also assist with state filings in all 50 states, amended returns, and back taxes.",
        },
        {
          q: "How do you guarantee accuracy?",
          a: "Every return goes through a triple-check process: initial preparation by a certified tax professional, quality review by a senior accountant, and final compliance check before filing. We cover any penalties due to our errors.",
        },
      ],
    },
    {
      category: "Virtual Bookkeeping",
      questions: [
        {
          q: "How does virtual bookkeeping work?",
          a: "We securely connect to your accounting software (QuickBooks, Xero, FreshBooks, etc.) and handle daily transaction categorization, bank reconciliation, monthly financial statements, and year-end preparation — all remotely.",
        },
        {
          q: "Can you work with my existing accounting software?",
          a: "Absolutely. We support QuickBooks Online, Xero, FreshBooks, Wave, and most major platforms. If you don't have one yet, we'll help you set up the best option for your business.",
        },
      ],
    },
    {
      category: "Home Solar",
      questions: [
        {
          q: "How much can I save with solar panels?",
          a: "Most homeowners save 50–80% on electricity bills. The exact savings depend on your location, roof size, energy usage, and available federal/state incentives. We provide a free assessment with projected savings.",
        },
        {
          q: "Do you handle permits and installation?",
          a: "Yes — we manage the entire process from site assessment, engineering design, permits, installation, utility interconnection, to final inspection. True turnkey service.",
        },
      ],
    },
    {
      category: "Business Management",
      questions: [
        {
          q: "What's included in the unified business solution?",
          a: "Our unified solution covers accounts payable/receivable, payroll management, inventory tracking, shipping logistics, front desk optimization (Setmore, Calendly), and marketing/cross-selling strategy recommendations — all in one package.",
        },
      ],
    },
    {
      category: "Procurement",
      questions: [
        {
          q: "What can you source for me?",
          a: "Virtually anything — electronics, vehicles, industrial equipment, real estate, office supplies, specialized machinery. We leverage our network of vendors and wholesale partnerships to find the best price and quality.",
        },
      ],
    },
  ],
};

/**
 * Retrieve the current site configuration from localStorage with default fallbacks.
 */
export function getSiteConfig(): SiteConfig {
  if (typeof window === "undefined") return defaultSiteConfig;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultSiteConfig, ...JSON.parse(stored) };
    }
  } catch (err) {
    console.error("Failed to parse site config:", err);
  }
  return defaultSiteConfig;
}

/**
 * Retrieve the current site configuration asynchronously from backend API (or localStorage fallback).
 */
export async function fetchSiteConfig(): Promise<SiteConfig> {
  try {
    const res = await api.get("/settings/site_config");
    const stored = res.data;
    if (stored && typeof stored === "object") {
      const merged: SiteConfig = { ...defaultSiteConfig, ...stored };
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          window.dispatchEvent(new CustomEvent("siteConfigChanged"));
        } catch {}
      }
      return merged;
    }
  } catch (error) {
    // Fallback if backend API is not reachable or not yet initialized
  }
  return getSiteConfig();
}

/**
 * React hook to access site config reactively across any component or page.
 */
export function useSiteConfig(): SiteConfig {
  const [config, setConfig] = useState<SiteConfig>(() => getSiteConfig());

  useEffect(() => {
    let isMounted = true;
    fetchSiteConfig().then((data) => {
      if (isMounted && data) setConfig(data);
    });

    const handleConfigChange = () => {
      if (isMounted) setConfig(getSiteConfig());
    };

    window.addEventListener("siteConfigChanged", handleConfigChange);
    window.addEventListener("storage", handleConfigChange);
    return () => {
      isMounted = false;
      window.removeEventListener("siteConfigChanged", handleConfigChange);
      window.removeEventListener("storage", handleConfigChange);
    };
  }, []);

  return config;
}

let saveTimeout: ReturnType<typeof setTimeout> | null = null;

/**
 * Save site configuration to localStorage and backend API.
 */
export async function saveSiteConfig(config: SiteConfig): Promise<void> {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
      window.dispatchEvent(new CustomEvent("siteConfigChanged"));
    } catch (err) {
      console.error("Failed to save site config locally:", err);
    }
  }

  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(async () => {
    try {
      await api.post("/settings/site_config", { value: config });
    } catch (err) {
      console.error("Failed to save site config to backend:", err);
    }
  }, 500);
}

/**
 * Reset site config back to defaults both locally and on backend API.
 */
export async function resetSiteConfig(): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("siteConfigChanged"));
  }

  if (saveTimeout) clearTimeout(saveTimeout);
  try {
    await api.post("/settings/site_config", { value: defaultSiteConfig });
  } catch (err) {
    console.error("Failed to reset site config on backend:", err);
  }
}

/**
 * Helper to clean phone string for tel: link (only digits and leading +)
 */
export function getCleanPhone(phone?: string): string {
  if (!phone) return "";
  return phone.replace(/[^0-9+]/g, "");
}

/**
 * Helper to clean email string for mailto: link
 */
export function getCleanEmail(email?: string): string {
  if (!email) return "";
  return email.trim();
}
