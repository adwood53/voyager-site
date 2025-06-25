/**
 * File: src/app/components/modal/types/ModalTypes.js
 *
 * Complete fixed file with:
 * - Smooth notification auto-close with transition
 * - Dynamic screen-responsive modals
 * - Wider JotForm embeds
 * - Fixed gallery sizing
 */

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
import { createPortal } from 'react-dom';

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
      animation="scale"
      {...props}
    >
      <VoyagerModal.Body>
        <div className="text-center py-6">
          {/* Icon */}
          <div
            className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center ${config.iconColor}`}
          >
            {icon || (
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            )}
          </div>

          {/* Content */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {title}
          </h3>
          {message && <p className="text-gray-600 mb-6">{message}</p>}

          {/* Actions */}
          <div className="flex gap-3 justify-center">
            {customActions || (
              <>
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  disabled={isLoading}
                >
                  {cancelText}
                </button>
                <button
                  onClick={handleConfirm}
                  className={`px-4 py-2 ${config.confirmColor} text-white rounded-lg transition-colors shadow-lg ${config.glowColor} disabled:opacity-50`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : confirmText}
                </button>
              </>
            )}
          </div>
        </div>
      </VoyagerModal.Body>
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
    // Always use dynamic screen sizing
    const aspectRatio = 16 / 9;

    if (viewport.isMobile) {
      const width = viewport.width * 0.95;
      const height = Math.min(
        (width * 9) / 16 + 100, // 16:9 ratio + header space
        viewport.height * 0.8
      );
      return {
        width: Math.round(width),
        height: Math.round(height),
      };
    }

    const width = Math.min(viewport.width * 0.8, 1000);
    const height = Math.min(
      (width * 9) / 16 + 120, // 16:9 ratio + header space
      viewport.height * 0.8
    );

    return {
      width: Math.round(width),
      height: Math.round(height),
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
  const [formHeight, setFormHeight] = useState(Math.max(height, 500));
  const [error, setError] = useState(null);
  const iframeRef = useRef(null);
  const { viewport } = useModal();

  const buildJotFormUrl = () => {
    const domain = customDomain || 'form.jotform.com';
    return `https://${domain}/${formId}`;
  };

  // Calculate optimal modal size for forms - WIDER SIZING
  const getFormModalSize = () => {
    const minHeight = 500;
    const maxHeight = viewport.height * 0.9;
    const calculatedHeight = Math.min(
      Math.max(formHeight, minHeight),
      maxHeight
    );

    if (viewport.isMobile) {
      return {
        width: viewport.width * 0.95, // 95% on mobile
        height: calculatedHeight + 60,
        maxHeight: viewport.height * 0.9,
      };
    }

    return {
      width: Math.min(viewport.width * 0.85, 1000), // WIDER: 85% instead of 80%, up to 1000px
      height: calculatedHeight + 80,
      maxHeight: viewport.height * 0.9,
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
// IMAGE GALLERY MODAL - DYNAMIC SIZING
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

  // DYNAMIC GALLERY SIZE - Always responsive to screen
  const getGallerySize = () => {
    return {
      width: viewport.width * 0.95, // Always 95% of screen width
      height: viewport.height * 0.85, // Always 85% of screen height
      maxWidth: '95vw',
      maxHeight: '85vh',
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
      <div className="flex flex-col h-full bg-black">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-colors"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-colors"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-colors"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </button>
          </>
        )}

        {/* Main image */}
        <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
          <motion.img
            key={currentIndex}
            src={currentImage.url || currentImage.src}
            alt={currentImage.title || `Image ${currentIndex + 1}`}
            className={`cursor-${allowZoom ? 'zoom-in' : 'default'} ${
              isZoomed ? 'cursor-zoom-out' : ''
            }`}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              transform: isZoomed ? 'scale(1.5)' : 'scale(1)',
            }}
            onClick={handleImageClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Info overlay */}
        {showInfo &&
          (currentImage.title || currentImage.description) && (
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent text-white">
              {currentImage.title && (
                <h3 className="text-xl font-bold mb-2">
                  {currentImage.title}
                </h3>
              )}
              {currentImage.description && (
                <p className="text-gray-300">
                  {currentImage.description}
                </p>
              )}
            </div>
          )}

        {/* Thumbnails */}
        {showThumbnails && images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
            <div className="flex gap-2 p-2 bg-black bg-opacity-50 rounded-lg">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsZoomed(false);
                  }}
                  className={`w-16 h-16 rounded overflow-hidden border-2 transition-colors ${
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
// NOTIFICATION MODAL - SMOOTH AUTO-CLOSE
// ============================================================================

export const NotificationModal = ({
  isOpen,
  onClose,
  type = 'info',
  title,
  message,
  autoClose = true,
  autoCloseDelay = 2000,
  showProgress = false,
  ...props
}) => {
  const [progress, setProgress] = useState(100);
  const [isClosing, setIsClosing] = useState(false);

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

  // Auto-close with progress
  useEffect(() => {
    if (autoClose && isOpen && !isClosing) {
      let currentProgress = 100;
      const decrement = 100 / (autoCloseDelay / 100);

      const progressInterval = setInterval(() => {
        currentProgress -= decrement;
        setProgress(Math.max(0, currentProgress));

        if (currentProgress <= 0) {
          clearInterval(progressInterval);
          setIsClosing(true);
          setTimeout(() => onClose(), 300);
        }
      }, 100);

      return () => clearInterval(progressInterval);
    }
  }, [autoClose, isOpen, autoCloseDelay, onClose, isClosing]);

  useEffect(() => {
    if (isOpen) {
      setProgress(100);
      setIsClosing(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: '-40%',
        left: '0%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        pointerEvents: 'none', // This makes clicks pass through completely
        width: '400px',
        maxWidth: 'calc(100vw - 40px)',
        opacity: isClosing ? 0 : 1,
        transition: 'opacity 0.3s ease-out',
      }}
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
          </div>
        </div>

        {showProgress && autoClose && (
          <div className="h-1 bg-black bg-opacity-20">
            <div
              className="h-full bg-white bg-opacity-50 transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>,
    document.body
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
