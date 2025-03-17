// src/app/partner/layout.js - updated
import { ClerkProvider } from '@clerk/nextjs';
import { PartnerProvider } from '@/src/utils/partners';

// Define metadata for the partner section
export const metadata = {
  title: 'Voyager Partner Portal',
  description:
    'Manage your immersive technology projects and white-label resources',
};

export default function PartnerLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          unsafe_disableDevelopmentModeWarnings: true,
        },
      }}
      // Added redirects configuration
      redirectUrls={{
        signIn: '/partner',
        signUp: '/partner',
        afterSignIn: '/partner',
        afterSignUp: '/partner',
        createOrganization: '/partner',
        afterCreateOrganization: '/partner',
      }}
    >
      <PartnerProvider>{children}</PartnerProvider>
    </ClerkProvider>
  );
}
