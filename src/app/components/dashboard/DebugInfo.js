// src/app/components/dashboard/DebugInfo.js
'use client';

import { useState } from 'react';
import { useUser, useOrganization } from '@clerk/nextjs';
import {
  Card,
  CardBody,
  CardHeader,
  Switch,
  Button,
} from '@heroui/react';
import { useFirebase } from '@/src/contexts/FirebaseContext';

/**
 * Debug information component for admin troubleshooting
 * Only visible to admins and when debug mode is enabled
 */
export default function DebugInfo() {
  const [showDebug, setShowDebug] = useState(false);
  const { user, isLoaded: userLoaded } = useUser();
  const {
    organization,
    membership,
    isLoaded: orgLoaded,
  } = useOrganization();
  const { organization: firestoreOrg } = useFirebase();

  // Only admins can see this component
  const isAdmin =
    membership?.role === 'org:admin' ||
    membership?.role === 'org:owner' ||
    membership?.role === 'admin' ||
    membership?.role === 'owner';

  if (!isAdmin) return null;

  return (
    <Card className="mb-6 border border-amber-200">
      <CardHeader className="bg-amber-50 flex justify-between items-center">
        <h2 className="text-amber-800 text-base font-medium">
          Admin Debugging Tools
        </h2>
        <Switch
          size="sm"
          checked={showDebug}
          onChange={() => setShowDebug(!showDebug)}
          color="warning"
        />
      </CardHeader>

      {showDebug && (
        <CardBody className="bg-amber-50/50 text-amber-900 text-sm">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">User Information</h3>
              <pre className="bg-white/80 p-2 rounded-md overflow-x-auto">
                {JSON.stringify(
                  {
                    id: user?.id,
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                    primaryEmail:
                      user?.primaryEmailAddress?.emailAddress,
                  },
                  null,
                  2
                )}
              </pre>
            </div>

            <div>
              <h3 className="font-medium mb-2">
                Organization Information
              </h3>
              <pre className="bg-white/80 p-2 rounded-md overflow-x-auto">
                {JSON.stringify(
                  {
                    clerkOrgId: organization?.id,
                    name: organization?.name,
                    slug: organization?.slug,
                    role: membership?.role,
                  },
                  null,
                  2
                )}
              </pre>
            </div>

            <div>
              <h3 className="font-medium mb-2">
                Firestore Organization
              </h3>
              <pre className="bg-white/80 p-2 rounded-md overflow-x-auto">
                {JSON.stringify(
                  {
                    id: firestoreOrg?.id,
                    clerkOrgId: firestoreOrg?.clerkOrgId,
                    name: firestoreOrg?.name,
                    isTemp: firestoreOrg?.isTemp || false,
                    branding: {
                      primaryColor: firestoreOrg?.primaryColor,
                      secondaryColor: firestoreOrg?.secondaryColor,
                    },
                  },
                  null,
                  2
                )}
              </pre>
            </div>

            <div className="flex justify-end">
              <Button
                size="sm"
                color="warning"
                onClick={() =>
                  console.log({
                    user,
                    organization,
                    membership,
                    firestoreOrg,
                  })
                }
              >
                Log Full Data to Console
              </Button>
            </div>
          </div>
        </CardBody>
      )}
    </Card>
  );
}
