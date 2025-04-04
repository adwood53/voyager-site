// src/app/components/dashboard/panels/ResourcesPanel.js
// Resources panel for partners to access training materials and templates
'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader, Button } from '@heroui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ResourcesPanel() {
  // State for tracking resource being previewed (if any)
  const [previewResource, setPreviewResource] = useState(null);

  // Define our resources
  const resources = [
    {
      id: 'training-presentation',
      title: 'Partner Training Presentation',
      icon: '🎓',
      color: '#3B82F6', // Blue
      description:
        'Comprehensive presentation on becoming a successful Voyager partner.',
      fileType: 'PDF',
      url: '/resources/partner-training.pdf',
    },
    {
      id: 'vcard-pricing',
      title: 'vCard Pricing Rubric',
      icon: '💰',
      color: '#10B981', // Green
      description:
        'Detailed breakdown of pricing structures for our vCard offerings.',
      fileType: 'PDF',
      url: '/resources/vcard-pricing.pdf',
    },
    {
      id: 'demos',
      title: 'Demo Collection',
      icon: '🎮',
      color: '#F59E0B', // Amber
      description:
        'Access interactive demos to showcase to your clients.',
      fileType: 'Web',
      url: 'https://demos.voyagervrlab.co.uk',
    },
    {
      id: 'card-templates',
      title: 'Card Design Templates',
      icon: '🎨',
      color: '#EC4899', // Pink
      description:
        'Templates for creating effective AR business cards.',
      fileType: 'PSD/AI',
      url: '/resources/card-templates.zip',
    },
  ];

  // Function to handle resource click
  const handleResourceClick = (resource) => {
    // If it's a web resource, open in new tab
    if (resource.fileType === 'Web') {
      window.open(resource.url, '_blank', 'noopener,noreferrer');
      return;
    }

    // Otherwise, show preview (for PDFs) or initiate download
    if (resource.fileType === 'PDF') {
      setPreviewResource(resource);
    } else {
      // For other file types, initiate download
      const link = document.createElement('a');
      link.href = resource.url;
      link.download = resource.url.split('/').pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

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
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {resources.map((resource) => (
          <motion.div
            key={resource.id}
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card
              isPressable
              onPress={() => handleResourceClick(resource)}
              className="h-full cursor-pointer border hover:shadow-md transition-all overflow-hidden"
            >
              <div
                className="h-28 flex items-center justify-center text-5xl"
                style={{ backgroundColor: `${resource.color}10` }}
              >
                <span>{resource.icon}</span>
              </div>
              <CardBody className="p-4">
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: resource.color }}
                >
                  {resource.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {resource.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                    {resource.fileType}
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: resource.color }}
                  >
                    Access →
                  </span>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* PDF Preview Modal */}
      {previewResource && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium">
                {previewResource.title}
              </h3>
              <Button
                isIconOnly
                variant="light"
                onPress={() => setPreviewResource(null)}
                aria-label="Close"
              >
                ✕
              </Button>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe
                src={`${previewResource.url}#view=FitH`}
                className="w-full h-full"
                title={previewResource.title}
              ></iframe>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
              <Button
                variant="light"
                onPress={() => setPreviewResource(null)}
              >
                Close
              </Button>
              <Button
                style={{
                  backgroundColor: 'var(--primary-color, #E79023)',
                  color: 'white',
                }}
                onPress={() => {
                  window.open(
                    previewResource.url,
                    '_blank',
                    'noopener,noreferrer'
                  );
                }}
              >
                Download
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Additional Cards for Usage Instructions and Support */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <Card className="shadow-sm">
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-800">
              How to Use These Resources
            </h2>
          </CardHeader>
          <CardBody>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-primary-color font-bold mt-1">
                  •
                </span>
                <span>
                  <strong>Partner Training:</strong> Review this
                  presentation before client meetings to ensure you're
                  prepared to represent Voyager offerings.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-color font-bold mt-1">
                  •
                </span>
                <span>
                  <strong>Pricing Rubric:</strong> Use this guide when
                  quoting projects to your clients to ensure accurate
                  pricing.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-color font-bold mt-1">
                  •
                </span>
                <span>
                  <strong>Demos:</strong> Show these to clients during
                  presentations to help them visualize the final
                  product.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-color font-bold mt-1">
                  •
                </span>
                <span>
                  <strong>Design Templates:</strong> Share these with
                  your design team to ensure deliverables meet our
                  technical specifications.
                </span>
              </li>
            </ul>
          </CardBody>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <h2 className="text-xl font-semibold text-gray-800">
              Need Additional Resources?
            </h2>
          </CardHeader>
          <CardBody>
            <p className="text-gray-600 mb-4">
              Can't find what you're looking for? Our partner support
              team is here to help. Contact us to request additional
              materials or schedule a training session.
            </p>
            <Button
              className="w-full justify-center"
              style={{
                backgroundColor: 'var(--primary-color, #E79023)',
                color: 'white',
              }}
              onPress={() =>
                window.open(
                  'mailto:partners@voyagervrlab.co.uk?subject=Resource%20Request'
                )
              }
            >
              Request Custom Resources
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
