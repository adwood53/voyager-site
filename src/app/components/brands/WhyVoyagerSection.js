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

  const keyFeatures = [
    {
      title: 'Built for Visionaries, Not Templates',
      description:
        'Most tech agencies box you into pre-set platforms. We don’t. With our proprietary tech, we design around imagination, not limitations - giving you the freedom to create experiences that nobody else can replicate.',
      icon: '🛠️',
    },
    {
      title: 'Creatives Who Understand Business',
      description:
        'We’re not just coders or designers. We’re entrepreneurs, strategists, and storytellers. That means we care about outcomes - sales, engagement, loyalty - as much as we care about the craft. We guide you through the process, making complex tech simple, clear, and effective.',
      icon: '🎭',
    },
    {
      title: 'An Ecosystem That Delivers',
      description:
        'Through our partner network, we can take any idea - a product, a launch, a campaign - from concept to market. Everything stays under one roof, so you get speed, consistency, and a team that flexes with you, whether it’s a rapid activation or a long-term brand build.',
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
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
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
          </motion.div>
        </motion.div>

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
              href="#signup"
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
