/**
 * @fileoverview ContentCreatorsSection component
 *
 * Individual industry section that loads dynamically when Content Creators & Influencers
 * is clicked in the industries grid. Contains detailed content and case studies.
 */

'use client';

import { Button, Chip } from '@heroui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ContentCreatorsSection({ onClose }) {
  return (
    <div className="bg-darkCard border border-primary/20 rounded-2xl p-8 overflow-hidden">
      {/* Header with close button */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-primary/20 p-4 rounded-full text-4xl">
            📱
          </div>
          <div>
            <h3 className="text-3xl font-bold text-primary mb-2">
              Content Creators & Influencers
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
            Audiences crave more than just likes and follows - they
            want access. With interactive merch and drops, creators
            can deepen connections, capture data, and build
            communities that last.
          </p>

          <h5 className="text-lg font-bold text-primary mb-4">
            For Creators & Agencies
          </h5>
          <ul className="space-y-3 text-textLight/80">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <strong>Sell out drops</strong> with interactive,
              limited-edition merch.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <strong>Own your audience</strong> by capturing fan data
              directly.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <strong>Boost engagement</strong> with unlockable
              content and games.
            </li>
          </ul>
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
              'Bottles',
              'V-cards',
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
            Start Your Creator Project
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
