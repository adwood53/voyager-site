'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * PartnerLogoCarousel - Revised version with:
 * - No border or glow on hover, just scale and color
 * - Proper overflow handling for scaled logos
 * - Much smoother infinite scrolling without "jumps"
 * - Background elements at 1/4 the original speed
 *
 * @param {Object} props
 * @param {Array} props.partners - Array of partner objects with logo, name, and url
 * @param {string} props.background - Background color or gradient
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.title - Section title
 * @param {string} props.subtitle - Section subtitle
 */
export default function PartnerLogoCarousel({
  partners = [],
  background = 'transparent',
  className = '',
  title = 'Our Partners',
  subtitle = '',
}) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const backgroundRef = useRef(null);
  const logoContainerRef = useRef(null);
  const logoWrapperRef = useRef(null);
  const cubesRef = useRef([]);
  const animationRef = useRef(null);
  const bgAnimationRef = useRef(null);
  const lastPositionRef = useRef(0);
  const speedRef = useRef(1); // Normal speed

  // Create a pool of logos that's much larger than visible area
  // to prevent seeing any "jumps" in the carousel
  const extendedPartners = [
    ...partners,
    ...partners,
    ...partners,
    ...partners,
  ]; // 4x duplication

  // Generate random background cubes
  useEffect(() => {
    if (!backgroundRef.current) return;

    // Clear existing cubes
    while (backgroundRef.current.firstChild) {
      backgroundRef.current.removeChild(
        backgroundRef.current.firstChild
      );
    }

    // Generate new cubes
    const numCubes = 15;
    const cubes = [];

    for (let i = 0; i < numCubes; i++) {
      const cube = document.createElement('div');

      // Random properties
      const size = Math.random() * 40 + 20; // 20-60px
      const posY = Math.random() * 100; // 0-100%
      const posX = Math.random() * 100; // 0-100%
      const opacity = Math.random() * 0.2 + 0.05; // 0.05-0.25
      const rotation = Math.random() * 45; // 0-45deg

      // Alternate between primary and alt-primary colors
      const useAltColor = Math.random() > 0.5;
      const color = useAltColor
        ? 'var(--alt-primary)'
        : 'var(--primary)';

      // Apply styles
      cube.className = 'bg-cube absolute';
      cube.style.width = `${size}px`;
      cube.style.height = `${size}px`;
      cube.style.top = `${posY}%`;
      cube.style.left = `${posX}%`;
      cube.style.opacity = opacity;
      cube.style.backgroundColor = color;
      cube.style.transform = `rotate(${rotation}deg)`;
      cube.style.filter = 'blur(8px)';
      cube.style.borderRadius = '10px';
      cube.style.position = 'absolute';

      // Store initial position
      cube.dataset.speed = Math.random() * 0.125 + 0.125; // 1/4 the speed (0.125-0.25)
      cube.dataset.posX = posX;
      cube.dataset.color = color;

      backgroundRef.current.appendChild(cube);
      cubes.push(cube);
    }

    cubesRef.current = cubes;

    // Start background animation
    animateBackgroundCubes();
  }, []);

  // Initialize logo carousel
  useEffect(() => {
    if (!logoContainerRef.current || extendedPartners.length === 0)
      return;

    const container = logoContainerRef.current;

    // Clear existing logos
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // Create logos - pre-populate with many duplicates for smooth infinite scroll
    extendedPartners.forEach((partner, index) => {
      const item = document.createElement('div');
      item.className = 'logo-item px-6 inline-block overflow-visible';
      item.dataset.index = index % partners.length; // Use modulo to map back to original partner index

      // Initial data for the logo
      item.innerHTML = `
        <div class="inline-block relative overflow-visible">
          <div class="relative h-20 w-56 md:h-24 md:w-64 overflow-visible">
            <img 
              src="${partner.logo || '/Voyager-Box-Logo.png'}" 
              alt="${partner.name || 'Partner logo'}"
              class="w-full h-full object-contain grayscale opacity-60 transition-all duration-300"
              style="filter: grayscale(1); transform-origin: center;"
            />
          </div>
        </div>
      `;

      // Add click handler to navigate to partner URL
      item.addEventListener('click', () => {
        if (partner.url) {
          window.open(partner.url, '_blank', 'noopener,noreferrer');
        }
      });

      // Add hover handlers
      item.addEventListener('mouseenter', () => {
        setActiveIndex(index % partners.length);
        const img = item.querySelector('img');

        if (img) {
          img.style.filter = 'grayscale(0)';
          img.style.opacity = '1';
          img.style.transform = 'scale(1.15)';
        }
      });

      item.addEventListener('mouseleave', () => {
        setActiveIndex(-1);
        const img = item.querySelector('img');

        if (img) {
          img.style.filter = 'grayscale(1)';
          img.style.opacity = '0.6';
          img.style.transform = 'scale(1)';
        }
      });

      // Set cursor style
      item.style.cursor = 'pointer';

      container.appendChild(item);
    });

    // Start logo carousel animation
    animateLogoCarousel();
  }, [extendedPartners, partners]);

  // Animation function for background cubes
  const animateBackgroundCubes = () => {
    if (!backgroundRef.current) return;

    const animate = () => {
      cubesRef.current.forEach((cube) => {
        // Move cube from left to right
        let x = parseFloat(cube.dataset.posX);
        const speed = parseFloat(cube.dataset.speed);

        x += speed;

        // If cube goes off screen, reset to left side
        if (x > 100) {
          x = -10; // Start a bit outside the container
        }

        cube.style.left = `${x}%`;
        cube.dataset.posX = x;
      });

      bgAnimationRef.current = requestAnimationFrame(animate);
    };

    bgAnimationRef.current = requestAnimationFrame(animate);

    // Clean up animation on unmount
    return () => {
      if (bgAnimationRef.current) {
        cancelAnimationFrame(bgAnimationRef.current);
      }
    };
  };

  // Animation function for logo carousel using a different approach
  const animateLogoCarousel = () => {
    if (!logoContainerRef.current) return;

    const container = logoContainerRef.current;
    let position = lastPositionRef.current;

    // Get first logo width to use for recycling
    // Only measure this once to avoid layout thrashing
    const logoWidth = container.firstChild
      ? container.firstChild.offsetWidth
      : 200;

    const animate = () => {
      // Apply acceleration effect if coming back from hover
      if (activeIndex === -1) {
        if (speedRef.current < 1) {
          speedRef.current += 0.05; // Gradually increase speed back to normal
        } else {
          speedRef.current = 1; // Cap at normal speed
        }
      } else {
        speedRef.current = 0; // No movement when hovering
      }

      position -= speedRef.current; // Apply current speed
      lastPositionRef.current = position; // Store position for resuming

      // Apply position to container
      container.style.transform = `translateX(${position}px)`;

      // Check if first logo is out of view and needs to be recycled
      // Using a threshold of full logo width
      if (position <= -logoWidth) {
        // Instead of moving DOM elements which causes visual jumps,
        // just adjust the position back by one logo width
        // This creates the illusion of infinite scrolling
        position += logoWidth;
        lastPositionRef.current = position;
        container.style.transform = `translateX(${position}px)`;
      }

      // Continue animation
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Clean up animation on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (bgAnimationRef.current) {
        cancelAnimationFrame(bgAnimationRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`partner-carousel w-full py-12 overflow-hidden relative ${className}`}
      style={{ background }}
    >
      {/* Background cubes container */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 overflow-hidden bg-cubes-container"
      />

      {/* Gradient overlays */}
      <div
        className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, var(--dark-bg), transparent)',
        }}
      />
      <div
        className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to left, var(--dark-bg), transparent)',
        }}
      />

      {/* Section title */}
      <div className="container-voyager relative z-10">
        {title && (
          <h3 className="text-center text-xl font-medium text-textLight opacity-60 mb-4">
            {title}
          </h3>
        )}

        {subtitle && (
          <p className="text-center text-sm text-textLight opacity-40 mb-6">
            {subtitle}
          </p>
        )}
      </div>

      {/* Logo carousel container (horizontally scrolling) */}
      <div
        className="relative w-full mt-6 overflow-hidden"
        ref={logoWrapperRef}
      >
        <div className="mx-auto max-w-full overflow-hidden logo-container-wrapper">
          <div
            ref={logoContainerRef}
            className="inline-flex items-center logo-carousel-inner overflow-visible"
            style={{ whiteSpace: 'nowrap' }}
          />
        </div>
      </div>
    </div>
  );
}
