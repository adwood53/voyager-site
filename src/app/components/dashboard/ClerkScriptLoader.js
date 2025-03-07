// src/app/components/dashboard/ClerkScriptLoader.js
'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

/**
 * ClerkScriptLoader component ensures the Clerk JS is loaded
 * and initializes the Clerk frontend API with the publishable key
 */
export default function ClerkScriptLoader() {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Get Clerk publishable key from environment variables
  const publishableKey =
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  // Handle script load success
  const handleScriptLoad = () => {
    setScriptLoaded(true);
    console.log('Clerk script loaded successfully');
  };

  // Initialize Clerk after script loads
  useEffect(() => {
    if (
      scriptLoaded &&
      typeof window !== 'undefined' &&
      window.Clerk &&
      !window.Clerk.loaded
    ) {
      try {
        // Initialize Clerk with the publishable key
        window.Clerk.load({
          publishableKey: publishableKey,
        });
        console.log('Clerk initialized successfully');
      } catch (error) {
        console.error('Error initializing Clerk:', error);
      }
    }
  }, [scriptLoaded, publishableKey]);

  return (
    <Script
      id="clerk-script"
      src="https://cdn.jsdelivr.net/npm/@clerk/clerk-js@latest/dist/clerk.browser.js"
      onLoad={handleScriptLoad}
      strategy="afterInteractive"
    />
  );
}
