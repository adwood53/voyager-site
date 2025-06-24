'use client';

import { Button, Link } from '@heroui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const opacityHeader = useTransform(
    scrollYProgress,
    [0, 0.8],
    [1, 0]
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-darkBg"
      style={{ marginTop: '0' }}
    >
      {/* Cinematic video background with parallax effect */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-gradient-to-b from-darkBg via-darkBg/60 to-darkBg z-10"></div>
      </motion.div>

      {/* Floating particles/elements for depth */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full z-10"
          style={{
            backgroundColor:
              i % 2 === 0 ? 'var(--primary)' : 'var(--alt-primary)',
            opacity: 0.2 + Math.random() * 0.2,
            width: Math.random() * 200 + 50,
            height: Math.random() * 200 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(2px)',
          }}
          animate={{
            x: [0, Math.random() * 40 - 20],
            y: [0, Math.random() * 40 - 20],
            scale: [1, 1 + Math.random() * 0.1],
            rotate: [0, Math.random() * 20 - 10],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Hero content with parallax effect */}
      <motion.div
        className="container-voyager relative z-20"
        style={{ y: textY, opacity: opacityHeader }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl"
        >
          {/* Contract animation with "Your Branding" effect */}
          <motion.div
            className="bg-primary bg-opacity-20 p-3 mb-8 inline-block rounded-md border border-primary border-opacity-40 shadow-glow-sm"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.div
              className="text-primary font-mono text-sm font-semibold overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, delay: 1 }}
            ></motion.div>
          </motion.div>

          <motion.h1
            className="heading-voyager text-5xl md:text-6xl lg:text-7xl text-textLight mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <span className="block mb-2 animate-float">
              Expand Your Services.
            </span>
            <span className="block mb-2 text-primary animate-tilt">
              Elevate Your Brand.
            </span>
            <span className="block">Earn More.</span>
          </motion.h1>

          <motion.p
            className="text-xl text-textLight text-opacity-90 mb-10 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            You bring the clients. We bring the immersive tech. From
            AR and VR to interactive events and gamification. Our
            white-label solutions help you sell bigger, without the
            overhead.
          </motion.p>

          {/* Enhanced navigation buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
            className="flex flex-col md:flex-row gap-3 justify-left items-left max-w-2xl"
          >
            {/* For Brands Button */}
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
              className="relative group w-full md:w-auto"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-40"
                animate={{
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
              <Button
                as={Link}
                href="/waitlist"
                className="relative bg-primary text-textLight font-bold px-12 py-4 rounded-lg text-lg hover:bg-accent transition-all duration-300 w-full md:w-auto border-2 border-transparent hover:border-primary/50 shadow-lg"
              >
                <span className="flex items-center gap-3">
                  <span>🏢</span>
                  Sign Up
                  <motion.span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </motion.span>
                </span>
              </Button>
            </motion.div>

            {/* Animated connector */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 3 }}
              className="hidden md:block text-2xl text-textLight opacity-40"
            >
              <motion.span
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              >
                or
              </motion.span>
            </motion.div>

            {/* For Partners Button */}
            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
              className="relative group w-full md:w-auto"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-altPrimary to-purple-500 rounded-lg blur opacity-40"
                animate={{
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 1,
                }}
              />
              <Button
                as={Link}
                href="/how"
                className="relative bg-transparent border-2 border-altPrimary text-altPrimary font-bold px-12 py-4 rounded-lg text-lg hover:bg-altPrimary hover:text-textLight transition-all duration-300 w-full md:w-auto shadow-lg"
              >
                <span className="flex items-center gap-3">
                  <span>🤝</span>
                  How It Works
                  <motion.span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </motion.span>
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scrolling indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 0 }}
        animate={{
          opacity: 1,
          y: [0, 12, 0],
        }}
        transition={{
          y: {
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          },
          opacity: {
            duration: 0.5,
            delay: 2,
          },
        }}
      >
        <div className="h-14 w-8 border-2 border-primary border-opacity-50 rounded-full flex justify-center shadow-glow-sm">
          <motion.div
            className="h-3 w-3 bg-primary rounded-full"
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
