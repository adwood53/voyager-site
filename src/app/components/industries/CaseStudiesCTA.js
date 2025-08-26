/**
 * @fileoverview CaseStudiesCTA component - Banner that links to case-studies page
 *
 * Simple CTA banner section following the same pattern as other sections.
 */

'use client';

import { Button } from '@heroui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

export default function CaseStudiesCTA() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-gradient-to-br from-darkBg via-darkCard to-darkBg"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-altPrimary/15 rounded-full filter blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
          }}
        />
      </div>

      <motion.div
        className="container-voyager relative z-10"
        style={{ y, opacity }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="heading-voyager text-4xl md:text-5xl text-textLight mb-6"
          >
            See Our Work in{' '}
            <span className="text-primary">Action</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-textLight/80 mb-8 leading-relaxed"
          >
            Explore detailed case studies showcasing how we've
            transformed businesses across industries with immersive
            technology solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link href="/industries/case-studies">
              <Button
                size="lg"
                className="bg-primary text-darkBg hover:bg-accent font-semibold px-8 py-3"
              >
                Browse All Case Studies
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
