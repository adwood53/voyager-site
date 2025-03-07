// src/app/components/dashboard/ClerkOrganizationMemberManager.js
'use client';

import { useEffect } from 'react';
import { useOrganization } from '@clerk/nextjs';

/**
 * This component initializes the Clerk Organization Members UI
 * It should be included in the Members tab of the AdminDashboard
 */
export default function ClerkOrganizationMemberManager() {
  const { organization, isLoaded } = useOrganization();

  useEffect(() => {
    // Make sure Clerk JS is loaded
    if (
      typeof window !== 'undefined' &&
      window.Clerk &&
      organization &&
      isLoaded
    ) {
      const mountClerkComponents = async () => {
        try {
          // Get the DOM element where we want to mount the Clerk component
          const invitationContainerElement = document.getElementById(
            'clerk-invitation'
          );

          if (invitationContainerElement) {
            // Mount the Clerk Organization Invitation Component
            const invitationComponent =
              await window.Clerk.mountOrganizationInvitation({
                organizationId: organization.id,
                rootElement: invitationContainerElement,
              });

            console.log(
              'Clerk Organization Invitation mounted successfully'
            );

            // Cleanup function
            return () => {
              if (
                invitationComponent &&
                typeof invitationComponent.unmount === 'function'
              ) {
                invitationComponent.unmount();
              }
            };
          }
        } catch (error) {
          console.error('Error mounting Clerk components:', error);
        }
      };

      // Wait for Clerk to be ready
      if (window.Clerk.loaded) {
        mountClerkComponents();
      } else {
        window.Clerk.addListener((clerk) => {
          if (clerk.loaded) {
            mountClerkComponents();
          }
        });
      }
    }
  }, [organization, isLoaded]);

  // This component doesn't render anything itself
  return null;
}
