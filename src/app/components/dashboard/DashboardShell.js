'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUser, useOrganization } from '@clerk/nextjs';
import { useFirebase } from '@/src/contexts/FirebaseContext';

import TitleBar from './TitleBar';
import NavigationBar from './NavigationBar';
import ProfilePanel from './ProfilePanel';
import HomePanel from './panels/HomePanel';
import AdminDashboard from './panels/AdminDashboard';
import SettingsPanel from './panels/SettingsPanel';
import ScopeBuilderPanel from './panels/ScopeBuilderPanel';
import ProductionsPanel from './panels/ProductionsPanel';
import MerchandisePanel from './panels/MerchandisePanel';

// Define dashboard pages/routes
const DASHBOARD_ROUTES = {
  HOME: 'home',
  ADMIN: 'admin',
  SETTINGS: 'settings',
  SCOPE_BUILDER: 'scope-builder',
  PRODUCTIONS: 'productions',
  MERCHANDISE: 'merchandise',
};

export default function DashboardShell({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isSignedIn, isLoaded } = useUser();
  const { organization, membership } = useOrganization();
  const { organization: firestoreOrg, loading } = useFirebase();

  // State for profile panel visibility
  const [profileExpanded, setProfileExpanded] = useState(false);

  // Active panel state
  const [activePanel, setActivePanel] = useState(
    DASHBOARD_ROUTES.HOME
  );

  // Check if user is admin
  const isAdmin =
    membership?.role === 'admin' || membership?.role === 'owner';

  // Get organization branding
  const brandColors = {
    primary: firestoreOrg?.primaryColor || '#2563EB',
    secondary: firestoreOrg?.secondaryColor || '#10B981',
    accent: firestoreOrg?.accentColor || '#7C3AED',
    text: firestoreOrg?.textColor || '#1F2937',
    background: firestoreOrg?.bgColor || '#F9FAFB',
    cardBg: firestoreOrg?.cardBgColor || '#FFFFFF',
    border: firestoreOrg?.borderColor || '#E5E7EB',
  };

  // Redirect if not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  // Handle navigation changes
  const handleNavigate = (routeKey) => {
    setActivePanel(routeKey);

    // Close profile panel when changing routes
    if (profileExpanded) {
      setProfileExpanded(false);
    }
  };

  // Toggle profile panel
  const toggleProfilePanel = () => {
    setProfileExpanded(!profileExpanded);
  };

  // If still loading, show loading screen
  if (!isLoaded || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div
            className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
            style={{
              borderColor: brandColors.primary,
              borderTopColor: 'transparent',
            }}
          />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Apply dynamic CSS variables for branding
  const brandingStyles = {
    '--primary-color': brandColors.primary,
    '--secondary-color': brandColors.secondary,
    '--accent-color': brandColors.accent,
    '--text-color': brandColors.text,
    '--background-color': brandColors.background,
    '--card-bg-color': brandColors.cardBg,
    '--border-color': brandColors.border,
  };

  // Render the appropriate panel based on active state
  const renderPanel = () => {
    switch (activePanel) {
      case DASHBOARD_ROUTES.ADMIN:
        return isAdmin ? <AdminDashboard /> : <HomePanel />;
      case DASHBOARD_ROUTES.SETTINGS:
        return <SettingsPanel isAdmin={isAdmin} />;
      case DASHBOARD_ROUTES.SCOPE_BUILDER:
        return <ScopeBuilderPanel />;
      case DASHBOARD_ROUTES.PRODUCTIONS:
        return <ProductionsPanel />;
      case DASHBOARD_ROUTES.MERCHANDISE:
        return <MerchandisePanel />;
      default:
        return <HomePanel />;
    }
  };

  return (
    <div
      className="dashboard-shell flex flex-col h-screen overflow-hidden bg-gray-50"
      style={brandingStyles}
    >
      {/* Title Bar with organization and Voyager logos */}
      <TitleBar
        organization={firestoreOrg || organization}
        toggleProfilePanel={toggleProfilePanel}
      />

      {/* Main content area with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Navigation sidebar */}
        <NavigationBar
          activeRoute={activePanel}
          onNavigate={handleNavigate}
          isAdmin={isAdmin}
        />

        {/* Main content area */}
        <div className="flex-1 overflow-auto relative">
          {/* Dynamic content - tab switching instead of modals */}
          <div className="h-full p-6">{renderPanel()}</div>
        </div>

        {/* Profile panel */}
        <ProfilePanel
          expanded={profileExpanded}
          onToggle={toggleProfilePanel}
          user={user}
          organization={organization}
          firestoreOrg={firestoreOrg}
        />
      </div>
    </div>
  );
}
