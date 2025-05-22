// src/app/components/dashboard/WalkthroughButton.js
'use client';

import { useState, useEffect } from 'react';
import WalkthroughModal from './WalkthroughModal';
import { motion } from 'framer-motion';

export default function WalkthroughButton({
  videoId = 'v4Tx6QNV7-c',
  onVideoOpen,
  className = '',
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Close video on Escape key press
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && isVideoOpen) {
        setIsVideoOpen(false);
      }
    };

    if (isVideoOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isVideoOpen]);

  const handleClick = () => {
    setIsVideoOpen(true);
    if (onVideoOpen) {
      onVideoOpen();
    }
  };

  return (
    <>
      {/* Walkthrough Button Container */}
      <div
        className={`relative ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Expanding background pill - extends to the left */}
        <motion.div
          className="absolute top-0 h-10 bg-primary-color rounded-full shadow-lg z-10 overflow-hidden"
          style={{
            backgroundColor: 'var(--primary-color, #E79023)',
            right: 0, // Anchor to the right so it extends left
          }}
          initial={{ width: '40px' }}
          animate={{
            width: isHovered ? '145px' : '40px',
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
            duration: 0.4,
          }}
        >
          {/* Walkthrough text - positioned within the expanding background */}
          <motion.div
            className="absolute top-0 left-0 h-10 flex items-center justify-start pl-4"
            style={{ width: '130px' }}
            initial={{ opacity: 0, x: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : 20,
            }}
            transition={{
              opacity: { duration: 0.2, delay: isHovered ? 0.2 : 0 },
              x: { duration: 0.3, delay: isHovered ? 0.2 : 0 },
            }}
          >
            <span className="text-white font-medium text-sm whitespace-nowrap">
              Walkthrough
            </span>
          </motion.div>
        </motion.div>

        {/* Question mark circle - stays in fixed position on the right */}
        <motion.button
          className="relative z-20 w-10 h-10 bg-primary-color text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer flex items-center justify-center"
          style={{
            backgroundColor: 'var(--primary-color, #E79023)',
          }}
          onClick={handleClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ?
        </motion.button>
      </div>

      {/* Shared Modal */}
      <WalkthroughModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoId={videoId}
      />
    </>
  );
}
