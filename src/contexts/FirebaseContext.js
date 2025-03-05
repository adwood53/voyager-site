'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import { useUser, useOrganization } from '@clerk/nextjs';
import {
  getUserByClerkId,
  getOrganizationByClerkId,
} from '@/lib/firestore';

// Create context
const FirebaseContext = createContext(null);

// Provider component
export function FirebaseProvider({ children }) {
  const { user: clerkUser, isLoaded: isUserLoaded } = useUser();
  const { organization: clerkOrg, isLoaded: isOrgLoaded } =
    useOrganization();

  const [firestoreUser, setFirestoreUser] = useState(null);
  const [firestoreOrg, setFirestoreOrg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
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
          const orgData = await getOrganizationByClerkId(clerkOrg.id);
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

  return (
    <FirebaseContext.Provider
      value={{
        user: firestoreUser,
        organization: firestoreOrg,
        loading,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

// Custom hook to use the context
export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error(
      'useFirebase must be used within a FirebaseProvider'
    );
  }
  return context;
}
