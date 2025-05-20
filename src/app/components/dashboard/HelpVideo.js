// src/app/components/dashboard/HelpVideo.js
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@heroui/react';

export default function HelpVideo({ videoId = 'dQw4w9WgXcQ' }) {
  const [isOpen, setIsOpen] = useState(false);

  // Close video on Escape key press
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscapeKey);

    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  // Toggle video visibility
  const toggleVideo = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Help button */}
      <Button
        isIconOnly
        size="sm"
        variant="light"
        aria-label="Help video"
        onClick={toggleVideo}
        className="text-gray-600 hover:text-primary-color transition-colors rounded-full w-8 h-8 flex items-center justify-center"
        style={{ color: 'var(--primary-color, #E79023)' }}
      >
        <span className="text-lg font-semibold">?</span>
      </Button>

      {/* Video modal with blur overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-50"
            onClick={() => setIsOpen(false)}
          >
            {/* Blurred backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

            {/* Video container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-full max-w-3xl mx-4"
              onClick={(e) => e.stopPropagation()} // Prevent clicks from closing when clicking on video
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-10 right-0 text-white hover:text-primary transition-colors z-20 w-8 h-8 flex items-center justify-center"
                aria-label="Close video"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {/* YouTube embed - responsive */}
              <div className="relative aspect-video w-full shadow-2xl rounded-lg overflow-hidden border border-gray-700">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
