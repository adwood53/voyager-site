// src/app/components/dashboard/panels/HomePanel.js
'use client';

import { Card, CardBody, CardHeader, Button } from '@heroui/react';
import { useUser, useOrganization } from '@clerk/nextjs';
import { useFirebase } from '@/src/contexts/FirebaseContext';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePanel() {
  const { user } = useUser();
  const { organization } = useOrganization();
  const { organization: firestoreOrg } = useFirebase();

  // Get organization name from either Firebase or Clerk
  const orgName =
    firestoreOrg?.name ||
    organization?.name ||
    'Partner Organisation';

  // Features for dashboard cards
  const features = [
    {
      id: 'scope-builder',
      title: 'Scope Builder',
      description:
        'Create and manage project scopes, quotes, and proposals for your clients',
      icon: '📄',
      color: '#3B82F6',
      route: 'scope-builder',
    },
    {
      id: 'productions',
      title: 'Studio Bookings',
      description:
        'Book our virtual production studio for your client projects',
      icon: '🎬',
      color: '#10B981',
      route: 'productions',
    },
    {
      id: 'merchandise',
      title: 'Interactive Merchandise',
      description:
        'Order branded AR business cards, posters, and marketing materials',
      icon: '🛍️',
      color: '#F59E0B',
      route: 'merchandise',
    },
    {
      id: 'resources',
      title: 'Partner Resources',
      description:
        'Access sales tools, design templates, and technical documents',
      icon: '📚',
      color: '#6366F1',
      route: 'resources',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome back, {user?.firstName || 'Partner'}
            </h1>
            <p className="text-gray-600">
              Your {orgName} partner dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Dashboard features */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Quick Access
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.id}
              className="border border-gray-200 hover:shadow-md transition-all hover:border-primary/30 cursor-pointer"
            >
              <CardBody>
                <div className="flex flex-col h-full">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                    style={{
                      backgroundColor: `${feature.color}20`,
                      color: feature.color,
                    }}
                  >
                    <span className="text-2xl">{feature.icon}</span>
                  </div>

                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: feature.color }}
                  >
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 mb-4 flex-grow">
                    {feature.description}
                  </p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Getting started section */}
      <Card className="mb-8 border border-gray-200">
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
                href="mailto:connect@voyagervrlab.co.uk"
                className="text-blue-600 hover:underline"
                style={{ color: 'var(--primary-color, #2563EB)' }}
              >
                connect@voyagervrlab.co.uk
              </a>
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
