import React, { createContext, useContext } from 'react';
import { useUser, useOrganization } from '@clerk/nextjs';
import { useFirebaseData } from './useFirebaseData';

// Create the context
const FirebaseContext = createContext();

// Provider component
export function FirebaseProvider({ children }) {
  const { user: clerkUser } = useUser();
  const { organization: clerkOrg } = useOrganization();

  // Use the custom hook to load Firebase data
  const { user, organization, loading } = useFirebaseData(
    clerkUser,
    clerkOrg,
    clerkUser !== undefined,
    clerkOrg !== undefined
  );

  // Provide the context value
  const contextValue = {
    user,
    organization,
    loading,
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
