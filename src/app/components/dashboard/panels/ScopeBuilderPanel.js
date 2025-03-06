'use client';

import { Card, CardBody, CardHeader, Button } from '@heroui/react';

export default function ScopeBuilderPanel() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Scope Builder
        </h1>
        <p className="text-gray-600">
          Create and manage project scopes for your clients
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-800">
            Getting Started
          </h2>
        </CardHeader>
        <CardBody>
          <p className="mb-6 text-gray-600">
            The Scope Builder tool helps you create detailed project
            scopes and proposals for your clients. This feature will
            be available soon.
          </p>

          <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="text-lg font-medium text-blue-800 mb-2">
              Coming Soon
            </h3>
            <p className="text-blue-700">
              We&apos;re currently developing this feature. Check back
              later for updates!
            </p>
          </div>

          <div className="mt-6">
            <Button
              color="primary"
              style={{
                backgroundColor: 'var(--primary-color, #2563EB)',
                color: '#FFFFFF',
              }}
              onClick={() =>
                (window.location.href =
                  'mailto:projects@voyagervrlab.co.uk?subject=Project%20Scope%20Request')
              }
              disabled={false}
            >
              Contact for Scope Creation
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-800">
            Features Preview
          </h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="mb-3 text-xl font-semibold text-gray-500">
                1️⃣
              </div>
              <h3 className="font-medium mb-2 text-gray-800">
                Project Templates
              </h3>
              <p className="text-sm text-gray-600">
                Start from pre-built templates for common project
                types.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="mb-3 text-xl font-semibold text-gray-500">
                2️⃣
              </div>
              <h3 className="font-medium mb-2 text-gray-800">
                Custom Pricing
              </h3>
              <p className="text-sm text-gray-600">
                Adjust pricing based on project complexity and
                requirements.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="mb-3 text-xl font-semibold text-gray-500">
                3️⃣
              </div>
              <h3 className="font-medium mb-2 text-gray-800">
                Client Sharing
              </h3>
              <p className="text-sm text-gray-600">
                Share proposals with clients directly from the
                dashboard.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
