'use client';

import { Card, CardBody, Button, Link } from '@heroui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import FlexGrid from '../FlexGrid';

export default function WhyVoyagerSection() {
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

  const audienceTypes = [
    {
      title: 'For Brands',
      icon: '🎯',
      description:
        'Create emotional connections, track engagement, and stand out from the crowd.',
      benefits: [
        'Memorable brand experiences',
        'Detailed engagement analytics',
        'Competitive advantage',
        'Increased customer loyalty',
      ],
      color: 'from-primary/20 to-primary/5',
      borderColor: 'border-primary',
    },
    {
      title: 'For Partners',
      icon: '🤝',
      description:
        'White-label solutions, CRM integrations, and co-branded experiences available.',
      benefits: [
        'White-label options',
        'CRM integration',
        'Co-branded experiences',
        'Revenue sharing opportunities',
      ],
      color: 'from-altPrimary/20 to-altPrimary/5',
      borderColor: 'border-altPrimary',
    },
  ];

  const keyFeatures = [
    {
      title: 'Entertainment First',
      description:
        'We create campaigns that entertain, engage, and convert.',
      icon: '🎭',
    },
    {
      title: 'Full-Service Support',
      description:
        "Whether you're a bold brand or a creative partner, we help you craft immersive experiences that people remember.",
      icon: '🛠️',
    },
    {
      title: 'End-to-End Process',
      description:
        'Guiding you through the process from start to finish.',
      icon: '🎯',
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
      id="why-voyager"
      ref={sectionRef}
      className="py-24 bg-darkBg relative"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary rounded-full filter blur-3xl opacity-8"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 20, 0],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-altPrimary rounded-full filter blur-3xl opacity-6"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 40, 0],
            opacity: [0.06, 0.1, 0.06],
          }}
          transition={{
            duration: 14,
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
            Why <span className="text-primary">Voyager</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-textLight opacity-80 max-w-3xl mx-auto"
          >
            We create campaigns that entertain, engage, and convert.
          </motion.p>
        </div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <FlexGrid
            columns={{ sm: 1, md: 3, lg: 3 }}
            gap="6"
            animate={true}
            container={container}
            item={item}
            equalHeight={true}
          >
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className="h-full"
              >
                <Card className="card-voyager h-full bg-darkCard border border-primary border-opacity-20 hover:border-opacity-50 transition-all duration-300 hover:shadow-glow-sm">
                  <CardBody className="h-full flex flex-col text-center p-6">
                    <div className="text-3xl mb-4 animate-float">
                      {feature.icon}
                    </div>
                    <h3 className="font-subheading text-lg text-primary mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-textLight opacity-70 flex-grow text-sm">
                      {feature.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </FlexGrid>
        </motion.div>

        {/* Audience Types */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-lg text-textLight opacity-80 text-center mb-12 max-w-4xl mx-auto"
          >
            Whether you&apos;re a bold brand or a creative partner, we
            help you craft immersive experiences that people remember
            - guiding you through the process from start to finish.
          </motion.p>

          <FlexGrid
            columns={{ sm: 1, md: 2, lg: 2 }}
            gap="8"
            animate={true}
            container={container}
            item={item}
            equalHeight={true}
          >
            {audienceTypes.map((audience, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                className="h-full"
              >
                <Card
                  className={`card-voyager h-full bg-gradient-to-br ${audience.color} border ${audience.borderColor} border-opacity-30 hover:border-opacity-60 transition-all duration-300 hover:shadow-glow-sm group`}
                >
                  <CardBody className="p-8">
                    {/* Header */}
                    <div className="flex items-center mb-6">
                      <div className="text-4xl mr-4 group-hover:scale-110 transition-transform duration-300">
                        {audience.icon}
                      </div>
                      <h3 className="font-heading text-2xl text-textLight">
                        {audience.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-textLight opacity-80 mb-6">
                      {audience.description}
                    </p>

                    {/* Benefits */}
                    <ul className="space-y-3">
                      {audience.benefits.map(
                        (benefit, benefitIndex) => (
                          <li
                            key={benefitIndex}
                            className="flex items-start"
                          >
                            <span className="text-primary mr-3 mt-1">
                              ✓
                            </span>
                            <span className="text-textLight opacity-75">
                              {benefit}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </FlexGrid>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              as={Link}
              href="#contact"
              className="bg-primary text-textLight font-semibold px-8 py-4 rounded-md hover:bg-accent transition-all hover:scale-105 transform hover:shadow-glow-lg text-lg"
            >
              Start Your Campaign
            </Button>
            <Button
              as={Link}
              href="/partner"
              className="bg-transparent border-2 border-altPrimary text-altPrimary font-semibold px-8 py-4 rounded-md hover:bg-altPrimary hover:text-textLight transition-all hover:scale-105 transform text-lg"
            >
              Become a Partner
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
