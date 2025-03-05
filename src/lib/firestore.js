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
