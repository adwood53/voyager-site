// src/app/bug-report/page.js
'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import Navbar from '@/src/app/components/Navbar';
import Footer from '@/src/app/components/Footer';

export default function BugReportPage() {
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Handle script load
  const handleScriptLoad = () => {
    setScriptLoaded(true);

    // Initialize the JotForm embed handler once the script is loaded
    if (window.jotformEmbedHandler) {
      window.jotformEmbedHandler(
        "iframe[id='JotFormIFrame-250963921804056']",
        'https://form.jotform.com/'
      );
    }
  };

  return (
    <main className="min-h-screen bg-darkBg text-textLight overflow-hidden">
      <Navbar />

      <div className="container-voyager py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-heading text-primary mb-6 text-center">
            Report a Bug
          </h1>
          <p className="text-xl text-textLight opacity-80 mb-12 text-center">
            Found an issue with our website or services? Let us know
            by filling out the form below.
          </p>

          <div className="bg-darkCard border border-primary border-opacity-20 rounded-lg p-6 shadow-glow-sm relative">
            {/* Loading state */}
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-darkCard z-10">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-textLight">Loading form...</p>
              </div>
            )}

            {/* JotForm iframe - using exactly the provided code */}
            <iframe
              id="JotFormIFrame-250963921804056"
              title="Technical Issue Form"
              ref={iframeRef}
              onLoad={handleIframeLoad}
              allowTransparency="true"
              allow="geolocation; microphone; camera; fullscreen"
              src="https://form.jotform.com/250963921804056"
              frameBorder="0"
              style={{
                minWidth: '100%',
                maxWidth: '100%',
                height: '539px',
                border: 'none',
              }}
              scrolling="no"
            />

            {/* JotForm scripts */}
            <Script
              src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"
              onLoad={handleScriptLoad}
              strategy="afterInteractive"
            />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
