'use client';
// src/app/components/dashboard/panels/AdminDashboard.js

import { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Tabs,
  Tab,
  Select,
  SelectItem,
} from '@heroui/react';
import { useOrganization, useUser } from '@clerk/nextjs';
import { useFirebase } from '@/src/contexts/FirebaseContext';
import { updateOrganization } from '@/src/lib/firestore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

/**
 * Clerk roles often come back as "org:owner", "org:admin", "org:member"...
 * We map them to shorter UI labels (and back).
 */
const CLERK_ROLE_TO_DISPLAY = {
  'org:owner': 'owner',
  'org:admin': 'admin',
  'org:member': 'member',
  'org:guest': 'guest',
};

const DISPLAY_TO_CLERK_ROLE = {
  owner: 'org:owner',
  admin: 'org:admin',
  member: 'org:member',
  guest: 'org:guest',
};

export default function AdminDashboard() {
  const router = useRouter();
  const { user: clerkUser } = useUser();
  const {
    organization,
    membership, // The current user's membership in that org
    isLoaded: isOrgLoaded,
  } = useOrganization();
  const {
    organization: firestoreOrg,
    loading: firestoreLoading,
    reload,
  } = useFirebase();

  // This piece of state tracks whether we’re saving the branding form
  const [isSaving, setIsSaving] = useState(false);
  // A user-facing status message after saving
  const [message, setMessage] = useState('');

  // This is where we store the array of membership objects from Clerk
  const [members, setMembers] = useState([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);

  // If your membership's role is "org:owner", that means you're the owner
  const userClerkRole = membership?.role; // e.g. "org:admin" / "org:owner"
  const isOwner = userClerkRole === 'org:owner';
  const isAdminRole = userClerkRole === 'org:admin';

  // If you want the same old "admin" logic (like letting admin see the dashboard but not remove members):
  const isInFirestoreAdmins = firestoreOrg?.adminIds?.includes(
    clerkUser?.id
  );
  const isAdmin = Boolean(
    userClerkRole === 'org:admin' ||
      userClerkRole === 'org:owner' ||
      isInFirestoreAdmins
  );

  /**
   * Security: If not admin, redirect away.
   */
  useEffect(() => {
    if (membership && !isAdmin && !firestoreLoading) {
      console.warn(
        'Non-admin user in AdminDashboard; redirecting...'
      );
      router.push('/partner');
    }
  }, [isAdmin, membership, firestoreLoading, router]);

  /**
   * Once the Clerk organization is loaded, fetch all memberships.
   */
  useEffect(() => {
    if (!organization || !isOrgLoaded) return;

    async function fetchOrgMembers() {
      try {
        setIsLoadingMembers(true);
        console.log('Fetching memberships for org:', organization.id);
        const result = await organization.getMemberships();
        console.log('Clerk memberships response:', result);
        setMembers(result.data || []);
      } catch (error) {
        console.error('Error fetching members:', error);
        setMembers([]);
      } finally {
        setIsLoadingMembers(false);
      }
    }

    fetchOrgMembers();
  }, [organization, isOrgLoaded]);

  /**
   * If only owners can remove members, let's check isOwner first.
   */
  const handleRemoveMember = async (membershipId) => {
    if (!isOwner) {
      alert('Only the organization owner can remove members.');
      return;
    }

    console.log('Removing membership ID:', membershipId);
    try {
      await organization.removeMember(membershipId);
      console.log(`Successfully removed membership: ${membershipId}`);

      // Re-fetch to update UI
      const updated = await organization.getMemberships();
      setMembers(updated.data || []);
    } catch (error) {
      console.error('Error removing membership:', error);
      alert(`Error removing member: ${error.message}`);
    }
  };

  /**
   * If only owners can update roles:
   */
  const handleRoleChange = async (membershipId, displayRole) => {
    if (!isOwner) {
      alert('Only the owner can update roles.');
      return;
    }

    const clerkRole =
      DISPLAY_TO_CLERK_ROLE[displayRole] || 'org:member';
    console.log(`Updating role for ${membershipId} => ${clerkRole}`);
    try {
      await organization.updateMembership(membershipId, {
        role: clerkRole,
      });
      const updated = await organization.getMemberships();
      setMembers(updated.data || []);
    } catch (error) {
      console.error('Error updating membership role:', error);
      alert(`Error updating role: ${error.message}`);
    }
  };

  /**
   * Branding form data
   */
  const [formData, setFormData] = useState({
    primaryColor: firestoreOrg?.primaryColor || '#2563EB',
    secondaryColor: firestoreOrg?.secondaryColor || '#10B981',
    textColor: firestoreOrg?.textColor || '#1F2937',
    bgColor: firestoreOrg?.bgColor || '#F9FAFB',
    cardBgColor: firestoreOrg?.cardBgColor || '#FFFFFF',
    borderColor: firestoreOrg?.borderColor || '#E5E7EB',
  });

  // When Firestore data arrives, sync the branding fields
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

  // **HERE IS THE CRUCIAL MISSING FUNCTION**: handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * If Firestore is still loading, show a spinner
   */
  if (firestoreLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  /**
   * If not an admin, show Access Denied
   */
  if (!isAdmin) {
    return (
      <div className="max-w-lg mx-auto mt-12 p-6 bg-red-50 rounded-lg border border-red-200 text-center">
        <div className="text-red-500 text-4xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-red-700 mb-4">
          Access Denied
        </h2>
        <p className="text-gray-700 mb-4">
          You do not have permission to access the admin dashboard.
          Please contact your organization administrator.
        </p>
        <Button
          color="primary"
          onClick={() => router.push('/partner')}
          style={{
            backgroundColor: 'var(--primary-color, #2563EB)',
            color: '#FFFFFF',
          }}
        >
          Return to Dashboard
        </Button>
      </div>
    );
  }

  /**
   * Submitting the branding form
   */
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
        reload();

        // Reload page after a short delay so new colors apply
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

  // A quick stats array for the "Team Members" count
  const quickStats = [
    {
      label: 'Team Members',
      value: Array.isArray(members) ? members.length.toString() : '0',
      icon: '👥',
      color: '#3B82F6',
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
                    alt="Org logo"
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

        <Tab key="members" title="Members">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-800">
                Team Members
              </h2>
            </CardHeader>
            <CardBody>
              {/* Invitation placeholder */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Invite New Members
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  {organization && (
                    <div id="clerk-invitation" className="w-full">
                      <p className="text-sm text-gray-600 mb-4">
                        Enter email addresses to invite new members:
                      </p>
                      <div className="flex gap-2 mb-4">
                        <Input
                          type="email"
                          placeholder="someone@example.com"
                          className="flex-1"
                        />
                        <Button
                          color="primary"
                          style={{
                            backgroundColor:
                              'var(--primary-color, #2563EB)',
                            color: '#FFFFFF',
                          }}
                        >
                          Send Invitation
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">
                        This is a placeholder for Clerk’s official
                        Invitation UI
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Members table */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Manage Team Members
                </h3>
                {isLoadingMembers ? (
                  <div className="text-center py-6">
                    <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-gray-500">
                      Loading members...
                    </p>
                  </div>
                ) : (
                  <div className="border rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full table-auto">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Member
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {Array.isArray(members) &&
                          members.length > 0 ? (
                            members.map((m) => {
                              const displayRole =
                                CLERK_ROLE_TO_DISPLAY[m.role] ||
                                'member';

                              return (
                                <tr key={m.id}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                      <div className="relative h-10 w-10 flex-shrink-0">
                                        <Image
                                          src={
                                            m.publicUserData
                                              ?.imageUrl ||
                                            '/placeholder-avatar.jpg'
                                          }
                                          alt={
                                            m.publicUserData
                                              ?.firstName || 'User'
                                          }
                                          fill
                                          className="rounded-full object-cover"
                                        />
                                      </div>
                                      <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">
                                          {m.publicUserData
                                            ?.firstName || ''}{' '}
                                          {m.publicUserData
                                            ?.lastName || ''}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                          {m.publicUserData
                                            ?.emailAddresses?.[0]
                                            ?.emailAddress ||
                                            'No email'}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {/* If only owners can change roles, let's disable if not owner */}
                                    {isOwner ? (
                                      <Select
                                        size="sm"
                                        aria-label="Select role"
                                        defaultSelectedKeys={[
                                          displayRole,
                                        ]}
                                        onChange={(e) =>
                                          handleRoleChange(
                                            m.id,
                                            e.target.value
                                          )
                                        }
                                        className="max-w-[140px]"
                                      >
                                        <SelectItem
                                          key="owner"
                                          value="owner"
                                        >
                                          Owner
                                        </SelectItem>
                                        <SelectItem
                                          key="admin"
                                          value="admin"
                                        >
                                          Admin
                                        </SelectItem>
                                        <SelectItem
                                          key="member"
                                          value="member"
                                        >
                                          Member
                                        </SelectItem>
                                        <SelectItem
                                          key="guest"
                                          value="guest"
                                        >
                                          Guest
                                        </SelectItem>
                                      </Select>
                                    ) : (
                                      <div className="text-sm text-gray-900">
                                        {displayRole}
                                      </div>
                                    )}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                      Active
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {/* If only owners can remove, disable or hide this if not owner */}
                                    {isOwner ? (
                                      <Button
                                        size="sm"
                                        color="primary"
                                        style={{
                                          backgroundColor:
                                            'var(--primary-color, #2563EB)',
                                          color: '#FFFFFF',
                                        }}
                                        onClick={() =>
                                          handleRemoveMember(m.id)
                                        }
                                      >
                                        Remove
                                      </Button>
                                    ) : (
                                      <Button
                                        size="sm"
                                        color="default"
                                        disabled
                                      >
                                        Remove
                                      </Button>
                                    )}
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td
                                colSpan="4"
                                className="px-6 py-4 text-center text-gray-500"
                              >
                                No members found in this organization.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
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
              {/* Just a dev note or warning banner */}
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start">
                <div className="text-yellow-500 text-xl mr-3">⚠️</div>
                <div>
                  <h3 className="text-yellow-800 font-medium mb-1">
                    Feature in Development
                  </h3>
                  <p className="text-yellow-700 text-sm">
                    The branding feature is still in development and
                    may not fully apply to all areas of the dashboard.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <p className="mb-6 text-gray-600">
                  Customize how your dashboard looks for all
                  organization members.
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
                      Main brand colour for buttons and key UI
                      elements
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

                  {/* Card BG Color */}
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
                        This is how your dashboard elements will
                        appear.
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
                        primaryColor: '#E79023',
                        secondaryColor: '#a6620c',
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
                    className={`mt-4 p-3 rounded-md ${
                      message.includes('Error')
                        ? 'bg-red-100 text-red-700'
                        : 'bg-green-100 text-green-700'
                    }`}
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
