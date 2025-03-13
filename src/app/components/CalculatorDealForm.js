// src/app/components/CalculatorDealForm.js

'use client';

import { useState } from 'react';
import { createDeal } from '@/src/lib/hubspot';

export default function CalculatorDealForm({
  configurationData,
  salesPersonDetails,
  calculatorType = 'generic',
  onClose,
}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    sourceInfo: '',
    projectDetails: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate required fields
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Format results for HubSpot
      const formattedResults = {
        ...configurationData,
        summary: {
          ...configurationData.summary,
          projectDetails:
            formData.projectDetails ||
            configurationData.summary?.projectDetails ||
            '',
        },
      };

      // Submit to HubSpot
      const response = await createDeal(
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phoneNumber || '',
          companyName: formData.companyName || '',
          sourceInfo: formData.sourceInfo || '',
          projectDetails: formData.projectDetails || '',
          brandsource:
            salesPersonDetails?.companyName?.toLowerCase() ||
            'voyager',
        },
        formattedResults,
        {
          calculatorType,
          salesPersonId: salesPersonDetails?.email,
          organizationId: salesPersonDetails?.organizationId,
        }
      );

      // Show success message
      setSuccess(true);

      // Close modal after delay
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (err) {
      console.error('Error submitting to HubSpot:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Submit{' '}
            {calculatorType.charAt(0).toUpperCase() +
              calculatorType.slice(1)}{' '}
            Request
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-500 flex items-center justify-center text-2xl mx-auto mb-4">
                ✓
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Request Submitted Successfully!
              </h3>
              <p className="text-gray-600 mb-6">
                We&#39;ll be in touch with you shortly to discuss your
                requirements.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-primary text-white rounded-md font-medium"
                style={{
                  backgroundColor: 'var(--primary-color, #E79023)',
                }}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name*
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name*
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Company & Source */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      How did you hear about us?
                    </label>
                    <input
                      type="text"
                      name="sourceInfo"
                      value={formData.sourceInfo}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Project Details
                  </label>
                  <textarea
                    name="projectDetails"
                    value={formData.projectDetails}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Please provide any additional details that would help us understand your requirements better..."
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
                    {error}
                  </div>
                )}

                {/* Form Buttons */}
                <div className="flex gap-4 justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-white rounded-md font-medium disabled:opacity-50"
                    disabled={isSubmitting}
                    style={{
                      backgroundColor:
                        'var(--primary-color, #E79023)',
                    }}
                  >
                    {isSubmitting
                      ? 'Submitting...'
                      : 'Submit Request'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
