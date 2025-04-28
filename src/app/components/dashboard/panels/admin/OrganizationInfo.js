// src/app/components/dashboard/panels/admin/OrganizationInfo.js
'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader, Input } from '@heroui/react';
import { useFirebase } from '@/src/contexts/FirebaseContext';
import { useOrganization, OrganizationSwitcher } from '@clerk/nextjs';
import Image from 'next/image';

/**
 * OrganizationInfo component - Displays organization details
 * @param {Object} props
 * @param {Object} props.organization - The Clerk organization object
 */
export default function OrganizationInfo({ organization }) {
  const { organization: firestoreOrg } = useFirebase();
  const { isLoaded } = useOrganization();

  return (
    <Card className="mb-6">
      <CardHeader className="flex justify-between items-center">
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
              alt="Organization logo"
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
              {firestoreOrg?.id || organization?.id || 'Loading...'}
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
              value={firestoreOrg?.name || organization?.name || ''}
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
              value={firestoreOrg?.slug || organization?.slug || ''}
              readOnly
              className="w-full bg-gray-100 text-gray-700"
            />
            <p className="text-xs text-gray-500 mt-1">
              Managed through Clerk
            </p>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Creation Date
          </label>
          <Input
            type="text"
            value={
              organization?.createdAt
                ? new Date(organization.createdAt).toLocaleDateString(
                    'en-GB'
                  )
                : 'Not available'
            }
            readOnly
            className="w-full bg-gray-100 text-gray-700"
          />
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Organisation Management
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            Update your organisation profile, logo, and manage
            settings using the organisation manager below.
          </p>
          <div className="mt-4 border border-gray-200 rounded-md p-4 bg-white">
            <OrganizationSwitcher
              hidePersonal={true}
              organizationProfileMode="modal"
              afterSelectOrganizationUrl="/partner"
              afterLeaveOrganizationUrl="/partner"
              afterCreateOrganizationUrl="/partner"
              appearance={{
                elements: {
                  rootBox: 'w-full',
                  organizationSwitcherTrigger:
                    'w-full flex justify-between items-center p-3 bg-white border border-gray-300 rounded-md text-left',
                  organizationPreviewTextContainer: 'text-gray-800',
                  organizationSwitcherPopoverCard:
                    'bg-white border border-gray-200 shadow-lg',
                  organizationSwitcherPopoverActionButton:
                    'hover:bg-gray-100',
                },
              }}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
