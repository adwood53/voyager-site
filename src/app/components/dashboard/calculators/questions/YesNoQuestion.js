// src/app/components/dashboard/calculators/questions/YesNoQuestion.js
'use client';

export default function YesNoQuestion({
  question,
  value,
  onChange,
  errors,
}) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {question.label}
        {question.required !== false && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>

      {question.helpText && (
        <p className="text-xs text-gray-500 mb-2">
          {question.helpText}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          className={`big-button ${value === true ? 'active' : ''} ${
            errors ? 'invalid' : ''
          }`}
          onClick={() => onChange(true)}
        >
          Yes
        </button>

        <button
          type="button"
          className={`big-button ${value === false ? 'active' : ''} ${
            errors ? 'invalid' : ''
          }`}
          onClick={() => onChange(false)}
        >
          No
        </button>
      </div>

      {errors && (
        <div className="mt-1 text-sm text-red-600">{errors}</div>
      )}
    </div>
  );
}
