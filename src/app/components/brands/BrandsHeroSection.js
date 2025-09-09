'use client';

import { Button, Link } from '@heroui/react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { useRef } from 'react';

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
      {/* Cinematic video background with parallax effect */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <video
          className="w-full h-full object-cover opacity-20"
          autoPlay
          loop
          muted
          playsInline
          webkitPlaysinline="true"
        >
          <source src="/videos/drift.mp4" type="video/mp4" />
        </video>
      </motion.div>

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
          <h1 className="heading-voyager text-2xl md:text-6xl lg:text-7xl text-textLight mb-4 md:mb-8">
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
            In today&apos;s world,{' '}
            <strong>
              <span className="text-primary">Attention</span>
            </strong>{' '}
            is{' '}
            <strong>
              <span className="text-altPrimary">Currency</span>
            </strong>
            .{' '}
            <strong>
              <span className="text-primary">Data</span>
            </strong>{' '}
            is{' '}
            <strong>
              <span className="text-altPrimary">King</span>
            </strong>
            .{' '}
            <strong>
              <span className="text-primary">Content</span>
            </strong>{' '}
            is{' '}
            <strong>
              <span className="text-altPrimary">Queen</span>
            </strong>
            .
            <br />
            <span className="text-white font-medium">
              But most brands are still pushing the same playbook -
              generic{' '}
              <strong className="text-altPrimary">
                &quot;BS&quot;{' '}
              </strong>
              that disappears in the scroll. <br />{' '}
              <br className="hidden md:inline" />{' '}
              <strong className="text-white hidden md:inline">
                We don&apos;t do that.
              </strong>{' '}
              <br /> <br className="hidden md:inline" />
              Voyager is on a mission to help bold brands create
              campaigns that don&apos;t just get seen - they get felt.
              Campaigns that grab attention, collect real insights,
              and turn audiences into participants.
            </span>
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-row gap-4 justify-center items-center"
          >
            <Button
              as={Link}
              href="/about-us"
              className="bg-transparent border-2 border-primary text-primary font-semibold px-8 py-4 rounded-md hover:bg-primary hover:text-textLight transition-all hover:scale-105 transform !text-xs !md:text-lg"
            >
              Explore Voyager
            </Button>
            <Button
              as={Link}
              href="https://calendly.com/staceylwragg/voyager"
              className="bg-altPrimary text-textLight font-semibold px-8 py-4 rounded-md hover:bg-altAccent transition-all hover:scale-105 transform !text-xs !md:text-lg"
            >
              Book a Discovery Call
            </Button>
          </motion.div>
        </motion.div>
        {/* Scroll Indicator */}
        <AnimatePresence>
          <motion.div
            className="absolute bottom-[-80] left-1/2 transform -translate-x-1/2 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <motion.div
              className="flex flex-col items-center text-primary"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-sm font-medium mb-2">
                Discover More
              </span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
