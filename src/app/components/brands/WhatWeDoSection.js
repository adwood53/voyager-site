/**
 * @fileoverview WhatWeDoSection component for the Voyager brands page
 *
 * This component displays an interactive grid of service cards with 3D flip animations.
 * Each card shows detailed service information on the front with a darkened background image,
 * and plays a video when flipped to the back side. Cards maintain a 16:9 aspect ratio.
 *
 * Features:
 * - Interactive service grid with 3D flip animations on click only
 * - 9:16 aspect ratio cards with responsive centered layout
 * - Single card flip state management (only one card flipped at a time)
 * - Video playback on card flip (back side)
 * - Detailed service information with darkened background images (front side)
 * - Animated question mark emoji that flips with the cards
 * - Scroll-based parallax animations using Framer Motion
 * - Hover scale effects (no flip on hover)
 *
 * @author Voyager Development Team
 * @version 2.1.0 - Fixed state management, centering, and hover behavior
 * @since 2024
 */

'use client';

import { Card, CardBody, Chip } from '@heroui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

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

  // State to track which card is currently flipped (only one at a time)
  const [flippedCard, setFlippedCard] = useState(null);

  /**
   * Service data with enhanced information for detailed front cards
   * Images selected logically based on service descriptions:
   * - AR: Exhibition stall (product displays/scanning setups)
   * - VR: Virtual worlds (perfect match for digital environments)
   * - 360° Tours: Studio background (venue/space for tours)
   * - LMS: Team photo (training/education context)
   * - Gamification: Sports event (competition/engagement)
   */
  const services = [
    {
      title: 'Augmented Reality (AR)',
      shortTitle: 'AR',
      description:
        'Packaging, posters, and products that unlock stories, offers, or experiences with a single scan.',
      detailedDescription:
        'Transform physical materials into interactive digital gateways. Perfect for product launches, marketing campaigns, and customer engagement.',
      icon: '📱',
      backgroundImage: '/hyrox2.jpg',
      videoSrc: '/videos/drift.mp4',
      color: 'primary',
      benefits: [
        'No app downloads',
        'Works on any phone',
        'Instant engagement',
        'Rich analytics',
      ],
    },
    {
      title: 'Virtual Reality (VR)',
      shortTitle: 'VR',
      description:
        'Fully digital worlds that transport your audience into your story. Perfect for launches, training, and premium brand activations.',
      detailedDescription:
        'Create immersive digital environments that fully engage your audience. Ideal for premium experiences and memorable brand moments.',
      icon: '🥽',
      backgroundImage: '/lfd-stall.webp',
      videoSrc: '/videos/drift.mp4',
      color: 'secondary',
      benefits: [
        'Full immersion',
        'Memorable experiences',
        'Premium positioning',
        'Training capabilities',
      ],
    },
    {
      title: '360° Virtual Tours',
      shortTitle: '360° Tours',
      description:
        'Retail spaces, cultural venues, or showrooms your audience can step into from anywhere.',
      detailedDescription:
        'Bring remote audiences into your physical spaces. Perfect for real estate, retail, museums, and venue showcasing.',
      icon: '🌐',
      backgroundImage: '/virtualworlds.jpg',
      videoSrc: '/videos/drift.mp4',
      color: 'success',
      benefits: [
        'Remote accessibility',
        'Detailed exploration',
        'Always available',
        'Global reach',
      ],
    },
    {
      title: 'Learning Management Systems (LMS)',
      shortTitle: 'LMS',
      description:
        'Smart, gamified platforms that turn training and education into something people actually want to do.',
      detailedDescription:
        'Revolutionize learning with interactive, engaging educational experiences that boost completion rates and knowledge retention.',
      icon: '🎓',
      backgroundImage: '/team.webp',
      videoSrc: '/videos/drift.mp4',
      color: 'warning',
      benefits: [
        'Gamified learning',
        'Higher engagement',
        'Progress tracking',
        'Interactive content',
      ],
    },
    {
      title: 'Gamified Experiences',
      shortTitle: 'Gamification',
      description:
        'Campaigns and interactions designed to keep audiences playing, learning, and coming back for more.',
      detailedDescription:
        'Boost engagement through game mechanics, rewards, and interactive storytelling that drives sustained audience participation.',
      icon: '🎮',
      backgroundImage: '/play/sugarskullfrenzy.png',
      videoSrc: '/videos/drift.mp4',
      color: 'danger',
      benefits: [
        'Increased retention',
        'Higher engagement',
        'Reward systems',
        'Social sharing',
      ],
    },
  ];

  /**
   * Handles card click/touch events
   * Only allows one card to be flipped at a time
   */
  const handleCardClick = (index) => {
    setFlippedCard(flippedCard === index ? null : index);
  };

  /**
   * Determines if a card should show its back side
   * Only the currently selected card is flipped
   */
  const isFlipped = (index) => {
    return flippedCard === index;
  };

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
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
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
            What <span className="text-primary">We Do</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-textLight opacity-90 max-w-4xl mx-auto mb-8"
          >
            We build immersive, interactive experiences that run
            anywhere - on your phone, desktop, or VR headset. No apps,
            no downloads, just powerful brand engagement.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-sm text-primary max-w-2xl mx-auto mb-4"
          >
            Our core services:
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xs text-textLight opacity-60 max-w-2xl mx-auto"
          >
            Click to watch demo videos
          </motion.p>
        </div>

        {/* Services Grid - Flex layout for proper incomplete row centering */}
        <motion.div
          className="flex flex-wrap justify-center gap-12 max-w-7xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{
                y: -5,
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
              className="h-full w-full max-w-sm flex-shrink-0"
              style={{
                width: 'calc(33.333% - 2rem)', // 3 columns with gap
                minWidth: '280px', // Minimum width
              }}
            >
              {/* Flip Card Container - Forced 9:16 aspect ratio */}
              <div
                className="flip-card w-full cursor-pointer relative"
                style={{
                  backgroundColor: 'transparent',
                  perspective: '1000px',
                  aspectRatio: '9/16', // Force 9:16 aspect ratio (portrait)
                }}
                onClick={() => handleCardClick(index)}
                role="button"
                tabIndex={0}
                aria-label={`${service.title} service card. ${
                  isFlipped(index)
                    ? 'Showing demo video.'
                    : 'Click to watch demo video.'
                }`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(index);
                  }
                }}
              >
                <div
                  className="flip-card-inner w-full h-full text-center"
                  style={{
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    transform: isFlipped(index)
                      ? 'rotateY(180deg)'
                      : 'rotateY(0deg)',
                    transition: 'transform 1.2s ease-in-out',
                  }}
                >
                  {/* Front Side - Detailed service information */}
                  <div
                    className="flip-card-front absolute w-full h-full"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    <Card className="card-voyager w-full h-full bg-darkCard border border-primary border-opacity-20 hover:border-opacity-50 transition-all duration-300 hover:shadow-glow-sm group overflow-hidden">
                      {/* Animated question mark emoji in corner - Front */}
                      <motion.div
                        className="absolute top-3 right-3 z-30 text-lg"
                        animate={{
                          rotate: [-5, 5, -5],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: 'reverse',
                        }}
                      >
                        ❓
                      </motion.div>

                      <CardBody className="h-full p-0 relative">
                        {/* Background image with dark overlay */}
                        <div className="absolute inset-0">
                          <Image
                            src={service.backgroundImage}
                            alt={`${service.title} background`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          {/* Dark overlay for text readability */}
                          <div className="absolute inset-0 bg-black/70" />
                        </div>

                        {/* Content overlay - Optimized for 9:16 layout */}
                        <div className="relative z-10 h-full flex flex-col justify-between p-4 md:p-6">
                          {/* Header */}
                          <div className="text-left">
                            <div className="flex items-center justify-between mb-3">
                              <Chip
                                size="sm"
                                variant="flat"
                                color={service.color}
                                className="text-xs font-medium"
                              >
                                {service.shortTitle}
                              </Chip>
                              <div className="text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300">
                                {service.icon}
                              </div>
                            </div>

                            <h3 className="font-heading text-lg md:text-xl lg:text-2xl text-textLight mb-3 leading-tight">
                              {service.title}
                            </h3>

                            <p className="text-textLight/90 text-sm md:text-base mb-6 leading-relaxed">
                              {service.description}
                            </p>
                          </div>

                          {/* Benefits */}
                          <div className="text-left">
                            <div className="grid grid-cols-1 gap-2 mb-6">
                              {service.benefits.map(
                                (benefit, benefitIndex) => (
                                  <div
                                    key={benefitIndex}
                                    className="flex items-center text-sm text-textLight/80"
                                  >
                                    <span className="text-primary mr-2 text-base">
                                      ✓
                                    </span>
                                    {benefit}
                                  </div>
                                )
                              )}
                            </div>

                            <div className="text-center">
                              <p className="text-xs text-primary/80 opacity-75">
                                Click to see demo
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>

                  {/* Back Side - Video */}
                  <div
                    className="flip-card-back absolute w-full h-full"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <Card className="card-voyager w-full h-full bg-darkCard border border-primary border-opacity-50 shadow-glow-sm overflow-hidden">
                      {/* Animated question mark emoji in corner - Back */}
                      <motion.div
                        className="absolute top-3 right-3 z-30 text-lg"
                        animate={{
                          rotate: [-5, 5, -5],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: 'reverse',
                        }}
                      >
                        ❓
                      </motion.div>

                      <CardBody className="h-full p-0 relative">
                        {/* Video element */}
                        <video
                          className="w-full h-full object-cover"
                          autoPlay
                          loop
                          muted
                          playsInline
                          poster="/placeholder.jpg"
                        >
                          <source
                            src={service.videoSrc}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>

                        {/* Video overlay with service name - Optimized for 9:16 */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-4 md:p-6">
                          <div className="text-center">
                            <h4 className="text-textLight font-semibold text-base md:text-lg mb-2">
                              {service.title}
                            </h4>
                            <p className="text-textLight/80 text-sm">
                              Demo Experience
                            </p>
                          </div>
                        </div>

                        {/* Click to return indicator */}
                        <div className="absolute top-4 left-4 bg-black/50 rounded-full px-3 py-2">
                          <span className="text-textLight text-xs font-medium">
                            Click to return
                          </span>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional section content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="card-voyager bg-gradient-to-r from-primary/10 to-altPrimary/10 border border-primary border-opacity-30 max-w-4xl mx-auto">
            <CardBody className="p-8">
              <h3 className="text-2xl md:text-3xl font-heading text-primary mb-4">
                Ready to Create Something Amazing?
              </h3>
              <p className="text-textLight opacity-80 mb-6 text-lg">
                Let's discuss how we can bring your vision to life
                with immersive technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="#signup"
                  className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-accent transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Your Project
                </motion.a>
                <motion.a
                  href="#products"
                  className="inline-block px-8 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Our Products
                </motion.a>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}
