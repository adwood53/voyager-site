// src/app/components/partner-calculator/MeetingScheduler.js
'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { usePartner } from '@/src/utils/partners';

export default function MeetingScheduler({
  hubspotMeetingId,
  onComplete,
}) {
  const schedulerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const partner = usePartner();

  // Function to handle meeting scheduled events
  const handleMeetingScheduled = (event) => {
    if (
      event.data.type === 'hsFormCallback' &&
      event.data.eventName === 'onFormSubmitted'
    ) {
      console.log('Meeting scheduled successfully!');
      setIsScheduled(true);

      if (onComplete && typeof onComplete === 'function') {
        onComplete();
      }
    }
  };

  // Add event listener for message events from HubSpot
  useEffect(() => {
    window.addEventListener('message', handleMeetingScheduled);
    return () => {
      window.removeEventListener('message', handleMeetingScheduled);
    };
  }, []);

  // Load HubSpot meeting script
  const handleHubspotLoaded = () => {
    if (!hubspotMeetingId) {
      console.error('No HubSpot meeting ID provided');
      return;
    }

    setIsLoaded(true);

    // Allow time for the script to initialize
    setTimeout(() => {
      if (window.hbspt && schedulerRef.current) {
        try {
          // Add additional context from partner
          const context = {
            brandsource: partner?.brandSource || 'voyager',
            userId: partner?.userId || '',
            organizationName: partner?.name || 'Voyager Partner',
          };

          // Create the meeting embed
          window.hbspt.meetings.create({
            portalId: process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID,
            meetingId: hubspotMeetingId,
            target: schedulerRef.current,
            context,
          });
        } catch (err) {
          console.error(
            'Error creating HubSpot meeting scheduler:',
            err
          );
        }
      }
    }, 500);
  };

  return (
    <div className="meeting-scheduler-container">
      <Script
        src="//js.hsforms.net/forms/shell.js"
        strategy="afterInteractive"
        onLoad={handleHubspotLoaded}
      />

      {!isLoaded && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}

      {isScheduled ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-500 flex items-center justify-center text-2xl mx-auto mb-4">
            ✓
          </div>
          <h3 className="text-xl font-semibold mb-2 text-textLight">
            Studio Time Reserved!
          </h3>
          <p className="text-textLight opacity-80 mb-6">
            Your studio time has been scheduled. You'll receive a
            confirmation email shortly.
          </p>
          {onComplete && (
            <button
              onClick={onComplete}
              className="px-6 py-2 bg-primary text-white rounded-md font-medium"
            >
              Continue to Additional Services
            </button>
          )}
        </div>
      ) : (
        <div ref={schedulerRef} className="min-h-[500px]"></div>
      )}
    </div>
  );
}
