"use client";

import React, { useEffect, useState, Suspense } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";

interface GoogleAnalyticsProps {
  gaId?: string;
  gtmId?: string;
}

function GoogleAnalyticsTracker({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined" || !(window as any).gtag || !measurementId) {
      return;
    }

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    (window as any).gtag("config", measurementId, {
      page_path: url,
    });
  }, [pathname, searchParams, measurementId]);

  return null;
}

export default function GoogleAnalytics({ gaId, gtmId }: GoogleAnalyticsProps) {
  const [dynamicGaId, setDynamicGaId] = useState<string | undefined>(gaId || process.env.NEXT_PUBLIC_GA_ID);
  const [dynamicGtmId, setDynamicGtmId] = useState<string | undefined>(
    gtmId || process.env.NEXT_PUBLIC_GTM_ID || "GTM-KDFFXMQP"
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("cid_site_config");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed?.googleAnalyticsId) {
            setDynamicGaId(parsed.googleAnalyticsId);
          }
          if (parsed?.googleTagManagerId) {
            setDynamicGtmId(parsed.googleTagManagerId);
          }
        }
      } catch (e) {
        // Ignore JSON parse errors
      }
    }
  }, []);

  const measurementId = dynamicGaId || process.env.NEXT_PUBLIC_GA_ID;
  const activeGtmId = dynamicGtmId || "GTM-KDFFXMQP";

  return (
    <>
      {/* Google Tag Manager (GTM-KDFFXMQP) */}
      {activeGtmId && (
        <>
          <Script
            id="google-tag-manager"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${activeGtmId}');
              `,
            }}
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${activeGtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </>
      )}

      {/* Google Analytics 4 Direct Script (Optional if not handled inside GTM) */}
      {measurementId && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${measurementId}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
          <Suspense fallback={null}>
            <GoogleAnalyticsTracker measurementId={measurementId} />
          </Suspense>
        </>
      )}
    </>
  );
}
