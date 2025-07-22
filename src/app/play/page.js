/**
 * @fileoverview Searchable Experiences Grid Page
 *
 * A comprehensive, animated grid displaying immersive experiences including 360° and AR content.
 * Features include real-time search, filtering by type/category/platform, QR code generation
 * for mobile experiences, and extensive Framer Motion animations throughout.
 *
 * @author Anthony Woodward MSc
 * @version 2.0.0
 * @since 2024
 *
 * @requires react
 * @requires framer-motion
 * @requires @heroui/react
 * @requires next/image
 *
 * @example
 * // Usage in Next.js app directory
 * // src/app/play/page.js
 * export default function PlayPage() {
 *   return <ExperienceGrid />;
 * }
 */

'use client';

import { useState, useMemo } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Input,
  Chip,
  Select,
  SelectItem,
} from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/src/app/components/Navbar';
import Image from 'next/image';

/**
 * Main component rendering the searchable experiences grid page
 *
 * @component
 * @returns {JSX.Element} The complete experiences page with search, filters, and grid
 */
export default function PlayPage() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  /** @type {[string, function]} Search term for filtering experiences */
  const [searchTerm, setSearchTerm] = useState('');

  /** @type {[string, function]} Selected experience type filter (all|360|ar) */
  const [selectedType, setSelectedType] = useState('all');

  /** @type {[string, function]} Selected category filter */
  const [selectedCategory, setSelectedCategory] = useState('all');

  /** @type {[string, function]} Selected platform filter */
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  /** @type {[boolean, function]} Whether the help section is expanded */
  const [isHelpExpanded, setIsHelpExpanded] = useState(false);

  /** @type {[string|null, function]} Currently hovered card ID for animations */
  const [hoveredCard, setHoveredCard] = useState(null);

  // ============================================================================
  // UTILITY FUNCTIONS
  // ============================================================================

  /**
   * Generates QR code URL for mobile experiences - UPDATED to handle internal game routes
   * @param {string} url - URL to encode
   * @param {string} type - Experience type ('game' or other)
   * @returns {string} QR code image URL
   */
  const generateQRCode = (url, type) => {
    const fullUrl =
      type === 'game' ? `${window.location.origin}${url}` : url;

    const encodedUrl = encodeURIComponent(fullUrl);

    // Voyager branded QR codes
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedUrl}&bgcolor=1a1a1a&color=e79023&format=png&margin=15&ecc=M`;
  };

  /**
   * Gets the appropriate platform icon emoji for display
   *
   * @function
   * @param {string} platform - Platform identifier (mobile|vr|desktop)
   * @returns {string} Unicode emoji representing the platform
   */
  const getPlatformIcon = (platform) => {
    const icons = {
      mobile: '📱',
      vr: '🥽',
      desktop: '💻',
    };
    return icons[platform] || '🔧';
  };

  /**
   * Gets the appropriate badge colour for experience types
   *
   * @function
   * @param {string} type - Experience type (360|ar)
   * @returns {string} HeroUI colour variant for the badge
   */
  const getTypeBadgeColour = (type) => {
    return type === '360' ? 'primary' : 'danger';
  };

  /**
   * Gets the appropriate colour for experience categories
   *
   * @function
   * @param {string} category - Experience category
   * @returns {string} HeroUI colour variant for the category chip
   */
  const getCategoryColour = (category) => {
    const colours = {
      games: 'success',
      experiences: 'primary',
      tours: 'warning',
      training: 'danger',
      sites: 'secondary',
    };
    return colours[category] || 'default';
  };

  /**
   * Handles clicking on an experience card - routes to game pages for 'game' type
   *
   * @function
   * @param {Object} experience - The experience object containing URL
   * @param {string} experience.url - URL of the experience to open
   * @param {string} experience.type - Type of experience
   */
  const handleExperienceClick = (experience) => {
    if (experience.type === 'game') {
      // Navigate to game page for 'game' type experiences
      window.location.href = experience.url;
    } else {
      // Keep existing behavior for other types
      window.open(experience.url, '_blank', 'noopener,noreferrer');
    }
  };

  /**
   * Handles clicking on a tracking image to open in new tab
   *
   * @function
   * @param {string} trackingImageUrl - URL of the tracking image to open
   */
  const handleTrackingImageClick = (trackingImageUrl) => {
    window.open(trackingImageUrl, '_blank', 'noopener,noreferrer');
  };

  // ============================================================================
  // EXPERIENCE DATA
  // ============================================================================

  /**
   * Complete dataset of all available immersive experiences
   *
   * @constant {Array<Object>} allExperiences
   * @property {string} id - Unique identifier for the experience
   * @property {string} name - Display name of the experience
   * @property {string} description - Detailed description for users
   * @property {('360'|'ar')} type - Technology type of the experience
   * @property {('games'|'experiences'|'tours'|'training'|'sites')} category - Content category
   * @property {Array<('mobile'|'vr'|'desktop')>} platforms - Supported platforms
   * @property {string} thumbnail - Path to thumbnail image (should be '/placeholder.jpg')
   * @property {string} url - URL of the actual experience
   * @property {string|null} trackingImage - URL of AR tracking image (AR experiences only)
   * @property {boolean} featured - Whether to show in featured section
   * @property {string} colour - Tailwind gradient classes for styling
   * @property {Array<string>} tags - Searchable tags for the experience
   */
  const allExperiences = [
    {
      id: 'vr-property-tour',
      name: 'Virtual Property Tour',
      description:
        'Take a comprehensive 360° tour of our state-of-the-art property experience and see behind the scenes of of luxury property development.',
      type: '360',
      category: 'tours',
      platforms: ['mobile', 'desktop'],
      thumbnail: '/play/property1.png',
      url: 'https://immerse.voyagervrlab.co.uk/VOY/Voyager/Property1',
      trackingImage: null,
      featured: true,
      colour: 'from-blue-500 to-purple-600',
      tags: ['property', 'behind-scenes', 'technology', 'tour'],
    },
    {
      id: 'day-of-the-dead-game',
      name: 'Sugar Skull Frenzy',
      description:
        'Throw your Sugar Skulls at the Skeletons in this augmented reality game and score points for hitting targets!',
      type: 'ar',
      category: 'games',
      platforms: ['mobile'],
      thumbnail: '/play/sugarskullfrenzy.png',
      url: 'https://immerse.voyagervrlab.co.uk/VOY/Voyager/SugarSkullFrenzy',
      trackingImage: null,
      featured: true,
      colour: 'from-pink-500 to-rose-600',
      tags: [
        'mexico',
        'interactive',
        'audio-visual',
        'ar-tracking',
        'game',
      ],
    },
    {
      id: 'c2d-360',
      name: 'Connect 2 Disconnect 360 Journey',
      description:
        'Follow Spencer on his Bike packing trip from the UK to Australia!',
      type: '360',
      category: 'experiences',
      platforms: ['mobile', 'desktop', 'vr'],
      thumbnail: '/play/bikepackingaus.png',
      url: 'https://immerse.voyagervrlab.co.uk/VOY/C2D/BikepackingAus',
      trackingImage: null,
      featured: true,
      colour: 'from-amber-500 to-orange-600',
      tags: ['nature', 'bikepacking', 'interactive', '360-tour'],
    },
    {
      id: 'nitrous-360',
      name: 'Nitrous Competitions’ 360 Giveaway',
      description:
        'See the latest Nitrous Competitions car giveaway in stunning 360° detail, showing off their packed garage full of dream cars!',
      type: '360',
      category: 'sites',
      platforms: ['mobile', 'desktop', 'vr'],
      thumbnail: '/play/comp360.png',
      url: 'https://immerse.voyagervrlab.co.uk/VOY/NitrousCompetitions/Comp360',
      trackingImage: null,
      featured: false,
      colour: 'from-green-500 to-emerald-600',
      tags: ['gaming', 'giveaway', 'showcase', 'e-commerce'],
    },
    {
      id: 'tom-banner',
      name: 'Tom Meighan’s Official AR Banner',
      description:
        'A marketing tool made for Tom Meighan to promote his new album using augmented reality with a custom tracking image.',
      type: 'ar',
      category: 'experiences',
      platforms: ['mobile'],
      thumbnail: '/play/automatom.jpg',
      url: 'https://immerse.voyagervrlab.co.uk/VOY/Automatom',
      trackingImage:
        'https://immerse.voyagervrlab.co.uk/VOY/brand/images/voyager-banner.png',
      featured: false,
      colour: 'from-red-500 to-pink-600',
      tags: ['music', 'marketing', 'merchandise'],
    },
    {
      id: 'stacey-card',
      name: 'Stacey’s Business Card',
      description:
        'A digital business card with a built-in Augmented Reality experience that showcases Stacey’s portfolio and contact information.',
      type: 'ar',
      category: 'games',
      platforms: ['mobile'],
      thumbnail: '/play/stacey.jpg',
      url: 'https://immerse.voyagervrlab.co.uk/VOY/Voyager/Team/Stacey',
      trackingImage:
        'https://immerse.voyagervrlab.co.uk/VOY/brand/images/business-card/front.png',
      featured: false,
      colour: 'from-yellow-500 to-orange-600',
      tags: ['business', 'marketing'],
    },
    {
      id: 'ant-360',
      name: 'Anthonys Business Card',
      description:
        'A digital business card with a built-in Augmented Reality experience that showcases Anthony’s portfolio and contact information.',
      type: '360',
      category: 'experiences',
      platforms: ['mobile', 'desktop', 'vr'],
      thumbnail: '/play/aj.png',
      url: 'https://immerse.voyagervrlab.co.uk/VOY/Voyager/Team/Aj/360',
      trackingImage: null,
      featured: false,
      colour: 'from-yellow-500 to-orange-600',
      tags: ['business', 'marketing'],
    },
    {
      id: 'thor-to-the-rescue',
      name: 'Thor to The Rescue',
      description:
        "You're Thor, a motorbike-riding Rottweiler on a high-stakes mission to break into a shady vet clinic and rescue caged pups. Use your bark to blast guards, duck under danger, and jump your way through this bite-sized action platformer.",
      type: 'game', // Using 'game' instead of 'unity'
      category: 'games',
      platforms: ['desktop', 'mobile'],
      thumbnail: '/games/thor/screenshots/cover.png', // Using your cover image
      url: '/play/thor-to-the-rescue', // Internal route, not external URL
      trackingImage: null,
      featured: true,
      colour: 'from-amber-500 to-red-600',
      tags: [
        'action',
        'platformer',
        'dogs',
        'rescue',
        'comedy',
        'vibe-jam',
      ],
    },
    {
      id: 'dropout',
      name: 'Dropout',
      description:
        'Sneak your drone out of school to collect the contraband! A stealth game where you control a drone to fly through a small town, avoiding detection by teachers, police and locals.',
      type: 'game',
      category: 'games',
      platforms: ['desktop', 'mobile'],
      thumbnail: '/games/dropout/screenshots/cover.png', // Using your cover image
      url: '/play/dropout',
      trackingImage: null,
      featured: true,
      colour: 'from-green-500 to-blue-600',
      tags: ['action', 'stealth', 'unity', 'vibe-jam', '2d', 'short'],
    },
  ];

  // ============================================================================
  // FILTERED DATA
  // ============================================================================

  /**
   * Filtered experiences based on current search and filter criteria
   *
   * @constant {Array<Object>} filteredExperiences
   * @description Dynamically filters the experiences array based on:
   * - Search term (searches name, description, and tags)
   * - Selected type (360° or AR)
   * - Selected category (games, experiences, tours, etc.)
   * - Selected platform (mobile, VR, desktop)
   */
  const filteredExperiences = useMemo(() => {
    return allExperiences.filter((experience) => {
      const matchesSearch =
        experience.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        experience.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        experience.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesType =
        selectedType === 'all' || experience.type === selectedType;
      const matchesCategory =
        selectedCategory === 'all' ||
        experience.category === selectedCategory;
      const matchesPlatform =
        selectedPlatform === 'all' ||
        experience.platforms.includes(selectedPlatform);

      return (
        matchesSearch &&
        matchesType &&
        matchesCategory &&
        matchesPlatform
      );
    });
  }, [searchTerm, selectedType, selectedCategory, selectedPlatform]);

  // ============================================================================
  // ANIMATION VARIANTS
  // ============================================================================

  /** @constant {Object} containerVariants - Framer Motion variants for staggered children */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  /** @constant {Object} itemVariants - Framer Motion variants for individual grid items */
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  /** @constant {Object} headerVariants - Framer Motion variants for page header */
  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 20,
        delay: 0.2,
      },
    },
  };

  /** @constant {Object} filterVariants - Framer Motion variants for filter section */
  const filterVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay: 0.4,
      },
    },
  };

  /** @constant {Object} featuredCardVariants - Framer Motion variants for featured cards */
  const featuredCardVariants = {
    hidden: { scale: 0.8, opacity: 0, x: -50 },
    visible: {
      scale: 1,
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-4 -right-4 w-96 h-96 bg-gradient-to-br from-orange-500/30 to-red-600/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-4 -left-4 w-96 h-96 bg-gradient-to-tr from-purple-500/30 to-orange-600/30 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <motion.div
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-6xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent mb-6"
            style={{
              backgroundSize: '200% 200%',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            Explore Immersive Experiences
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Discover our collection of 360° and augmented reality
            experiences. Try demos, explore virtual environments, and
            see the future of immersive technology.
          </motion.p>
        </motion.div>

        {/* Expandable Help Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-2xl border border-blue-400/30 overflow-hidden">
            {/* Help Header - Always Visible */}
            <motion.div
              className="p-6 cursor-pointer"
              onClick={() => setIsHelpExpanded(!isHelpExpanded)}
              whileHover={{
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">🤔</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      New to Immersive Experiences?
                    </h3>
                    <p className="text-blue-200 text-sm">
                      Click here for a complete beginner&apos;s guide
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: isHelpExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-blue-300 text-2xl"
                >
                  ⬇️
                </motion.div>
              </div>
            </motion.div>

            {/* Help Content - Expandable */}
            <AnimatePresence>
              {isHelpExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 border-t border-blue-400/20">
                    <div className="grid md:grid-cols-2 gap-8 mt-6">
                      {/* What Are Immersive Experiences? */}
                      <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 rounded-xl p-6 border border-white/10"
                      >
                        <h4 className="text-lg font-bold text-blue-300 mb-4 flex items-center">
                          <span className="mr-2">🌟</span>
                          What Are Immersive Experiences?
                        </h4>
                        <div className="space-y-3 text-gray-200 text-sm">
                          <p>
                            <strong className="text-white">
                              360° Experiences:
                            </strong>{' '}
                            Like being inside a bubble where you can
                            look in every direction. Use your mouse or
                            finger to drag around and explore a
                            complete virtual world.
                          </p>
                          <p>
                            <strong className="text-white">
                              Augmented Reality (AR):
                            </strong>{' '}
                            Uses your phone&apos;s camera to add
                            digital objects to the real world. Point
                            your camera at special images to see magic
                            happen!
                          </p>
                          <p>
                            <strong className="text-white">
                              Virtual Reality (VR):
                            </strong>{' '}
                            Requires special goggles that completely
                            surround you in a digital world. The
                            ultimate immersive experience!
                          </p>
                        </div>
                      </motion.div>

                      {/* How to Use This Page */}
                      <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/5 rounded-xl p-6 border border-white/10"
                      >
                        <h4 className="text-lg font-bold text-green-300 mb-4 flex items-center">
                          <span className="mr-2">🧭</span>
                          How to Use This Page
                        </h4>
                        <div className="space-y-3 text-gray-200 text-sm">
                          <p>
                            <strong className="text-white">
                              Search Box:
                            </strong>{' '}
                            Type keywords like &quot;music&quot;,
                            &quot;training&quot;, or &quot;game&quot;
                            to find specific experiences.
                          </p>
                          <p>
                            <strong className="text-white">
                              Filters:
                            </strong>{' '}
                            Use the dropdown menus to narrow down:
                            <br />• <strong>Type:</strong> 360° or AR
                            <br />• <strong>Category:</strong> Games,
                            tours, training, etc.
                            <br />• <strong>Platform:</strong> Where
                            you can use it
                          </p>
                          <p>
                            <strong className="text-white">
                              Featured Section:
                            </strong>{' '}
                            Start here! These are our best
                            experiences, perfect for beginners.
                          </p>
                        </div>
                      </motion.div>

                      {/* Understanding Platforms */}
                      <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white/5 rounded-xl p-6 border border-white/10"
                      >
                        <h4 className="text-lg font-bold text-purple-300 mb-4 flex items-center">
                          <span className="mr-2">📱</span>
                          Which Device Should I Use?
                        </h4>
                        <div className="space-y-3 text-gray-200 text-sm">
                          <p>
                            <strong className="text-white">
                              📱 Mobile (Phone/Tablet):
                            </strong>{' '}
                            Perfect for beginners! Most AR experiences
                            work here. Just tap and explore.
                          </p>
                          <p>
                            <strong className="text-white">
                              💻 Desktop (Computer):
                            </strong>{' '}
                            Great for 360° experiences. Use your mouse
                            to look around. Bigger screen = better
                            experience.
                          </p>
                          <p>
                            <strong className="text-white">
                              🥽 VR Headset:
                            </strong>{' '}
                            The most immersive option! If you have VR
                            goggles (like Meta Quest), this is
                            incredible.
                          </p>
                          <p className="text-yellow-200 bg-yellow-900/20 p-2 rounded">
                            <strong>💡 Tip:</strong> Start with mobile
                            or desktop - they&apos;re the easiest to
                            use!
                          </p>
                        </div>
                      </motion.div>

                      {/* Getting Started Guide */}
                      <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white/5 rounded-xl p-6 border border-white/10"
                      >
                        <h4 className="text-lg font-bold text-orange-300 mb-4 flex items-center">
                          <span className="mr-2">🚀</span>
                          Complete Beginner&apos;s Steps
                        </h4>
                        <div className="space-y-2 text-gray-200 text-sm">
                          <div className="flex items-start space-x-2">
                            <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                              1
                            </span>
                            <p>
                              Scroll down to &quot;Featured
                              Experiences&quot; - these are perfect
                              for first-timers
                            </p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                              2
                            </span>
                            <p>
                              Pick one that matches your device (look
                              for the 📱💻🥽 icons)
                            </p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                              3
                            </span>
                            <p>
                              Click &quot;Try Now&quot; - it opens in
                              a new tab so you won&apos;t lose this
                              page
                            </p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                              4
                            </span>
                            <p>
                              For AR: Click &quot;🎯 Tracking
                              Image&quot; first, then &quot;📱 QR
                              Code&quot; to open on your phone
                            </p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                              5
                            </span>
                            <p>
                              For 360°: Use mouse/finger to look
                              around, click on objects to interact
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Troubleshooting */}
                      <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="md:col-span-2 bg-gradient-to-r from-red-900/20 to-pink-900/20 rounded-xl p-6 border border-red-400/20"
                      >
                        <h4 className="text-lg font-bold text-red-300 mb-4 flex items-center">
                          <span className="mr-2">🔧</span>
                          Common Questions & Troubleshooting
                        </h4>
                        <div className="grid md:grid-cols-2 gap-6 text-sm">
                          <div className="space-y-3 text-gray-200">
                            <p>
                              <strong className="text-white">
                                Q: Nothing happens when I click
                                &quot;Try Now&quot;?
                              </strong>
                              <br />
                              A: Check if your browser blocked
                              pop-ups. Allow pop-ups for this site, or
                              try holding Ctrl/Cmd while clicking.
                            </p>
                            <p>
                              <strong className="text-white">
                                Q: AR isn&apos;t working on my phone?
                              </strong>
                              <br />
                              A: Make sure you&apos;ve downloaded the
                              tracking image first, then scan it with
                              your camera when the AR experience
                              loads.
                            </p>
                          </div>
                          <div className="space-y-3 text-gray-200">
                            <p>
                              <strong className="text-white">
                                Q: The 360° experience won&apos;t
                                move?
                              </strong>
                              <br />
                              A: Try clicking and dragging with your
                              mouse, or swiping with your finger if on
                              mobile. Some experiences need a moment
                              to load.
                            </p>
                            <p>
                              <strong className="text-white">
                                Q: What&apos;s a QR code for?
                              </strong>
                              <br />
                              A: It&apos;s an easy way to open
                              experiences on your phone. Just point
                              your phone&apos;s camera at the QR code!
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Quick Start Recommendation */}
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="mt-8 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-xl p-6 border border-green-400/30 text-center"
                    >
                      <h4 className="text-xl font-bold text-green-300 mb-3">
                        🎯 Never Used VR/AR Before?
                      </h4>
                      <p className="text-gray-200 mb-4">
                        We recommend starting with the{' '}
                        <strong className="text-white">
                          &quot;Virtual Studio Tour&quot;
                        </strong>{' '}
                        - it works on any device and gives you a
                        perfect introduction to 360° experiences!
                      </p>
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2"
                        onPress={() => {
                          setIsHelpExpanded(false);
                          // Scroll to featured section
                          document
                            .querySelector('h2')
                            ?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        🚀 Take Me to Featured Experiences
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Search and Filters Section */}
        <motion.div
          className="bg-black/40 rounded-2xl shadow-2xl border border-white/20 p-8 mb-12"
          variants={filterVariants}
          initial="hidden"
          animate="visible"
          whileHover={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            transition: { duration: 0.3 },
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Search Input */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.02 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
            >
              <Input
                placeholder="Search experiences..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                startContent={
                  <motion.span
                    className="text-orange-400 text-lg mr-3"
                    animate={{ rotate: searchTerm ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    🔍
                  </motion.span>
                }
                className="w-full"
                classNames={{
                  input:
                    'text-lg text-white placeholder:text-gray-400',
                  inputWrapper:
                    'bg-white/10 border-2 border-white/20 hover:border-orange-400/50 focus-within:border-orange-400 transition-all duration-300 h-12',
                }}
              />
            </motion.div>

            {/* Type Filter */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
            >
              <Select
                placeholder="All Types"
                selectedKeys={
                  selectedType === 'all' ? [] : [selectedType]
                }
                onSelectionChange={(keys) =>
                  setSelectedType(Array.from(keys)[0] || 'all')
                }
                classNames={{
                  trigger:
                    'bg-white/10 border-2 border-white/20 hover:border-orange-400/50 focus:border-orange-400 transition-all duration-300 text-white h-12',
                  value: 'text-white !mr-8',
                  selectorIcon: 'right-2',
                  popoverContent: 'bg-black/90 border-white/20',
                }}
                style={{
                  paddingRight: '3rem',
                }}
              >
                <SelectItem
                  key="all"
                  value="all"
                  className="text-white"
                >
                  All Types
                </SelectItem>
                <SelectItem
                  key="360"
                  value="360"
                  className="text-white"
                >
                  🌐 360° Experiences
                </SelectItem>
                <SelectItem
                  key="ar"
                  value="ar"
                  className="text-white"
                >
                  📲 Augmented Reality
                </SelectItem>
                <SelectItem key="game" value="game">
                  🎮 Games
                </SelectItem>
              </Select>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
            >
              <Select
                placeholder="All Categories"
                selectedKeys={
                  selectedCategory === 'all' ? [] : [selectedCategory]
                }
                onSelectionChange={(keys) =>
                  setSelectedCategory(Array.from(keys)[0] || 'all')
                }
                classNames={{
                  trigger:
                    'bg-white/10 border-2 border-white/20 hover:border-orange-400/50 focus:border-orange-400 transition-all duration-300 text-white h-12',
                  value: 'text-white !mr-8',
                  selectorIcon: 'right-2',
                  popoverContent: 'bg-black/90 border-white/20',
                }}
                style={{
                  paddingRight: '3rem',
                }}
              >
                <SelectItem
                  key="all"
                  value="all"
                  className="text-white"
                >
                  All Categories
                </SelectItem>
                <SelectItem
                  key="games"
                  value="games"
                  className="text-white"
                >
                  🎮 Games
                </SelectItem>
                <SelectItem
                  key="experiences"
                  value="experiences"
                  className="text-white"
                >
                  ✨ Experiences
                </SelectItem>
                <SelectItem
                  key="tours"
                  value="tours"
                  className="text-white"
                >
                  🏛️ Tours
                </SelectItem>
                <SelectItem
                  key="training"
                  value="training"
                  className="text-white"
                >
                  🎓 Training
                </SelectItem>
                <SelectItem
                  key="sites"
                  value="sites"
                  className="text-white"
                >
                  🌐 Immersive Sites
                </SelectItem>
              </Select>
            </motion.div>

            {/* Platform Filter */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
            >
              <Select
                placeholder="All Platforms"
                selectedKeys={
                  selectedPlatform === 'all' ? [] : [selectedPlatform]
                }
                onSelectionChange={(keys) =>
                  setSelectedPlatform(Array.from(keys)[0] || 'all')
                }
                classNames={{
                  trigger:
                    'bg-white/10 border-2 border-white/20 hover:border-orange-400/50 focus:border-orange-400 transition-all duration-300 text-white h-12',
                  value: 'text-white !mr-8',
                  selectorIcon: 'right-2',
                  popoverContent: 'bg-black/90 border-white/20',
                }}
                style={{
                  paddingRight: '3rem',
                }}
              >
                <SelectItem
                  key="all"
                  value="all"
                  className="text-white"
                >
                  All Platforms
                </SelectItem>
                <SelectItem
                  key="mobile"
                  value="mobile"
                  className="text-white"
                >
                  📱 Mobile
                </SelectItem>
                <SelectItem
                  key="vr"
                  value="vr"
                  className="text-white"
                >
                  🥽 VR Headset
                </SelectItem>
                <SelectItem
                  key="desktop"
                  value="desktop"
                  className="text-white"
                >
                  💻 Desktop
                </SelectItem>
              </Select>
            </motion.div>
          </div>

          {/* Results Counter */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg">
              Showing {filteredExperiences.length} of{' '}
              {allExperiences.length} experiences
            </span>
          </motion.div>
        </motion.div>

        {/* Featured Experiences Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl font-bold text-white mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            ⭐ Featured Experiences
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExperiences
              .filter((exp) => exp.featured)
              .slice(0, 3)
              .map((experience, index) => (
                <motion.div
                  key={experience.id}
                  variants={featuredCardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.8 + index * 0.2 }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    transition: { duration: 0.3 },
                  }}
                  className="cursor-pointer"
                  onClick={() => handleExperienceClick(experience)}
                >
                  <Card
                    className={`bg-gradient-to-br ${experience.colour} border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-full`}
                  >
                    <CardBody className="p-0 relative">
                      {/* Featured Experience Image */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={experience.thumbnail}
                          alt={experience.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/40"></div>

                        {/* Type badge */}
                        <div className="absolute top-4 left-4 z-10">
                          <Chip
                            size="lg"
                            className={`text-white font-bold shadow-lg px-4 py-2 ${
                              experience.type === '360'
                                ? 'bg-blue-500 border-blue-500'
                                : 'bg-orange-500 border-orange-500'
                            }`}
                          >
                            {experience.type === '360'
                              ? '🌐 360°'
                              : '📲 AR'}
                          </Chip>
                        </div>

                        {/* Featured badge */}
                        <div className="absolute top-4 right-4 z-10">
                          <Chip
                            size="lg"
                            className="text-white font-bold shadow-lg px-4 py-2 bg-yellow-500 border-yellow-500"
                          >
                            ⭐ Featured
                          </Chip>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 p-6 text-white">
                        <h3 className="font-bold text-xl mb-3">
                          {experience.name}
                        </h3>
                        <p className="text-white/90 text-sm mb-4 line-clamp-3">
                          {experience.description}
                        </p>

                        {/* Category and platforms */}
                        <div className="flex items-center justify-between mb-4">
                          <Chip
                            variant="flat"
                            size="sm"
                            className="capitalise bg-white/30 text-white border border-white/40 font-medium px-3 py-1"
                          >
                            {experience.category}
                          </Chip>

                          <div className="flex items-center space-x-2">
                            {experience.platforms.map((platform) => (
                              <span
                                key={platform}
                                className="text-lg text-white/90"
                                title={platform}
                              >
                                {getPlatformIcon(platform)}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardBody>
                    <CardFooter className="pt-0 pb-6 px-6">
                      <motion.div
                        className="w-full"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          color="default"
                          size="lg"
                          className="w-full bg-white/20 text-white border border-white/30 hover:bg-white/30 font-semibold"
                          onPress={() =>
                            handleExperienceClick(experience)
                          }
                        >
                          Try Now ✨
                        </Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* Main Experiences Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="wait">
            {filteredExperiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                layout
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotateY: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  rotateY: 90,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  rotateY: 5,
                  boxShadow:
                    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  type: 'spring',
                  stiffness: 100,
                }}
                className="group cursor-pointer perspective-1000"
                onHoverStart={() => setHoveredCard(experience.id)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <Card className="h-full bg-black/60 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  <CardBody className="p-0 relative flex-1">
                    {/* Thumbnail */}
                    <div className="relative h-52 overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity:
                            hoveredCard === experience.id ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      />

                      <Image
                        src={experience.thumbnail}
                        alt={experience.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />

                      {/* Animated overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-purple-500/30"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity:
                            hoveredCard === experience.id ? 1 : 0,
                          scale:
                            hoveredCard === experience.id ? 1 : 0,
                        }}
                        transition={{
                          duration: 0.4,
                          ease: 'easeOut',
                        }}
                      />

                      {/* Type badge */}
                      <motion.div
                        className="absolute top-3 left-3 z-20"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <Chip
                          size="lg"
                          className={`text-white font-bold shadow-lg px-4 py-2 ${
                            experience.type === '360'
                              ? 'bg-blue-500 border-blue-500'
                              : 'bg-orange-500 border-orange-500'
                          }`}
                        >
                          {experience.type === '360'
                            ? '🌐 360°'
                            : '📲 AR'}
                        </Chip>
                      </motion.div>

                      {/* Featured badge */}
                      {experience.featured && (
                        <motion.div
                          className="absolute top-3 right-3 z-20"
                          initial={{ x: 50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.4 }}
                        >
                          <Chip
                            size="lg"
                            className="text-white font-bold shadow-lg px-4 py-2 bg-yellow-500 border-yellow-500"
                          >
                            ⭐ Featured
                          </Chip>
                        </motion.div>
                      )}

                      {/* Hover play button */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center z-20"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity:
                            hoveredCard === experience.id ? 1 : 0,
                          scale:
                            hoveredCard === experience.id ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center border border-white/30"
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <span className="text-white text-2xl">
                            ▶️
                          </span>
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <motion.h3
                        className="text-xl font-bold text-white mb-3 line-clamp-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        {experience.name}
                      </motion.h3>

                      <motion.p
                        className="text-gray-300 text-sm mb-4 line-clamp-3 flex-grow"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.6 }}
                      >
                        {experience.description}
                      </motion.p>

                      {/* Category and platforms */}
                      <motion.div
                        className="flex items-center justify-between mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.7 }}
                      >
                        <Chip
                          color={getCategoryColour(
                            experience.category
                          )}
                          variant="flat"
                          size="sm"
                          className="capitalise font-medium"
                        >
                          {experience.category}
                        </Chip>

                        <div className="flex items-center space-x-2">
                          {experience.platforms.map(
                            (platform, platformIndex) => (
                              <motion.span
                                key={platform}
                                className="text-xl"
                                title={platform}
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{
                                  delay:
                                    index * 0.1 +
                                    0.8 +
                                    platformIndex * 0.1,
                                  type: 'spring',
                                  stiffness: 200,
                                }}
                                whileHover={{
                                  scale: 1.3,
                                  rotate: 360,
                                  transition: { duration: 0.5 },
                                }}
                              >
                                {getPlatformIcon(platform)}
                              </motion.span>
                            )
                          )}
                        </div>
                      </motion.div>

                      {/* Tags */}
                      <motion.div
                        className="flex flex-wrap gap-2 mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.8 }}
                      >
                        {experience.tags
                          .slice(0, 4)
                          .map((tag, tagIndex) => (
                            <motion.span
                              key={tag}
                              className="text-xs bg-white/20 text-gray-200 px-2 py-1 rounded-full font-medium border border-white/30 whitespace-nowrap"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                delay:
                                  index * 0.1 + 0.9 + tagIndex * 0.1,
                                type: 'spring',
                                stiffness: 300,
                              }}
                              whileHover={{
                                scale: 1.05,
                                backgroundColor:
                                  'rgba(249, 115, 22, 0.3)',
                                color: 'rgb(249, 115, 22)',
                                borderColor:
                                  'rgba(249, 115, 22, 0.5)',
                              }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                      </motion.div>
                    </div>
                  </CardBody>

                  <CardFooter className="px-6 pb-6 mt-auto">
                    <div className="flex flex-col space-y-3 w-full">
                      {/* Main experience button */}
                      <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        <Button
                          color="primary"
                          size="lg"
                          className={`w-full bg-gradient-to-r ${experience.colour} text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 border-0`}
                          onPress={() =>
                            handleExperienceClick(experience)
                          }
                        >
                          {experience.platforms.includes('mobile') &&
                          experience.platforms.length === 1
                            ? '📱 Open on Mobile'
                            : '🚀 Launch Experience'}
                        </Button>
                      </motion.div>

                      {/* Additional buttons for mobile and AR */}
                      {(experience.platforms.includes('mobile') ||
                        (experience.type === 'ar' &&
                          experience.trackingImage)) && (
                        <div className="flex space-x-2">
                          {/* QR Code for mobile experiences */}
                          {experience.platforms.includes(
                            'mobile'
                          ) && (
                            <motion.div
                              className="flex-1"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button
                                variant="bordered"
                                size="sm"
                                className="w-full border-2 border-orange-400/50 hover:border-orange-400 hover:bg-orange-400/20 text-orange-300 hover:text-orange-200 transition-all duration-300"
                                onPress={() =>
                                  window.open(
                                    generateQRCode(
                                      experience.url,
                                      experience.type
                                    ),
                                    '_blank'
                                  )
                                }
                              >
                                📱 QR Code
                              </Button>
                            </motion.div>
                          )}

                          {/* Tracking image for AR experiences */}
                          {experience.type === 'ar' &&
                            experience.trackingImage && (
                              <motion.div
                                className="flex-1"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Button
                                  variant="bordered"
                                  size="sm"
                                  className="w-full border-2 border-purple-400/50 hover:border-purple-400 hover:bg-purple-400/20 text-purple-300 hover:text-purple-200 transition-all duration-300"
                                  onPress={() =>
                                    handleTrackingImageClick(
                                      experience.trackingImage
                                    )
                                  }
                                >
                                  🎯 Tracking Image
                                </Button>
                              </motion.div>
                            )}
                        </div>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results Message */}
        <AnimatePresence>
          {filteredExperiences.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-gray-400 text-8xl mb-6"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                🔍
              </motion.div>
              <h3 className="text-3xl font-bold text-white mb-4">
                No experiences found
              </h3>
              <p className="text-gray-300 text-lg max-w-md mx-auto mb-6">
                Try adjusting your search terms or filters to discover
                amazing immersive experiences.
              </p>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2"
                onPress={() => {
                  setSearchTerm('');
                  setSelectedType('all');
                  setSelectedCategory('all');
                  setSelectedPlatform('all');
                }}
              >
                🔄 Clear All Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
