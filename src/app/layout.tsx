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
  title: "Consider It Done | Premium US Business & Home Solutions",
  description:
    "Stress-free Tax Resolution, Accurate Virtual Bookkeeping, Home Solar Systems, Unified Business Accounts & Logistics, and Global Procurement Services — all handled by US-based experts.",
  keywords: [
    "tax preparation",
    "virtual bookkeeping",
    "home solar systems",
    "small business management",
    "procurement services",
    "US business solutions",
    "consider it done",
  ],
  authors: [{ name: "Consider It Done" }],
  openGraph: {
    title: "Consider It Done | Premium US Business & Home Solutions",
    description:
      "From tax resolution to solar installations — we handle everything so you don't have to.",
    url: "https://www.consideritdone.com",
    siteName: "Consider It Done",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Consider It Done | Premium US Business & Home Solutions",
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
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Consider It Done",
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
