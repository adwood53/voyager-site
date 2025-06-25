'use client';

import { Button, Link } from '@heroui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HowHeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '80%']);
  const opacityHeader = useTransform(
    scrollYProgress,
    [0, 0.8],
    [1, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  // Floating animation variant
  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-darkBg"
      style={{ marginTop: '0' }}
    >
      {/* Cinematic background with enhanced effects */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-gradient-to-b from-darkBg via-darkBg/30 to-darkBg z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-altPrimary/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(231,144,35,0.1),transparent_70%)]"></div>
        <video
          className="w-full h-full object-cover opacity-25"
          autoPlay
          loop
          muted
          playsInline
          webkitPlaysinline="true"
        >
          <source src="/videos/drift.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Enhanced particle system */}
      {[...Array(20)].map((_, i) => (
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
            scale: [1, Math.random() * 0.3 + 0.9, 1],
            opacity: [0.2, Math.random() * 0.4 + 0.4, 0.2],
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut',
          }}
        >
          <div
            className="rounded-full blur-sm"
            style={{
              width: `${Math.random() * 8 + 3}px`,
              height: `${Math.random() * 8 + 3}px`,
              background:
                i % 3 === 0
                  ? 'linear-gradient(45deg, #e79023, #a6620c)'
                  : i % 3 === 1
                    ? 'linear-gradient(45deg, #7466e2, #5b4bc4)'
                    : 'linear-gradient(45deg, #fff, #e0e0e0)',
            }}
          />
        </motion.div>
      ))}

      {/* Geometric background shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute opacity-5 z-5"
          style={{
            left: `${(i * 15) % 100}%`,
            top: `${(i * 23) % 100}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div
            className={`border-2 ${
              i % 3 === 0
                ? 'border-primary'
                : i % 3 === 1
                  ? 'border-altPrimary'
                  : 'border-white'
            } ${i % 2 === 0 ? 'rounded-full' : 'rotate-45'}`}
            style={{
              width: `${60 + i * 10}px`,
              height: `${60 + i * 10}px`,
            }}
          />
        </motion.div>
      ))}

      {/* Main content with enhanced animations */}
      <motion.div
        className="container-voyager relative z-20 text-center py-20"
        style={{ y: textY, opacity: opacityHeader, scale }}
      >
        {/* Animated main title */}
        <div className="heading-voyager text-4xl md:text-6xl lg:text-7xl text-textLight mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            How We Transform{' '}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-primary inline-block"
          >
            <motion.span
              animate={{
                textShadow: [
                  '0 0 20px rgba(231, 144, 35, 0.5)',
                  '0 0 40px rgba(231, 144, 35, 0.8)',
                  '0 0 20px rgba(231, 144, 35, 0.5)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Ideas
            </motion.span>
          </motion.div>

          <br />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            Into{' '}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="text-altPrimary inline-block"
          >
            <motion.span
              animate={{
                textShadow: [
                  '0 0 20px rgba(116, 102, 226, 0.5)',
                  '0 0 40px rgba(116, 102, 226, 0.8)',
                  '0 0 20px rgba(116, 102, 226, 0.5)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            >
              Immersive Experiences
            </motion.span>
          </motion.div>
        </div>

        {/* Animated subheader */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 3, type: 'spring' }}
          className="text-lg md:text-xl lg:text-2xl text-textLight opacity-90 max-w-4xl mx-auto mb-12 leading-relaxed"
        >
          <motion.p
            animate={{ opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            We offer more than tech. We offer the tools, talent, and
            strategy to turn ideas into unforgettable experiences.
            <br />
            <motion.span
              className="text-primary font-medium"
              animate={{
                textShadow: [
                  '0 0 20px rgba(231, 144, 35, 0.5)',
                  '0 0 40px rgba(231, 144, 35, 0.8)',
                  '0 0 20px rgba(231, 144, 35, 0.5)',
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: 1,
              }}
            >
              Choose your path and discover how we can amplify your
              vision.
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Enhanced navigation buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center max-w-2xl mx-auto"
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
              href="/for-brands"
              className="relative bg-primary text-textLight font-bold px-12 py-4 rounded-lg text-lg hover:bg-accent transition-all duration-300 w-full md:w-auto border-2 border-transparent hover:border-primary/50 shadow-lg"
            >
              <span className="flex items-center gap-3">
                <span>🏢</span>
                For Brands
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
              href="/for-partners"
              className="relative bg-transparent border-2 border-altPrimary text-altPrimary font-bold px-12 py-4 rounded-lg text-lg hover:bg-altPrimary hover:text-textLight transition-all duration-300 w-full md:w-auto shadow-lg"
            >
              <span className="flex items-center gap-3">
                <span>🤝</span>
                For Partners
                <motion.span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </motion.span>
              </span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Enhanced context indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.5 }}
          className="mt-12 flex flex-col md:flex-row justify-center items-center gap-8 text-sm text-textLight opacity-60"
        >
          <motion.div
            className="flex items-center gap-2"
            animate={{ opacity: [0.6, 0.8, 0.6] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <motion.span
              className="w-2 h-2 bg-primary rounded-full"
              animate={{
                boxShadow: [
                  '0 0 5px rgba(231, 144, 35, 0.5)',
                  '0 0 10px rgba(231, 144, 35, 0.8)',
                  '0 0 5px rgba(231, 144, 35, 0.5)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            Brands: End-to-end immersive campaigns
          </motion.div>
          <motion.div
            className="flex items-center gap-2"
            animate={{ opacity: [0.6, 0.8, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          >
            <motion.span
              className="w-2 h-2 bg-altPrimary rounded-full"
              animate={{
                boxShadow: [
                  '0 0 5px rgba(116, 102, 226, 0.5)',
                  '0 0 10px rgba(116, 102, 226, 0.8)',
                  '0 0 5px rgba(116, 102, 226, 0.5)',
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 1.5,
              }}
            />
            Partners: White-label solutions & collaboration
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
