// src/app/components/dashboard/panels/ContentChangePanel.js
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardBody, CardHeader, Button } from '@heroui/react';
import Script from 'next/script';

export default function ContentChangePanel() {
  const [isLoading, setIsLoading] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const iframeRef = useRef(null);

  // Function to handle script load
  const handleScriptLoad = () => {
    setScriptLoaded(true);
    // Initialize Jotform embed handler
    if (window.jotformEmbedHandler && iframeRef.current) {
      window.jotformEmbedHandler(
        "iframe[id='JotFormIFrame-250964434412051']",
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
          Content Change Request
        </h1>
        <p className="text-gray-600">
          Submit a request to update or change content on your
          immersive experiences.
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
              id="JotFormIFrame-250964434412051"
              title="Content Change Form"
              ref={iframeRef}
              onLoad={handleIframeLoad}
              allowTransparency="true"
              allow="geolocation; microphone; camera"
              src="https://form.jotform.com/250964434412051"
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
            About Content Change Requests
          </h2>
        </CardHeader>
        <CardBody>
          <p className="text-gray-600 mb-4">
            Use this form to request changes to the content of your
            existing immersive experiences. Whether you need to update
            text, images, videos, or interactive elements, we&apos;re
            here to help.
          </p>
          <p className="text-gray-600">
            Our team will review your request and provide a timeline
            for implementation. For complex changes, we may reach out
            to discuss further details.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
