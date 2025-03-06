'use client';

import { Button } from '@heroui/react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function TitleBar({
  organization,
  toggleProfilePanel,
}) {
  // Get organization details (fallback to defaults if not available)
  const orgName = organization?.name || 'Partner Organisation';

  // Use the correct logo path from the organization data
  const [orgLogo, setOrgLogo] = useState('/Voyager-Box-Logo.png');

  // Update the logo when organization data changes
  useEffect(() => {
    if (organization?.logo) {
      setOrgLogo(organization.logo);
    } else if (organization?.imageUrl) {
      setOrgLogo(organization.imageUrl);
    }
  }, [organization]);

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
            <Image
              src={orgLogo}
              alt={orgName}
              width={40}
              height={40}
              className="rounded-md mr-3"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <span className="font-medium text-gray-700 hidden md:inline">
              {orgName}
            </span>
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

        {/* Right side - Profile actions */}
        <div className="flex items-center space-x-3">
          <Button
            isIconOnly
            variant="light"
            aria-label="Notifications"
            className="text-gray-500 hover:text-gray-800"
          >
            <span className="text-xl">🔔</span>
          </Button>

          <Button
            isIconOnly
            variant="light"
            aria-label="Help"
            className="text-gray-500 hover:text-gray-800"
          >
            <span className="text-xl">❓</span>
          </Button>

          <Button
            isIconOnly
            variant="light"
            aria-label="Profile"
            className="text-gray-500 hover:text-gray-800"
            onClick={toggleProfilePanel}
          >
            <span className="text-xl">👤</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
