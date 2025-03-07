'use client';
// src/app/components/dashboard/ClientScriptLoader.js

import { useEffect } from 'react';
import Script from 'next/script';

export default function ClientScriptLoader() {
  return (
    <Script
      id="clerk-js"
      src="https://cdn.jsdelivr.net/npm/@clerk/clerk-js@latest/dist/clerk.browser.js"
      strategy="afterInteractive"
    />
  );
}
