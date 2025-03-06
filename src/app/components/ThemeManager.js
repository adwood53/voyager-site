'use client';
// src/app/components/ThemeManager.js

import { useEffect } from 'react';
import { useFirebase } from '@/src/contexts/FirebaseContext';
import '../partner/partner-theme.css'; // Import the base CSS

export default function ThemeManager({ children }) {
  const { organization, loading } = useFirebase();

  useEffect(() => {
    // Only update theme if organization data is available
    if (!loading && organization) {
      // Apply theme variables from Firestore
      const theme = {
        primary: organization.primaryColor || '#E79023',
        secondary: organization.secondaryColor || '#a6620c',
        text: organization.textColor || '#333333',
        bg: organization.bgColor || '#FFFFFF',
        cardBg: organization.cardBgColor || '#F8F9FA',
        border: organization.borderColor || '#E2E8F0',
      };

      // Set CSS variables
      document.documentElement.style.setProperty(
        '--partner-primary',
        theme.primary
      );
      document.documentElement.style.setProperty(
        '--partner-secondary',
        theme.secondary
      );
      document.documentElement.style.setProperty(
        '--partner-text',
        theme.text
      );
      document.documentElement.style.setProperty(
        '--partner-bg',
        theme.bg
      );
      document.documentElement.style.setProperty(
        '--partner-card-bg',
        theme.cardBg
      );
      document.documentElement.style.setProperty(
        '--partner-border',
        theme.border
      );
    }
  }, [organization, loading]);

  return children;
}
