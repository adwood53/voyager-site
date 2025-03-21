// src/app/components/ServiceWorkerRegistration.js
'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Track visits for Firefox installation prompt
    const visitCount = parseInt(
      localStorage.getItem('siteVisitCount') || '0'
    );
    localStorage.setItem(
      'siteVisitCount',
      (visitCount + 1).toString()
    );
  }, []);

  return (
    <Script id="register-sw" strategy="afterInteractive">
      {`
        if ('serviceWorker' in navigator) {
          window.addEventListener('load', async function() {
            try {
              const registration = await navigator.serviceWorker.register('/service-worker.js', {
                scope: '/partner'
              });
              console.log('ServiceWorker registration successful with scope:', registration.scope);
            } catch(err) {
              console.error('ServiceWorker registration failed:', err);
            }
          });
        }
      `}
    </Script>
  );
}
