'use client';
// src/app/components/dashboard/panels/admin/OrganizationInfo.js

import { useEffect } from 'react';
import { Card, CardBody, CardHeader, Input } from '@heroui/react';
import { useFirebase } from '@/src/contexts/FirebaseContext';
import Image from 'next/image';

/**
 * OrganizationInfo component - Displays organization details
 * @param {Object} props
 * @param {Object} props.organization - The Clerk organization object
 */
export default function OrganizationInfo({ organization }) {
  const { organization: firestoreOrg } = useFirebase();

  return (
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
                ? new Date(
                    organization.createdAt
                  ).toLocaleDateString()
                : 'Not available'
            }
            readOnly
            className="w-full bg-gray-100 text-gray-700"
          />
        </div>
      </CardBody>
    </Card>
  );
}
