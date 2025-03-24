// src/app/components/LanguageToggle.js
'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * LanguageToggle - A custom toggle switch component that allows switching between creative and professional language
 * @param {Object} props
 * @param {boolean} props.isProfessional - Current state of the toggle
 * @param {Function} props.onChange - Callback when toggle changes, passes the new mode (true = professional)
 */
export default function LanguageToggle({ isProfessional, onChange }) {
  // When toggle changes, call onChange callback
  const handleToggle = () => {
    if (onChange) {
      onChange(!isProfessional);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center gap-3 p-3 bg-darkCard/50 backdrop-blur-sm border border-primary border-opacity-20 rounded-full shadow-glow-sm mx-auto mb-8 w-fit"
    >
      <span
        className={`text-sm font-medium transition-colors ${!isProfessional ? 'text-primary' : 'text-textLight opacity-70'}`}
      >
        Creative
      </span>

      {/* Custom toggle switch implementation */}
      <button
        onClick={handleToggle}
        className="relative h-6 w-12 rounded-full flex items-center p-1 cursor-pointer transition-colors duration-300"
        style={{
          backgroundColor: isProfessional
            ? 'var(--primary)'
            : 'var(--dark-card)',
          border: '1px solid rgba(231, 144, 35, 0.3)',
        }}
        aria-label="Toggle language mode"
        role="switch"
        aria-checked={isProfessional}
      >
        <div
          className="h-4 w-4 rounded-full bg-textLight shadow-md transform transition-transform duration-300"
          style={{
            transform: isProfessional
              ? 'translateX(100%)'
              : 'translateX(0)',
          }}
        />
      </button>

      <span
        className={`text-sm font-medium transition-colors ${isProfessional ? 'text-primary' : 'text-textLight opacity-70'}`}
      >
        Professional
      </span>
    </motion.div>
  );
}
