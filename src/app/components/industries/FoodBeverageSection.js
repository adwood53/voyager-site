/**
 * @fileoverview FoodBeverageSection component
 *
 * Individual industry section that loads dynamically when Food & Beverage
 * is clicked in the industries grid. Contains detailed content and case studies.
 */

'use client';

import { Button, Chip } from '@heroui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FoodBeverageSection({ onClose }) {
  return (
    <div className="bg-darkCard border border-primary/20 rounded-2xl p-8 overflow-hidden">
      {/* Header with close button */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-primary/20 p-4 rounded-full text-4xl">
            🍽️
          </div>
          <div>
            <h3 className="text-3xl font-bold text-primary mb-2">
              Food & Beverage
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
            Food and drink carry stories. Interactive packaging and
            menus let customers unlock recipes, provenance, and
            rewards that build loyalty with every bite and sip.
          </p>

          <h5 className="text-lg font-bold text-primary mb-4">
            For Brands & Retailers
          </h5>
          <ul className="space-y-3 text-textLight/80">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <strong>Share recipes & stories</strong> right from
              packaging.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <strong>Gamify loyalty</strong> with tap-to-reward
              activations.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <strong>Build trust</strong> with sourcing and
              sustainability info.
            </li>
          </ul>

          <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <h6 className="font-semibold text-primary mb-2">
              Example Use Cases
            </h6>
            <p className="text-textLight/70 text-sm">jAGA Demo</p>
            <p className="text-textLight/70 text-sm mt-2">
              For POS we offer a tag only service and the tag can be
              added to the unit.
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
            <Link
              href="/industries/case-studies/hyrox-corby"
              className="block group"
            >
              <div className="bg-darkBg/50 border border-primary/20 rounded-lg p-4 hover:border-primary/40 transition-all group-hover:bg-darkBg/70">
                <h5 className="font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                  Hyrox NFC Enabled Bottled Water
                </h5>
                <p className="text-textLight/70 text-sm mb-3">
                  Interactive event hub through NFC-Enabled bottles
                  that streamlined competitor onboarding and drove
                  future sign-ups.
                </p>
                <Chip
                  size="sm"
                  className="bg-altPrimary/20 text-altPrimary"
                >
                  Seamless Competitor Experience
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
            Start Your Food & Beverage Project
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
