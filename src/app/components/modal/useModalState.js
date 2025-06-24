// components/modal/useModalState.js
import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook for managing modal state
 *
 * @param {boolean} initialOpen - Initial open state
 * @param {Object} options - Configuration options
 */
export function useModalState(initialOpen = false, options = {}) {
  const {
    onOpen: onOpenCallback,
    onClose: onCloseCallback,
    preventScroll = true,
  } = options;

  const [isOpen, setIsOpen] = useState(initialOpen);
  const [data, setData] = useState(null);

  // Handle opening modal
  const onOpen = useCallback(
    (modalData = null) => {
      setIsOpen(true);
      setData(modalData);

      if (preventScroll) {
        document.body.style.overflow = 'hidden';
      }

      if (onOpenCallback) {
        onOpenCallback(modalData);
      }
    },
    [onOpenCallback, preventScroll]
  );

  // Handle closing modal
  const onClose = useCallback(() => {
    setIsOpen(false);

    if (preventScroll) {
      document.body.style.overflow = 'unset';
    }

    if (onCloseCallback) {
      onCloseCallback();
    }

    // Clear data after animation
    setTimeout(() => setData(null), 150);
  }, [onCloseCallback, preventScroll]);

  // Toggle modal state
  const toggle = useCallback(() => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  }, [isOpen, onOpen, onClose]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (preventScroll) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [preventScroll]);

  return {
    isOpen,
    onOpen,
    onClose,
    toggle,
    data,
    setData,
  };
}
