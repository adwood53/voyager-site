'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getOrganizationBySubdomain } from '@/src/lib/firestore';

export default function SubdomainHandler({ params }) {
  const { subdomain } = params;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function checkSubdomain() {
      try {
        // Skip processing for special subdomains
        if (subdomain === 'www' || subdomain === 'localhost') {
          router.push('/');
          return;
        }

        // Check if this is a partner subdomain
        const organization =
          await getOrganizationBySubdomain(subdomain);

        if (organization) {
          // This is a valid partner organization - redirect to partner dashboard
          // with the organization context
          router.push('/partner');
        } else {
          // Invalid subdomain - redirect to home with error
          setError(`No organization found for "${subdomain}"`);
          setTimeout(() => {
            router.push('/');
          }, 3000);
        }
      } catch (err) {
        console.error('Error checking subdomain:', err);
        setError('An error occurred while checking the subdomain');
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } finally {
        setLoading(false);
      }
    }

    checkSubdomain();
  }, [subdomain, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-darkBg flex flex-col items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-20 h-20 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-primary animate-spin"
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
          <p className="text-textLight">
            Loading organization portal...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-darkBg flex flex-col items-center justify-center">
        <div className="bg-darkCard p-8 rounded-lg border border-primary border-opacity-20 max-w-md text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h1 className="text-2xl font-heading text-primary mb-4">
            Organization Not Found
          </h1>
          <p className="text-textLight opacity-80 mb-6">{error}</p>
          <p className="text-textLight opacity-60 text-sm">
            Redirecting to homepage...
          </p>
        </div>
      </div>
    );
  }

  // This is a fallback that shouldn't normally be seen
  return (
    <div className="min-h-screen bg-darkBg flex flex-col items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-20 h-20 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-10 h-10 text-primary animate-spin"
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
        <p className="text-textLight">Processing...</p>
      </div>
    </div>
  );
}
