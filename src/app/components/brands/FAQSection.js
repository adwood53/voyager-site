'use client';

import {
  Accordion,
  AccordionItem,
  Button,
  Link,
} from '@heroui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function FAQSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [100, 0, 0, -100]
  );

  const faqs = [
    {
      question: 'What is NFC marketing?',
      answer:
        'NFC (Near Field Communication) lets people tap their phones on a product or item to instantly access digital content - no apps, no QR codes, no friction. It is the same technology that you use Apple or Google Pay.',
      category: 'Technology',
    },
    {
      question: 'Do I need a special app to view the experiences?',
      answer:
        "Nope! All of our experiences work directly through the phone's browser - just tap or scan and you're in. No downloads, no delays.",
      category: 'Technology',
    },
    {
      question: 'Can I use a QR code instead of NFC?',
      answer:
        'Yes! Every experience we build can also be accessed via a custom QR code if you prefer.',
      category: 'Technology',
    },
    {
      question: 'What kind of content can I link to my NFC products?',
      answer:
        'We offer everything from simple swipeable portfolios to immersive 360° videos, 3D product demos, interactive games, AR filters, and even full VR worlds. You dream it - we build it.',
      category: 'Content',
    },
    {
      question: 'Can I use my own designs or branding?',
      answer:
        'Absolutely. You can upload your existing artwork, videos, logos, and brand colours. Need a hand? We also offer optional design and 3D logo services.',
      category: 'Customization',
    },
    {
      question: 'What kind of products can be NFC-enabled?',
      answer:
        'Just about anything! Popular items include: T-shirts, hoodies, mugs, and hats; Posters, fliers, vinyls, and business cards; Product packaging, event wristbands, or gift boxes. If it can be printed on or worn, we can probably chip it.',
      category: 'Products',
    },
    {
      question: 'Will this work at events or on the street?',
      answer:
        'Yes! Our tech is perfect for live events, pop-ups, launches, and guerrilla marketing. People can tap posters, scan t-shirts, or interact with merchandise right there and then.',
      category: 'Events',
    },
    {
      question: 'How much does hosting cost?',
      answer:
        "Hosting is free for up to 2,500 unique users per month. After that, it's just £20/month for every additional 2,500 users. There are no hidden fees - just simple, scalable pricing as your audience grows.",
      category: 'Pricing',
    },
    {
      question: 'Can I track how people interact with my experience?',
      answer:
        "Yes! Our mid- and top-tier packages include analytics and interaction tracking. You'll see how many people tapped, how long they engaged, and what they clicked on.",
      category: 'Analytics',
    },
    {
      question: 'Do you offer white-label or partner solutions?',
      answer:
        "We do. Whether you're an agency, brand, or creative studio, we can build immersive campaigns that carry your name, not ours. Get in touch for a partner pack.",
      category: 'Partnership',
    },
    {
      question: 'How long does it take to launch?',
      answer:
        "Turnaround times vary by complexity: Basic projects: 7–10 days; Custom immersive builds: 2–4 weeks; Full VR/AR experiences: 4–8 weeks. We'll confirm your timeline during the onboarding call.",
      category: 'Timeline',
    },
    {
      question:
        'Do I need a network or internet connection for it to work?',
      answer:
        "Yes, your audience will need an internet connection (Wi-Fi or mobile data) to view the experience. But it's designed to load fast and run smoothly - even on standard mobile connections.",
      category: 'Technical',
    },
    {
      question: 'Will my customers need mobile data to use it?',
      answer:
        "Yes - but only a small amount. Most experiences are lightweight and stream over the web, just like visiting a website or watching a short video. If you're planning to use this in a remote or offline setting, let us know - we can offer alternative solutions like preloaded offline versions for VR.",
      category: 'Technical',
    },
    {
      question: 'Can I update the experience after it goes live?',
      answer:
        'Yes! Our experiences can include dynamic content updates. That means you can change your videos, links, or assets anytime - without needing to reprint your product or merch.',
      category: 'Updates',
    },
    {
      question: 'Can you help me come up with ideas for my campaign?',
      answer:
        "Definitely. We're not just tech providers - we're creatives too. We'll help you brainstorm campaign ideas, interactive storylines, and how to use immersive content to wow your audience and meet your goals.",
      category: 'Creative',
    },
  ];

  const categories = [...new Set(faqs.map((faq) => faq.category))];

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-darkBg to-darkCard relative"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-altPrimary rounded-full filter blur-3xl opacity-6"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            opacity: [0.06, 0.1, 0.06],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>

      <motion.div
        className="container-voyager relative z-10"
        style={{ opacity, y }}
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="heading-voyager text-4xl md:text-5xl text-textLight mb-6"
          >
            Frequently Asked{' '}
            <span className="text-primary">Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-textLight opacity-80 max-w-3xl mx-auto"
          >
            Everything you need to know about NFC-powered immersive
            marketing
          </motion.p>
        </div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Accordion
            variant="splitted"
            className="gap-4"
            itemClasses={{
              base: 'bg-darkCard border border-primary border-opacity-20 hover:border-opacity-50 transition-all duration-300 rounded-lg',
              title: 'font-semibold text-textLight',
              trigger: 'px-6 py-4 data-[hover=true]:bg-darkCard/50',
              indicator: 'text-primary',
              content: 'text-textLight opacity-80 px-6 pb-6',
            }}
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                aria-label={faq.question}
                title={
                  <div className="flex items-center justify-between w-full">
                    <span className="text-left pr-4">
                      {faq.question}
                    </span>
                    <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full shrink-0">
                      {faq.category}
                    </span>
                  </div>
                }
              >
                <div className="text-textLight opacity-80 leading-relaxed">
                  {faq.answer}
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary/10 to-altPrimary/10 border border-primary border-opacity-30 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-heading text-primary mb-4">
              Still have questions?
            </h3>
            <p className="text-textLight opacity-80 mb-6">
              We&apos;re here to help you create the perfect immersive
              campaign for your brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                as={Link}
                href="#contact"
                className="bg-primary text-textLight font-semibold px-8 py-3 rounded-md hover:bg-accent transition-all hover:scale-105 transform"
              >
                Get in Touch
              </Button>
              <Button
                as={Link}
                href="/blog"
                className="bg-transparent border-2 border-altPrimary text-altPrimary font-semibold px-8 py-3 rounded-md hover:bg-altPrimary hover:text-textLight transition-all hover:scale-105 transform"
              >
                Learn More in Blog
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
