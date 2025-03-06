// src/app/partner/settings/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useUser, useOrganization } from '@clerk/nextjs';
import PartnerNavbar from '@/src/app/components/PartnerNavbar';
import { useFirebase } from '@/src/contexts/FirebaseContext';
import { FirestoreTest } from '@/src/app/components/firebase/FirestoreTest';
import {
  updateOrganization,
  createOrganization,
} from '@/src/lib/firestore';

export default function OrganizationSettings() {
  const { user, isSignedIn, isLoaded } = useUser();
  const { organization: clerkOrg, membership } = useOrganization();
  const { organization: firestoreOrg, loading } = useFirebase();
  const router = useRouter();

  // Form state with more refined default colors
  const [formData, setFormData] = useState({
    primaryColor: '#2563EB', // Refined blue
    secondaryColor: '#10B981', // Soft green
    textColor: '#1F2937', // Dark gray
    bgColor: '#F9FAFB', // Light gray background
    cardBgColor: '#FFFFFF', // Pure white for cards
    borderColor: '#E5E7EB', // Soft border color
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  // Populate form with existing data when available
  useEffect(() => {
    if (!loading && firestoreOrg) {
      setFormData({
        primaryColor: firestoreOrg.primaryColor || '#2563EB',
        secondaryColor: firestoreOrg.secondaryColor || '#10B981',
        textColor: firestoreOrg.textColor || '#1F2937',
        bgColor: firestoreOrg.bgColor || '#F9FAFB',
        cardBgColor: firestoreOrg.cardBgColor || '#FFFFFF',
        borderColor: firestoreOrg.borderColor || '#E5E7EB',
      });
    }
  }, [firestoreOrg, loading]);

  // Check if user is an admin or owner
  const isAdmin =
    membership?.role === 'admin' || membership?.role === 'owner';

  // Handle form changes
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

    if (!clerkOrg) {
      setSaveMessage('No organization found to update');
      return;
    }

    if (!isAdmin) {
      setSaveMessage('Only admins can update organization settings');
      return;
    }

    setIsSaving(true);
    setSaveMessage('');

    try {
      if (firestoreOrg) {
        // Update existing organization
        await updateOrganization(firestoreOrg.id, {
          ...formData,
          name: clerkOrg.name,
          clerkOrgId: clerkOrg.id,
          logo: clerkOrg.imageUrl || firestoreOrg.logo,
          updatedAt: new Date().toISOString(),
        });
      } else {
        // Create new organization
        await createOrganization({
          ...formData,
          name: clerkOrg.name,
          clerkOrgId: clerkOrg.id,
          logo: clerkOrg.imageUrl || '',
          createdAt: new Date().toISOString(),
        });
      }

      setSaveMessage('Settings saved successfully');

      // Refresh the page to apply new styles
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Error saving settings:', error);
      setSaveMessage('Error saving settings: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  // If still loading, show loading state
  if (!isLoaded || loading || !user) {
    return (
      <div className="partner-dashboard flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading settings...</p>
        </div>
      </div>
    );
  }

  // Get organization details
  const orgName = clerkOrg?.name || 'Partner Organization';
  const orgLogo = clerkOrg?.imageUrl || '/Voyager-Box-Logo.png';

  // Color input fields with labels and descriptions
  const colorFields = [
    {
      key: 'primaryColor',
      label: 'Primary Color',
      description:
        'Main brand color used for key elements and highlights',
    },
    {
      key: 'secondaryColor',
      label: 'Secondary Color',
      description:
        'Complementary color for accents and secondary actions',
    },
    {
      key: 'textColor',
      label: 'Text Color',
      description: 'Default color for body text',
    },
    {
      key: 'bgColor',
      label: 'Background Color',
      description: 'Main page background color',
    },
    {
      key: 'cardBgColor',
      label: 'Card Background',
      description: 'Background color for cards and panels',
    },
    {
      key: 'borderColor',
      label: 'Border Color',
      description: 'Color for borders and dividers',
    },
  ];

  return (
    <div className="partner-dashboard min-h-screen bg-gray-50">
      {/* Main Container */}
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Organization Settings
            </h1>
            <p className="text-gray-500 mt-2">
              Customize your organization's appearance
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Image
              src={orgLogo}
              alt={`${orgName} Logo`}
              width={50}
              height={50}
              className="rounded-md"
            />
            <div>
              <p className="font-semibold text-gray-700">{orgName}</p>
              <p className="text-sm text-gray-500">
                {isAdmin ? 'Admin' : 'Member'}
              </p>
            </div>
          </div>
        </div>

        {/* Firestore Connection Test */}
        <div className="mb-8">
          <FirestoreTest />
          {!isAdmin && (
            <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-yellow-700">
                You need admin privileges to edit organization
                settings.
              </p>
            </div>
          )}
        </div>

        {/* Settings Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-8"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {colorFields.map((field) => (
              <div key={field.key} className="space-y-2">
                <label
                  htmlFor={field.key}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field.label}
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  {field.description}
                </p>
                <div className="flex items-center space-x-4">
                  <input
                    type="color"
                    id={field.key}
                    name={field.key}
                    value={formData[field.key]}
                    onChange={handleChange}
                    disabled={!isAdmin}
                    className="h-10 w-10 rounded-md cursor-pointer border-2 border-gray-300"
                  />
                  <input
                    type="text"
                    name={field.key}
                    value={formData[field.key]}
                    onChange={handleChange}
                    disabled={!isAdmin}
                    className="flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Color Preview */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { name: 'Primary Color', key: 'primaryColor' },
              { name: 'Secondary Color', key: 'secondaryColor' },
              {
                name: 'Gradient',
                style: {
                  background: `linear-gradient(to right, ${formData.primaryColor}, ${formData.secondaryColor})`,
                },
              },
            ].map((color, index) => (
              <div
                key={index}
                className="p-4 rounded text-white text-center"
                style={
                  color.style || {
                    backgroundColor: formData[color.key],
                  }
                }
              >
                {color.name}
              </div>
            ))}
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isSaving || !isAdmin}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>

          {/* Save Message */}
          {saveMessage && (
            <div
              className={`
              mt-4 p-3 rounded-md 
              ${
                saveMessage.includes('Error')
                  ? 'bg-red-100 text-red-700 border-l-4 border-red-500'
                  : 'bg-green-100 text-green-700 border-l-4 border-green-500'
              }
            `}
            >
              {saveMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
