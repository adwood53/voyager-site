// src/app/components/dashboard/panels/ScopeBuilderPanel.js
'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader, Button } from '@heroui/react';
import { CalculatorContainer } from '../calculator';
import scopeBuilderSchema from '@/src/schemas/scopeBuilder';
import { usePartner } from '@/src/utils/partners';

export default function ScopeBuilderPanel() {
  const partner = usePartner();
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [calculationResults, setCalculationResults] = useState(null);

  // Handle calculator completion
  const handleCalculatorComplete = (data) => {
    setCalculationResults(data.results);
    setShowRecommendations(
      data.results.recommendations &&
        data.results.recommendations.length > 0
    );
    console.log('Scope builder results:', data.results);
  };

  // Handle PDF export - this is handled by the CalculatorContainer

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Voyager Scope Builder
        </h1>
        <p className="text-gray-600">
          Find the Perfect Solution for Your Brand! Configure your
          project scope and get recommendations for the best immersive
          solutions.
        </p>
      </div>

      {showRecommendations &&
      calculationResults?.recommendations?.length > 0 ? (
        <div>
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-800">
                Recommended Solutions
              </h2>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {calculationResults.recommendations.map(
                  (recommendation, index) => (
                    <Card key={index} className="h-full">
                      <CardBody>
                        <h3 className="text-lg font-semibold text-primary mb-2">
                          {recommendation.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {recommendation.description}
                        </p>
                        <div className="mb-2">
                          <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-medium">
                            Tier {recommendation.tier}
                          </span>
                        </div>

                        {recommendation.features &&
                          recommendation.features.length > 0 && (
                            <div className="mt-4">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">
                                Features:
                              </h4>
                              <ul className="list-disc pl-5 text-sm text-gray-600">
                                {recommendation.features.map(
                                  (feature, i) => (
                                    <li key={i}>{feature}</li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                      </CardBody>
                    </Card>
                  )
                )}
              </div>

              <div className="mt-6 text-center">
                <Button
                  color="default"
                  variant="light"
                  onClick={() => setShowRecommendations(false)}
                >
                  Back to Scope Builder
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      ) : (
        <CalculatorContainer
          schema={scopeBuilderSchema}
          calculatorType="scope-builder"
          showPdfExport={
            partner?.config?.features?.showPdfExport ?? true
          }
          showSubmitToCRM={false} // No CRM submission for scope builder
          partner={partner}
          onSubmit={handleCalculatorComplete}
        />
      )}

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
            After completing the questionnaire, you&apos;ll receive
            tailored recommendations based on your answers, along with
            the option to explore our other calculators for specific
            solutions.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
