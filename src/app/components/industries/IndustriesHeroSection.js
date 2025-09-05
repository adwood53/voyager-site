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
          className="heading-voyager text-5xl md:text-6xl text-textLight mb-8"
        >
          Industries We{' '}
          <span className="text-primary">Transform</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-textLight/90 mb-12 max-w-3xl mx-auto"
        >
          From entertainment to education, we create immersive
          experiences that revolutionise how industries engage with
          their audiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            size="lg"
            className="bg-primary text-darkBg hover:bg-accent"
            onClick={() => {
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
