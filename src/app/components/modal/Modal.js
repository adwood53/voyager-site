// components/modal/Modal.js
'use client';

import {
  Modal as HeroModal,
  ModalContent,
  ModalHeader as HeroModalHeader,
  ModalBody as HeroModalBody,
  ModalFooter as HeroModalFooter,
  Button,
} from '@heroui/react';

// Inline SVG Icons to match your existing pattern
const XIcon = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

/**
 * Base Modal Component with comprehensive configuration options
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {Function} props.onClose - Close handler
 * @param {string} props.size - Modal size (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, full)
 * @param {boolean} props.isStatic - Whether modal is static (can't close by clicking backdrop)
 * @param {boolean} props.allowBackdropClick - Whether clicking backdrop closes modal
 * @param {boolean} props.showCloseButton - Whether to show close button
 * @param {string} props.closeButtonPosition - Close button position ('header', 'floating', 'footer')
 * @param {string} props.scrollBehavior - Scroll behavior ('inside', 'outside')
 * @param {string} props.position - Modal position ('center', 'top', 'bottom')
 * @param {string} props.backdropBlur - Backdrop blur intensity ('none', 'sm', 'md', 'lg')
 * @param {Object} props.customStyles - Custom styles object
 * @param {Function} props.onBackdropClick - Custom backdrop click handler
 * @param {React.ReactNode} props.children - Modal content
 */
export default function Modal({
  isOpen,
  onClose,
  size = 'md',
  isStatic = false,
  allowBackdropClick = true,
  showCloseButton = true,
  closeButtonPosition = 'header',
  scrollBehavior = 'inside',
  position = 'center',
  backdropBlur = 'md',
  customStyles = {},
  onBackdropClick,
  children,
  ...rest
}) {
  // Handle backdrop click
  const handleBackdropClick = (event) => {
    if (onBackdropClick) {
      onBackdropClick(event);
    }

    if (!isStatic && allowBackdropClick && !event.defaultPrevented) {
      onClose();
    }
  };

  // Generate backdrop classes
  const getBackdropClasses = () => {
    const baseClasses = 'bg-black/70';
    const blurClasses = {
      none: '',
      sm: 'backdrop-blur-sm',
      md: 'backdrop-blur-md',
      lg: 'backdrop-blur-lg',
    };
    return `${baseClasses} ${blurClasses[backdropBlur] || blurClasses.md}`;
  };

  // Generate wrapper classes based on position
  const getWrapperClasses = () => {
    const baseClasses = 'fixed inset-0 z-50 flex';
    const positionClasses = {
      center: 'items-center justify-center',
      top: 'items-start justify-center pt-12',
      bottom: 'items-end justify-center pb-12',
    };
    return `${baseClasses} ${positionClasses[position] || positionClasses.center}`;
  };

  // Generate base modal classes
  const getBaseClasses = () => {
    if (size === 'full') {
      return 'w-full h-full max-w-none max-h-none m-0 rounded-none border-none shadow-xl';
    }
    return 'w-[85%] max-w-[calc(100vw-40px)] max-h-[calc(100vh-40px)] m-auto border-none rounded-lg shadow-xl';
  };

  // Floating close button component
  const FloatingCloseButton = () => (
    <Button
      isIconOnly
      variant="light"
      onPress={onClose}
      className="absolute top-2 right-2 z-10 bg-white/90 hover:bg-white shadow-md"
      aria-label="Close modal"
    >
      <XIcon size={18} />
    </Button>
  );

  return (
    <HeroModal
      isOpen={isOpen}
      onClose={isStatic ? undefined : onClose}
      size={size}
      scrollBehavior={scrollBehavior}
      isDismissable={!isStatic && allowBackdropClick}
      onBackdropClick={handleBackdropClick}
      classNames={{
        backdrop: getBackdropClasses(),
        wrapper: getWrapperClasses(),
        base: getBaseClasses(),
        header: 'bg-white border-b border-gray-200 p-6',
        body: 'bg-white p-6',
        footer: 'bg-white border-t border-gray-200 p-6',
        closeButton: 'text-gray-500 hover:text-gray-700',
        ...customStyles,
      }}
      {...rest}
    >
      <ModalContent>
        {(onModalClose) => {
          // Handle floating close button
          if (showCloseButton && closeButtonPosition === 'floating') {
            return (
              <div className="relative">
                <FloatingCloseButton />
                {children}
              </div>
            );
          }

          return children;
        }}
      </ModalContent>
    </HeroModal>
  );
}

// Export compound components for easier usage - FIXED to use correct Hero components
Modal.Header = function ModalHeader({
  children,
  showCloseButton = false,
  onClose,
  className = '',
  ...props
}) {
  return (
    <HeroModalHeader
      className={`flex justify-between items-center ${className}`}
      {...props}
    >
      <div className="flex-1">{children}</div>
      {showCloseButton && onClose && (
        <Button
          isIconOnly
          variant="light"
          onPress={onClose}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <XIcon size={18} />
        </Button>
      )}
    </HeroModalHeader>
  );
};

Modal.Body = function ModalBody({
  children,
  className = '',
  ...props
}) {
  return (
    <HeroModalBody className={`bg-white ${className}`} {...props}>
      {children}
    </HeroModalBody>
  );
};

Modal.Footer = function ModalFooter({
  children,
  showCloseButton = false,
  onClose,
  closeButtonText = 'Close',
  className = '',
  ...props
}) {
  return (
    <HeroModalFooter className={`bg-white ${className}`} {...props}>
      <div className="flex justify-between items-center w-full">
        <div className="flex-1">{children}</div>
        {showCloseButton && onClose && (
          <Button onPress={onClose} variant="light">
            {closeButtonText}
          </Button>
        )}
      </div>
    </HeroModalFooter>
  );
};
