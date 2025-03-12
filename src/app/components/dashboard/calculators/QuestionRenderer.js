// src/app/components/calculators/QuestionRenderer.js

'use client';

import React from 'react';

export default function QuestionRenderer({
  schema,
  section,
  answers,
  updateAnswer,
  errors,
}) {
  // Filter questions for current section
  const sectionQuestions = schema.questions.filter(
    (q) => q.section === section
  );

  // Get error for a specific question
  const getQuestionError = (questionId) => {
    return errors.find((error) => error.questionId === questionId)
      ?.message;
  };

  // Check if a question should be displayed based on conditional logic
  const shouldDisplayQuestion = (question) => {
    if (!question.displayCondition) return true;

    return evaluateCondition(question.displayCondition, answers);
  };

  // Render a specific question based on its type
  const renderQuestion = (question) => {
    if (!shouldDisplayQuestion(question)) return null;

    const error = getQuestionError(question.id);
    const isRequired = question.required;

    switch (question.type) {
      case 'text':
        return renderTextInput(question, error, isRequired);
      case 'number':
        return renderNumberInput(question, error, isRequired);
      case 'select':
        return renderSelect(question, error, isRequired);
      case 'multiselect':
        return renderMultiSelect(question, error, isRequired);
      case 'radio':
        return renderRadioGroup(question, error, isRequired);
      case 'checkbox':
        return renderCheckbox(question, error, isRequired);
      case 'textarea':
        return renderTextarea(question, error, isRequired);
      case 'date':
        return renderDateInput(question, error, isRequired);
      default:
        return <div>Unknown question type: {question.type}</div>;
    }
  };

  // Render a text input field
  const renderTextInput = (question, error, isRequired) => (
    <div className="question-item" key={question.id}>
      <label htmlFor={question.id}>
        {question.label}
        {isRequired && <span className="required-mark">*</span>}
      </label>
      <input
        type="text"
        id={question.id}
        value={answers[question.id] || ''}
        onChange={(e) => updateAnswer(question.id, e.target.value)}
        placeholder={question.placeholder || ''}
        className={`my-number-input ${error ? 'invalid' : ''}`}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );

  // Render a number input field
  const renderNumberInput = (question, error, isRequired) => (
    <div className="question-item" key={question.id}>
      <label htmlFor={question.id}>
        {question.label}
        {isRequired && <span className="required-mark">*</span>}
      </label>
      <input
        type="number"
        id={question.id}
        value={answers[question.id] || ''}
        onChange={(e) => {
          const val =
            e.target.value === '' ? '' : Number(e.target.value);
          updateAnswer(question.id, val);
        }}
        min={question.min}
        max={question.max}
        step={question.step || 1}
        placeholder={question.placeholder || ''}
        className={`my-number-input ${error ? 'invalid' : ''}`}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );

  // Render a select dropdown
  const renderSelect = (question, error, isRequired) => (
    <div className="question-item" key={question.id}>
      <label htmlFor={question.id}>
        {question.label}
        {isRequired && <span className="required-mark">*</span>}
      </label>
      <select
        id={question.id}
        value={answers[question.id] || ''}
        onChange={(e) => updateAnswer(question.id, e.target.value)}
        className={`my-number-input ${error ? 'invalid' : ''}`}
      >
        <option value="">
          {question.placeholder || 'Select an option'}
        </option>
        {question.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="error-message">{error}</div>}
    </div>
  );

  // Render a multi-select field
  const renderMultiSelect = (question, error, isRequired) => {
    const selectedValues = answers[question.id] || [];

    const handleCheckboxChange = (value) => {
      const newValues = [...selectedValues];

      if (newValues.includes(value)) {
        // Remove value
        const index = newValues.indexOf(value);
        newValues.splice(index, 1);
      } else {
        // Add value
        newValues.push(value);
      }

      updateAnswer(question.id, newValues);
    };

    return (
      <div className="question-item" key={question.id}>
        <label>
          {question.label}
          {isRequired && <span className="required-mark">*</span>}
        </label>
        <div className="checkbox-group">
          {question.options.map((option) => (
            <div key={option.value} className="checkbox-item">
              <input
                type="checkbox"
                id={`${question.id}-${option.value}`}
                checked={selectedValues.includes(option.value)}
                onChange={() => handleCheckboxChange(option.value)}
              />
              <label htmlFor={`${question.id}-${option.value}`}>
                {option.label}
              </label>
            </div>
          ))}
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
    );
  };

  // Render a radio button group
  const renderRadioGroup = (question, error, isRequired) => (
    <div className="question-item" key={question.id}>
      <label>
        {question.label}
        {isRequired && <span className="required-mark">*</span>}
      </label>
      <div className="radio-group">
        {question.options.map((option) => (
          <div key={option.value} className="radio-item">
            <input
              type="radio"
              id={`${question.id}-${option.value}`}
              name={question.id}
              value={option.value}
              checked={answers[question.id] === option.value}
              onChange={() => updateAnswer(question.id, option.value)}
            />
            <label htmlFor={`${question.id}-${option.value}`}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );

  // Render a single checkbox
  const renderCheckbox = (question, error, isRequired) => (
    <div className="question-item" key={question.id}>
      <div className="checkbox-single">
        <input
          type="checkbox"
          id={question.id}
          checked={!!answers[question.id]}
          onChange={(e) =>
            updateAnswer(question.id, e.target.checked)
          }
        />
        <label htmlFor={question.id}>
          {question.label}
          {isRequired && <span className="required-mark">*</span>}
        </label>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );

  // Render a textarea
  const renderTextarea = (question, error, isRequired) => (
    <div className="question-item" key={question.id}>
      <label htmlFor={question.id}>
        {question.label}
        {isRequired && <span className="required-mark">*</span>}
      </label>
      <textarea
        id={question.id}
        value={answers[question.id] || ''}
        onChange={(e) => updateAnswer(question.id, e.target.value)}
        placeholder={question.placeholder || ''}
        rows={question.rows || 4}
        className={`my-number-input ${error ? 'invalid' : ''}`}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );

  // Render a date input
  const renderDateInput = (question, error, isRequired) => (
    <div className="question-item" key={question.id}>
      <label htmlFor={question.id}>
        {question.label}
        {isRequired && <span className="required-mark">*</span>}
      </label>
      <input
        type="date"
        id={question.id}
        value={answers[question.id] || ''}
        onChange={(e) => updateAnswer(question.id, e.target.value)}
        className={`my-number-input ${error ? 'invalid' : ''}`}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );

  // Evaluate a condition to determine if a question should be displayed
  const evaluateCondition = (condition, answers) => {
    // Function-based condition
    if (typeof condition === 'function') {
      return condition(answers);
    }

    // Simple path-based condition
    if (condition.path && condition.operator) {
      const value = getValueByPath(answers, condition.path);

      switch (condition.operator) {
        case '==':
          return value === condition.value;
        case '!=':
          return value !== condition.value;
        case '>':
          return value > condition.value;
        case '>=':
          return value >= condition.value;
        case '<':
          return value < condition.value;
        case '<=':
          return value <= condition.value;
        case 'includes':
          return (
            Array.isArray(value) && value.includes(condition.value)
          );
        case 'notIncludes':
          return (
            !Array.isArray(value) || !value.includes(condition.value)
          );
        case 'isEmpty':
          return (
            value === undefined ||
            value === null ||
            value === '' ||
            (Array.isArray(value) && value.length === 0)
          );
        case 'isNotEmpty':
          return (
            value !== undefined &&
            value !== null &&
            value !== '' &&
            (!Array.isArray(value) || value.length > 0)
          );
        default:
          return false;
      }
    }

    // Complex conditions with AND/OR
    if (condition.AND) {
      return condition.AND.every((subCond) =>
        evaluateCondition(subCond, answers)
      );
    }

    if (condition.OR) {
      return condition.OR.some((subCond) =>
        evaluateCondition(subCond, answers)
      );
    }

    // Default (should not reach here if condition is well-formed)
    return false;
  };

  // Get a value from an object by dot-notation path
  const getValueByPath = (obj, path) => {
    return path.split('.').reduce((curr, key) => {
      return curr && curr[key] !== undefined ? curr[key] : undefined;
    }, obj);
  };

  return (
    <div className="calculator-questions">
      {sectionQuestions.length === 0 ? (
        <div className="no-questions">
          No questions for this section.
        </div>
      ) : (
        sectionQuestions.map((question) => renderQuestion(question))
      )}
    </div>
  );
}
