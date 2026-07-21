// Centralized Analytics & Conversion Tracking Helper
// Sends events cleanly to both Google Tag Manager (GTM dataLayer) and GA4 (gtag)

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Tracks a lead conversion event when a visitor submits an inquiry or contact form.
 * Works natively with both GTM (dataLayer.push) and GA4 (gtag).
 */
export const trackLeadEvent = (data?: {
  source?: string;
  service?: string;
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: any;
}) => {
  if (typeof window === "undefined") return;

  const eventPayload = {
    event_category: data?.event_category || "Contact",
    event_label: data?.event_label || `Contact Form - ${data?.source || "Website"}`,
    value: data?.value || 100,
    currency: "USD",
    service_requested: data?.service || "General Inquiry",
    ...data,
  };

  // 1. Push to Google Tag Manager (GTM dataLayer)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "generate_lead",
    ...eventPayload,
  });

  // 2. Push to Google Analytics 4 (GA4 gtag)
  if (typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", eventPayload);
  }

  console.log("Analytics Lead Event Tracked:", eventPayload);
};
