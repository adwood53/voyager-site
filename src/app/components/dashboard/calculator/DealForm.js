// src/app/components/dashboard/calculator/DealForm.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePartner } from '@/src/utils/partners';

export default function DealForm({
  configurationData,
  onClose,
  calculatorType,
}) {
  const router = useRouter();
  const partner = usePartner();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    projectDetails: '',
    projectPurpose: '',
    projectName: '',
    sourceInfo: '',
    brandsource: partner?.brandSource || 'voyager',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
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

      // Add sales commission to commission items if available
      let commissionItems = [
        ...(configurationData.commissionItems || []),
      ];
      if (configurationData.pricing?.salesCommission) {
        commissionItems.push(
          `Sales Commission: £${configurationData.pricing.salesCommission.toFixed(2)}`
        );
      }

      // Prepare configuration data
      const updatedConfigData = {
        ...configurationData,
        commissionItems,
        immersionLink: '',
        summary: {
          ...configurationData.summary,
          projectDetails: formData.projectDetails || '',
          projectPurpose: formData.projectPurpose || '',
          projectName: formData.projectName || '',
        },
      };

      // Create the request body with proper hubspot field structure
      const requestBody = {
        contactDetails: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phoneNumber || '',
          companyName: formData.companyName || '',
          sourceInfo: formData.sourceInfo || '',
          projectDetails: formData.projectDetails || '',
          projectPurpose: formData.projectPurpose || '',
          projectName: formData.projectName || '',
          brandsource: formData.brandsource,
        },
        configurationData: updatedConfigData,
        calculatorType: calculatorType || 'merchandise',
      };

      // Submit to our API endpoint
      const response = await fetch('/api/hubspot/deal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || 'Failed to submit to Hubspot'
        );
      }

      const data = await response.json();
      console.log('HubSpot response:', data);

      // Show success message briefly
      setSuccess(true);

      // After short delay, close modal and reset
      setTimeout(() => {
        // Close the modal first
        setIsVisible(false);

        // Then after animation completes, call onClose to return to home panel
        setTimeout(() => {
          if (onClose && typeof onClose === 'function') {
            onClose();
          }

          // Navigate to home panel by redirecting to partner dashboard
          // We set a localStorage flag to indicate to go to home panel
          localStorage.setItem('dashboard_active_panel', 'home');
          window.location.href = '/partner';
        }, 300);
      }, 1500);
    } catch (err) {
      console.error('Error submitting to Hubspot:', err);
      setError(
        err.message || 'An error occurred while submitting the form.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } transition-opacity duration-300`}
    >
      <div
        className={`partner-dashboard bg-white border border-gray-200 rounded-lg shadow-lg transform transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        } max-w-2xl w-full max-h-[90vh] overflow-y-auto`}
      >
        {/* Header - Partner Style */}
        <div className="sticky top-0 p-6 border-b border-border-color bg-white flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Submit Configuration
          </h2>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-2xl mx-auto mb-4">
                ✓
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Configuration Submitted Successfully!
              </h3>
              <p className="text-gray-600 mb-6">
                Your request has been submitted. Redirecting to
                dashboard...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 bg-white text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 bg-white text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-white text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Project Information - Added new fields */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Project Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                    placeholder="Enter a name for your project"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Purpose
                  </label>
                  <input
                    type="text"
                    name="projectPurpose"
                    value={formData.projectPurpose}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                    placeholder="E.g. Increase sales, marketing campaign"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Details
                  </label>
                  <textarea
                    name="projectDetails"
                    value={formData.projectDetails}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 bg-white text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent resize-y"
                    placeholder="Add any additional information about your project that would help us understand your needs better."
                  ></textarea>
                </div>
              </div>

              {/* Source Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  How did you hear about us?
                </label>
                <input
                  type="text"
                  name="sourceInfo"
                  value={formData.sourceInfo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-transparent"
                />
              </div>

              {/* Error message */}
              {error && (
                <div className="p-4 mt-4 bg-red-100 border border-red-200 rounded-md text-red-700">
                  {error}
                </div>
              )}

              {/* Form Actions */}
              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsVisible(false);
                    setTimeout(onClose, 300);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 font-medium"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-color text-white rounded-md font-medium hover:bg-opacity-90 transition-colors"
                  style={{
                    backgroundColor: 'var(--primary-color, #E79023)',
                  }}
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
