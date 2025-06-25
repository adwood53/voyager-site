// pages/modal-showcase/page.js - Complete Voyager Modal System Showcase
'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ModalProvider, useModal } from './core/ModalEngine';
import VoyagerModal from './VoyagerModal';
import {
  ConfirmationModal,
  YouTubeModal,
  JotFormModal,
  ImageGalleryModal,
  NotificationModal,
  LoadingModal,
} from './types/ModalTypes';
import { SearchableGrid } from '../ui/SearchableGrid';

/**
 * VOYAGER MODAL SYSTEM SHOWCASE
 *
 * Complete demonstration using SearchableGrid with comprehensive modal variations
 */

// ============================================================================
// SAMPLE DATA
// ============================================================================

const sampleImages = [
  {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
    thumbnail:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop',
    title: 'Mountain Landscape',
    description: 'Beautiful mountain scenery with lake reflection',
  },
  {
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop',
    thumbnail:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=150&h=150&fit=crop',
    title: 'Forest Path',
    description: 'Mystical forest path leading into the distance',
  },
  {
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop',
    thumbnail:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=150&h=150&fit=crop',
    title: 'Ocean View',
    description: 'Peaceful ocean waves meeting the shore',
  },
];

const modalThemes = {
  voyager: {
    name: 'Voyager Default',
    colors: {
      primary: '#e79023',
      primaryDark: '#a6620c',
      altPrimary: '#7466e2',
      background: '#0a0a0a',
      surface: '#1a1a1a',
      text: '#ffffff',
    },
  },
  ocean: {
    name: 'Ocean Blue',
    colors: {
      primary: '#0ea5e9',
      primaryDark: '#0284c7',
      altPrimary: '#06b6d4',
      background: '#0c1929',
      surface: '#1e293b',
      text: '#f1f5f9',
    },
  },
  forest: {
    name: 'Forest Green',
    colors: {
      primary: '#10b981',
      primaryDark: '#059669',
      altPrimary: '#34d399',
      background: '#064e3b',
      surface: '#065f46',
      text: '#ecfdf5',
    },
  },
  sunset: {
    name: 'Sunset',
    colors: {
      primary: '#f59e0b',
      primaryDark: '#d97706',
      altPrimary: '#ef4444',
      background: '#451a03',
      surface: '#78350f',
      text: '#fef3c7',
    },
  },
  neon: {
    name: 'Neon',
    colors: {
      primary: '#a855f7',
      primaryDark: '#9333ea',
      altPrimary: '#ec4899',
      background: '#1e1b4b',
      surface: '#312e81',
      text: '#f3e8ff',
    },
  },
};

// ============================================================================
// CUSTOM MODAL EXAMPLES
// ============================================================================

const ThemedModal = ({ isOpen, onClose, theme, title, content }) => (
  <VoyagerModal
    isOpen={isOpen}
    onClose={onClose}
    size="md"
    animation="scale"
    customTheme={theme}
  >
    <VoyagerModal.Header onClose={onClose}>
      <h3
        className="text-lg font-semibold"
        style={{ color: theme.colors.text }}
      >
        {title}
      </h3>
    </VoyagerModal.Header>
    <VoyagerModal.Body>
      <div style={{ color: theme.colors.text }}>
        {content}
        <div
          className="mt-4 p-3 rounded"
          style={{ backgroundColor: theme.colors.surface }}
        >
          <p className="text-sm opacity-80">
            This modal uses the {theme.name} theme with custom colors
            and styling.
          </p>
        </div>
      </div>
    </VoyagerModal.Body>
    <VoyagerModal.Footer>
      <button
        onClick={onClose}
        className="px-4 py-2 rounded-lg text-white transition-colors"
        style={{ backgroundColor: theme.colors.primary }}
      >
        Close
      </button>
    </VoyagerModal.Footer>
  </VoyagerModal>
);

// ============================================================================
// MAIN SHOWCASE COMPONENT
// ============================================================================

const ModalShowcaseContent = () => {
  const { state } = useModal();

  // State for active modals
  const [activeModal, setActiveModal] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Generate comprehensive modal examples for SearchableGrid
  const modalExamples = useMemo(() => {
    const examples = [];
    let id = 1;

    // Theme variations
    Object.entries(modalThemes).forEach(([key, theme]) => {
      examples.push({
        id: id++,
        title: `${theme.name} Modal`,
        subtitle: 'Themed Modal',
        description: `Modal with ${theme.name} theme styling and custom colors`,
        category: 'Themed',
        badge: 'Themed',
        badgeClass: 'bg-purple-600 text-white',
        type: 'themed',
        theme,
        tags: ['themed', theme.name.toLowerCase().replace(' ', '-')],
        searchFields: [
          `${theme.name} modal`,
          'themed',
          'custom styling',
        ],
      });
    });

    // Specialized modals
    examples.push(
      {
        id: id++,
        title: 'Confirmation Modal',
        subtitle: 'User Confirmation',
        description:
          'Customizable confirmation dialog with danger variant',
        category: 'Interactive',
        badge: 'Confirm',
        badgeClass: 'bg-red-600 text-white',
        type: 'confirmation',
        tags: ['confirmation', 'dialog', 'action'],
        searchFields: ['confirmation', 'delete', 'action', 'dialog'],
      },
      {
        id: id++,
        title: 'YouTube Player',
        subtitle: 'Video Content',
        description:
          'Responsive video player with proper aspect ratio and controls',
        category: 'Media',
        badge: 'Video',
        badgeClass: 'bg-red-600 text-white',
        type: 'youtube',
        tags: ['video', 'youtube', 'media'],
        searchFields: ['youtube', 'video', 'media', 'player'],
      },
      {
        id: id++,
        title: 'JotForm Embed',
        subtitle: 'Form Integration',
        description:
          'Embedded form with auto-sizing and submission handling',
        category: 'Forms',
        badge: 'Form',
        badgeClass: 'bg-green-600 text-white',
        type: 'jotform',
        tags: ['form', 'jotform', 'embed'],
        searchFields: ['jotform', 'form', 'embed', 'submission'],
      },
      {
        id: id++,
        title: 'Image Gallery',
        subtitle: 'Photo Viewer',
        description:
          'Full-featured gallery with zoom, navigation, and thumbnails',
        category: 'Media',
        badge: 'Gallery',
        badgeClass: 'bg-purple-600 text-white',
        type: 'gallery',
        tags: ['gallery', 'images', 'photos'],
        searchFields: ['gallery', 'images', 'photos', 'viewer'],
      },
      {
        id: id++,
        title: 'Smart Notification',
        subtitle: 'Alert System',
        description:
          'Auto-closing notification with progress indication',
        category: 'Feedback',
        badge: 'Alert',
        badgeClass: 'bg-blue-600 text-white',
        type: 'notification',
        tags: ['notification', 'alert', 'feedback'],
        searchFields: ['notification', 'alert', 'toast', 'feedback'],
      },
      {
        id: id++,
        title: 'Loading Progress',
        subtitle: 'Async Operations',
        description:
          'Loading modal with progress indication and cancellation',
        category: 'Feedback',
        badge: 'Loading',
        badgeClass: 'bg-yellow-600 text-white',
        type: 'loading',
        tags: ['loading', 'progress', 'async'],
        searchFields: ['loading', 'progress', 'spinner', 'async'],
      }
    );

    return examples;
  }, []);

  // Filter configurations for SearchableGrid
  const filterConfigs = [
    {
      key: 'category',
      label: 'Category',
      placeholder: 'All Categories',
      options: [
        { value: 'Themed', label: 'Themed' },
        { value: 'Interactive', label: 'Interactive' },
        { value: 'Media', label: 'Media' },
        { value: 'Forms', label: 'Forms' },
        { value: 'Feedback', label: 'Feedback' },
      ],
    },
    {
      key: 'type',
      label: 'Type',
      placeholder: 'All Types',
      options: [
        { value: 'themed', label: 'Themed Modal' },
        { value: 'confirmation', label: 'Confirmation' },
        { value: 'youtube', label: 'YouTube' },
        { value: 'jotform', label: 'JotForm' },
        { value: 'gallery', label: 'Gallery' },
        { value: 'notification', label: 'Notification' },
        { value: 'loading', label: 'Loading' },
      ],
    },
  ];

  // Featured items for showcase
  const featuredItems = [
    {
      id: 'featured-1',
      title: 'Themed Modals',
      subtitle: 'Custom Styling',
      description:
        'Beautiful themed modals with custom color schemes and styling variations.',
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
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v6a2 2 0 002 2h4a2 2 0 002-2V5z"
          />
        </svg>
      ),
      iconBg: 'bg-gradient-to-br from-purple-500 to-pink-500',
      type: 'themed-showcase',
    },
    {
      id: 'featured-2',
      title: 'Media Integration',
      subtitle: 'Video & Images',
      description:
        'Responsive media modals with proper sizing and interactive controls.',
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
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      ),
      iconBg: 'bg-gradient-to-br from-red-500 to-orange-500',
      type: 'media-showcase',
    },
  ];

  // Notification management
  const addNotification = useCallback((type, title, message) => {
    const id = `notif-${Date.now()}-${Math.random()}`;
    const notification = { id, type, title, message };
    setNotifications((prev) => [...prev, notification]);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  //Loading Sim
  const simulateLoading = useCallback(() => {
    setActiveModal({ type: 'loading' });
    setLoadingProgress(0);

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          setActiveModal(null);
          addNotification(
            'success',
            'Operation Complete!',
            'The loading process finished successfully.'
          );
          return 100;
        }
        return newProgress;
      });
    }, 200);
  }, [addNotification]);

  // Handle modal selection from grid
  const handleModalClick = useCallback((modalConfig) => {
    setActiveModal(modalConfig);
  }, []);

  // Handle featured item clicks
  const handleFeaturedClick = useCallback((featured) => {
    if (featured.type === 'themed-showcase') {
      setActiveModal({ type: 'themed', theme: modalThemes.neon });
    } else if (featured.type === 'media-showcase') {
      setActiveModal({ type: 'gallery' });
    }
  }, []);

  // Render active modal
  const renderActiveModal = () => {
    if (!activeModal) return null;

    const commonProps = {
      isOpen: true,
      onClose: () => setActiveModal(null),
    };

    switch (activeModal.type) {
      case 'themed':
        return (
          <ThemedModal
            {...commonProps}
            theme={activeModal.theme}
            title={`${activeModal.theme.name} Modal`}
            content={
              <div>
                <p>
                  This is a themed modal showcasing custom styling
                  capabilities.
                </p>
                <p className="mt-2">
                  Each theme provides a complete color scheme and
                  visual identity.
                </p>
              </div>
            }
          />
        );

      case 'confirmation':
        return (
          <ConfirmationModal
            {...commonProps}
            onConfirm={() => {
              addNotification(
                'success',
                'Confirmed!',
                'Action was successfully confirmed.'
              );
              setActiveModal(null);
            }}
            title="Delete Item"
            message="Are you sure you want to delete this item? This action cannot be undone."
            variant="danger"
          />
        );

      case 'youtube':
        return (
          <YouTubeModal
            {...commonProps}
            videoId="dQw4w9WgXcQ"
            title="Never Gonna Give You Up"
            responsive={true}
          />
        );

      case 'jotform':
        return (
          <JotFormModal
            {...commonProps}
            formId="250963921804056"
            title="Contact Form"
            onSubmit={(data) => {
              addNotification(
                'success',
                'Form Submitted!',
                'Your form was successfully submitted.'
              );
            }}
          />
        );

      case 'gallery':
        return (
          <ImageGalleryModal
            {...commonProps}
            images={sampleImages}
            showThumbnails={true}
            allowZoom={true}
            showInfo={true}
          />
        );

      case 'notification':
        addNotification(
          'info',
          'Test Notification',
          'This is a test notification with auto-close functionality.'
        );
        setActiveModal(null);
        return null;

      case 'loading':
        return (
          <LoadingModal
            {...commonProps}
            title="Processing Request"
            message="Please wait while we process your request..."
            progress={loadingProgress}
            showProgress={true}
            cancelable={true}
            onCancel={() => setActiveModal(null)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Notifications */}
      {notifications.map((notification) => (
        <NotificationModal
          key={notification.id}
          isOpen={true}
          onClose={() => removeNotification(notification.id)}
          type={notification.type}
          title={notification.title}
          message={notification.message}
          autoClose={true}
          autoCloseDelay={4000}
          showProgress={true}
          position="top-right"
        />
      ))}

      {/* Main content with SearchableGrid */}
      <SearchableGrid
        title="Voyager Modal System"
        subtitle="The most comprehensively engineered modal system ever built"
        items={modalExamples}
        featuredItems={featuredItems}
        filterConfigs={filterConfigs}
        onItemClick={handleModalClick}
        onFeaturedClick={handleFeaturedClick}
        searchPlaceholder="Search modals..."
        gridProps={{
          columns:
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
          gap: 'gap-6',
        }}
      >
        {/* Stats section */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">
                {state.stack.length}
              </div>
              <div className="text-sm text-gray-400">
                Active Modals
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">
                {modalExamples.length}
              </div>
              <div className="text-sm text-gray-400">Modal Types</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">
                {Object.keys(modalThemes).length}
              </div>
              <div className="text-sm text-gray-400">Themes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">
                ∞
              </div>
              <div className="text-sm text-gray-400">
                Possibilities
              </div>
            </div>
          </div>
        </div>

        {/* System Controls */}
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8 backdrop-blur-sm border border-gray-700">
          <h3 className="text-lg font-semibold mb-4">
            System Controls
          </h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setNotifications([])}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Clear Notifications ({notifications.length})
            </button>
            <button
              onClick={simulateLoading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Test Loading
            </button>
            <button
              onClick={() =>
                addNotification(
                  'warning',
                  'System Alert',
                  'This is a warning notification.'
                )
              }
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
            >
              Test Notification
            </button>
          </div>
        </div>
      </SearchableGrid>

      {/* Render active modal */}
      {renderActiveModal()}
    </div>
  );
};

// ============================================================================
// MAIN EXPORT WITH PROVIDER
// ============================================================================

export default function VoyagerModalShowcase() {
  return (
    <ModalProvider config={{ baseZIndex: 1000 }}>
      <ModalShowcaseContent />
    </ModalProvider>
  );
}
