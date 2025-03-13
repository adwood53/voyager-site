// src/app/components/dashboard/panels/MerchandisePanel.js

'use client';

import { Card, CardBody, CardHeader } from '@heroui/react';
import { CalculatorContainer } from '../calculators';
import merchandiseSchema from '@/src/schemas/merchandise';

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

      <CalculatorContainer
        schema={merchandiseSchema}
        calculatorType="merchandise"
        showPdfExport={true}
        showSubmitToCRM={true}
      />

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
            After completing the calculator, you can export the
            results as a PDF or submit directly to our team to start
            your order.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
