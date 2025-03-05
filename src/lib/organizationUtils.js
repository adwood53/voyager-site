'use client';

import { getOrganizationBySubdomain } from './firestore';

/**
 * Extract subdomain from hostname
 * @param {string} hostname - The hostname to parse (e.g. "partner.voyagervrlab.co.uk")
 * @returns {string|null} The subdomain or null if none found
 */
export function extractSubdomain(hostname) {
  if (!hostname) return null;

  // Handle development environments
  if (hostname === 'localhost') return null;

  // Extract subdomain from hostname
  const parts = hostname.split('.');

  // Determine if we have a subdomain
  if (parts.length > 2) {
    const subdomain = parts[0];

    // Skip common non-organization subdomains
    if (['www', 'app', 'api', 'staging', 'dev'].includes(subdomain)) {
      return null;
    }

    return subdomain;
  }

  return null;
}

/**
 * Get organization details based on current hostname
 * @returns {Promise<object|null>} Organization details or null
 */
export async function getOrganizationFromHostname() {
  if (typeof window === 'undefined') return null;

  const hostname = window.location.hostname;
  const subdomain = extractSubdomain(hostname);

  if (!subdomain) return null;

  try {
    return await getOrganizationBySubdomain(subdomain);
  } catch (error) {
    console.error('Error getting organization from hostname:', error);
    return null;
  }
}

/**
 * Get organization branding properties based on organization data
 * @param {object|null} organization - The organization data
 * @returns {object} Branding properties with defaults if none provided
 */
export function getOrganizationBranding(organization) {
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
export function generateBrandingCSS(branding) {
  return `
    :root {
      --primary: ${branding.primaryColor};
      --accent: ${branding.secondaryColor};
      --text-light: ${branding.textColor};
      --primary-gradient: linear-gradient(315deg, ${branding.primaryColor} 0%, ${branding.secondaryColor} 100%);
    }
  `;
}
