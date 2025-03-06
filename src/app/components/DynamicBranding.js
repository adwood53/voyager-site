// src/app/components/DynamicBranding.js - updated
'use client';

import { useState, useEffect } from 'react';

/**
 * Gets organization branding properties based on organization data
 * @param {object|null} organization - The organization data
 * @returns {object} Branding properties with defaults if none provided
 */
function getOrganizationBranding(organization) {
  const defaults = {
    name: 'Voyager',
    logo: '/Voyager-Box-Logo.png',
    primaryColor: '#E79023',
    secondaryColor: '#a6620c',
    textColor: '#FFFFFF',
  };

  if (!organization) return defaults;

  return {
    name: organization.name || defaults.name,
    logo: organization.logo || defaults.logo,
    primaryColor: organization.primaryColor || defaults.primaryColor,
    secondaryColor:
      organization.secondaryColor || defaults.secondaryColor,
    textColor: organization.textColor || defaults.textColor,
  };
}

/**
 * Generate CSS variables based on organization branding
 * @param {object} branding - Organization branding properties
 * @returns {string} CSS variables string that can be injected into a style tag
 */
function generateBrandingCSS(branding) {
  return `
    :root {
      --primary: ${branding.primaryColor};
      --accent: ${branding.secondaryColor};
      --text-light: ${branding.textColor};
      --primary-gradient: linear-gradient(315deg, ${branding.primaryColor} 0%, ${branding.secondaryColor} 100%);
    }
  `;
}

/**
 * Component that applies organization-specific branding via CSS variables
 * This should be placed in the layout file of areas that need dynamic branding
 */
export default function DynamicBranding({ organization, children }) {
  const [branding, setBranding] = useState(null);
  const [cssVars, setCssVars] = useState('');

  // Apply branding when organization changes
  useEffect(() => {
    const brandingData = getOrganizationBranding(organization);
    setBranding(brandingData);
    setCssVars(generateBrandingCSS(brandingData));
  }, [organization]);

  return (
    <>
      {/* Inject dynamic CSS variables */}
      {cssVars && (
        <style jsx global>
          {cssVars}
        </style>
      )}

      {/* Render children normally */}
      {children}
    </>
  );
}
