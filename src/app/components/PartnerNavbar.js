// src/app/components/PartnerNavbar.js - updated with theme classes
'use client';

import { useState, useEffect } from 'react';
import { useUser, UserButton, useOrganization } from '@clerk/nextjs';
import { Link } from '@heroui/react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import CustomOrganizationSwitcher from './OrganizationSwitcher';

export default function PartnerNavbar({ orgDetails }) {
  const pathname = usePathname();
  const [activePage, setActivePage] = useState('');
  const { user } = useUser();
  const { organization, membership } = useOrganization();

  // Get organization details from provided prop or Clerk
  const orgName =
    orgDetails?.name || organization?.name || 'Partner Portal';

  // Check if user is an admin or owner
  const isAdmin =
    membership?.role === 'admin' || membership?.role === 'owner';

  // Set active page based on current URL path
  useEffect(() => {
    if (pathname === '/partner') {
      setActivePage('dashboard');
    } else if (pathname.includes('/partner/projects')) {
      setActivePage('projects');
    } else if (pathname.includes('/partner/resources')) {
      setActivePage('resources');
    } else if (pathname.includes('/partner/calculator')) {
      setActivePage('calculator');
    } else if (pathname.includes('/partner/team')) {
      setActivePage('team');
    } else if (pathname.includes('/partner/settings')) {
      setActivePage('settings');
    }
  }, [pathname]);

  return (
    <nav className="partner-navbar">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Navigation links */}
          <div className="flex space-x-6 overflow-x-auto hide-scrollbar pb-1">
            <NavLink
              href="/partner"
              active={activePage === 'dashboard'}
            >
              Dashboard
            </NavLink>
            <NavLink
              href="/partner/projects"
              active={activePage === 'projects'}
            >
              Projects
            </NavLink>
            <NavLink
              href="/partner/resources"
              active={activePage === 'resources'}
            >
              Resources
            </NavLink>
            <NavLink
              href="/partner/calculator"
              active={activePage === 'calculator'}
            >
              Calculator
            </NavLink>
            <NavLink
              href="/partner/team"
              active={activePage === 'team'}
            >
              Team
            </NavLink>
            {isAdmin && (
              <NavLink
                href="/partner/settings"
                active={activePage === 'settings'}
              >
                Settings
              </NavLink>
            )}
          </div>

          {/* User menu and organization switcher */}
          <div className="flex items-center gap-4">
            {/* Organization switcher if user has multiple organizations */}
            {user && organization && (
              <div className="hidden sm:block">
                <CustomOrganizationSwitcher />
              </div>
            )}

            {/* User info and button */}
            <div className="flex items-center">
              <div className="mr-2 text-sm hidden sm:block">
                {user?.firstName || 'User'}
              </div>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: 'w-9 h-9',
                    userButtonPopoverCard: 'partner-card',
                    userButtonPopoverText: '',
                    userButtonPopoverActionButton:
                      'hover:bg-gray-100',
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile organization switcher - shown only on small screens */}
      {user && organization && (
        <div className="sm:hidden p-2 border-t partner-border">
          <CustomOrganizationSwitcher />
        </div>
      )}
    </nav>
  );
}

// Helper component for navigation links
function NavLink({ href, active, children }) {
  return (
    <Link
      href={href}
      className={`relative px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap ${active ? 'partner-active-nav' : ''}`}
    >
      {children}
      {active && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-partner-primary rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  );
}
