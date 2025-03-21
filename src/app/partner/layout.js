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
  applicationName: 'Voyager Partner Portal',
  manifest: '/manifest.json',
  themeColor: '#E79023',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Voyager Partner',
    startupImage: [
      '/apple-splash/apple-splash-2048-2732.png', // You'll need these splash screen images
    ],
  },
  formatDetection: {
    telephone: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: 'no',
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
