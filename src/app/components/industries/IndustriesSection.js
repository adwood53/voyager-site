/**
 * @fileoverview IndustriesSection component - 3x4 grid with dynamic section loading
 *
 * Based on ProductsSection.js but dynamically loads industry section components
 * below the grid when clicked. Each industry has its own section component file.
 */

'use client';

import { useState, useRef } from 'react';
import { Card, CardBody, Chip } from '@heroui/react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Import all industry sections statically to avoid dynamic import issues
import MusicEntertainmentSection from './MusicEntertainmentSection';
import SportFitnessSection from './SportFitnessSection';
import BeautyAestheticsSection from './BeautyAestheticsSection';
import EventsHospitalitySection from './EventsHospitalitySection';
import EducationTrainingSection from './EducationTrainingSection';
import ContentCreatorsSection from './ContentCreatorsSection';
import PropertyConstructionSection from './PropertyConstructionSection';
import FoodBeverageSection from './FoodBeverageSection';
import MarketingPublicationsSection from './MarketingPublicationsSection';
import FashionApparelSection from './FashionApparelSection';
import MentalHealthWellnessSection from './MentalHealthWellnessSection';
import CompetitionsGamingSection from './CompetitionsGamingSection';

export default function IndustriesSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const [selectedIndustryId, setSelectedIndustryId] = useState(null);

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

  const industries = [
    {
      id: 'music-entertainment',
      name: 'Music & Entertainment',
      icon: '',
      description:
        'Transform live events and digital content with immersive experiences that create deeper fan connections and community moments.',
      image: '/industries/music/thumb.jpg',
    },
    {
      id: 'sport-fitness',
      name: 'Sport & Fitness',
      icon: '',
      description:
        'Track performance, boost loyalty, and give sponsors measurable proof through interactive bibs, wristbands, and gamified experiences.',
      image: '/industries/sports/bottles-4.webp',
    },
    {
      id: 'beauty-aesthetics',
      name: 'Beauty & Aesthetics',
      icon: '',
      description:
        'Build trust and personalisation with interactive tutorials, aftercare guides, and authenticity checks delivered through packaging.',
      image: '/industries/beauty/thumb.png',
    },
    {
      id: 'events-hospitality',
      name: 'Events & Hospitality',
      icon: '',
      description:
        'Guide, delight, and capture guest data seamlessly with interactive lanyards, menus, and digital experiences.',
      image: '/industries/events/thumb.png',
    },
    {
      id: 'education-training',
      name: 'Education & Training',
      icon: '',
      description:
        'Turn learning into an immersive journey with interactive textbooks, training kits, and progress tracking systems.',
      image: '/industries/education/thumb.png',
    },
    {
      id: 'content-creators-influencers',
      name: 'Content Creators & Influencers',
      icon: '',
      description:
        'Build lasting communities and capture audience data with interactive merch, limited drops, and unlockable content.',
      image: '/industries/creators/thumb.png',
    },
    {
      id: 'property-construction',
      name: 'Property & Construction',
      icon: '',
      description:
        'Show properties with instant 360° tours, floorplans, and booking systems accessible through brochures and signage.',
      image: '/industries/property/thumb.png',
    },
    {
      id: 'food-beverage',
      name: 'Food & Beverage',
      icon: '',
      description:
        'Share recipes, stories, and build loyalty through interactive packaging and menus that connect customers to your brand.',
      image: '/industries/food/thumb.png',
    },
    {
      id: 'marketing-publications',
      name: 'Marketing & Publications',
      icon: '',
      description:
        'Bring print to life with videos, AR, and live updates that prove ROI and create memorable campaign experiences.',
      image: '/industries/marketing/thumb.jpg',
    },
    {
      id: 'fashion-apparel',
      name: 'Fashion & Apparel',
      icon: '',
      description:
        'Turn style into story with interactive garments, packaging, and displays that build authenticity and community.',
      image: '/industries/fashion/thumb.png',
    },
    {
      id: 'mental-health-wellness',
      name: 'Mental Health & Wellness',
      icon: '',
      description:
        'Support wellness initiatives with therapeutic and mindful immersive experiences that promote mental health.',
      image: '/industries/wellness/thumb.png',
    },
    {
      id: 'competitions-gaming',
      name: 'Competitions & Gaming',
      icon: '',
      description:
        'Create engaging competitive experiences and gaming platforms that connect players in innovative ways.',
      image: '/industries/gaming/thumb.png',
    },
  ];

  // Handle industry card click
  const handleIndustryClick = (industryId) => {
    console.log('Industry clicked:', industryId); // Debug log
    setSelectedIndustryId(industryId);

    // Scroll to content section after state update
    setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }
    }, 300);
  };

  // Close content section and scroll back to grid
  const closeContent = () => {
    setSelectedIndustryId(null);
    // Scroll back to industries grid
    setTimeout(() => {
      const industriesElement = document.getElementById('industries');
      if (industriesElement) {
        industriesElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 100);
  };

  // Render the selected industry component
  const renderSelectedIndustry = () => {
    if (!selectedIndustryId) return null;

    switch (selectedIndustryId) {
      case 'music-entertainment':
        return <MusicEntertainmentSection onClose={closeContent} />;
      case 'sport-fitness':
        return <SportFitnessSection onClose={closeContent} />;
      case 'beauty-aesthetics':
        return <BeautyAestheticsSection onClose={closeContent} />;
      case 'events-hospitality':
        return <EventsHospitalitySection onClose={closeContent} />;
      case 'education-training':
        return <EducationTrainingSection onClose={closeContent} />;
      case 'content-creators-influencers':
        return <ContentCreatorsSection onClose={closeContent} />;
      case 'property-construction':
        return <PropertyConstructionSection onClose={closeContent} />;
      case 'food-beverage':
        return <FoodBeverageSection onClose={closeContent} />;
      case 'marketing-publications':
        return (
          <MarketingPublicationsSection onClose={closeContent} />
        );
      case 'fashion-apparel':
        return <FashionApparelSection onClose={closeContent} />;
      case 'mental-health-wellness':
        return <MentalHealthWellnessSection onClose={closeContent} />;
      case 'competitions-gaming':
        return <CompetitionsGamingSection onClose={closeContent} />;
      default:
        return null;
    }
  };

  return (
    <section
      id="industries"
      ref={sectionRef}
      className="py-24 bg-darkBg relative"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-64 h-64 bg-altPrimary rounded-full filter blur-3xl opacity-8"
          animate={{
            scale: [1, 1.3, 1],
            y: [0, 50, 0],
            opacity: [0.08, 0.12, 0.08],
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
            Our <span className="text-primary">Expertise</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-textLight opacity-80 max-w-3xl mx-auto mb-4"
          >
            Click any industry to explore detailed information and
            case studies.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-sm text-primary max-w-2xl mx-auto"
          >
            Select an industry • View details below
          </motion.p>
        </div>

        {/* Industries Grid - 3x4 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card
                className={`card-voyager h-full overflow-hidden bg-darkCard border transition-all duration-300 group cursor-pointer ${
                  selectedIndustryId === industry.id
                    ? 'border-primary shadow-lg shadow-primary/20'
                    : 'border-primary/20 hover:border-primary/60'
                }`}
                isPressable
                onPress={() => handleIndustryClick(industry.id)}
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={industry.image}
                    alt={`${industry.name} industry`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-darkBg/30 to-transparent"></div>

                  <div className="absolute top-4 left-4 flex items-center gap-3">
                    <div className="bg-primary/90 text-darkBg p-3 rounded-full text-2xl">
                      {industry.icon}
                    </div>
                  </div>

                  {/* Selected indicator */}
                  {selectedIndustryId === industry.id && (
                    <div className="absolute bottom-4 right-4">
                      <Chip
                        size="xs"
                        className="bg-primary text-darkBg font-medium"
                      >
                        Selected
                      </Chip>
                    </div>
                  )}
                </div>

                <CardBody className="p-6">
                  <h3 className="font-subheading text-xl text-primary mb-3 group-hover:text-accent transition-colors">
                    {industry.name}
                  </h3>
                  <p className="text-textLight/80 text-sm leading-relaxed">
                    {industry.description}
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Section Loading */}
        <AnimatePresence mode="wait">
          {selectedIndustryId && (
            <motion.div
              ref={contentRef}
              key={selectedIndustryId}
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="overflow-hidden"
            >
              {renderSelectedIndustry()}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
