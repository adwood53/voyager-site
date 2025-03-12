// src/app/components/dashboard/panels/MerchandisePanel.js
'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader, Button } from '@heroui/react';
import CalculatorContainer from '../calculators/CalculatorContainer';
import merchandiseSchema from '@/schemas/merchandise';
import { usePartner } from '@/utils/partners';
import { useUser, useOrganization } from '@clerk/nextjs';
import CalculatorDealForm from '@/app/components/CalculatorDealForm';

export default function MerchandisePanel() {
  const partner = usePartner();
  const { user } = useUser();
  const { organization } = useOrganization();

  const [showDealForm, setShowDealForm] = useState(false);
  const [calculatorResults, setCalculatorResults] = useState(null);

  const handleCalculatorSubmit = (data) => {
    setCalculatorResults(data);
    setShowDealForm(true);
  };

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
        onSubmit={handleCalculatorSubmit}
        showPdfExport={true}
        showSubmitToCRM={true}
      />

      {/* Information card */}
      <Card className="mb-6">
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

      {/* Deal Form Modal */}
      {showDealForm && (
        <CalculatorDealForm
          configurationData={calculatorResults.results}
          salesPersonDetails={{
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.primaryEmailAddress?.emailAddress || '',
            companyName: organization?.name || '',
            brandsource: partner.name,
          }}
          calculatorType="merchandise"
          onClose={() => setShowDealForm(false)}
        />
      )}
    </div>
  );
}
