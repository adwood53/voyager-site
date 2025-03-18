'use client';

import { useState } from 'react';
import Script from 'next/script';
import { Card, CardBody, CardHeader, Button } from '@heroui/react';
import { usePartner } from '@/src/utils/partners';
import CalculatorContainer from '@/src/app/components/dashboard/calculator/CalculatorContainer';

export default function ProductionsPanel() {
  const partner = usePartner();
  const [currentStep, setCurrentStep] = useState('schedule'); // 'schedule' or 'services'
  const [schedulingComplete, setSchedulingComplete] = useState(false);
  const [calculationResults, setCalculationResults] = useState(null);

  // Handle calculator completion
  const handleCalculatorComplete = (data) => {
    setCalculationResults(data.results);
    console.log('Productions calculator results:', data.results);
  };

  // Handle meeting schedule completion
  const handleScheduleComplete = () => {
    setSchedulingComplete(true);
    setCurrentStep('services');
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

      {/* Step indicator */}
      <div className="flex mb-8">
        <div
          className={`flex-1 p-4 text-center border-b-2 ${
            currentStep === 'schedule'
              ? 'border-primary text-primary font-medium'
              : 'border-gray-300'
          }`}
        >
          1. Schedule Studio Time
        </div>
        <div
          className={`flex-1 p-4 text-center border-b-2 ${
            currentStep === 'services'
              ? 'border-primary text-primary font-medium'
              : 'border-gray-300'
          }`}
        >
          2. Additional Services
        </div>
      </div>

      {/* Meeting scheduler step */}
      {currentStep === 'schedule' ? (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-800">
              Schedule Your Studio Time
            </h2>
          </CardHeader>
          <CardBody>
            {/* This is the HubSpot container where the embedded meeting will appear */}
            <div
              className="meetings-iframe-container"
              data-src="https://meetings.hubspot.com/swragg?embed=true"
            />
            <Script
              src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
              strategy="lazyOnload"
            />

            {/* Button to proceed after the user has completed scheduling */}
            <Button className="mt-4" onClick={handleScheduleComplete}>
              I’ve Scheduled My Meeting
            </Button>
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-800">
              Select Additional Services
            </h2>
          </CardHeader>
          <CardBody>
            <CalculatorContainer
              calculatorType="productions"
              showPdfExport={
                partner?.config?.features?.showPdfExport ?? true
              }
              showSubmitToCRM={true}
              partner={partner}
              onSubmit={handleCalculatorComplete}
            />
          </CardBody>
        </Card>
      )}

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
            After scheduling your studio time, you can select
            additional services and submit your complete request to
            our team.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
