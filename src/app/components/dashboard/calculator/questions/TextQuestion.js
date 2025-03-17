// src/app/components/dashboard/calculators/questions/TextQuestion.js
'use client';

import React from 'react';

export default function TextQuestion({
  question,
  value,
  onChange,
  errors,
}) {
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

      {question.multiline ? (
        <textarea
          id={question.id}
          className={`text-area ${errors ? 'invalid' : ''}`}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          rows={question.rows || 4}
          placeholder={question.placeholder || ''}
        />
      ) : (
        <input
          id={question.id}
          type="text"
          className={`text-input ${errors ? 'invalid' : ''}`}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder || ''}
        />
      )}

      {errors && <p className="error-text">{errors}</p>}
    </div>
  );
}
