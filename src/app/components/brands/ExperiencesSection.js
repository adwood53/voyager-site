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
      'Lets people step inside the scene, explore in 360, and watch clips — on phone, desktop, or VR.',
    features: [
      'A band takes fans on a backstage tour',
      'An agent shows a home without a viewing',
      'A venue lets bookers walk the space from anywhere',
    ],
    perfectFor:
      'People don’t just watch, they explore. That means longer dwell time, deeper emotional connection, and measurable insights into what they looked at most.',
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
      'Brings the digital world to life — characters, offers, and 3D animations on packaging, posters, or merch. No apps, no fuss.',
    features: [
      'A drink can tells its brand story',
      'A festival poster plays a teaser video',
      'A product box reveals how-to tips or offers',
    ],
    perfectFor:
      'AR turns everyday items into interactive sales tools. It’s fun, shareable, and trackable - you’ll know who engaged, what they clicked, and when.',
    compatibility: [{ device: 'Phones', icon: '📱' }],
    color: 'from-altPrimary/20 to-altPrimary/5',
    borderColor: 'border-altPrimary',
  },
  {
    title: 'Virtual Reality (VR)',
    icon: '🥽',
    description:
      'Full 3D immersion with headsets. Explore, interact, even train together in shared spaces.',
    features: [
      'Launching a new car in a virtual showroom',
      'Training staff on complex equipment safely',
      'Creating an exhibition that can travel worldwide',
    ],
    perfectFor:
      'VR leaves a lasting impression. It builds confidence, reduces training risk and costs, and positions your brand as premium - all while giving you real data on how people move, choose, and interact.',
    compatibility: [{ device: 'VR Headsets', icon: '🥽' }],
    color: 'from-accent/20 to-accent/5',
    borderColor: 'border-accent',
  },
  {
    title: 'Learning Management Systems (LMS)',
    icon: '🎓',
    description:
      'Gamified modules, video lessons, quizzes, and certificates — all in your branded academy.',
    features: [
      'Training staff across multiple sites',
      'Beauty brands launching accredited academies',
      'Alternative Provision Education providing Immersive Learning Resources',
    ],
    perfectFor:
      'When learning feels like playing, people complete it. That means consistent knowledge, lower training costs, and insights into progress across teams or customers.',
    compatibility: [
      { device: 'Phones', icon: '📱' },
      { device: 'Desktop', icon: '💻' },
      { device: 'VR Headsets', icon: '🥽' },
    ],
    color: 'from-accent/20 to-accent/5',
    borderColor: 'border-accent',
  },
  {
    title: 'Gamified Experiences',
    icon: '🎮',
    description:
      'Points, rewards, challenges and leaderboards - built into your campaign.',
    features: [
      'Loyalty schemes that unlock perks',
      'Competitions that collect data and create a buzz',
      'Live events where interactive games attract and engage crowds',
    ],
    perfectFor:
      'Play keeps people coming back. Gamification drives repeat engagement, data capture, and social sharing - turning one-off interactions into long-term loyalty.',
    compatibility: [
      { device: 'Phones', icon: '📱' },
      { device: 'Desktop', icon: '💻' },
      { device: 'VR Headsets', icon: '🥽' },
    ],
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
      className="bg-gradient-to-b from-darkCard to-darkBg relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-lg md:text-xl lg:text-2xl text-textLight text-center opacity-90 max-w-4xl mx-auto mb-12 leading-relaxed"
      >
        From property to retail, training to live events, immersive
        experiences deliver what every business needs: more attention,
        deeper engagement, and higher conversions.
      </motion.div>
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
              // Calculate circular offset (so it wraps around properly)
              const offset =
                (index - currentIndex + experiences.length) %
                experiences.length;

              const isCenter = offset === 0;
              const isRight = offset === 1; // immediate next
              const isLeft = offset === experiences.length - 1; // immediate previous
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
                          Use Cases:
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
                title: 'Build your Custom Experience!',
                onSubmit: (data) => {
                  console.log('Form submitted:', data);
                },
              })
            }
            className="bg-primary text-textLight font-semibold px-8 py-4 rounded-md hover:bg-accent transition-all hover:scale-105 transform hover:shadow-glow-lg text-lg"
          >
            Build your Brands Immersive Experience Now
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
