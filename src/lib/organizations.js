// src/lib/organizations.js
import { db } from '@/src/lib/firebase';
import {
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

export async function getOrgDetails() {
  try {
    // Get the hostname from the request
    const hostname = window.location.hostname;

    // Parse the subdomain (e.g., everythingbranded from everythingbranded.voyagervrlab.co.uk)
    const subdomain = hostname.split('.')[0];

    if (
      subdomain === 'localhost' ||
      subdomain === 'voyagervrlab' ||
      !subdomain
    ) {
      // Default Voyager branding if no specific org
      return null;
    }

    // Query Firebase for the organization based on subdomain
    const orgsRef = collection(db, 'organizations');
    const q = query(orgsRef, where('subdomain', '==', subdomain));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error(
        `No organization found for subdomain: ${subdomain}`
      );
      return null;
    }

    // Return the first matching organization
    const orgDoc = querySnapshot.docs[0];
    return {
      id: orgDoc.id,
      ...orgDoc.data(),
    };
  } catch (error) {
    console.error('Error fetching organization details:', error);
    return null;
  }
}
