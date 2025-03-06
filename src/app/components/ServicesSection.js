'use client';

import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Link,
} from '@heroui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import FlexGrid from './FlexGrid';

export default function ServicesSection() {
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

  const services = [
    {
      title: 'Augmented Reality Campaigns',
      icon: '🔍',
      description:
        'Blending digital and real-world for unforgettable brand activations.',
      image: '/hyrox2.jpg',
    },
    {
      title: 'Virtual Worlds & Interactive Spaces',
      icon: '🏙',
      description: 'Create fully immersive brand environments.',
      image: '/virtualworlds.jpg',
    },
    {
      title: 'Gamified Customer Experiences',
      icon: '🎮',
      description: 'Engagement that keeps audiences coming back.',
      image: '/lfd-stall.webp',
    },
    {
      title: 'Live Events & Virtual Productions',
      icon: '🎤',
      description: 'Hybrid experiences that drive real results.',
      image: '/re.jpg',
    },
    {
      title: 'Exclusive Studio Access',
      icon: '🎥',
      description:
        'Your private greenscreen studio, fully equipped for pro productions.',
      image: '/studioimage.jpg',
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
      id="services"
      ref={sectionRef}
      className="py-24 bg-backgroundDark/95 relative"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            repeatType: 'loop',
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-altPrimary/5 rounded-full filter blur-3xl"
        ></motion.div>
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
            What You Can Offer{' '}
            <span className="text-primary">
              Without Lifting a Finger
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-textLight/80 max-w-3xl mx-auto"
          >
            Expand your service portfolio with cutting-edge immersive
            experiences, all delivered seamlessly under your brand.
          </motion.p>
        </div>

        {/* Using the FlexGrid component */}
        <FlexGrid
          columns={{ sm: 1, md: 2, lg: 3 }}
          gap="8"
          animate={true}
          container={container}
          item={item}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -10,
                transition: { duration: 0.2 },
              }}
              className="h-full"
            >
              <Card className="card-voyager h-full overflow-hidden bg-darkCard border border-primary/20 hover:border-primary/50 transition-all group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-darkBg to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-primary/90 text-darkBg p-2 rounded-full text-xl">
                    {service.icon}
                  </div>
                </div>
                <CardBody>
                  <h3 className="font-subheading text-2xl text-primary mb-3">
                    {service.title}
                  </h3>
                  <p className="text-textLight/70">
                    {service.description}
                  </p>
                </CardBody>
                <CardFooter className="pt-0">
                  <Link
                    href="#signup"
                    className="text-primary hover:text-accent font-medium"
                  >
                    Learn more →
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </FlexGrid>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button
            as={Link}
            href="#signup"
            className="bg-primary text-textLight font-medium hover:bg-accent px-6 py-3 rounded-md transition-all hover:scale-105 transform"
          >
            Start Selling Immersive →
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
