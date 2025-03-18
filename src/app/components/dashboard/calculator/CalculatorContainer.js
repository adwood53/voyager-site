// src/app/components/dashboard/calculator/CalculatorContainer.js
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useUser, useOrganization } from '@clerk/nextjs';
import { calculateResults } from '@/src/lib/calculatorEngine';
import {
  initializeAnswers,
  validateAnswers,
  shouldShowSection,
  generateRecommendations,
} from '@/src/lib/recommendationEngine';
import { generateAndSavePDF } from '@/src/lib/pdfService';
import { usePartner } from '@/src/utils/partners';
import QuestionRenderer from './QuestionRenderer';
import ResultsSummary from './ResultsSummary';
import RecommendationsPanel from './RecommendationsPanel';
import DealForm from './DealForm';

/**
 * Main calculator container component with multi-step form handling
 */
export default function CalculatorContainer({
  schema,
  onSubmit,
  showPdfExport = true,
  showSubmitToCRM = true,
  calculatorType = 'generic',
  pricingStructure,
  partner,
  onSubmitToCRM,
}) {
  // If partner is not provided, get from context
  const partnerContext = usePartner();
  const actualPartner = partner || partnerContext;

  const { user } = useUser();
  const { organization } = useOrganization();

  // State for calculator
  const [answers, setAnswers] = useState({});
  const [currentSection, setCurrentSection] = useState(0);
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showDealForm, setShowDealForm] = useState(false);

  // Initialize with any default answers from schema
  useEffect(() => {
    setAnswers(initializeAnswers(schema));
  }, [schema]);

  // Get visible sections based on dependencies
  const visibleSections = useMemo(() => {
    if (!schema.sections) return [];

    return schema.sections.filter((section) => {
      return shouldShowSection(section, answers);
    });
  }, [schema.sections, answers]);

  // Update answer for a specific question
  const updateAnswer = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    // Clear any error for this question
    setErrors((prev) =>
      prev.filter((error) => error.questionId !== questionId)
    );
  };

  // Calculate total number of visible sections
  const getTotalSections = () => {
    return visibleSections.length || 1;
  };

  // Get the current section object
  const getCurrentSection = () => {
    if (!visibleSections.length) return null;
    return visibleSections[currentSection];
  };

  // Move to the next section or calculate results
  const handleNextSection = () => {
    const currentSectionObj = getCurrentSection();

    // Validate current section
    if (currentSectionObj && currentSectionObj.questions) {
      const sectionValidation = validateAnswers(
        { questions: currentSectionObj.questions },
        answers
      );

      if (!sectionValidation.valid) {
        setErrors(sectionValidation.errors);
        return;
      }
    }

    // If this is the last section, calculate results
    if (currentSection >= getTotalSections() - 1) {
      calculateFinalResults();
    } else {
      // Move to next section
      setCurrentSection(currentSection + 1);

      // Scroll to top of calculator when changing sections
      const calculatorElement = document.querySelector(
        '.calculator-container'
      );
      if (calculatorElement) {
        calculatorElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };

  // Go back to previous section
  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const calculateFinalResults = () => {
    setIsCalculating(true);

    try {
      // Validate all answers across visible sections
      let allValid = true;
      let allErrors = [];

      visibleSections.forEach((section) => {
        if (section.questions) {
          const sectionValidation = validateAnswers(
            { questions: section.questions },
            answers
          );

          if (!sectionValidation.valid) {
            allValid = false;
            allErrors = [...allErrors, ...sectionValidation.errors];
          }
        }
      });

      if (!allValid) {
        setErrors(allErrors);
        setIsCalculating(false);
        return;
      }

      // Prepare options for calculation
      const options = {
        calculatorType,
        pricingStructure,
        organization: organization
          ? {
              id: organization.id,
              name: organization.name,
            }
          : null,
        user: user
          ? {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.primaryEmailAddress?.emailAddress,
            }
          : null,
        partner: actualPartner,
      };

      // Calculate results using calculatorEngine
      const calculatedResults = calculateResults(
        schema,
        answers,
        options
      );

      // For scope builder, need to add recommendations
      if (
        calculatorType === 'scope-builder' &&
        schema.recommendations
      ) {
        try {
          // Generate recommendations using the imported function
          const recommendations = generateRecommendations(
            answers,
            schema.recommendations.products,
            {
              maxRecommendations: 5,
              sortByPriority: true,
            }
          );

          // Add recommendations to results
          calculatedResults.recommendations = recommendations;

          // Set results state
          setResults(calculatedResults);

          // Show recommendations if there are any
          if (
            schema.actions?.showRecommendations &&
            recommendations.length > 0
          ) {
            setShowRecommendations(true);
          } else {
            setShowResults(true);
          }
        } catch (error) {
          console.error('Error generating recommendations:', error);
          // If there's an error with recommendations, still show results without them
          setResults(calculatedResults);
          setShowResults(true);
        }
      } else {
        // For calculators other than scope builder, just set results and show them
        setResults(calculatedResults);
        setShowResults(true);
      }

      setErrors([]);

      // Call the onSubmit callback if provided
      if (onSubmit && typeof onSubmit === 'function') {
        onSubmit({
          answers,
          results: calculatedResults,
        });
      }
    } catch (error) {
      console.error('Error calculating results:', error);
      setErrors([
        {
          questionId: null,
          message: `Error calculating results: ${error.message}`,
        },
      ]);
    } finally {
      setIsCalculating(false);
    }
  };

  // Export results as PDF
  const handleExportPDF = () => {
    if (!results) return;

    generateAndSavePDF(
      results,
      {
        title: schema.title || 'Voyager Calculator Results',
        subtitle: calculatorType,
        companyName:
          organization?.name || actualPartner?.name || 'Voyager',
        showPrice:
          schema.actions?.showPrice !== false &&
          actualPartner?.config?.features?.showPrice !== false,
        includeRecommendations: true,
        contactInfo: {
          email: 'connect@voyagervrlab.co.uk',
          phone: '+44 7470 361585',
          website: 'voyagervrlab.co.uk',
        },
      },
      `voyager-${calculatorType}-results.pdf`
    );
  };

  // Submit results to HubSpot
  const handleSubmitToCRM = () => {
    if (!results) return;

    // If custom handler provided, use that
    if (onSubmitToCRM && typeof onSubmitToCRM === 'function') {
      onSubmitToCRM(results);
      return;
    }

    // Otherwise show the default form
    setShowDealForm(true);
  };

  // Reset calculator to initial state
  const handleReset = () => {
    setAnswers(initializeAnswers(schema));
    setCurrentSection(0);
    setResults(null);
    setErrors([]);
    setShowResults(false);
    setShowRecommendations(false);
    setShowDealForm(false);
  };

  // Go back to results from recommendations
  const handleBackToResults = () => {
    setShowRecommendations(false);
    setShowResults(true);
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    return Math.round(
      ((currentSection + 1) / getTotalSections()) * 100
    );
  };

  // Get the current visible section
  const currentSectionObj = getCurrentSection();

  return (
    <div className="calculator-container shadow-md rounded-lg overflow-hidden">
      {showResults ? (
        <ResultsSummary
          results={results}
          schema={schema}
          calculatorType={calculatorType}
          onExportPDF={showPdfExport ? handleExportPDF : null}
          onSubmitToHubspot={
            showSubmitToCRM ? handleSubmitToCRM : null
          }
          onReset={handleReset}
          partner={actualPartner}
        />
      ) : showRecommendations ? (
        <RecommendationsPanel
          recommendations={results.recommendations}
          onBackToResults={handleBackToResults}
          onReset={handleReset}
        />
      ) : (
        <div className="calculator-questions-container">
          <div className="calculator-progress">
            <div className="progress-text">
              Section {currentSection + 1} of {getTotalSections()}:{' '}
              {currentSectionObj?.title || 'Basic Information'}
            </div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${calculateProgress()}%` }}
              />
            </div>
          </div>

          {currentSectionObj && (
            <>
              <h3 className="section-title">
                {currentSectionObj.title}
              </h3>

              <QuestionRenderer
                schema={currentSectionObj}
                answers={answers}
                updateAnswer={updateAnswer}
                errors={errors}
              />
            </>
          )}

          <div className="calculator-actions">
            <button
              className="secondary-button"
              onClick={handlePrevSection}
              disabled={currentSection === 0}
            >
              Back
            </button>

            <button
              className="primary-button"
              onClick={handleNextSection}
              disabled={isCalculating}
            >
              {currentSection >= getTotalSections() - 1
                ? 'Calculate Results'
                : 'Next'}
            </button>
          </div>

          {errors.length > 0 && (
            <div className="calculator-errors">
              <p>Please fix the following errors:</p>
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error.message}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {showDealForm && (
        <DealForm
          configurationData={results}
          onClose={() => setShowDealForm(false)}
          calculatorType={calculatorType}
        />
      )}
    </div>
  );
}
