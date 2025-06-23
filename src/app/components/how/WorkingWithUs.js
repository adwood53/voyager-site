'use client';

import { motion } from 'framer-motion';

export default function WorkingWithUs() {
  // Process steps data structure
  const processSteps = [
    {
      emoji: '🧠',
      title: 'Campaign Strategy',
      description:
        'From brand goals to user journeys, we help shape immersive campaigns that connect and convert.',
    },
    {
      emoji: '🎨',
      title: 'Creative Direction',
      description:
        'Every experience needs a narrative. We can support with design visual identity, user flow, and content to make your brand pop.',
    },
    {
      emoji: '🌐',
      title: '3D & Immersive Development',
      description:
        'We create the worlds your audience can explore — from animated 3D assets to interactive spaces and gamified portals.',
    },
    {
      emoji: '📲',
      title: 'App & Web Platform Builds',
      description:
        'Need a branded hub or loyalty system? We build scalable, intuitive WebApps that house your content and drive engagement.',
    },
    {
      emoji: '🎥',
      title: 'Studio Production',
      description:
        'Cinematic shoots, greenscreen, CGI, and motion capture - all in our in-house infinity cove studio.',
    },
    {
      emoji: '🧪',
      title: 'Testing & Deployment',
      description:
        'Before your campaign goes live, we make sure it works perfectly across every device and entry point.',
    },
    {
      emoji: '📊',
      title: 'Analytics & Optimisation',
      description:
        "We capture data, track engagement, and help you evolve your campaign based on what's working in real-time.",
    },
  ];

  return (
    <section
      id="working-with-us"
      className="py-24 bg-gradient-to-b from-darkBg to-darkCard"
    >
      <div className="container-voyager">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="heading-voyager text-4xl md:text-5xl lg:text-6xl text-textLight mb-6"
          >
            How We Build Your{' '}
            <span className="text-primary">Immersive Campaign</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-textLight opacity-80 max-w-4xl mx-auto leading-relaxed"
          >
            We offer more than tech. We offer the tools, talent, and
            strategy to turn ideas into unforgettable experiences.
            Here&apos;s what goes into every brand activation we
            deliver:
          </motion.p>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              className={`group relative ${index === 6 ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''}`}
            >
              {/* Card background with gradient border */}
              <div className="relative bg-darkCard border border-primary border-opacity-20 rounded-xl p-6 h-full transition-all duration-300 group-hover:border-opacity-50 group-hover:shadow-2xl overflow-hidden">
                {/* Step number indicator */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-primary bg-opacity-20 rounded-full flex items-center justify-center text-primary text-sm font-bold">
                  {index + 1}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Emoji icon with animation */}
                  <motion.div
                    className="text-4xl mb-4 inline-block"
                    whileHover={{
                      scale: 1.2,
                      rotate: [0, -10, 10, 0],
                      transition: { duration: 0.5 },
                    }}
                  >
                    {step.emoji}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-textLight mb-3 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-textLight opacity-80 leading-relaxed group-hover:opacity-100 transition-opacity duration-300">
                    {step.description}
                  </p>
                </div>

                {/* Decorative corner elements */}
                <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom section with process flow visualisation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-primary/10 to-altPrimary/10 border border-primary border-opacity-30 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-heading text-primary mb-4">
              From Concept to Launch
            </h3>
            <p className="text-textLight opacity-80 text-lg leading-relaxed mb-6">
              Every project follows our proven process, ensuring
              seamless delivery and exceptional results. We work
              closely with you at every stage, keeping you informed
              and involved throughout the journey.
            </p>

            {/* Process flow indicator */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {[
                'Strategy',
                'Create',
                'Build',
                'Test',
                'Launch',
                'Optimise',
              ].map((stage, index) => (
                <div key={index} className="flex items-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.6 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-primary/20 text-primary px-3 py-1 rounded-full text-lg font-medium"
                  >
                    {stage}
                  </motion.div>
                  {index < 5 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="w-4 h-px bg-gradient-to-r from-primary to-altPrimary mx-2"
                    ></motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
