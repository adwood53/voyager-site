// src/app/components/dashboard/DashboardShell.js
'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUser, useOrganization } from '@clerk/nextjs';
import { useFirebase } from '@/src/contexts/FirebaseContext';
import InstallPrompt from '@/src/app/components/InstallPrompt';

import TitleBar from './TitleBar';
import NavigationBar from './NavigationBar';
import ProfilePanel from './ProfilePanel';
import HomePanel from './panels/HomePanel';
import AdminDashboard from './panels/AdminDashboard';
import SettingsPanel from './panels/SettingsPanel';
import ScopeBuilderPanel from './panels/ScopeBuilderPanel';
import ProductionsPanel from './panels/ProductionsPanel';
import MerchandisePanel from './panels/MerchandisePanel';
import ResourcesPanel from './panels/ResourcesPanel';

// Define dashboard pages/routes
const DASHBOARD_ROUTES = {
  HOME: 'home',
  ADMIN: 'admin',
  SETTINGS: 'settings',
  SCOPE_BUILDER: 'scope-builder',
  PRODUCTIONS: 'productions',
  RESOURCES: 'resources',
  MERCHANDISE: 'merchandise',
};

export default function DashboardShell() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isSignedIn, isLoaded } = useUser();
  const { organization, membership } = useOrganization({
    memberships: {
      pageSize: 20,
      keepPreviousData: true,
    },
  });

  const {
    organization: firestoreOrg,
    loading,
    error,
  } = useFirebase();

  // State for profile panel visibility
  const [profileExpanded, setProfileExpanded] = useState(false);

  // Active panel state
  const [activePanel, setActivePanel] = useState(
    DASHBOARD_ROUTES.HOME
  );

  // Check if user is admin based on Clerk membership
  const isAdmin =
    membership?.role === 'org:admin' ||
    membership?.role === 'org:owner' ||
    membership?.role === 'admin' ||
    membership?.role === 'owner';

  // Debug admin status
  useEffect(() => {
    console.log('Admin detection:', {
      membershipRole: membership?.role,
      isAdmin,
      orgId: organization?.id,
      firestoreOrgId: firestoreOrg?.id,
    });
  }, [membership, isAdmin, organization, firestoreOrg]);

  // Check for localStorage panel flag - Add this effect to handle redirection
  useEffect(() => {
    // Check for dashboard_active_panel in localStorage
    const storedPanel = localStorage.getItem(
      'dashboard_active_panel'
    );
    if (storedPanel && DASHBOARD_ROUTES[storedPanel.toUpperCase()]) {
      // Set the active panel based on localStorage value
      setActivePanel(storedPanel);
      // Clear the localStorage flag after use
      localStorage.removeItem('dashboard_active_panel');
    }
  }, []);

  // Get organization branding
  const brandColors = {
    primary: firestoreOrg?.primaryColor || '#E79023',
    secondary: firestoreOrg?.secondaryColor || '#a6620c',
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
    // If trying to access admin route but not admin, don't allow
    if (routeKey === DASHBOARD_ROUTES.ADMIN && !isAdmin) {
      console.warn('Non-admin attempted to access admin panel');
      return;
    }

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

  // Show loading screen only when we're initially loading the user data
  // but not when we're just waiting for organization data
  if (!isLoaded || (loading && !firestoreOrg)) {
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

  // Show error message if there was a loading error
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Error Loading Dashboard
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Refresh Page
          </button>
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
        // Only show admin panel if user is admin
        return isAdmin ? <AdminDashboard /> : <HomePanel />;
      case DASHBOARD_ROUTES.SETTINGS:
        return <SettingsPanel isAdmin={isAdmin} />;
      case DASHBOARD_ROUTES.SCOPE_BUILDER:
        return <ScopeBuilderPanel />;
      case DASHBOARD_ROUTES.PRODUCTIONS:
        return <ProductionsPanel />;
      case DASHBOARD_ROUTES.RESOURCES:
        return <ResourcesPanel />;
      case DASHBOARD_ROUTES.MERCHANDISE:
        return <MerchandisePanel />;
      default:
        return <HomePanel />;
    }
  };

  return (
    <>
      <InstallPrompt />
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
    </>
  );
}

// Utility function to convert hex color to RGB
function hexToRgb(hex) {
  if (!hex) return '37, 99, 235'; // Default blue if no hex

  // Remove # if present
  hex = hex.replace('#', '');

  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Check for valid values
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return '37, 99, 235'; // Default blue if parsing fails
  }

  return `${r}, ${g}, ${b}`;
}
