// src/app/components/dashboard/calculators/questions/NumericQuestion.js
'use client';

export default function NumericQuestion({
  question,
  value,
  onChange,
  errors,
}) {
  const handleChange = (e) => {
    const val =
      e.target.value.trim() === ''
        ? null
        : parseInt(e.target.value, 10);

    if (val !== null) {
      // Apply min/max constraints
      const min =
        question.min !== undefined
          ? question.min
          : Number.MIN_SAFE_INTEGER;
      const max =
        question.max !== undefined
          ? question.max
          : Number.MAX_SAFE_INTEGER;

      onChange(Math.min(Math.max(val, min), max));
    } else {
      onChange(null);
    }
  };

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

      <input
        type="number"
        className={`my-number-input ${errors ? 'invalid' : ''}`}
        value={value ?? ''}
        onChange={handleChange}
        min={question.min}
        max={question.max}
      />

      {errors && (
        <div className="mt-1 text-sm text-red-600">{errors}</div>
      )}
    </div>
  );
}
