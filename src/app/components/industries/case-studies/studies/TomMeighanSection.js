/**
 * @fileoverview TomMeighanSection component
 *
 * Individual case study section for Tom Meighan NFC vinyl and VCards project.
 * Uses SharedStudyHero and contains detailed project information with
 * space for media content.
 */

'use client';

import { Card, CardBody, Button } from '@heroui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SharedStudyHero from '../SharedStudyHero';

export default function TomMeighanSection({ onClose }) {
  return (
    <div className="bg-darkBg min-h-screen">
      {/* Hero Section */}
      <SharedStudyHero
        icon="🎵"
        industry="Music & Entertainment"
        industryColor="bg-purple-500/20 text-purple-400 border-purple-500/30"
        title="Tom Meighan"
        subtitle="NFC Enabled Vinyl & VCards"
        description="We collaborated with Tom Meighan to launch a limited-edition Live Lounge style album, recorded exclusively with him in session. Each vinyl was paired with a VCard, transforming a traditional music release into an interactive fan experience."
        ctaText="Start Your Music Project"
        ctaLink="/industries#signup"
        onClose={onClose}
      />

      {/* Main Content */}
      <section className="pb-16">
        <div className="container-voyager">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Column - Fan Experience */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Fan Features */}
              <Card className="bg-darkCard border border-purple-500/20 mb-8">
                <CardBody className="p-8">
                  <h3 className="text-2xl font-bold text-primary mb-6">
                    Through the VCards, fans could:
                  </h3>
                  <ul className="space-y-4">
                    {[
                      'Instantly play the full recorded session',
                      'Stream tracks via their preferred streaming platform',
                      "Access Tom's official website and social channels",
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
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-3 flex-shrink-0" />
                        <span className="text-textLight/80 leading-relaxed">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </CardBody>
              </Card>

              {/* Additional Support */}
              <Card className="bg-darkCard border border-primary/20">
                <CardBody className="p-8">
                  <h3 className="text-2xl font-bold text-primary mb-6">
                    In addition, we supported Tom&apos;s wider brand
                    promotion with:
                  </h3>
                  <ul className="space-y-4">
                    {[
                      'A dedicated Press VCard that plays his latest single',
                      'Direct access to download his press pack and official photos',
                      'Links to his website and socials for media engagement',
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

            {/* Right Column - Media & Impact */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Media Placeholder */}
              <Card className="bg-darkCard border border-purple-500/20 mb-8">
                <CardBody className="p-8">
                  <div className="bg-purple-500/10 rounded-lg p-12 text-center mb-4">
                    <div className="text-6xl mb-4">🎬</div>
                    <p className="text-textLight/60 mb-2">
                      Project imagery and videos
                    </p>
                    <p className="text-textLight/40 text-sm">
                      Path: /images/case-studies/tom-meighan/
                    </p>
                  </div>
                  <p className="text-textLight/60 text-sm text-center">
                    Visual content showcasing the vinyl, VCards, and
                    recording session
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
                      This project elevated a physical vinyl release
                      into a
                      <strong className="text-emerald-400">
                        {' '}
                        connected digital experience
                      </strong>
                      . Fans gained exclusive content and seamless
                      access to Tom&apos;s world, while press and
                      media received a professional, instant way to
                      engage with his latest work.
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
            <div className="bg-darkCard/60 border border-purple-500/20 rounded-2xl p-12">
              <h2 className="text-3xl font-bold text-textLight mb-4">
                Ready to Transform Your Music Release?
              </h2>
              <p className="text-textLight/70 mb-8 max-w-2xl mx-auto">
                Let&apos;s discuss how we can create an interactive
                experience that connects your fans directly to your
                music.
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
