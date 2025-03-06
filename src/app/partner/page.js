import { ClerkProvider } from '@clerk/nextjs';
import { FirebaseProvider } from '@/src/contexts/FirebaseContext';
import DashboardShell from '@/src/app/components/dashboard/DashboardShell';
import MobileWarning from '@/src/app/components/dashboard/MobileWarning';

export default function PartnerDashboard() {
  return (
    <ClerkProvider>
      <FirebaseProvider>
        <MobileWarning />
        <DashboardShell />
      </FirebaseProvider>
    </ClerkProvider>
  );
}
