'use client';

import { Card, CardBody, CardHeader, Button } from '@heroui/react';

export default function MerchandisePanel() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Merchandise
        </h1>
        <p className="text-gray-600">
          Browse and order branded merchandise for your clients
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-800">
            Merchandise Catalogue
          </h2>
        </CardHeader>
        <CardBody>
          <p className="mb-6 text-gray-600">
            Order branded merchandise for your clients with your
            organisation&apos;s branding. This feature will be
            available soon.
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
                  'mailto:merchandise@voyagervrlab.co.uk?subject=Merchandise%20Inquiry')
              }
            >
              Contact for Merchandise
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-800">
            Available Products
          </h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-5xl">👕</span>
              </div>
              <h3 className="font-medium mb-2 text-gray-800">
                Branded T-Shirts
              </h3>
              <p className="text-sm text-gray-600">
                Custom printed t-shirts with your organisation&apos;s
                logo.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-5xl">📇</span>
              </div>
              <h3 className="font-medium mb-2 text-gray-800">
                Business Cards
              </h3>
              <p className="text-sm text-gray-600">
                Interactive AR-enabled business cards for your team.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-5xl">📄</span>
              </div>
              <h3 className="font-medium mb-2 text-gray-800">
                Marketing Materials
              </h3>
              <p className="text-sm text-gray-600">
                Brochures, flyers, and other promotional materials.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
