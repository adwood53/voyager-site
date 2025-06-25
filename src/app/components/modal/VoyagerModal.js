'use client';

import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

// ============================================================================
// CORE CENTERING STYLES - THE ACTUAL FIX
// ============================================================================

const MODAL_OVERLAY_STYLES = {
  // This is the key - proper viewport centering
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1000,
  // Flexbox for perfect centering - dead simple and reliable
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem', // Consistent padding on all sides
};

const MODAL_CONTENT_STYLES = {
  // Let the content size itself, but with sensible constraints
  position: 'relative',
  zIndex: 1001,
  maxWidth: '90vw', // Responsive width constraint
  maxHeight: '90vh', // Responsive height constraint
  width: '100%', // Allow content to define width up to maxWidth
  display: 'flex',
  flexDirection: 'column',
  // Remove any transforms or absolute positioning that might break centering
  transform: 'none',
};

// ============================================================================
// SIMPLIFIED SIZE PRESETS
// ============================================================================

const SIZE_PRESETS = {
  xs: { width: '300px', maxWidth: '90vw' },
  sm: { width: '400px', maxWidth: '90vw' },
  md: { width: '500px', maxWidth: '90vw' },
  lg: { width: '600px', maxWidth: '90vw' },
  xl: { width: '800px', maxWidth: '90vw' },
  '2xl': { width: '1000px', maxWidth: '90vw' },
  full: { width: '90vw', maxWidth: '90vw' },
  auto: {}, // Let content determine size
};

// ============================================================================
// THEME SYSTEM (SIMPLIFIED)
// ============================================================================

const VOYAGER_THEME = {
  colors: {
    primary: '#e79023',
    background: '#0a0a0a',
    surface: '#1a1a1a',
    text: '#ffffff',
    border: 'rgba(255, 255, 255, 0.1)',
  },
  shadows: {
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  borderRadius: {
    lg: '0.75rem',
  },
};

// ============================================================================
// ANIMATION PRESETS (SIMPLIFIED)
// ============================================================================

const ANIMATION_PRESETS = {
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
};

// ============================================================================
// BACKDROP COMPONENT - SIMPLIFIED AND EFFECTIVE
// ============================================================================

const ModalBackdrop = ({ onClick, blur = true, className = '' }) => (
  <motion.div
    className={`modal-backdrop ${className}`}
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: blur ? 'blur(8px)' : 'none',
      zIndex: 999, // Below modal content
    }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    onClick={onClick}
  />
);

// ============================================================================
// MAIN MODAL COMPONENT - FIXED AND SIMPLIFIED
// ============================================================================

const VoyagerModal = forwardRef(
  (
    {
      // Core props
      children,
      isOpen = false,
      onClose,

      // Sizing
      size = 'md',

      // Animation
      animation = 'scale',

      // Behavior
      dismissible = true,
      backdrop = true,

      // Styling
      theme = VOYAGER_THEME,
      className = '',
      style = {},

      // Accessibility
      title,
      description,

      ...rest
    },
    ref
  ) => {
    const contentRef = useRef(null);
    const [mounted, setMounted] = useState(false);

    // Set up portal mounting
    useEffect(() => {
      setMounted(true);
    }, []);

    // Get size styles
    const sizeStyles = useMemo(() => {
      const preset = SIZE_PRESETS[size] || SIZE_PRESETS.md;
      return preset;
    }, [size]);

    // Get animation config
    const animationConfig = useMemo(() => {
      return ANIMATION_PRESETS[animation] || ANIMATION_PRESETS.scale;
    }, [animation]);

    // Generate CSS custom properties for theming
    const themeStyles = useMemo(() => {
      return {
        '--modal-primary': theme.colors.primary,
        '--modal-background': theme.colors.background,
        '--modal-surface': theme.colors.surface,
        '--modal-text': theme.colors.text,
        '--modal-border': theme.colors.border,
        '--modal-shadow': theme.shadows.xl,
        '--modal-radius': theme.borderRadius.lg,
      };
    }, [theme]);

    // Handle backdrop click
    const handleBackdropClick = useCallback(
      (e) => {
        if (dismissible && e.target === e.currentTarget && onClose) {
          onClose();
        }
      },
      [dismissible, onClose]
    );

    // Imperative API
    useImperativeHandle(
      ref,
      () => ({
        focus: () => contentRef.current?.focus(),
        close: onClose,
      }),
      [onClose]
    );

    // Don't render anything server-side
    if (!mounted) return null;

    const modalContent = (
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop */}
            {backdrop && (
              <ModalBackdrop onClick={handleBackdropClick} />
            )}

            {/* Modal Overlay - THE ACTUAL CENTERING CONTAINER */}
            <div
              style={{
                ...MODAL_OVERLAY_STYLES,
                ...themeStyles,
              }}
              onClick={handleBackdropClick}
            >
              {/* Modal Content - PROPERLY CENTERED */}
              <motion.div
                ref={contentRef}
                className={`modal-content ${className}`}
                style={{
                  ...MODAL_CONTENT_STYLES,
                  ...sizeStyles,
                  backgroundColor: 'var(--modal-surface)',
                  borderRadius: 'var(--modal-radius)',
                  boxShadow: 'var(--modal-shadow)',
                  border: '1px solid var(--modal-border)',
                  ...style,
                }}
                onClick={(e) => e.stopPropagation()} // Prevent backdrop click
                initial={animationConfig.initial}
                animate={animationConfig.animate}
                exit={animationConfig.exit}
                transition={animationConfig.transition}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? `modal-title` : undefined}
                aria-describedby={
                  description ? `modal-description` : undefined
                }
                {...rest}
              >
                {children}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    );

    // Render through portal
    return createPortal(modalContent, document.body);
  }
);

VoyagerModal.displayName = 'VoyagerModal';

// ============================================================================
// COMPOUND COMPONENTS - SIMPLIFIED
// ============================================================================

const ModalHeader = ({
  children,
  className = '',
  showClose = true,
  onClose,
  ...props
}) => (
  <div
    className={`modal-header ${className}`}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.5rem',
      borderBottom: '1px solid var(--modal-border)',
    }}
    {...props}
  >
    <div style={{ flex: 1 }}>{children}</div>
    {showClose && onClose && (
      <button
        onClick={onClose}
        style={{
          marginLeft: '1rem',
          padding: '0.5rem',
          color: 'var(--modal-text)',
          backgroundColor: 'transparent',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'var(--modal-background)';
          e.target.style.color = 'var(--modal-primary)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.color = 'var(--modal-text)';
        }}
        aria-label="Close modal"
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
);

const ModalBody = ({
  children,
  className = '',
  scrollable = true,
  ...props
}) => (
  <div
    className={`modal-body ${className}`}
    style={{
      flex: 1,
      padding: '1.5rem',
      overflow: scrollable ? 'auto' : 'hidden',
      color: 'var(--modal-text)',
    }}
    {...props}
  >
    {children}
  </div>
);

const ModalFooter = ({ children, className = '', ...props }) => (
  <div
    className={`modal-footer ${className}`}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '0.75rem',
      padding: '1.5rem',
      borderTop: '1px solid var(--modal-border)',
    }}
    {...props}
  >
    {children}
  </div>
);

// Attach compound components
VoyagerModal.Header = ModalHeader;
VoyagerModal.Body = ModalBody;
VoyagerModal.Footer = ModalFooter;

export default VoyagerModal;
export {
  ModalHeader,
  ModalBody,
  ModalFooter,
  SIZE_PRESETS,
  VOYAGER_THEME,
};
