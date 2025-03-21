'use client';

import { Button, Link, Tooltip } from '@heroui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function TeamSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Framer Motion transforms for fade, scale, etc.
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

  // Manually define hotspot positions (tooltip text, top, left)
  const teamHotspots = [
    {
      tooltip: '4K Cameras',
      top: '40%',
      left: '92%',
    },
    {
      tooltip: 'Full Audio Setup',
      top: '60%',
      left: '47%',
    },
    {
      tooltip: 'Production Lighting',
      top: '25%',
      left: '65%',
    },
    {
      tooltip: 'State-of-the-art Infinity Cove',
      top: '25%',
      left: '25%',
    },
  ];
  return (
    <section
      id="team"
      ref={sectionRef}
      className="py-24 w-full h-[100svh] bg-darkBg relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="has-tooltip">
          <Image
            src="/studiobackground.jpeg"
            alt="Studio background"
            fill
            className="object-cover"
          />
          <span className="custom-tooltip">Our Team</span>
        </div>
      </div>

      {/* Interactive hotspots (manual positions) */}
      <div className="absolute inset-0 z-10">
        {teamHotspots.map((hotspot, i) => (
          <Tooltip key={i} content={hotspot.tooltip}>
            <motion.div
              className="absolute w-4 h-4 rounded-full bg-primary cursor-pointer"
              style={{
                top: hotspot.top,
                left: hotspot.left,
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
              {/* Pulsating inner circle */}
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
    </section>
  );
}
