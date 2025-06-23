'use client';

import { useState, useEffect } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  Button,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

export default function VoyagerNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [loadingStates, setLoadingStates] = useState({
    brands: false,
    partners: false,
    how: false,
    about: false,
    blog: false,
    partnerLogin: false,
    waitlist: false,
  });
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';
  const isBrandsPage = pathname.startsWith('/for-brands');
  const isForPartnersPage = pathname.startsWith('/for-partners');

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

  // Helper function to set loading state
  const setLoading = (key, state) => {
    setLoadingStates((prev) => ({ ...prev, [key]: state }));
  };

  // Helper function for navigation with loading state
  const navigateWithLoading = async (key, path) => {
    setLoading(key, true);
    // Small delay to show loading state
    await new Promise((resolve) => setTimeout(resolve, 100));
    router.push(path);
    // Loading state will be cleared when component unmounts or route changes
  };

  // Reset loading states when pathname changes
  useEffect(() => {
    setLoadingStates({
      brands: false,
      partners: false,
      how: false,
      about: false,
      blog: false,
      partnerLogin: false,
      waitlist: false,
    });
  }, [pathname]);

  // Handle navigation to for-partners sections
  const handlePartnerNavigation = (sectionId) => {
    // Navigate to for-partners page with hash fragment
    router.push(`/for-partners#${sectionId}`);
  };

  // Handle navigation to for-brands page sections
  const handleBrandsNavigation = (sectionId) => {
    if (isBrandsPage) {
      // If we're on for-brands page, just scroll to the section
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to for-brands page with hash fragment
      router.push(`/for-brands#${sectionId}`);
    }
  };

  // Loading spinner component
  const LoadingSpinner = ({ size = 16 }) => (
    <div
      className={`border-2 border-t-transparent rounded-full animate-spin`}
      style={{
        width: size,
        height: size,
        borderColor: 'currentColor',
        borderTopColor: 'transparent',
      }}
    />
  );

  // Partners dropdown items configuration
  const partnersItems = [
    {
      key: 'benefits',
      label: 'Benefits',
      href: '/for-partners#benefits',
      description: 'Explore our white-label solutions',
    },
    {
      key: 'services',
      label: 'Services',
      href: '/for-partners#services',
      description: 'Our comprehensive service offerings',
    },
    {
      key: 'studio',
      label: 'Studio',
      href: '/for-partners#studio',
      description: 'Professional studio capabilities',
    },
    {
      key: 'plans',
      label: 'Plans',
      href: '/for-partners#plans',
      description: 'Choose the right plan for you',
    },
  ];

  // Brands dropdown items configuration
  const brandsItems = [
    {
      key: 'what-we-do',
      label: 'What We Do',
      href: '/for-brands#what-we-do',
      description: 'Discover our immersive solutions',
    },
    {
      key: 'products',
      label: 'Products',
      href: '/for-brands#products',
      description: 'Explore our product offerings',
    },
    {
      key: 'experiences',
      label: 'Experiences',
      href: '/for-brands#experiences',
      description: 'See our immersive experiences',
    },
    {
      key: 'why-voyager',
      label: 'Why Voyager',
      href: '/for-brands#why-voyager',
      description: 'Learn what makes us different',
    },
    {
      key: 'faq',
      label: 'FAQ',
      href: '/for-brands#faq',
      description: 'Get answers to common questions',
    },
    {
      key: 'signup',
      label: 'Contact',
      href: '/for-brands#signup',
      description: 'Get in touch with our team',
    },
  ];

  // DRY principle: Create reusable navigation components
  const NavLink = ({
    href,
    children,
    className,
    onPress,
    isActive = false,
    loadingKey,
  }) => {
    const isLoading = loadingStates[loadingKey];

    return (
      <Button
        as={Link}
        href={href}
        onPress={async (e) => {
          if (onPress) {
            onPress(e);
          } else if (loadingKey && href) {
            e.preventDefault();
            await navigateWithLoading(loadingKey, href);
          }
        }}
        variant="light"
        className={`text-textLight hover:text-primary transition-colors font-medium p-0 min-w-0 h-auto bg-transparent ${className} ${
          isActive ? 'text-primary' : ''
        }`}
        isDisabled={isLoading}
        startContent={isLoading ? <LoadingSpinner size={14} /> : null}
      >
        {children}
      </Button>
    );
  };

  const BrandsDropdown = ({ isMobile = false }) => {
    const isLoading = loadingStates.brands;

    // If not on for-brands page, show simple navigation button
    if (!isBrandsPage) {
      return (
        <Button
          variant="light"
          className={`text-textLight hover:text-primary transition-colors font-medium p-0 min-w-0 h-auto bg-transparent ${isMobile ? 'text-base' : 'text-lg'}`}
          onPress={() => navigateWithLoading('brands', '/for-brands')}
          isDisabled={isLoading}
          startContent={
            isLoading ? <LoadingSpinner size={14} /> : null
          }
        >
          Brands
        </Button>
      );
    }

    // If on for-brands page, show dropdown with sections
    return (
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="light"
            className={`text-primary hover:text-accent transition-colors font-medium p-0 min-w-0 h-auto bg-transparent ${isMobile ? 'text-base' : 'text-lg'}`}
            endContent={
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            }
          >
            Brands
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Brands menu"
          className="w-80"
          itemClasses={{
            base: 'gap-4',
            title: 'text-textLight',
            description: 'text-textLight opacity-60',
          }}
        >
          {brandsItems.map((item) => (
            <DropdownItem
              key={item.key}
              description={item.description}
              className="text-textLight hover:bg-primary hover:bg-opacity-20"
              onPress={() => handleBrandsNavigation(item.key)}
            >
              {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  };

  const PartnersDropdown = ({ isMobile = false }) => {
    const isLoading = loadingStates.partners;

    // If not on for-partners page, show simple navigation button
    if (!isForPartnersPage) {
      return (
        <Button
          variant="light"
          className={`text-textLight hover:text-primary transition-colors font-medium p-0 min-w-0 h-auto bg-transparent ${isMobile ? 'text-base' : 'text-lg'}`}
          onPress={() =>
            navigateWithLoading('partners', '/for-partners')
          }
          isDisabled={isLoading}
          startContent={
            isLoading ? <LoadingSpinner size={14} /> : null
          }
        >
          Partners
        </Button>
      );
    }

    // If on for-partners page, show dropdown with sections and highlight current page
    return (
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="light"
            className={`text-primary hover:text-accent transition-colors font-medium p-0 min-w-0 h-auto bg-transparent ${isMobile ? 'text-base' : 'text-lg'}`}
            endContent={
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            }
          >
            Partners
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Partners menu"
          className="w-80"
          itemClasses={{
            base: 'gap-4',
            title: 'text-textLight',
            description: 'text-textLight opacity-60',
          }}
        >
          {partnersItems.map((item) => (
            <DropdownItem
              key={item.key}
              description={item.description}
              className="text-textLight hover:bg-primary hover:bg-opacity-20"
              onPress={() => handlePartnerNavigation(item.key)}
            >
              {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  };

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <Navbar
          className={`transition-all duration-300 ${
            scrolled
              ? 'bg-darkBg bg-opacity-95 backdrop-blur-md shadow-glow-sm border-b border-primary border-opacity-20'
              : 'bg-darkBg bg-opacity-80'
          }`}
          maxWidth="full"
        >
          {/* MOBILE LAYOUT (<1024px) */}
          <div className="lg:hidden w-full">
            {/* Top Row: Logo and Hamburger */}
            <div className="flex justify-between items-center w-full px-4 py-2">
              <NavbarBrand>
                <Link
                  href="/"
                  className="flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <Image
                    src="/Voyager-Box-Logo.png"
                    alt="Voyager Logo"
                    width={32}
                    height={32}
                    className="rounded-md"
                  />
                  <div className="font-heading text-xl font-bold">
                    <span className="text-primary">VOYAGER</span>
                  </div>
                </Link>
              </NavbarBrand>

              <div className="flex items-center gap-2">
                <NavbarItem>
                  <Button
                    as={Link}
                    href="/waitlist"
                    onPress={(e) => {
                      e.preventDefault();
                      navigateWithLoading('waitlist', '/waitlist');
                    }}
                    className="bg-primary text-textLight font-medium px-3 py-1 text-sm rounded-md hover:bg-accent transition-all duration-300"
                    isDisabled={loadingStates.waitlist}
                    startContent={
                      loadingStates.waitlist ? (
                        <LoadingSpinner size={12} />
                      ) : null
                    }
                  >
                    Join!
                  </Button>
                </NavbarItem>
              </div>
            </div>

            {/* Bottom Row: Navigation Links */}
            <div className="flex justify-center border-t border-gray-700 px-4 py-2">
              <div className="flex gap-4 flex-wrap justify-center">
                <NavbarItem>
                  <NavLink
                    href="/about-us"
                    className="text-base"
                    isActive={pathname === '/about-us'}
                    loadingKey="about"
                  >
                    About
                  </NavLink>
                </NavbarItem>

                <NavbarItem>
                  <BrandsDropdown isMobile={true} />
                </NavbarItem>

                <NavbarItem>
                  <NavLink
                    href="/how"
                    className="text-base"
                    isActive={pathname === '/how'}
                    loadingKey="how"
                  >
                    How
                  </NavLink>
                </NavbarItem>

                <NavbarItem>
                  <PartnersDropdown isMobile={true} />
                </NavbarItem>

                <NavbarItem>
                  <NavLink
                    href="/blog"
                    className="text-base"
                    isActive={pathname === '/blog'}
                    loadingKey="blog"
                  >
                    Blog
                  </NavLink>
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
                <NavbarItem>
                  <NavLink
                    href="/about-us"
                    className="text-lg"
                    isActive={pathname === '/about-us'}
                    loadingKey="about"
                  >
                    About
                  </NavLink>
                </NavbarItem>

                <NavbarItem>
                  <BrandsDropdown />
                </NavbarItem>

                <NavbarItem>
                  <NavLink
                    href="/how"
                    className="text-lg"
                    isActive={pathname === '/how'}
                    loadingKey="how"
                  >
                    How
                  </NavLink>
                </NavbarItem>

                <NavbarItem>
                  <PartnersDropdown />
                </NavbarItem>

                <NavbarItem>
                  <NavLink
                    href="/blog"
                    className="text-lg"
                    isActive={pathname === '/blog'}
                    loadingKey="blog"
                  >
                    Blog
                  </NavLink>
                </NavbarItem>
              </div>
            </div>

            {/* Right: Buttons */}
            <div className="flex justify-end">
              <div className="flex items-center gap-4">
                <NavbarItem>
                  <Button
                    as={Link}
                    href="/partner"
                    onPress={(e) => {
                      e.preventDefault();
                      navigateWithLoading('partnerLogin', '/partner');
                    }}
                    className={`font-medium px-6 py-2 transition-all duration-300 ${
                      pathname === '/partner'
                        ? 'text-accent hover:text-primary'
                        : 'text-primary hover:text-accent'
                    }`}
                    isDisabled={loadingStates.partnerLogin}
                    startContent={
                      loadingStates.partnerLogin ? (
                        <LoadingSpinner size={14} />
                      ) : null
                    }
                  >
                    Partner Login
                  </Button>
                </NavbarItem>
                <NavbarItem>
                  <Button
                    as={Link}
                    href="/waitlist"
                    onPress={(e) => {
                      e.preventDefault();
                      navigateWithLoading('waitlist', '/waitlist');
                    }}
                    className="bg-primary text-textLight font-medium px-6 py-2 rounded-md hover:bg-accent transition-all duration-300"
                    isDisabled={loadingStates.waitlist}
                    startContent={
                      loadingStates.waitlist ? (
                        <LoadingSpinner size={14} />
                      ) : null
                    }
                  >
                    Join!
                  </Button>
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
