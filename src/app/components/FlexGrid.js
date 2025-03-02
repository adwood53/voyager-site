'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * FlexGrid - A simple grid component that centers the last row when it has fewer items
 * than the maximum column count, while maintaining consistent tile sizes and heights
 */
export default function FlexGrid({
  children,
  columns = { sm: 1, md: 2, lg: 3 },
  gap = '8',
  className = '',
  animate = false,
  equalHeight = true, // Add this prop to control equal height behavior
  container = {},
  item = {},
}) {
  const childrenArray = React.Children.toArray(children);
  const childCount = childrenArray.length;

  // Calculate items in the last row
  const lgColumns = columns.lg || 3;
  const mdColumns = columns.md || 2;
  const smColumns = columns.sm || 1;

  const lgLastRowItems = childCount % lgColumns || lgColumns;
  const mdLastRowItems = childCount % mdColumns || mdColumns;
  const smLastRowItems = childCount % smColumns || smColumns;

  // Default animation variants
  const defaultContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const defaultItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Use provided variants or defaults
  const containerVariants =
    Object.keys(container).length > 0 ? container : defaultContainer;
  const itemVariants =
    Object.keys(item).length > 0 ? item : defaultItem;

  // CSS for centering the last row
  const shouldCenterLg = lgLastRowItems < lgColumns;
  const shouldCenterMd = mdLastRowItems < mdColumns;
  const shouldCenterSm = smLastRowItems < smColumns;

  return (
    <div className={className}>
      <style jsx global>{`
        .flex-grid-container {
          display: flex;
          flex-wrap: wrap;
          margin: -${parseInt(gap) * 0.125}rem;
        }

        .flex-grid-item {
          padding: ${parseInt(gap) * 0.125}rem;
          width: ${100 / smColumns}%;
          ${equalHeight ? 'display: flex;' : ''}
        }

        .flex-grid-item > * {
          ${equalHeight ? 'width: 100%;' : ''}
        }

        @media (min-width: 768px) {
          .flex-grid-item {
            width: ${100 / mdColumns}%;
          }
        }

        @media (min-width: 1024px) {
          .flex-grid-item {
            width: ${100 / lgColumns}%;
          }
        }

        /* Last row centering - the key part */
        @media (min-width: 1024px) {
          .flex-grid-container {
            ${shouldCenterLg ? 'justify-content: center;' : ''}
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .flex-grid-container {
            ${shouldCenterMd ? 'justify-content: center;' : ''}
          }
        }

        @media (max-width: 767px) {
          .flex-grid-container {
            ${shouldCenterSm ? 'justify-content: center;' : ''}
          }
        }
      `}</style>

      <motion.div
        className="flex-grid-container"
        variants={animate ? containerVariants : undefined}
        initial={animate ? 'hidden' : undefined}
        whileInView={animate ? 'show' : undefined}
        viewport={animate ? { once: true } : undefined}
      >
        {animate
          ? childrenArray.map((child, index) => (
              <motion.div
                key={index}
                className="flex-grid-item"
                variants={itemVariants}
              >
                {child}
              </motion.div>
            ))
          : childrenArray.map((child, index) => (
              <div key={index} className="flex-grid-item">
                {child}
              </div>
            ))}
      </motion.div>
    </div>
  );
}
