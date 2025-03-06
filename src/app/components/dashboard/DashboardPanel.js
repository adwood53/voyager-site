'use client';

import { motion } from 'framer-motion';
import { Button } from '@heroui/react';

export default function DashboardPanel({ children, onClose }) {
  // Animation variants for the panel
  const panelVariants = {
    hidden: {
      x: '100%',
      opacity: 0,
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.3,
      },
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.3,
      },
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.3,
      },
    },
  };

  // Animation variants for the overlay backdrop
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <motion.div
      className="absolute inset-0 z-10 bg-black bg-opacity-20 backdrop-blur-sm"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={backdropVariants}
    >
      <motion.div
        className="absolute inset-y-0 right-0 w-full md:w-5/6 lg:w-3/4 bg-white shadow-xl overflow-hidden flex flex-col"
        variants={panelVariants}
      >
        {/* Panel header with close button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex-1">
            <Button
              isIconOnly
              variant="light"
              aria-label="Close panel"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800"
            >
              <span className="text-xl">❌</span>
            </Button>
          </div>
        </div>

        {/* Panel content with scrolling */}
        <div className="flex-1 overflow-auto p-6">{children}</div>
      </motion.div>
    </motion.div>
  );
}
