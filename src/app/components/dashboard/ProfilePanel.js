'use client';

import { useState } from 'react';
import { useClerk, UserButton } from '@clerk/nextjs';
import { Button, Card, CardBody, Divider } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function ProfilePanel({
  expanded,
  onToggle,
  user,
  organization,
  firestoreOrg,
}) {
  const [showDetails, setShowDetails] = useState(false);
  const { signOut } = useClerk();

  // Get organization details (from Firestore or Clerk)
  const orgName =
    firestoreOrg?.name ||
    organization?.name ||
    'Partner Organisation';
  const orgLogo =
    firestoreOrg?.logo ||
    organization?.imageUrl ||
    '/Voyager-Box-Logo.png';

  // Panel animations
  const panelVariants = {
    expanded: {
      width: 320,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
    collapsed: {
      width: 80,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  // Content animations
  const contentVariants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: { delay: 0.2, duration: 0.3 },
    },
    hidden: { opacity: 0, x: 20, transition: { duration: 0.2 } },
  };

  // Handle sign out
  const handleSignOut = () => {
    signOut();
  };

  return (
    <motion.div
      className="h-full border-l border-border-color bg-white overflow-hidden"
      variants={panelVariants}
      animate={expanded ? 'expanded' : 'collapsed'}
      initial={false}
    >
      <div className="h-full flex flex-col">
        {/* Header with toggle button */}
        <div className="p-4 flex items-center justify-between border-b border-border-color">
          <Button
            isIconOnly
            variant="light"
            size="sm"
            className="text-gray-500"
            onClick={onToggle}
            aria-label={expanded ? 'Collapse panel' : 'Expand panel'}
          >
            {expanded ? <span>➡️</span> : <span>⬅️</span>}
          </Button>

          <AnimatePresence mode="wait">
            {expanded && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={contentVariants}
                className="text-sm font-medium text-gray-800"
              >
                Profile
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile content */}
        <div className="flex-1 overflow-auto">
          {/* User info section */}
          <div className="p-4">
            <div className="flex items-center justify-center mb-2">
              <UserButton afterSignOutUrl="/sign-in" />
            </div>

            <AnimatePresence mode="wait">
              {expanded && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={contentVariants}
                  className="text-center"
                >
                  <h3 className="font-medium text-gray-800 mt-2">
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {user?.emailAddresses?.[0]?.emailAddress}
                  </p>

                  <Divider className="my-4" />

                  {/* Organization info */}
                  <div className="flex items-center justify-center mb-3">
                    <Image
                      src={orgLogo}
                      alt={orgName}
                      width={40}
                      height={40}
                      className="rounded-md"
                    />
                  </div>
                  <h4 className="font-medium text-gray-700">
                    {orgName}
                  </h4>

                  {/* Actions */}
                  <div className="mt-4 space-y-2">
                    <Button
                      className="w-full justify-start text-red-600"
                      variant="light"
                      onClick={handleSignOut}
                    >
                      🚪 Sign Out
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <AnimatePresence mode="wait">
          {expanded && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={contentVariants}
              className="p-4 border-t border-border-color"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Image
                    src="/Voyager-Box-Logo.png"
                    alt="Voyager"
                    width={20}
                    height={20}
                    className="rounded-sm"
                  />
                  <span className="text-xs text-gray-500">
                    Voyager Partner Portal
                  </span>
                </div>
                <span className="text-xs text-gray-400">v1.0.0</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
