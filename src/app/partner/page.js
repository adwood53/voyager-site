'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { useUser, useOrganization } from '@clerk/nextjs';
import PartnerNavbar from '@/src/app/components/PartnerNavbar';
import { useFirebase } from '@/src/contexts/FirebaseContext';

export default function Partner() {
  const { user, isSignedIn, isLoaded } = useUser();
  const { organization } = useOrganization();
  const { organization: firestoreOrg, loading } = useFirebase();
  const router = useRouter();
  const [hostname, setHostname] = useState('');
  const [subdomain, setSubdomain] = useState('');

  // Get hostname and subdomain when component mounts (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const host = window.location.hostname;
      setHostname(host);

      // Parse subdomain (e.g., "partner" from "partner.voyagervrlab.co.uk")
      const subdomainParts = host.split('.');
      if (subdomainParts.length > 2) {
        setSubdomain(subdomainParts[0]);
      }
    }
  }, []);

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  // If still loading, show loading state
  if (!isLoaded || loading || !user) {
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
          <p className="text-textLight">Loading partner portal...</p>
        </div>
      </div>
    );
  }

  // Get the organization details to display
  const orgName =
    firestoreOrg?.name ||
    organization?.name ||
    'Partner Organization';
  const orgLogo = firestoreOrg?.logo || '/Voyager-Box-Logo.png';

  return (
    <div className="min-h-screen bg-darkBg flex flex-col">
      {/* Organization branding header */}
      <header className="w-full p-4 bg-darkCard border-b border-primary border-opacity-20">
        <div className="container mx-auto flex justify-between items-center">
          {/* Organization logo */}
          <div className="flex items-center">
            <Image
              src={orgLogo}
              alt={orgName}
              width={40}
              height={40}
              className="rounded-md mr-3"
            />
            <span className="text-lg font-heading text-textLight">
              {orgName}
            </span>
            {subdomain && (
              <span className="ml-2 text-xs text-textLight opacity-60 px-2 py-1 bg-primary bg-opacity-10 rounded-full">
                {subdomain}.voyagervrlab.co.uk
              </span>
            )}
          </div>

          {/* Voyager logo */}
          <div className="flex items-center">
            <span className="text-textLight opacity-70 mr-2 hidden sm:inline">
              Powered by
            </span>
            <Image
              src="/Voyager-Box-Logo.png"
              alt="Voyager"
              width={36}
              height={36}
              className="rounded-md"
            />
            <span className="text-primary font-heading ml-2">
              VOYAGER
            </span>
          </div>
        </div>
      </header>

      {/* Partner portal navigation */}
      <PartnerNavbar orgDetails={firestoreOrg || organization} />

      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="container mx-auto">
          <Card className="card-voyager bg-darkCard border border-primary border-opacity-20 hover:border-opacity-40">
            <CardHeader className="border-b border-primary border-opacity-10 pb-4">
              <div className="flex justify-between items-center">
                <h1 className="heading-voyager text-2xl md:text-3xl text-primary">
                  Welcome, {user?.firstName || 'Partner'}
                </h1>
                <div className="text-right">
                  <p className="text-textLight opacity-80">
                    {orgName}
                  </p>
                  <p className="text-primary text-sm">
                    {organization?.membershipRole || 'Member'}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-textLight opacity-80 mb-6">
                This is your organization&apos;s Voyager portal. From
                here you can manage your immersive projects and access
                your white-label resources.
              </p>

              {/* Partner content - dashboard grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-darkBg p-6 rounded-lg border border-primary border-opacity-10 hover:border-opacity-30 hover:shadow-glow-sm transition-all duration-300 cursor-pointer transform hover:scale-102">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">📊</span>
                    </div>
                    <h2 className="text-xl text-primary">
                      Project Calculator
                    </h2>
                  </div>
                  <p className="text-textLight opacity-70">
                    Calculate project costs and generate proposals for
                    your clients
                  </p>
                </div>

                <div className="bg-darkBg p-6 rounded-lg border border-primary border-opacity-10 hover:border-opacity-30 hover:shadow-glow-sm transition-all duration-300 cursor-pointer transform hover:scale-102">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">📁</span>
                    </div>
                    <h2 className="text-xl text-primary">
                      Project Manager
                    </h2>
                  </div>
                  <p className="text-textLight opacity-70">
                    View and manage your existing immersive projects
                  </p>
                </div>

                <div className="bg-darkBg p-6 rounded-lg border border-primary border-opacity-10 hover:border-opacity-30 hover:shadow-glow-sm transition-all duration-300 cursor-pointer transform hover:scale-102">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">🛠️</span>
                    </div>
                    <h2 className="text-xl text-primary">
                      Sales Toolkit
                    </h2>
                  </div>
                  <p className="text-textLight opacity-70">
                    Access your white-label sales and marketing
                    materials
                  </p>
                </div>

                <div className="bg-darkBg p-6 rounded-lg border border-primary border-opacity-10 hover:border-opacity-30 hover:shadow-glow-sm transition-all duration-300 cursor-pointer transform hover:scale-102">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">👥</span>
                    </div>
                    <h2 className="text-xl text-primary">
                      Team Settings
                    </h2>
                  </div>
                  <p className="text-textLight opacity-70">
                    Manage your team members, permissions, and
                    organization settings
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </main>

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
