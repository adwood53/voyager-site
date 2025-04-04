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
      bgColor: '#EFF6FF', // Light blue background
      description:
        'Comprehensive presentation on becoming a successful Voyager partner.',
      type: 'presentation',
      fileType: 'Presentation',
      canvaUrl: 'https://www.canva.com/design/123456/view',
    },
    {
      id: 'vcard-pricing',
      title: 'vCard Pricing Rubric',
      icon: '💰',
      color: '#10B981', // Green
      bgColor: '#ECFDF5', // Light green background
      description:
        'Detailed breakdown of pricing structures for our vCard offerings.',
      type: 'pricing',
      fileType: 'Spreadsheet',
    },
    {
      id: 'demos',
      title: 'Demo Collection',
      icon: '🎮',
      color: '#F59E0B', // Amber
      bgColor: '#FFFBEB', // Light amber background
      description:
        'Access interactive demos to showcase to your clients.',
      type: 'demos',
      fileType: 'Interactive',
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
      bgColor: '#FCE7F3', // Light pink background
      description:
        'Templates for creating effective AR business cards.',
      type: 'templates',
      fileType: 'Templates',
      templates: [
        {
          name: 'NFC1000',
          url: 'https://www.canva.com/design/DAGjr3bX_lY/iXE8NQwA4BZ60dyNm-amqQ/edit?utm_content=DAGjr3bX_lY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
        {
          name: 'NFC1001',
          url: 'https://www.canva.com/design/DAGjr86cnIk/5ORDEfmbmwNZcTdkR6VWzg/edit?utm_content=DAGjr86cnIk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
        {
          name: 'NFC1002',
          url: 'https://www.canva.com/design/DAGjr4KNQQk/EU9SXQWhi2zyrJ73QNmWjQ/edit?utm_content=DAGjr4KNQQk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
        {
          name: 'NFC1003',
          url: 'https://www.canva.com/design/DAGjrx-ITUw/I1K4LSzQXGcREaE8966q9Q/edit?utm_content=DAGjrx-ITUw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
        {
          name: 'NFC1004',
          url: 'https://www.canva.com/design/DAGjr7DLQIg/MmhUi879ycyY0JT-gG73Vg/edit?utm_content=DAGjr7DLQIg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
        {
          name: 'NFC1005',
          url: 'https://www.canva.com/design/DAGjryGOhPs/G2qQSDyxL0KIN4bNrSzOiw/edit?utm_content=DAGjryGOhPs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
        {
          name: 'NFC1006',
          url: 'https://www.canva.com/design/DAGjr9MGHx8/8gS9rwqR1DShs-Mq6iKRQQ/edit?utm_content=DAGjr9MGHx8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
        {
          name: 'NFC1007',
          url: 'https://www.canva.com/design/DAGjry9_w7w/oksOMxOBF548Hxn1eazOdQ/edit?utm_content=DAGjry9_w7w&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
        {
          name: 'NFC1008',
          url: 'https://www.canva.com/design/DAGjr55aAzc/b9GXW-B5fH85G97JBtk7VQ/edit?utm_content=DAGjr55aAzc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
        {
          name: 'NFC1009',
          url: 'https://www.canva.com/design/DAGjr1lkEY0/yQTMMdzvN-3meEffQLvMuw/edit?utm_content=DAGjr1lkEY0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
        {
          name: 'NFC1010',
          url: 'https://www.canva.com/design/DAGjr5yI-zw/g3O4uTR4cxEQ5PdERUfpsA/edit?utm_content=DAGjr5yI-zw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
        {
          name: 'NFC1011',
          url: 'https://www.canva.com/design/DAGjrxBxqck/9WkQZLbRWU7eaK4mfG3Rew/edit?utm_content=DAGjrxBxqck&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
        {
          name: 'NFC1034',
          url: 'https://www.canva.com/design/DAGjryTMKFE/Wqq7fab9MOc24e5JLM2Rrw/edit?utm_content=DAGjryTMKFE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
        {
          name: 'NFC1035',
          url: 'https://www.canva.com/design/DAGjr-iIKU0/i3ml8u1VQa74xHVFbM_yKg/edit?utm_content=DAGjr-iIKU0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
        {
          name: 'NFC1036',
          url: 'https://www.canva.com/design/DAGjr55ItT0/S82e3JFC--ubBdpukonxKQ/edit?utm_content=DAGjr55ItT0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
        {
          name: 'NFC1037',
          url: 'https://www.canva.com/design/DAGjr6HNHDk/Dzt8XuRBLOP-lUAdbDF82A/edit?utm_content=DAGjr6HNHDk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
        {
          name: 'NFC1038',
          url: 'https://www.canva.com/design/DAGjr4WUsuI/xlhIgjBEtOaqHyiYEB1vag/edit?utm_content=DAGjr4WUsuI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
        {
          name: 'NFC1039',
          url: 'https://www.canva.com/design/DAGjr2DAlT4/gPxIZFkpG3Ad_IuPQFkbzA/edit?utm_content=DAGjr2DAlT4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
        {
          name: 'NFC1040',
          url: 'https://www.canva.com/design/DAGjr-63XuQ/Lcv05aLag7Of52EuAewerg/edit?utm_content=DAGjr-63XuQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
        {
          name: 'NFC1041',
          url: 'https://www.canva.com/design/DAGjr17CMm8/LvysQmSGprcOqyFnIjPLTA/edit?utm_content=DAGjr17CMm8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
        {
          name: 'NFC1042',
          url: 'https://www.canva.com/design/DAGjr4_g2ck/WmI3wpZ3sc99sOMZmk875g/edit?utm_content=DAGjr4_g2ck&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
        {
          name: 'NFC1043',
          url: 'https://www.canva.com/design/DAGjr3acdc8/G7OflnAdQ1JM3GJ0mnF1fQ/edit?utm_content=DAGjr3acdc8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
        {
          name: 'NFC1044',
          url: 'https://www.canva.com/design/DAGjrzEWyGI/5SWc6XtR4rnqh9ayq7cRZQ/edit?utm_content=DAGjrzEWyGI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
        {
          name: 'NFC1045',
          url: 'https://www.canva.com/design/DAGjr2Dkq90/7tAjy0RUGI6d8VLpLsDFnw/edit?utm_content=DAGjr2Dkq90&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
        {
          name: 'NFC1046',
          url: 'https://www.canva.com/design/DAGjr-vpi_Y/92HMxHaiNVWB_8SPPpue0g/edit?utm_content=DAGjr-vpi_Y&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
        {
          name: 'NFC1047',
          url: 'https://www.canva.com/design/DAGjr8fv3UE/ILCbuXTIokKbNMdZ7WBM8Q/edit?utm_content=DAGjr8fv3UE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
        {
          name: 'NFC1048',
          url: 'https://www.canva.com/design/DAGjr8TyM6U/eNQYpZk2bEM64AkrpvC_0w/edit?utm_content=DAGjr8TyM6U&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
        {
          name: 'NFC1049',
          url: 'https://www.canva.com/design/DAGjr8PticA/7k5BM5CXClzNyhbXrmiNtA/edit?utm_content=DAGjr8PticA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
        {
          name: 'NFC1050',
          url: 'https://www.canva.com/design/DAGjr_--Q-s/6BD0tk562-sZROG-SZzTqQ/edit?utm_content=DAGjr_--Q-s&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
        {
          name: 'NFC1051',
          url: 'https://www.canva.com/design/DAGjr-RwT-Y/7DZOutHTvvSoAi_1RY_mag/edit?utm_content=DAGjr-RwT-Y&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
        {
          name: 'NFC1052',
          url: 'https://www.canva.com/design/DAGjr052w7s/KoI08v-Io_8sO_a7lDj8nQ/edit?utm_content=DAGjr052w7s&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
        {
          name: 'NFC1053',
          url: 'https://www.canva.com/design/DAGjr1l-Qbs/ksQ5xJdcmny6NCRJJpcw7Q/edit?utm_content=DAGjr1l-Qbs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        },
      ],
    },
    {
      id: 'sales-scripts',
      title: 'Sales Scripts',
      icon: '📝',
      color: '#8B5CF6', // Purple
      bgColor: '#F5F3FF', // Light purple background
      description:
        'Ready-to-use scripts for pitching immersive tech to clients.',
      type: 'scripts',
      fileType: 'Document',
    },
    {
      id: 'case-studies',
      title: 'Case Studies',
      icon: '📊',
      color: '#EF4444', // Red
      bgColor: '#FEF2F2', // Light red background
      description:
        'Success stories and case studies to share with prospects.',
      type: 'case-studies',
      fileType: 'PDF',
    },
    {
      id: 'marketing-materials',
      title: 'Marketing Materials',
      icon: '📣',
      color: '#0EA5E9', // Sky blue
      bgColor: '#F0F9FF', // Light sky blue background
      description:
        'Brochures, social media assets, and marketing collateral.',
      type: 'marketing',
      fileType: 'Assets',
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

      {/* Resource Tiles Grid - Improved layout with fixed dimensions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <div key={resource.id} className="flex">
            <Card
              isPressable
              onPress={() => handleResourceClick(resource)}
              className="w-full border border-gray-200 shadow-sm overflow-hidden"
            >
              <div className="h-full flex flex-col">
                <div
                  className="p-10 flex flex-col items-center justify-center"
                  style={{ backgroundColor: resource.bgColor }}
                >
                  <span className="text-4xl mb-4">
                    {resource.icon}
                  </span>
                  <h3
                    className="text-xl font-semibold text-center"
                    style={{ color: resource.color }}
                  >
                    {resource.title}
                  </h3>
                </div>
                <div className="flex-grow bg-white p-4 flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {resource.fileType}
                  </span>
                  <span
                    className="text-sm font-medium flex items-center"
                    style={{ color: resource.color }}
                  >
                    Access <span className="ml-1">→</span>
                  </span>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* HeroUI Modal */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="5xl" // Extra large modal - easier to control size than setting custom width
        scrollBehavior="inside"
        classNames={{
          // Important styling overrides
          backdrop: 'bg-black/70 backdrop-blur-sm', // Semi-transparent black backdrop with blur
          base: 'w-[80%] max-w-[90vw] m-auto border-none rounded-lg shadow-xl', // Width control and proper margins
          wrapper:
            'fixed inset-0 z-50 flex items-center justify-center', // Center positioning
          body: 'bg-white p-6', // White background with padding
          header: 'bg-white border-b border-gray-200 p-6', // White background with border
          footer: 'bg-white border-t border-gray-200 p-6', // White background with border
          closeButton: 'text-gray-500 hover:text-gray-700',
        }}
        motionProps={{
          variants: {
            enter: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.3,
                ease: 'easeOut',
              },
            },
            exit: {
              opacity: 0,
              scale: 0.95,
              transition: {
                duration: 0.2,
                ease: 'easeIn',
              },
            },
          },
          initial: 'exit',
          animate: 'enter',
          exit: 'exit',
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
              <ModalBody className="bg-white">
                {renderModalContent()}
              </ModalBody>
              <ModalFooter className="bg-white">
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
