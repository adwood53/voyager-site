// src/app/components/dashboard/panels/MerchandisePanel.js
'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { CalculatorContainer } from '../calculator';
import { usePartner } from '@/src/utils/partners';
import merchandiseSchema from '@/src/schemas/merchandise';

export default function MerchandisePanel() {
  const [calculationResults, setCalculationResults] = useState(null);
  const partner = usePartner();

  // Handle calculator completion
  const handleCalculatorComplete = (data) => {
    setCalculationResults(data.results);
    console.log('Merchandise calculator results:', data.results);
  };

  // Handle deal form submission directly through the CalculatorContainer
  const handleSubmitToCRM = (results) => {
    console.log('Submitting merchandise results to CRM:', results);
    // The DealForm will be shown by the CalculatorContainer
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Interactive Merchandise Calculator
        </h1>
        <p className="text-gray-600">
          Configure your interactive merchandise items with embedded
          digital experiences
        </p>
      </div>

      <CalculatorContainer
        schema={merchandiseSchema}
        calculatorType="merchandise"
        showPdfExport={
          partner?.config?.features?.showPdfExport ?? true
        }
        showSubmitToCRM={true}
        pricingStructure={{
          type: partner?.config?.pricingType || 'white-label',
          baseMultiplier: 1.0, // For white-label, this is the cost to the partner
          commissionRate:
            partner?.config?.pricing?.commissionRate || 0.2, // 20% commission for referrals
        }}
        partner={partner}
        onSubmit={handleCalculatorComplete}
        onSubmitToCRM={handleSubmitToCRM}
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
