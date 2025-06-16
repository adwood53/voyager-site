'use client';

import { Button, Link } from '@heroui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function BrandsHeroSection() {
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
      {/* Cinematic background with parallax effect */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-gradient-to-b from-darkBg via-darkBg/60 to-darkBg z-10"></div>
        <Image
          src="/placeholder.jpg"
          alt="NFC Marketing Experience"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Floating particles for depth */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full z-10"
          style={{
            backgroundColor:
              i % 2 === 0
                ? 'rgba(231, 144, 35, 0.1)'
                : 'rgba(116, 102, 226, 0.08)',
            width: `${Math.random() * 6 + 4}px`,
            height: `${Math.random() * 6 + 4}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Main content */}
      <motion.div
        className="container-voyager relative z-20 text-center py-20"
        style={{ y: textY, opacity: opacityHeader }}
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        >
          {/* Header */}
          <h1 className="heading-voyager text-4xl md:text-6xl lg:text-7xl text-textLight mb-8">
            Creating <span className="text-primary">Next-Level</span>{' '}
            Campaigns
            <br />
            for the{' '}
            <span className="text-altPrimary">
              Next Generation
            </span>{' '}
            of Brands
          </h1>

          {/* Subheader */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl lg:text-2xl text-textLight opacity-90 max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            We help bold brands create campaigns that don't just get
            seen - they get felt.
            <br />
            <span className="text-primary font-medium">
              Because when people can explore, touch, and play - they
              don't just watch your brand, they experience it. They
              remember it.
            </span>
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              as={Link}
              href="#products"
              className="bg-primary text-textLight font-semibold px-8 py-4 rounded-md hover:bg-accent transition-all hover:scale-105 transform hover:shadow-glow-lg text-lg"
            >
              View Products
            </Button>
            <Button
              as={Link}
              href="#experiences"
              className="bg-transparent border-2 border-primary text-primary font-semibold px-8 py-4 rounded-md hover:bg-primary hover:text-textLight transition-all hover:scale-105 transform text-lg"
            >
              Explore Experiences
            </Button>
            <Button
              as={Link}
              href="#contact"
              className="bg-altPrimary text-textLight font-semibold px-8 py-4 rounded-md hover:bg-altAccent transition-all hover:scale-105 transform text-lg"
            >
              Book a Discovery Call
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-primary text-2xl"
          >
            ↓
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
