'use client';

import { useState } from 'react';
import { useClerk, useUser, useOrganization } from '@clerk/nextjs';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Tabs,
  Tab,
  Switch,
  Select,
  SelectItem,
} from '@heroui/react';
import { useFirebase } from '@/src/contexts/FirebaseContext';
import Image from 'next/image';

export default function SettingsPanel({ isAdmin }) {
  const { user } = useUser();
  const { organization } = useOrganization();
  const { organization: firestoreOrg } = useFirebase();
  const [formMessage, setFormMessage] = useState('');

  // Form state for notification settings (example only)
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    projectUpdates: true,
    marketingEmails: false,
  });

  // Form state for user preferences (example only)
  const [userPreferences, setUserPreferences] = useState({
    language: 'en-GB',
    timezone: 'Europe/London',
    darkMode: false,
  });

  // Available languages
  const languages = [
    { key: 'en-GB', label: 'English (UK)' },
    { key: 'en-US', label: 'English (US)' },
    { key: 'fr-FR', label: 'French' },
    { key: 'de-DE', label: 'German' },
    { key: 'es-ES', label: 'Spanish' },
  ];

  // Available timezones
  const timezones = [
    { key: 'Europe/London', label: 'London (GMT/BST)' },
    { key: 'Europe/Paris', label: 'Paris (CET/CEST)' },
    { key: 'America/New_York', label: 'New York (ET)' },
    { key: 'America/Los_Angeles', label: 'Los Angeles (PT)' },
    { key: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  ];

  // Handle notification toggle changes
  const handleNotificationChange = (setting) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  // Handle preference changes
  const handlePreferenceChange = (setting, value) => {
    setUserPreferences((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  // Handle form submission - this would typically save to a database
  const handleSaveSettings = (type) => {
    // Here you would send the data to your backend
    setFormMessage(`${type} settings saved successfully`);

    // Clear the message after 3 seconds
    setTimeout(() => {
      setFormMessage('');
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Settings
        </h1>
        <p className="text-gray-600">
          Manage your account preferences and notifications
        </p>
      </div>

      <Tabs
        variant="underlined"
        classNames={{
          tab: 'data-[selected=true]:text-primary-color data-[selected=true]:border-primary-color text-gray-600',
          tabList: 'border-b border-gray-200',
        }}
      >
        {/* Account Settings Tab */}
        <Tab key="account" title="Account">
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-800">
                Your Profile
              </h2>
            </CardHeader>
            <CardBody>
              <div className="flex items-start gap-6 mb-6">
                <div className="relative h-24 w-24 overflow-hidden rounded-full">
                  <Image
                    src={user?.imageUrl || '/placeholder-avatar.jpg'}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-800">
                    {user?.fullName || 'Your Name'}
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {user?.primaryEmailAddress?.emailAddress ||
                      'your.email@example.com'}
                  </p>
                  <Button
                    color="primary"
                    className="bg-primary-color text-white"
                    style={{
                      backgroundColor:
                        'var(--primary-color, #2563EB)',
                    }}
                    onClick={() =>
                      window.open('/user-profile', '_blank')
                    }
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Organisation
                </h3>
                <div className="flex items-center gap-4">
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
                    <h4 className="font-medium text-gray-800">
                      {firestoreOrg?.name ||
                        organization?.name ||
                        'Your Organisation'}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {isAdmin ? 'Administrator' : 'Member'}
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>

        {/* Preferences Tab */}
        <Tab key="preferences" title="Preferences">
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-800">
                Display & Localisation
              </h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language
                  </label>
                  <Select
                    selectedKeys={[userPreferences.language]}
                    onChange={(e) =>
                      handlePreferenceChange(
                        'language',
                        e.target.value
                      )
                    }
                    className="w-full"
                  >
                    {languages.map((lang) => (
                      <SelectItem key={lang.key} value={lang.key}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">
                    Select your preferred language for the dashboard
                    interface
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time Zone
                  </label>
                  <Select
                    selectedKeys={[userPreferences.timezone]}
                    onChange={(e) =>
                      handlePreferenceChange(
                        'timezone',
                        e.target.value
                      )
                    }
                    className="w-full"
                  >
                    {timezones.map((tz) => (
                      <SelectItem key={tz.key} value={tz.key}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">
                    All dates and times will be displayed in this time
                    zone
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      Dark Mode
                    </h3>
                    <p className="text-xs text-gray-500">
                      Toggle dark mode for the dashboard (coming soon)
                    </p>
                  </div>
                  <Switch
                    checked={userPreferences.darkMode}
                    onChange={() =>
                      handlePreferenceChange(
                        'darkMode',
                        !userPreferences.darkMode
                      )
                    }
                    disabled={true} // Disabled as it's not yet implemented
                  />
                </div>

                <div className="pt-4">
                  <Button
                    color="primary"
                    style={{
                      backgroundColor:
                        'var(--primary-color, #2563EB)',
                      color: '#FFFFFF',
                    }}
                    onClick={() => handleSaveSettings('Preference')}
                  >
                    Save Preferences
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>

        {/* Notifications Tab */}
        <Tab key="notifications" title="Notifications">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-800">
                Notification Settings
              </h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      Email Notifications
                    </h3>
                    <p className="text-xs text-gray-500">
                      Receive important updates via email
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onChange={() =>
                      handleNotificationChange('emailNotifications')
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      Project Updates
                    </h3>
                    <p className="text-xs text-gray-500">
                      Notifications about changes to your projects
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.projectUpdates}
                    onChange={() =>
                      handleNotificationChange('projectUpdates')
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      Marketing Emails
                    </h3>
                    <p className="text-xs text-gray-500">
                      Promotional offers and marketing communications
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.marketingEmails}
                    onChange={() =>
                      handleNotificationChange('marketingEmails')
                    }
                  />
                </div>

                <div className="pt-4">
                  <Button
                    color="primary"
                    style={{
                      backgroundColor:
                        'var(--primary-color, #2563EB)',
                      color: '#FFFFFF',
                    }}
                    onClick={() => handleSaveSettings('Notification')}
                  >
                    Save Notification Settings
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>

        {/* Security Tab */}
        <Tab key="security" title="Security">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-800">
                Security Settings
              </h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-6">
                <p className="text-gray-600">
                  Manage your account security settings and password
                  through Clerk.
                </p>

                <div className="pt-4">
                  <Button
                    color="primary"
                    style={{
                      backgroundColor:
                        'var(--primary-color, #2563EB)',
                      color: '#FFFFFF',
                    }}
                    onClick={() =>
                      window.open('/user-profile/security', '_blank')
                    }
                  >
                    Manage Security Settings
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>

      {/* Success/Error message */}
      {formMessage && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
          {formMessage}
        </div>
      )}
    </div>
  );
}
