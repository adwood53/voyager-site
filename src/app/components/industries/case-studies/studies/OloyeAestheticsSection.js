/**
 * @fileoverview OloyeAestheticsSection component
 *
 * Individual case study section for Oloye Aesthetics digital transformation project.
 * Uses SharedStudyHero and contains detailed project information with
 * space for media content.
 */

'use client';

import { Card, CardBody, Button } from '@heroui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import SharedStudyHero from '../SharedStudyHero';

export default function OloyeAestheticsSection({ onClose }) {
  return (
    <div className="bg-darkBg min-h-screen">
      {/* Hero Section */}
      <SharedStudyHero
        icon="💄"
        industry="Beauty & Aesthetics"
        industryColor="bg-pink-500/20 text-pink-400 border-pink-500/30"
        title="Oloye Aesthetics"
        subtitle="Digital Transformation for Growth"
        description="We partnered with Oloye Aesthetics to streamline and elevate their digital presence, bringing together everything they needed into one seamless solution."
        ctaText="Start Your Beauty Project"
        ctaLink="/industries#signup"
        onClose={onClose}
      />

      {/* Main Content */}
      <section className="pb-16">
        <div className="container-voyager">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Column - Platform Features */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Client Features */}
              <Card className="bg-darkCard border border-pink-500/20 mb-8">
                <CardBody className="p-8">
                  <h3 className="text-2xl font-bold text-primary mb-6">
                    Through the new platform, clients can:
                  </h3>
                  <ul className="space-y-4">
                    {[
                      'Browse a beautifully designed, animated website',
                      'Book treatments and courses through a bespoke booking system',
                      'Make secure payments online',
                      'Enrol in a professional course and receive automated certificates on completion – all without manual intervention',
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
                        <div className="w-2 h-2 bg-pink-400 rounded-full mt-3 flex-shrink-0" />
                        <span className="text-textLight/80 leading-relaxed">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </CardBody>
              </Card>

              {/* Our Support */}
              <Card className="bg-darkCard border border-primary/20">
                <CardBody className="p-8">
                  <h3 className="text-2xl font-bold text-primary mb-6">
                    We supported with:
                  </h3>
                  <ul className="space-y-4">
                    {[
                      'Designing and building a fully branded, animated website',
                      'Developing an integrated booking and payment system',
                      'Creating a learning management platform that Oloye can easily edit and update with new courses',
                      'Automating the entire course journey, from purchase to certification',
                      'Consolidating multiple tools into one system, reducing monthly subscription costs',
                    ].map((support, index) => (
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
                          {support}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            </motion.div>

            {/* Right Column - Media & Results */}
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
                      src="/industries/beauty/bottles-3.jpg"
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

              {/* Results Section */}
              <Card className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/30">
                <CardBody className="p-8">
                  <h3 className="text-2xl font-bold text-emerald-400 mb-6">
                    Results
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-darkBg/40 rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-emerald-400">
                          8
                        </p>
                        <p className="text-textLight/60 text-sm">
                          Weeks Delivery
                        </p>
                      </div>
                      <div className="bg-darkBg/40 rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-emerald-400">
                          100%
                        </p>
                        <p className="text-textLight/60 text-sm">
                          On Time & Budget
                        </p>
                      </div>
                    </div>

                    <p className="text-textLight/80 leading-relaxed">
                      Delivered{' '}
                      <strong className="text-emerald-400">
                        in under 8 weeks, on time and within budget
                      </strong>
                      , the project exceeded expectations and gave
                      Oloye Aesthetics a future-proof platform that
                      runs efficiently - and can{' '}
                      <strong className="text-emerald-400">
                        start generating revenue overnight
                      </strong>
                      .
                    </p>
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
            <div className="bg-darkCard/60 border border-pink-500/20 rounded-2xl p-12">
              <h2 className="text-3xl font-bold text-textLight mb-4">
                Transform Your Beauty Business?
              </h2>
              <p className="text-textLight/70 mb-8 max-w-2xl mx-auto">
                Let&apos;s discuss how we can build a comprehensive
                digital platform that drives growth for your beauty or
                aesthetics business.
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
