'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Simple loading component
const LoadingSpinner = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-darkBg flex items-center justify-center z-50"
  >
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <h1 className="text-primary text-2xl font-heading font-bold">
        VOYAGER
      </h1>
      <p className="text-textLight opacity-70 text-sm mt-2">
        Loading experience...
      </p>
    </div>
  </motion.div>
);

// CSS-based particle background
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated background particles */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-20"
          style={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            backgroundColor:
              i % 2 === 0 ? 'var(--primary)' : 'var(--alt-primary)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

// Animated VOYAGER text that transitions to logo
const VoyagerTitle = () => {
  const [showText, setShowText] = useState(true);
  const letters = 'VOYAGER'.split('');

  useEffect(() => {
    // Start transitioning to logo after the text animation completes
    const timer = setTimeout(() => {
      setShowText(false);
    }, 4000); // 4 seconds for text display

    return () => clearTimeout(timer);
  }, []);

  // Fixed VoyagerTitle component - replace the return statement in VoyagerTitle

  return (
    // FIXED: Add top padding for mobile navbar and adjust centering
    <div className="flex items-center justify-center min-h-screen relative z-10 pt-24 lg:pt-0">
      <div className="text-center px-4">
        <AnimatePresence mode="wait">
          {showText ? (
            // VOYAGER Text
            <motion.div
              key="text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold tracking-wider">
                {letters.map((letter, index) => (
                  <motion.span
                    key={index}
                    className={`inline-block ${
                      index % 2 === 0
                        ? 'text-primary'
                        : 'text-altPrimary'
                    }`}
                    initial={{
                      opacity: 0,
                      y: 50,
                      rotateX: -90,
                      scale: 0.5,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      scale: 1,
                    }}
                    transition={{
                      delay: 0.5 + index * 0.1,
                      duration: 0.8,
                      type: 'spring',
                      stiffness: 100,
                    }}
                    whileHover={{
                      scale: 1.1,
                      textShadow: '0 0 20px rgba(231, 144, 35, 0.8)',
                      transition: { duration: 0.2 },
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </h1>

              {/* Subtle glow effect */}
              <motion.div
                className="absolute inset-0 text-6xl md:text-8xl lg:text-9xl font-heading font-bold tracking-wider text-primary opacity-20 blur-md"
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                VOYAGER
              </motion.div>
            </motion.div>
          ) : (
            // Logo
            <motion.div
              key="logo"
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 1.2,
                type: 'spring',
                stiffness: 100,
                damping: 15,
              }}
              className="relative"
            >
              <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto mb-6">
                <Image
                  src="/Voyager-Box-Logo.png"
                  alt="Voyager Logo"
                  fill
                  className="object-contain"
                  priority
                />

                {/* Glow effect around logo */}
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  style={{
                    boxShadow: '0 0 40px rgba(231, 144, 35, 0.3)',
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(231, 144, 35, 0.2)',
                      '0 0 40px rgba(231, 144, 35, 0.4)',
                      '0 0 20px rgba(231, 144, 35, 0.2)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>

              {/* Company name */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary mb-2"
              >
                VOYAGER
              </motion.h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtitle - always visible */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: showText ? 2.5 : 1.5, duration: 0.8 }}
          className="text-textLight text-lg md:text-xl mt-6 opacity-80 font-body"
        >
          Immersive experiences that captivate and inspire
        </motion.p>
      </div>
    </div>
  );
};

// Clean, responsive navigation buttons with loading states
const NavigationButtons = () => {
  const router = useRouter();
  const [loadingButton, setLoadingButton] = useState(null);
  const [globalLoading, setGlobalLoading] = useState(false);

  const buttons = [
    {
      label: 'For Brands',
      href: '/for-brands',
      variant: 'primary',
      type: 'internal',
    },
    {
      label: 'For Partners',
      href: '/for-partners',
      variant: 'secondary',
      type: 'internal',
    },
    {
      label: 'Play',
      href: 'https://immerse.voyagervrlab.co.uk/VOY/Voyager/SugarSkullFrenzy',
      variant: 'tertiary',
      type: 'external',
    },
  ];

  const handleButtonClick = async (button, index) => {
    setLoadingButton(index);

    if (button.type === 'external') {
      // For external links, open in new tab and reset loading after a short delay
      window.open(button.href, '_blank', 'noopener,noreferrer');
      setTimeout(() => {
        setLoadingButton(null);
      }, 1000);
    } else {
      // For internal navigation, show global loading and navigate
      setGlobalLoading(true);
      try {
        await router.push(button.href);
      } catch (error) {
        console.error('Navigation error:', error);
        setLoadingButton(null);
        setGlobalLoading(false);
      }
    }
  };

  return (
    <>
      {/* Global loading overlay for internal navigation */}
      <AnimatePresence>
        {globalLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-darkBg bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-textLight text-lg font-heading">
                Loading...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 5, duration: 0.8 }}
        className="fixed bottom-8 left-0 right-0 z-20 flex justify-center px-4"
      >
        <div className="w-full max-w-lg">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
            {buttons.map((button, index) => (
              <motion.button
                key={button.label}
                onClick={() => router.push(button.href)}
                className={`
                px-4 py-3 rounded-lg font-medium transition-all duration-300
                text-sm font-heading w-full text-center
                hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50
                ${
                  button.variant === 'primary'
                    ? 'bg-primary text-textLight hover:bg-accent focus:ring-primary shadow-glow-sm hover:shadow-glow'
                    : button.variant === 'secondary'
                      ? 'bg-altPrimary text-textLight hover:bg-altAccent focus:ring-altPrimary'
                      : 'border-2 border-primary text-primary hover:bg-primary hover:text-textLight focus:ring-primary'
                }
              `}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 5.2 + index * 0.1,
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 120,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                }}
                whileTap={{ scale: 0.95 }}
              >
                {button.label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

// Main homepage component
export default function VoyagerHomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-darkBg text-textLight overflow-hidden relative">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingSpinner />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <ParticleBackground />
          <VoyagerTitle />
          <NavigationButtons />
        </>
      )}
    </main>
  );
}
