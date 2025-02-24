// src/app/components/ScrollDownButton.js
'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

export default function ScrollDownButton({ targetId }) {
  const [isVisible, setIsVisible] = useState(true); // controls arrow’s visibility
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!targetId) return;

    // 1) Intersection Observer for the next section
    const nextSection = document.getElementById(targetId);
    if (!nextSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // If the next section is *fully* in view, hide the button
        if (entry.isIntersecting) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      },
      {
        root: null,
        threshold: 0.1, // adjust if needed
      }
    );

    observer.observe(nextSection);

    // Cleanup observer on unmount
    return () => {
      if (nextSection) observer.unobserve(nextSection);
    };
  }, [targetId]);

  useEffect(() => {
    // 2) Scroll listener for partial scroll
    // If user scrolls ~100px from top, fade out arrow
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    document
      .getElementById(targetId)
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="absolute bottom-4 w-full flex justify-center pointer-events-none">
      {/* pointer-events-none on parent so only the button is clickable */}
      {isVisible && (
        <button
          type="button"
          onClick={handleClick}
          className="p-2 animate-bounce pointer-events-auto transition-opacity"
        >
          <Image
            src="/icons/DownArrow.svg"
            width={24}
            height={24}
            alt="Scroll Down"
          />
        </button>
      )}
    </div>
  );
}
