// src/contexts/FirebaseContext.js
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
  createOrUpdateUser,
  createOrganization,
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
      // Skip loading if Clerk isn't ready yet
      if (!isUserLoaded || (clerkOrg && !isOrgLoaded)) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Load user data if authenticated
        if (clerkUser) {
          try {
            let userData = await getUserByClerkId(clerkUser.id);

            // If user doesn't exist yet in Firestore, create them
            if (!userData) {
              console.log('Creating new user in Firestore...');
              const primaryEmail =
                clerkUser.emailAddresses.length > 0
                  ? clerkUser.emailAddresses[0].emailAddress
                  : '';

              await createOrUpdateUser({
                clerkId: clerkUser.id,
                displayName:
                  `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() ||
                  'User',
                email: primaryEmail,
                avatar: clerkUser.imageUrl || '',
                type: 'individual',
                isReseller: false,
              });

              // Fetch the newly created user
              userData = await getUserByClerkId(clerkUser.id);
            }

            setFirestoreUser(userData);
          } catch (userError) {
            console.error('Error fetching/creating user:', userError);
            // Don't fail completely, still try to load org
          }
        } else {
          setFirestoreUser(null);
        }

        // Load organization data if in org context
        if (clerkOrg) {
          try {
            let orgData = await getOrganizationByClerkId(clerkOrg.id);

            // If organization doesn't exist yet in Firestore, create temporary data
            if (!orgData) {
              console.log(
                'No organization found in Firestore, creating temporary data'
              );

              // Create temporary org data for UI (not saved to Firestore yet)
              const tempOrgData = {
                id: 'temp-' + clerkOrg.id,
                clerkOrgId: clerkOrg.id,
                name: clerkOrg.name,
                slug: clerkOrg.slug || '',
                logo: clerkOrg.imageUrl || '',
                primaryColor: '#E79023', // Default Voyager primary
                secondaryColor: '#a6620c', // Default Voyager accent
                textColor: '#333333',
                bgColor: '#FFFFFF',
                cardBgColor: '#F8F9FA',
                borderColor: '#E2E8F0',
                isTemp: true, // Flag to indicate this is temporary
              };

              // Try to create the organization in Firestore
              try {
                await createOrganization({
                  clerkOrgId: clerkOrg.id,
                  name: clerkOrg.name,
                  slug: clerkOrg.slug || '',
                  logo: clerkOrg.imageUrl || '',
                  primaryColor: '#E79023',
                  secondaryColor: '#a6620c',
                  textColor: '#333333',
                  bgColor: '#FFFFFF',
                  cardBgColor: '#F8F9FA',
                  borderColor: '#E2E8F0',
                });

                // Fetch the newly created org
                orgData = await getOrganizationByClerkId(clerkOrg.id);
              } catch (createError) {
                console.error(
                  'Error creating organization:',
                  createError
                );
                // Use the temporary data if creation fails
                orgData = tempOrgData;
              }
            }

            setFirestoreOrg(orgData);
          } catch (orgError) {
            console.error('Error fetching organization:', orgError);
            // Set a default temporary organization
            setFirestoreOrg({
              id: 'temp-org',
              name: clerkOrg?.name || 'Your Organization',
              logo: clerkOrg?.imageUrl || '/Voyager-Box-Logo.png',
              primaryColor: '#E79023',
              secondaryColor: '#a6620c',
              isTemp: true,
            });
          }
        } else {
          setFirestoreOrg(null);
        }
      } catch (err) {
        console.error('Error loading Firestore data:', err);
        setError(err.message || 'Failed to load data');
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
      // Function to manually reload data
      setLoading(true);
      // Set a small delay to ensure the state updates properly
      setTimeout(() => {
        // The useEffect will handle the actual data loading
      }, 10);
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
