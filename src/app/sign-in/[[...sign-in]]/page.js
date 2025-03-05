'use client';

import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getOrganizationBySubdomain } from '@/src/lib/firestore';

export default function SignInPage() {
  const [orgDetails, setOrgDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const subdomain = searchParams.get('subdomain');

  useEffect(() => {
    // Check if we're accessing from a subdomain
    async function getOrgDetails() {
      if (!subdomain) {
        setLoading(false);
        return;
      }

      try {
        const orgData = await getOrganizationBySubdomain(subdomain);
        if (orgData) {
          setOrgDetails(orgData);
        }
      } catch (error) {
        console.error('Error fetching organization details:', error);
      } finally {
        setLoading(false);
      }
    }

    // Also check the hostname directly
    async function checkHostname() {
      if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        const hostSubdomain = hostname.split('.')[0];

        // Skip for localhost, www, etc.
        if (
          hostSubdomain === 'localhost' ||
          hostSubdomain === 'www' ||
          hostSubdomain === 'voyagervrlab'
        ) {
          setLoading(false);
          return;
        }

        try {
          const orgData =
            await getOrganizationBySubdomain(hostSubdomain);
          if (orgData) {
            setOrgDetails(orgData);
          }
        } catch (error) {
          console.error(
            'Error fetching organization by hostname:',
            error
          );
        } finally {
          setLoading(false);
        }
      }
    }

    getOrgDetails();
    if (!subdomain) {
      checkHostname();
    }
  }, [subdomain]);

  // Logo and brand name based on org details
  const logo = orgDetails?.logo || '/Voyager-Box-Logo.png';
  const brandName = orgDetails?.name || 'VOYAGER PARTNER PORTAL';
  const brandColor = orgDetails?.primaryColor || '#E79023'; // Default Voyager primary

  // Custom appearance with dynamic color
  const appearance = {
    elements: {
      formButtonPrimary: `bg-primary hover:bg-accent text-textLight`,
      card: 'bg-transparent border-0 shadow-none',
      headerTitle: 'text-primary',
      formFieldLabel: 'text-textLight',
      formFieldInput:
        'bg-darkBg border-primary border-opacity-30 text-textLight',
      footerActionLink: 'text-primary hover:text-accent',
    },
    variables: {
      colorPrimary: brandColor,
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-darkBg flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-primary animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <p className="text-textLight">Loading sign-in page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-darkBg flex flex-col">
      {/* Header with branding (org-specific if available) */}
      <header className="w-full p-6 bg-darkCard border-b border-primary border-opacity-20">
        <div className="container mx-auto flex justify-center items-center">
          <div className="flex items-center">
            <Image
              src={logo}
              alt={brandName}
              width={50}
              height={50}
              className="rounded-md"
            />
            <span className="text-primary font-heading ml-2 text-xl">
              {brandName}
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading text-primary mb-2">
              Partner Sign In
            </h1>
            <p className="text-textLight opacity-70">
              Sign in to access your organization's resources
            </p>
            {orgDetails && (
              <p className="mt-2 text-primary text-sm">
                {orgDetails.name} Portal
              </p>
            )}
          </div>

          <div className="bg-darkCard border border-primary border-opacity-20 rounded-lg p-1">
            <SignIn
              appearance={appearance}
              redirectUrl={
                orgDetails
                  ? `/partner?org=${orgDetails.id}`
                  : '/partner'
              }
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full p-4 bg-darkCard border-t border-primary border-opacity-20">
        <div className="container mx-auto text-center text-textLight opacity-60 text-sm">
          &copy; {new Date().getFullYear()} Voyager. All rights
          reserved.
        </div>
      </footer>
    </div>
  );
}
