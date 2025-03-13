// src/app/components/dashboard/panels/ScopeBuilderPanel.js

'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { CalculatorContainer } from '../calculators';
import scopeBuilderSchema from '@/src/schemas/scopeBuilder';

export default function ScopeBuilderPanel() {
  const [calculatorComplete, setCalculatorComplete] = useState(false);

  // Handle calculator completion
  const handleCalculatorComplete = (data) => {
    console.log('Scope builder completed with data:', data);
    setCalculatorComplete(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Project Scope Builder
        </h1>
        <p className="text-gray-600">
          Configure your project scope and get recommendations for the
          best immersive solutions
        </p>
      </div>

      <CalculatorContainer
        schema={scopeBuilderSchema}
        calculatorType="scope-builder"
        showPdfExport={true}
        showSubmitToCRM={false} // Explicitly disable HubSpot submission
        onSubmit={handleCalculatorComplete}
      />

      {/* Information card */}
      <Card className="mt-8">
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-800">
            About the Scope Builder
          </h2>
        </CardHeader>
        <CardBody>
          <p className="text-gray-600 mb-4">
            The Scope Builder helps you understand what type of
            immersive experience would best suit your project needs.
            The tool analyzes your requirements and recommends the
            most appropriate approach.
          </p>
          <p className="text-gray-600">
            After completing the questionnaire, you'll receive
            tailored recommendations based on your answers, along with
            the option to export a detailed scope document as a PDF.
          </p>
          {calculatorComplete && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <h3 className="text-green-700 font-medium mb-2">
                Scope Building Complete
              </h3>
              <p className="text-green-600">
                Your project scope has been analyzed. You can review
                the recommendations and export a detailed PDF for your
                records.
              </p>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
