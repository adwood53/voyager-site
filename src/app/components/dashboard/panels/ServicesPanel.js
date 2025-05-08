// src/app/components/dashboard/panels/ServicesPanel.js
'use client';

import { useState, useRef } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@heroui/react';
import Image from 'next/image';
import Script from 'next/script';
import { motion } from 'framer-motion';

export default function ServicesPanel() {
  // State for category filtering
  const [activeCategory, setActiveCategory] = useState('all');

  // Modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeService, setActiveService] = useState(null);

  // References for iframe integration
  const iframeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Handle script load for JotForm
  const handleScriptLoad = () => {
    setScriptLoaded(true);
    if (
      window.jotformEmbedHandler &&
      iframeRef.current &&
      activeService
    ) {
      window.jotformEmbedHandler(
        `iframe[id='JotFormIFrame-${activeService.formId}']`,
        'https://form.jotform.com/'
      );
    }
  };

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Service categories
  const categories = [
    { id: 'all', label: 'All Services' },
    { id: '3d', label: '3D Creation' },
    { id: 'environments', label: 'Environments' },
    { id: 'production', label: 'Production' },
    { id: 'characters', label: 'Characters & Props' },
    { id: 'branding', label: 'Branding' },
  ];

  // Service data - Updated to reflect your current offerings
  const services = [
    {
      id: '3d-character-creation',
      name: '3D Character Creation',
      description:
        'Custom 3D characters and mascots for your brand, marketing campaigns, and interactive experiences.',
      image: '/placeholder.jpg',
      category: 'characters',
      formId: '251063594204349',
      modalDescription:
        'Our 3D character creation service delivers high-quality, customized characters and mascots that represent your brand. Each character is meticulously designed and crafted to match your brand identity and communication goals, perfect for marketing campaigns, social media, and interactive experiences.',
    },
    {
      id: '3d-environments-vr',
      name: '3D Environments for VR',
      description:
        'Immersive 3D environments designed specifically for virtual reality experiences.',
      image: '/virtualworlds.jpg',
      category: 'environments',
      formId: '251062862561352',
      modalDescription:
        'Create fully immersive VR environments that transport users to another world. Our 3D VR environments are optimized for performance and designed with attention to detail, offering realistic or stylized settings for training, entertainment, virtual tours, or educational purposes.',
    },
    {
      id: '3d-environments-production',
      name: '3D Virtual Production Environments',
      description:
        'Custom 3D backgrounds and environments for virtual production and green screen shoots.',
      image: '/studioimage.jpg',
      category: 'environments',
      formId: '251064294747361',
      modalDescription:
        'Enhance your green screen production with custom-designed 3D environments that serve as dynamic backgrounds. These environments can be rendered in real-time during shoots or added in post-production, offering flexibility and creative control over your production setting.',
    },
    {
      id: '3d-logo-creation',
      name: '3D Brand & Logo Creation',
      description:
        'Transform your 2D logos and brand assets into dynamic 3D elements for marketing and digital media.',
      image: '/re.jpg',
      category: 'branding',
      formId: '251063845932359',
      modalDescription:
        'Elevate your brand with 3D logo transformations that bring your visual identity to life. Our 3D branding services convert flat logos into dynamic, animated assets that can be used across digital platforms, in videos, presentations, and augmented reality experiences.',
    },
    {
      id: '3d-prop-creation',
      name: '3D Prop Creation',
      description:
        'Custom 3D props and objects for virtual environments, augmented reality, and visualization.',
      image: '/hyrox2.jpg',
      category: 'characters',
      formId: '250921428503048',
      modalDescription:
        'From simple objects to complex interactive items, our 3D prop creation service delivers high-quality assets for your virtual projects. Each prop is designed to match your specifications and optimized for its intended platform, whether that&apos;s VR, AR, gaming, or visualization.',
    },
    {
      id: 'on-location-production',
      name: 'On-Location Video Production',
      description:
        'Professional video production services at your location with our experienced team and equipment.',
      image: '/studioimage.jpg',
      category: 'production',
      formId: '251063721953356',
      modalDescription:
        'Our on-location video production service brings our expertise and equipment to your venue. We handle everything from setup to filming and direction, ensuring high-quality video content that meets your objectives. Perfect for interviews, promotional content, events, and testimonials.',
    },
  ];

  // Open service modal
  const handleServiceClick = (service) => {
    setActiveService(service);
    setIsLoading(true);
    onOpen();
  };

  // Filter services by category
  const filteredServices =
    activeCategory === 'all'
      ? services
      : services.filter(
          (service) => service.category === activeCategory
        );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Partner Services
        </h1>
        <p className="text-gray-600">
          Explore our range of 3D creation and production services
          available to resell to your clients.
        </p>
      </div>

      {/* Partner Notice Card */}
      <Card
        className="mb-8 border-l-4"
        style={{ borderLeftColor: 'var(--primary-color, #E79023)' }}
      >
        <CardBody className="bg-amber-50/30">
          <div className="flex gap-4">
            <div className="text-amber-600 text-xl">💡</div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-1">
                Have a Service Suggestion?
              </h3>
              <p className="text-gray-600">
                If you believe there's a service that would be
                valuable for our partner network, we'd love to hear
                about it.
                <a
                  href="mailto:connect@voyagervrlab.co.uk"
                  className="ml-1 font-medium"
                  style={{ color: 'var(--primary-color, #E79023)' }}
                >
                  Contact us
                </a>{' '}
                to discuss adding your service to our marketplace.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Category filter chips */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <Chip
            key={category.id}
            variant={
              activeCategory === category.id ? 'solid' : 'bordered'
            }
            onClick={() => setActiveCategory(category.id)}
            className="cursor-pointer"
            style={{
              backgroundColor:
                activeCategory === category.id
                  ? 'var(--primary-color, #E79023)'
                  : 'transparent',
              color:
                activeCategory === category.id
                  ? 'white'
                  : 'var(--text-color, #333)',
              borderColor: 'var(--primary-color, #E79023)',
            }}
          >
            {category.label}
          </Chip>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {filteredServices.map((service) => (
          <motion.div
            key={service.id}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="h-full overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-200 hover:border-primary-color/30">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-semibold text-white">
                    {service.name}
                  </h3>
                </div>
              </div>
              <CardBody className="flex flex-col h-full">
                <p className="text-gray-600 flex-grow mb-4">
                  {service.description}
                </p>
                <Button
                  onClick={() => handleServiceClick(service)}
                  className="w-full"
                  style={{
                    backgroundColor: 'var(--primary-color, #E79023)',
                    color: 'white',
                  }}
                >
                  Get a Quote
                </Button>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Service Modal with JotForm - FIXED STYLING */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsLoading(true);
          onClose();
        }}
        size="4xl"
        scrollBehavior="inside"
        backdrop="blur"
        classNames={{
          backdrop: 'bg-black/70 backdrop-blur-sm',
          base: 'border-0 shadow-lg rounded-lg',
          header: 'border-b border-gray-200 bg-white text-gray-800',
          body: 'p-0 bg-white',
          footer: 'border-t border-gray-200 bg-white',
          closeButton:
            'hover:bg-gray-100 active:bg-gray-200 rounded-full',
        }}
      >
        <ModalContent>
          {activeService && (
            <>
              <ModalHeader className="bg-white">
                <div className="flex gap-2 items-center">
                  <span
                    className="text-xl font-semibold"
                    style={{ color: 'var(--primary-color, #E79023)' }}
                  >
                    {activeService.name}
                  </span>
                </div>
              </ModalHeader>
              <ModalBody className="bg-white p-0">
                <div className="flex flex-col">
                  {/* Service Description */}
                  <div className="p-6 bg-gray-50 border-b border-gray-200">
                    <p className="text-gray-700">
                      {activeService.modalDescription}
                    </p>
                  </div>

                  {/* JotForm Container */}
                  <div className="relative bg-white">
                    {/* Loading State */}
                    {isLoading && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
                        <div
                          className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mb-4"
                          style={{
                            borderColor:
                              'var(--primary-color, #E79023)',
                            borderTopColor: 'transparent',
                          }}
                        ></div>
                        <p className="text-gray-700">
                          Loading quote form...
                        </p>
                      </div>
                    )}

                    {/* JotForm iframe */}
                    <iframe
                      id={`JotFormIFrame-${activeService.formId}`}
                      title={`${activeService.name} Quote Form`}
                      ref={iframeRef}
                      onLoad={handleIframeLoad}
                      allowTransparency="true"
                      allow="geolocation; microphone; camera"
                      src={`https://form.jotform.com/${activeService.formId}`}
                      style={{
                        minWidth: '100%',
                        maxWidth: '100%',
                        height: '539px',
                        border: 'none',
                      }}
                    ></iframe>

                    {/* JotForm scripts */}
                    <Script
                      src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"
                      onLoad={handleScriptLoad}
                      strategy="afterInteractive"
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="bg-white">
                <Button
                  onClick={onClose}
                  style={{
                    backgroundColor: 'var(--primary-color, #E79023)',
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
