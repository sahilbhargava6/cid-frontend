// Centralized Service Data Store
// Single source of truth for all service metadata across the entire website.

export interface ServiceData {
  key: string;
  title: string;
  image: string;
  bgColor: string;
  textColor: string;
  headerColor: string;
  description: string;
  // Layout coordinates for the services page
  left: number;
  top: number;
  pillLeft: number;
  pillLabelLeft: number;
  pillLabelTop: number;
  pillLabelWidth: number;
  pillLabelHeight: number;
}

const STORAGE_KEY = "cid_services_data";
const CUSTOM_STORAGE_KEY = "cid_custom_services";

export const defaultServices: ServiceData[] = [
  {
    key: "procurement",
    title: "Procurement & Sourcing Services",
    image: "/images/services/Procurement.webp",
    bgColor: "rgba(63, 166, 114, 0.2)",
    textColor: "#0D2B1A",
    headerColor: "#3FA672",
    description: `· Vendor Negotiation & Cost Optimization: Looking to buy a car or any large household item and do not want to haggle? Our Experts leverage supply chain knowledge to negotiate the best rates and quality for items, ensuring you get the right products at the right time without overpaying.
· Personalized Errand Services: Dedicated assistants can manage your weekly grocery shopping, pick up prescriptions at local pharmacies, and handle routine post office tasks right in the Lake Hopatcong area.
· Specialized Product Sourcing: Need a specific mobility aid, home medical equipment, or hard-to-find household item? Professionals can source, negotiate prices, and arrange delivery directly to your door.
· Home Setup and Management: Sourcing services can help procure household services such as meal preparation, light housekeeping, and professional organizing tailored specifically to your lifestyle and physical needs.
· Concierge and Transportation: Beyond sourcing goods, these services coordinate and provide door-to-door transportation to medical appointments, social events, and family visits, ensuring safe and reliable travel.`,
    left: 166, top: 360, pillLeft: 166, pillLabelLeft: 222, pillLabelTop: 732, pillLabelWidth: 189, pillLabelHeight: 111,
  },
  {
    key: "accounts_and_logistics",
    title: "Small Business Management Solutions",
    image: "/images/services/business.webp",
    bgColor: "rgba(232, 80, 58, 0.2)",
    textColor: "#5C1A0F",
    headerColor: "#E8503A",
    description: `· Insufficient Capital and Cash Flow: Many businesses close their doors simply because they run out of contingency cash or face poor cash flow. Balancing incoming revenue with expenses requires meticulous tracking to avoid sinking.
· Difficulty Finding and Keeping Customers: Standing out in a crowded market and maintaining a steady stream of clients is a persistent struggle.
· Rising Costs and Complexities: Coping with inflation, shifting economic conditions, and the need to integrate costly software can overwhelm limited operational bandwidth.
· Attracting and Retaining Key Talent: Competing for skilled employees is tough. Small businesses must focus on building a unique company culture to make up for lacking the resources of larger corporations.
· Stagnating Growth and Scalability: Many businesses get stuck relying on the same small pool of existing customers. Successfully scaling up requires clear planning, better Biz2Credit strategies, and overcoming fragmented fulfillment.`,
    left: 486, top: 365, pillLeft: 490, pillLabelLeft: 531, pillLabelTop: 732, pillLabelWidth: 218, pillLabelHeight: 111,
  },
  {
    key: "tax_prep",
    title: "Tax Preparation & Resolution for Individuals and LLCs",
    image: "/images/services/tax.webp",
    bgColor: "rgba(45, 111, 163, 0.2)",
    textColor: "#0A1E35",
    headerColor: "#2D6FA3",
    description: `· Separate your personal and business finances immediately. Maintain dedicated bank accounts and credit cards for your LLC to preserve your limited liability protection.
· Track every potential deduction with digital receipts. Capture expenses like home office costs, vehicle mileage, and equipment purchases using apps like QuickBooks Online or Expensify.
· Calculate and pay your quarterly estimated taxes. Avoid underpayment penalties by submitting quarterly payments to the IRS and state via the IRS EFTPS portal.
· Choose the optimal tax classification for your LLC. Evaluate whether filing as a Sole Proprietor, Partnership, S-Corp, or C-Corp minimizes your self-employment tax burden.
· Gather all annual tax documentation early. Collect forms like W-2s, 1099s, K-1s, and business financial statements before scheduling time with a tax professional.`,
    left: 807, top: 365, pillLeft: 811, pillLabelLeft: 851, pillLabelTop: 751, pillLabelWidth: 220, pillLabelHeight: 74,
  },
  {
    key: "solar",
    title: "Solar, Roofing, Gutter and Generac Solutions (NJ/NY/PA)",
    image: "/images/services/solar.webp",
    bgColor: "rgba(232, 114, 140, 0.2)",
    textColor: "#3D0A1E",
    headerColor: "#E8728C",
    description: `Have questions about Solar, Roofing, Gutter and Generac Solutions (NJ/NY/PA)? We can answer all questions you have about Solar and clear any misconceptions you have:
· Are they really free?
· Do they increase property taxes?
· Do they work during blackouts?
· Is there still a federal tax credit?

Our team provides expert guidance on residential and commercial solar installations, helping you understand the true costs, savings, and incentives available in your area.`,
    left: 1127, top: 365, pillLeft: 1132, pillLabelLeft: 1191, pillLabelTop: 751, pillLabelWidth: 184, pillLabelHeight: 74,
  },
  {
    key: "virtual_bookkeeping",
    title: "Virtual Bookkeeping",
    image: "/images/services/bookkeeping.webp",
    bgColor: "rgba(63, 166, 114, 0.2)",
    textColor: "#0D2B1A",
    headerColor: "#3FA672",
    description: `· Leverage accountant-specific software versions. Use dedicated platforms like QuickBooks Online Accountant or Xero HQ to manage multiple client files from a single dashboard.
· Charge fixed monthly value pricing. Avoid hourly billing by charging flat monthly fees based on transaction volume and the number of bank accounts you reconcile.
· Implement a strict security protocol. Secure client bank data by using password managers like 1Password and requiring multi-factor authentication (MFA) on all financial accounts.
· Establish strict document collection deadlines. Inform clients that missing receipts or statements not uploaded to portals like Hubdoc by your monthly cutoff will delay their financial reporting.`,
    left: 1444, top: 365, pillLeft: 1453, pillLabelLeft: 1516, pillLabelTop: 747, pillLabelWidth: 183, pillLabelHeight: 74,
  },
];

/**
 * Retrieve the current services list.
 * Merges any admin overrides from localStorage with defaults.
 */
export function getServices(): ServiceData[] {
  if (typeof window === "undefined") return defaultServices;

  try {
    // Merge overrides for default services
    const stored = localStorage.getItem(STORAGE_KEY);
    let result = [...defaultServices];
    if (stored) {
      const overrides: Partial<ServiceData>[] = JSON.parse(stored);
      result = defaultServices.map((defaultSvc) => {
        const override = overrides.find((o) => o.key === defaultSvc.key);
        return override ? { ...defaultSvc, ...override } : defaultSvc;
      });
    }

    // Append custom (admin-added) services
    const customStored = localStorage.getItem(CUSTOM_STORAGE_KEY);
    if (customStored) {
      const customServices: ServiceData[] = JSON.parse(customStored);
      result = [...result, ...customServices];
    }

    return result;
  } catch {
    return defaultServices;
  }
}

/**
 * Persist admin service edits to localStorage.
 */
export function saveServices(services: ServiceData[]): void {
  if (typeof window === "undefined") return;

  // Only store fields that differ from defaults to keep storage lean
  const overrides = services.map((svc) => {
    const def = defaultServices.find((d) => d.key === svc.key);
    if (!def) return svc;

    const diff: Partial<ServiceData> & { key: string } = { key: svc.key };
    (Object.keys(svc) as (keyof ServiceData)[]).forEach((k) => {
      if (svc[k] !== def[k]) {
        (diff as any)[k] = svc[k];
      }
    });
    return diff;
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

/**
 * Get a single service by its route key.
 */
export function getServiceByKey(key: string): ServiceData | undefined {
  return getServices().find((s) => s.key === key);
}

/**
 * Reset all services back to defaults (removes overrides AND custom services).
 */
export function resetAllServices(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(CUSTOM_STORAGE_KEY);
}

/**
 * Reset a single service back to its default.
 */
export function resetService(key: string): void {
  if (typeof window === "undefined") return;
  const def = defaultServices.find((d) => d.key === key);
  if (def) {
    // It's a default service — reset overrides
    const current = getServices();
    const updated = current.filter((s) => defaultServices.some((d) => d.key === s.key));
    const resetted = updated.map((s) => (s.key === key ? { ...def } : s));
    saveServices(resetted);
  } else {
    // It's a custom service — remove it
    deleteService(key);
  }
}

/**
 * Add a new custom service.
 */
export function addService(service: ServiceData): void {
  if (typeof window === "undefined") return;
  const customStored = localStorage.getItem(CUSTOM_STORAGE_KEY);
  const custom: ServiceData[] = customStored ? JSON.parse(customStored) : [];
  custom.push(service);
  localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(custom));
}

/**
 * Delete a custom service by key.
 */
export function deleteService(key: string): void {
  if (typeof window === "undefined") return;
  // Only allow deleting custom services, not defaults
  if (defaultServices.some((d) => d.key === key)) return;
  const customStored = localStorage.getItem(CUSTOM_STORAGE_KEY);
  if (!customStored) return;
  const custom: ServiceData[] = JSON.parse(customStored);
  const filtered = custom.filter((s) => s.key !== key);
  localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(filtered));
}

/**
 * Check if a service is a custom (admin-added) service.
 */
export function isCustomService(key: string): boolean {
  return !defaultServices.some((d) => d.key === key);
}
