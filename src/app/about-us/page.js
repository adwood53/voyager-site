// src/app/our-code/page.js
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '@/src/app/components/Navbar';
import Footer from '@/src/app/components/Footer';
import TeamSection from '@/src/app/components/TeamSection';

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-darkBg text-textLight overflow-hidden">
      <Navbar />

      <div className="relative py-12 md:py-24">
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
          </motion.div>
        </div>
      </div>
      <TeamSection />
      <Footer />
    </main>
  );
}
