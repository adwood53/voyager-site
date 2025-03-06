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
  const { user, isSignedIn, isLoaded: clerkLoaded } = useUser();
  const {
    organization: clerkOrg,
    membership,
    isLoaded: clerkOrgLoaded,
  } = useOrganization();

  const {
    organization: firestoreOrg,
    loading: firestoreLoading,
    error: firestoreError,
  } = useFirebase();

  // State for profile panel visibility
  const [profileExpanded, setProfileExpanded] = useState(false);

  // Active panel state
  const [activePanel, setActivePanel] = useState(
    DASHBOARD_ROUTES.HOME
  );

  // Check if user is admin based ONLY on Clerk (not dependent on Firestore)
  const isAdmin =
    membership?.role === 'admin' || membership?.role === 'owner';

  // Determine if we are waiting for authentication
  const waitingForAuth = !clerkLoaded;

  // Get organization branding - fallback to defaults if Firestore has errors
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
    if (clerkLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [clerkLoaded, isSignedIn, router]);

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

  // If still waiting for Clerk auth, show loading screen
  if (waitingForAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div
            className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
            style={{
              borderColor: '#2563EB',
              borderTopColor: 'transparent',
            }}
          />
          <p className="text-gray-600">Authenticating...</p>
        </div>
      </div>
    );
  }

  // Apply dynamic CSS variables for branding
  const brandingStyles = {
    '--primary-color': brandColors.primary,
    '--primary-color-rgb': hexToRgb(brandColors.primary),
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

  // Show error notification if there's a Firestore error but continue with the app
  const firestoreErrorDisplay = firestoreError ? (
    <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50 max-w-md shadow-lg">
      <div className="flex items-center">
        <div className="py-1 mr-2">
          <svg
            className="h-6 w-6 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div>
          <p className="font-bold">Data Sync Error</p>
          <p className="text-sm">
            Some features may be limited due to a connection error.
            Using default settings.
          </p>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <div
      className="dashboard-shell flex flex-col h-screen overflow-hidden bg-gray-50"
      style={brandingStyles}
    >
      {firestoreErrorDisplay}

      {/* Title Bar with organization and Voyager logos */}
      <TitleBar
        organization={firestoreOrg || clerkOrg}
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
          organization={clerkOrg}
          firestoreOrg={firestoreOrg}
        />
      </div>
    </div>
  );
}

// Helper function to convert hex color to rgb format for CSS variables
function hexToRgb(hex) {
  // Default if no hex provided
  if (!hex) return '37, 99, 235';

  // Remove the # if present
  hex = hex.replace('#', '');

  // Handle both 3 and 6 character hex codes
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `${r}, ${g}, ${b}`;
}
