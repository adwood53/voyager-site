/**
 * @fileoverview ExperiencesSection component for the Voyager brands page
 *
 * This component displays an interactive carousel of immersive experience types
 * (360°, AR, VR) with detailed information about each technology. It includes
 * an integrated JotForm modal for experience creation requests and features
 * auto-advancing carousel functionality with manual navigation controls.
 *
 * Features:
 * - Interactive 3D-style carousel with center focus and side previews
 * - Auto-advancing carousel with 10-second intervals (pauses on hover)
 * - Manual navigation with arrow buttons and pagination dots
 * - Scroll-based parallax animations using Framer Motion
 * - Modal system integration for experience creation requests
 * - Comprehensive information display for each experience type
 * - Responsive design adapting to mobile and desktop
 * - Hover effects and smooth transitions
 *
 * @author Voyager Development Team
 * @version 1.2.1 - Fixed modal integration and restored carousel
 * @since 2024
 */

'use client';

import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Link,
  Chip,
} from '@heroui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useModal } from '../modal/core/ModalEngine';
import { JotFormModal } from '../modal/types/ModalTypes';

const experiences = [
  {
    title: '360° Experiences',
    icon: '🌐',
    description:
      'Put your audience inside the moment with an immersive story, sound, and visuals.',
    features: [
      'Look around in all directions',
      'Tap to switch scenes or settings',
      'Watch embedded videos or story clips',
      'Click hotspots for info, links, or games',
    ],
    perfectFor:
      'Immersive storytelling, venue tours, artist campaigns, brand showcases',
    compatibility: [
      { device: 'Phone', icon: '📱' },
      { device: 'Desktop', icon: '💻' },
      { device: 'VR Headset', icon: '🧙' },
    ],
    color: 'from-primary/20 to-primary/5',
    borderColor: 'border-primary',
  },
  {
    title: 'Augmented Reality (AR)',
    icon: '📲',
    description:
      "Make posters, packaging, or products come to life through your customer's phone.",
    features: [
      'Scan real-world items to trigger digital content',
      'See characters, visuals, or products in their space',
      'Tap objects for info, animations, or offers',
      'Trigger sound, music, or voiceovers',
      'Capture photos or videos with AR effects',
      'Access links, discounts, or next steps',
    ],
    perfectFor:
      'Retail packaging, street marketing, flyer campaigns, experiential product launches',
    compatibility: [{ device: 'Phones', icon: '📱' }],
    color: 'from-altPrimary/20 to-altPrimary/5',
    borderColor: 'border-altPrimary',
  },
  {
    title: 'Virtual Reality (VR)',
    icon: '🥽',
    description:
      'Transport your audience into a fully digital world built around your story.',
    features: [
      'Step inside a 3D experience with a headset',
      'Look around freely and explore environments',
      'Use hand tracking or controllers to interact',
      'Trigger animations, sounds, or quests',
      'Navigate guided stories or free-roam spaces',
      'Participate in multiplayer or social environments (if enabled)',
    ],
    perfectFor:
      'Premium events, brand launches, product training, museum or educational exhibits',
    compatibility: [{ device: 'VR Headsets', icon: '🥽' }],
    color: 'from-accent/20 to-accent/5',
    borderColor: 'border-accent',
  },
];

export default function ExperiencesSection() {
  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { openModal } = useModal();

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

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % experiences.length
        );
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % experiences.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? experiences.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section
      id="experiences"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-darkCard to-darkBg relative"
    >
      <motion.div
        className="container-voyager relative z-10"
        style={{ opacity, y }}
      >
        <div
          className="relative max-w-6xl mx-auto h-[650px] mb-16"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {experiences.map((experience, index) => {
              const offset = index - currentIndex;
              const isCenter = offset === 0;
              const isLeft =
                offset === -1 ||
                (offset === 2 && experiences.length === 3);
              const isRight =
                offset === 1 ||
                (offset === -2 && experiences.length === 3);
              if (!isCenter && !isLeft && !isRight) return null;

              let scale = 0.7;
              let x = 0;
              let opacity = 0.5;
              let zIndex = 1;

              if (isCenter) {
                scale = 1;
                x = 0;
                opacity = 1;
                zIndex = 3;
              } else if (isLeft) {
                scale = 0.7;
                x = -400;
                opacity = 0.6;
                zIndex = 2;
              } else if (isRight) {
                scale = 0.7;
                x = 400;
                opacity = 0.6;
                zIndex = 2;
              }

              return (
                <motion.div
                  key={index}
                  className="absolute w-full max-w-md"
                  style={{ zIndex }}
                  initial={false}
                  animate={{ scale, x, opacity }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  whileHover={
                    isCenter
                      ? { scale: 1.02 }
                      : { scale: scale * 1.05 }
                  }
                >
                  <Card
                    className={`card-voyager h-[550px] bg-gradient-to-br ${experience.color} border ${experience.borderColor} border-opacity-30 hover:border-opacity-60 transition-all duration-300 hover:shadow-glow-sm group overflow-hidden`}
                  >
                    <CardBody className="p-6 h-full flex flex-col">
                      <div className="flex items-center mb-4">
                        <div className="text-3xl mr-3 group-hover:scale-110 transition-transform duration-300">
                          {experience.icon}
                        </div>
                        <h3 className="font-heading text-xl text-textLight">
                          {experience.title}
                        </h3>
                      </div>
                      <p className="text-textLight opacity-80 mb-4 leading-relaxed text-sm">
                        {experience.description}
                      </p>
                      <div className="mb-4 flex-grow">
                        <h4 className="text-primary font-semibold mb-3 text-sm">
                          Users can:
                        </h4>
                        <ul className="space-y-2">
                          {experience.features
                            .slice(0, 3)
                            .map((feature, featureIndex) => (
                              <li
                                key={featureIndex}
                                className="flex items-start"
                              >
                                <span className="text-primary mr-2 mt-1 text-xs">
                                  •
                                </span>
                                <span className="text-textLight opacity-75 text-xs leading-tight">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          {experience.features.length > 3 && (
                            <li className="text-primary text-xs">
                              +{experience.features.length - 3} more
                              features
                            </li>
                          )}
                        </ul>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-primary font-semibold mb-2 text-sm">
                          Perfect for:
                        </h4>
                        <p className="text-textLight opacity-75 text-xs leading-tight">
                          {experience.perfectFor.length > 90
                            ? experience.perfectFor.substring(0, 90) +
                              '...'
                            : experience.perfectFor}
                        </p>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-primary font-semibold mb-2 text-sm">
                          Compatible with:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {experience.compatibility.map(
                            (device, deviceIndex) => (
                              <Chip
                                key={deviceIndex}
                                variant="flat"
                                size="sm"
                                className="bg-darkCard border border-primary border-opacity-20 text-xs px-3 py-1"
                              >
                                <span className="mr-1">
                                  {device.icon}
                                </span>
                                {device.device}
                              </Chip>
                            )
                          )}
                        </div>
                      </div>
                    </CardBody>
                    <CardFooter className="pt-0 pb-6 px-6">
                      <Button
                        as={Link}
                        href="#signup"
                        size="sm"
                        className="w-full bg-primary text-textLight font-semibold hover:bg-accent transition-all"
                      >
                        Learn More
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-darkCard/80 hover:bg-darkCard border border-primary border-opacity-30 hover:border-opacity-60 rounded-full p-3 text-primary hover:text-accent transition-all"
            aria-label="Previous experience"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-darkCard/80 hover:bg-darkCard border border-primary border-opacity-30 hover:border-opacity-60 rounded-full p-3 text-primary hover:text-accent transition-all"
            aria-label="Next experience"
          >
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {experiences.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-primary/30 hover:bg-primary/60'
                }`}
                aria-label={`Go to experience ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button
            onPress={() =>
              openModal(JotFormModal, {
                isOpen: true,
                formId: '251762903523052',
                title: 'Start Creating Your Experience',
                onSubmit: (data) => {
                  console.log('Form submitted:', data);
                },
              })
            }
            className="bg-primary text-textLight font-semibold px-8 py-4 rounded-md hover:bg-accent transition-all hover:scale-105 transform hover:shadow-glow-lg text-lg"
          >
            Start Creating Your Experience →
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
