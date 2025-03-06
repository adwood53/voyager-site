// src/app/partner/settings/page.js - updated with better verification
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Link,
} from '@heroui/react';
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

  // Form state with default light theme colors
  const [formData, setFormData] = useState({
    primaryColor: '#E79023',
    secondaryColor: '#a6620c',
    textColor: '#333333',
    bgColor: '#FFFFFF',
    cardBgColor: '#F8F9FA',
    borderColor: '#E2E8F0',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [firestoreStatus, setFirestoreStatus] = useState('checking');
  const [testComplete, setTestComplete] = useState(false);

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  // Populate form with existing data when available
  useEffect(() => {
    if (!loading) {
      if (firestoreOrg) {
        setFormData({
          primaryColor: firestoreOrg.primaryColor || '#E79023',
          secondaryColor: firestoreOrg.secondaryColor || '#a6620c',
          textColor: firestoreOrg.textColor || '#333333',
          bgColor: firestoreOrg.bgColor || '#FFFFFF',
          cardBgColor: firestoreOrg.cardBgColor || '#F8F9FA',
          borderColor: firestoreOrg.borderColor || '#E2E8F0',
        });
        setFirestoreStatus('connected');
      } else if (clerkOrg) {
        // No Firestore record yet but we have a Clerk org
        setFirestoreStatus('not_found');
      } else {
        // No organization data at all
        setFirestoreStatus('no_org');
      }
    }
  }, [firestoreOrg, clerkOrg, loading]);

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

  // Run a Firestore test
  const testFirestore = async () => {
    try {
      setTestComplete(false);
      setSaveMessage('Testing Firestore connection...');

      // Create a test object
      const testObj = {
        testId: Date.now().toString(),
        timestamp: new Date().toISOString(),
      };

      // Try to update (or create) the organization with this test field
      if (firestoreOrg) {
        await updateOrganization(firestoreOrg.id, {
          ...firestoreOrg,
          testField: testObj,
        });
      } else if (clerkOrg) {
        // Create a new organization record
        await createOrganization({
          clerkOrgId: clerkOrg.id,
          name: clerkOrg.name,
          logo: clerkOrg.imageUrl || '',
          testField: testObj,
          primaryColor: '#E79023',
          secondaryColor: '#a6620c',
        });
      } else {
        throw new Error('No organization available for testing');
      }

      setSaveMessage(
        'Firestore connection successful! Your settings can be saved.'
      );
      setTestComplete(true);
    } catch (error) {
      console.error('Firestore test failed:', error);
      setSaveMessage(`Firestore test failed: ${error.message}`);
      setTestComplete(true);
    }
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
          // Keep other existing fields intact
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
      <div className="partner-dashboard flex flex-col items-center justify-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div
            className="w-20 h-20 bg-opacity-20 rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: 'var(--partner-primary)' }}
          >
            <svg
              className="w-10 h-10 animate-spin"
              style={{ color: 'var(--partner-primary)' }}
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <p>Loading settings...</p>
        </div>
      </div>
    );
  }

  // Get organization details
  const orgName = clerkOrg?.name || 'Partner Organization';
  const orgLogo = clerkOrg?.imageUrl || '/Voyager-Box-Logo.png';

  return (
    <div className="partner-dashboard flex flex-col min-h-screen">
      {/* Organization branding header */}
      <header className="partner-header p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Organization logo */}
          <div className="flex items-center">
            <Image
              src={orgLogo}
              alt={orgName}
              width={40}
              height={40}
              className="rounded-md mr-3"
            />
            <span className="text-lg font-medium">{orgName}</span>
          </div>

          {/* Voyager logo */}
          <div className="flex items-center">
            <span className="opacity-70 mr-2 hidden sm:inline">
              Powered by
            </span>
            <Image
              src="/Voyager-Box-Logo.png"
              alt="Voyager"
              width={36}
              height={36}
              className="rounded-md"
            />
            <span className="partner-link font-medium ml-2">
              VOYAGER
            </span>
          </div>
        </div>
      </header>

      {/* Partner portal navigation */}
      <PartnerNavbar orgDetails={clerkOrg} />

      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="container mx-auto">
          <div className="partner-card w-full max-w-4xl mx-auto p-6">
            <div className="border-b pb-4 mb-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl md:text-3xl font-semibold">
                  Organization Settings
                </h1>
                <div className="text-right">
                  <p className="opacity-70 text-sm">
                    Customize your organization appearance
                  </p>
                  <FirestoreTest />
                  {!isAdmin && (
                    <p className="text-red-500 text-sm mt-1">
                      You need admin privileges to edit settings
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Firestore Status */}
            <div
              className={`mb-6 p-4 rounded-md ${
                firestoreStatus === 'connected'
                  ? 'bg-green-50 text-green-700'
                  : firestoreStatus === 'not_found'
                    ? 'bg-yellow-50 text-yellow-700'
                    : firestoreStatus === 'no_org'
                      ? 'bg-red-50 text-red-700'
                      : 'bg-blue-50 text-blue-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    {firestoreStatus === 'connected'
                      ? 'Firestore Organization Record Found'
                      : firestoreStatus === 'not_found'
                        ? 'New Organization - No Firestore Record Yet'
                        : firestoreStatus === 'no_org'
                          ? 'No Organization Found'
                          : 'Checking Firestore Status...'}
                  </p>
                  <p className="text-sm mt-1">
                    {firestoreStatus === 'connected'
                      ? 'Your settings are already saved in our database.'
                      : firestoreStatus === 'not_found'
                        ? "We'll create a new record when you save settings."
                        : firestoreStatus === 'no_org'
                          ? 'You need to create or join an organization.'
                          : 'Please wait while we check your organization status...'}
                  </p>
                </div>
                {isAdmin &&
                  (firestoreStatus === 'connected' ||
                    firestoreStatus === 'not_found') && (
                    <Button
                      onClick={testFirestore}
                      className="partner-button-secondary px-4 py-2 rounded-md text-sm"
                      disabled={isSaving || testComplete}
                    >
                      Test Connection
                    </Button>
                  )}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Organization Logo (read-only) */}
                <div>
                  <label className="block mb-2 font-medium">
                    Organization Logo
                  </label>
                  <div className="flex items-center gap-4">
                    <div
                      className="w-16 h-16 border rounded-md overflow-hidden flex items-center justify-center"
                      style={{ borderColor: 'var(--partner-border)' }}
                    >
                      <Image
                        src={orgLogo}
                        alt={orgName}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    <div className="opacity-70 text-sm">
                      Logo is managed through your Clerk organization
                      settings
                    </div>
                  </div>
                </div>

                {/* Organization Name (read-only) */}
                <div>
                  <label className="block mb-2 font-medium">
                    Organization Name
                  </label>
                  <div
                    className="w-full px-3 py-2 bg-opacity-10 rounded-md"
                    style={{
                      backgroundColor: 'var(--partner-border)',
                    }}
                  >
                    {orgName}
                  </div>
                  <p className="opacity-70 text-xs mt-1">
                    Name is managed through your Clerk organization
                    settings
                  </p>
                </div>

                {/* Basic Colors Group */}
                <div className="md:col-span-2">
                  <h2 className="text-lg font-medium mb-3">
                    Brand Colors
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Primary Color */}
                    <div>
                      <label className="block mb-2">
                        Primary Color
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          name="primaryColor"
                          value={formData.primaryColor}
                          onChange={handleChange}
                          className="h-10 w-10 rounded-md cursor-pointer border"
                          style={{
                            borderColor: 'var(--partner-border)',
                          }}
                          disabled={!isAdmin}
                        />
                        <input
                          type="text"
                          name="primaryColor"
                          value={formData.primaryColor}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-1"
                          style={{
                            borderColor: 'var(--partner-border)',
                            backgroundColor: 'var(--partner-bg)',
                            color: 'var(--partner-text)',
                          }}
                          placeholder="#E79023"
                          disabled={!isAdmin}
                        />
                      </div>
                    </div>

                    {/* Secondary Color */}
                    <div>
                      <label className="block mb-2">
                        Secondary Color
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          name="secondaryColor"
                          value={formData.secondaryColor}
                          onChange={handleChange}
                          className="h-10 w-10 rounded-md cursor-pointer border"
                          style={{
                            borderColor: 'var(--partner-border)',
                          }}
                          disabled={!isAdmin}
                        />
                        <input
                          type="text"
                          name="secondaryColor"
                          value={formData.secondaryColor}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-1"
                          style={{
                            borderColor: 'var(--partner-border)',
                            backgroundColor: 'var(--partner-bg)',
                            color: 'var(--partner-text)',
                          }}
                          placeholder="#a6620c"
                          disabled={!isAdmin}
                        />
                      </div>
                    </div>

                    {/* Text Color */}
                    <div>
                      <label className="block mb-2">Text Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          name="textColor"
                          value={formData.textColor}
                          onChange={handleChange}
                          className="h-10 w-10 rounded-md cursor-pointer border"
                          style={{
                            borderColor: 'var(--partner-border)',
                          }}
                          disabled={!isAdmin}
                        />
                        <input
                          type="text"
                          name="textColor"
                          value={formData.textColor}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-1"
                          style={{
                            borderColor: 'var(--partner-border)',
                            backgroundColor: 'var(--partner-bg)',
                            color: 'var(--partner-text)',
                          }}
                          placeholder="#333333"
                          disabled={!isAdmin}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* UI Colors Group */}
                <div className="md:col-span-2">
                  <h2 className="text-lg font-medium mb-3">
                    Interface Colors
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Background Color */}
                    <div>
                      <label className="block mb-2">
                        Background Color
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          name="bgColor"
                          value={formData.bgColor}
                          onChange={handleChange}
                          className="h-10 w-10 rounded-md cursor-pointer border"
                          style={{
                            borderColor: 'var(--partner-border)',
                          }}
                          disabled={!isAdmin}
                        />
                        <input
                          type="text"
                          name="bgColor"
                          value={formData.bgColor}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-1"
                          style={{
                            borderColor: 'var(--partner-border)',
                            backgroundColor: 'var(--partner-bg)',
                            color: 'var(--partner-text)',
                          }}
                          placeholder="#FFFFFF"
                          disabled={!isAdmin}
                        />
                      </div>
                    </div>

                    {/* Card Background Color */}
                    <div>
                      <label className="block mb-2">
                        Card Background Color
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          name="cardBgColor"
                          value={formData.cardBgColor}
                          onChange={handleChange}
                          className="h-10 w-10 rounded-md cursor-pointer border"
                          style={{
                            borderColor: 'var(--partner-border)',
                          }}
                          disabled={!isAdmin}
                        />
                        <input
                          type="text"
                          name="cardBgColor"
                          value={formData.cardBgColor}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-1"
                          style={{
                            borderColor: 'var(--partner-border)',
                            backgroundColor: 'var(--partner-bg)',
                            color: 'var(--partner-text)',
                          }}
                          placeholder="#F8F9FA"
                          disabled={!isAdmin}
                        />
                      </div>
                    </div>

                    {/* Border Color */}
                    <div>
                      <label className="block mb-2">
                        Border Color
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          name="borderColor"
                          value={formData.borderColor}
                          onChange={handleChange}
                          className="h-10 w-10 rounded-md cursor-pointer border"
                          style={{
                            borderColor: 'var(--partner-border)',
                          }}
                          disabled={!isAdmin}
                        />
                        <input
                          type="text"
                          name="borderColor"
                          value={formData.borderColor}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-1"
                          style={{
                            borderColor: 'var(--partner-border)',
                            backgroundColor: 'var(--partner-bg)',
                            color: 'var(--partner-text)',
                          }}
                          placeholder="#E2E8F0"
                          disabled={!isAdmin}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Color Preview */}
              <div className="mb-8">
                <h3 className="font-medium mb-4">Preview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    className="p-4 rounded-md flex items-center justify-center h-24 text-center text-white"
                    style={{ backgroundColor: formData.primaryColor }}
                  >
                    Primary Color
                  </div>
                  <div
                    className="p-4 rounded-md flex items-center justify-center h-24 text-center text-white"
                    style={{
                      backgroundColor: formData.secondaryColor,
                    }}
                  >
                    Secondary Color
                  </div>
                  <div
                    className="p-4 rounded-md flex items-center justify-center h-24 text-center text-white"
                    style={{
                      background: `linear-gradient(315deg, ${formData.primaryColor} 0%, ${formData.secondaryColor} 100%)`,
                    }}
                  >
                    Gradient
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    className="p-4 rounded-md border flex items-center justify-center h-24 text-center"
                    style={{
                      backgroundColor: formData.bgColor,
                      color: formData.textColor,
                      borderColor: formData.borderColor,
                    }}
                  >
                    Background
                  </div>
                  <div
                    className="p-4 rounded-md border flex items-center justify-center h-24 text-center"
                    style={{
                      backgroundColor: formData.cardBgColor,
                      color: formData.textColor,
                      borderColor: formData.borderColor,
                    }}
                  >
                    Card Background
                  </div>
                  <div
                    className="p-4 rounded-md border-2 flex items-center justify-center h-24 text-center"
                    style={{
                      backgroundColor: formData.cardBgColor,
                      color: formData.textColor,
                      borderColor: formData.borderColor,
                    }}
                  >
                    Border Color
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <div className="flex justify-end gap-4">
                <Button
                  as={Link}
                  href="/partner"
                  className="border px-6 py-2 rounded-md transition-all"
                  style={{
                    borderColor: 'var(--partner-border)',
                    color: 'var(--partner-text)',
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="partner-button-primary px-6 py-2 rounded-md transition-all"
                  disabled={
                    isSaving ||
                    !isAdmin ||
                    firestoreStatus === 'no_org'
                  }
                >
                  {isSaving ? 'Saving...' : 'Save Settings'}
                </Button>
              </div>

              {/* Save message */}
              {saveMessage && (
                <div
                  className={`mt-4 p-3 rounded-md ${saveMessage.includes('Error') || saveMessage.includes('failed') ? 'bg-red-100 text-red-700' : saveMessage.includes('Testing') ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}
                >
                  {saveMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="partner-header p-4 mt-auto">
        <div className="container mx-auto text-center opacity-60 text-sm">
          &copy; {new Date().getFullYear()} Voyager. All rights
          reserved.
        </div>
      </footer>
    </div>
  );
}
