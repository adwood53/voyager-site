'use client';

import { useState, useEffect } from 'react';
import {
  getOrganizationFromHostname,
  getOrganizationBranding,
  generateBrandingCSS,
} from '@/src/lib/organizationUtils';

/**
 * Component that applies organization-specific branding via CSS variables
 * This should be placed in the layout file of areas that need dynamic branding
 */
export default function DynamicBranding({ organization, children }) {
  const [branding, setBranding] = useState(null);
  const [cssVars, setCssVars] = useState('');

  // If organization is directly provided, use it
  useEffect(() => {
    if (organization) {
      const brandingData = getOrganizationBranding(organization);
      setBranding(brandingData);
      setCssVars(generateBrandingCSS(brandingData));
    }
  }, [organization]);

  // If no organization is provided, try to detect from hostname
  useEffect(() => {
    if (!organization) {
      async function getBrandingFromHostname() {
        try {
          const orgData = await getOrganizationFromHostname();
          if (orgData) {
            const brandingData = getOrganizationBranding(orgData);
            setBranding(brandingData);
            setCssVars(generateBrandingCSS(brandingData));
          }
        } catch (error) {
          console.error('Error setting dynamic branding:', error);
        }
      }

      getBrandingFromHostname();
    }
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
