'use client';

import { useState } from 'react';
import { useUser, UserButton, useOrganization } from '@clerk/nextjs';
import { Link } from '@heroui/react';
import { motion } from 'framer-motion';
import CustomOrganizationSwitcher from './OrganizationSwitcher';

export default function PartnerNavbar({ orgDetails }) {
  const [activePage, setActivePage] = useState('dashboard');
  const { user } = useUser();
  const { organization } = useOrganization();

  // Get organization details from provided prop or Clerk
  const orgName =
    orgDetails?.name || organization?.name || 'Partner Portal';

  // Handle navigation item click
  const handleNavClick = (pageName) => {
    setActivePage(pageName);
  };

  return (
    <nav className="bg-darkBg border-b border-primary border-opacity-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Navigation links */}
          <div className="flex space-x-6 overflow-x-auto hide-scrollbar pb-1">
            <NavLink
              href="/partner"
              active={activePage === 'dashboard'}
              onClick={() => handleNavClick('dashboard')}
            >
              Dashboard
            </NavLink>
            <NavLink
              href="/partner/projects"
              active={activePage === 'projects'}
              onClick={() => handleNavClick('projects')}
            >
              Projects
            </NavLink>
            <NavLink
              href="/partner/resources"
              active={activePage === 'resources'}
              onClick={() => handleNavClick('resources')}
            >
              Resources
            </NavLink>
            <NavLink
              href="/partner/calculator"
              active={activePage === 'calculator'}
              onClick={() => handleNavClick('calculator')}
            >
              Calculator
            </NavLink>
            <NavLink
              href="/partner/team"
              active={activePage === 'team'}
              onClick={() => handleNavClick('team')}
            >
              Team
            </NavLink>
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
              <div className="mr-2 text-textLight opacity-70 text-sm hidden sm:block">
                {user?.firstName || 'User'}
              </div>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: 'w-9 h-9',
                    userButtonPopoverCard:
                      'bg-darkCard border border-primary border-opacity-20',
                    userButtonPopoverText: 'text-textLight',
                    userButtonPopoverActionButton:
                      'text-textLight hover:bg-primary hover:bg-opacity-20',
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile organization switcher - shown only on small screens */}
      {user && organization && (
        <div className="sm:hidden p-2 border-t border-primary border-opacity-10">
          <CustomOrganizationSwitcher />
        </div>
      )}
    </nav>
  );
}

// Helper component for navigation links
function NavLink({ href, active, onClick, children }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="relative px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap"
    >
      <span
        className={`${active ? 'text-primary' : 'text-textLight hover:text-primary'} transition-colors`}
      >
        {children}
      </span>
      {active && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  );
}

// Add a style to hide scrollbars but keep functionality
function styles() {
  return (
    <style jsx global>{`
      .hide-scrollbar {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
      }

      .hide-scrollbar::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
      }
    `}</style>
  );
}
