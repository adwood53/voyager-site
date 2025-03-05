// src/app/partner/layout.js or wherever your partner portal layout is
import { ClerkProvider } from '@clerk/nextjs';
import { FirebaseProvider } from '@/src/contexts/FirebaseContext';

export default function PartnerLayout({ children }) {
  return (
    <ClerkProvider>
      <FirebaseProvider>
        {/* Your layout components */}
        {children}
      </FirebaseProvider>
    </ClerkProvider>
  );
}
