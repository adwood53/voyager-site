/**
 * @fileoverview SharedStudyHero component
 *
 * Reusable hero component for individual case study sections.
 * Accepts props for customisation across different studies.
 */

'use client';

import { Button, Chip } from '@heroui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function SharedStudyHero({
  icon,
  industry,
  industryColor = 'bg-primary/20 text-primary border-primary/30',
  title,
  subtitle,
  description,
  backgroundImage,
  backgroundVideo,
  ctaText = 'Start Your Project',
  ctaLink = '/industries#signup',
  onClose,
}) {
  return (
    <section className="relative py-16 lg:py-20 overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0">
        {backgroundVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-20"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        ) : backgroundImage ? (
          <Image
            src={backgroundImage}
            alt={`${title} background`}
            fill
            className="object-cover opacity-20"
            priority
          />
        ) : (
          /* Default animated background */
          <>
            <motion.div
              className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary rounded-full filter blur-3xl opacity-10"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -30, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
            <motion.div
              className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-altPrimary rounded-full filter blur-3xl opacity-8"
              animate={{
                scale: [1, 1.2, 1],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          </>
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-darkBg/60" />
      </div>

      <div className="container-voyager relative z-10">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/industries/case-studies">
            <Button
              variant="light"
              className="text-primary hover:text-textLight"
            >
              ← Back to Case Studies
            </Button>
          </Link>
        </motion.div>

        {/* Header Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-6xl bg-darkBg/20 p-4 rounded-full backdrop-blur-sm">
              {icon}
            </div>
            <Chip className={industryColor}>{industry}</Chip>
          </div>

          <h1 className="heading-voyager text-4xl lg:text-6xl text-textLight mb-4">
            <span className="text-primary">{title}</span>
          </h1>

          <p className="text-xl lg:text-2xl text-textLight/70 mb-6">
            {subtitle}
          </p>

          <p className="text-lg text-textLight/80 leading-relaxed max-w-3xl mx-auto mb-8">
            {description}
          </p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href={ctaLink}>
              <Button
                size="lg"
                className="bg-primary text-darkBg hover:bg-accent transition-colors"
              >
                {ctaText}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
