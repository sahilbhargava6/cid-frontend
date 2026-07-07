import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.consideritdone.com"),
  title: "consider-itdone | Premium US Business & Home Solutions",
  description:
    "Stress-free Tax Resolution, Accurate Virtual Bookkeeping, Home Solar Systems, Unified Business Accounts & Logistics, and Global Procurement Services — all handled by US-based experts.",
  keywords: [
    "consider it done",
    "consider-itdone",
    "tax preparation",
    "tax resolution",
    "virtual bookkeeping",
    "home solar systems",
    "solar installation",
    "small business management",
    "business logistics",
    "procurement services",
    "US business solutions",
    "US based experts",
    "home solutions"
  ],
  authors: [{ name: "consider-itdone" }],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/Consider_it_done_LOGO_4.webp', type: 'image/webp' }
    ],
    apple: [
      { url: '/Consider_it_done_LOGO_4.png' }
    ]
  },
  openGraph: {
    title: "consider-itdone | Premium US Business & Home Solutions",
    description:
      "From tax resolution to solar installations — we handle everything so you don't have to.",
    url: "https://www.consideritdone.com",
    siteName: "consider-itdone",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "consider-itdone | Premium US Business & Home Solutions",
    description:
      "From tax resolution to solar installations — we handle everything so you don't have to.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                  navigator.serviceWorker.getRegistrations().then(function(registrations) {
                    for (let registration of registrations) {
                      registration.unregister();
                    }
                  });
                } else {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js').then(function(reg) {
                      console.log('ServiceWorker registration successful with scope: ', reg.scope);
                    }, function(err) {
                      console.log('ServiceWorker registration failed: ', err);
                    });
                  });
                }
              }
            `
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "consider-itdone",
              description:
                "Premium US-based business services: Tax Preparation, Virtual Bookkeeping, Home Solar Systems, Small Business Management, and Procurement.",
              url: "https://www.consideritdone.com",
              areaServed: "United States",
              serviceType: [
                "Tax Preparation",
                "Virtual Bookkeeping",
                "Home Solar Systems",
                "Small Business Management",
                "Procurement Services",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
