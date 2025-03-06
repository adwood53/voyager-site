'use client';

import { Button, Link, Card, CardBody, Tooltip } from '@heroui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function StudioSection() {
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
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.9, 1, 1, 0.9]
  );

  const studioFeatures = [
    {
      icon: '🎥',
      title: '4K Cameras & Professional Lighting',
      description: 'Cinematic-grade visuals, every time.',
    },
    {
      icon: '🎤',
      title: 'Full Audio Setup & Editing Tools',
      description: 'From podcasts to live productions.',
    },
    {
      icon: '🖥',
      title: 'Virtual Set Capabilities',
      description: 'Shoot anywhere, no location limits.',
    },
    {
      icon: '☕',
      title: 'Private Lounge & Client Spaces',
      description: 'A sleek, professional space to work & create.',
    },
  ];

  return (
    <section
      id="studio"
      ref={sectionRef}
      className="py-24 bg-darkBg relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="has-tooltip">
          <Image
            src="/placeholder.jpg"
            alt="Studio background"
            fill
            className="object-cover opacity-20"
          />
          <span className="custom-tooltip">
            Our professional studio setup
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-darkBg via-darkBg to-darkBg opacity-90"></div>
      </div>

      <motion.div
        className="container-voyager relative z-10"
        style={{ opacity, y, scale }}
      >
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="heading-voyager text-4xl md:text-5xl text-textLight mb-6"
            >
              <span className="block">Studio Access</span>
              <span className="block text-primary">
                An Exclusive Edge
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-xl text-textLight opacity-80 mb-6">
                A pro-grade, fully equipped greenscreen studio,
                <strong className="text-primary">
                  not available to the public, only for our
                  white-label partners.
                </strong>{' '}
                Whether you need high-end productions, virtual sets,
                or next-level content creation, we&apos;ve got you
                covered.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {studioFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + index * 0.1,
                    }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 hover-3d p-3 rounded-lg hover:bg-darkCard hover:bg-opacity-50 transition-all duration-300 cursor-pointer"
                    whileHover={{
                      x: 5,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <motion.div
                      className="text-3xl mt-1 bg-primary bg-opacity-20 p-2 rounded-full"
                      whileHover={{
                        rotate: [0, -10, 10, 0],
                        scale: 1.1,
                        transition: { duration: 0.5 },
                      }}
                    >
                      {feature.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-lg text-primary font-semibold mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-textLight opacity-70">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  as={Link}
                  href="#signup"
                  className="bg-primary text-textLight font-medium hover:bg-accent px-6 py-3 rounded-md transition-all hover:shadow-glow glitch-effect"
                >
                  Book a Studio Tour →
                </Button>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="w-full lg:w-1/2 relative parallax-container"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-lg aspect-video hover-3d shadow-glow-sm border border-primary border-opacity-20">
              <div className="has-tooltip">
                <Image
                  src="/placeholder.jpg"
                  alt="Voyager Studio"
                  fill
                  className="object-cover"
                />
                <span className="custom-tooltip">
                  Our state-of-the-art production studio
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-darkBg to-transparent"></div>

              {/* Studio blueprint overlay effect */}
              <motion.div
                className="absolute inset-0 bg-primary opacity-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-[url('/placeholder.jpg')] opacity-20 bg-no-repeat bg-center bg-contain mix-blend-lighten"></div>
              </motion.div>

              {/* Interactive elements */}
              <div className="absolute inset-0 z-10">
                {[...Array(5)].map((_, i) => (
                  <Tooltip
                    key={i}
                    content={`Studio Feature ${i + 1}`}
                  >
                    <motion.div
                      className="absolute w-4 h-4 rounded-full bg-primary cursor-pointer"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + Math.sin(i) * 20}%`,
                      }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.5 + i * 0.1,
                      }}
                      viewport={{ once: true }}
                      whileHover={{
                        scale: 1.5,
                        boxShadow: '0 0 15px rgba(231, 144, 35, 0.8)',
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-primary rounded-full"
                        animate={{
                          scale: [1, 1.8, 1],
                          opacity: [0.6, 0.2, 0.6],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    </motion.div>
                  </Tooltip>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
