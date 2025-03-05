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
        // Try to get organization by Clerk ID
        let orgData = await getOrganizationByClerkId(clerkOrg.id);

        // If organization doesn't exist yet, check if we need to create it
        if (!orgData && clerkOrg) {
          console.log(
            'Organization not found in Firestore, creating new record...'
          );

          try {
            // Extract organization details from Clerk
            const newOrgData = {
              clerkOrgId: clerkOrg.id,
              name: clerkOrg.name,
              slug: clerkOrg.slug || '',
              subdomain: clerkOrg.slug || '',
              logo: clerkOrg.imageUrl || '',
              primaryColor: '#E79023', // Default Voyager primary
              secondaryColor: '#a6620c', // Default Voyager accent
              members: [],
              createdAt: new Date().toISOString(),
            };

            // Use the firestore function to create the organization
            // This is commented out as we don't want to auto-create orgs in context
            // This would be handled by the webhook instead
            // const createdOrg = await createOrganization(newOrgData);
            // orgData = createdOrg;
          } catch (createError) {
            console.error(
              'Error creating organization in Firestore:',
              createError
            );
          }
        }

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
