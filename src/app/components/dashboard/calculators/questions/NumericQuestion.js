// src/app/components/dashboard/calculators/questions/NumericQuestion.js
'use client';

import React from 'react';

export default function NumericQuestion({
  question,
  value,
  onChange,
  errors,
}) {
  const handleChange = (e) => {
    const val = e.target.value === '' ? '' : Number(e.target.value);
    onChange(val);
  };

  return (
    <div className="question-container">
      <label className="question-label" htmlFor={question.id}>
        {question.label}
        {question.required !== false && (
          <span className="required">*</span>
        )}
      </label>

      {question.helpText && (
        <p className="question-help">{question.helpText}</p>
      )}

      <input
        id={question.id}
        type="number"
        className={`numeric-input ${errors ? 'invalid' : ''}`}
        value={value === null || value === undefined ? '' : value}
        onChange={handleChange}
        min={question.min}
        max={question.max}
        step={question.step || 1}
        placeholder={question.placeholder || ''}
      />

      {/* Display min/max constraints if specified */}
      {(question.min !== undefined || question.max !== undefined) && (
        <div className="range-labels">
          {question.min !== undefined && (
            <span>Min: {question.min}</span>
          )}
          {question.max !== undefined && (
            <span>Max: {question.max}</span>
          )}
        </div>
      )}

      {errors && <p className="error-text">{errors}</p>}
    </div>
  );
}
