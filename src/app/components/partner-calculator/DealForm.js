// src/app/components/partner-calculator/DealForm.js
'use client';

import { useState, useEffect } from 'react';
import { usePartner } from '@/src/utils/partners';

export default function DealForm({ configurationData, onClose }) {
  const partner = usePartner();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    sourceInfo: '',
    brandsource: partner?.brandSource || 'voyager', // This contains "SalesPerson @ Organization"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [immersionLink, setImmersionLink] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // Animate in the modal
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  // Handle form close with animation
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Basic email validation
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
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

    // Validate email
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate an immersion link if applicable
      // Format: https://immerse.voyagervrlab.co.uk/[partner-name]/[timestamp]
      const partnerSlug =
        partner?.name?.toLowerCase().replace(/\s+/g, '') || 'voyager';
      const generatedLink = `https://immerse.voyagervrlab.co.uk/${partnerSlug}/${Date.now()}`;

      // Add immersion link to configuration data
      const updatedConfigData = {
        ...configurationData,
        immersionLink: generatedLink,
      };

      // Create the request body
      const requestBody = {
        contactDetails: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phoneNumber || '',
          companyName: formData.companyName || '',
          sourceInfo: formData.sourceInfo || '',
          brandsource:
            formData.brandsource || partner?.brandSource || 'voyager',
        },
        configurationData: updatedConfigData,
        calculatorType: 'merchandise', // or passed as prop
        salesPersonId: partner?.userId || '',
      };

      // Submit to our API endpoint
      const response = await fetch('/api/hubspot/deal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit to Hubspot');
      }

      // Show success message
      setImmersionLink(generatedLink);
      setSuccess(true);
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
        className={`bg-darkBg transform transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        } max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-xl border border-primary border-opacity-20`}
      >
        {/* Header */}
        <div className="sticky top-0 p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-primary">
            Submit to Voyager
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
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-500 flex items-center justify-center text-2xl mx-auto mb-4">
                ✓
              </div>
              <h3 className="text-xl font-semibold mb-2 text-textLight">
                Request Submitted Successfully!
              </h3>
              <p className="text-textLight opacity-80 mb-6">
                We'll be in touch with you shortly to discuss your
                requirements.
              </p>
              <button
                onClick={handleClose}
                className="px-6 py-2 bg-primary text-white rounded-md font-medium"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-medium text-primary mb-4">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-textLight mb-1">
                      First Name*
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 bg-darkCard border border-primary border-opacity-30 rounded-md text-textLight focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-textLight mb-1">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 bg-darkCard border border-primary border-opacity-30 rounded-md text-textLight focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-textLight mb-1">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-darkCard border border-primary border-opacity-30 rounded-md text-textLight focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-textLight mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-darkCard border border-primary border-opacity-30 rounded-md text-textLight focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Company & Source */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-textLight mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-darkCard border border-primary border-opacity-30 rounded-md text-textLight focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-textLight mb-1">
                    How did you hear about us?
                  </label>
                  <input
                    type="text"
                    name="sourceInfo"
                    value={formData.sourceInfo}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-darkCard border border-primary border-opacity-30 rounded-md text-textLight focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-900/50 border border-red-500 rounded-md text-red-200">
                  {error}
                </div>
              )}

              {/* Form Buttons */}
              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 border border-gray-600 rounded-md text-gray-300 bg-transparent hover:bg-gray-800"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white rounded-md font-medium disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
