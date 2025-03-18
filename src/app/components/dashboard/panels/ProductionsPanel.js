// src/app/components/dashboard/panels/ProductionsPanel.js
'use client';

import { useRef, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Button } from '@heroui/react';
import Script from 'next/script';

export default function ProductionsPanel() {
  const [loadingState, setLoadingState] = useState('loading'); // 'loading', 'success', 'error'
  const containerRef = useRef(null);
  const attemptCountRef = useRef(0);
  const autoRetryAttemptedRef = useRef(false);
  const timeoutRef = useRef(null);
  const observerRef = useRef(null);
  const maxAttempts = 2;

  // Function to handle successful widget load
  const handleWidgetSuccess = () => {
    // Clear any pending timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Update state only if not already successful
    if (loadingState !== 'success') {
      setLoadingState('success');
      console.log('HubSpot widget loaded successfully');
    }
  };

  // Function to handle widget load failure
  const handleWidgetError = () => {
    // Clear any pending timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // If we haven't auto-retried yet, do so now
    if (!autoRetryAttemptedRef.current) {
      console.log('Initial load failed - attempting automatic retry');
      autoRetryAttemptedRef.current = true;
      attemptCountRef.current += 1;
      retryWidgetLoad();
      return;
    }

    setLoadingState('error');
    console.error('HubSpot widget failed to load after auto-retry');
  };

  // Function to clean up HubSpot elements
  const cleanupHubspotElements = () => {
    try {
      // Disconnect any existing observer
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      // Clear any pending timeouts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // Clean up any existing containers
      const containers = document.querySelectorAll(
        '.meetings-iframe-container'
      );
      containers.forEach((container) => container.remove());

      // Remove any script tags related to HubSpot
      const scripts = document.querySelectorAll(
        'script[src*="hsappstatic"]'
      );
      scripts.forEach((script) => script.remove());

      // Remove any global HubSpot objects
      if (window.hbspt) {
        delete window.hbspt;
      }

      console.log('HubSpot elements cleaned up');
    } catch (error) {
      console.error('Error cleaning up HubSpot elements:', error);
    }
  };

  // Check if the widget is fully loaded
  const checkWidgetLoaded = () => {
    const iframe = document.querySelector(
      '.meetings-iframe-container iframe'
    );

    // Consider the widget loaded if the iframe exists, has dimensions, and is not hidden
    if (
      iframe &&
      iframe.offsetWidth > 0 &&
      iframe.offsetHeight > 0 &&
      window.getComputedStyle(iframe).display !== 'none'
    ) {
      // Additional check: verify the iframe has content
      try {
        // If we can access the contentWindow or contentDocument, it's likely loaded
        const hasContent =
          iframe.contentWindow || iframe.contentDocument;
        if (hasContent) {
          handleWidgetSuccess();
          return true;
        }
      } catch (e) {
        // Cross-origin restrictions might prevent access, but if visible, consider successful
        handleWidgetSuccess();
        return true;
      }
    }

    return false;
  };

  // Setup mutation observer to detect widget load
  const setupWidgetObserver = () => {
    // Disconnect any existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create a new observer
    observerRef.current = new MutationObserver((mutations) => {
      // Check if widget has loaded on each DOM mutation
      if (checkWidgetLoaded()) {
        // If loaded, disconnect observer
        observerRef.current.disconnect();
      }
    });

    // Start observing the container for changes
    if (containerRef.current) {
      observerRef.current.observe(containerRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    }
  };

  // Function to load/reload the widget
  const loadWidget = () => {
    // Create a container for the HubSpot widget if it doesn't exist
    if (
      containerRef.current &&
      !document.querySelector('.meetings-iframe-container')
    ) {
      const meetingsContainer = document.createElement('div');
      meetingsContainer.className = 'meetings-iframe-container';
      meetingsContainer.dataset.src =
        'https://meetings.hubspot.com/swragg?embed=true';
      containerRef.current.appendChild(meetingsContainer);
    }

    // Create and append the script
    const script = document.createElement('script');
    script.src =
      'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
    script.async = true;
    document.body.appendChild(script);

    // Setup observer to detect successful load
    setupWidgetObserver();

    // Set a timeout as a fallback
    timeoutRef.current = setTimeout(() => {
      if (loadingState === 'loading') {
        handleWidgetError();
      }
    }, 8000); // 8 seconds fallback timeout
  };

  // Function to retry loading the widget (used by both auto and manual retry)
  const retryWidgetLoad = () => {
    // Reset the loading state
    setLoadingState('loading');

    // Clean up existing elements
    cleanupHubspotElements();

    // Reload the widget
    loadWidget();
  };

  // Handle manual retry button click
  const handleManualRetry = () => {
    if (attemptCountRef.current >= maxAttempts) {
      console.warn('Maximum retry attempts reached');
      return;
    }

    attemptCountRef.current += 1;
    console.log(
      `Manual retry attempt ${attemptCountRef.current}/${maxAttempts}`
    );

    retryWidgetLoad();
  };

  // Initialize the widget on component mount
  useEffect(() => {
    // Initial load
    loadWidget();

    // Check for widget load periodically as a backup detection method
    const intervalCheck = setInterval(() => {
      if (checkWidgetLoaded()) {
        clearInterval(intervalCheck);
      }
    }, 1000); // Check every second

    return () => {
      // Clean up on unmount
      cleanupHubspotElements();
      clearInterval(intervalCheck);
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Productions Services
        </h1>
        <p className="text-gray-600">
          Schedule your studio time using our booking widget below.
        </p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-800">
            Schedule Your Studio Time
          </h2>
        </CardHeader>
        <CardBody className="min-h-[600px]">
          <div
            ref={containerRef}
            className="min-h-[500px] relative border border-gray-200 rounded-lg"
          >
            {/* Loading overlay */}
            {loadingState === 'loading' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-10">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600">
                  {autoRetryAttemptedRef.current
                    ? 'Retrying connection to scheduling system...'
                    : 'Loading scheduling widget...'}
                </p>
              </div>
            )}

            {/* Error overlay */}
            {loadingState === 'error' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-10 p-6 text-center">
                <div className="text-red-500 text-5xl mb-4">⚠️</div>
                <h3 className="text-xl font-medium text-gray-800 mb-3">
                  Scheduling Widget Not Available
                </h3>
                <p className="text-gray-600 mb-6">
                  We&apos;re having trouble loading our scheduling
                  system. Please try again or contact us directly at{' '}
                  <a
                    href="mailto:connect@voyagervrlab.co.uk"
                    className="text-primary hover:underline"
                  >
                    connect@voyagervrlab.co.uk
                  </a>{' '}
                  to book your studio time.
                </p>
                {attemptCountRef.current < maxAttempts && (
                  <Button
                    color="primary"
                    onClick={handleManualRetry}
                    style={{
                      backgroundColor:
                        'var(--primary-color, #2563EB)',
                      color: 'white',
                    }}
                  >
                    Try Again
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
