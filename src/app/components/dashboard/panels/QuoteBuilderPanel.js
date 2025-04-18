// src/app/components/dashboard/panels/QuoteBuilderPanel.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardBody, CardHeader, Button } from '@heroui/react';
import Script from 'next/script';

export default function QuoteBuilderPanel() {
  const [isLoading, setIsLoading] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const iframeRef = useRef(null);

  // Function to handle script load
  const handleScriptLoad = () => {
    setScriptLoaded(true);
    // Initialize Jotform embed handler
    if (window.jotformEmbedHandler && iframeRef.current) {
      window.jotformEmbedHandler(
        "iframe[id='JotFormIFrame-250822679363060']",
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
          Voyager Quote Builder
        </h1>
        <p className="text-gray-600">
          Find the Perfect Solution for Your Brand! Configure your
          project quote and get recommendations for the best immersive
          solutions.
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
              id="JotFormIFrame-250822679363060"
              title="Quote Builder"
              ref={iframeRef}
              onLoad={handleIframeLoad}
              allowTransparency="true"
              allow="geolocation; microphone; camera"
              src="https://form.jotform.com/250822679363060"
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
            About the Quote Builder
          </h2>
        </CardHeader>
        <CardBody>
          <p className="text-gray-600 mb-4">
            The Quote Builder helps you understand what type of
            immersive experience would best suit your project needs.
            Fill out the form above to help us understand your
            requirements.
          </p>
          <p className="text-gray-600">
            After completing the questionnaire, a member of our team
            will be in touch to discuss your project in more detail
            and provide tailored recommendations.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
