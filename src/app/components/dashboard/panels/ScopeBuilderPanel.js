// src/app/components/dashboard/panels/ScopeBuilderPanel.js
'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/react';
import CalculatorContainer from '../calculators/CalculatorContainer';
import scopeBuilderSchema from '@/schemas/scopeBuilder';
import { usePartner } from '@/utils/partners';
import { generateRecommendations } from '@/lib/recommendationEngine';

export default function ScopeBuilderPanel() {
  const partner = usePartner();
  const [calculatorComplete, setCalculatorComplete] = useState(false);

  // When calculator is submitted, generate recommendations
  const handleCalculatorSubmit = (data) => {
    // Generate recommendations based on answers
    const recommendations = generateRecommendations(
      scopeBuilderSchema,
      data.answers
    );

    // Add recommendations to results
    data.results.recommendations = recommendations;

    setCalculatorComplete(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Scope Builder
        </h1>
        <p className="text-gray-600">
          Configure your project scope and get recommendations for the
          best solutions
        </p>
      </div>

      <CalculatorContainer
        schema={scopeBuilderSchema}
        onSubmit={handleCalculatorSubmit}
        showPdfExport={true}
        showSubmitToCRM={false}
      />

      {/* Additional information card */}
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-800">
            About the Scope Builder
          </h2>
        </CardHeader>
        <CardBody>
          <p className="text-gray-600 mb-4">
            The Scope Builder helps you understand what type of
            immersive experience would best suit your project needs.
            Answer the questions to receive personalized
            recommendations and export a detailed scope document.
          </p>
          <p className="text-gray-600">
            This tool does not automatically submit to our CRM.
            Instead, it focuses on helping you determine the right
            approach for your project. You can export the results as a
            PDF for reference or to share with your team.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
