// src/app/components/dashboard/panels/ResourcesPanel.js
'use client';

import { useState } from 'react';
import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@heroui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ResourcesPanel() {
  // State for active resource
  const [activeResource, setActiveResource] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Define our resources
  const resources = [
    {
      id: 'training-presentation',
      title: 'Partner Training Presentation',
      icon: '🎓',
      color: '#3B82F6', // Blue
      description:
        'Comprehensive presentation on becoming a successful Voyager partner.',
      type: 'presentation',
      canvaUrl: 'https://www.canva.com/design/123456/view',
    },
    {
      id: 'vcard-pricing',
      title: 'vCard Pricing Rubric',
      icon: '💰',
      color: '#10B981', // Green
      description:
        'Detailed breakdown of pricing structures for our vCard offerings.',
      type: 'pricing',
    },
    {
      id: 'demos',
      title: 'Demo Collection',
      icon: '🎮',
      color: '#F59E0B', // Amber
      description:
        'Access interactive demos to showcase to your clients.',
      type: 'demos',
      demos: [
        {
          name: 'AR Business Card',
          demoUrl: 'https://demos.voyagervrlab.co.uk/ar-card',
          imageUrl: 'https://demos.voyagervrlab.co.uk/ar-card-image',
        },
        {
          name: 'Virtual Event Space',
          demoUrl: 'https://demos.voyagervrlab.co.uk/virtual-event',
          imageUrl:
            'https://demos.voyagervrlab.co.uk/virtual-event-image',
        },
        {
          name: 'Product Configurator',
          demoUrl: 'https://demos.voyagervrlab.co.uk/product-config',
          imageUrl:
            'https://demos.voyagervrlab.co.uk/product-config-image',
        },
      ],
    },
    {
      id: 'card-templates',
      title: 'Card Design Templates',
      icon: '🎨',
      color: '#EC4899', // Pink
      description:
        'Templates for creating effective AR business cards.',
      type: 'templates',
      templates: [
        {
          name: 'Corporate Style',
          url: 'https://www.canva.com/design/corporate123/edit',
        },
        {
          name: 'Creative Style',
          url: 'https://www.canva.com/design/creative456/edit',
        },
        {
          name: 'Minimalist Style',
          url: 'https://www.canva.com/design/minimal789/edit',
        },
      ],
    },
    {
      id: 'sales-scripts',
      title: 'Sales Scripts',
      icon: '📝',
      color: '#8B5CF6', // Purple
      description:
        'Ready-to-use scripts for pitching immersive tech to clients.',
      type: 'scripts',
    },
    {
      id: 'case-studies',
      title: 'Case Studies',
      icon: '📊',
      color: '#EF4444', // Red
      description:
        'Success stories and case studies to share with prospects.',
      type: 'case-studies',
    },
    {
      id: 'marketing-materials',
      title: 'Marketing Materials',
      icon: '📣',
      color: '#0EA5E9', // Sky blue
      description:
        'Brochures, social media assets, and marketing collateral.',
      type: 'marketing',
    },
  ];

  // Function to handle resource click
  const handleResourceClick = (resource) => {
    setActiveResource(resource);
    onOpen();
  };

  // Function to copy URL to clipboard
  const copyToClipboard = (url, index) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  // Function to render modal content based on resource type
  const renderModalContent = () => {
    if (!activeResource) return null;

    switch (activeResource.type) {
      case 'presentation':
        return (
          <div className="w-full h-[70vh]">
            <iframe
              src={activeResource.canvaUrl}
              className="w-full h-full border-0"
              allow="fullscreen"
              title="Partner Training Presentation"
            ></iframe>
          </div>
        );

      case 'pricing':
        // Sample pricing data for the table
        const pricingData = [
          {
            tier: 'Basic',
            unitPrice: '£1.50',
            bulkPrice: '£1.20',
            setupFee: '£250',
            minOrder: '100',
          },
          {
            tier: 'Standard',
            unitPrice: '£2.20',
            bulkPrice: '£1.80',
            setupFee: '£350',
            minOrder: '250',
          },
          {
            tier: 'Premium',
            unitPrice: '£3.00',
            bulkPrice: '£2.50',
            setupFee: '£500',
            minOrder: '500',
          },
          {
            tier: 'Enterprise',
            unitPrice: '£4.00',
            bulkPrice: '£3.20',
            setupFee: '£750',
            minOrder: '1000',
          },
        ];

        return (
          <div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tier
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Unit Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Bulk Price (1000+)
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Setup Fee
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Min Order
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pricingData.map((tier) => (
                    <tr key={tier.tier} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {tier.tier}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {tier.unitPrice}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {tier.bulkPrice}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {tier.setupFee}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {tier.minOrder}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-lg font-medium text-blue-800 mb-2">
                Pricing Notes
              </h4>
              <ul className="list-disc pl-5 text-blue-700 space-y-1">
                <li>All prices are exclusive of VAT</li>
                <li>
                  Setup fee includes design assistance and one round
                  of revisions
                </li>
                <li>
                  Partner commission is 20% of the total order value
                </li>
                <li>
                  Volume discounts available for orders exceeding 2500
                  units
                </li>
                <li>
                  Annual maintenance fee of £150 applies after the
                  first year
                </li>
              </ul>
            </div>
          </div>
        );

      case 'demos':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeResource.demos.map((demo, index) => (
              <div
                key={demo.name}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
              >
                <div className="p-4 border-b border-gray-100">
                  <h4 className="text-lg font-medium text-gray-800">
                    {demo.name}
                  </h4>
                </div>

                <div className="p-4 flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      color="primary"
                      onClick={() =>
                        window.open(
                          demo.demoUrl,
                          '_blank',
                          'noopener,noreferrer'
                        )
                      }
                      className="flex-1"
                    >
                      Open Demo
                    </Button>

                    <Button
                      variant="bordered"
                      onClick={() =>
                        copyToClipboard(demo.demoUrl, index)
                      }
                      className="min-w-[120px]"
                    >
                      {copiedIndex === index
                        ? '✓ Copied!'
                        : 'Copy URL'}
                    </Button>

                    <Button
                      color="secondary"
                      onClick={() =>
                        window.open(
                          demo.imageUrl,
                          '_blank',
                          'noopener,noreferrer'
                        )
                      }
                      className="flex-1"
                    >
                      View Image
                    </Button>
                  </div>

                  <div className="text-xs text-gray-500 mt-2">
                    <p className="mb-1">
                      <strong>Demo URL:</strong> {demo.demoUrl}
                    </p>
                    <p>
                      <strong>Image URL:</strong> {demo.imageUrl}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'templates':
        return (
          <div className="space-y-6">
            {activeResource.templates.map((template) => (
              <div
                key={template.name}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
              >
                <div className="flex justify-between items-center p-4 border-b border-gray-100">
                  <h4 className="text-lg font-medium text-gray-800">
                    {template.name}
                  </h4>
                  <Button
                    color="primary"
                    onClick={() =>
                      window.open(
                        template.url,
                        '_blank',
                        'noopener,noreferrer'
                      )
                    }
                  >
                    Open in Canva
                  </Button>
                </div>

                <div className="p-4 bg-gray-50">
                  <div className="aspect-[85/55] bg-white rounded border border-gray-200 shadow-sm relative overflow-hidden">
                    {/* Template preview image - replace with actual previews */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-5xl opacity-20">🎨</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-800/50 to-transparent flex items-end">
                      <div className="p-3 text-white text-sm">
                        {template.name} Template
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      // Add more cases for other resource types as needed
      default:
        return (
          <div className="p-8 text-center text-gray-500">
            Content coming soon
          </div>
        );
    }
  };

  // Calculate grid layout for proper centering of incomplete rows
  const resourceCount = resources.length;
  const rowsNeeded = Math.ceil(resourceCount / 3);
  const tilesInLastRow =
    resourceCount % 3 === 0 ? 3 : resourceCount % 3;
  const lastRowCenteringClass =
    tilesInLastRow === 1
      ? 'justify-center'
      : tilesInLastRow === 2
        ? 'justify-center gap-16'
        : '';

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Partner Resources
        </h1>
        <p className="text-gray-600">
          Access training materials, pricing guides, demos, and design
          templates to enhance your partnership experience.
        </p>
      </div>

      {/* Resource Tiles Grid */}
      <div className="grid grid-rows-3 gap-8 mb-12">
        {/* Create complete rows of 3 */}
        {Array.from({ length: rowsNeeded }).map((_, rowIndex) => {
          const isLastRow = rowIndex === rowsNeeded - 1;
          const startIdx = rowIndex * 3;
          const rowResources = resources.slice(
            startIdx,
            startIdx + 3
          );

          return (
            <div
              key={`row-${rowIndex}`}
              className={`grid grid-cols-3 gap-8 ${isLastRow && lastRowCenteringClass}`}
            >
              {rowResources.map((resource) => (
                <div
                  key={resource.id}
                  className="flex justify-center items-center"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                      transition: { duration: 0.2 },
                    }}
                    onClick={() => handleResourceClick(resource)}
                    className="w-56 h-56 cursor-pointer rounded-lg overflow-hidden"
                  >
                    <Card className="w-full h-full bg-white">
                      <CardBody className="flex flex-col items-center justify-center p-0">
                        <div
                          className="w-full flex flex-col items-center justify-center p-6 text-center"
                          style={{
                            background: `${resource.color}10`,
                          }}
                        >
                          <span className="text-5xl mb-4">
                            {resource.icon}
                          </span>
                          <h3
                            className="text-lg font-semibold"
                            style={{ color: resource.color }}
                          >
                            {resource.title}
                          </h3>
                        </div>
                        <div className="p-4 text-center">
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {resource.description}
                          </p>
                          <Button
                            className="mt-3"
                            style={{
                              backgroundColor: resource.color,
                              color: 'white',
                            }}
                            size="sm"
                          >
                            Open Resource
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* HeroUI Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="5xl"
        scrollBehavior="inside"
        classNames={{
          backdrop: 'bg-black/70 backdrop-blur-sm',
          base: 'border-none shadow-xl',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader
                className="flex flex-col gap-1"
                style={{
                  borderBottom: activeResource
                    ? `3px solid ${activeResource.color}`
                    : 'none',
                }}
              >
                {activeResource && (
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">
                      {activeResource.icon}
                    </span>
                    <h2
                      className="text-xl font-semibold"
                      style={{ color: activeResource.color }}
                    >
                      {activeResource.title}
                    </h2>
                  </div>
                )}
              </ModalHeader>
              <ModalBody>{renderModalContent()}</ModalBody>
              <ModalFooter>
                <Button
                  onPress={onClose}
                  style={{
                    backgroundColor:
                      activeResource?.color || '#10B981',
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
