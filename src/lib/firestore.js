import { db } from './firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
} from 'firebase/firestore';

/*** ORGANIZATION FUNCTIONS ***/

// Create a new organization
export async function createOrganization(orgData) {
  try {
    const docRef = await addDoc(collection(db, 'organizations'), {
      ...orgData,
      createdAt: serverTimestamp(),
      status: 'active',
    });

    return {
      id: docRef.id,
      ...orgData,
    };
  } catch (error) {
    console.error('Error creating organization:', error);
    throw error;
  }
}

// Get organization by Firestore ID
export async function getOrganization(orgId) {
  try {
    const docRef = doc(db, 'organizations', orgId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching organization:', error);
    throw error;
  }
}

// Get organization by subdomain
export async function getOrganizationBySubdomain(subdomain) {
  try {
    const q = query(
      collection(db, 'organizations'),
      where('subdomain', '==', subdomain)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    };
  } catch (error) {
    console.error('Error fetching organization by subdomain:', error);
    throw error;
  }
}

// Get organization by Clerk ID
export async function getOrganizationByClerkId(clerkOrgId) {
  try {
    const q = query(
      collection(db, 'organizations'),
      where('clerkOrgId', '==', clerkOrgId)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    };
  } catch (error) {
    console.error('Error fetching organization by Clerk ID:', error);
    throw error;
  }
}

// Update organization
export async function updateOrganization(orgId, orgData) {
  try {
    const orgRef = doc(db, 'organizations', orgId);
    await updateDoc(orgRef, orgData);
    return true;
  } catch (error) {
    console.error('Error updating organization:', error);
    throw error;
  }
}

// Delete organization
export async function deleteOrganization(orgId) {
  try {
    await deleteDoc(doc(db, 'organizations', orgId));
    return true;
  } catch (error) {
    console.error('Error deleting organization:', error);
    throw error;
  }
}

/*** USER FUNCTIONS ***/

// Create or update user
export async function createOrUpdateUser(userData) {
  try {
    // Check if user already exists
    const q = query(
      collection(db, 'users'),
      where('clerkId', '==', userData.clerkId)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // Create new user
      const docRef = await addDoc(collection(db, 'users'), {
        ...userData,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
      });

      return {
        id: docRef.id,
        ...userData,
      };
    } else {
      // Update existing user
      const userDoc = querySnapshot.docs[0];
      await updateDoc(userDoc.ref, {
        ...userData,
        lastLoginAt: serverTimestamp(),
      });

      return {
        id: userDoc.id,
        ...userData,
      };
    }
  } catch (error) {
    console.error('Error creating/updating user:', error);
    throw error;
  }
}

// Get user by Clerk ID
export async function getUserByClerkId(clerkId) {
  try {
    const q = query(
      collection(db, 'users'),
      where('clerkId', '==', clerkId)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    };
  } catch (error) {
    console.error('Error fetching user by Clerk ID:', error);
    throw error;
  }
}

// Get all users in an organization
export async function getUsersByOrganization(orgId) {
  try {
    const q = query(
      collection(db, 'users'),
      where('organizationIds', 'array-contains', orgId)
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

/*** PROJECT FUNCTIONS ***/

// Create a new project
export async function createProject(projectData) {
  try {
    const docRef = await addDoc(collection(db, 'projects'), {
      ...projectData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: 'draft',
    });

    return {
      id: docRef.id,
      ...projectData,
    };
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

// Get projects by owner (organization or user)
export async function getProjectsByOwner(ownerId, ownerType) {
  try {
    const q = query(
      collection(db, 'projects'),
      where('ownerId', '==', ownerId),
      where('ownerType', '==', ownerType)
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching projects by owner:', error);
    throw error;
  }
}
