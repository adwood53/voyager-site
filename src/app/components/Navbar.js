'use client';

import { useState, useEffect } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  Button,
  Link,
} from '@heroui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function VoyagerNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 w-full z-50"
    >
      <Navbar
        isBordered={false}
        className={`w-full transition-all duration-500 ${
          scrolled
            ? 'bg-darkBg bg-opacity-90 backdrop-blur-md shadow-md'
            : 'bg-transparent'
        }`}
        maxWidth="2xl"
      >
        <div className="flex items-center w-full relative">
          {/* Left Brand */}
          <div className="flex-1">
            <NavbarBrand>
              <Link
                href="/"
                className="flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <Image
                  src="/Voyager-Box-Logo.png"
                  alt="Voyager Logo"
                  width={44}
                  height={44}
                  className="rounded-md glow-effect"
                />
                <div className="font-heading text-2xl font-bold">
                  <span className="text-primary">VOYAGER</span>
                </div>
              </Link>
            </NavbarBrand>
          </div>

          {/* Center Nav Links - absolutely positioned */}
          <div className="hidden sm:flex gap-8 absolute left-1/2 transform -translate-x-1/2 list-none">
            <NavbarItem className="list-none">
              <Link
                href="#benefits"
                className="text-textLight hover:text-primary transition-colors text-lg font-medium"
              >
                Benefits
              </Link>
            </NavbarItem>
            <NavbarItem className="list-none">
              <Link
                href="#services"
                className="text-textLight hover:text-primary transition-colors text-lg font-medium"
              >
                Services
              </Link>
            </NavbarItem>
            <NavbarItem className="list-none">
              <Link
                href="#studio"
                className="text-textLight hover:text-primary transition-colors text-lg font-medium"
              >
                Studio
              </Link>
            </NavbarItem>
            <NavbarItem className="list-none">
              <Link
                href="#plans"
                className="text-textLight hover:text-primary transition-colors text-lg font-medium"
              >
                Plans
              </Link>
            </NavbarItem>
          </div>

          {/* Right Buttons */}
          <div className="flex-1 flex justify-end list-none">
            <div className="flex items-center gap-4">
              <NavbarItem className="list-none">
                <Button
                  as={Link}
                  href="#"
                  className="text-primary font-medium px-6 py-2 hover:text-accent transition-all duration-300 hover:scale-105 transform"
                >
                  Partner Login
                </Button>
              </NavbarItem>
              <NavbarItem className="list-none">
                <Button
                  as={Link}
                  href="#signup"
                  className="bg-primary text-textLight font-medium px-6 py-2 rounded-md hover:bg-accent transition-all duration-300 hover:scale-105 transform hover:shadow-glow"
                >
                  Join For Free
                </Button>
              </NavbarItem>
            </div>
          </div>
        </div>
      </Navbar>
    </motion.div>
  );
}
