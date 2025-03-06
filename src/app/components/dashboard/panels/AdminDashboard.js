'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Tabs,
  Tab,
} from '@heroui/react';
import { useOrganization } from '@clerk/nextjs';
import { useFirebase } from '@/src/contexts/FirebaseContext';
import { updateOrganization } from '@/src/lib/firestore';
import Image from 'next/image';

export default function AdminDashboard() {
  const { organization } = useOrganization();
  const {
    organization: firestoreOrg,
    loading,
    reload,
  } = useFirebase();
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Form state for organisation settings
  const [formData, setFormData] = useState({
    primaryColor: firestoreOrg?.primaryColor || '#2563EB',
    secondaryColor: firestoreOrg?.secondaryColor || '#10B981',
    textColor: firestoreOrg?.textColor || '#1F2937',
    bgColor: firestoreOrg?.bgColor || '#F9FAFB',
    cardBgColor: firestoreOrg?.cardBgColor || '#FFFFFF',
    borderColor: firestoreOrg?.borderColor || '#E5E7EB',
  });

  // Update form data when Firestore org data loads
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

  // Handle form submission to update organisation settings
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage('');

    try {
      if (firestoreOrg) {
        await updateOrganization(firestoreOrg.id, {
          ...formData,
          name: organization?.name || firestoreOrg.name,
          logo: organization?.imageUrl || firestoreOrg.logo,
          updatedAt: new Date().toISOString(),
        });

        setMessage('Organisation settings updated successfully');
        reload(); // Refresh Firebase context data

        // Refresh the page after a delay to apply new styles
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setMessage('Error: Organisation data not found');
      }
    } catch (error) {
      console.error('Error updating organisation settings:', error);
      setMessage(`Error updating settings: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Quick stats for the dashboard
  const quickStats = [
    {
      label: 'Team Members',
      value: '5',
      icon: '👥',
      color: '#3B82F6',
    },
    {
      label: 'Active Projects',
      value: '3',
      icon: '📊',
      color: '#10B981',
    },
    {
      label: 'Total Revenue',
      value: '£12,450',
      icon: '💰',
      color: '#7C3AED',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your organisation settings and configurations
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {quickStats.map((stat, index) => (
          <Card key={index} className="bg-white">
            <CardBody className="flex items-center gap-4">
              <div
                className="p-3 rounded-full"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-800">
                  {stat.value}
                </p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Tabs
        variant="underlined"
        classNames={{
          tab: 'data-[selected=true]:text-primary-color data-[selected=true]:border-primary-color text-gray-600',
          tabList: 'border-b border-gray-200',
        }}
      >
        <Tab key="organisation" title="Organisation">
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-800">
                Organisation Information
              </h2>
            </CardHeader>
            <CardBody>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative h-16 w-16 overflow-hidden rounded-md">
                  <Image
                    src={
                      firestoreOrg?.logo ||
                      organization?.imageUrl ||
                      '/Voyager-Box-Logo.png'
                    }
                    alt="Organisation logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">
                    {firestoreOrg?.name ||
                      organization?.name ||
                      'Your Organisation'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    ID:{' '}
                    {firestoreOrg?.id ||
                      organization?.id ||
                      'Loading...'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organisation Name
                  </label>
                  <Input
                    type="text"
                    value={
                      firestoreOrg?.name || organization?.name || ''
                    }
                    readOnly
                    placeholder="Organisation Name"
                    className="w-full bg-gray-100 text-gray-700"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Managed through Clerk
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organisation Slug
                  </label>
                  <Input
                    type="text"
                    value={
                      firestoreOrg?.slug || organization?.slug || ''
                    }
                    readOnly
                    placeholder="Organisation Slug"
                    className="w-full bg-gray-100 text-gray-700"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Managed through Clerk
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>

        <Tab key="branding" title="Branding">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-800">
                Branding Settings
              </h2>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <p className="mb-6 text-gray-600">
                  Customise the appearance of your organisation&apos;s
                  dashboard. These settings affect how the dashboard
                  looks for all members of your organisation.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                      Main brand colour for buttons and key UI
                      elements
                    </p>
                  </div>

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
                      Complementary colour for accents and secondary
                      actions
                    </p>
                  </div>

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

                {/* Preview section */}
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
                        This is how your dashboard elements will
                        appear with the selected colours.
                      </p>
                      <div className="flex gap-2">
                        <button
                          className="px-4 py-2 rounded-md text-white"
                          style={{
                            backgroundColor: formData.primaryColor,
                          }}
                        >
                          Primary Button
                        </button>
                        <button
                          className="px-4 py-2 rounded-md text-white"
                          style={{
                            backgroundColor: formData.secondaryColor,
                          }}
                        >
                          Secondary Button
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

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
                    {isSaving
                      ? 'Saving...'
                      : 'Save Branding Settings'}
                  </Button>

                  <Button
                    type="button"
                    color="default"
                    variant="flat"
                    className="text-gray-700"
                    onClick={() =>
                      setFormData({
                        primaryColor: '#2563EB',
                        secondaryColor: '#10B981',
                        textColor: '#1F2937',
                        bgColor: '#F9FAFB',
                        cardBgColor: '#FFFFFF',
                        borderColor: '#E5E7EB',
                      })
                    }
                  >
                    Reset to Defaults
                  </Button>
                </div>

                {message && (
                  <div
                    className={`mt-4 p-3 rounded-md ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
                  >
                    {message}
                  </div>
                )}
              </form>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
