// src/app/components/CalculatorDealForm.js
'use client';

import { useState, useEffect } from 'react';
import { usePartner } from '@/utils/partners';
import psl from 'psl';

export default function CalculatorDealForm({
  configurationData,
  salesPersonDetails,
  calculatorType,
  onClose,
}) {
  const partner = usePartner();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    sourceInfo: '',
    brandsource: partner?.name?.toLowerCase() || 'voyager',
    projectDetails: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [immersionLink, setImmersionLink] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  /**
   * On mount, animate in the modal
   */
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  /**
   * Closes the modal with a short animation
   */
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  /**
   * Extracts domain from email address
   */
  function getDomainFromEmail(email) {
    const parts = email.split('@');
    if (parts.length === 2) {
      return parts[1];
    }
    throw new Error('Invalid email address');
  }

  /**
   * Validates email format and domain
   */
  function validateEmail(email) {
    try {
      if (!psl.isValid(getDomainFromEmail(email))) {
        throw new Error('Invalid domain');
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
      }
      return true;
    } catch (err) {
      console.error('Email validation error:', err.message);
      return false;
    }
  }

  /**
   * Handles form submission to HubSpot
   */
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phoneNumber
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    // Email validation
    if (!validateEmail(formData.email)) {
      setError('Invalid email address. Please use a valid domain.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate immersion link based on partner name
      const brandLink = partner?.name
        ? partner.name.toLowerCase().replace(/\s+/g, '')
        : 'voyager';

      const generatedLink = `https://immerse.voyagervrlab.co.uk/${brandLink}/${Date.now()}`;

      // Attach the immersion link to the existing config data
      const updatedConfigData = {
        ...configurationData,
        immersionLink: generatedLink,
      };

      // Include additional project details from form
      updatedConfigData.summary.projectDetails =
        formData.projectDetails;

      // Call the HubSpot API
      const resp = await fetch('/api/hubspot/create-deal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          calculatorType,
          contactDetails: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            companyName: formData.companyName,
            sourceInfo: formData.sourceInfo,
            brandsource: formData.brandsource,
            projectDetails: formData.projectDetails,
          },
          salesPersonDetails,
          configurationData: updatedConfigData,
        }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(data.error || 'Failed to submit');
      }

      // Show success state
      setImmersionLink(generatedLink);
      setSuccess(true);
    } catch (err) {
      console.error('Submission error:', err);
      setError(
        err.message ||
          'An error occurred during submission. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  /**
   * Updates form state when user types
   */
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } transition-opacity duration-300`}
    >
      <div
        className={`modal-bg w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl transform transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-accent">
            Submit {calculatorType} Request
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold mb-4 text-green-500">
                {calculatorType.charAt(0).toUpperCase() +
                  calculatorType.slice(1)}{' '}
                Request Submitted Successfully!
              </h3>
              {immersionLink && (
                <div className="mb-4">
                  <p className="text-sm text-accent">
                    Immersion Link:
                  </p>
                  <a
                    href={immersionLink}
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-blue-400"
                  >
                    {immersionLink}
                  </a>
                </div>
              )}
              <button
                onClick={handleClose}
                className="secondary-button px-6 py-2 font-semibold"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Required Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-accent">
                  Required Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="my-number-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="my-number-input"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="my-number-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="my-number-input"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-accent">
                  Additional Information
                </h3>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="my-number-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    How did you hear about us?
                  </label>
                  <input
                    type="text"
                    name="sourceInfo"
                    value={formData.sourceInfo}
                    onChange={handleChange}
                    className="my-number-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Additional Project Details
                  </label>
                  <textarea
                    name="projectDetails"
                    value={formData.projectDetails}
                    onChange={handleChange}
                    className="my-number-input"
                    rows={3}
                    placeholder="Any additional details about your project requirements..."
                  />
                </div>
              </div>

              {/* Salesperson Information (Read-only) */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-accent">
                  Submission Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Submitted By
                    </label>
                    <input
                      type="text"
                      value={`${salesPersonDetails.firstName} ${salesPersonDetails.lastName}`}
                      readOnly
                      className="my-number-input bg-opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      From Organization
                    </label>
                    <input
                      type="text"
                      value={
                        salesPersonDetails.companyName || 'Voyager'
                      }
                      readOnly
                      className="my-number-input bg-opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="p-4 bg-red-900/50 border border-red-500 rounded-md text-red-200">
                  {error}
                </div>
              )}

              {/* Form Actions */}
              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={handleClose}
                  className="secondary-button px-6 py-2 font-semibold"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="primary-button px-6 py-2 font-semibold disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
