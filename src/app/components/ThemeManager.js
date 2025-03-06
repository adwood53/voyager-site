// src/app/components/ThemeManager.js
'use client';

import { useEffect } from 'react';
import { useFirebase } from '@/src/contexts/FirebaseContext';

export default function ThemeManager({ children }) {
  const { organization, loading } = useFirebase();

  useEffect(() => {
    const partnerDashboard = document.querySelector(
      '.partner-dashboard'
    );

    if (!loading && organization && partnerDashboard) {
      const theme = {
        primaryColor: organization.primaryColor || '#E79023',
        secondaryColor: organization.secondaryColor || '#a6620c',
        textColor: organization.textColor || '#333333',
        backgroundColor: organization.bgColor || '#FFFFFF',
        cardBgColor: organization.cardBgColor || '#F8F9FA',
        borderColor: organization.borderColor || '#E2E8F0',
      };

      // Apply CSS variables directly to the partner dashboard
      partnerDashboard.style.setProperty(
        '--primary-color',
        theme.primaryColor
      );
      partnerDashboard.style.setProperty(
        '--secondary-color',
        theme.secondaryColor
      );
      partnerDashboard.style.setProperty(
        '--text-color',
        theme.textColor
      );
      partnerDashboard.style.setProperty(
        '--card-bg-color',
        theme.cardBgColor
      );
      partnerDashboard.style.setProperty(
        '--border-color',
        theme.borderColor
      );

      // Set background and text color
      partnerDashboard.style.backgroundColor = theme.backgroundColor;
      partnerDashboard.style.color = theme.textColor;
    }
  }, [organization, loading]);

  return children;
}
