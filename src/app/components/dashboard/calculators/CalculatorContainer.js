// src/app/components/dashboard/calculators/CalculatorContainer.js
'use client';

import { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Button } from '@heroui/react';
import {
  processResults,
  validateAnswers,
  isSectionComplete,
} from '@/lib/calculatorEngine';
import QuestionRenderer from './QuestionRenderer';
import ResultsSummary from './ResultsSummary';
import { generatePDF, downloadPDF } from '@/lib/pdfService';
import { usePartner } from '@/utils/partners';

export default function CalculatorContainer({
  schema,
  onSubmit,
  showPdfExport = true,
  showSubmitToCRM = false,
}) {
  const partner = usePartner();
  const [answers, setAnswers] = useState({});
  const [currentSection, setCurrentSection] = useState(0);
  const [errors, setErrors] = useState({});
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // Update results when answers change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      const newResults = processResults(schema, answers);
      setResults(newResults);
    }
  }, [schema, answers]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNextSection = () => {
    if (currentSection < schema.sections.length - 1) {
      setCurrentSection((prev) => prev + 1);
    } else {
      handleShowResults();
    }
  };

  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
    }
  };

  const handleShowResults = () => {
    if (validateAnswers(schema, answers)) {
      setShowResults(true);
    } else {
      setErrors({
        general:
          'Please complete all required questions before continuing.',
      });
    }
  };

  const handleExportPDF = async () => {
    try {
      const doc = await generatePDF(schema, results, partner);
      downloadPDF(doc, `${schema.id}-results.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setErrors({ pdf: 'Failed to generate PDF. Please try again.' });
    }
  };

  const handleSubmit = () => {
    if (onSubmit && typeof onSubmit === 'function') {
      onSubmit({
        answers,
        results,
      });
    }
  };

  const currentSectionData = schema.sections[currentSection];
  const isCurrentSectionComplete = currentSectionData
    ? isSectionComplete(currentSectionData, answers)
    : false;

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-800">
          {schema.title}
        </h2>
      </CardHeader>
      <CardBody>
        {!showResults ? (
          <>
            {/* Progress indicator */}
            <div className="flex mb-6 overflow-x-auto">
              {schema.sections.map((section, index) => (
                <button
                  key={section.id}
                  className={`px-4 py-2 text-sm font-medium rounded-md mr-2 
                    ${
                      currentSection === index
                        ? 'bg-primary-color text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  onClick={() => setCurrentSection(index)}
                  style={{
                    backgroundColor:
                      currentSection === index
                        ? 'var(--primary-color, #2563EB)'
                        : undefined,
                    color:
                      currentSection === index
                        ? '#FFFFFF'
                        : undefined,
                  }}
                  disabled={
                    index > 0 &&
                    !isSectionComplete(
                      schema.sections[index - 1],
                      answers
                    )
                  }
                >
                  {index + 1}. {section.title}
                </button>
              ))}
            </div>

            {/* Current section */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4 text-gray-800">
                {currentSectionData.title}
              </h3>

              {currentSectionData.questions.map((question) => {
                // Skip if dependencies not met
                if (!isDependencyMet(question, answers)) {
                  return null;
                }

                return (
                  <QuestionRenderer
                    key={question.id}
                    question={question}
                    value={answers[question.id]}
                    onChange={(value) =>
                      handleAnswerChange(question.id, value)
                    }
                    errors={errors[question.id]}
                  />
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-6">
              {currentSection > 0 && (
                <Button
                  onClick={handlePrevSection}
                  variant="light"
                  className="text-gray-700"
                >
                  Previous
                </Button>
              )}
              <div className="ml-auto">
                <Button
                  onClick={handleNextSection}
                  color="primary"
                  disabled={!isCurrentSectionComplete}
                  style={{
                    backgroundColor: 'var(--primary-color, #2563EB)',
                    color: '#FFFFFF',
                    opacity: isCurrentSectionComplete ? 1 : 0.5,
                  }}
                >
                  {currentSection < schema.sections.length - 1
                    ? 'Next'
                    : 'See Results'}
                </Button>
              </div>
            </div>

            {errors.general && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                {errors.general}
              </div>
            )}
          </>
        ) : (
          <>
            {/* Results page */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4 text-gray-800">
                Calculator Results
              </h3>

              {results && (
                <ResultsSummary
                  results={results}
                  partner={partner}
                  schema={schema}
                />
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 justify-between mt-6">
              <Button
                onClick={() => setShowResults(false)}
                variant="light"
                className="text-gray-700"
              >
                Back to Calculator
              </Button>

              <div className="flex gap-3">
                {showPdfExport && (
                  <Button
                    onClick={handleExportPDF}
                    color="secondary"
                    style={{
                      backgroundColor: 'var(--accent-color, #8B5CF6)',
                      color: '#FFFFFF',
                    }}
                  >
                    Export as PDF
                  </Button>
                )}

                {showSubmitToCRM && (
                  <Button
                    onClick={handleSubmit}
                    color="primary"
                    style={{
                      backgroundColor:
                        'var(--primary-color, #2563EB)',
                      color: '#FFFFFF',
                    }}
                  >
                    Submit to CRM
                  </Button>
                )}
              </div>
            </div>

            {errors.pdf && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                {errors.pdf}
              </div>
            )}
          </>
        )}
      </CardBody>
    </Card>
  );
}
