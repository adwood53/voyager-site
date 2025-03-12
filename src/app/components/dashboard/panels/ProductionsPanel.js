// src/app/components/dashboard/panels/ProductionsPanel.js

'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { useUser, useOrganization } from '@clerk/nextjs';
import { CalculatorContainer } from '../calculators';
import productionsSchema from '@/src/schemas/productions';
import { useFirebase } from '@/src/contexts/FirebaseContext';

export default function ProductionsPanel() {
  const { user } = useUser();
  const { organization } = useOrganization();
  const { organization: firestoreOrg } = useFirebase();

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
        calculatorType="productions"
        showPdfExport={true}
        showSubmitToCRM={true}
      />

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
            After completing the calculator, you can export the
            results as a PDF or submit directly to our team to
            schedule a consultation.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
