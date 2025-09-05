/**
 * @fileoverview CompetitionsGamingSection component
 *
 * Individual industry section that loads dynamically when Competitions & Gaming
 * is clicked in the industries grid. Contains detailed content and case studies.
 * NOTE: Currently contains placeholder content - needs proper copy.
 */

'use client';

import { Button, Chip } from '@heroui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useModal } from '../modal/core/ModalEngine';
import { JotFormModal } from '../modal/types/ModalTypes';

export default function CompetitionsGamingSection({ onClose }) {
  const { openModal } = useModal();
  return (
    <div className="bg-darkCard border border-primary/20 rounded-2xl p-8 overflow-hidden">
      {/* Header with close button */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-primary/20 p-4 rounded-full text-4xl">
            🎮
          </div>
          <div>
            <h3 className="text-3xl font-bold text-primary mb-2">
              Competitions & Gaming
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
          <div className="bg-yellow-500/20 border border-yellow-500/40 rounded-lg p-4 mb-6">
            <p className="text-yellow-300 text-sm font-medium">
              ⚠️ Content needed: This section requires proper copy and
              messaging.
            </p>
          </div>
          <p className="text-textLight/80 leading-relaxed mb-6">
            [Placeholder content - needs proper industry overview
            describing how immersive technology can enhance
            competitions, gaming events, tournaments, and interactive
            experiences for participants and spectators.]
          </p>

          <h5 className="text-lg font-bold text-primary mb-4">
            For Event Organisers & Gaming Brands
          </h5>
          <ul className="space-y-3 text-textLight/80">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <strong>[Placeholder]</strong> - needs benefit
              description.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <strong>[Placeholder]</strong> - needs benefit
              description.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <strong>[Placeholder]</strong> - needs benefit
              description.
            </li>
          </ul>
        </div>

        {/* Products & Case Studies */}
        <div>
          <h4 className="text-xl font-bold text-textLight mb-4">
            Popular Products
          </h4>
          <p className="text-textLight/70 text-sm mb-4">
            Products to attach experiences to (needs verification):
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              'V-cards',
              'Wristbands',
              'Posters',
              'Fliers',
              'T-Shirts',
              'Hoodies',
            ].map((product) => (
              <Chip
                key={product}
                size="sm"
                variant="flat"
                className="bg-primary/20 text-primary opacity-60"
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
        <Button
          size="lg"
          className="bg-primary text-darkBg hover:bg-accent"
          onPress={() =>
            openModal(JotFormModal, {
              isOpen: true,
              formId: '251762903523052',
              title: 'Build your Custom Experience!',
              onSubmit: (data) => {
                console.log('Form submitted:', data);
              },
            })
          }
        >
          Start Your Gaming Project
        </Button>
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
