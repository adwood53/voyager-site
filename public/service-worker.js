// src/app/components/ServiceWorkerRegistration.js
'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async () => {
        try {
          // First check if service worker is already registered
          const registrations =
            await navigator.serviceWorker.getRegistrations();
          const isRegistered = registrations.some((reg) =>
            reg.scope.includes('/partner')
          );

          if (!isRegistered) {
            const registration =
              await navigator.serviceWorker.register(
                '/service-worker.js',
                {
                  scope: '/partner',
                }
              );
            console.log(
              'ServiceWorker registration successful:',
              registration
            );
          }
        } catch (err) {
          console.error('ServiceWorker registration failed:', err);
        }
      });
    }
  }, []);

  return null;
}
