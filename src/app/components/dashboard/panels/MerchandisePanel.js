// src/app/components/dashboard/panels/MerchandisePanel.js
'use client';

import { useState, useRef } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/react';
import Script from 'next/script';

export default function MerchandisePanel() {
  const [isLoading, setIsLoading] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const iframeRef = useRef(null);

  // Function to handle script load
  const handleScriptLoad = () => {
    setScriptLoaded(true);
    // Initialize Jotform embed handler
    if (window.jotformEmbedHandler && iframeRef.current) {
      window.jotformEmbedHandler(
        "iframe[id='JotFormIFrame-250921428503048']",
        'https://form.jotform.com/'
      );
    }
  };

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Interactive Merchandise
        </h1>
        <p className="text-gray-600">
          Configure your interactive merchandise with embedded digital
          experiences.
        </p>
      </div>

      <Card className="shadow-md rounded-lg overflow-hidden">
        <CardBody className="p-0">
          <div className="relative">
            {/* Loading state */}
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 p-6">
                <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-700">Loading form...</p>
              </div>
            )}

            {/* JotForm iframe */}
            <iframe
              id="JotFormIFrame-250921428503048"
              title="Merchandise Form"
              ref={iframeRef}
              onLoad={handleIframeLoad}
              allowTransparency="true"
              allow="geolocation; microphone; camera; fullscreen"
              src="https://form.jotform.com/250921428503048"
              style={{
                minWidth: '100%',
                maxWidth: '100%',
                height: '539px',
                border: 'none',
              }}
            ></iframe>

            {/* JotForm scripts */}
            <Script
              src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"
              onLoad={handleScriptLoad}
              strategy="afterInteractive"
            />
          </div>
        </CardBody>
      </Card>

      {/* Information card */}
      <Card className="mt-8">
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-800">
            About Interactive Merchandise
          </h2>
        </CardHeader>
        <CardBody>
          <p className="text-gray-600 mb-4">
            Our interactive merchandise solutions include NFC-enabled
            business cards, posters, and other branded items that
            connect the physical world with digital experiences.
          </p>
          <p className="text-gray-600">
            Configure your products above to get accurate pricing and
            submit your request to our team.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
