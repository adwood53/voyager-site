/**
 * @fileoverview IndustriesHeroSection component
 *
 * Hero section for industries page following existing hero section patterns.
 */

'use client';

import { Button } from '@heroui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function IndustriesHeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacityHeader = useTransform(
    scrollYProgress,
    [0, 0.8],
    [1, 0]
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-darkBg"
    >
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-gradient-to-b from-darkBg via-darkBg/60 to-darkBg z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-altPrimary/20"></div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute z-10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 40 - 20, 0],
            y: [0, Math.random() * 40 - 20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div
            className="rounded-full blur-sm"
            style={{
              width: `${Math.random() * 250 + 3}px`,
              height: `${Math.random() * 250 + 3}px`,
              background: i % 2 === 0 ? '#e79023' : '#7466e2',
            }}
          />
        </motion.div>
      ))}

      <motion.div
        className="container-voyager relative z-40 text-center"
        style={{ y: textY, opacity: opacityHeader }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="heading-voyager text-6xl md:text-8xl text-textLight mb-8"
        >
          <span className="text-primary">Industries</span>
          <span className="text-4xl px-4 text-bold">
            {'   '}We{'   '}
          </span>
          <span className="text-altPrimary">Elevate</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl font-medium text-textLight/90 mb-12 max-w-3xl mx-auto"
        >
          <strong className="font-bold">
            <span className="text-primary text-3xl">Voyager</span> is{' '}
            your{' '}
            <span className="text-primary text-3xl">
              creative technology partner
            </span>
          </strong>
          <br />
          <br />
          The engine behind immersive campaigns that don&apos;t just
          get seen, they get remembered. Whatever the industry, we
          give you the tools to grab attention, collect real insights,
          and turn passive audiences into active participants.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            className="bg-transparent border-2 border-primary text-primary font-semibold px-8 py-4 rounded-md hover:bg-primary hover:text-textLight transition-all hover:scale-105 transform !text-xs !md:text-lg"
            onPress={() => {
              document
                .getElementById('industries')
                .scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore Industries
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
