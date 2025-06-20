// src/app/our-code/page.js
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/src/app/components/Navbar';
import Footer from '@/src/app/components/Footer';
import TeamSection from '@/src/app/components/for-partner-page/TeamSection';
import { Button } from '@heroui/react';

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-darkBg text-textLight overflow-hidden">
      <Navbar />

      <div className="relative py-4">
        {/* Floating particles/elements for depth */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full z-10"
            style={{
              backgroundColor:
                i % 2 === 0 ? 'var(--primary)' : 'var(--alt-primary)',
              opacity: 0.2 + Math.random() * 0.2,
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(2px)',
            }}
            animate={{
              x: [0, Math.random() * 40 - 20],
              y: [0, Math.random() * 40 - 20],
              scale: [1, 1 + Math.random() * 0.1],
              rotate: [0, Math.random() * 20 - 10],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}

        <div className="container-voyager relative z-10 max-w-5xl mx-auto px-6">
          {/* Header with logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center mb-16"
          >
            <div className="relative w-20 h-20 mb-8">
              <Image
                src="/Voyager-Box-Logo.png"
                alt="Voyager Logo"
                fill
                className="object-contain"
              />
            </div>

            <h1 className="text-6xl md:text-7xl font-heading text-center mb-6">
              About <span className="text-primary">Us</span>
            </h1>
            <div className="text-1xl md:text-2xl font-body text-center mb-6">
              Immersive technology is no longer just an idea;
              it&apos;s a powerful tool to captivate audiences,
              inspire creativity, and create connections in ways once
              unimaginable.
              <br /> <br />
              We are here to make the next level of technology
              accessible and affordable. Bold ideas are just the
              beginning. What follows is a clear, actionable plan to
              bring those ideas to life.
              <br /> <br />
              Collaboration lies at the heart of every project,
              ensuring your vision is not only understood but
              elevated.
              <br /> <br />
              Behind Voyager is a team like no other. Visionary
              thinkers, technical experts, and creative innovators
              come together, each bringing unique strengths to the
              table.
              <br /> <br />
              This blend of talent ensures every challenge is met from
              every angle, resulting in projects that stand out and
              leave people talking about it long after the experience
              has ended.
              <div />
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="text-lg"
              >
                <Button
                  as={Link}
                  href="https://www.voyagervrlab.co.uk/our-code"
                  target="_blank"
                  className="bg-primary text-textLight font-medium hover:bg-accent px-6 py-6 mt-12 mb-0  rounded-md transition-all hover:shadow-glow glitch-effect"
                >
                  Our Code
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      <TeamSection />
      <Footer />
    </main>
  );
}
