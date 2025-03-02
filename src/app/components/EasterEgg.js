'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@heroui/react';
import Image from 'next/image';

export default function EasterEgg() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [eggPosition, setEggPosition] = useState({ x: 0, y: 0 });
  const [eggVisible, setEggVisible] = useState(false);

  // Clickable element that is more visible and branded
  useEffect(() => {
    // Position it in the bottom right corner
    setEggPosition({ x: 95, y: 95 });

    // Show the egg after a delay
    const timer = setTimeout(() => {
      setEggVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Easter egg trigger - now more visible and branded */}
      <AnimatePresence>
        {eggVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed cursor-pointer z-50 shadow-glow-sm hover:shadow-glow"
            style={{
              bottom: '20px',
              right: '20px',
              borderRadius: '50%',
              overflow: 'hidden',
              width: '50px',
              height: '50px',
            }}
            onClick={onOpen}
            whileHover={{
              scale: 1.1,
              rotate: [0, 10, -10, 0],
            }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full p-1">
              <div className="flex items-center justify-center h-full w-full bg-darkBg rounded-full">
                <span className="text-2xl">🕶️</span>
              </div>
            </div>
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 0px rgba(231, 144, 35, 0.7)',
                  '0 0 15px rgba(231, 144, 35, 0.7)',
                  '0 0 0px rgba(231, 144, 35, 0.7)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'loop',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* AR Demo Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="3xl"
        classNames={{
          backdrop: 'bg-darkBg bg-opacity-80 backdrop-blur-md',
          base: 'border border-primary border-opacity-20 shadow-glow',
        }}
      >
        <ModalContent>
          <ModalHeader className="bg-darkBg text-textLight border-b border-primary border-opacity-20">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🕶️</span>
              <h2 className="text-xl font-heading">
                Immersive AR Demo Preview
              </h2>
            </div>
          </ModalHeader>
          <ModalBody className="bg-darkBg text-textLight">
            <div className="aspect-video relative overflow-hidden rounded-lg my-4 border border-primary border-opacity-30 shadow-glow-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-altPrimary opacity-10 flex items-center justify-center">
                <Image
                  src="/placeholder.jpg"
                  alt="AR Demo Background"
                  fill
                  className="object-cover opacity-40 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-darkBg bg-opacity-40 backdrop-blur-sm"></div>
                <div className="relative z-10 text-center p-6">
                  <motion.div
                    className="text-6xl mb-6"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: 'loop',
                    }}
                  >
                    🕶️
                  </motion.div>
                  <h3 className="text-2xl font-medium text-primary mb-3">
                    Augmented Reality Experience
                  </h3>
                  <p className="text-textLight opacity-70 mt-2 max-w-md mx-auto">
                    Scan this area with your phone to see our demo
                    come to life with interactive 3D elements and
                    branded content.
                  </p>

                  <motion.div
                    className="mt-6 p-3 border-2 border-dashed border-primary border-opacity-50 inline-block rounded-md"
                    animate={{
                      borderColor: [
                        'rgba(231, 144, 35, 0.5)',
                        'rgba(231, 144, 35, 0.8)',
                        'rgba(231, 144, 35, 0.5)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <div className="w-32 h-32 bg-white p-2 rounded-sm">
                      <div className="w-full h-full bg-black flex items-center justify-center">
                        <span className="text-4xl">🔄</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 px-3 py-1 bg-primary bg-opacity-80 text-textLight text-sm rounded-full">
                Demo Mode
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-medium text-primary mb-4">
                What you&apos;re experiencing:
              </h3>
              <p className="text-textLight opacity-80 mb-6">
                This is a preview of how our AR experiences work. In a
                real implementation, your clients would scan a code to
                reveal branded content, interactive 3D models, and
                engaging elements that drive conversion.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <motion.div
                  className="p-4 bg-darkCard rounded-lg border border-primary border-opacity-20 hover:border-opacity-40 transition-all duration-300 hover:shadow-glow-sm"
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="text-3xl mb-2">📱</div>
                  <p className="font-medium text-primary">
                    Accessible
                  </p>
                  <p className="text-sm text-textLight opacity-60">
                    Works on most modern smartphones
                  </p>
                </motion.div>
                <motion.div
                  className="p-4 bg-darkCard rounded-lg border border-primary border-opacity-20 hover:border-opacity-40 transition-all duration-300 hover:shadow-glow-sm"
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="text-3xl mb-2">🎯</div>
                  <p className="font-medium text-primary">Engaging</p>
                  <p className="text-sm text-textLight opacity-60">
                    Increases time spent with your brand
                  </p>
                </motion.div>
                <motion.div
                  className="p-4 bg-darkCard rounded-lg border border-primary border-opacity-20 hover:border-opacity-40 transition-all duration-300 hover:shadow-glow-sm"
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="text-3xl mb-2">📊</div>
                  <p className="font-medium text-primary">
                    Measurable
                  </p>
                  <p className="text-sm text-textLight opacity-60">
                    Track engagement & conversions
                  </p>
                </motion.div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="bg-darkBg text-textLight border-t border-primary border-opacity-20">
            <Button
              color="primary"
              onClick={onClose}
              className="bg-primary text-textLight hover:bg-accent transition-all duration-300 hover:shadow-glow"
            >
              Close Preview
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
