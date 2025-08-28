/**
 * ReviewPopup.js - Center-floating toast + fullscreen review modal (via portal)
 * File: src/app/components/ReviewPopup.js
 */

'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@heroui/react';
import Image from 'next/image';

const Portal = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? createPortal(children, document.body) : null;
};

const ReviewPopup = () => {
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  // Show toast after page loads
  useEffect(() => {
    const timer = setTimeout(() => setShowToast(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Hide toast after 10 seconds (optional)
  useEffect(() => {
    if (!showToast) return;
    const timer = setTimeout(() => setShowToast(false), 15000);
    return () => clearTimeout(timer);
  }, [showToast]);

  const loadReviews = async () => {
    if (reviews.length) return;
    setLoading(true);
    try {
      const response = await fetch('/reviews/reviews.json');
      const data = await response.json();
      setReviews(data.reviews || []);
    } catch (e) {
      console.error('Failed to load reviews:', e);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToastClick = () => {
    setShowModal(true);
    setShowToast(false);
    loadReviews();
  };

  const closeModal = () => setShowModal(false);

  // Star icon
  const Star = ({ delay = 0, size = 16 }) => (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1.2, 1],
        opacity: 1,
        filter: [
          'drop-shadow(0 0 0px #fbbf24)',
          'drop-shadow(0 0 8px #fbbf24)',
          'drop-shadow(0 0 4px #fbbf24)',
        ],
      }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      className="text-yellow-400"
      style={{ fontSize: `${size}px` }}
    >
      ★
    </motion.div>
  );

  // Review stars
  const ReviewStars = ({ rating, size = 16 }) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          className={
            s <= rating ? 'text-yellow-400' : 'text-gray-300'
          }
          style={{ fontSize: `${size}px` }}
        >
          ★
        </span>
      ))}
    </div>
  );

  return (
    <>
      {/* Center-floating Toast (via portal) */}
      <AnimatePresence>
        {showToast && (
          <Portal>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-[49] flex h-12 my-16 items-top justify-center pointer-events-none"
              aria-hidden
            >
              <motion.div
                onClick={handleToastClick}
                className="pointer-events-auto bg-darkCard backdrop-blur-sm border border-primary/20 hover:border-primary/50 rounded-full px-5 py-3 shadow-xl cursor-pointe transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} delay={i * 0.1} size={16} />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-primary">
                    See Reviews
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>

      {/* Fullscreen Modal (via portal) */}
      <AnimatePresence>
        {showModal && (
          <Portal>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[2147483647] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={closeModal}
              role="dialog"
              aria-modal="true"
              aria-label="Customer Reviews"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{
                  type: 'spring',
                  damping: 25,
                  stiffness: 300,
                }}
                className="bg-darkCard/70 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="sticky top-0 bg-darkCard border-b border-primary/20 p-6 z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-accent">
                        Customer Reviews
                      </h2>
                      <div className="flex items-center gap-2 mt-2">
                        <ReviewStars rating={5} size={20} />
                        <span className="text-textLight/70font-medium">
                          {reviews.length} reviews
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="light"
                      onPress={closeModal}
                      className="text-textLight/70 hover:text-textLight/90 p-2"
                      aria-label="Close reviews"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                  {loading ? (
                    <div className="flex items-center justify-center py-20">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
                    </div>
                  ) : reviews.length === 0 ? (
                    <div className="text-center py-20">
                      <p className="text-textLight">
                        No reviews found
                      </p>
                    </div>
                  ) : (
                    <div className="p-6 space-y-6">
                      {reviews.map((review, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-darkCard/70 rounded-xl p-6 hover:bg-darkCard transition-colors duration-200"
                        >
                          <div className="flex items-start gap-4">
                            {/* Review Content */}
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-subheading text-primary">
                                  {review.name}
                                </h3>
                                <ReviewStars
                                  rating={review.rating}
                                  size={16}
                                />
                              </div>

                              {review.title && (
                                <h4 className="font-medium text-textLight mb-2">
                                  {review.title}
                                </h4>
                              )}

                              <p className="text-textLight leading-relaxed">
                                {review.description}
                              </p>

                              {review.date && (
                                <p className="text-sm text-textLight/70 mt-3">
                                  {new Date(
                                    review.date
                                  ).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                  })}
                                </p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
};

export default ReviewPopup;
