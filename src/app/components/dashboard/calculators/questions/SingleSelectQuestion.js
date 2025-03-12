// src/app/components/dashboard/calculators/questions/SingleSelectQuestion.js
'use client';

export default function SingleSelectQuestion({
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

      <div className="flex flex-wrap gap-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`big-button ${value === option.id ? 'active' : ''} ${
              errors ? 'invalid' : ''
            }`}
            onClick={() => onChange(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>

      {errors && (
        <div className="mt-1 text-sm text-red-600">{errors}</div>
      )}
    </div>
  );
}
