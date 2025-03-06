// src/lib/firestore.js

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';

// Initialize Firebase if not already initialized
const app =
  getApps().length === 0
    ? initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      })
    : getApps()[0];

const db = getFirestore(app);

// Get organization by subdomain
export async function getOrganizationBySubdomain(subdomain) {
  try {
    // Normalize subdomain to lowercase and trim
    const normalizedSubdomain = subdomain.toLowerCase().trim();

    const q = query(
      collection(db, 'organizations'),
      where('subdomain', '==', normalizedSubdomain)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log(
        `No organization found with subdomain: ${normalizedSubdomain}`
      );
      return null;
    }

    const doc = querySnapshot.docs[0];
    console.log(
      `Found organization with subdomain ${normalizedSubdomain}: ${doc.id}`
    );
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

// Create or update user
export async function createOrUpdateUser(userData) {
  // Implementation for creating or updating a user
  // This is a placeholder - you would need to implement this based on your requirements
  console.log('Creating/updating user:', userData);
  return true;
}

// Create organization
export async function createOrganization(orgData) {
  // Implementation for creating an organization
  // This is a placeholder - you would need to implement this based on your requirements
  console.log('Creating organization:', orgData);
  return true;
}

// Update organization
export async function updateOrganization(orgId, orgData) {
  // Implementation for updating an organization
  // This is a placeholder - you would need to implement this based on your requirements
  console.log(`Updating organization ${orgId}:`, orgData);
  return true;
}

export { db };
