'use client';

import { Card, CardBody, CardHeader, Button } from '@heroui/react';

export default function ProductionsPanel() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Productions Studio
        </h1>
        <p className="text-gray-600">
          Book time in our virtual production studio for your client
          projects
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-800">
            Studio Booking
          </h2>
        </CardHeader>
        <CardBody>
          <p className="mb-6 text-gray-600">
            Our professional virtual production studio is available
            for your client projects. Book time slots based on your
            project needs.
          </p>

          <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="text-lg font-medium text-blue-800 mb-2">
              Online Booking Coming Soon
            </h3>
            <p className="text-blue-700">
              We&apos;re currently developing online booking
              functionality. In the meantime, please contact us
              directly to schedule studio time.
            </p>
          </div>

          <div className="mt-6">
            <Button
              color="primary"
              style={{
                backgroundColor: 'var(--primary-color, #2563EB)',
                color: '#FFFFFF',
              }}
              onClick={() =>
                (window.location.href =
                  'mailto:studio@voyagervrlab.co.uk?subject=Studio%20Booking%20Request')
              }
            >
              Contact for Booking
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-800">
            Studio Features
          </h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium mb-2 text-gray-800">
                🎬 Professional Equipment
              </h3>
              <p className="text-sm text-gray-600">
                Access to high-quality cameras, lighting, and audio
                equipment.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium mb-2 text-gray-800">
                🎭 Green Screen
              </h3>
              <p className="text-sm text-gray-600">
                Full green screen setup for virtual backgrounds and
                effects.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium mb-2 text-gray-800">
                🧑‍💻 Technical Support
              </h3>
              <p className="text-sm text-gray-600">
                On-site technical assistance during your booking.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium mb-2 text-gray-800">
                🎨 Post-Production
              </h3>
              <p className="text-sm text-gray-600">
                Optional post-production services available for your
                projects.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium mb-2 text-gray-800">
              Studio Location
            </h3>
            <p className="text-gray-600">
              The Hub, 58a Granby St,
              <br />
              Leicester, LE1 1DH,
              <br />
              United Kingdom
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
