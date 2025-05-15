// src/app/components/dashboard/panels/ServicesPanel.js
'use client';

import { useState, useRef } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Chip,
} from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';

export default function ServicesPanel() {
  // Modal control
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Currently selected service for the modal
  const [activeService, setActiveService] = useState(null);
  // Category filter
  const [activeCategory, setActiveCategory] = useState('all');
  // Add these with your other state variables at the top
  const [isLoading, setIsLoading] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const iframeRef = useRef(null);

  // Add these functions
  const handleScriptLoad = () => {
    setScriptLoaded(true);
    // Initialize Jotform embed handler for the current form
    if (
      window.jotformEmbedHandler &&
      iframeRef.current &&
      activeService?.formId
    ) {
      window.jotformEmbedHandler(
        `iframe[id='JotFormIFrame-${activeService.formId}']`,
        'https://form.jotform.com/'
      );
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };
  // Service categories with their respective services and custom colors
  const categories = [
    {
      id: 'software',
      title: 'Software Development',
      color: '#4C6EF5', // Indigo color
      bgColor: '#EDF2FF', // Light indigo background
      services: [
        {
          id: 'mobile-apps',
          title: 'Mobile App Development',
          description:
            'Create beautiful and functional mobile apps for iOS and Android.',
          image: '/services/mobile-apps.png',
          category: 'software',
          features: [
            'Custom app design and development',
            'User-friendly interfaces',
            'Integration with existing systems',
            'App store submission support',
            'Ongoing maintenance and updates',
          ],
          pricing: 'Starting from £1,500 per app',
        },
        {
          id: 'web-apps',
          title: 'Web Application Development',
          description:
            'Build powerful web applications tailored to your business needs.',
          image: '/services/web-apps.png',
          category: 'software',
          features: [
            'Custom web app design and development',
            'Responsive and user-friendly interfaces',
            'Integration with APIs and databases',
            'Ongoing support and maintenance',
            'Scalable solutions for future growth',
          ],
          pricing: 'Starting from £2,000 per app',
        },
        {
          id: 'websites',
          title: 'Website Development',
          image: '/services/website.png',
          description:
            'Create stunning websites that are fast, responsive, and SEO-friendly.',
          category: 'software',
          features: [
            'Custom website design and development',
            'Responsive and mobile-friendly layouts',
            'SEO optimisation',
            'Content management system integration',
            'Ongoing support and maintenance',
          ],
          pricing: 'Starting from £800 per website',
        },
        {
          id: 'crm',
          title: 'CRM Development and Setup',
          image: '/services/crm.png',
          description:
            'Custom CRM solutions to manage your customer relationships effectively.',
          category: 'software',
          features: [
            'Custom CRM design and development',
            'Integration with existing systems',
            'User training and support',
            'Ongoing maintenance and updates',
            'Scalable solutions for future growth',
          ],
          pricing: 'Starting from £800 per CRM',
        },
      ],
    },
    /* Adding additional categories with custom colors
    {
      id: 'ar',
      title: 'Augmented Reality',
      color: '#319795', // Teal color
      bgColor: '#E6FFFA', // Light teal background
      services: [],
    },
    {
      id: 'vr',
      title: 'Virtual Reality',
      color: '#805AD5', // Purple color
      bgColor: '#FAF5FF', // Light purple background
      services: [],
    },
    {
      id: 'production',
      title: 'Studio Production',
      color: '#DD6B20', // Orange color
      bgColor: '#FFFAF0', // Light orange background
      services: [],
    },
    {
      id: 'interactive',
      title: 'Interactive Experiences',
      color: '#3182CE', // Blue color
      bgColor: '#EBF8FF', // Light blue background
      services: [],
    }, */
  ];

  // Create a flat list of all services for easier filtering
  const allServices = categories.flatMap((category) =>
    category.services.map((service) => ({
      ...service,
      categoryName: category.title,
      categoryColor: category.color,
      categoryBgColor: category.bgColor,
    }))
  );

  allServices.push({
    id: 'suggest-service',
    title: 'Suggest a Service',
    description:
      'Have an idea for a service we should offer? Let us know!',
    image: '/services/suggest-service.png', // You'll need to create this image
    category: 'all', // This makes it visible in all categories
    categoryName: 'Feedback',
    categoryColor: '#9333EA', // Purple color
    categoryBgColor: '#F5F3FF', // Light purple background
    isJotform: true, // Flag to identify this as a Jotform link
    formId: '251315082459052', // Replace with your actual Jotform ID
  });

  // Get all unique categories for filter chips
  const allCategories = [
    {
      id: 'all',
      title: 'All Services',
      color: '#E79023',
      bgColor: '#FFF9EB',
    },
    ...categories,
  ];

  // Find category color by id for styling purposes
  const getCategoryColor = (categoryId) => {
    const category = allCategories.find(
      (cat) => cat.id === categoryId
    );
    return category ? category.color : '#E79023'; // Default to primary orange
  };

  // Find category background color by id
  const getCategoryBgColor = (categoryId) => {
    const category = allCategories.find(
      (cat) => cat.id === categoryId
    );
    return category ? category.bgColor : '#FFF9EB'; // Default to light orange
  };

  // Handle opening the modal for a specific service
  const handleServiceClick = (service) => {
    setActiveService(service);
    onOpen();
  };

  // Filter services based on selected category
  const filteredServices =
    activeCategory === 'all'
      ? allServices
      : allServices.filter(
          (service) => service.category === activeCategory
        );

  return (
    <div className="mb-8">
      <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between mb-2">
        <h1 className="text-3xl font-bold text-gray-800">
          Voyager Services
        </h1>
        <div className="flex items-center mb-4 md:mb-0 justify-start md:justify-end">
          <span className="text-gray-600 mr-2 text-sm">
            Provided by:
          </span>
          <Image
            src="/partners/CC-Main.png"
            alt="Creative Collaborators Logo"
            width={153}
            height={40}
            className="h-10 w-auto"
          />
        </div>
      </div>
      <p className="text-gray-600">
        Explore our range of immersive technology solutions that you
        can offer to your clients.
      </p>

      {/* Category Filter Chips with custom category colors */}
      <div className="flex flex-wrap gap-2 mt-4 mb-8 mx-8">
        {allCategories.map((category) => (
          <Chip
            key={category.id}
            variant={
              activeCategory === category.id ? 'solid' : 'bordered'
            }
            color={
              activeCategory === category.id ? 'primary' : 'default'
            }
            onClick={() => setActiveCategory(category.id)}
            className="cursor-pointer transition-all duration-200"
            style={{
              backgroundColor:
                activeCategory === category.id
                  ? category.color
                  : 'transparent',
              borderColor: 'var(--primary-color, #E79023)',
              color:
                activeCategory === category.id
                  ? 'white'
                  : 'var(--primary-color, #E79023)',
            }}
          >
            {category.title}
          </Chip>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card
            key={service.id}
            isPressable
            onPress={() => handleServiceClick(service)}
            className="border border-gray-200 shadow-sm hover:shadow-md transition-all hover:border-primary/30 overflow-hidden h-full"
          >
            {/* Force 16:9 aspect ratio with aspect-video */}
            <div className="relative aspect-video w-full">
              <Image
                src={service.image || '/placeholder.jpg'}
                alt={service.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2">
                <Chip
                  size="sm"
                  style={{
                    backgroundColor:
                      service.categoryColor ||
                      'var(--primary-color, #E79023)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                  }}
                >
                  {service.categoryName}
                </Chip>
              </div>
            </div>
            <CardBody className="p-4 flex flex-col">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 line-clamp-2 flex-grow">
                {service.description}
              </p>
              <div className="mt-4 flex justify-end">
                <span
                  className="text-sm font-medium flex items-center"
                  style={{
                    color:
                      service.categoryColor ||
                      'var(--primary-color, #E79023)',
                  }}
                >
                  View Details <span className="ml-1">→</span>
                </span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* No results message */}
      {filteredServices.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-600 text-lg">
            No services found in this category.
          </p>
          <Button
            className="mt-4"
            style={{
              backgroundColor: 'var(--primary-color, #E79023)',
              color: 'white',
            }}
            onClick={() => setActiveCategory('all')}
          >
            View All Services
          </Button>
        </div>
      )}

      {/* Service Detail Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          // Reset active service and loading state after modal closes
          setTimeout(() => {
            setActiveService(null);
            setIsLoading(true); // Reset loading state for next form
          }, 100);
        }}
        size="5xl"
        scrollBehavior="inside"
        classNames={{
          backdrop: 'bg-black/70 backdrop-blur-sm',
          base: 'w-[85%] max-w-[calc(100vw-40px)] max-h-[calc(100vh-40px)] m-auto border-none rounded-lg shadow-xl',
          wrapper:
            'fixed inset-0 z-50 flex items-center justify-center',
          body: 'bg-white p-6',
          header: 'bg-white border-b border-gray-200 p-6',
          footer: 'bg-white border-t border-gray-200 p-6',
          closeButton: 'text-gray-500 hover:text-gray-700',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader
                className="flex flex-col gap-1"
                style={{
                  borderBottom: activeService
                    ? `3px solid ${activeService.categoryColor || 'var(--primary-color, #E79023)'}`
                    : 'none',
                }}
              >
                {activeService && (
                  <div className="flex items-center gap-3">
                    <Chip
                      size="sm"
                      style={{
                        backgroundColor:
                          activeService.categoryColor ||
                          'var(--primary-color, #E79023)',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                      }}
                    >
                      {activeService.categoryName}
                    </Chip>
                    <h2
                      className="text-xl font-semibold"
                      style={{
                        color:
                          activeService.categoryColor ||
                          'var(--primary-color, #E79023)',
                      }}
                    >
                      {activeService.title}
                    </h2>
                  </div>
                )}
              </ModalHeader>

              <ModalBody className="bg-white">
                {activeService && activeService.isJotform ? (
                  // Jotform Embed - correct implementation
                  <div className="relative min-h-[539px]">
                    {/* Loading state */}
                    {isLoading && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 p-6">
                        <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-700">
                          Loading form...
                        </p>
                      </div>
                    )}

                    {/* JotForm iframe */}
                    <iframe
                      id={`JotFormIFrame-${activeService.formId}`}
                      title="Suggest a Service Form"
                      ref={iframeRef}
                      onLoad={handleIframeLoad}
                      allowTransparency="true"
                      allow="geolocation; microphone; camera; fullscreen"
                      src={`https://form.jotform.com/${activeService.formId}`}
                      style={{
                        minWidth: '100%',
                        maxWidth: '100%',
                        height: '539px',
                        border: 'none',
                      }}
                    ></iframe>

                    {/* JotForm scripts loaded via Next.js Script component */}
                    {scriptLoaded === false && (
                      <Script
                        src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"
                        onLoad={handleScriptLoad}
                        strategy="afterInteractive"
                      />
                    )}
                  </div>
                ) : (
                  activeService && (
                    // Regular service details (keep your existing code here)
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Service Image */}
                      <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-200">
                        <Image
                          src={
                            activeService.image || '/placeholder.jpg'
                          }
                          alt={activeService.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Service Details */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            Description
                          </h3>
                          <p className="text-gray-600">
                            {activeService.description}
                          </p>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            Features
                          </h3>
                          <ul className="list-disc pl-5 space-y-1 text-gray-600">
                            {activeService.features?.map(
                              (feature, index) => (
                                <li key={index}>{feature}</li>
                              )
                            ) || <li>No features listed</li>}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            Pricing
                          </h3>
                          <p className="text-gray-600">
                            {activeService.pricing ||
                              'Contact us for pricing'}
                          </p>
                        </div>

                        {/* Contact Buttons */}
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            Interested in this service?
                          </h3>
                          <div className="flex flex-col sm:flex-row gap-3 mt-4">
                            <Button
                              as={Link}
                              href="https://wa.me/447514020340"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2"
                              style={{
                                backgroundColor: '#25D366',
                                color: 'white',
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                              </svg>
                              Contact via WhatsApp
                            </Button>
                            <Button
                              as={Link}
                              href="mailto:connect@voyagervrlab.co.uk"
                              className="flex items-center justify-center gap-2"
                              style={{
                                backgroundColor:
                                  activeService.categoryColor ||
                                  'var(--primary-color, #E79023)',
                                color: 'white',
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                              </svg>
                              Contact via Email
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}

                {/* Additional Information - only show for regular services */}
                {activeService && !activeService.isJotform && (
                  <div
                    className="mt-8 p-4 rounded-md"
                    style={{
                      backgroundColor:
                        activeService.categoryBgColor || '#FFF9EB',
                      borderColor:
                        activeService.categoryColor ||
                        'var(--primary-color, #E79023)',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                    }}
                  >
                    <h4 className="text-lg font-medium text-gray-800 mb-2">
                      How to offer this service to your clients
                    </h4>
                    <p className="text-gray-600 mb-4">
                      As a Voyager partner, you can offer this service
                      under your own brand. Here&apos;s how it works:
                    </p>
                    <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                      <li>
                        Present this solution to your client using our
                        white-label sales materials
                      </li>
                      <li>
                        Submit the project through your partner portal
                      </li>
                      <li>
                        Our team handles all technical aspects behind
                        the scenes
                      </li>
                      <li>
                        You maintain the client relationship
                        throughout
                      </li>
                      <li>
                        Deliver the finished product with your
                        branding
                      </li>
                    </ol>
                  </div>
                )}
              </ModalBody>

              <ModalFooter className="bg-white">
                <Button
                  onPress={() => {
                    onClose();
                    setTimeout(() => {
                      setActiveService(null);
                    }, 100);
                  }}
                  style={{
                    backgroundColor: activeService
                      ? activeService.categoryColor ||
                        'var(--primary-color, #E79023)'
                      : 'var(--primary-color, #E79023)',
                    color: 'white',
                  }}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
