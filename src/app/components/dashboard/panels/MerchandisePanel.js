// src/app/components/dashboard/panels/MerchandisePanel.js

'use client';

import { Card, CardBody, CardHeader } from '@heroui/react';

export default function MerchandisePanel() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Merchandise Calculator
        </h1>
        <p className="text-gray-600">
          Configure your interactive merchandise and get detailed
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
            The Merchandise Calculator is currently under development.
            This tool will help you configure your interactive
            merchandise needs and provide accurate pricing.
          </p>
          <p className="text-gray-600">
            Check back soon to use this feature and get detailed
            pricing estimates for interactive business cards,
            brochures, signage, and other merchandise.
          </p>
        </CardBody>
      </Card>

      {/* Information card */}
      <Card className="mt-8">
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-800">
            About Interactive Merchandise
          </h2>
        </CardHeader>
        <CardBody>
          <p className="text-gray-600 mb-4">
            Our interactive merchandise combines physical products
            with digital experiences using QR codes, NFC tags, and AR
            markers. This calculator will help you configure your
            merchandise needs and provide accurate pricing.
          </p>
          <p className="text-gray-600">
            After completing the calculator, you'll be able to export
            the results as a PDF or submit directly to our team to
            start your order.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
