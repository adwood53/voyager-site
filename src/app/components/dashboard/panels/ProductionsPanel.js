// src/app/components/dashboard/panels/ProductionsPanel.js
'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { Card, CardBody, CardHeader } from '@heroui/react';

export default function ProductionsPanel() {
  // Load HubSpot tracking script (optional; only if needed for analytics/tracking)
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'hs-script-loader';
    script.async = true;
    script.defer = true;
    script.src = '//js.hs-scripts.com/47604746.js';
    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById(
        'hs-script-loader'
      );
      if (existingScript) existingScript.remove();
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Productions Services
        </h1>
        <p className="text-gray-600">
          Schedule your studio time using our HubSpot Meetings widget
          below.
        </p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-800">
            Schedule Your Studio Time
          </h2>
        </CardHeader>
        <CardBody>
          {/* This is the container HubSpot uses to embed the iframe. */}
          <div
            className="meetings-iframe-container"
            data-src="https://meetings.hubspot.com/swragg?embed=true"
          />

          {/* Load the HubSpot Meetings Embed script */}
          <Script
            src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
            strategy="lazyOnload"
          />
        </CardBody>
      </Card>
    </div>
  );
}
