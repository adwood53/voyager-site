'use client';

import { useState, useEffect } from 'react';
import {
  getUserByClerkId,
  getOrganizationByClerkId,
} from '@/src/lib/firestore';

export function useFirebaseData(
  clerkUser,
  clerkOrg,
  isUserLoaded,
  isOrgLoaded
) {
  const [firestoreUser, setFirestoreUser] = useState(null);
  const [firestoreOrg, setFirestoreOrg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      // Skip loading if user or org data is not fully loaded
      if (!isUserLoaded || (clerkOrg && !isOrgLoaded)) {
        return;
      }

      setLoading(true);

      try {
        // Load user data if authenticated
        if (clerkUser) {
          const userData = await getUserByClerkId(clerkUser.id);
          setFirestoreUser(userData);
        } else {
          setFirestoreUser(null);
        }

        // Load organization data if in org context
        if (clerkOrg) {
          // Try to get organization by Clerk ID
          let orgData = await getOrganizationByClerkId(clerkOrg.id);

          // If organization doesn't exist yet, log the situation
          if (!orgData && clerkOrg) {
            console.log(
              'Organization not found in Firestore, creating new record...'
            );

            try {
              // Prepare organization data (without auto-creating)
              const newOrgData = {
                clerkOrgId: clerkOrg.id,
                name: clerkOrg.name,
                slug: clerkOrg.slug || '',
                subdomain: clerkOrg.slug || '',
                logo: clerkOrg.imageUrl || '',
                primaryColor: '#E79023', // Default Voyager primary
                secondaryColor: '#a6620c', // Default Voyager accent
                members: [],
                createdAt: new Date().toISOString(),
              };

              // Note: Actual creation would be handled by webhook
              console.log('Potential new org data:', newOrgData);
            } catch (createError) {
              console.error(
                'Error preparing organization data:',
                createError
              );
            }
          }

          setFirestoreOrg(orgData);
        } else {
          setFirestoreOrg(null);
        }
      } catch (error) {
        console.error('Error loading Firestore data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [clerkUser, clerkOrg, isUserLoaded, isOrgLoaded]);

  return {
    user: firestoreUser,
    organization: firestoreOrg,
    loading,
  };
}
