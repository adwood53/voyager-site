'use client';

import { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@heroui/react';

export default function MobileWarning() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check window width on mount and resize
    const checkMobileView = () => {
      // Show warning if screen is less than 768px wide
      setIsVisible(window.innerWidth < 768);
    };

    // Check on initial load
    checkMobileView();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobileView);

    // Clean up
    return () =>
      window.removeEventListener('resize', checkMobileView);
  }, []);

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => setIsVisible(false)}
      placement="center"
      backdrop="blur"
      classNames={{
        base: 'bg-white',
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 bg-white text-gray-800">
          <div className="flex items-center">
            <span className="text-xl mr-2">📱</span>
            <h3 className="text-lg font-medium">
              Mobile Device Detected
            </h3>
          </div>
        </ModalHeader>
        <ModalBody className="bg-white text-gray-600">
          <p>
            This dashboard is optimised for desktop use. While you can
            continue on mobile, some features may not work as expected
            or may be difficult to navigate.
          </p>
          <p className="mt-2">
            For the best experience, please access this dashboard from
            a desktop or laptop computer.
          </p>
        </ModalBody>
        <ModalFooter className="bg-white">
          <Button
            color="primary"
            style={{
              backgroundColor: 'var(--primary-color, #2563EB)',
              color: 'white',
            }}
            onClick={() => setIsVisible(false)}
          >
            Continue Anyway
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
