'use client';

import { Card, CardBody, CardHeader, Button } from '@heroui/react';

export default function HomePanel() {
  const features = [
    {
      id: 'scope-builder',
      title: 'Scope Builder',
      description:
        'Create and manage project scopes, quotes, and proposals for your clients',
      icon: '📄',
      color: '#3B82F6',
    },
    {
      id: 'productions',
      title: 'Productions',
      description:
        'Book our virtual production studio for your client projects',
      icon: '🎬',
      color: '#10B981',
    },
    {
      id: 'merchandise',
      title: 'Merchandise',
      description:
        'Browse and order branded merchandise for your clients',
      icon: '🛍️',
      color: '#F59E0B',
    },
    {
      id: 'settings',
      title: 'Settings',
      description:
        'Configure your account, organisation, and preferences',
      icon: '⚙️',
      color: '#6366F1',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome to Your Partner Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your projects, access resources, and collaborate with
          our team through this central hub.
        </p>
      </div>

      {/* Dashboard features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {features.map((feature) => (
          <Card
            key={feature.id}
            className="hover:shadow-md transition-shadow"
          >
            <CardHeader className="flex gap-3">
              <div
                className="p-2 rounded-full"
                style={{ backgroundColor: `${feature.color}20` }}
              >
                <span
                  className="text-2xl"
                  style={{ color: feature.color }}
                >
                  {feature.icon}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {feature.title}
                </h2>
              </div>
            </CardHeader>
            <CardBody className="pt-0">
              <p className="text-gray-600">{feature.description}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Getting started section */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-2xl font-semibold text-gray-800">
            Getting Started
          </h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4 text-gray-600">
            <p>
              Welcome to the Voyager Partner Portal! As a partner, you
              have access to powerful tools to help you deliver
              immersive experiences to your clients. Here&apos;s how
              to get started:
            </p>

            <ol className="list-decimal list-inside space-y-2 pl-4">
              <li>
                <strong className="text-gray-800">
                  Explore the Dashboard:
                </strong>{' '}
                Get familiar with the navigation tabs to access
                different features.
              </li>
              <li>
                <strong className="text-gray-800">
                  Create Your First Scope:
                </strong>{' '}
                Start by creating a project scope to generate a quote
                for your client.
              </li>
              <li>
                <strong className="text-gray-800">
                  Book Studio Time:
                </strong>{' '}
                Schedule time in our virtual production studio for
                your projects.
              </li>
              <li>
                <strong className="text-gray-800">
                  Customise Your Profile:
                </strong>{' '}
                Update your organisation information to personalise
                your experience.
              </li>
            </ol>

            <p className="mt-4">
              Need help? Contact your Voyager representative at{' '}
              <a
                href="mailto:support@voyagervrlab.co.uk"
                className="text-blue-600 hover:underline"
              >
                support@voyagervrlab.co.uk
              </a>
              .
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
