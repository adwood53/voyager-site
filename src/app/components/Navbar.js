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
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

export default function VoyagerNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loadingStates, setLoadingStates] = useState({
    brands: false,
    partners: false,
    industries: false,
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
  const isIndustriesPage = pathname.startsWith('/industries');

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
    setMobileMenuOpen(false); // Close mobile menu on navigation
    await new Promise((resolve) => setTimeout(resolve, 100));
    router.push(path);
  };

  // Reset loading states when pathname changes
  useEffect(() => {
    setLoadingStates({
      brands: false,
      partners: false,
      industries: false,
      how: false,
      about: false,
      blog: false,
      partnerLogin: false,
      waitlist: false,
    });
  }, [pathname]);

  // Handle navigation functions
  const handlePartnerNavigation = (sectionId) => {
    setMobileMenuOpen(false);
    router.push(`/for-partners#${sectionId}`);
  };

  const handleBrandsNavigation = (sectionId) => {
    setMobileMenuOpen(false);
    if (isBrandsPage) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
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

  // Configuration arrays for dropdowns
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

  const brandsItems = [
    {
      key: 'what-we-do',
      label: 'What We Do',
      href: '/for-brands#what-we-do',
      description: 'Discover our immersive solutions',
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
      key: 'signup',
      label: 'Contact',
      href: '/for-brands#signup',
      description: 'Get in touch with our team',
    },
  ];

  const industriesItems = [
    {
      key: 'hyrox-corby',
      label: 'Hyrox Corby',
      href: '/industries/case-studies/hyrox-corby',
      description: 'NFC enabled event engagement',
    },
    {
      key: 'tom-meighan',
      label: 'Tom Meighan',
      href: '/industries/case-studies/tom-meighan',
      description: 'Interactive vinyl & VCard campaign',
    },
    {
      key: 'oloye-aesthetics',
      label: 'Oloye Aesthetics',
      href: '/industries/case-studies/oloye-aesthetics',
      description: 'Complete digital transformation',
    },
    {
      key: 'all-cases',
      label: 'View All Case Studies',
      href: '/industries/case-studies',
      description: 'See our complete portfolio',
    },
  ];

  // Navigation link component
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

  // Brands dropdown component
  const BrandsDropdown = ({ isMobile = false }) => {
    const isLoading = loadingStates.brands;
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
          className="w-80 bg-darkBg border border-primary/20 shadow-xl"
          itemClasses={{
            base: 'gap-4 data-[hover=true]:bg-primary/10',
            title: 'text-textLight',
            description: 'text-textLight opacity-60',
          }}
        >
          {brandsItems.map((item) => (
            <DropdownItem
              key={item.key}
              description={item.description}
              className="text-textLight data-[hover=true]:bg-primary/10"
              onPress={() => handleBrandsNavigation(item.key)}
            >
              {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  };

  // Partners dropdown component
  const PartnersDropdown = ({ isMobile = false }) => {
    const isLoading = loadingStates.partners;
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
          className="w-80 bg-darkBg border border-primary/20 shadow-xl"
          itemClasses={{
            base: 'gap-4 data-[hover=true]:bg-primary/10',
            title: 'text-textLight',
            description: 'text-textLight opacity-60',
          }}
        >
          {partnersItems.map((item) => (
            <DropdownItem
              key={item.key}
              description={item.description}
              className="text-textLight data-[hover=true]:bg-primary/10"
              onPress={() => handlePartnerNavigation(item.key)}
            >
              {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  };

  // Industries dropdown component
  const IndustriesDropdown = ({ isMobile = false }) => {
    const isLoading = loadingStates.industries;
    if (!isIndustriesPage) {
      return (
        <Button
          variant="light"
          className={`text-textLight hover:text-primary transition-colors font-medium p-0 min-w-0 h-auto bg-transparent ${isMobile ? 'text-base' : 'text-lg'}`}
          onPress={() =>
            navigateWithLoading('industries', '/industries')
          }
          isDisabled={isLoading}
          startContent={
            isLoading ? <LoadingSpinner size={14} /> : null
          }
        >
          Industries
        </Button>
      );
    }
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
            Industries
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Industries menu"
          className="w-80 bg-darkBg border border-primary/20 shadow-xl"
          itemClasses={{
            base: 'gap-4 data-[hover=true]:bg-primary/10',
            title: 'text-textLight',
            description: 'text-textLight opacity-60',
          }}
        >
          {industriesItems.map((item) => (
            <DropdownItem
              key={item.key}
              description={item.description}
              className="text-textLight data-[hover=true]:bg-primary/10"
              onPress={() => {
                setMobileMenuOpen(false);
                navigateWithLoading('industries', item.href);
              }}
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
              ? 'bg-darkBg shadow-lg border-b border-primary/20'
              : 'bg-transparent'
          }`}
          maxWidth="full"
        >
          {/* MOBILE HAMBURGER LAYOUT (<1024px) */}
          <div className="lg:hidden flex items-center justify-between w-full px-4 py-2">
            {/* Logo */}
            <NavbarBrand>
              <Link
                href="/"
                className="flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <Image
                  src="/Voyager-Box-Logo.png"
                  alt="Voyager Logo"
                  width={36}
                  height={36}
                  className="rounded-md"
                />
                <div className="font-heading text-xl font-bold">
                  <span className="text-primary">VOYAGER</span>
                </div>
              </Link>
            </NavbarBrand>

            {/* Hamburger Button */}
            <Button
              variant="light"
              className="p-2 min-w-0"
              onPress={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg
                className="w-6 h-6 text-textLight"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </Button>
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
                  <IndustriesDropdown />
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
                        ? 'bg-primary text-textLight'
                        : 'text-accent hover:text-primary'
                    }`}
                    variant={
                      pathname === '/partner' ? 'solid' : 'light'
                    }
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

        {/* MOBILE MENU OVERLAY */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden absolute top-full left-0 right-0 bg-darkBg/98 backdrop-blur-md border-b border-primary/20 shadow-xl z-50"
            >
              <div className="px-4 py-6 space-y-4">
                {/* Navigation Links */}
                <div className="space-y-3">
                  <NavLink
                    href="/about-us"
                    className="block text-lg py-2"
                    isActive={pathname === '/about-us'}
                    loadingKey="about"
                  >
                    About
                  </NavLink>

                  <div className="py-2">
                    <BrandsDropdown isMobile={true} />
                  </div>

                  <div className="py-2">
                    <IndustriesDropdown isMobile={true} />
                  </div>

                  <NavLink
                    href="/how"
                    className="block text-lg py-2"
                    isActive={pathname === '/how'}
                    loadingKey="how"
                  >
                    How
                  </NavLink>

                  <div className="py-2">
                    <PartnersDropdown isMobile={true} />
                  </div>

                  <NavLink
                    href="/blog"
                    className="block text-lg py-2"
                    isActive={pathname === '/blog'}
                    loadingKey="blog"
                  >
                    Blog
                  </NavLink>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-gray-700 space-y-3">
                  <Button
                    as={Link}
                    href="/partner"
                    onPress={(e) => {
                      e.preventDefault();
                      navigateWithLoading('partnerLogin', '/partner');
                    }}
                    className={`w-full font-medium px-6 py-3 transition-all duration-300 ${
                      pathname === '/partner'
                        ? 'bg-primary text-textLight'
                        : 'text-accent hover:text-primary'
                    }`}
                    variant={
                      pathname === '/partner' ? 'solid' : 'light'
                    }
                    isDisabled={loadingStates.partnerLogin}
                    startContent={
                      loadingStates.partnerLogin ? (
                        <LoadingSpinner size={14} />
                      ) : null
                    }
                  >
                    Partner Login
                  </Button>
                  <Button
                    as={Link}
                    href="/waitlist"
                    onPress={(e) => {
                      e.preventDefault();
                      navigateWithLoading('waitlist', '/waitlist');
                    }}
                    className="w-full bg-primary text-textLight font-medium px-6 py-3 rounded-md hover:bg-accent transition-all duration-300"
                    isDisabled={loadingStates.waitlist}
                    startContent={
                      loadingStates.waitlist ? (
                        <LoadingSpinner size={12} />
                      ) : null
                    }
                  >
                    Join!
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Spacer to push page content below the navbar */}
      <div className="h-16"></div>
    </>
  );
}
