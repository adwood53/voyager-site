import { ClerkProvider } from '@clerk/nextjs';
import { FirebaseProvider } from '@/src/contexts/FirebaseContext';
import DashboardShell from '@/src/app/components/dashboard/DashboardShell';
import MobileWarning from '@/src/app/components/dashboard/MobileWarning';
import ChatbotComponent from '@/src/app/components/ChatbotComponent';

export default function PartnerDashboard() {
  return (
    <ClerkProvider>
      <FirebaseProvider>
        <ChatbotComponent />
        <MobileWarning />
        <DashboardShell />
      </FirebaseProvider>
    </ClerkProvider>
  );
}
