// src/app/partner/layout.js
import { ClerkProvider } from '@clerk/nextjs';
import { FirebaseProvider } from '@/src/contexts/FirebaseContext';
import ThemeManager from '@/src/app/components/ThemeManager';
import './partner-layout.css';

export const metadata = {
  title: 'Voyager Partner Portal',
  description:
    'Manage your immersive technology projects and white-label resources',
};

export default function PartnerLayout({ children }) {
  return (
    <ClerkProvider>
      <FirebaseProvider>
        <ThemeManager>
          <div className="partner-dashboard">{children}</div>
        </ThemeManager>
      </FirebaseProvider>
    </ClerkProvider>
  );
}
