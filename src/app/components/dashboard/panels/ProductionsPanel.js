// src/app/components/dashboard/panels/ProductionsPanel.js
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardBody, CardHeader, Button } from '@heroui/react';
import Script from 'next/script';

export default function ProductionsPanel() {
  const [isLoading, setIsLoading] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const iframeRef = useRef(null);

  // Using only the 2hr form ID
  const formId = '250823509266358';

  // Function to handle script load
  const handleScriptLoad = () => {
    setScriptLoaded(true);
    // Initialize Jotform embed handler
    if (window.jotformEmbedHandler && iframeRef.current) {
      window.jotformEmbedHandler(
        `iframe[id='JotFormIFrame-${formId}']`,
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
          Studio Bookings
        </h1>
        <p className="text-gray-600">
          Book your studio time and configure your production
          requirements.
        </p>
      </div>

      <Card className="shadow-md rounded-lg overflow-hidden">
        <CardBody className="p-0">
          <div className="relative">
            {/* Loading state */}
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 p-6">
                <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-700">
                  Loading booking form...
                </p>
              </div>
            )}

            {/* JotForm iframe */}
            <iframe
              id={`JotFormIFrame-${formId}`}
              title="Studio Booking Form"
              ref={iframeRef}
              onLoad={handleIframeLoad}
              allowTransparency="true"
              allow="geolocation; microphone; camera; fullscreen"
              src={`https://form.jotform.com/${formId}`}
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
            About Studio Bookings
          </h2>
        </CardHeader>
        <CardBody>
          <p className="text-gray-600 mb-4">
            Our professional studio is equipped with state-of-the-art
            technology for all your production needs. Bookings include
            access to our green screen, lighting equipment, cameras,
            and audio recording facilities.
          </p>
          <p className="text-gray-600 mb-4">
            Use the form above to specify your booking details and
            production requirements. Our team will review your request
            and contact you to confirm your booking.
          </p>
          <p className="text-gray-600">
            For complex production needs or special requirements,
            please include details in the form or contact us directly
            at{' '}
            <a
              href="mailto:connect@voyagervrlab.co.uk"
              className="text-primary hover:text-accent transition-colors"
            >
              connect@voyagervrlab.co.uk
            </a>
            .
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
