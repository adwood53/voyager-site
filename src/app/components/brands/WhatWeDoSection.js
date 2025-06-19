'use client';

import { Card, CardBody, Button, Link } from '@heroui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function WhatWeDoSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [100, 0, 0, -100]
  );

  const howItWorks = [
    {
      step: '1',
      title: 'We embed your content into an NFC chip',
      description:
        'Your immersive experience is programmed into a tiny, invisible chip.',
      icon: '💾',
    },
    {
      step: '2',
      title: 'The audience taps with their phone',
      description:
        'No app download needed - works on all modern smartphones.',
      icon: '📱',
    },
    {
      step: '3',
      title: 'Your immersive story unfolds',
      description:
        'Right there, in their hands - 360° videos, AR magic, interactive content.',
      icon: '✨',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="what-we-do"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-darkBg to-darkCard relative"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-0 w-96 h-96 bg-primary rounded-full filter blur-3xl opacity-5"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>

      <motion.div
        className="container-voyager relative z-10"
        style={{ opacity, y }}
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="heading-voyager text-4xl md:text-5xl text-textLight mb-6"
          >
            <span className="text-primary">NFC-Driven</span> Immersive
            Marketing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl text-textLight opacity-90 max-w-2xl mx-auto mb-8"
          >
            No apps. No friction. Just tap and experience.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg text-textLight opacity-80 max-w-4xl mx-auto"
          >
            We turn everyday merchandise and marketing materials into
            immersive portals. Using NFC chips, people can tap their
            phone or scan a code and instantly enter your digital
            world—360 videos, interactive stories, or AR magic.
          </motion.p>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-heading text-primary text-center mb-12"
          >
            How it works:
          </motion.h3>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.2 },
                }}
                className="h-full"
              >
                <Card className="card-voyager h-full bg-darkCard border border-primary border-opacity-20 hover:border-opacity-50 transition-all duration-300 hover:shadow-glow-sm hover-3d">
                  <CardBody className="h-full flex flex-col text-center p-8">
                    <div className="text-5xl mb-4 animate-float">
                      {step.icon}
                    </div>
                    <div className="text-4xl font-heading text-primary mb-4">
                      {step.step}
                    </div>
                    <h4 className="font-subheading text-xl text-textLight mb-4">
                      {step.title}
                    </h4>
                    <p className="text-textLight opacity-70 flex-grow">
                      {step.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Compatibility */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center bg-darkCard border border-primary border-opacity-20 rounded-lg p-8"
        >
          <h4 className="text-xl font-heading text-primary mb-4">
            Works on:
          </h4>
          <p className="text-lg text-textLight opacity-90">
            All modern smartphones
          </p>
          <p className="text-sm text-textLight opacity-70 mt-2">
            Our experiences are also accessible via QR code.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
