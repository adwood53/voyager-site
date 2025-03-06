// src/app/sign-in/[[...sign-in]]/page.js - fixed
'use client';

import { SignIn } from '@clerk/nextjs';
import { ClerkProvider } from '@clerk/nextjs';
import Image from 'next/image';

export default function SignInPage() {
  // Custom appearance
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
      colorPrimary: '#E79023',
    },
  };

  return (
    <ClerkProvider
      appearance={{
        layout: {
          unsafe_disableDevelopmentModeWarnings: true,
        },
      }}
    >
      <div className="min-h-screen bg-darkBg flex flex-col">
        {/* Header with branding */}
        <header className="w-full p-6 bg-darkCard border-b border-primary border-opacity-20">
          <div className="container mx-auto flex justify-center items-center">
            <div className="flex items-center">
              <Image
                src="/Voyager-Box-Logo.png"
                alt="Voyager"
                width={50}
                height={50}
                className="rounded-md"
              />
              <span className="text-primary font-heading ml-2 text-xl">
                VOYAGER PARTNER PORTAL
              </span>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-heading text-primary mb-2">
                Partner Sign In
              </h1>
              <p className="text-textLight opacity-70">
                Sign in to access your organization&#39;s resources
              </p>
            </div>

            <div className="bg-darkCard border border-primary border-opacity-20 rounded-lg p-1">
              <SignIn
                appearance={appearance}
                redirectUrl="/partner"
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
    </ClerkProvider>
  );
}
