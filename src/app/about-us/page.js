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
import ReviewPopup from '@/src/app/components/ReviewPopup';

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-darkBg text-textLight overflow-hidden">
      <Navbar />
      <ReviewPopup />
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
              Our team is a mix of creative technologists, developers,
              strategists, and content creators who thrive on bold
              ideas and flawless execution. It is where creativity
              meets commerce and your project won&apos;t just look
              spectacular, it will also be commercially sharp.
              <br /> <br />
              <h3 className="text-2xl md:text-3xl font-heading text-center mb-6">
                Our Approach
              </h3>
              From concept to launch, we make the process simple,
              seamless, and (dare we say) fun. You bring the vision,
              we bring:
              <br /> <br />
              <ul>
                <li>
                  Strategy - A clear journey mapped from start to
                  finish.
                </li>
                <li>
                  Creativity - No templates, no safe ideas, no
                  recycled concepts.
                </li>
                <li>
                  Technology - Proprietary technology and a global
                  partner network for easy delivery.
                </li>
                <li>
                  Commercial Thinking - Measurable results baked in
                  from day one.
                </li>
              </ul>
              <div />
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="text-lg"
              >
                <Button
                  as={Link}
                  href="/our-code"
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
