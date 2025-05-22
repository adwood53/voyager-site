// src/app/components/dashboard/WalkthroughCard.js
'use client';

import { useState } from 'react';
import { Card, CardBody, Button } from '@heroui/react';
import { motion } from 'framer-motion';
import WalkthroughModal from './WalkthroughModal';

export default function WalkthroughCard({
  videoId = 'v4Tx6QNV7-c',
  className = '',
}) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleWatchNow = () => {
    setIsVideoOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={className}
      >
        <Card className="border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-gradient-to-br from-white to-gray-50">
          <CardBody className="p-0">
            <div className="relative">
              {/* Header Section with Gradient Background */}
              <div
                className="p-6 text-white relative overflow-hidden"
                style={{
                  background:
                    'linear-gradient(135deg, var(--primary-color, #E79023) 0%, #a6620c 100%)',
                }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <pattern
                        id="grid"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 20 0 L 0 0 0 20"
                          fill="none"
                          stroke="white"
                          strokeWidth="0.5"
                        />
                      </pattern>
                    </defs>
                    <rect
                      width="100%"
                      height="100%"
                      fill="url(#grid)"
                    />
                  </svg>
                </div>

                <div className="relative z-5 flex items-center gap-4">
                  {/* Play Button Icon */}
                  <motion.div
                    className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Button onPress={handleWatchNow}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-white ml-1"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </Button>
                  </motion.div>

                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      New to the Portal?
                    </h3>
                    <p className="text-white/90 text-lg">
                      Watch our 10-minute walkthrough
                    </p>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">
                    Get started in minutes
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Our guided walkthrough will show you how to:
                  </p>

                  <ul className="space-y-2 mb-6">
                    {[
                      'Navigate the partner dashboard',
                      'Create quotes and project proposals',
                      'Book studio time for productions',
                      'Access resources and templates',
                      'Manage your organisation settings',
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center gap-3 text-gray-700"
                      >
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{
                            backgroundColor:
                              'var(--primary-color, #E79023)',
                          }}
                        />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onPress={handleWatchNow}
                    className="flex-1 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    style={{
                      backgroundColor:
                        'var(--primary-color, #E79023)',
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mr-2"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Watch Walkthrough
                  </Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Shared Modal */}
      <WalkthroughModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoId={videoId}
      />
    </>
  );
}
