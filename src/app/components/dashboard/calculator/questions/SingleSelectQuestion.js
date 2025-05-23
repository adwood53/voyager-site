// src/app/components/dashboard/calculator/questions/SingleSelectQuestion.js - Updated
'use client';

import React from 'react';

export default function SingleSelectQuestion({
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

      <div className="select-options">
        {question.options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`select-option ${value === option.id ? 'active' : ''}`}
            onClick={() => onChange(option.id)}
          >
            {option.label}
            {option.description && (
              <span className="block mt-1 text-xs text-gray-500">
                {option.description}
              </span>
            )}
          </button>
        ))}
      </div>

      {errors && <p className="error-text">{errors}</p>}
    </div>
  );
}
