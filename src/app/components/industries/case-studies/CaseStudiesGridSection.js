/**
 * @fileoverview CaseStudiesGridSection component
 *
 * Simple grid of case studies with direct links to static pages.
 * No dynamic loading - just clean navigation to individual case study pages.
 */

'use client';

import { Button, Card, CardBody, Chip } from '@heroui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const caseStudies = [
  {
    id: 'hyrox-corby',
    title: 'Hyrox Corby',
    subtitle: 'NFC Enabled Bottled Water',
    industry: 'Sport & Fitness',
    description:
      'Interactive event hub through NFC-enabled bottles that streamlined competitor onboarding and drove future sign-ups.',
    impact: 'Seamless competitor experience',
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
    icon: '🏃‍♂️',
    tags: ['NFC Technology', 'Event Management', 'AR Platform'],
    href: '/industries/case-studies/hyrox-corby',
  },
  {
    id: 'tom-meighan',
    title: 'Tom Meighan',
    subtitle: 'NFC Enabled Vinyl & VCards',
    industry: 'Music & Entertainment',
    description:
      'Limited-edition album release with interactive VCards that connected fans directly to exclusive content and streaming platforms.',
    impact: 'Enhanced fan engagement',
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30',
    icon: '🎵',
    tags: ['NFC Technology', 'Music Release', 'Fan Engagement'],
    href: '/industries/case-studies/tom-meighan',
  },
  {
    id: 'oloye-aesthetics',
    title: 'Oloye Aesthetics',
    subtitle: 'Digital Transformation for Growth',
    industry: 'Beauty & Aesthetics',
    description:
      'Complete digital platform with integrated booking, payments, and learning management - delivered in 8 weeks.',
    impact: 'Revenue generation overnight',
    color: 'from-pink-500/20 to-rose-500/20',
    borderColor: 'border-pink-500/30',
    icon: '💄',
    tags: ['Digital Platform', 'Booking System', 'LMS'],
    href: '/industries/case-studies/oloye-aesthetics',
  },
];

export default function CaseStudiesGridSection() {
  return (
    <section className="py-16 bg-darkBg relative">
      <div className="container-voyager">
        {/* Case Studies Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-20"
        >
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={study.href} className="block group">
                <Card
                  className={`
                  bg-gradient-to-br ${study.color} 
                  border ${study.borderColor} 
                  hover:border-primary/50 
                  transition-all duration-300 
                  group-hover:scale-[1.02] 
                  group-hover:shadow-xl 
                  group-hover:shadow-primary/10
                  h-full
                `}
                >
                  <CardBody className="p-8">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-4xl bg-darkBg/20 p-3 rounded-full">
                        {study.icon}
                      </div>
                      <div>
                        <Chip
                          size="sm"
                          className="bg-primary/20 text-primary mb-2"
                        >
                          {study.industry}
                        </Chip>
                        <h3 className="text-2xl font-bold text-primary group-hover:text-primary transition-colors">
                          {study.title}
                        </h3>
                        <p className="text-textLight text-sm">
                          {study.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-textLight leading-relaxed mb-6">
                      {study.description}
                    </p>

                    {/* Impact */}
                    <div className="bg-darkBg/30 rounded-lg p-4 mb-6">
                      <p className="text-primary font-semibold text-sm mb-1">
                        Key Impact:
                      </p>
                      <p className="text-textLight font-medium">
                        {study.impact}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {study.tags.map((tag) => (
                        <Chip
                          key={tag}
                          size="sm"
                          variant="flat"
                          className="bg-darkBg/40 text-textLight"
                        >
                          {tag}
                        </Chip>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <Button
                        size="sm"
                        variant="flat"
                        className="bg-primary/20 text-primary group-hover:bg-primary group-hover:text-darkBg transition-colors"
                      >
                        Read Case Study →
                      </Button>
                      <div className="text-textLight/40 group-hover:text-textLight/60 transition-colors">
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-darkCard/60 border border-primary/20 rounded-2xl p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-textLight mb-4">
              Ready to Create Your Own Success Story?
            </h2>
            <p className="text-textLight/70 mb-8 text-lg">
              From concept to deployment, we&apos;ll help you build
              immersive experiences that engage your audience and
              drive real results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/industries#signup">
                <Button
                  size="lg"
                  className="bg-primary text-darkBg hover:bg-accent transition-colors"
                >
                  Start Your Project
                </Button>
              </Link>
              <Link href="/how">
                <Button
                  size="lg"
                  variant="bordered"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  Learn About Our Process
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
