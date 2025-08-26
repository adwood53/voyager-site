/**
 * @fileoverview PropertyConstructionSection component
 *
 * Individual industry section that loads dynamically when Property & Construction
 * is clicked in the industries grid. Contains detailed content and case studies.
 */

'use client';

import { Button, Chip } from '@heroui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PropertyConstructionSection({ onClose }) {
  return (
    <div className="bg-darkCard border border-primary/20 rounded-2xl p-8 overflow-hidden">
      {/* Header with close button */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-primary/20 p-4 rounded-full text-4xl">
            🏗️
          </div>
          <div>
            <h3 className="text-3xl font-bold text-primary mb-2">
              Property & Construction
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
            Selling property is about more than square footage - it's
            about vision. Interactive brochures, signage, and
            hoardings give buyers instant access to 360° tours,
            floorplans, and bookings.
          </p>

          <h5 className="text-lg font-bold text-primary mb-4">
            For Agents & Developers
          </h5>
          <ul className="space-y-3 text-textLight/80">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <strong>Show properties</strong> with instant 360° tours
              and floorplans.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <strong>Book viewings</strong> directly through
              brochures or signage.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <strong>Capture leads</strong> automatically for fast
              follow-ups.
            </li>
          </ul>

          <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <h6 className="font-semibold text-primary mb-2">
              Example Use Cases
            </h6>
            <p className="text-textLight/70 text-sm">
              Property Demo & Features
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
              'Hoodies',
              'T-Shirts',
              'Posters',
              'Fliers',
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
            Start Your Property & Construction Project
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
