// src/app/partner/layout.js
import { ClerkProvider } from '@clerk/nextjs';

// Define metadata for the partner section
export const metadata = {
  title: 'Voyager Partner Portal',
  description:
    'Manage your immersive technology projects and white-label resources',
};

export default function PartnerLayout({ children }) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
