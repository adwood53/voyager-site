'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ScrollNavigation() {
  const [activeSection, setActiveSection] = useState(0);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    // Get all section containers to track them
    const allSections = Array.from(
      document.querySelectorAll('.section-container')
    );
    setSections(allSections);

    const handleScroll = () => {
      const scrollContainer =
        document.querySelector('.snap-container');
      if (!scrollContainer) return;

      const scrollPosition =
        scrollContainer.scrollTop + window.innerHeight / 3;

      for (let i = 0; i < allSections.length; i++) {
        const section = allSections[i];
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionBottom
        ) {
          setActiveSection(i);
          break;
        }
      }
    };

    const scrollContainer = document.querySelector('.snap-container');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll(); // Initialize on load
    }

    return () => {
      const scrollContainer =
        document.querySelector('.snap-container');
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollTo = (direction) => {
    let targetIndex;

    if (direction === 'up') {
      targetIndex = Math.max(0, activeSection - 1);
    } else {
      targetIndex = Math.min(sections.length - 1, activeSection + 1);
    }

    if (sections[targetIndex]) {
      const targetSection = sections[targetIndex];
      const scrollContainer =
        document.querySelector('.snap-container');

      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: targetSection.offsetTop,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <div className="scroll-nav">
      <motion.div
        className="scroll-arrow up"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => scrollTo('up')}
        initial={{ opacity: 0.6 }}
        animate={{
          opacity: activeSection > 0 ? 1 : 0.3,
          y: [0, -5, 0],
        }}
        transition={{
          opacity: { duration: 0.2 },
          y: { repeat: Infinity, duration: 2, repeatType: 'reverse' },
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
      </motion.div>

      <motion.div
        className="scroll-arrow down"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => scrollTo('down')}
        initial={{ opacity: 0.6 }}
        animate={{
          opacity: activeSection < sections.length - 1 ? 1 : 0.3,
          y: [0, 5, 0],
        }}
        transition={{
          opacity: { duration: 0.2 },
          y: { repeat: Infinity, duration: 2, repeatType: 'reverse' },
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </motion.div>
    </div>
  );
}
