// src/app/components/dashboard/calculators/QuestionRenderer.js

'use client';

import React from 'react';
import TextQuestion from './questions/TextQuestion';
import NumericQuestion from './questions/NumericQuestion';
import SingleSelectQuestion from './questions/SingleSelectQuestion';
import YesNoQuestion from './questions/YesNoQuestion';

export default function QuestionRenderer({
  schema,
  answers,
  updateAnswer,
  errors,
}) {
  // Filter out questions that shouldn't be shown based on conditions
  const shouldDisplayQuestion = (question) => {
    if (!question.dependsOn) return true;

    // Check dependency condition
    const { questionId, value } = question.dependsOn;

    // If dependent question doesn't have an answer yet, don't show this question
    if (answers[questionId] === undefined) return false;

    // Return true if the dependent question's answer matches the required value
    return answers[questionId] === value;
  };

  // Get error message for a specific question
  const getQuestionError = (questionId) => {
    const questionError = errors.find(
      (err) => err.questionId === questionId
    );
    return questionError ? questionError.message : '';
  };

  // Render the appropriate question component based on question type
  const renderQuestion = (question) => {
    if (!shouldDisplayQuestion(question)) return null;

    const error = getQuestionError(question.id);

    switch (question.type) {
      case 'text':
        return (
          <TextQuestion
            key={question.id}
            question={question}
            value={answers[question.id]}
            onChange={(value) => updateAnswer(question.id, value)}
            errors={error}
          />
        );

      case 'numeric':
        return (
          <NumericQuestion
            key={question.id}
            question={question}
            value={answers[question.id]}
            onChange={(value) => updateAnswer(question.id, value)}
            errors={error}
          />
        );

      case 'single-select':
        return (
          <SingleSelectQuestion
            key={question.id}
            question={question}
            value={answers[question.id]}
            onChange={(value) => updateAnswer(question.id, value)}
            errors={error}
          />
        );

      case 'yes-no':
        return (
          <YesNoQuestion
            key={question.id}
            question={question}
            value={answers[question.id]}
            onChange={(value) => updateAnswer(question.id, value)}
            errors={error}
          />
        );

      default:
        return (
          <div key={question.id} className="error-message">
            Unknown question type: {question.type}
          </div>
        );
    }
  };

  return (
    <div className="questions-container">
      {schema.questions ? (
        schema.questions.map((question) => renderQuestion(question))
      ) : (
        <div className="no-questions-message">
          No questions found in this section
        </div>
      )}
    </div>
  );
}
