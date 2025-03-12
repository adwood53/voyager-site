// src/app/components/calculators/CalculatorContainer.js

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useOrganization } from '@clerk/nextjs';
import {
  calculateResults,
  initializeAnswers,
  validateAnswers,
} from '@/utils/calculatorEngine';
import { generateAndSavePDF } from '@/utils/pdfService';
import { createDeal, formatResultsForHubspot } from '@/utils/hubspot';
import QuestionRenderer from './QuestionRenderer';
import ResultsSummary from './ResultsSummary';
import RecommendationsPanel from './RecommendationsPanel';
import DealForm from '@/app/components/DealForm';

export default function CalculatorContainer({
  schema,
  calculatorType,
  includeHubspot = true,
}) {
  const router = useRouter();
  const { user, isSignedIn, isLoaded: userLoaded } = useUser();
  const { organization, isLoaded: orgLoaded } = useOrganization();

  // Initialize state
  const [answers, setAnswers] = useState(() =>
    initializeAnswers(schema)
  );
  const [currentSection, setCurrentSection] = useState(0);
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showDealForm, setShowDealForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  // Initialize with any default answers from schema
  useEffect(() => {
    setAnswers(initializeAnswers(schema));
  }, [schema]);

  // Update answer state
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

  // Calculate results based on current answers
  const calculateCurrentResults = () => {
    setIsCalculating(true);

    try {
      // Validate answers
      const validation = validateAnswers(schema, answers);

      if (!validation.valid) {
        setErrors(validation.errors);
        setIsCalculating(false);
        return null;
      }

      // Calculate results
      const calculatedResults = calculateResults(schema, answers, {
        calculatorType,
        organization: organization
          ? {
              id: organization.id,
              name: organization.name,
              slug: organization.slug,
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
      });

      setResults(calculatedResults);
      setShowResults(true);
      setErrors([]);
      return calculatedResults;
    } catch (error) {
      console.error('Error calculating results:', error);
      setErrors([
        {
          message: `Error calculating results: ${error.message}`,
        },
      ]);
      return null;
    } finally {
      setIsCalculating(false);
    }
  };

  // Handle next section
  const handleNextSection = () => {
    // Check for required questions in current section
    const currentSectionQuestions = schema.questions.filter(
      (q) => q.section === currentSection
    );

    const sectionValidation = validateAnswers(
      { questions: currentSectionQuestions },
      answers
    );

    if (!sectionValidation.valid) {
      setErrors(sectionValidation.errors);
      return;
    }

    // If this is the last section, calculate results
    if (currentSection >= getTotalSections() - 1) {
      calculateCurrentResults();
    } else {
      // Move to next section
      setCurrentSection(currentSection + 1);
    }
  };

  // Handle previous section
  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  // Get total number of sections in the schema
  const getTotalSections = () => {
    if (!schema.questions) return 1;

    const sections = new Set();
    schema.questions.forEach((q) => {
      if (q.section !== undefined) {
        sections.add(q.section);
      }
    });

    return sections.size || 1;
  };

  // Handle PDF export
  const handleExportPDF = () => {
    if (!results) {
      const calculatedResults = calculateCurrentResults();
      if (!calculatedResults) return;
    }

    generateAndSavePDF(
      results || calculateCurrentResults(),
      {
        title: schema.title || 'Voyager Calculator Results',
        subtitle: schema.subtitle || calculatorType,
        companyName: organization?.name || 'Voyager',
        showPrice: schema.showPrice !== false,
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

  // Handle HubSpot submission
  const handleSubmitToHubspot = () => {
    if (!results) {
      const calculatedResults = calculateCurrentResults();
      if (!calculatedResults) return;
    }

    setShowDealForm(true);
  };

  // Handle deal form submission
  const handleDealFormSubmit = async (contactDetails) => {
    if (!results && !calculateCurrentResults()) return;

    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      // Format results for HubSpot
      const formattedResults = formatResultsForHubspot(
        results || calculateCurrentResults(),
        calculatorType
      );

      // Create deal in HubSpot
      const response = await createDeal(
        contactDetails,
        formattedResults,
        {
          calculatorType,
          salesPersonId: user?.id,
          organizationId: organization?.id,
        }
      );

      setSubmissionResult({
        success: true,
        message: 'Successfully submitted to Voyager!',
        data: response,
      });

      // Close deal form after success
      setTimeout(() => {
        setShowDealForm(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting to HubSpot:', error);
      setSubmissionResult({
        success: false,
        message: `Error: ${error.message}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset calculator
  const handleReset = () => {
    setAnswers(initializeAnswers(schema));
    setCurrentSection(0);
    setResults(null);
    setErrors([]);
    setShowResults(false);
    setShowDealForm(false);
    setSubmissionResult(null);
  };

  // Back to results from recommendations
  const handleBackToResults = () => {
    setShowResults(true);
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    const totalSections = getTotalSections();
    return Math.round(((currentSection + 1) / totalSections) * 100);
  };

  return (
    <div className="calculator-container">
      {showResults ? (
        results?.recommendations?.length > 0 ? (
          <RecommendationsPanel
            recommendations={results.recommendations}
            onBackToResults={handleBackToResults}
            onReset={handleReset}
          />
        ) : (
          <ResultsSummary
            results={results}
            schema={schema}
            calculatorType={calculatorType}
            onExportPDF={handleExportPDF}
            onSubmitToHubspot={
              includeHubspot ? handleSubmitToHubspot : null
            }
            onReset={handleReset}
          />
        )
      ) : (
        <div className="calculator-questions-container">
          <div className="calculator-progress">
            <div className="progress-text">
              Section {currentSection + 1} of {getTotalSections()}
            </div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${calculateProgress()}%` }}
              />
            </div>
          </div>

          <QuestionRenderer
            schema={schema}
            section={currentSection}
            answers={answers}
            updateAnswer={updateAnswer}
            errors={errors}
          />

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
          onSubmit={handleDealFormSubmit}
          onClose={() => setShowDealForm(false)}
          isSubmitting={isSubmitting}
          submissionResult={submissionResult}
        />
      )}
    </div>
  );
}
