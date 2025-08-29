/**
 * @fileoverview HyroxCorbySection component
 *
 * Individual case study section for Hyrox Corby NFC bottled water project.
 * Uses SharedStudyHero and contains detailed project information with
 * space for media content.
 */

'use client';

import { Card, CardBody, Button } from '@heroui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import SharedStudyHero from '../SharedStudyHero';

export default function HyroxCorbySection({ onClose }) {
  return (
    <div className="bg-darkBg min-h-screen">
      {/* Hero Section */}
      <SharedStudyHero
        icon="🏃‍♂️"
        industry="Sport & Fitness"
        industryColor="bg-blue-500/20 text-blue-400 border-blue-500/30"
        title="Hyrox Corby"
        subtitle="NFC Enabled Bottled Water"
        description="We partnered with Hyrox Corby to create a unique onboarding and engagement tool for competitors at the Hyrox Sim events. By embedding NFC technology into bottled water, every participant had instant access to everything they needed throughout the day."
        ctaText="Start Your Sport Project"
        ctaLink="/industries#signup"
        onClose={onClose}
      />

      {/* Main Content */}
      <section className="pb-16">
        <div className="container-voyager">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Column - Participant Features */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-darkCard border border-blue-500/20 mb-8">
                <CardBody className="p-8">
                  <h3 className="text-2xl font-bold text-primary mb-6">
                    Through the bottles, participants could:
                  </h3>
                  <ul className="space-y-4">
                    {[
                      'Receive a personalised welcome from the organisers',
                      'Access key event information and schedules',
                      'Download their race photos post-event',
                      'View live race results',
                      'Sign up instantly for the next race',
                    ].map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1,
                        }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0" />
                        <span className="text-textLight/80 leading-relaxed">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </CardBody>
              </Card>

              {/* Our Role */}
              <Card className="bg-darkCard border border-primary/20">
                <CardBody className="p-8">
                  <h3 className="text-2xl font-bold text-primary mb-6">
                    Our role included:
                  </h3>
                  <ul className="space-y-4">
                    {[
                      'Designing the bottle and ensuring NFC integration',
                      'Producing content in our green screen studio for the experience',
                      'Building the augmented reality platform accessed via the bottles',
                      'Creating clear user instructions and explainer materials',
                      'Providing on-site support to ensure smooth delivery on the day',
                    ].map((role, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1,
                        }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                        <span className="text-textLight/80 leading-relaxed">
                          {role}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            </motion.div>

            {/* Right Column - Media & Impact */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Media Placeholder */}
              <Card className="bg-darkCard border border-blue-500/20 mb-8 h-[750px]">
                <CardBody className="p-8">
                  <div className="bg-blue-500/10 rounded-lg p-12 text-center mb-4 h-[750px]">
                    <Image
                      src="/industries/Sports/bottles-3.jpg"
                      alt={`Hyrox Corby Bottles`}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <p className="text-textLight/60 text-sm text-center">
                    Visual content showcasing the NFC bottles and
                    competitor experience
                  </p>
                </CardBody>
              </Card>

              {/* Impact Section */}
              <Card className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/30">
                <CardBody className="p-8">
                  <h3 className="text-2xl font-bold text-emerald-400 mb-6">
                    Impact
                  </h3>
                  <div className="space-y-4">
                    <p className="text-textLight/80 leading-relaxed">
                      This activation turned a simple bottle of water
                      into an
                      <strong className="text-emerald-400">
                        {' '}
                        interactive event hub
                      </strong>{' '}
                      - streamlining competitor onboarding, extending
                      engagement after the race, and driving future
                      sign-ups.
                    </p>
                    <p className="text-textLight/80 leading-relaxed">
                      It also gave participants{' '}
                      <strong className="text-emerald-400">
                        a smile when they opened it
                      </strong>
                      .
                    </p>

                    {/* Quote Placeholder */}
                    <div className="mt-6 p-4 bg-darkBg/40 border border-emerald-500/20 rounded-lg">
                      <p className="text-emerald-400 font-semibold mb-2">
                        Client Testimonial
                      </p>
                      <p className="text-textLight/60 italic">
                        "Quote from Alex" -{' '}
                        <span className="text-textLight/40 text-sm">
                          [Awaiting testimonial content]
                        </span>
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <div className="bg-darkCard/60 border border-blue-500/20 rounded-2xl p-12">
              <h2 className="text-3xl font-bold text-textLight mb-4">
                Inspired by This Project?
              </h2>
              <p className="text-textLight/70 mb-8 max-w-2xl mx-auto">
                Let's discuss how we can create a similar immersive
                experience for your sport or fitness brand.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  as={Link}
                  href="/industries#signup"
                  size="lg"
                  className="bg-primary text-darkBg hover:bg-accent"
                >
                  Start Your Beauty Project
                </Button>
                <Button
                  as={Link}
                  href="/industries/case-studies"
                  size="lg"
                  variant="bordered"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  View More Case Studies
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
