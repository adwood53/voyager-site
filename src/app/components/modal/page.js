// components/modal/page.js - Refactored using SearchableGrid
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@heroui/react';

import { SearchableGrid } from '../ui/SearchableGrid';
import Modal from './Modal';
import { useModalState } from './useModalState';

import { motion } from 'framer-motion';

export default function ModalShowcase() {
  // Modal states
  const [activeModal, setActiveModal] = useState(null);
  const modalState = useModalState();

  // Configuration arrays
  const sizes = [
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
    '3xl',
    '4xl',
    '5xl',
    'full',
  ];
  const positions = ['center', 'top', 'bottom'];
  const closePositions = ['header', 'floating', 'footer'];
  const backdropBlurs = ['none', 'sm', 'md', 'lg'];

  // Color schemes using your brand palette
  const colorSchemes = [
    {
      name: 'Primary',
      header:
        'bg-gradient-to-r from-[#e79023] to-[#a6620c] text-white',
      accent: 'text-[#e79023]',
      bg: 'bg-gradient-to-br from-orange-50 to-orange-100',
      chip: 'bg-[#e79023] text-white',
      border: 'border-[#e79023]',
    },
    {
      name: 'Alt',
      header:
        'bg-gradient-to-r from-[#7466e2] to-[#6055b5] text-white',
      accent: 'text-[#7466e2]',
      bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
      chip: 'bg-[#7466e2] text-white',
      border: 'border-[#7466e2]',
    },
    {
      name: 'Success',
      header:
        'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white',
      accent: 'text-emerald-600',
      bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
      chip: 'bg-emerald-600 text-white',
      border: 'border-emerald-600',
    },
    {
      name: 'Warning',
      header:
        'bg-gradient-to-r from-amber-600 to-amber-700 text-white',
      accent: 'text-amber-600',
      bg: 'bg-gradient-to-br from-amber-50 to-amber-100',
      chip: 'bg-amber-600 text-white',
      border: 'border-amber-600',
    },
    {
      name: 'Danger',
      header: 'bg-gradient-to-r from-red-600 to-red-700 text-white',
      accent: 'text-red-600',
      bg: 'bg-gradient-to-br from-red-50 to-red-100',
      chip: 'bg-red-600 text-white',
      border: 'border-red-600',
    },
    {
      name: 'Dark',
      header: 'bg-gradient-to-r from-gray-800 to-gray-900 text-white',
      accent: 'text-gray-700',
      bg: 'bg-gradient-to-br from-gray-50 to-gray-100',
      chip: 'bg-gray-700 text-white',
      border: 'border-gray-700',
    },
  ];

  // Video IDs and Form IDs for demos
  const videoIds = [
    'dQw4w9WgXcQ',
    'M7lc1UVf-VE',
    'oHg5SJYRHA0',
    'iik25wqIuFo',
    'xvFZjo5PgG0',
  ];
  const formIds = [
    'demo-form-1',
    'demo-form-2',
    'demo-contact-1',
    'demo-survey-1',
    'demo-feedback-1',
  ];

  // Generate modal configurations for SearchableGrid
  const modalConfigurations = useMemo(() => {
    const configs = [];
    let id = 0;

    // Basic Modals (150 variations)
    sizes.forEach((size) => {
      positions.forEach((position) => {
        closePositions.forEach((closePos) => {
          backdropBlurs.forEach((blur) => {
            const colorScheme =
              colorSchemes[id % colorSchemes.length];
            configs.push({
              id: id++,
              title: `${size.toUpperCase()} Modal`,
              subtitle: `${position} • ${closePos} • ${blur}`,
              description: `${colorScheme.name} themed modal with ${size} size and ${position} positioning`,
              category: 'Basic',
              size,
              position,
              closeButtonPosition: closePos,
              backdropBlur: blur,
              colorScheme,
              type: 'basic',
              badge: 'Basic',
              badgeClass: colorScheme.chip,
              tags: [size, position, closePos],
              searchFields: [
                `${size} modal`,
                `${position} position`,
                `${closePos} close`,
                `${blur} blur`,
                colorScheme.name,
              ],
              isStatic: Math.random() > 0.85,
              allowBackdropClick: Math.random() > 0.3,
              status: Math.random() > 0.85 ? 'Static' : 'Interactive',
              statusColor:
                Math.random() > 0.85
                  ? 'bg-yellow-500'
                  : 'bg-green-500',
            });
          });
        });
      });
    });

    // JotForm Modals (40 variations)
    for (let i = 0; i < 40; i++) {
      const size = sizes[i % sizes.length];
      const position = positions[i % positions.length];
      const formId = formIds[i % formIds.length];
      const colorScheme = colorSchemes[i % colorSchemes.length];

      configs.push({
        id: id++,
        title: `Form Modal ${i + 1}`,
        subtitle: `${size} • JotForm`,
        description: `${colorScheme.name} JotForm embed with optimized settings and auto-sizing`,
        category: 'JotForm',
        size,
        position,
        formId,
        colorScheme,
        formTitle: `Demo Form ${i + 1}`,
        type: 'jotform',
        badge: 'JotForm',
        badgeClass: 'bg-green-600 text-white',
        tags: [size, 'form', 'embed'],
        searchFields: [`form ${i + 1}`, 'jotform', 'embed', size],
        status: 'Ready',
        statusColor: 'bg-green-500',
      });
    }

    // YouTube Modals (30 variations)
    for (let i = 0; i < 30; i++) {
      const size = sizes[i % sizes.length];
      const position = positions[i % positions.length];
      const videoId = videoIds[i % videoIds.length];
      const colorScheme = colorSchemes[i % colorSchemes.length];
      const autoplay = i % 2 === 0;

      configs.push({
        id: id++,
        title: `Video Modal ${i + 1}`,
        subtitle: `${size} • ${autoplay ? 'Auto' : 'Manual'}`,
        description: `${colorScheme.name} YouTube player with lazy loading and responsive design`,
        category: 'YouTube',
        size,
        position,
        videoId,
        colorScheme,
        autoplay,
        videoTitle: `Demo Video ${i + 1}`,
        type: 'youtube',
        badge: 'YouTube',
        badgeClass: 'bg-red-600 text-white',
        tags: [size, 'video', autoplay ? 'autoplay' : 'manual'],
        searchFields: [
          `video ${i + 1}`,
          'youtube',
          size,
          autoplay ? 'autoplay' : 'manual',
        ],
        status: 'Available',
        statusColor: 'bg-blue-500',
      });
    }

    return configs;
  }, []);

  // Featured items for the showcase
  const featuredItems = [
    {
      id: 'featured-1',
      title: 'JotForm Modal',
      subtitle: 'Pre-configured',
      description:
        'Ready-to-use JotForm modal with optimal settings, auto-sizing, and form validation.',
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      iconBg: 'bg-gradient-to-br from-green-500 to-green-600',
      type: 'jotform-preset',
    },
    {
      id: 'featured-2',
      title: 'YouTube Modal',
      subtitle: 'Video Player',
      description:
        'Optimized YouTube player with lazy loading, autoplay controls, and responsive design.',
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
      iconBg: 'bg-gradient-to-br from-red-500 to-red-600',
      type: 'youtube-preset',
    },
    {
      id: 'featured-3',
      title: 'Custom Components',
      subtitle: 'Advanced Demo',
      description:
        'Individual embed components combined in custom modal layouts for advanced use cases.',
      icon: (
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
      iconBg: 'bg-gradient-to-br from-[#7466e2] to-[#6055b5]',
      type: 'embed-demo',
    },
  ];

  // Filter configurations
  const filterConfigs = [
    {
      key: 'category',
      label: 'Category',
      placeholder: 'All Categories',
      options: [
        { value: 'Basic', label: 'Basic' },
        { value: 'JotForm', label: 'JotForm' },
        { value: 'YouTube', label: 'YouTube' },
      ],
    },
    {
      key: 'size',
      label: 'Size',
      placeholder: 'All Sizes',
      options: sizes.map((size) => ({
        value: size,
        label: size.toUpperCase(),
      })),
    },
    {
      key: 'position',
      label: 'Position',
      placeholder: 'All Positions',
      options: positions.map((pos) => ({
        value: pos,
        label: pos.charAt(0).toUpperCase() + pos.slice(1),
      })),
    },
  ];

  // Handle modal opening
  const handleModalClick = (config) => {
    setActiveModal(config);
    modalState.onOpen();
  };

  // Handle featured item clicks
  const handleFeaturedClick = (featured) => {
    const presetConfig = {
      type: featured.type,
      formId:
        featured.type === 'jotform-preset'
          ? 'demo-form-preset'
          : undefined,
      formTitle:
        featured.type === 'jotform-preset'
          ? 'Preset JotForm Modal'
          : undefined,
      videoId:
        featured.type === 'youtube-preset'
          ? 'dQw4w9WgXcQ'
          : undefined,
      videoTitle:
        featured.type === 'youtube-preset'
          ? 'Preset YouTube Modal'
          : undefined,
    };
    setActiveModal(presetConfig);
    modalState.onOpen();
  };

  // Render modal content based on type
  const renderModalContent = () => {
    if (!activeModal) return null;

    const { type, colorScheme } = activeModal;

    if (type === 'basic') {
      return (
        <>
          <Modal.Header
            showCloseButton
            onClose={modalState.onClose}
            className={colorScheme.header}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">
                  {activeModal.id}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  {activeModal.title}
                </h3>
                <p className="text-sm opacity-90">
                  {activeModal.subtitle}
                </p>
              </div>
            </div>
          </Modal.Header>
          <Modal.Body className={colorScheme.bg}>
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-lg mb-4">
                  {activeModal.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-white/50 rounded-lg backdrop-blur-sm">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm uppercase tracking-wide opacity-70">
                    Configuration
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Size:</span>{' '}
                      {activeModal.size}
                    </p>
                    <p>
                      <span className="font-medium">Position:</span>{' '}
                      {activeModal.position}
                    </p>
                    <p>
                      <span className="font-medium">Close:</span>{' '}
                      {activeModal.closeButtonPosition}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm uppercase tracking-wide opacity-70">
                    Features
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Blur:</span>{' '}
                      {activeModal.backdropBlur}
                    </p>
                    <p>
                      <span className="font-medium">Static:</span>{' '}
                      {activeModal.isStatic ? 'Yes' : 'No'}
                    </p>
                    <p>
                      <span className="font-medium">Backdrop:</span>{' '}
                      {activeModal.allowBackdropClick
                        ? 'Clickable'
                        : 'Disabled'}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg ${colorScheme.bg} ${colorScheme.border} border-2 border-dashed`}
              >
                <h4
                  className={`font-semibold mb-2 ${colorScheme.accent}`}
                >
                  Modal #{activeModal.id}
                </h4>
                <p className="text-sm opacity-80">
                  This modal demonstrates the{' '}
                  {colorScheme.name.toLowerCase()} color scheme with a{' '}
                  {activeModal.size} size and {activeModal.position}{' '}
                  positioning. The backdrop blur is set to "
                  {activeModal.backdropBlur}".
                </p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-white/50">
            <div className="flex gap-3 justify-end w-full">
              <Button
                variant="bordered"
                onPress={modalState.onClose}
                className={`${colorScheme.accent} ${colorScheme.border}`}
              >
                Close
              </Button>
              <Button
                className={colorScheme.chip}
                onPress={modalState.onClose}
              >
                Confirm
              </Button>
            </div>
          </Modal.Footer>
        </>
      );
    }

    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="min-h-screen bg-darkBg text-textLight p-0"
    >
      <SearchableGrid
        title="Modal System Showcase"
        subtitle="Comprehensive demonstration of the Voyager modal system with hundreds of variations"
        items={modalConfigurations}
        featuredItems={featuredItems}
        filterConfigs={filterConfigs}
        onItemClick={handleModalClick}
        onFeaturedClick={handleFeaturedClick}
        searchPlaceholder="Search modals..."
        gridProps={{
          columns:
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
          gap: 'gap-4',
        }}
      >
        {/* Custom content between filters and grid */}
        <div className="bg-gradient-to-r from-[#e79023]/10 to-[#a6620c]/10 rounded-lg p-6 border border-[#e79023]/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#e79023] to-[#a6620c] rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#e79023] mb-1">
                Composition over Inheritance
              </h3>
              <p className="text-gray-300 text-sm">
                This modal system uses React composition patterns
                instead of traditional inheritance, providing maximum
                flexibility while maintaining consistency across your
                application.
              </p>
            </div>
          </div>
        </div>

        {/* Active Modal Rendering */}
        {activeModal && (
          <>
            {/* Preset Modals */}
            {activeModal.type === 'jotform-preset' && (
              <JotFormModal
                isOpen={modalState.isOpen}
                onClose={modalState.onClose}
                formId={activeModal.formId}
                formTitle={activeModal.formTitle}
                size="xl"
              />
            )}

            {activeModal.type === 'youtube-preset' && (
              <YouTubeModal
                isOpen={modalState.isOpen}
                onClose={modalState.onClose}
                videoId={activeModal.videoId}
                videoTitle={activeModal.videoTitle}
                size="lg"
                autoplay={true}
              />
            )}

            {activeModal.type === 'embed-demo' && (
              <Modal
                isOpen={modalState.isOpen}
                onClose={modalState.onClose}
                size="xl"
                closeButtonPosition="floating"
              >
                <Modal.Header className="bg-gradient-to-r from-[#7466e2] to-[#6055b5] text-white">
                  <h3 className="text-lg font-semibold">
                    Embed Components Demo
                  </h3>
                </Modal.Header>
                <Modal.Body className="space-y-6 bg-gradient-to-br from-purple-50 to-indigo-50">
                  <div>
                    <h4 className="font-medium mb-3 text-[#7466e2]">
                      YouTube Embed Component
                    </h4>
                    <YouTubeEmbed
                      videoId="dQw4w9WgXcQ"
                      title="Demo YouTube Video"
                      lazyLoad={true}
                      autoplay={false}
                    />
                  </div>
                  <div>
                    <h4 className="font-medium mb-3 text-[#7466e2]">
                      JotForm Embed Component
                    </h4>
                    <JotFormEmbed
                      formId="demo-embed-form"
                      formTitle="Demo Embedded Form"
                      height={300}
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer
                  showCloseButton
                  onClose={modalState.onClose}
                />
              </Modal>
            )}

            {/* JotForm Type */}
            {activeModal.type === 'jotform' && (
              <JotFormModal
                isOpen={modalState.isOpen}
                onClose={modalState.onClose}
                formId={activeModal.formId}
                formTitle={activeModal.formTitle}
                size={activeModal.size}
              />
            )}

            {/* YouTube Type */}
            {activeModal.type === 'youtube' && (
              <YouTubeModal
                isOpen={modalState.isOpen}
                onClose={modalState.onClose}
                videoId={activeModal.videoId}
                videoTitle={activeModal.videoTitle}
                size={activeModal.size}
                autoplay={activeModal.autoplay}
              />
            )}

            {/* Basic Type */}
            {activeModal.type === 'basic' && (
              <Modal
                isOpen={modalState.isOpen}
                onClose={modalState.onClose}
                size={activeModal.size}
                position={activeModal.position}
                closeButtonPosition={activeModal.closeButtonPosition}
                backdropBlur={activeModal.backdropBlur}
                isStatic={activeModal.isStatic}
                allowBackdropClick={activeModal.allowBackdropClick}
              >
                {renderModalContent()}
              </Modal>
            )}
          </>
        )}
      </SearchableGrid>
    </motion.div>
  );
}
