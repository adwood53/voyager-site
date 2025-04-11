// src/app/components/dashboard/panels/ContactPanel.js
'use client';

import { useState, useEffect } from 'react';
import { useUser, useOrganization } from '@clerk/nextjs';
import { useFirebase } from '@/src/contexts/FirebaseContext';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Select,
  SelectItem,
  Textarea,
} from '@heroui/react';

export default function ContactPanel() {
  const { user } = useUser();
  const { organization } = useOrganization();
  const { organization: firestoreOrg } = useFirebase();

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    contactReason: '',
    message: '',
    brandsource: 'partner-portal', // Indicate source as partner portal
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({
    type: '',
    message: '',
  });

  // Partner-specific contact reasons
  const contactReasons = [
    { value: 'custom-quote', label: 'Request a Custom Quote' },
    {
      value: 'project-support',
      label: 'Technical Support for a Project',
    },
    {
      value: 'sales-support',
      label: 'Sales Support for a Client Meeting',
    },
    { value: 'platform-issue', label: 'Report a Platform Issue' },
    { value: 'billing', label: 'Billing or Payment Question' },
    {
      value: 'partnership-upgrade',
      label: 'Discuss Partnership Upgrade',
    },
    { value: 'other', label: 'Other Inquiry' },
  ];

  // Populate form data from Clerk user and organization
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.primaryEmailAddress?.emailAddress || '',
        companyName: organization?.name || firestoreOrg?.name || '',
      }));
    }
  }, [user, organization, firestoreOrg]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle select change
  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      contactReason: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    try {
      // Validate form
      if (!formData.contactReason) {
        throw new Error('Please select a reason for contact');
      }

      if (!formData.message.trim()) {
        throw new Error('Please enter a message');
      }

      // Create request body with hubspot field structure
      const requestBody = {
        fields: [
          { name: 'firstname', value: formData.firstName },
          { name: 'lastname', value: formData.lastName },
          { name: 'email', value: formData.email },
          { name: 'company', value: formData.companyName },
          { name: 'message', value: formData.message },
          { name: 'contact_reason', value: formData.contactReason },
          { name: 'brandsource', value: formData.brandsource },
        ],
        context: {
          pageUri: window.location.href,
          pageName: 'Partner Portal - Contact',
        },
      };

      // Submit to HubSpot form endpoint
      const response = await fetch(
        'https://api.hsforms.com/submissions/v3/integration/submit/47604746/c4aa0a63-b6ae-4e49-a699-5f2b95b84c42',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setFormStatus({
          type: 'success',
          message:
            'Your message has been sent successfully. We will get back to you soon!',
        });

        // Reset message field but keep personal info
        setFormData((prev) => ({
          ...prev,
          contactReason: '',
          message: '',
        }));
      } else {
        throw new Error(
          result.message || 'Failed to send your message'
        );
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setFormStatus({
        type: 'error',
        message:
          error.message ||
          'An error occurred while sending your message',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Contact Support
        </h1>
        <p className="text-gray-600">
          Get in touch with our partner support team for assistance
          with your projects or account.
        </p>
      </div>

      <Card className="shadow-md rounded-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-primary/20">
          <h2 className="text-xl font-semibold text-gray-800">
            Partner Support Request
          </h2>
        </CardHeader>

        <CardBody className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Pre-filled user information - read-only display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <div className="bg-white px-3 py-2 border border-gray-300 rounded-md text-gray-600">
                  {formData.firstName} {formData.lastName}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="bg-white px-3 py-2 border border-gray-300 rounded-md text-gray-600">
                  {formData.email}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organisation
                </label>
                <div className="bg-white px-3 py-2 border border-gray-300 rounded-md text-gray-600">
                  {formData.companyName}
                </div>
              </div>
            </div>

            {/* Contact reason - FIXED: dropdown icon on right */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason for Contact*
              </label>
              <Select
                items={contactReasons}
                placeholder="Select a reason"
                selectedKeys={
                  formData.contactReason
                    ? [formData.contactReason]
                    : []
                }
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0];
                  if (selected) handleSelectChange(selected);
                }}
                className="w-full"
                classNames={{
                  trigger:
                    'bg-white border border-gray-300 text-gray-700 h-10 px-3 rounded-md text-left',
                  // Position icon on the right side
                  value: 'text-left mr-auto',
                  // Ensure dropdown icon is on the right
                  innerWrapper: 'flex justify-between items-center',
                  selectorIcon: 'ml-2 text-gray-400',
                  listbox: 'bg-white text-gray-700',
                }}
                aria-label="Select contact reason"
                isRequired
                // Explicitly position the icon to the right
                startContent={null}
                endContent={
                  <span className="text-gray-400">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.33334 6L8.00001 10.6667L12.6667 6"
                        stroke="currentColor"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                }
              >
                {(reason) => (
                  <SelectItem key={reason.value} value={reason.value}>
                    {reason.label}
                  </SelectItem>
                )}
              </Select>
            </div>

            {/* Message */}
            <div className="relative bg-white p-4 rounded-md border border-gray-300 mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message*
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                placeholder="Please describe your question or request in detail..."
                className="w-full px-3 py-2 bg-transparent text-gray-800 border border-gray-200 rounded-md resize-y focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                style={{
                  maxHeight: '300px', // Prevent excessive growth
                  overflowY: 'auto', // Add scrollbar when content exceeds height
                }}
                required
              ></textarea>
            </div>

            {/* Form status message */}
            {formStatus.message && (
              <div
                className={`p-4 rounded-md ${
                  formStatus.type === 'error'
                    ? 'bg-red-50 border border-red-200 text-red-700'
                    : 'bg-green-50 border border-green-200 text-green-700'
                }`}
              >
                {formStatus.message}
              </div>
            )}

            {/* Submit button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded-md font-medium disabled:opacity-50 hover:bg-accent transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      {/* Support information card - FIXED: email and descriptions */}
      <Card className="mt-8">
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-800">
            Additional Ways to Reach Us
          </h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary/30 transition-colors">
              <div className="text-3xl mb-3 text-red-600">📞</div>
              <h3 className="font-medium text-black text-lg mb-1">
                Phone Support
              </h3>
              <p className="text-center text-gray-600 mb-2">
                Partner priority line
              </p>
              <a
                href="tel:+447470361585"
                className="text-primary hover:text-accent transition-colors"
              >
                +44 7470 361585
              </a>
            </div>

            <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary/30 transition-colors">
              <div className="text-3xl mb-3 text-primary">📧</div>
              <h3 className="font-medium text-black text-lg mb-1">
                Email Support
              </h3>
              <p className="text-center text-gray-600 mb-2">
                Direct to partner team
              </p>
              <a
                href="mailto:connect@voyagervrlab.co.uk"
                className="text-primary hover:text-accent transition-colors"
              >
                connect@voyagervrlab.co.uk
              </a>
            </div>

            <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-primary/30 transition-colors">
              <div className="text-3xl mb-3 text-green-600">💬</div>
              <h3 className="font-medium text-black text-lg mb-1">
                WhatsApp Support
              </h3>
              <p className="text-center text-gray-600 mb-2">
                Technical support via WhatsApp
              </p>
              <a
                href="https://wa.me/447514020340"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white hover:bg-green-700 transition-colors px-4 py-2 rounded-md font-medium"
              >
                Start WhatsApp Chat
              </a>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
