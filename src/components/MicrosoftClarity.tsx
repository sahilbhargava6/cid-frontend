"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";

interface MicrosoftClarityProps {
  clarityId?: string;
}

export default function MicrosoftClarity({ clarityId }: MicrosoftClarityProps) {
  const [dynamicClarityId, setDynamicClarityId] = useState<string | undefined>(
    clarityId || process.env.NEXT_PUBLIC_CLARITY_ID
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("cid_site_config");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed?.clarityId) {
            setDynamicClarityId(parsed.clarityId);
          }
        }
      } catch (e) {
        // Ignore JSON parse errors
      }
    }
  }, []);

  const activeClarityId = dynamicClarityId || process.env.NEXT_PUBLIC_CLARITY_ID;

  if (!activeClarityId) {
    return null;
  }

  return (
    <Script
      id="microsoft-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${activeClarityId}");
        `,
      }}
    />
  );
}
