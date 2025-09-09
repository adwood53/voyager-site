/**
 * @fileoverview WhatWeDoSection component for the Voyager brands page
 *
 * This component showcases Voyager's proprietary Vcode technology and process flow.
 * Features information about their flexible, brandable NFC/QR framework and
 * the seamless process from design to deployment across various materials.
 *
 * Features:
 * - Vcode technology overview and benefits
 * - Interactive experience types showcase
 * - Step-by-step process flow with animations
 * - Material compatibility examples
 * - Device compatibility indicators
 * - Scroll-based parallax animations using Framer Motion
 *
 * @author Voyager Development Team
 * @version 3.0.0 - Complete redesign focusing on Vcode technology and process
 * @since 2024
 */

'use client';

import { Card, CardBody, Chip, Button } from '@heroui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useModal } from '../modal/core/ModalEngine';
import { JotFormModal } from '../modal/types/ModalTypes';

export default function WhatWeDoSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const { openModal } = useModal();
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

  /**
   * Experience types available through Vcode
   */
  const experiences = [
    {
      title: 'Augmented Reality',
      icon: '🔮',
      description: 'Overlay digital content onto the real world',
      color: 'primary',
    },
    {
      title: 'AR Filter Lens',
      icon: '📸',
      description: 'Face filters and camera effects',
      color: 'secondary',
    },
    {
      title: 'Mini Games',
      icon: '🎮',
      description: 'Interactive games and challenges',
      color: 'success',
    },
    {
      title: '360 Virtual Experience',
      icon: '🌐',
      description: 'Immersive 360-degree environments',
      color: 'warning',
    },
    {
      title: 'Virtual Reality',
      icon: '🥽',
      description: 'Full VR experiences for headsets',
      color: 'danger',
    },
  ];

  /**
   * Process steps from design to deployment
   */
  const processSteps = [
    {
      step: '1',
      title: 'We design and code your experience',
      description: 'Based on your story, your goals and imagination!',
      icon: '💡',
      image: '/ideas/submit-idea.webp',
    },
    {
      step: '2',
      title: 'We embed your experience into an NFC chip or QR code',
      description:
        'We will suggest which will be better for you, depending on your campaign style.',
      icon: '💾',
      image: '/vip-logo.jpg',
    },
    {
      step: '3',
      title:
        'We embed the NFC chip or QR code into the materials you choose',
      description:
        'Hoodies, Mugs, Vcards, Notebooks, Brochures, Banners - we can make ANYTHING immersive',
      icon: '🎯',
      image: '/products/bundle.webp',
    },
    {
      step: '4',
      title: 'The audience taps or scans your merch with their phone',
      description:
        'No app download needed - works on all modern smartphones.',
      icon: '📱',
      image: '/brand-services/hyrox2.webp',
    },
    {
      step: '5',
      title: 'Your immersive story unfolds',
      description:
        'Right there, in their hands - 360° videos, AR magic, interactive content.',
      icon: '✨',
      image: '/brand-services/virtualworlds.webp',
    },
  ];

  /**
   * Compatible materials examples
   */
  const materials = [
    'Hoodies',
    'Mugs',
    'Vcards',
    'Notebooks',
    'Brochures',
    'Banners',
    'Business Cards',
    'Packaging',
  ];

  /**
   * Device compatibility
   */
  const devices = [
    { name: 'Phone', icon: '📱' },
    { name: 'Desktop', icon: '💻' },
    { name: 'VR Headset', icon: '🥽' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
      },
    },
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
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-altPrimary rounded-full filter blur-3xl opacity-5"
          animate={{
            scale: [1, 1.3, 1],
            y: [0, 30, 0],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>

      <motion.div
        className="container-voyager relative z-10"
        style={{ opacity, y }}
      >
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="heading-voyager text-5xl md:text-6xl text-textLight mb-8"
          >
            <span className="text-primary">No apps.</span> No
            friction.
            <br />
            Just tap and experience.
          </motion.h2>
        </div>

        {/* What is Vcode Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <Card className="card-voyager bg-gradient-to-r from-primary/10 to-altPrimary/10 border border-primary border-opacity-30">
              <CardBody className="p-8 md:p-12">
                <h3 className="heading-voyager text-3xl md:text-4xl text-center text-primary mb-6">
                  What is Vcode?
                </h3>
                <p className="text-xl md:text-2xl text-textLight leading-relaxed">
                  Our{' '}
                  <span className="text-primary font-bold">
                    proprietary technology (Vcode) {''}
                  </span>
                  powers every activation. No apps. No subscriptions.
                  No barriers. Just instant, interactive connection
                  between your brand and your audience.
                </p>
              </CardBody>
            </Card>
          </div>
          <div className="text-center mb-12">
            <h3 className="heading-voyager text-3xl md:text-4xl text-altPrimary mb-6">
              What does Vcode Activate?
            </h3>
          </div>
          {/* Experience Types Grid - Centered Layout */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                variants={item}
                className="w-full sm:w-72 md:w-80 lg:w-72 max-w-sm"
              >
                <Card className="card-voyager h-full bg-darkCard border border-primary border-opacity-20 hover:border-opacity-50 transition-all duration-300 hover:shadow-glow-sm group">
                  <CardBody className="text-center p-6">
                    <motion.div
                      className="text-4xl mb-4"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {experience.icon}
                    </motion.div>
                    <h4 className="font-heading text-lg text-textLight mb-3 leading-tight">
                      {experience.title}
                    </h4>
                    <p className="text-textLight/70 text-sm">
                      {experience.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* The Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h3 className="heading-voyager text-3xl md:text-4xl text-textLight mb-4">
              The Process
            </h3>
            <p className="text-2xl text-primary font-medium">
              Simple. Seamless.
            </p>
          </div>

          {/* Process Steps */}
          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -50 : 50,
                }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content Side */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-darkBg font-bold text-xl">
                      {step.step}
                    </div>
                    <div className="text-3xl">{step.icon}</div>
                  </div>

                  <h4 className="font-heading text-xl md:text-2xl text-textLight mb-4 leading-tight">
                    {step.title}
                  </h4>

                  <p className="text-textLight/80 text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Image Side */}
                <div className="flex-1 max-w-md">
                  <Card className="card-voyager overflow-hidden border border-primary border-opacity-30">
                    <div className="relative aspect-video">
                      <Image
                        src={step.image}
                        alt={`Step ${step.step}: ${step.title}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Materials & Compatibility Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Materials */}
            <Card className="card-voyager bg-darkCard border border-primary border-opacity-30">
              <CardBody className="p-8">
                <h4 className="font-heading text-2xl text-primary mb-6 text-center">
                  We Make ANYTHING Immersive
                </h4>
                <div className="flex flex-wrap justify-center gap-3">
                  {materials.map((material, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.05,
                      }}
                      viewport={{ once: true }}
                    >
                      <Chip
                        size="md"
                        variant="flat"
                        color="primary"
                        className="text-sm font-medium"
                      >
                        {material}
                      </Chip>
                    </motion.div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Device Compatibility */}
            <Card className="card-voyager bg-darkCard border border-primary border-opacity-30">
              <CardBody className="p-8">
                <h4 className="font-heading text-2xl text-primary mb-6 text-center">
                  Compatible With
                </h4>
                <div className="grid grid-cols-3 gap-6">
                  {devices.map((device, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.1,
                      }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <motion.div
                        className="text-4xl mb-3"
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.3 }}
                      >
                        {device.icon}
                      </motion.div>
                      <p className="text-textLight font-medium">
                        {device.name}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="card-voyager bg-gradient-to-r from-primary/10 to-altPrimary/10 border border-primary border-opacity-30 max-w-4xl mx-auto">
            <CardBody className="p-8">
              <h3 className="text-2xl md:text-3xl font-heading text-primary mb-4">
                Ready to Make Your Brand Immersive?
              </h3>
              <p className="text-textLight opacity-80 mb-6 text-lg">
                Let&apos;s create something extraordinary with Vcode
                technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onPress={() =>
                    openModal(JotFormModal, {
                      isOpen: true,
                      formId: '251762903523052',
                      title: 'Build your Custom Experience!',
                      onSubmit: (data) => {
                        console.log('Form submitted:', data);
                      },
                    })
                  }
                  className=" px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-accent transition-colors duration-300"
                >
                  Start Your Project
                </Button>
                <Button
                  href="#signup"
                  className=" px-8 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors duration-300"
                >
                  Learn More About Vcode
                </Button>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}
