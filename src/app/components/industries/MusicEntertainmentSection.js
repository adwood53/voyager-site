/**
 * @fileoverview MusicEntertainmentSection component
 *
 * Individual industry section that loads dynamically when Music & Entertainment
 * is clicked in the industries grid. Contains detailed content and case studies.
 */

'use client';

import { Button, Chip, Card, CardBody } from '@heroui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function MusicEntertainmentSection({ onClose }) {
  return (
    <div className="bg-darkCard border border-primary/20 rounded-2xl p-8 overflow-hidden">
      {/* Header with close button */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-primary/20 p-4 rounded-full text-4xl">
            🎵
          </div>
          <div>
            <h3 className="text-3xl font-bold text-primary mb-2">
              Music & Entertainment
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
            Music is about more than sound - it's about belonging.
            With immersive merch, interactive posters, and digital
            drops, every fan gets closer to the artist and every
            release becomes a community moment.
          </p>

          <h5 className="text-lg font-bold text-primary mb-4">
            For Artists & Labels
          </h5>
          <ul className="space-y-3 text-textLight/80">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <strong>Drive chart success</strong> with bundled
              downloads that count.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <strong>Make merch meaningful</strong> with authentic,
              unlockable extras.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <strong>Grow your fan community</strong> with exclusive
              content and deeper connections.
            </li>
          </ul>

          <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <h6 className="font-semibold text-primary mb-2">
              Example Use Case
            </h6>
            <p className="text-textLight/70 text-sm">
              Tom Meighan Album
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
              'Vinyls',
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
            <Link
              href="/industries/case-studies/tom-meighan"
              className="block group"
            >
              <div className="bg-darkBg/50 border border-primary/20 rounded-lg p-4 hover:border-primary/40 transition-all group-hover:bg-darkBg/70">
                <h5 className="font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                  Tom Meighan NFC Enabled
                </h5>
                <p className="text-textLight/70 text-sm mb-3">
                  Limited-edition album release with interactive
                  VCards that connected fans directly to exclusive
                  content and streaming platforms.
                </p>
                <Chip
                  size="sm"
                  className="bg-altPrimary/20 text-altPrimary"
                >
                  Enhanced Fan Engagement
                </Chip>
              </div>
            </Link>
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
            Start Your Music Project
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
