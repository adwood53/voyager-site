// src/app/components/dashboard/calculators/questions/TextQuestion.js
'use client';

export default function TextQuestion({
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

      {question.multiline ? (
        <textarea
          className={`my-number-input ${errors ? 'invalid' : ''}`}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          rows={question.rows || 3}
          placeholder={question.placeholder || ''}
        />
      ) : (
        <input
          type="text"
          className={`my-number-input ${errors ? 'invalid' : ''}`}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder || ''}
        />
      )}

      {errors && (
        <div className="mt-1 text-sm text-red-600">{errors}</div>
      )}
    </div>
  );
}
