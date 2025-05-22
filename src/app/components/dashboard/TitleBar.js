// src/app/components/dashboard/TitleBar.js
'use client';

import { OrganizationSwitcher, useOrganization } from '@clerk/nextjs';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import WalkthroughButton from './WalkthroughButton';

export default function TitleBar({ organization, onNavigate }) {
  // Get organization details (fallback to defaults if not available)
  const orgName = organization?.name || 'Partner Organisation';
  const { membership } = useOrganization();

  // Use the correct logo path from the organization data
  const [orgLogo, setOrgLogo] = useState('/Voyager-Box-Logo.png');

  // Check if user is admin
  const isAdmin = membership?.role === 'org:admin';

  // Update the logo when organization data changes
  useEffect(() => {
    if (organization?.logo) {
      setOrgLogo(organization.logo);
    } else if (organization?.imageUrl) {
      setOrgLogo(organization.imageUrl);
    }
  }, [organization]);

  // Custom handler for the manage button
  const handleManageOrg = (e) => {
    e.preventDefault();
    // Navigate to admin panel if admin, otherwise to settings
    if (isAdmin) {
      onNavigate('admin');
    } else {
      onNavigate('settings');
    }
    return false; // Prevent default navigation
  };

  // Handle walkthrough video opening (optional analytics/tracking)
  const handleWalkthroughOpen = () => {
    console.log('Walkthrough video opened');
    // Add any analytics tracking here if needed
  };

  return (
    <div className="w-full border-b border-gray-200 bg-white z-10">
      <div className="w-full mx-auto px-4 py-2 flex items-center justify-between">
        {/* Left side - Organization logo & name */}
        <div className="flex items-center">
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <OrganizationSwitcher
              hidePersonal={true}
              afterSelectOrganizationUrl="/partner"
              afterLeaveOrganizationUrl="/partner"
              createOrganizationMode="none"
              appearance={{
                elements: {
                  rootBox: 'w-auto',
                  organizationSwitcherTrigger:
                    'flex items-center gap-2 hover:bg-gray-100 rounded-md px-2 py-1 transition-colors',
                  organizationPreviewTextContainer: 'text-gray-700',
                  organizationSwitcherPopoverCard:
                    'bg-white border border-gray-200 shadow-lg',
                  // Hide manage button from the UI since we're overriding its behavior
                  organizationSwitcherPopoverActionButton:
                    'hover:bg-gray-100',
                  organizationSwitcherTriggerIcon:
                    'w-[20px] h-[20px]', // Larger icon
                  organizationPreviewAvatarContainer:
                    'w-[40px] h-[40px]', // Larger avatar container
                  organizationPreviewAvatarBox:
                    'w-[40px] h-[40px] bg-gray-800', // Larger avatar box
                },
                variables: {
                  fontFamily: "'Quicksand', sans-serif",
                  fontSize: '16px', // Base font size
                },
              }}
              // Override manage button behavior
              organizationProfileUrl="#"
              organizationProfileMode="modal" // Use modal mode to prevent navigation
              onOrganizationProfileClick={handleManageOrg}
            />
          </motion.div>
        </div>

        {/* Center - Logo & Platform Name */}
        <div className="flex items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex items-center"
          >
            <div className="flex items-center px-4">
              <WalkthroughButton
                videoId="v4Tx6QNV7-c" // Replace with your actual YouTube video ID
                onVideoOpen={handleWalkthroughOpen}
              />
              {/* Add your actual YouTube video ID */}
            </div>
            <span className="text-gray-500 mr-2 hidden md:inline">
              Powered by
            </span>
            <div className="flex items-center">
              <Image
                src="/Voyager-Box-Logo.png"
                alt="Voyager"
                width={28}
                height={28}
                className="rounded-md"
              />
              <span
                className="ml-2 font-medium text-primary-color text-sm md:text-base"
                style={{ color: 'var(--primary-color, #2563EB)' }}
              >
                VOYAGER
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
