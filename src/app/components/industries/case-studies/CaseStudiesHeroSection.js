/**
 * @fileoverview CaseStudiesHeroSection component
 *
 * Hero section for the case studies page showcasing Voyager's
 * proprietary technology and custom-built experiences.
 */

'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@heroui/react';

export default function CaseStudiesHeroSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary rounded-full filter blur-3xl"
          style={{ opacity: 0.08, y }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-altPrimary rounded-full filter blur-3xl"
          style={{
            opacity: 0.06,
            y: useTransform(scrollYProgress, [0, 1], ['0%', '30%']),
          }}
          animate={{
            scale: [1, 1.3, 1],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>

      <motion.div
        className="container-voyager text-center relative z-10"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="heading-voyager text-5xl lg:text-7xl text-textLight mb-6">
            Our <span className="text-primary">Work</span>
          </h1>
          <p className="text-xl lg:text-2xl text-textLight/80 mb-8 leading-relaxed">
            Case Studies
          </p>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-textLight/70 leading-relaxed">
              We use our own{' '}
              <strong className="text-primary">
                proprietary technology
              </strong>
              , meaning we don't shoehorn you into a pre-built
              template. Instead, we build your experience your way -
              flexibly, creatively, and without licensing constraints.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            size="lg"
            className="bg-primary text-darkBg my-6 hover:bg-accent"
            onPress={() =>
              window.open(
                'https://immerse.voyagerstudio.co.uk/VOY/Voyager/Case-Study'
              )
            }
          >
            View our Case Studies in Immersive
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
