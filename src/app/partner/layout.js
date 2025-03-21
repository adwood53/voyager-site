// src/app/partner/layout.js - updated
import { ClerkProvider } from '@clerk/nextjs';
import { PartnerProvider } from '@/src/utils/partners';
import './partner-theme.css';
import './partner-layout.css';
import ServiceWorkerRegistration from '@/src/app/components/ServiceWorkerRegistration';

// Define metadata for the partner section
export const metadata = {
  title: 'Voyager Partner Portal',
  description:
    'Manage your immersive technology projects and white-label resources',
  // Use applicationName for PWA
  applicationName: 'Voyager Partner Portal',
  // Link to manifest
  manifest: '/manifest.json',
  // Additional PWA meta tags
  themeColor: '#E79023',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Voyager Partner',
  },
  formatDetection: {
    telephone: false,
  },
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
      <ServiceWorkerRegistration />
      <PartnerProvider>{children}</PartnerProvider>
    </ClerkProvider>
  );
}
