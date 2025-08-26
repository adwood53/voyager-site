/**
 * @fileoverview EventsHospitalitySection component
 *
 * Individual industry section that loads dynamically when Events & Hospitality
 * is clicked in the industries grid. Contains detailed content and case studies.
 */

'use client';

import { Button, Chip } from '@heroui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function EventsHospitalitySection({ onClose }) {
  return (
    <div className="bg-darkCard border border-primary/20 rounded-2xl p-8 overflow-hidden">
      {/* Header with close button */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-primary/20 p-4 rounded-full text-4xl">
            🎪
          </div>
          <div>
            <h3 className="text-3xl font-bold text-primary mb-2">
              Events & Hospitality
            </h3>
            <p className="text-textLight/70">Industry Deep Dive</p>
          </div>
        </div>

        <Button
          size="sm"
          variant="light"
          className="text-textLight/60 hover:text-textLight"
          onClick={onClose}
        >
          ✕ Close
        </Button>
      </div>

      {/* Content Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid lg:grid-cols-2 gap-12"
      >
        {/* Overview */}
        <div>
          <h4 className="text-xl font-bold text-textLight mb-4">
            Industry Overview
          </h4>
          <p className="text-textLight/80 leading-relaxed mb-6">
            Great events don't just happen in the moment - they live
            on in memory. With interactive lanyards, menus, and
            invites, organisers can guide, delight, and capture data
            from guests seamlessly.
          </p>

          <h5 className="text-lg font-bold text-primary mb-4">
            For Organisers & Venues
          </h5>
          <ul className="space-y-3 text-textLight/80">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <strong>Update instantly</strong> with digital schedules
              and menus.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <strong>Capture guest data</strong> for retargeting and
              loyalty programs.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <strong>Upsell easily</strong> with tap-to-upgrade and
              rewards.
            </li>
          </ul>

          <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <h6 className="font-semibold text-primary mb-2">
              Example Use Cases
            </h6>
            <p className="text-textLight/70 text-sm">
              Stericyle example - NBA Example
            </p>
          </div>
        </div>

        {/* Products & Case Studies */}
        <div>
          <h4 className="text-xl font-bold text-textLight mb-4">
            Popular Products
          </h4>
          <p className="text-textLight/70 text-sm mb-4">
            Products to attach experiences to:
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              'V-cards',
              'Roller Banners',
              'Table Favours',
              'T-Shirts',
              'Posters',
              'Fliers',
              'Brochures',
            ].map((product) => (
              <Chip
                key={product}
                size="sm"
                variant="flat"
                className="bg-primary/20 text-primary"
              >
                {product}
              </Chip>
            ))}
          </div>

          <h4 className="text-xl font-bold text-textLight mb-4">
            Related Case Studies
          </h4>
          <div className="space-y-4">
            <div className="bg-darkBg/50 border border-primary/20 rounded-lg p-4 text-center">
              <p className="text-textLight/60 text-sm">
                Case studies coming soon for this industry.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 justify-center mt-12 pt-8 border-t border-primary/20"
      >
        <Link href="#signup">
          <Button
            size="lg"
            className="bg-primary text-darkBg hover:bg-accent"
          >
            Start Your Events & Hospitality Project
          </Button>
        </Link>
        <Link href="/industries/case-studies">
          <Button
            size="lg"
            variant="bordered"
            className="border-primary text-primary hover:bg-primary/10"
          >
            View All Case Studies
          </Button>
        </Link>
        <Button
          size="lg"
          variant="light"
          className="text-textLight/60 hover:text-textLight"
          onClick={onClose}
        >
          ↑ Back to Industries
        </Button>
      </motion.div>
    </div>
  );
}
