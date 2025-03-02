'use client';

import { Card, CardBody, Button, Link, Tooltip } from '@heroui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import FlexGrid from './FlexGrid';

export default function BenefitsSection() {
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

  const benefits = [
    {
      title: 'More Revenue, No Risk',
      description:
        'Offer high-end immersive services without hiring a full tech team.',
      icon: '💰',
    },
    {
      title: 'We Handle the Tech',
      description:
        'Augmented reality, VR, gamification, virtual productions—we do it all, under your brand.',
      icon: '🔧',
    },
    {
      title: 'Flawless Execution',
      description:
        'You stay client-facing, we stay behind the scenes, making sure everything runs perfectly.',
      icon: '✨',
    },
    {
      title: 'Automated Quoting & Booking System',
      description:
        'Streamline your sales process—your own branded quoting and booking platform.',
      icon: '📊',
    },
    {
      title: 'Exclusive Sales Toolkit',
      description:
        'Get an industry-specific PDF with sales ideas to pitch immersive solutions to clients.',
      icon: '🛠️',
    },
  ];

  // Define animation variants
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
      id="benefits"
      ref={sectionRef}
      className="py-24 bg-darkBg relative"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-64 h-64 bg-primary rounded-full filter blur-3xl opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-altPrimary rounded-full filter blur-3xl opacity-5"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
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
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="heading-voyager text-4xl md:text-5xl text-textLight mb-6"
          >
            We Make <span className="text-primary">You</span> Look
            Good
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-textLight opacity-80 max-w-3xl mx-auto"
          >
            Our white-label solutions let you expand your service
            offerings and increase revenue with zero overhead.
          </motion.p>
        </div>

        {/* Using the FlexGrid component with equalHeight set to true */}
        <FlexGrid
          columns={{ sm: 1, md: 2, lg: 3 }}
          gap="8"
          animate={true}
          container={container}
          item={item}
          equalHeight={true}
        >
          {benefits.map((benefit, index) => (
            <Tooltip
              key={index}
              content={`Learn more about ${benefit.title}`}
            >
              <motion.div
                whileHover={{
                  y: -10,
                  transition: { duration: 0.2 },
                }}
                className="h-full"
              >
                <Card className="card-voyager h-full bg-darkCard border border-primary border-opacity-20 hover:border-opacity-50 transition-all duration-300 hover:shadow-glow-sm hover-3d">
                  <CardBody className="h-full flex flex-col">
                    <div className="text-4xl mb-4 animate-float">
                      {benefit.icon}
                    </div>
                    <h3 className="font-subheading text-2xl text-primary mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-textLight opacity-70 flex-grow">
                      {benefit.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            </Tooltip>
          ))}
        </FlexGrid>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button
            as={Link}
            href="#signup"
            className="bg-primary text-textLight font-medium hover:bg-accent px-6 py-3 rounded-md transition-all hover:scale-105 transform hover:shadow-glow glitch-effect"
          >
            Sign Up Free →
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
