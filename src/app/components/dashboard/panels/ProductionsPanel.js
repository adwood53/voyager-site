// src/app/components/dashboard/panels/ProductionsPanel.js

'use client';

import { Card, CardBody, CardHeader } from '@heroui/react';

export default function ProductionsPanel() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Productions Calculator
        </h1>
        <p className="text-gray-600">
          Configure your production requirements and get detailed
          pricing
        </p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-800">
            Calculator Coming Soon
          </h2>
        </CardHeader>
        <CardBody>
          <p className="text-gray-600 mb-4">
            The Productions Calculator is currently under development.
            This tool will help you configure your production needs
            and provide accurate pricing for studio bookings,
            equipment rentals, and production services.
          </p>
          <p className="text-gray-600">
            Check back soon to use this feature and get detailed
            pricing estimates.
          </p>
        </CardBody>
      </Card>

      {/* Information card */}
      <Card className="mt-8">
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-800">
            About Productions Services
          </h2>
        </CardHeader>
        <CardBody>
          <p className="text-gray-600 mb-4">
            Our productions services include access to our
            professional studio, equipment rental, and production
            staff. This calculator will help you configure your
            production needs and provide accurate pricing.
          </p>
          <p className="text-gray-600">
            After completing the calculator, you'll be able to export
            the results as a PDF or submit directly to our team to
            schedule a consultation.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
