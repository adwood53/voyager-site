// src/app/components/dashboard/calculators/questions/YesNoQuestion.js
'use client';

import React from 'react';

export default function YesNoQuestion({
  question,
  value,
  onChange,
  errors,
}) {
  return (
    <div className="question-container">
      <label className="question-label">
        {question.label}
        {question.required !== false && (
          <span className="required">*</span>
        )}
      </label>

      {question.helpText && (
        <p className="question-help">{question.helpText}</p>
      )}

      <div className="yes-no-buttons">
        <button
          type="button"
          className={`yes-no-button ${value === true ? 'active' : ''}`}
          onClick={() => onChange(true)}
        >
          Yes
        </button>

        <button
          type="button"
          className={`yes-no-button ${value === false ? 'active' : ''}`}
          onClick={() => onChange(false)}
        >
          No
        </button>
      </div>

      {errors && <p className="error-text">{errors}</p>}
    </div>
  );
}
