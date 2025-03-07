// src/app/our-code/page.js
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '@/src/app/components/Navbar';
import Footer from '@/src/app/components/Footer';

export default function OurCodePage() {
  // Array of code statements
  const codeStatements = [
    {
      title: 'We show up.',
      description:
        "Every project. Every client. Every time. We bring 100% of ourselves to the table - because anything less isn't an option.",
    },
    {
      title: "We don't stitch up.",
      description:
        "For us, business is personal. Clients aren't just contracts; they're friends, family, and partners. We treat them with the care and respect they deserve.",
    },
    {
      title: 'We shake shit up.',
      description:
        "Trends are for followers. We're here to lead. To innovate. To create work that turns heads, shifts paradigms, and makes people say," +
        '"' +
        'How the hell did they do that?' +
        '"',
    },
    {
      title: 'We are the masters of our ship.',
      description:
        'No textbooks. No rule books. We chart our own course, embracing the unknown and trusting our instincts.',
    },
    {
      title: 'We make it easy.',
      description:
        "Tech can be complicated, but people aren't. We bridge the gap, working with people to make the tech work for them - simple, smooth, seamless.",
    },
    {
      title: 'We f**k up.',
      description:
        "We're human. We own our mistakes, learn from them, and fix them fast. Because integrity is everything.",
    },
    {
      title: 'When they shine, we shine.',
      description:
        "We don't chase the spotlight; we put our clients in it. Their wins are our wins. We exist to create cool shit that makes them look amazing.",
    },
    {
      title: 'We use the front door.',
      description:
        'No sneaky backdoor deals, no cutting corners. Transparency and trust are our cornerstones, and opportunities flow both ways.',
    },
    {
      title: 'We never give up.',
      description:
        'Every challenge is an opportunity. When one path closes, we find another. No problem is unsolvable - just undiscovered.',
    },
    {
      title: 'We create win, win, win.',
      description:
        "Client. Team. Audience. Every project we touch ends with a victory for all. That's how we measure success.",
    },
  ];

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
              Our <span className="text-primary">Code</span>
            </h1>
          </motion.div>

          {/* Code statements list */}
          <div className="space-y-16 md:space-y-24">
            {codeStatements.map((statement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true, margin: '-100px' }}
                className="text-center max-w-4xl mx-auto"
              >
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-primary">
                  {statement.title}
                </h2>
                <p className="text-xl md:text-2xl leading-relaxed text-textLight opacity-90">
                  {statement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
