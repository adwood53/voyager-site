'use client';
// src/app/components/dashboard/panels/admin/BrandingSettings.js

import { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
} from '@heroui/react';
import { useFirebase } from '@/src/contexts/FirebaseContext';
import { updateOrganization } from '@/src/lib/firestore';

/**
 * BrandingSettings component - Handles organization branding customization
 * @param {Object} props
 * @param {Object} props.organization - The Clerk organization object
 */
export default function BrandingSettings({ organization }) {
  const { organization: firestoreOrg, reload } = useFirebase();

  // Form state
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    primaryColor: '#2563EB',
    secondaryColor: '#10B981',
    textColor: '#1F2937',
    bgColor: '#F9FAFB',
    cardBgColor: '#FFFFFF',
    borderColor: '#E5E7EB',
  });

  // Initialize form with Firestore data when available
  useEffect(() => {
    if (firestoreOrg) {
      setFormData({
        primaryColor: firestoreOrg.primaryColor || '#2563EB',
        secondaryColor: firestoreOrg.secondaryColor || '#10B981',
        textColor: firestoreOrg.textColor || '#1F2937',
        bgColor: firestoreOrg.bgColor || '#F9FAFB',
        cardBgColor: firestoreOrg.cardBgColor || '#FFFFFF',
        borderColor: firestoreOrg.borderColor || '#E5E7EB',
      });
    }
  }, [firestoreOrg]);

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
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      if (firestoreOrg) {
        await updateOrganization(firestoreOrg.id, {
          ...formData,
          name: organization?.name || firestoreOrg.name,
          logo: organization?.imageUrl || firestoreOrg.logo,
          updatedAt: new Date().toISOString(),
        });

        setMessage({
          type: 'success',
          text: 'Branding settings updated successfully',
        });

        // Reload Firestore data
        reload();

        // Reload page after a delay so new colors apply
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setMessage({
          type: 'error',
          text: 'Organization data not found',
        });
      }
    } catch (error) {
      console.error('Error updating branding:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to update branding settings',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Reset form to default values
  const handleReset = () => {
    setFormData({
      primaryColor: '#E79023',
      secondaryColor: '#a6620c',
      textColor: '#1F2937',
      bgColor: '#F9FAFB',
      cardBgColor: '#FFFFFF',
      borderColor: '#E5E7EB',
    });
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-800">
          Branding Settings
        </h2>
      </CardHeader>
      <CardBody>
        {/* Development note */}
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start">
          <div className="text-yellow-500 text-xl mr-3">⚠️</div>
          <div>
            <h3 className="text-yellow-800 font-medium mb-1">
              Feature in Development
            </h3>
            <p className="text-yellow-700 text-sm">
              The branding feature is still in development and may not
              fully apply to all areas of the dashboard.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <p className="mb-6 text-gray-600">
            Customize how your dashboard looks for all organization
            members.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Primary Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Colour
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  name="primaryColor"
                  className="w-10 h-10 rounded border border-gray-300"
                  value={formData.primaryColor}
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  name="primaryColor"
                  value={formData.primaryColor}
                  onChange={handleChange}
                  className="w-full bg-white text-gray-700"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Main brand colour for buttons and key UI elements
              </p>
            </div>

            {/* Secondary Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Secondary Colour
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  name="secondaryColor"
                  className="w-10 h-10 rounded border border-gray-300"
                  value={formData.secondaryColor}
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  name="secondaryColor"
                  value={formData.secondaryColor}
                  onChange={handleChange}
                  className="w-full bg-white text-gray-700"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Complementary colour for secondary UI elements
              </p>
            </div>

            {/* Text Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Text Colour
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  name="textColor"
                  className="w-10 h-10 rounded border border-gray-300"
                  value={formData.textColor}
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  name="textColor"
                  value={formData.textColor}
                  onChange={handleChange}
                  className="w-full bg-white text-gray-700"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Main text colour throughout the dashboard
              </p>
            </div>

            {/* Background Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Background Colour
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  name="bgColor"
                  className="w-10 h-10 rounded border border-gray-300"
                  value={formData.bgColor}
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  name="bgColor"
                  value={formData.bgColor}
                  onChange={handleChange}
                  className="w-full bg-white text-gray-700"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Main background colour for the dashboard
              </p>
            </div>

            {/* Card Background Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Background
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  name="cardBgColor"
                  className="w-10 h-10 rounded border border-gray-300"
                  value={formData.cardBgColor}
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  name="cardBgColor"
                  value={formData.cardBgColor}
                  onChange={handleChange}
                  className="w-full bg-white text-gray-700"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Background colour for cards and panels
              </p>
            </div>

            {/* Border Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Border Colour
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  name="borderColor"
                  className="w-10 h-10 rounded border border-gray-300"
                  value={formData.borderColor}
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  name="borderColor"
                  value={formData.borderColor}
                  onChange={handleChange}
                  className="w-full bg-white text-gray-700"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Colour for borders and dividers
              </p>
            </div>
          </div>

          {/* Preview */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Preview
            </h3>
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: formData.bgColor }}
            >
              <div
                className="p-4 rounded-lg mb-4"
                style={{
                  backgroundColor: formData.cardBgColor,
                  border: `1px solid ${formData.borderColor}`,
                }}
              >
                <h4
                  style={{ color: formData.textColor }}
                  className="font-medium mb-2"
                >
                  Preview Card
                </h4>
                <p
                  style={{ color: formData.textColor }}
                  className="text-sm mb-4"
                >
                  This is how your dashboard elements will appear.
                </p>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 rounded-md text-white"
                    style={{
                      backgroundColor: formData.primaryColor,
                    }}
                    type="button"
                  >
                    Primary Button
                  </button>
                  <button
                    className="px-4 py-2 rounded-md text-white"
                    style={{
                      backgroundColor: formData.secondaryColor,
                    }}
                    type="button"
                  >
                    Secondary Button
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button
              type="submit"
              color="primary"
              style={{
                backgroundColor: formData.primaryColor,
                color: '#FFFFFF',
              }}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Branding Settings'}
            </Button>

            <Button
              type="button"
              color="default"
              variant="flat"
              className="text-gray-700"
              onClick={handleReset}
            >
              Reset to Defaults
            </Button>
          </div>

          {message.text && (
            <div
              className={`mt-4 p-3 rounded-md ${
                message.type === 'error'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {message.text}
            </div>
          )}
        </form>
      </CardBody>
    </Card>
  );
}
