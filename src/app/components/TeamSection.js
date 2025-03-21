'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function TeamSection() {
  const sectionRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  const timeoutRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Transforms (if needed elsewhere)
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

  // Team members with hotspot positions
  const teamMembers = [
    {
      id: 1,
      name: 'Shane',
      role: 'Business Development Director',
      description:
        "With 20 years of experience building brands and businesses, I've transformed challenges into opportunities. Combining real-world grit with sharp business insight to deliver impactful results.",
      position: {
        top: '70%',
        left: '23%',
      },
    },
    {
      id: 2,
      name: 'Anthony',
      role: 'Technical Director',
      description:
        'An academic researcher, seasoned creative technologist, and technical director dedicated to pioneering immersive experiences and building dynamic communities.',
      position: {
        top: '70%',
        left: '41.5%',
      },
    },
    {
      id: 3,
      name: 'Ariya',
      role: 'Lead Developer',
      description:
        'Seasoned developer and self-starter with roots in programming since the age of 10. Ariya leverages innovative tech to turn visions into reality.',
      position: {
        top: '70%',
        left: '58%',
      },
    },
    {
      id: 4,
      name: 'Stacey',
      role: 'CEO',
      description:
        'Award-winning entrepreneur who leads with innovation and a purpose-driven vision. Stacey specialises in creating impactful strategies that drive business growth and meaningful change.',
      position: {
        top: '70%',
        left: '73%',
      },
    },
  ];

  // Show card on hover or click
  const showCard = (memberId) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveCard(memberId);
  };

  // Hide card after a short delay for smooth transitions
  const hideCard = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveCard(null);
    }, 2000);
  };

  // Clear any pending timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Reusable card content
  const CardContent = () => {
    const member = teamMembers.find((m) => m.id === activeCard);
    return (
      <>
        <motion.h3
          key={`name-${activeCard}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-heading text-primary mb-1"
        >
          {member.name}
        </motion.h3>
        <motion.h4
          key={`role-${activeCard}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-lg text-textLight opacity-90 mb-3"
        >
          {member.role}
        </motion.h4>
        <motion.p
          key={`desc-${activeCard}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-textLight opacity-80"
        >
          {member.description}
        </motion.p>
      </>
    );
  };

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative w-full bg-darkBg"
    >
      {/* Image container using a fixed aspect ratio */}
      <div className="relative w-full aspect-[16/9]">
        <Image
          src="/team.webp"
          alt="Our Team"
          fill
          priority
          className="object-contain"
          style={{
            objectPosition: 'center',
            objectFit: 'contain',
            width: '100%',
          }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.3) 60%, transparent 100%)',
          }}
        />

        {/* Heading text overlay */}
        <div className="absolute inset-0 z-20 flex items-start justify-center pt-4 md:pt-16 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="heading-voyager text-2xl md:text-5xl text-textLight mb-1 md:mb-4">
              Meet Our <span className="text-primary">Team</span>
            </h2>
            <p className="text-lg md:text-2xl text-textLight opacity-90 max-w-3xl mx-auto">
              The experts behind Voyager&apos;s immersive experiences
            </p>
          </motion.div>
        </div>

        {/* Interactive hotspots */}
        <div className="absolute inset-0 z-20">
          {teamMembers.map((member, i) => (
            <div key={member.id}>
              <motion.div
                className="absolute w-4 h-4 rounded-full bg-primary cursor-pointer"
                style={{
                  top: member.position.top,
                  left: member.position.left,
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
                onHoverStart={() => showCard(member.id)}
                onHoverEnd={hideCard}
                onClick={() => showCard(member.id)}
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
            </div>
          ))}
        </div>

        {/* Persistent info card container – its top position is calculated so it stays above the feature points.
            Adjust the "150px" offset as needed */}
        <div className="absolute inset-x-0 z-30 lg:top-[30%] md:top-[10%] top-[-35%] pointer-events-none flex justify-center">
          {activeCard && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-black/90 backdrop-blur-sm border border-primary border-opacity-40 rounded-lg p-6 shadow-glow-sm max-w-sm w-full mx-4"
            >
              <CardContent />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
