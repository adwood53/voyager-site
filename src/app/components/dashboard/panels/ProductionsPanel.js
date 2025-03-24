// src/app/components/dashboard/panels/ProductionsPanel.js
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardBody, CardHeader, Button } from '@heroui/react';
import Script from 'next/script';

export default function ProductionsPanel() {
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const iframeRef = useRef(null);

  const bookingOptions = [
    {
      id: '2hr',
      title: '2 Hour Session',
      formId: '250823509266358',
      description:
        'Perfect for small shoots, quick recordings, or testing ideas in the studio.',
    },
    {
      id: '4hr',
      title: '4 Hour Session',
      formId: '250823418412350',
      description:
        'Our most popular option for medium-sized productions and content creation.',
    },
    {
      id: '8hr',
      title: '8 Hour Session',
      formId: '250822690912053',
      description:
        'Full day studio access for complex productions and comprehensive shoots.',
    },
  ];

  // Function to handle script load
  const handleScriptLoad = () => {
    setScriptLoaded(true);
    // Initialize Jotform embed handler
    if (window.jotformEmbedHandler && iframeRef.current) {
      const currentForm = bookingOptions.find(
        (option) => option.id === selectedDuration
      );
      if (currentForm) {
        window.jotformEmbedHandler(
          `iframe[id='JotFormIFrame-${currentForm.formId}']`,
          'https://form.jotform.com/'
        );
      }
    }
  };

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Effect to reset loading state when form selection changes
  useEffect(() => {
    if (selectedDuration) {
      setIsLoading(true);
    }
  }, [selectedDuration]);

  // Helper to get current form details
  const getCurrentFormDetails = () => {
    return (
      bookingOptions.find(
        (option) => option.id === selectedDuration
      ) || null
    );
  };

  // Reset selection
  const handleReset = () => {
    setSelectedDuration(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Productions Services
        </h1>
        <p className="text-gray-600">
          Book your studio time and configure your production
          requirements.
        </p>
      </div>

      <Card className="shadow-md rounded-lg overflow-hidden mb-8">
        <CardBody className="p-0">
          {!selectedDuration ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {bookingOptions.map((option) => (
                <Card
                  key={option.id}
                  className="border hover:border-primary hover:shadow-md transition-all cursor-pointer"
                  isPressable
                  onPress={() => setSelectedDuration(option.id)}
                >
                  <CardBody>
                    <div className="text-4xl mb-4 text-primary">
                      {option.id}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {option.description}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>
          ) : (
            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <div className="ml-2">
                  <h3 className="text-lg font-medium text-gray-800">
                    {getCurrentFormDetails()?.title} Booking Form
                  </h3>
                </div>
                <div className="mr-2">
                  <Button
                    onPress={handleReset}
                    className="primary-button"
                  >
                    ← Back
                  </Button>
                </div>
              </div>

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
              {selectedDuration === '2hr' && (
                <>
                  <iframe
                    id="JotFormIFrame-250822888624365"
                    title="2hr Booking Form"
                    ref={iframeRef}
                    onLoad={handleIframeLoad}
                    allowTransparency="true"
                    allow="geolocation; microphone; camera; fullscreen"
                    src="https://form.jotform.com/250822888624365"
                    style={{
                      minWidth: '100%',
                      maxWidth: '100%',
                      height: '539px',
                      border: 'none',
                    }}
                  ></iframe>
                </>
              )}

              {selectedDuration === '4hr' && (
                <>
                  <iframe
                    id="JotFormIFrame-250822789940366"
                    title="4hr Booking Form"
                    ref={iframeRef}
                    onLoad={handleIframeLoad}
                    allowTransparency="true"
                    allow="geolocation; microphone; camera; fullscreen"
                    src="https://form.jotform.com/250822789940366"
                    style={{
                      minWidth: '100%',
                      maxWidth: '100%',
                      height: '539px',
                      border: 'none',
                    }}
                  ></iframe>
                </>
              )}

              {selectedDuration === '8hr' && (
                <>
                  <iframe
                    id="JotFormIFrame-250822690912053"
                    title="8hr Booking Form"
                    ref={iframeRef}
                    onLoad={handleIframeLoad}
                    allowTransparency="true"
                    allow="geolocation; microphone; camera; fullscreen"
                    src="https://form.jotform.com/250822690912053"
                    style={{
                      minWidth: '100%',
                      maxWidth: '100%',
                      height: '539px',
                      border: 'none',
                    }}
                  ></iframe>
                </>
              )}

              {/* JotForm scripts */}
              <Script
                src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"
                onLoad={handleScriptLoad}
                strategy="afterInteractive"
              />
            </div>
          )}
        </CardBody>
      </Card>

      {/* Information card */}
      <Card>
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
            <strong>2 Hour Sessions</strong> - Perfect for quick
            shoots, social media content, headshots, or testing
            concepts.
          </p>
          <p className="text-gray-600 mb-4">
            <strong>4 Hour Sessions</strong> - Our most popular
            option, ideal for promotional videos, interviews, and
            product photography.
          </p>
          <p className="text-gray-600">
            <strong>8 Hour Sessions</strong> - Full day access for
            comprehensive productions, multiple setups, or complex
            shooting requirements.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
