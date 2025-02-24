/**
 * File: src/app/components/UniversalNavbar.js
 *
 * A normal (non-fixed) navbar that sits at the top of any hero section.
 * Now uses onClick in the HeroUI button for the blog link.
 */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // For onClick navigation
import Image from 'next/image';
import { Button } from '@heroui/react';

export default function UniversalNavbar({ variant = 'dark' }) {
  const router = useRouter();

  const bgClass =
    variant === 'dark'
      ? 'bg-darkPrimary text-textLight'
      : 'bg-lightPrimary text-darkPrimary';

  function handleBlogClick() {
    // Navigate to /blog on click
    router.push('/blog');
  }

  return (
    <nav
      className={`
        w-full
        flex items-center justify-between
        px-6 py-3
        transition-colors
        ${bgClass}
      `}
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <div
          className="flex items-center hover:opacity-80 transition-opacity cursor-pointer"
          onClick={() => router.push('/')}
        >
          <Image
            src="/logo.png"
            alt="Brand Logo"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>
      </div>

      {/* Right: Example nav items */}
      <div className="flex space-x-2">
        <Image
          src="/icons/RightArrow.svg"
          alt="Arrow icon"
          width={16}
          height={16}
        />
        {/* Instead of Link, we do onClick */}
        <Button
          type="button"
          onClick={handleBlogClick}
          className="bg-darkPrimary stroke-primary text-primary hover:text-accent
                     transition-colors px-4 py-2 flex items-center gap-2 font-semibold"
        >
          Blog
        </Button>
      </div>
    </nav>
  );
}
