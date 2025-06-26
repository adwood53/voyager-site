/**
 * @fileoverview ProductsSection component for the Voyager brands page
 *
 * This component displays an interactive grid of products that can be made immersive
 * using AR, QR codes, or NFC technology. It features flip animations on product cards
 * and includes an integrated JotForm modal for custom product quote requests.
 *
 * Features:
 * - Interactive product grid with 3D flip animations on click/hover
 * - Responsive FlexGrid layout adapting to different screen sizes
 * - Product categorization with visual chips and icons
 * - Scroll-based parallax animations using Framer Motion
 * - Custom product inquiry section with modal integration
 * - Image optimization with Next.js Image component
 * - Hover effects and smooth card transitions
 * - Modal system integration for quote requests
 *
 * @author Voyager Development Team
 * @version 1.2.1 - Fixed modal integration for quote requests
 * @since 2024
 */

'use client';

import {
  Card,
  CardBody,
  Button,
  Link,
  Chip,
  image,
} from '@heroui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import FlexGrid from '../FlexGrid';
import Image from 'next/image';
import { useModal } from '../modal/core/ModalEngine';
import { JotFormModal } from '../modal/types/ModalTypes';

export default function ProductsSection() {
  const sectionRef = useRef(null);
  const { openModal } = useModal();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [100, 0, 0, -100]
  );

  // State to track which cards are clicked/flipped
  const [flippedCards, setFlippedCards] = useState(new Set());
  // State to track hover states
  const [hoveredCard, setHoveredCard] = useState(null);

  const products = [
    {
      name: 'Mugs',
      icon: '☕',
      category: 'Drinkware',
      image: '/products/mug.webp',
    },
    {
      name: 'Bottles',
      icon: '🍼',
      category: 'Drinkware',
      image: '/products/bottle.webp',
    },
    {
      name: 'Mousemats',
      icon: '🖱️',
      category: 'Tech',
      image: '/products/mousemat.webp',
    },
    {
      name: 'Vinyls',
      icon: '🎵',
      category: 'Media',
      image: '/products/vinyl.webp',
    },
    {
      name: 'V-Cards',
      icon: '💳',
      category: 'Business',
      image: '/products/vcard.webp',
    },
    {
      name: 'Roller Banners',
      icon: '🖼️',
      category: 'Marketing',
      image: '/products/roller-banner.webp',
    },
    {
      name: 'Hoodies',
      icon: '👕',
      category: 'Apparel',
      image: '/products/hoodie.webp',
    },
    {
      name: 'T-Shirts',
      icon: '👔',
      category: 'Apparel',
      image: '/products/tshirt.webp',
    },
    {
      name: 'Notebooks',
      icon: '📔',
      category: 'Stationery',
      image: '/products/notebook.webp',
    },
    {
      name: 'Posters',
      icon: '🎨',
      category: 'Marketing',
      image: '/products/poster.webp',
    },
    {
      name: 'Fliers',
      icon: '📄',
      category: 'Marketing',
      image: '/products/flier.webp',
    },
    {
      name: 'Bundles',
      icon: '📦',
      category: 'Marketing',
      image: '/products/bundle.webp',
    },
  ];

  const categoryColors = {
    Apparel: 'primary',
    Drinkware: 'success',
    Tech: 'secondary',
    Media: 'warning',
    Business: 'danger',
    Marketing: 'default',
    Stationery: 'primary',
  };

  /**
   * Handles card click/touch events
   * Toggles the flipped state for the clicked card
   */
  const handleCardClick = (index) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  /**
   * Handles mouse enter events for hover effects
   * Only applies hover if card is not in clicked/flipped state
   */
  const handleMouseEnter = (index) => {
    if (!flippedCards.has(index)) {
      setHoveredCard(index);
    }
  };

  /**
   * Handles mouse leave events
   */
  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  /**
   * Determines if a card should show its back side
   * Prioritizes click state over hover state
   */
  const isFlipped = (index) => {
    return flippedCards.has(index) || hoveredCard === index;
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <section
      id="products"
      ref={sectionRef}
      className="py-24 bg-darkBg relative"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-64 h-64 bg-altPrimary rounded-full filter blur-3xl opacity-8"
          animate={{
            scale: [1, 1.3, 1],
            y: [0, 50, 0],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>

      <motion.div
        className="container-voyager relative z-10"
        style={{ opacity, y }}
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="heading-voyager text-4xl md:text-5xl text-textLight mb-6"
          >
            Shop <span className="text-primary">NFC-Enabled</span>{' '}
            Products
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-textLight opacity-80 max-w-3xl mx-auto mb-4"
          >
            We can embed NFC tech into almost anything. Our current
            product range includes:
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-sm text-primary max-w-2xl mx-auto"
          >
            Hover to preview details • Click to pin the view
          </motion.p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={index}
              whileHover={
                !flippedCards.has(index) ? { y: -5, scale: 1.02 } : {}
              }
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {/* Flip Card Container - Following W3Schools Pattern */}
              <div
                className="flip-card w-full aspect-square cursor-pointer"
                style={{
                  backgroundColor: 'transparent',
                  perspective: '1000px',
                }}
                onClick={() => handleCardClick(index)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                role="button"
                tabIndex={0}
                aria-label={`${product.name} product card. ${isFlipped(index) ? 'Showing product image.' : 'Click to see product image.'}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(index);
                  }
                }}
              >
                <div
                  className="flip-card-inner w-full h-full text-center"
                  style={{
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    transform: isFlipped(index)
                      ? 'rotateY(180deg)'
                      : 'rotateY(0deg)',
                    transition: 'transform 1.2s ease-in-out',
                  }}
                >
                  {/* Front Side */}
                  <div
                    className="flip-card-front absolute w-full h-full"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    <Card className="card-voyager w-full h-full bg-darkCard border border-primary border-opacity-20 hover:border-opacity-50 transition-all duration-300 hover:shadow-glow-sm group">
                      <CardBody className="h-full flex flex-col items-center text-center p-6 justify-center">
                        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                          {product.icon}
                        </div>
                        <h3 className="font-subheading text-lg text-textLight mb-2">
                          {product.name}
                        </h3>
                        <Chip
                          size="sm"
                          variant="flat"
                          color={categoryColors[product.category]}
                          className="text-xs"
                        >
                          {product.category}
                        </Chip>
                      </CardBody>
                    </Card>
                  </div>

                  {/* Back Side */}
                  <div
                    className="flip-card-back absolute w-full h-full"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <Card className="card-voyager w-full h-full bg-darkCard border border-primary border-opacity-50 shadow-glow-sm overflow-hidden">
                      <CardBody className="h-full p-0 relative">
                        <Image
                          src={`${product.image || '/images/placeholder.jpg'}`}
                          alt={`${product.name} product image`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                        />
                        {/* Optional overlay with product name */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-4">
                          <h4 className="text-textLight font-semibold text-sm">
                            {product.name}
                          </h4>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Product CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="card-voyager bg-gradient-to-r from-primary/10 to-altPrimary/10 border border-primary border-opacity-30 max-w-2xl mx-auto">
            <CardBody className="p-8">
              <h3 className="text-2xl font-heading text-primary mb-4">
                Got a product in mind?
              </h3>
              <p className="text-textLight opacity-80 mb-6">
                Let us know - we can probably make it immersive.
              </p>
              <Button
                onPress={() =>
                  openModal(JotFormModal, {
                    isOpen: true,
                    formId: '251762903523052',
                    title: 'Get Custom Quote',
                    onSubmit: (data) => {
                      console.log(
                        'Custom product form submitted:',
                        data
                      );
                    },
                  })
                }
                className="bg-primary text-textLight font-semibold px-8 py-3 rounded-md hover:bg-accent transition-all hover:scale-105 transform"
              >
                Get Custom Quote
              </Button>
            </CardBody>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}
