// src/app/partner/layout.js - updated
import { ClerkProvider } from '@clerk/nextjs';
import { FirebaseProvider } from '@/src/contexts/FirebaseContext';
import { Quicksand } from 'next/font/google';
import localFont from 'next/font/local';
import ThemeManager from '@/src/app/components/ThemeManager';

// Define fonts (same as root layout)
const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const labora = localFont({
  src: [
    {
      path: '../../../public/fonts/Labora-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Labora-Italic.otf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-heading',
  display: 'swap',
});

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
          <div
            className={`${quicksand.variable} ${labora.variable} partner-dashboard`}
          >
            {children}
          </div>
        </ThemeManager>
      </FirebaseProvider>
    </ClerkProvider>
  );
}
