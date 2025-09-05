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
 * - Lazy video loading with Intersection Observer to prevent browser limits
 * - Loading states with spinner for better UX
 * - Video playback on card flip (back side)
 * - Detailed service information with darkened background images (front side)
 * - Animated question mark emoji that flips with the cards
 * - Scroll-based parallax animations using Framer Motion
 * - Hover scale effects (no flip on hover)
 *
 * @author Anthony Woodward
 * @version 2.1.0 - Added lazy video loading
 * @since 2025
 */

'use client';

import { Card, CardBody, Chip, Spinner } from '@heroui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

export default function WhatWeDoSection() {
  const sectionRef = useRef(null);
  const videoRefs = useRef({});
  const observerRef = useRef(null);

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

  // Lazy loading states
  const [loadingVideos, setLoadingVideos] = useState(new Set());
  const [loadedVideos, setLoadedVideos] = useState(new Set());
  const [failedVideos, setFailedVideos] = useState(new Set());

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
      videoSrc: '/videos/experiences/Hyrox AR.mp4',
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
      videoSrc: '/videos/experiences/drift.mp4',
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
      videoSrc: '/videos/experiences/property1.mp4',
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
      videoSrc: '/videos/experiences/icons.mp4',
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
      videoSrc: '/videos/experiences/DayOfTheDead.mp4',
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
   * Load video source and handle loading states
   */
  const loadVideo = useCallback(
    async (videoElement, index, videoSrc) => {
      if (loadedVideos.has(index) || loadingVideos.has(index)) {
        return; // Already loaded or loading
      }

      setLoadingVideos((prev) => new Set([...prev, index]));
      setFailedVideos((prev) => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });

      try {
        // Set the video source
        const sources = videoElement.querySelectorAll('source');
        sources.forEach((source) => {
          source.src = videoSrc;
        });

        // Set up event listeners
        const handleLoadSuccess = () => {
          setLoadingVideos((prev) => {
            const newSet = new Set(prev);
            newSet.delete(index);
            return newSet;
          });
          setLoadedVideos((prev) => new Set([...prev, index]));

          // Try to play the video
          videoElement.play().catch((error) => {
            console.log(
              `Autoplay blocked for video ${index}:`,
              error
            );
          });

          cleanup();
        };

        const handleLoadError = (error) => {
          console.error(`Video load error for card ${index}:`, error);
          setLoadingVideos((prev) => {
            const newSet = new Set(prev);
            newSet.delete(index);
            return newSet;
          });
          setFailedVideos((prev) => new Set([...prev, index]));
          cleanup();
        };

        const cleanup = () => {
          videoElement.removeEventListener(
            'loadeddata',
            handleLoadSuccess
          );
          videoElement.removeEventListener('error', handleLoadError);
        };

        videoElement.addEventListener(
          'loadeddata',
          handleLoadSuccess
        );
        videoElement.addEventListener('error', handleLoadError);

        // Trigger video load
        videoElement.load();

        // Fallback timeout
        setTimeout(() => {
          if (loadingVideos.has(index)) {
            handleLoadError('Timeout');
          }
        }, 10000);
      } catch (error) {
        console.error(
          `Failed to load video for card ${index}:`,
          error
        );
        setLoadingVideos((prev) => {
          const newSet = new Set(prev);
          newSet.delete(index);
          return newSet;
        });
        setFailedVideos((prev) => new Set([...prev, index]));
      }
    },
    [loadedVideos, loadingVideos]
  );

  /**
   * Initialize Intersection Observer for lazy loading
   */
  const initializeVideoLazyLoading = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const videoElement = entry.target;
            const index = parseInt(videoElement.dataset.index, 10);

            // Only load if card is flipped
            if (
              flippedCard === index &&
              !loadedVideos.has(index) &&
              !loadingVideos.has(index)
            ) {
              const service = services[index];
              loadVideo(videoElement, index, service.videoSrc);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    // Observe all video elements
    Object.values(videoRefs.current).forEach((videoElement) => {
      if (videoElement) {
        observerRef.current.observe(videoElement);
      }
    });
  }, [flippedCard, loadedVideos, loadingVideos, loadVideo, services]);

  /**
   * Handles card click/touch events with lazy loading
   * Only allows one card to be flipped at a time
   */
  const handleCardClick = (index) => {
    if (flippedCard === index) {
      // Flip back, pause + reset
      setFlippedCard(null);
      if (videoRefs.current[index]) {
        videoRefs.current[index].pause();
        videoRefs.current[index].currentTime = 0;
      }
    } else {
      const previousCard = flippedCard;
      setFlippedCard(index);

      // Stop previous video
      if (previousCard !== null && videoRefs.current[previousCard]) {
        videoRefs.current[previousCard].pause();
        videoRefs.current[previousCard].currentTime = 0;
      }

      // PRIORITY: load clicked card video first
      const video = videoRefs.current[index];
      if (video) {
        const service = services[index];
        setLoadingVideos((prev) => new Set([...prev, index]));

        // Attach source dynamically
        if (!video.querySelector('source')) {
          const source = document.createElement('source');
          source.src = service.videoSrc;
          source.type = 'video/mp4';
          video.appendChild(source);
        } else {
          video.querySelector('source').src = service.videoSrc;
        }

        // Load and try play
        video.load();
        video
          .play()
          .then(() => {
            setLoadedVideos((prev) => new Set([...prev, index]));
            setLoadingVideos((prev) => {
              const newSet = new Set(prev);
              newSet.delete(index);
              return newSet;
            });
          })
          .catch(() => {
            setFailedVideos((prev) => new Set([...prev, index]));
            setLoadingVideos((prev) => {
              const newSet = new Set(prev);
              newSet.delete(index);
              return newSet;
            });
          });
      }
    }
  };

  /**
   * Determines if a card should show its back side
   * Only the currently selected card is flipped
   */
  const isFlipped = (index) => {
    return flippedCard === index;
  };

  // Initialize intersection observer when flipped card changes
  useEffect(() => {
    initializeVideoLazyLoading();
  }, [initializeVideoLazyLoading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

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
            The <span className="text-primary">Experiences</span> We
            Create
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
            className="text-m text-primary max-w-2xl mx-auto mb-4"
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

                  {/* Back Side - Video with Lazy Loading */}
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
                        {/* Loading State */}
                        {loadingVideos.has(index) && (
                          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/80">
                            <div className="text-center">
                              <Spinner size="lg" color="primary" />
                              <p className="text-textLight mt-4 text-sm">
                                Loading video...
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Error State */}
                        {failedVideos.has(index) && (
                          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/80">
                            <div className="text-center">
                              <div className="text-4xl mb-4">⚠️</div>
                              <p className="text-textLight text-sm">
                                Video unavailable
                              </p>
                              <p className="text-textLight opacity-60 text-xs mt-2">
                                Click to try again
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Video element - starts without source for lazy loading */}
                        <video
                          ref={(el) => {
                            videoRefs.current[index] = el;
                          }}
                          className="w-full h-full object-cover"
                          muted
                          loop
                          playsInline
                          preload="none"
                          poster={service.backgroundImage}
                        />

                        {/* Video overlay with service name - Optimized for 9:16 */}
                        {loadedVideos.has(index) && (
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
                        )}

                        {/* Click to return indicator */}
                        {(loadedVideos.has(index) ||
                          failedVideos.has(index)) && (
                          <div className="absolute top-4 left-4 bg-black/50 rounded-full px-3 py-2">
                            <span className="text-textLight text-xs font-medium">
                              Click to return
                            </span>
                          </div>
                        )}
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
                Want to see how we can bring your story to life with
                immersive technology?
              </h3>
              <p className="text-textLight opacity-80 mb-6 text-lg">
                Let&apos;s discuss how we can bring your vision to
                life with immersive technology.
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
