// src/lib/firestore.js
import { db } from './firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  serverTimestamp,
  Timestamp,
  deleteDoc,
} from 'firebase/firestore';
import { logEvent } from 'firebase/analytics';
import { analytics } from './firebase';

// ===== ORGANIZATION FUNCTIONS =====

// Get organization by Clerk ID
export async function getOrganizationByClerkId(clerkOrgId) {
  try {
    if (!clerkOrgId) return null;

    const q = query(
      collection(db, 'organizations'),
      where('clerkOrgId', '==', clerkOrgId)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log(
        `No organization found with Clerk ID: ${clerkOrgId}`
      );
      return null;
    }

    const orgDoc = querySnapshot.docs[0];

    // Log analytics event if available
    if (analytics) {
      logEvent(analytics, 'organization_loaded', {
        organization_id: orgDoc.id,
        clerk_org_id: clerkOrgId,
      });
    }

    return {
      id: orgDoc.id,
      ...orgDoc.data(),
    };
  } catch (error) {
    console.error('Error fetching organization by Clerk ID:', error);
    throw error;
  }
}

// Create organization
export async function createOrganization(orgData) {
  try {
    if (!orgData.clerkOrgId) {
      throw new Error('Clerk organization ID is required');
    }

    // Check if organization already exists (prevents duplication)
    const existingOrg = await getOrganizationByClerkId(
      orgData.clerkOrgId
    );

    if (existingOrg) {
      // Organization already exists, update it instead
      return await updateOrganization(existingOrg.id, orgData);
    }

    // Create new organization
    const orgRef = doc(collection(db, 'organizations'));

    // Set defaults for critical values if not provided
    const finalOrgData = {
      ...orgData,
      // Default brand colors if not specified
      primaryColor: orgData.primaryColor || '#E79023',
      secondaryColor: orgData.secondaryColor || '#a6620c',
      textColor: orgData.textColor || '#333333',
      bgColor: orgData.bgColor || '#FFFFFF',
      cardBgColor: orgData.cardBgColor || '#F8F9FA',
      borderColor: orgData.borderColor || '#E2E8F0',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      // Add this field for admin tracking
      adminIds: [],
    };

    await setDoc(orgRef, finalOrgData);
    console.log(`Organization created: ${orgRef.id}`);

    // Log analytics event if available
    if (analytics) {
      logEvent(analytics, 'organization_created', {
        organization_id: orgRef.id,
        clerk_org_id: orgData.clerkOrgId,
      });
    }

    return {
      id: orgRef.id,
      ...finalOrgData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error creating organization:', error);
    throw error;
  }
}

// Update organization
export async function updateOrganization(orgId, orgData) {
  try {
    if (!orgId) {
      throw new Error('Organization ID is required for update');
    }

    // Get the organization reference
    const orgRef = doc(db, 'organizations', orgId);

    // Check if the organization exists
    const orgDoc = await getDoc(orgRef);

    if (!orgDoc.exists()) {
      throw new Error(`Organization with ID ${orgId} does not exist`);
    }

    // Preserve existing data that's not being updated
    const currentData = orgDoc.data();

    // Update timestamp
    const updateData = {
      ...orgData,
      updatedAt: serverTimestamp(),
    };

    // Update existing organization
    await updateDoc(orgRef, updateData);

    console.log(`Organization updated: ${orgId}`);

    // Log analytics event if available
    if (analytics) {
      logEvent(analytics, 'organization_updated', {
        organization_id: orgId,
        clerk_org_id: orgData.clerkOrgId || currentData.clerkOrgId,
      });
    }

    // Return the updated object with the id
    return {
      id: orgId,
      ...currentData,
      ...orgData,
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error updating organization:', error);
    throw error;
  }
}

// Delete organization
export async function deleteOrganization(orgId) {
  try {
    if (!orgId) {
      throw new Error('Organization ID is required for deletion');
    }

    // Get organization data before deletion for analytics
    const orgRef = doc(db, 'organizations', orgId);
    const orgDoc = await getDoc(orgRef);

    if (!orgDoc.exists()) {
      throw new Error(`Organization with ID ${orgId} does not exist`);
    }

    const orgData = orgDoc.data();

    await deleteDoc(orgRef);
    console.log(`Organization deleted: ${orgId}`);

    // Log analytics event if available
    if (analytics) {
      logEvent(analytics, 'organization_deleted', {
        organization_id: orgId,
        clerk_org_id: orgData.clerkOrgId,
      });
    }

    return true;
  } catch (error) {
    console.error('Error deleting organization:', error);
    throw error;
  }
}

// ===== USER FUNCTIONS =====

// Get user by Clerk ID
export async function getUserByClerkId(clerkUserId) {
  try {
    if (!clerkUserId) return null;

    const q = query(
      collection(db, 'users'),
      where('clerkId', '==', clerkUserId)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log(`No user found with Clerk ID: ${clerkUserId}`);
      return null;
    }

    const userDoc = querySnapshot.docs[0];
    return {
      id: userDoc.id,
      ...userDoc.data(),
    };
  } catch (error) {
    console.error('Error fetching user by Clerk ID:', error);
    throw error;
  }
}

// Create or update user
export async function createOrUpdateUser(userData) {
  try {
    if (!userData.clerkId) {
      throw new Error(
        'Clerk ID is required for user creation/update'
      );
    }

    // Check if user exists
    const existingUser = await getUserByClerkId(userData.clerkId);

    if (existingUser) {
      // Update existing user
      const userRef = doc(db, 'users', existingUser.id);

      // Add updated timestamp
      const updateData = {
        ...userData,
        updatedAt: serverTimestamp(),
      };

      await updateDoc(userRef, updateData);
      console.log(`User updated: ${existingUser.id}`);

      // Log analytics event if available
      if (analytics) {
        logEvent(analytics, 'user_updated', {
          user_id: existingUser.id,
          clerk_user_id: userData.clerkId,
        });
      }

      // Return the updated user
      return {
        id: existingUser.id,
        ...existingUser,
        ...userData,
        updatedAt: new Date().toISOString(),
      };
    } else {
      // Create new user
      const userRef = doc(collection(db, 'users'));

      // Add timestamps
      const newUserData = {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        organizationIds: userData.organizationIds || {},
      };

      await setDoc(userRef, newUserData);
      console.log(`User created: ${userRef.id}`);

      // Log analytics event if available
      if (analytics) {
        logEvent(analytics, 'user_created', {
          user_id: userRef.id,
          clerk_user_id: userData.clerkId,
        });
      }

      // Return the new user
      return {
        id: userRef.id,
        ...newUserData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
  } catch (error) {
    console.error('Error creating/updating user:', error);
    throw error;
  }
}

// Get users by organization
export async function getUsersByOrganization(orgId) {
  try {
    if (!orgId) return [];

    const q = query(
      collection(db, 'users'),
      where('organizationIds.' + orgId, '==', true)
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching users by organization:', error);
    throw error;
  }
}

// ===== UTILITY FUNCTIONS =====

// Test Firestore connection
export async function testFirestoreConnection() {
  try {
    const testCollection = collection(db, 'test');
    const testDoc = doc(testCollection, 'test-connection');
    await setDoc(testDoc, {
      timestamp: serverTimestamp(),
      message: 'Firestore connection successful',
      testDate: new Date().toISOString(),
    });

    // Read back to verify
    const docSnap = await getDoc(testDoc);
    if (docSnap.exists()) {
      console.log('Firestore connection test successful');

      // Log analytics event if available
      if (analytics) {
        logEvent(analytics, 'test_connection_successful');
      }

      return true;
    } else {
      throw new Error(
        'Test document was written but could not be read back'
      );
    }
  } catch (error) {
    console.error('Firestore connection test failed:', error);

    // Log analytics event if available
    if (analytics) {
      logEvent(analytics, 'test_connection_failed', {
        error: error.message,
      });
    }

    throw error;
  }
}

// Convert Firestore timestamp to Date object
export function timestampToDate(timestamp) {
  if (!timestamp) return null;

  if (timestamp instanceof Timestamp) {
    return timestamp.toDate();
  }

  return new Date(timestamp);
}

// Convert Date to ISO string for consistent formatting
export function formatDate(date) {
  if (!date) return '';

  const d = date instanceof Date ? date : new Date(date);
  return d.toISOString();
}

export { db };
