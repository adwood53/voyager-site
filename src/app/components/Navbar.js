'use client';

import { useState, useEffect } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
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
      const isScrolled = window.scrollY > 10;
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
        isBordered={scrolled}
        className={`w-full transition-all duration-500 ${
          scrolled
            ? 'bg-darkBg bg-opacity-90 backdrop-blur-md shadow-md'
            : 'bg-transparent'
        }`}
        maxWidth="2xl"
      >
        <NavbarBrand className="flex-grow-0">
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

        <NavbarContent
          className="hidden sm:flex flex-grow justify-center gap-8"
          justify="center"
        >
          <NavbarItem>
            <Link
              href="#benefits"
              className="text-textLight hover:text-primary transition-colors text-lg font-medium"
            >
              Benefits
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href="#services"
              className="text-textLight hover:text-primary transition-colors text-lg font-medium"
            >
              Services
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href="#studio"
              className="text-textLight hover:text-primary transition-colors text-lg font-medium"
            >
              Studio
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href="#plans"
              className="text-textLight hover:text-primary transition-colors text-lg font-medium"
            >
              Plans
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end" className="flex-grow-0">
          <NavbarItem>
            <Button
              as={Link}
              href="#signup"
              className="bg-primary text-textLight font-medium px-6 py-3 rounded-md hover:bg-accent transition-all duration-300 hover:scale-105 transform hover:shadow-glow"
            >
              Join For Free
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </motion.div>
  );
}
