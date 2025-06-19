'use client';

import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Link,
  Chip,
} from '@heroui/react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function ExperiencesSection() {
  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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

  // Auto-advance carousel every 10 seconds (pause on hover)
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
        { device: 'VR Headset', icon: '🥽' },
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="experiences"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-darkCard to-darkBg relative"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-altPrimary rounded-full filter blur-3xl opacity-6"
          animate={{
            scale: [1, 1.4, 1],
            x: [0, 80, 0],
            opacity: [0.06, 0.1, 0.06],
          }}
          transition={{
            duration: 22,
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
            Types of <span className="text-primary">Experiences</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-textLight opacity-80 max-w-3xl mx-auto"
          >
            Choose the perfect immersive experience for your brand
            campaign
          </motion.p>
        </div>

        {/* Experiences Carousel */}
        <div
          className="relative max-w-6xl mx-auto h-[650px] mb-16"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Carousel Container */}
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
              const isVisible = isCenter || isLeft || isRight;

              if (!isVisible) return null;

              let xOffset = 0;
              let scale = 0.75;
              let opacity = 0.5;
              let zIndex = 1;

              if (isCenter) {
                xOffset = 0;
                scale = 1;
                opacity = 1;
                zIndex = 3;
              } else if (isLeft) {
                xOffset = -300;
                scale = 0.75;
                opacity = 0.6;
                zIndex = 2;
              } else if (isRight) {
                xOffset = 300;
                scale = 0.75;
                opacity = 0.6;
                zIndex = 2;
              }

              return (
                <motion.div
                  key={index}
                  className="absolute w-110 cursor-pointer"
                  style={{ zIndex }}
                  initial={false}
                  animate={{
                    x: xOffset,
                    scale,
                    opacity,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: 'easeInOut',
                  }}
                  onClick={() => !isCenter && goToSlide(index)}
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
                      {/* Header */}
                      <div className="flex items-center mb-4">
                        <div className="text-3xl mr-3 group-hover:scale-110 transition-transform duration-300">
                          {experience.icon}
                        </div>
                        <h3 className="font-heading text-xl text-textLight">
                          {experience.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-textLight opacity-80 mb-4 leading-relaxed text-sm">
                        {experience.description}
                      </p>

                      {/* Features - Show first 3 */}
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

                      {/* Perfect For */}
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

                      {/* Compatibility */}
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

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-darkCard/80 hover:bg-darkCard border border-primary border-opacity-30 hover:border-opacity-60 rounded-full p-3 text-primary hover:text-accent transition-all"
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

          {/* Pagination Dots */}
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
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button
            as={Link}
            href="#signup"
            className="bg-primary text-textLight font-semibold px-8 py-4 rounded-md hover:bg-accent transition-all hover:scale-105 transform hover:shadow-glow-lg text-lg"
          >
            Start Creating Your Experience →
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
