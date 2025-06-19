'use client';

import { Card, CardBody, Button, Link, Chip } from '@heroui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import FlexGrid from '../FlexGrid';

export default function ProductsSection() {
  const sectionRef = useRef(null);
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

  const products = [
    {
      name: 'Hoodies',
      icon: '👕',
      category: 'Apparel',
    },
    {
      name: 'T-Shirts',
      icon: '👔',
      category: 'Apparel',
    },
    {
      name: 'Mugs',
      icon: '☕',
      category: 'Drinkware',
    },
    {
      name: 'Mousemats',
      icon: '🖱️',
      category: 'Tech',
    },
    {
      name: 'Vinyls',
      icon: '🎵',
      category: 'Media',
    },
    {
      name: 'V-Cards',
      icon: '💳',
      category: 'Business',
    },
    {
      name: 'Roller Banners',
      icon: '🖼️',
      category: 'Marketing',
    },
    {
      name: 'Notebooks',
      icon: '📔',
      category: 'Stationery',
    },
    {
      name: 'Posters',
      icon: '🎨',
      category: 'Marketing',
    },
    {
      name: 'Fliers',
      icon: '📄',
      category: 'Marketing',
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
            className="text-lg text-textLight opacity-80 max-w-3xl mx-auto"
          >
            We can embed NFC tech into almost anything. Our current
            product range includes:
          </motion.p>
        </div>

        {/* Products Grid */}
        <FlexGrid
          columns={{ sm: 2, md: 3, lg: 5 }}
          gap="6"
          animate={true}
          container={container}
          item={item}
          equalHeight={true}
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -5,
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              className="h-full"
            >
              <Card className="card-voyager h-full bg-darkCard border border-primary border-opacity-20 hover:border-opacity-50 transition-all duration-300 hover:shadow-glow-sm group cursor-pointer">
                <CardBody className="h-full flex flex-col items-center text-center p-6">
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
            </motion.div>
          ))}
        </FlexGrid>

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
                as={Link}
                href="#signup"
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
