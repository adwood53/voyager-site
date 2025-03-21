// src/app/our-code/page.js
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/src/app/components/Navbar';
import Footer from '@/src/app/components/Footer';
import TeamSection from '@/src/app/components/TeamSection';
import { Button } from '@heroui/react';

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-darkBg text-textLight overflow-hidden">
      <Navbar />

      <div className="relative py-4">
        {/* Background triangle elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary opacity-10 transform rotate-45"></div>
          <div className="absolute top-1/4 right-0 w-80 h-80 bg-primary opacity-5 transform -rotate-12"></div>
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary opacity-5 transform rotate-45"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-accent opacity-10 transform -rotate-12"></div>
        </div>

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
              Immersive technology is no longer just an idea; it's a
              powerful tool to captivate audiences, inspire
              creativity, and forge connections in ways once
              unimaginable. We are here to make the next level of
              technology accessible and affordable. Bold ideas are
              just the beginning. What follows is a clear, actionable
              plan to bring those ideas to life. Collaboration lies at
              the heart of every project, ensuring your vision is not
              only understood but elevated. Behind Voyager is a team
              like no other. Visionary thinkers, technical experts,
              and creative innovators come together, each bringing
              unique strengths to the table. This blend of talent
              ensures every challenge is met from every angle,
              resulting in projects that stand out and leave people
              talking about it long after the experience has ended.
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
