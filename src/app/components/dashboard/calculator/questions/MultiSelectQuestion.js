// src/app/components/dashboard/calculator/questions/MultiSelectQuestion.js
'use client';

import React from 'react';

export default function MultiSelectQuestion({
  question,
  value = [],
  onChange,
  errors,
}) {
  // Ensure value is always an array
  const selectedValues = Array.isArray(value) ? value : [];

  // Handle checkbox toggle
  const handleToggle = (optionId) => {
    if (selectedValues.includes(optionId)) {
      // Remove if already selected
      onChange(selectedValues.filter((id) => id !== optionId));
    } else {
      // Add if not selected
      onChange([...selectedValues, optionId]);
    }
  };

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

      <div className="multi-select-options space-y-2">
        {question.options.map((option) => (
          <div key={option.id} className="multi-select-option">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4"
                checked={selectedValues.includes(option.id)}
                onChange={() => handleToggle(option.id)}
              />
              <div className="ml-2">
                <div className="font-medium">{option.label}</div>
                {option.description && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {option.description}
                  </div>
                )}
              </div>
            </label>
          </div>
        ))}
      </div>

      {errors && <p className="error-text">{errors}</p>}
    </div>
  );
}
