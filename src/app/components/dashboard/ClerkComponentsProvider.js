'use client';
// src/app/components/dashboard/ClerkComponentsProvider.js

import { useEffect } from 'react';
import { useOrganization } from '@clerk/nextjs';
import Script from 'next/script';

export default function ClerkComponentsProvider() {
  const { organization } = useOrganization();

  // Load Clerk JS script
  useEffect(() => {
    // Only run if organization exists and we're in the browser
    if (!organization || typeof window === 'undefined') return;

    // Check if Clerk script is already loaded
    if (document.getElementById('clerk-js')) return;

    // Create script element manually to avoid Next.js server component warnings
    const script = document.createElement('script');
    script.id = 'clerk-js';
    script.src =
      'https://cdn.jsdelivr.net/npm/@clerk/clerk-js@latest/dist/clerk.browser.js';
    script.async = true;

    // When script loads, initialize Clerk
    script.onload = () => {
      if (window.Clerk) {
        window.Clerk.load({
          // Get publishable key from environment
          publishableKey:
            process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        });
      }
    };

    // Add script to document
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      // Script removal not needed, but included for completeness
      const loadedScript = document.getElementById('clerk-js');
      if (loadedScript) {
        // In practice, we usually don't remove the Clerk script once loaded
        // loadedScript.remove();
      }
    };
  }, [organization]);

  return null; // This component doesn't render anything
}
