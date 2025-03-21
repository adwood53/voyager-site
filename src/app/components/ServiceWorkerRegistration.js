// src/app/components/ServiceWorkerRegistration.js
'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Register the service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((error) => {
            console.log('SW registration failed: ', error);
          });
      });
    }
  }, []);

  return null;
}
