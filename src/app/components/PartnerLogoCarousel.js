'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

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
  const positionRef = useRef(0);
  const velocityRef = useRef(1);
  const lastTimeRef = useRef(0);
  const isHoveredRef = useRef(false);
  const totalScrollDistanceRef = useRef(0);

  // Initialize background cubes
  useEffect(() => {
    if (!backgroundRef.current) return;

    // Clear existing cubes
    while (backgroundRef.current.firstChild) {
      backgroundRef.current.removeChild(
        backgroundRef.current.firstChild
      );
    }

    // Create new background cubes with random properties
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
      const useAltColor = Math.random() > 0.5;
      const color = useAltColor
        ? 'var(--alt-primary)'
        : 'var(--primary)';

      // Style the cube
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

      // Store animation data
      cube.dataset.speed = Math.random() * 0.125 + 0.125; // 0.125-0.25
      cube.dataset.posX = posX;

      backgroundRef.current.appendChild(cube);
      cubes.push(cube);
    }

    cubesRef.current = cubes;

    // Start background animation
    animateBackgroundCubes();

    return () => {
      if (bgAnimationRef.current) {
        cancelAnimationFrame(bgAnimationRef.current);
      }
    };
  }, []);

  // Initialize and manage logo carousel elements
  useEffect(() => {
    function createCarouselItems() {
      if (!logoContainerRef.current || partners.length === 0) return;

      const container = logoContainerRef.current;

      // Clear existing logos
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      // Create enough duplicate sets to ensure continuous scrolling
      // Using a dynamic approach based on viewport width
      const viewportWidth = window.innerWidth;
      const logoWidth = 250; // Approximate width of each logo item
      const singleSetWidth = logoWidth * partners.length;

      // Calculate how many complete sets we need to fill 3x viewport
      const setsNeeded =
        Math.ceil((viewportWidth * 3) / singleSetWidth) + 1;

      // Create multiple copies of partners array based on calculated need
      const extendedPartners = Array(setsNeeded)
        .fill(partners)
        .flat();

      // Create logos
      extendedPartners.forEach((partner, index) => {
        const item = document.createElement('div');
        item.className = 'logo-item px-6 inline-block';
        item.style.overflow = 'visible';
        item.style.transform = 'translate3d(0,0,0)';
        item.dataset.index = index % partners.length;
        item.dataset.setIndex = Math.floor(index / partners.length);

        item.innerHTML = `
          <div class="inline-block relative" style="overflow: visible;">
            <div class="relative h-20 w-56 md:h-24 md:w-64" style="overflow: visible;">
              <img 
                src="${partner.logo || '/Voyager-Box-Logo.png'}" 
                alt="${partner.name || 'Partner logo'}"
                class="w-full h-full object-contain transition-all duration-300"
                style="filter: grayscale(1); opacity: 0.6; transform-origin: center; transform: scale(1); will-change: transform, filter, opacity;"
              />
            </div>
          </div>
        `;

        // Add click handler for partner URL
        item.addEventListener('click', () => {
          if (partner.url) {
            window.open(partner.url, '_blank', 'noopener,noreferrer');
          }
        });

        // Add hover handlers with better state management
        item.addEventListener('mouseenter', () => {
          isHoveredRef.current = true;
          setActiveIndex(index % partners.length);

          const img = item.querySelector('img');
          if (img) {
            img.style.filter = 'grayscale(0)';
            img.style.opacity = '1';
            img.style.transform = 'scale(1.15)';
          }
        });

        item.addEventListener('mouseleave', () => {
          isHoveredRef.current = false;
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

      // Reset scroll position counters
      positionRef.current = 0;
      totalScrollDistanceRef.current = 0;
    }

    // Create initial carousel items
    createCarouselItems();

    // Handle window resize for responsive implementation
    const handleResize = () => {
      // Recreate carousel items on resize to ensure enough content
      createCarouselItems();
    };

    window.addEventListener('resize', handleResize);

    // Start carousel animation
    animateLogoCarousel();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [partners]);

  // Background animation function
  const animateBackgroundCubes = () => {
    if (!backgroundRef.current) return;

    const animate = () => {
      cubesRef.current.forEach((cube) => {
        // Move cube from left to right
        let x = parseFloat(cube.dataset.posX);
        const speed = parseFloat(cube.dataset.speed);

        x += speed;

        // Reset position when out of view
        if (x > 100) {
          x = -10;
        }

        cube.style.left = `${x}%`;
        cube.dataset.posX = x;
      });

      bgAnimationRef.current = requestAnimationFrame(animate);
    };

    bgAnimationRef.current = requestAnimationFrame(animate);
  };

  // Dynamic logo carousel animation with on-demand content addition
  const animateLogoCarousel = () => {
    if (!logoContainerRef.current || !partners.length) return;

    const container = logoContainerRef.current;
    const logoWidth = 250; // Approximate width of a logo item
    const singleSetWidth = logoWidth * partners.length;

    const animate = (timestamp) => {
      // Initialize lastTimeRef on first run
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      // Handle animation speed based on hover state
      if (isHoveredRef.current) {
        // When hovering, quickly but smoothly slow to a stop
        velocityRef.current *= 0.9; // Exponential deceleration for smoothness
        if (velocityRef.current < 0.01) velocityRef.current = 0;
      } else {
        // When not hovering, smoothly accelerate back to normal speed
        if (velocityRef.current < 1) {
          velocityRef.current += 0.003; // Very gradual acceleration
          if (velocityRef.current > 1) velocityRef.current = 1;
        }
      }

      // Calculate movement based on time and velocity
      const pixelsPerSecond = 50; // Base speed
      const movement =
        ((pixelsPerSecond * deltaTime) / 1000) * velocityRef.current;

      // Update position
      positionRef.current -= movement;
      totalScrollDistanceRef.current += movement;

      // KEY SOLUTION: Check if we need to add more partners
      // If we've scrolled more than one set width, check if we need to add more logos
      if (totalScrollDistanceRef.current >= singleSetWidth) {
        // Reset the counter
        totalScrollDistanceRef.current = 0;

        // Check if we need to add more logos
        const lastItem = container.lastChild;

        if (lastItem) {
          const setIndex =
            parseInt(lastItem.dataset.setIndex, 10) || 0;

          // Add another set of logos if needed
          if (setIndex < 10) {
            // Limit to 10 sets to prevent memory issues
            partners.forEach((partner, index) => {
              const item = document.createElement('div');
              item.className = 'logo-item px-6 inline-block';
              item.style.overflow = 'visible';
              item.style.transform = 'translate3d(0,0,0)';
              item.dataset.index = index % partners.length;
              item.dataset.setIndex = setIndex + 1;

              item.innerHTML = `
                <div class="inline-block relative" style="overflow: visible;">
                  <div class="relative h-20 w-56 md:h-24 md:w-64" style="overflow: visible;">
                    <img 
                      src="${partner.logo || '/Voyager-Box-Logo.png'}" 
                      alt="${partner.name || 'Partner logo'}"
                      class="w-full h-full object-contain transition-all duration-300"
                      style="filter: grayscale(1); opacity: 0.6; transform-origin: center; transform: scale(1); will-change: transform, filter, opacity;"
                    />
                  </div>
                </div>
              `;

              // Add event handlers (same as before)
              item.addEventListener('click', () => {
                if (partner.url) {
                  window.open(
                    partner.url,
                    '_blank',
                    'noopener,noreferrer'
                  );
                }
              });

              item.addEventListener('mouseenter', () => {
                isHoveredRef.current = true;
                setActiveIndex(index % partners.length);

                const img = item.querySelector('img');
                if (img) {
                  img.style.filter = 'grayscale(0)';
                  img.style.opacity = '1';
                  img.style.transform = 'scale(1.15)';
                }
              });

              item.addEventListener('mouseleave', () => {
                isHoveredRef.current = false;
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
          }
        }

        // Remove offscreen items to prevent excessive DOM nodes
        while (container.children.length > partners.length * 10) {
          container.removeChild(container.firstChild);
        }
      }

      // Apply transform with GPU acceleration
      container.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  };

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

      {/* Logo carousel - improved container structure */}
      <div
        className="relative w-full mt-6"
        ref={logoWrapperRef}
        style={{ overflow: 'visible' }}
      >
        <div
          className="mx-auto max-w-full"
          style={{ overflow: 'visible' }}
        >
          <div
            ref={logoContainerRef}
            className="inline-flex items-center"
            style={{
              whiteSpace: 'nowrap',
              transform: 'translate3d(0, 0, 0)',
              willChange: 'transform',
              overflow: 'visible',
            }}
          />
        </div>
      </div>
    </div>
  );
}
