'use client';

import { Button, Link } from '@heroui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ProcessSection() {
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

  const steps = [
    {
      number: 1,
      title: 'Sign Up',
      description:
        'Join as a reseller for free or as a pro white-label partner.',
      delay: 0,
      icon: '📝',
    },
    {
      number: 2,
      title: 'Get Your Sales Toolkit',
      description:
        'Access your sales toolkit and resources in your partner dashboard',
      delay: 0.2,
      icon: '🧰',
    },
    {
      number: 3,
      title: 'Sell Bigger Projects',
      description:
        'Offer your clients AR, VR, virtual events, and more, without lifting a finger.',
      delay: 0.4,
      icon: '💰',
    },
    {
      number: 4,
      title: 'We Deliver',
      description:
        'Our team executes flawlessly behind the scenes. You take the credit.',
      delay: 0.6,
      icon: '🚀',
    },
  ];

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-24 bg-darkBg relative"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary to-altPrimary opacity-5 bg-opacity-5"
          animate={{
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'mirror',
          }}
        />
      </div>

      {/* Background line for timeline */}
      <div className="hidden md:block absolute left-1/2 top-1/3 bottom-1/6 w-1 bg-primary bg-opacity-30 transform -translate-x-1/2 z-10">
        <motion.div
          className="absolute top-0 bottom-0 left-0 right-0 bg-primary"
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          viewport={{ once: true }}
        />
      </div>

      <motion.div
        className="container-voyager relative z-20"
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
            How It <span className="text-primary">Works</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-textLight opacity-80 max-w-3xl mx-auto"
          >
            Simple, Seamless, Scalable
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: step.delay }}
              viewport={{ once: true }}
              className={`relative mb-20 last:mb-0 md:flex items-center ${
                index % 2 === 0
                  ? 'md:flex-row'
                  : 'md:flex-row-reverse'
              }`}
            >
              {/* Step number/icon */}
              <div
                className={`absolute top-0 left-0 md:relative md:flex md:w-1/2 ${
                  index % 2 === 0
                    ? 'md:justify-end md:pr-16'
                    : 'md:justify-start md:pl-16'
                }`}
              >
                <motion.div
                  className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-darkBg font-bold text-xl relative z-10 shadow-glow-sm"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0 0 20px rgba(231, 144, 35, 0.7)',
                  }}
                >
                  <span className="text-xl">{step.icon}</span>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-darkBg border-2 border-primary flex items-center justify-center text-xs text-primary">
                    {step.number}
                  </div>
                </motion.div>
                {/* Connection line on mobile */}
                {index < steps.length - 1 && (
                  <div className="absolute top-14 bottom-0 left-7 w-[1px] bg-primary bg-opacity-30 md:hidden">
                    <motion.div
                      className="absolute top-0 bottom-0 left-0 right-0 bg-primary"
                      initial={{ height: 0 }}
                      whileInView={{ height: '100%' }}
                      transition={{ duration: 1.0, ease: 'easeOut' }}
                      viewport={{ once: true }}
                    />
                  </div>
                )}
              </div>

              {/* Step content */}
              <motion.div
                className={`ml-20 md:ml-0 md:w-1/2 ${
                  index % 2 === 0
                    ? 'md:pl-16'
                    : 'md:pr-16 md:text-right'
                }`}
                whileHover={{
                  scale: 1.02,
                  x: index % 2 === 0 ? 5 : -5,
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-darkCard bg-opacity-50 p-5 rounded-lg hover:shadow-glow-sm transition-all duration-300 border border-primary border-opacity-10 hover:border-opacity-30">
                  <h3 className="text-2xl font-heading text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-textLight opacity-80">
                    {step.description}
                  </p>
                </div>
              </motion.div>

              {/* Timeline dots for medium+ screens */}
              {index < steps.length - 1 && (
                <motion.div
                  className={`hidden md:block absolute left-1/2 w-3 h-3 rounded-full bg-primary z-20`}
                  style={{
                    top: `${(100 / (steps.length - 1)) * index + 20}%`,
                    transform: 'translateX(-50%)',
                  }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.1,
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.5,
                    boxShadow: '0 0 15px rgba(231, 144, 35, 0.7)',
                  }}
                />
              )}

              {/* Final dot */}
              {index === steps.length - 1 && (
                <motion.div
                  className={`hidden md:block absolute left-1/2 w-5 h-5 rounded-full bg-primary z-20`}
                  style={{
                    top: `${(100 / (steps.length - 1)) * index + 20}%`,
                    transform: 'translateX(-50%)',
                  }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.1,
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.5,
                    boxShadow: '0 0 15px rgba(231, 144, 35, 0.7)',
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-primary rounded-full opacity-50"
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0.5, 0.2, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

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
            className="bg-primary text-textLight font-medium hover:bg-accent px-6 py-3 rounded-md transition-all hover:scale-105 transform hover:shadow-glow glitch-effect"
          >
            Start Selling Immersive →
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
