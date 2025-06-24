// components/modal/types/ModalTypes.js - Specialized Modal Components
'use client';

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VoyagerModal from '../VoyagerModal';
import { useModal } from '../core/ModalEngine';

/**
 * SPECIALIZED MODAL TYPES
 *
 * Pre-configured modal components for common use cases:
 * - ConfirmationModal: For user confirmations with customizable actions
 * - YouTubeModal: Optimized for video content with responsive sizing
 * - JotFormModal: For embedded forms with auto-sizing
 * - ImageGalleryModal: For image viewing with zoom and navigation
 * - NotificationModal: For alerts and notifications
 * - LoadingModal: For async operations with progress indication
 * - FullscreenModal: For immersive content experiences
 */

// ============================================================================
// CONFIRMATION MODAL
// ============================================================================

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger', // 'danger', 'warning', 'info'
  icon,
  customActions,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (onConfirm) {
      setIsLoading(true);
      try {
        await onConfirm();
        onClose();
      } catch (error) {
        console.error('Confirmation action failed:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const variantConfig = {
    danger: {
      iconColor: 'text-red-500',
      confirmColor: 'bg-red-600 hover:bg-red-700',
      glowColor: 'shadow-red-500/20',
    },
    warning: {
      iconColor: 'text-yellow-500',
      confirmColor: 'bg-yellow-600 hover:bg-yellow-700',
      glowColor: 'shadow-yellow-500/20',
    },
    info: {
      iconColor: 'text-blue-500',
      confirmColor: 'bg-blue-600 hover:bg-blue-700',
      glowColor: 'shadow-blue-500/20',
    },
  };

  const config = variantConfig[variant] || variantConfig.info;

  return (
    <VoyagerModal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      animation="bounce"
      dismissible={!isLoading}
      {...props}
    >
      <VoyagerModal.Header showClose={!isLoading} onClose={onClose}>
        <div className="flex items-center gap-3">
          {icon || (
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${config.iconColor}`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
          )}
          <h3 className="text-lg font-semibold text-[var(--modal-text)]">
            {title}
          </h3>
        </div>
      </VoyagerModal.Header>

      <VoyagerModal.Body>
        <div className="text-[var(--modal-text)] text-opacity-80">
          {message}
        </div>
      </VoyagerModal.Body>

      <VoyagerModal.Footer>
        {customActions ? (
          customActions({
            isLoading,
            onClose,
            onConfirm: handleConfirm,
          })
        ) : (
          <>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 border border-[var(--modal-border)] rounded-lg text-[var(--modal-text)] hover:bg-[var(--modal-surface)] transition-colors disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className={`px-4 py-2 rounded-lg text-white transition-all disabled:opacity-50 ${config.confirmColor} ${config.glowColor} shadow-lg`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                confirmText
              )}
            </button>
          </>
        )}
      </VoyagerModal.Footer>
    </VoyagerModal>
  );
};

// ============================================================================
// YOUTUBE MODAL
// ============================================================================

export const YouTubeModal = ({
  isOpen,
  onClose,
  videoId,
  title,
  autoplay = false,
  startTime = 0,
  playlist,
  showControls = true,
  quality = 'hd720',
  responsive = true,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const iframeRef = useRef(null);
  const { viewport } = useModal();

  // Calculate optimal size for video with proper aspect ratio
  const getVideoSize = () => {
    if (viewport.isMobile) {
      return {
        size: 'full',
        width: viewport.width - 16,
        height: viewport.height - 32,
        minHeight: '300px',
      };
    }

    // Calculate based on 16:9 aspect ratio with adequate space
    const maxWidth = Math.min(viewport.width * 0.85, 1000);
    const maxHeight = viewport.height * 0.8;
    const aspectRatio = 16 / 9;

    let width = maxWidth;
    let height = width / aspectRatio + (title ? 80 : 40); // Add space for header if title exists

    // Ensure minimum height for proper video viewing
    const minVideoHeight = 300;
    if (height - (title ? 80 : 40) < minVideoHeight) {
      height = minVideoHeight + (title ? 80 : 40);
      width = (height - (title ? 80 : 40)) * aspectRatio;
    }

    if (height > maxHeight) {
      height = maxHeight;
      width = (height - (title ? 80 : 40)) * aspectRatio;
    }

    return {
      size: 'auto',
      width: Math.round(width),
      height: Math.round(height),
      minHeight: `${minVideoHeight + (title ? 80 : 40)}px`,
    };
  };

  const videoSize = getVideoSize();

  const buildYouTubeUrl = () => {
    const params = new URLSearchParams({
      autoplay: autoplay ? '1' : '0',
      controls: showControls ? '1' : '0',
      start: startTime.toString(),
      quality,
      rel: '0',
      modestbranding: '1',
      iv_load_policy: '3',
      origin: window.location.origin,
    });

    if (playlist) {
      params.append('playlist', playlist);
    }

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setError('Failed to load video');
  };

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setError(null);
    }
  }, [isOpen, videoId]);

  return (
    <VoyagerModal
      isOpen={isOpen}
      onClose={onClose}
      size="auto"
      animation="slideUp"
      swipeToClose={viewport.isMobile}
      swipeDirection="down"
      style={{
        width: videoSize.width,
        height: videoSize.height,
        minHeight: videoSize.minHeight,
      }}
      {...props}
    >
      {title && (
        <VoyagerModal.Header onClose={onClose}>
          <h3 className="text-lg font-semibold text-[var(--modal-text)] truncate pr-8">
            {title}
          </h3>
        </VoyagerModal.Header>
      )}

      <VoyagerModal.Body scrollable={false} className="p-0 flex-1">
        <div
          className="relative w-full h-full bg-black rounded-lg overflow-hidden"
          style={{ minHeight: '300px' }}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-white">Loading video...</p>
              </div>
            </div>
          )}

          {error ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
              <div className="text-center">
                <div className="text-red-500 mb-2">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mx-auto"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <p>{error}</p>
                <button
                  onClick={() => {
                    setError(null);
                    setIsLoading(true);
                  }}
                  className="mt-2 px-4 py-2 bg-red-600 rounded text-white hover:bg-red-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : (
            <iframe
              ref={iframeRef}
              src={buildYouTubeUrl()}
              title={title || `YouTube Video ${videoId}`}
              className="w-full h-full"
              style={{ minHeight: '300px' }}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            />
          )}
        </div>
      </VoyagerModal.Body>
    </VoyagerModal>
  );
};

// ============================================================================
// JOTFORM MODAL
// ============================================================================

export const JotFormModal = ({
  isOpen,
  onClose,
  formId,
  title,
  height = 600,
  onSubmit,
  customDomain,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [formHeight, setFormHeight] = useState(Math.max(height, 500)); // Minimum height of 500px
  const [error, setError] = useState(null);
  const iframeRef = useRef(null);
  const { viewport } = useModal();

  const buildJotFormUrl = () => {
    const domain = customDomain || 'form.jotform.com';
    return `https://${domain}/${formId}`;
  };

  // Calculate optimal modal size for forms
  const getFormModalSize = () => {
    const minHeight = 500;
    const maxHeight = viewport.height * 0.9;
    const calculatedHeight = Math.min(
      Math.max(formHeight, minHeight),
      maxHeight
    );

    if (viewport.isMobile) {
      return {
        width: viewport.width - 16,
        height: calculatedHeight + 60, // Add space for header
        maxHeight: viewport.height - 32,
      };
    }

    return {
      width: Math.min(viewport.width * 0.8, 700),
      height: calculatedHeight + 80, // Add space for header
      maxHeight: viewport.height * 0.95,
    };
  };

  const modalSize = getFormModalSize();

  const handleMessage = useCallback(
    (event) => {
      // Security: Only accept messages from JotForm domains
      const allowedOrigins = [
        'https://form.jotform.com',
        'https://eu-form.jotform.com',
        'https://hipaa-form.jotform.com',
      ];

      if (customDomain) {
        allowedOrigins.push(`https://${customDomain}`);
      }

      if (
        !allowedOrigins.some((origin) =>
          event.origin.includes(origin.replace('https://', ''))
        )
      ) {
        return;
      }

      try {
        const data =
          typeof event.data === 'string'
            ? JSON.parse(event.data)
            : event.data;

        switch (data.type) {
          case 'form_height':
            const newHeight = Math.max(data.height, 500);
            setFormHeight(newHeight);
            break;
          case 'form_submit':
            if (onSubmit) {
              onSubmit(data.formData);
            }
            // Auto-close after successful submission
            setTimeout(() => onClose(), 1500);
            break;
          case 'form_ready':
            setIsLoading(false);
            setError(null);
            break;
          case 'form_error':
            setError('Failed to load form');
            setIsLoading(false);
            break;
        }
      } catch (error) {
        console.warn('Unable to parse JotForm message:', error);
      }
    },
    [onSubmit, onClose, customDomain]
  );

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setError(null);
      setFormHeight(Math.max(height, 500));
    }
  }, [isOpen, formId, height]);

  const handleIframeLoad = () => {
    // Fallback if no message is received
    setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 3000);
  };

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    if (iframeRef.current) {
      iframeRef.current.src = buildJotFormUrl();
    }
  };

  return (
    <VoyagerModal
      isOpen={isOpen}
      onClose={onClose}
      size="auto"
      animation="slideUp"
      style={{
        width: modalSize.width,
        height: modalSize.height,
        maxHeight: modalSize.maxHeight,
      }}
      {...props}
    >
      {title && (
        <VoyagerModal.Header onClose={onClose}>
          <h3 className="text-lg font-semibold text-[var(--modal-text)]">
            {title}
          </h3>
        </VoyagerModal.Header>
      )}

      <VoyagerModal.Body scrollable={false} className="p-0 flex-1">
        <div
          className="relative w-full h-full"
          style={{ minHeight: '500px' }}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--modal-surface)] z-10">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-[var(--modal-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-[var(--modal-text)]">
                  Loading form...
                </p>
              </div>
            </div>
          )}

          {error ? (
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--modal-surface)] z-10">
              <div className="text-center">
                <div className="text-red-500 mb-4">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mx-auto"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <p className="text-[var(--modal-text)] mb-4">
                  {error}
                </p>
                <button
                  onClick={handleRetry}
                  className="px-4 py-2 bg-[var(--modal-primary)] text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : (
            <iframe
              ref={iframeRef}
              src={buildJotFormUrl()}
              title={title || 'Form'}
              className="w-full h-full border-0"
              style={{ minHeight: '500px' }}
              onLoad={handleIframeLoad}
              allow="camera; microphone; geolocation"
            />
          )}
        </div>
      </VoyagerModal.Body>
    </VoyagerModal>
  );
};

// ============================================================================
// IMAGE GALLERY MODAL
// ============================================================================

export const ImageGalleryModal = ({
  isOpen,
  onClose,
  images = [],
  initialIndex = 0,
  showThumbnails = true,
  allowZoom = true,
  showInfo = true,
  ...props
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageScale, setImageScale] = useState(1);
  const imageRef = useRef(null);
  const { viewport } = useModal();

  const currentImage = images[currentIndex];

  // Reset state when modal opens/closes or images change
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsZoomed(false);
      setImageScale(1);
    }
  }, [isOpen, initialIndex, images]);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsZoomed(false);
    setImageScale(1);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + images.length) % images.length
    );
    setIsZoomed(false);
    setImageScale(1);
  }, [images.length]);

  const handleImageClick = () => {
    if (allowZoom) {
      setIsZoomed(!isZoomed);
      setImageScale(isZoomed ? 1 : 2);
    }
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          prevImage();
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextImage();
          break;
        case ' ':
          event.preventDefault();
          handleImageClick();
          break;
        case 'Escape':
          event.preventDefault();
          onClose();
          break;
      }
    },
    [isOpen, nextImage, prevImage, onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () =>
      document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Calculate optimal gallery size
  const getGallerySize = () => {
    if (viewport.isMobile) {
      return {
        width: viewport.width - 16,
        height: viewport.height - 32,
        maxWidth: '100vw',
        maxHeight: '100vh',
      };
    }

    return {
      width: Math.min(viewport.width * 0.9, 1200),
      height: Math.min(viewport.height * 0.9, 800),
      maxWidth: '95vw',
      maxHeight: '95vh',
    };
  };

  const gallerySize = getGallerySize();

  if (!currentImage) return null;

  return (
    <VoyagerModal
      isOpen={isOpen}
      onClose={onClose}
      size="auto"
      animation="fade"
      backdrop="dark"
      swipeToClose={viewport.isMobile}
      swipeDirection="any"
      dismissible={true}
      style={{
        width: gallerySize.width,
        height: gallerySize.height,
        maxWidth: gallerySize.maxWidth,
        maxHeight: gallerySize.maxHeight,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      {...props}
    >
      <div className="flex flex-col h-full bg-black rounded-lg overflow-hidden">
        {/* Header with image info */}
        {showInfo && (
          <VoyagerModal.Header
            onClose={onClose}
            className="bg-black text-white border-b border-gray-700"
          >
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">
                {currentImage.title ||
                  `Image ${currentIndex + 1} of ${images.length}`}
              </h3>
              {currentImage.description && (
                <p className="text-sm text-gray-300 mt-1">
                  {currentImage.description}
                </p>
              )}
            </div>
          </VoyagerModal.Header>
        )}

        {/* Main image area */}
        <VoyagerModal.Body
          scrollable={false}
          className="flex-1 p-0 relative bg-black"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.img
              ref={imageRef}
              key={`${currentIndex}-${currentImage.url || currentImage.src}`}
              src={currentImage.url || currentImage.src}
              alt={
                currentImage.alt ||
                currentImage.title ||
                'Gallery image'
              }
              className="max-w-full max-h-full object-contain cursor-pointer select-none"
              style={{
                scale: imageScale,
                transformOrigin: 'center',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: imageScale }}
              transition={{ duration: 0.3 }}
              onClick={handleImageClick}
              drag={isZoomed}
              dragConstraints={{
                left: -100,
                right: 100,
                top: -100,
                bottom: 100,
              }}
              dragElastic={0.1}
            />

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full transition-all z-10"
                  aria-label="Previous image"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                  </svg>
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full transition-all z-10"
                  aria-label="Next image"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
                  </svg>
                </button>
              </>
            )}

            {/* Image counter */}
            <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded text-sm">
              {currentIndex + 1} / {images.length}
            </div>

            {/* Zoom indicator */}
            {allowZoom && (
              <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded text-sm">
                {isZoomed ? 'Click to zoom out' : 'Click to zoom in'}
              </div>
            )}
          </div>
        </VoyagerModal.Body>

        {/* Thumbnail strip */}
        {showThumbnails && images.length > 1 && (
          <div className="p-4 border-t border-gray-700 bg-gray-900">
            <div className="flex gap-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsZoomed(false);
                    setImageScale(1);
                  }}
                  className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-colors ${
                    index === currentIndex
                      ? 'border-white'
                      : 'border-transparent hover:border-gray-400'
                  }`}
                >
                  <img
                    src={image.thumbnail || image.url || image.src}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </VoyagerModal>
  );
};

// ============================================================================
// NOTIFICATION MODAL
// ============================================================================

export const NotificationModal = ({
  isOpen,
  onClose,
  type = 'info', // 'success', 'error', 'warning', 'info'
  title,
  message,
  actions,
  autoClose = false,
  autoCloseDelay = 5000,
  showProgress = false,
  position = 'top-right', // 'top-right', 'top-left', 'bottom-right', 'bottom-left', 'center'
  ...props
}) => {
  const [progress, setProgress] = useState(100);
  const [hasStartedAutoClose, setHasStartedAutoClose] =
    useState(false);

  const typeConfig = {
    success: {
      icon: '✓',
      bgColor: 'bg-green-500',
      textColor: 'text-green-50',
      borderColor: 'border-green-400',
    },
    error: {
      icon: '✕',
      bgColor: 'bg-red-500',
      textColor: 'text-red-50',
      borderColor: 'border-red-400',
    },
    warning: {
      icon: '⚠',
      bgColor: 'bg-yellow-500',
      textColor: 'text-yellow-50',
      borderColor: 'border-yellow-400',
    },
    info: {
      icon: 'ℹ',
      bgColor: 'bg-blue-500',
      textColor: 'text-blue-50',
      borderColor: 'border-blue-400',
    },
  };

  const config = typeConfig[type];

  // Position calculation for notifications
  const getNotificationPosition = () => {
    const positions = {
      'top-right': { top: '20px', right: '20px' },
      'top-left': { top: '20px', left: '20px' },
      'bottom-right': { bottom: '20px', right: '20px' },
      'bottom-left': { bottom: '20px', left: '20px' },
      center: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
    };
    return positions[position] || positions['top-right'];
  };

  // Auto-close logic - properly managed to prevent multiple executions
  useEffect(() => {
    if (autoClose && isOpen && !hasStartedAutoClose) {
      setHasStartedAutoClose(true);
      setProgress(100);

      let currentProgress = 100;
      const decrement = 100 / (autoCloseDelay / 100);

      const interval = setInterval(() => {
        currentProgress -= decrement;
        setProgress(currentProgress);

        if (currentProgress <= 0) {
          clearInterval(interval);
          // Use requestAnimationFrame to avoid setState during render
          requestAnimationFrame(() => {
            onClose();
          });
        }
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }
  }, [
    autoClose,
    isOpen,
    autoCloseDelay,
    onClose,
    hasStartedAutoClose,
  ]);

  // Reset auto-close state when modal opens/closes
  useEffect(() => {
    if (!isOpen && hasStartedAutoClose) {
      setHasStartedAutoClose(false);
      setProgress(100);
    }
  }, [isOpen, hasStartedAutoClose]);

  return (
    <VoyagerModal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      position="custom"
      animation="slideDown"
      dismissible={!autoClose}
      style={{
        ...getNotificationPosition(),
        width: '400px',
        maxWidth: 'calc(100vw - 40px)',
        height: 'auto',
      }}
      {...props}
    >
      <div
        className={`${config.bgColor} ${config.textColor} rounded-xl overflow-hidden shadow-2xl`}
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div
              className={`w-8 h-8 rounded-full border-2 ${config.borderColor} flex items-center justify-center font-bold text-lg flex-shrink-0`}
            >
              {config.icon}
            </div>

            <div className="flex-1 min-w-0">
              {title && (
                <h3 className="font-semibold text-lg mb-2 break-words">
                  {title}
                </h3>
              )}
              {message && (
                <p className="opacity-90 break-words">{message}</p>
              )}
            </div>

            {!autoClose && (
              <button
                onClick={onClose}
                className="text-current opacity-70 hover:opacity-100 transition-opacity flex-shrink-0 ml-2"
                aria-label="Close notification"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>

          {actions && (
            <div className="flex gap-2 mt-4">
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={`px-4 py-2 rounded border-2 ${config.borderColor} bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors text-sm font-medium`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {showProgress && autoClose && hasStartedAutoClose && (
          <div className="h-1 bg-black bg-opacity-20">
            <motion.div
              className="h-full bg-white bg-opacity-50"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        )}
      </div>
    </VoyagerModal>
  );
};

// ============================================================================
// LOADING MODAL
// ============================================================================

export const LoadingModal = ({
  isOpen,
  title = 'Loading...',
  message,
  progress,
  showProgress = false,
  cancelable = false,
  onCancel,
  ...props
}) => {
  return (
    <VoyagerModal
      isOpen={isOpen}
      onClose={cancelable ? onCancel : undefined}
      size="sm"
      animation="fade"
      dismissible={cancelable}
      {...props}
    >
      <VoyagerModal.Body>
        <div className="text-center py-8">
          {/* Animated loading spinner */}
          <motion.div
            className="w-16 h-16 border-4 border-[var(--modal-primary)] border-t-transparent rounded-full mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          <h3 className="text-lg font-semibold text-[var(--modal-text)] mb-2">
            {title}
          </h3>

          {message && (
            <p className="text-[var(--modal-text)] opacity-80 mb-4">
              {message}
            </p>
          )}

          {showProgress && typeof progress === 'number' && (
            <div className="w-full bg-[var(--modal-surface)] rounded-full h-2 mb-4">
              <motion.div
                className="h-2 bg-[var(--modal-primary)] rounded-full"
                style={{
                  width: `${Math.max(0, Math.min(100, progress))}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}

          {cancelable && (
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-[var(--modal-border)] rounded-lg text-[var(--modal-text)] hover:bg-[var(--modal-surface)] transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </VoyagerModal.Body>
    </VoyagerModal>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  ConfirmationModal,
  YouTubeModal,
  JotFormModal,
  ImageGalleryModal,
  NotificationModal,
  LoadingModal,
};
