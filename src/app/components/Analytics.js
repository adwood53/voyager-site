// src/components/Analytics.js
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

export default function Analytics() {
  const pathname = usePathname();

  // Determine which property to use based on the path
  const isPartnerSection = pathname?.startsWith('/partner');

  // Use environment variables for the Measurement IDs
  const MAIN_SITE_ID = process.env.NEXT_PUBLIC_MAIN_GA_ID;
  const PARTNER_SITE_ID = process.env.NEXT_PUBLIC_PARTNER_GA_ID;

  const GA_MEASUREMENT_ID = isPartnerSection
    ? PARTNER_SITE_ID
    : MAIN_SITE_ID;

  useEffect(() => {
    // Send pageview to the appropriate property when route changes
    if (window.gtag && GA_MEASUREMENT_ID) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: pathname,
      });
    }
  }, [pathname, GA_MEASUREMENT_ID]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: '${pathname}',
          });
        `}
      </Script>
    </>
  );
}
