// src/app/components/PartnerLayout.js
'use client';

import { useState } from 'react';
import { useUser, UserButton, useOrganization } from '@clerk/nextjs';
import { useFirebase } from '@/src/contexts/FirebaseContext';
import Image from 'next/image';
import PartnerNavbar from './PartnerNavbar';
import OrganizationSwitcher from './OrganizationSwitcher';

export default function PartnerLayout({
  children,
  pageTitle,
  pageDescription,
}) {
  const { user } = useUser();
  const { organization } = useOrganization();
  const { organization: firestoreOrg } = useFirebase();

  // Determine organization details
  const orgName =
    firestoreOrg?.name ||
    organization?.name ||
    'Partner Organization';
  const orgLogo =
    firestoreOrg?.logo ||
    organization?.imageUrl ||
    '/Voyager-Box-Logo.png';

  return (
    <div className="partner-dashboard min-h-screen flex">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Page Header */}
        <header className="border-b border-gray-200 p-4 bg-white">
          <div className="container mx-auto flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {pageTitle}
              </h1>
              {pageDescription && (
                <p className="text-gray-500 text-sm mt-1">
                  {pageDescription}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <OrganizationSwitcher />
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: 'w-9 h-9',
                    userButtonPopoverCard: 'shadow-lg rounded-lg',
                  },
                }}
                afterSignOutUrl="/"
              />
            </div>
          </div>
        </header>

        {/* Navigation */}
        <PartnerNavbar orgDetails={firestoreOrg || organization} />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <div className="container mx-auto">{children}</div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 p-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Voyager. All rights
          reserved.
        </footer>
      </div>
    </div>
  );
}
