// src/app/components/PartnerNavbar.js
'use client';

import { useState, useEffect } from 'react';
import { useUser, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PartnerNavbar({ orgDetails }) {
  const [activePage, setActivePage] = useState('dashboard');
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  // Check if user is signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <nav className="bg-darkBg border-b border-primary border-opacity-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Navigation links */}
          <div className="flex space-x-6">
            <NavLink
              href="/dashboard"
              active={activePage === 'dashboard'}
              onClick={() => setActivePage('dashboard')}
            >
              Dashboard
            </NavLink>
            <NavLink
              href="/projects"
              active={activePage === 'projects'}
              onClick={() => setActivePage('projects')}
            >
              Projects
            </NavLink>
            <NavLink
              href="/resources"
              active={activePage === 'resources'}
              onClick={() => setActivePage('resources')}
            >
              Resources
            </NavLink>
            <NavLink
              href="/team"
              active={activePage === 'team'}
              onClick={() => setActivePage('team')}
            >
              Team
            </NavLink>
          </div>

          {/* User menu */}
          <div className="flex items-center">
            <div className="mr-2 text-textLight opacity-70 text-sm hidden sm:block">
              {orgDetails?.name || 'Partner Portal'}
            </div>
            <UserButton
              afterSignOutUrl="/sign-in"
              appearance={{
                elements: {
                  userButtonAvatarBox: 'w-10 h-10',
                },
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

// Helper component for navigation links
function NavLink({ href, active, onClick, children }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        active ? 'text-primary' : 'text-textLight hover:text-primary'
      } transition-colors`}
    >
      {children}
    </Link>
  );
}
