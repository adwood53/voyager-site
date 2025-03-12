// src/app/components/dashboard/panels/ScopeBuilderPanel.js

'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/react';

export default function ScopeBuilderPanel() {
  const [calculatorComplete, setCalculatorComplete] = useState(false);

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

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-800">
            Calculator Coming Soon
          </h2>
        </CardHeader>
        <CardBody>
          <p className="text-gray-600 mb-4">
            The Scope Builder calculator is currently under
            development. This tool will help you analyze your project
            requirements and recommend the most appropriate immersive
            solution for your needs.
          </p>
          <p className="text-gray-600">
            Check back soon to use this feature and create detailed
            project scope documents with tailored recommendations.
          </p>
        </CardBody>
      </Card>

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
        </CardBody>
      </Card>
    </div>
  );
}
