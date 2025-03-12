// src/app/components/dashboard/panels/ProductionsPanel.js
'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader, Button } from '@heroui/react';
import CalculatorContainer from '../calculators/CalculatorContainer';
import productionsSchema from '@/schemas/productions';
import { usePartner } from '@/utils/partners';
import { useUser, useOrganization } from '@clerk/nextjs';
import CalculatorDealForm from '@/app/components/CalculatorDealForm';

export default function ProductionsPanel() {
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
          Productions Calculator
        </h1>
        <p className="text-gray-600">
          Configure your production requirements and get detailed
          pricing
        </p>
      </div>

      <CalculatorContainer
        schema={productionsSchema}
        onSubmit={handleCalculatorSubmit}
        showPdfExport={true}
        showSubmitToCRM={true}
      />

      {/* Information card */}
      <Card className="mb-6">
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
            After completing the calculator, you can export the
            results as a PDF or submit directly to our team to
            schedule a consultation.
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
          calculatorType="productions"
          onClose={() => setShowDealForm(false)}
        />
      )}
    </div>
  );
}
