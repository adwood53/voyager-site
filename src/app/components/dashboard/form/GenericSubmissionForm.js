'use client';

import { useState } from 'react';
import { Button } from '@heroui/react';
import { usePartner } from '@/src/utils/partners';

/**
 * A reusable form component for non-HubSpot form submissions
 *
 * @param {Object} props
 * @param {string} props.formTitle - Title of the form
 * @param {string} props.formType - Type of form (for API handling)
 * @param {Function} props.onSubmit - Custom submit handler (optional)
 * @param {Function} props.onCancel - Cancel button handler (optional)
 * @param {Array} props.extraFields - Additional form fields
 * @param {Object} props.initialValues - Initial form values
 * @param {string} props.submitButtonText - Text for submit button
 * @param {boolean} props.dark - Whether to use dark mode styling
 */
export default function GenericSubmissionForm({
  formTitle = 'Submit Request',
  formType = 'scope',
  onSubmit,
  onCancel,
  extraFields = [],
  initialValues = {},
  submitButtonText = 'Submit Request',
  dark = true,
}) {
  const partner = usePartner();

  // Initialize form data with partner source and any initial values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
    brandsource: partner?.brandSource || 'voyager',
    ...initialValues,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({
    type: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    try {
      // Validate form
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email
      ) {
        throw new Error('Please fill in all required fields');
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Custom onSubmit handler
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default form submission
        const payload = {
          formType,
          formData,
          timestamp: new Date().toISOString(),
          partner: {
            name: partner?.name || 'Voyager',
            id: partner?.id || 'default',
          },
        };

        // Submit to API
        const response = await fetch('/api/submit-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || 'Failed to submit form'
          );
        }
      }

      setFormStatus({
        type: 'success',
        message: 'Form submitted successfully!',
      });

      // Clear form after successful submission
      if (!onSubmit) {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          message: '',
          brandsource: partner?.brandSource || 'voyager',
        });
      }
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: error.message || 'An error occurred',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dynamic base styles based on dark/light mode
  const baseStyles = dark
    ? {
        container:
          'bg-darkBg border border-primary border-opacity-20 rounded-lg p-6',
        input:
          'bg-darkCard border border-primary border-opacity-30 rounded-md text-textLight focus:outline-none focus:border-primary',
        label: 'text-textLight',
        successAlert:
          'bg-green-900/20 border border-green-500/50 text-green-200',
        errorAlert:
          'bg-red-900/20 border border-red-500/50 text-red-200',
      }
    : {
        container:
          'bg-white border border-gray-200 rounded-lg p-6 shadow-sm',
        input:
          'bg-gray-50 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:border-primary',
        label: 'text-gray-700',
        successAlert:
          'bg-green-100 border border-green-300 text-green-800',
        errorAlert: 'bg-red-100 border border-red-300 text-red-800',
      };

  return (
    <div className={baseStyles.container}>
      <h2 className="text-2xl font-heading text-primary mb-6">
        {formTitle}
      </h2>

      {formStatus.message && (
        <div
          className={`mb-6 p-4 rounded-md ${
            formStatus.type === 'error'
              ? baseStyles.errorAlert
              : baseStyles.successAlert
          }`}
        >
          {formStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className={`block text-sm font-medium ${baseStyles.label} mb-1`}
            >
              First Name*
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 ${baseStyles.input}`}
            />
          </div>
          <div>
            <label
              className={`block text-sm font-medium ${baseStyles.label} mb-1`}
            >
              Last Name*
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 ${baseStyles.input}`}
            />
          </div>
        </div>

        <div>
          <label
            className={`block text-sm font-medium ${baseStyles.label} mb-1`}
          >
            Email Address*
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 ${baseStyles.input}`}
          />
        </div>

        <div>
          <label
            className={`block text-sm font-medium ${baseStyles.label} mb-1`}
          >
            Company Name
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={`w-full px-3 py-2 ${baseStyles.input}`}
          />
        </div>

        {/* Extra custom fields */}
        {extraFields.map((field, index) => (
          <div key={`field-${index}`}>
            <label
              className={`block text-sm font-medium ${baseStyles.label} mb-1`}
            >
              {field.label}
              {field.required ? '*' : ''}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                required={field.required}
                rows={field.rows || 4}
                className={`w-full px-3 py-2 ${baseStyles.input}`}
                placeholder={field.placeholder || ''}
              />
            ) : field.type === 'select' ? (
              <select
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                required={field.required}
                className={`w-full px-3 py-2 ${baseStyles.input}`}
              >
                <option value="">Select an option</option>
                {field.options.map((option, optIndex) => (
                  <option
                    key={`option-${optIndex}`}
                    value={option.value || option}
                  >
                    {option.label || option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || 'text'}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                required={field.required}
                className={`w-full px-3 py-2 ${baseStyles.input}`}
                placeholder={field.placeholder || ''}
              />
            )}
            {field.helpText && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {field.helpText}
              </p>
            )}
          </div>
        ))}

        <div>
          <label
            className={`block text-sm font-medium ${baseStyles.label} mb-1`}
          >
            Additional Notes
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={`w-full px-3 py-2 ${baseStyles.input}`}
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          {onCancel && (
            <Button
              type="button"
              onClick={onCancel}
              className={
                dark
                  ? 'px-4 py-2 border border-gray-600 rounded-md text-gray-300 bg-transparent hover:bg-gray-800'
                  : 'px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-transparent hover:bg-gray-100'
              }
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}

          <Button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-md font-medium disabled:opacity-50 hover:bg-accent transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : submitButtonText}
          </Button>
        </div>
      </form>
    </div>
  );
}
