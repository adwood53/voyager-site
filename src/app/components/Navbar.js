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
import { usePathname, useRouter } from 'next/navigation';

export default function VoyagerNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';

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

  // Handle navigation for both home and non-home pages
  const handleNavigation = (sectionId) => {
    if (isHomePage) {
      // If we're on home page, just scroll to the section
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Store the target section in sessionStorage for retrieval after navigation
      sessionStorage.setItem('scrollToSection', sectionId);
      // Navigate to the home page (using plain href to avoid chunk loading issues)
      window.location.href = '/';
    }
  };

  // Check if we need to scroll to a section after navigation
  useEffect(() => {
    if (isHomePage) {
      const targetSection = sessionStorage.getItem('scrollToSection');
      if (targetSection) {
        // Wait for the page to fully render
        setTimeout(() => {
          const section = document.getElementById(targetSection);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
          // Clear the stored section to prevent scrolling on subsequent page loads
          sessionStorage.removeItem('scrollToSection');
        }, 100);
      }
    }
  }, [isHomePage]);

  return (
    <>
      {/* Fixed Navbar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 left-0 w-full z-50"
      >
        <Navbar
          isBordered={false}
          className={`w-full transition-all duration-500 ${
            scrolled
              ? 'bg-darkBg bg-opacity-90 backdrop-blur-md shadow-md'
              : 'bg-transparent'
          }`}
        >
          {/* MOBILE LAYOUT (<1024px) */}
          <div className="lg:hidden w-full">
            {/* Top Row: Logo (left) & Buttons (right) */}
            <div className="flex justify-between items-center px-4 py-2 w-full">
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
                    className="rounded-md"
                    priority
                  />
                  <div className="font-heading text-2xl font-bold">
                    <span className="text-primary">VOYAGER</span>
                  </div>
                </Link>
              </NavbarBrand>
              <div className="flex items-center gap-2">
                <NavbarItem
                  className="list-none"
                  style={{ listStyle: 'none' }}
                >
                  <Button
                    as={Link}
                    href="/partner"
                    className="text-primary font-medium px-3 py-1 text-sm hover:text-accent transition-all duration-300"
                  >
                    Login!
                  </Button>
                </NavbarItem>
                <NavbarItem
                  className="list-none"
                  style={{ listStyle: 'none' }}
                >
                  <a
                    href="#"
                    onPress={(e) => {
                      e.preventDefault();
                      if (isHomePage) {
                        // If we're on home page, just scroll to the section
                        const section =
                          document.getElementById('signup');
                        if (section) {
                          section.scrollIntoView({
                            behavior: 'smooth',
                          });
                        }
                      } else {
                        // Store the target section in sessionStorage for retrieval after navigation
                        sessionStorage.setItem(
                          'scrollToSection',
                          'signup'
                        );
                        // Navigate to the home page (using plain href to avoid chunk loading issues)
                        window.location.href = '/';
                      }
                    }}
                    className="bg-primary text-textLight font-medium px-3 py-1 text-sm rounded-md hover:bg-accent transition-all duration-300 inline-block"
                  >
                    Join!
                  </a>
                </NavbarItem>
              </div>
            </div>
            {/* Bottom Row: Navigation Links */}
            <div className="flex justify-center border-t border-gray-700 px-4 py-2">
              <div className="flex gap-4">
                <NavbarItem
                  className="list-none"
                  style={{ listStyle: 'none' }}
                >
                  <Link
                    href="/about-us"
                    className="text-textLight hover:text-primary transition-colors text-base font-medium"
                  >
                    About
                  </Link>
                </NavbarItem>
                <NavbarItem
                  className="list-none"
                  style={{ listStyle: 'none' }}
                >
                  <Link
                    onPress={(e) => {
                      e.preventDefault();
                      handleNavigation('benefits');
                    }}
                    href="/#benefits"
                    className="text-textLight hover:text-primary transition-colors text-base font-medium"
                  >
                    Benefits
                  </Link>
                </NavbarItem>
                <NavbarItem
                  className="list-none"
                  style={{ listStyle: 'none' }}
                >
                  <Link
                    onPress={(e) => {
                      e.preventDefault();
                      handleNavigation('services');
                    }}
                    href="/#services"
                    className="text-textLight hover:text-primary transition-colors text-base font-medium"
                  >
                    Services
                  </Link>
                </NavbarItem>
                <NavbarItem
                  className="list-none"
                  style={{ listStyle: 'none' }}
                >
                  <Link
                    onPress={(e) => {
                      e.preventDefault();
                      handleNavigation('studio');
                    }}
                    href="/#studio"
                    className="text-textLight hover:text-primary transition-colors text-base font-medium"
                  >
                    Studio
                  </Link>
                </NavbarItem>
                <NavbarItem
                  className="list-none"
                  style={{ listStyle: 'none' }}
                >
                  <Link
                    onPress={(e) => {
                      e.preventDefault();
                      handleNavigation('plans');
                    }}
                    href="/#plans"
                    className="text-textLight hover:text-primary transition-colors text-base font-medium"
                  >
                    Plans
                  </Link>
                </NavbarItem>
                <NavbarItem
                  className="list-none"
                  style={{ listStyle: 'none' }}
                >
                  <Link
                    href="/blog"
                    className="text-textLight hover:text-primary transition-colors text-base font-medium"
                  >
                    Blog
                  </Link>
                </NavbarItem>
              </div>
            </div>
          </div>

          {/* DESKTOP LAYOUT (>=1024px) */}
          <div className="hidden lg:grid grid-cols-3 items-center w-full px-6 py-2">
            {/* Left: Logo */}
            <div className="flex items-center">
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
                    className="rounded-md"
                  />
                  <div className="font-heading text-2xl font-bold">
                    <span className="text-primary">VOYAGER</span>
                  </div>
                </Link>
              </NavbarBrand>
            </div>
            {/* Center: Navigation Links */}
            <div className="flex justify-center">
              <div className="flex gap-8">
                <NavbarItem
                  className="list-none"
                  style={{ listStyle: 'none' }}
                >
                  <Link
                    href="/about-us"
                    className="text-textLight hover:text-primary transition-colors text-lg font-medium"
                  >
                    About
                  </Link>
                </NavbarItem>
                <NavbarItem
                  className="list-none"
                  style={{ listStyle: 'none' }}
                >
                  <Link
                    onPress={(e) => {
                      e.preventDefault();
                      handleNavigation('benefits');
                    }}
                    href="/#benefits"
                    className="text-textLight hover:text-primary transition-colors text-lg font-medium"
                  >
                    Benefits
                  </Link>
                </NavbarItem>
                <NavbarItem
                  className="list-none"
                  style={{ listStyle: 'none' }}
                >
                  <Link
                    onPress={(e) => {
                      e.preventDefault();
                      handleNavigation('services');
                    }}
                    href="/#services"
                    className="text-textLight hover:text-primary transition-colors text-lg font-medium"
                  >
                    Services
                  </Link>
                </NavbarItem>
                <NavbarItem
                  className="list-none"
                  style={{ listStyle: 'none' }}
                >
                  <Link
                    onPress={(e) => {
                      e.preventDefault();
                      handleNavigation('studio');
                    }}
                    href="/#studio"
                    className="text-textLight hover:text-primary transition-colors text-lg font-medium"
                  >
                    Studio
                  </Link>
                </NavbarItem>
                <NavbarItem
                  className="list-none"
                  style={{ listStyle: 'none' }}
                >
                  <Link
                    onPress={(e) => {
                      e.preventDefault();
                      handleNavigation('plans');
                    }}
                    href="/#plans"
                    className="text-textLight hover:text-primary transition-colors text-lg font-medium"
                  >
                    Plans
                  </Link>
                </NavbarItem>
                <NavbarItem
                  className="list-none"
                  style={{ listStyle: 'none' }}
                >
                  <Link
                    href="/blog"
                    className="text-textLight hover:text-primary transition-colors text-lg font-medium"
                  >
                    Blog
                  </Link>
                </NavbarItem>
              </div>
            </div>
            {/* Right: Buttons */}
            <div className="flex justify-end">
              <div className="flex items-center gap-4">
                <NavbarItem
                  className="list-none"
                  style={{ listStyle: 'none' }}
                >
                  <Button
                    as={Link}
                    href="/partner"
                    className="text-primary font-medium px-6 py-2 hover:text-accent transition-all duration-300"
                  >
                    Partner Login
                  </Button>
                </NavbarItem>
                <NavbarItem
                  className="list-none"
                  style={{ listStyle: 'none' }}
                >
                  <a
                    href="#"
                    onPress={(e) => {
                      e.preventDefault();
                      if (isHomePage) {
                        // If we're on home page, just scroll to the section
                        const section =
                          document.getElementById('signup');
                        if (section) {
                          section.scrollIntoView({
                            behavior: 'smooth',
                          });
                        }
                      } else {
                        // Store the target section in sessionStorage for retrieval after navigation
                        sessionStorage.setItem(
                          'scrollToSection',
                          'signup'
                        );
                        // Navigate to the home page (using plain href to avoid chunk loading issues)
                        window.location.href = '/';
                      }
                    }}
                    className="bg-primary text-textLight font-medium px-6 py-2 rounded-md hover:bg-accent transition-all duration-300 inline-block"
                  >
                    Join For Free
                  </a>
                </NavbarItem>
              </div>
            </div>
          </div>
        </Navbar>
      </motion.div>

      {/* Spacer to push page content below the navbar */}
      <div className="block lg:hidden h-24"></div>
      <div className="hidden lg:block h-16"></div>
    </>
  );
}
