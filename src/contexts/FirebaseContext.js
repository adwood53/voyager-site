'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import { useUser, useOrganization } from '@clerk/nextjs';
import {
  getUserByClerkId,
  getOrganizationByClerkId,
} from '@/src/lib/firestore';

// Create the context
const FirebaseContext = createContext();

// Provider component
export function FirebaseProvider({ children }) {
  const { user: clerkUser, isLoaded: isUserLoaded } = useUser();
  const { organization: clerkOrg, isLoaded: isOrgLoaded } =
    useOrganization();
  const [firestoreUser, setFirestoreUser] = useState(null);
  const [firestoreOrg, setFirestoreOrg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      // Skip loading if user or org data is not fully loaded
      if (!isUserLoaded || (clerkOrg && !isOrgLoaded)) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Load user data if authenticated (with error handling)
        if (clerkUser) {
          try {
            const userData = await getUserByClerkId(clerkUser.id);
            setFirestoreUser(userData);
          } catch (userError) {
            console.warn('Error loading user data:', userError);
            // Create fallback user data from Clerk
            setFirestoreUser({
              id: 'temp-' + clerkUser.id,
              clerkId: clerkUser.id,
              displayName:
                `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() ||
                'User',
              email:
                clerkUser.emailAddresses?.[0]?.emailAddress || '',
              avatar: clerkUser.imageUrl || '',
              type: 'individual',
              isReseller: false,
            });
          }
        } else {
          setFirestoreUser(null);
        }

        // Load organization data if in org context (with error handling)
        if (clerkOrg) {
          try {
            const orgData = await getOrganizationByClerkId(
              clerkOrg.id
            );

            // If we got data, use it
            if (orgData) {
              setFirestoreOrg(orgData);
            }
            // If no data found, create temporary organization data
            else {
              console.log(
                'No organization found in Firestore, creating temporary data'
              );
              setFirestoreOrg({
                id: 'temp-' + clerkOrg.id,
                clerkOrgId: clerkOrg.id,
                name: clerkOrg.name || 'Your Organization',
                slug: clerkOrg.slug || '',
                logo: clerkOrg.imageUrl || '',
                primaryColor: '#E79023',
                secondaryColor: '#a6620c',
                textColor: '#333333',
                bgColor: '#FFFFFF',
                cardBgColor: '#F8F9FA',
                borderColor: '#E2E8F0',
                members: [],
              });
            }
          } catch (orgError) {
            console.error(
              'Error loading organization data:',
              orgError
            );
            // Set the overall error state
            setError(
              orgError.message || 'Failed to load organization data'
            );

            // Create fallback organization data
            setFirestoreOrg({
              id: 'temp-' + clerkOrg.id,
              clerkOrgId: clerkOrg.id,
              name: clerkOrg.name || 'Your Organization',
              slug: clerkOrg.slug || '',
              logo: clerkOrg.imageUrl || '',
              primaryColor: '#E79023',
              secondaryColor: '#a6620c',
              textColor: '#333333',
              bgColor: '#FFFFFF',
              cardBgColor: '#F8F9FA',
              borderColor: '#E2E8F0',
              members: [],
            });
          }
        } else {
          setFirestoreOrg(null);
        }
      } catch (generalError) {
        console.error(
          'General error loading Firestore data:',
          generalError
        );
        setError(generalError.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [clerkUser, clerkOrg, isUserLoaded, isOrgLoaded]);

  // Provide the context value
  const contextValue = {
    user: firestoreUser,
    organization: firestoreOrg,
    loading,
    error,
    reload: () => {
      setLoading(true);
      // Force error state to null to trigger a new load
      setError(null);
      // The useEffect will handle the actual data loading
    },
  };

  return (
    <FirebaseContext.Provider value={contextValue}>
      {children}
    </FirebaseContext.Provider>
  );
}

// Custom hook to use the Firebase context
export function useFirebase() {
  const context = useContext(FirebaseContext);

  if (context === undefined) {
    throw new Error(
      'useFirebase must be used within a FirebaseProvider'
    );
  }

  return context;
}
