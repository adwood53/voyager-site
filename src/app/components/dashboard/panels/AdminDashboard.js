'use client';
// src/app/components/dashboard/panels/AdminDashboard.js

import { useState, useEffect } from 'react';
import { Card, CardBody, Tabs, Tab } from '@heroui/react';
import { useOrganization, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

// Import panel components
import OrganizationInfo from './admin/OrganizationInfo';
import MemberManagement from './admin/MemberManagement';
import BrandingSettings from './admin/BrandingSettings';

/**
 * AdminDashboard - Main container component for the admin dashboard
 * Handles routing, access control, and tab switching
 */
export default function AdminDashboard() {
  const router = useRouter();
  const { user } = useUser();
  const { organization, membership, isLoaded } = useOrganization();

  // Check if user is admin or owner
  const isAdmin =
    membership?.role === 'org:admin' ||
    membership?.role === 'admin' ||
    membership?.role === 'org:owner' ||
    membership?.role === 'owner';

  // Redirect if not admin
  useEffect(() => {
    if (isLoaded && membership && !isAdmin) {
      console.warn(
        'Non-admin user in AdminDashboard; redirecting...'
      );
      router.push('/partner');
    }
  }, [isAdmin, membership, isLoaded, router]);

  // Show loading state while checking permissions
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  // Show access denied if not admin
  if (membership && !isAdmin) {
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
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your organisation settings and members
        </p>
      </div>

      {/* Stats Cards can go here later */}

      <Tabs
        variant="underlined"
        classNames={{
          tab: 'data-[selected=true]:text-primary-color data-[selected=true]:border-primary-color text-gray-600',
          tabList: 'border-b border-gray-200',
        }}
      >
        <Tab key="organisation" title="Organisation">
          <OrganizationInfo organization={organization} />
        </Tab>

        <Tab key="members" title="Members">
          <MemberManagement
            organization={organization}
            currentUser={user}
            membership={membership}
          />
        </Tab>

        <Tab key="branding" title="Branding">
          <BrandingSettings organization={organization} />
        </Tab>
      </Tabs>
    </div>
  );
}
