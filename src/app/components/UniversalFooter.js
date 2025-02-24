/**
 * File: src/app/components/UniversalFooter.js
 *
 * A reusable footer that can adapt to "dark" or "light" variants.
 */
'use client';

import React from 'react';

export default function UniversalFooter({ variant = 'dark' }) {
  // Decide background and text based on variant
  const bgClass =
    variant === 'dark'
      ? 'bg-darkPrimary text-textLight'
      : 'bg-lightPrimary text-darkPrimary';

  return (
    <footer
      className={`py-8 text-center transition-colors ${bgClass}`}
    >
      <p className="text-lg font-semibold mb-2">
        Empowering Communities through Social Innovation
      </p>
      <p className="max-w-xl mx-auto">
        © {new Date().getFullYear()} Social Innovation People &bull;
        All rights reserved.
      </p>

      {/* New line for the Studio link */}
      <p className="mt-3">
        <a
          href="https://social-innovation-people.vercel.app/studio"
          className="underline hover:text-accent transition-colors"
        >
          Studio
        </a>
      </p>
    </footer>
  );
}
