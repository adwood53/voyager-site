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
import { useRef } from 'react';
import FlexGrid from '../FlexGrid';

export default function ExperiencesSection() {
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

        {/* Experiences Grid */}
        <FlexGrid
          columns={{ sm: 1, md: 1, lg: 3 }}
          gap="8"
          animate={true}
          container={container}
          item={item}
          equalHeight={true}
        >
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="h-full"
            >
              <Card
                className={`card-voyager h-full bg-gradient-to-br ${experience.color} border ${experience.borderColor} border-opacity-30 hover:border-opacity-60 transition-all duration-300 hover:shadow-glow-sm group`}
              >
                <CardBody className="p-8">
                  {/* Header */}
                  <div className="flex items-center mb-6">
                    <div className="text-4xl mr-4 group-hover:scale-110 transition-transform duration-300">
                      {experience.icon}
                    </div>
                    <h3 className="font-heading text-2xl text-textLight">
                      {experience.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-textLight opacity-80 mb-6 leading-relaxed">
                    {experience.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-primary font-semibold mb-3">
                      Users can:
                    </h4>
                    <ul className="space-y-2">
                      {experience.features.map(
                        (feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-start"
                          >
                            <span className="text-primary mr-2 mt-1">
                              •
                            </span>
                            <span className="text-textLight opacity-75 text-sm">
                              {feature}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* Perfect For */}
                  <div className="mb-6">
                    <h4 className="text-primary font-semibold mb-2">
                      Perfect for:
                    </h4>
                    <p className="text-textLight opacity-75 text-sm">
                      {experience.perfectFor}
                    </p>
                  </div>

                  {/* Compatibility */}
                  <div>
                    <h4 className="text-primary font-semibold mb-3">
                      Compatible with:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.compatibility.map(
                        (device, deviceIndex) => (
                          <Chip
                            key={deviceIndex}
                            variant="flat"
                            size="sm"
                            className="bg-darkCard border border-primary border-opacity-20"
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

                <CardFooter className="pt-0 pb-8 px-8">
                  <Button
                    as={Link}
                    href="#contact"
                    variant="flat"
                    className="w-full bg-primary/10 border border-primary border-opacity-30 text-primary hover:bg-primary hover:text-textLight transition-all"
                  >
                    Learn More About {experience.title}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </FlexGrid>

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
            href="#contact"
            className="bg-primary text-textLight font-semibold px-8 py-4 rounded-md hover:bg-accent transition-all hover:scale-105 transform hover:shadow-glow-lg text-lg"
          >
            Start Creating Your Experience →
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
