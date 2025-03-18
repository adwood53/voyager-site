// src/app/components/dashboard/panels/MerchandisePanel.js - Updated
'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { CalculatorContainer } from '../calculator';
import merchandiseSchema from '@/src/schemas/merchandise';
import { usePartner } from '@/src/utils/partners';

export default function MerchandisePanel() {
  const partner = usePartner();
  const [calculationResults, setCalculationResults] = useState(null);

  // Handle calculator completion
  const handleCalculatorComplete = (data) => {
    setCalculationResults(data.results);
    console.log('Merchandise calculator results:', data.results);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Interactive Merchandise
        </h1>
        <p className="text-gray-600">
          Configure your interactive merchandise with embedded digital
          experiences.
        </p>
      </div>

      {/* Added a card wrapper with shadow and padding */}
      <Card className="shadow-md rounded-lg overflow-hidden">
        <CardBody className="p-0">
          {' '}
          {/* Remove padding from the Card so the calculator padding works correctly */}
          <CalculatorContainer
            schema={merchandiseSchema}
            calculatorType="merchandise"
            showPdfExport={
              partner?.config?.features?.showPdfExport ?? true
            }
            showSubmitToCRM={true}
            partner={partner}
            onSubmit={handleCalculatorComplete}
          />
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
            Our interactive merchandise solutions include NFC-enabled
            business cards, posters, and other branded items that
            connect the physical world with digital experiences.
          </p>
          <p className="text-gray-600">
            Configure your products above to get accurate pricing and
            submit your request to our team.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
