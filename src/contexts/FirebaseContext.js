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
        // Load user data if authenticated
        if (clerkUser) {
          const userData = await getUserByClerkId(clerkUser.id);
          setFirestoreUser(userData);
        } else {
          setFirestoreUser(null);
        }

        // Load organization data if in org context
        if (clerkOrg) {
          const orgData = await getOrganizationByClerkId(clerkOrg.id);
          setFirestoreOrg(orgData);
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
