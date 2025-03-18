'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { usePartner } from '@/src/utils/partners';

/**
 * MeetingScheduler - Embeds HubSpot meeting scheduler with customization
 * @param {Object} props
 * @param {string} props.meetingId - HubSpot meeting ID (default is from env)
 * @param {Function} props.onComplete - Callback when meeting is scheduled
 * @param {string} props.portalId - HubSpot portal ID (default is from env)
 */
export default function MeetingScheduler({
  meetingId = process.env.NEXT_PUBLIC_HUBSPOT_MEETING_ID || 'swragg',
  onComplete,
  portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || '47604746',
}) {
  const schedulerRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [error, setError] = useState(null);
  const partner = usePartner();

  // Handle meeting scheduled events from HubSpot
  useEffect(() => {
    const handleMessage = (event) => {
      // Check if message is from HubSpot
      if (
        event.data &&
        event.data.type === 'hsFormCallback' &&
        event.data.eventName === 'onFormSubmitted'
      ) {
        console.log('Meeting scheduled successfully!', event.data);
        setIsScheduled(true);

        if (onComplete && typeof onComplete === 'function') {
          onComplete();
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [onComplete]);

  // Initialize meeting scheduler when script loads
  useEffect(() => {
    if (scriptLoaded && schedulerRef.current) {
      try {
        const meetingSrc = `https://meetings.hubspot.com/${meetingId}?embed=true`;

        // Create meetings container if it doesn't already exist
        if (
          !schedulerRef.current.querySelector(
            '.meetings-iframe-container'
          )
        ) {
          const container = document.createElement('div');
          container.className = 'meetings-iframe-container';
          container.setAttribute('data-src', meetingSrc);
          schedulerRef.current.appendChild(container);
        }

        // If HubSpot meetings object is available, create the meeting
        if (window.hbspt && window.hbspt.meetings) {
          // Define a valid target selector string instead of passing the DOM reference
          window.hbspt.meetings.create({
            portalId: portalId,
            meetingId: meetingId,
            target: '.meetings-iframe-container', // Use CSS selector instead of DOM reference
            context: {
              brandsource: partner?.brandSource || 'voyager',
              partnerName: partner?.name || '',
              partnerEmail: partner?.email || '',
              organizationId: partner?.id || '',
            },
          });
        }
      } catch (err) {
        console.error('Error initializing meeting scheduler:', err);
        setError(
          'Could not load meeting scheduler. Please try again later.'
        );
      }
    }
  }, [scriptLoaded, meetingId, portalId, partner]);

  const handleScriptLoad = () => {
    setScriptLoaded(true);
  };

  return (
    <div className="meeting-scheduler">
      <Script
        src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
        onLoad={handleScriptLoad}
        strategy="afterInteractive"
      />

      {error && (
        <div className="p-4 mt-4 bg-red-900/20 border border-red-500/50 rounded-md text-red-200">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="block mt-2 px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Reload Page
          </button>
        </div>
      )}

      {isScheduled ? (
        <div className="text-center py-8 bg-darkCard border border-primary border-opacity-20 rounded-lg">
          <div className="w-16 h-16 rounded-full bg-green-900/20 text-green-500 flex items-center justify-center text-2xl mx-auto mb-4">
            ✓
          </div>
          <h3 className="text-xl font-semibold mb-2 text-textLight">
            Studio Time Reserved!
          </h3>
          <p className="text-textLight opacity-80 mb-6">
            Your studio time has been scheduled. You&apos;ll receive a
            confirmation email shortly with all the details.
          </p>
          {onComplete && (
            <button
              onClick={onComplete}
              className="px-6 py-2 bg-primary text-white rounded-md font-medium hover:bg-accent transition-colors"
            >
              Continue
            </button>
          )}
        </div>
      ) : (
        <div
          ref={schedulerRef}
          className="min-h-[500px] bg-darkCard border border-primary border-opacity-20 rounded-lg p-4"
        >
          {!scriptLoaded && (
            <div className="flex flex-col items-center justify-center h-[500px]">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-textLight">
                Loading meeting scheduler...
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
