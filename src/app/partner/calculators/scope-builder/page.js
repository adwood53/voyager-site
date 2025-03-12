// src/app/partner/calculators/scope-builder/page.js

'use client';

import { useState, useEffect } from 'react';
import { useUser, useOrganization } from '@clerk/nextjs';
import CalculatorContainer from '@/app/components/calculators/CalculatorContainer';

// Import schema
import scopeBuilderSchema from '@/utils/schemas/scopeBuilder';

export default function ScopeBuilderPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, isSignedIn, isLoaded: userLoaded } = useUser();
  const { organization, isLoaded: orgLoaded } = useOrganization();

  // Wait for user and organization data to load
  useEffect(() => {
    if (userLoaded && orgLoaded) {
      setIsLoading(false);
    }
  }, [userLoaded, orgLoaded]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">
          Project Scope Builder
        </h1>
        <p className="text-gray-700">
          Use this tool to build a comprehensive scope for your
          project and get recommendations on the right products and
          services for your needs.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <CalculatorContainer
          schema={scopeBuilderSchema}
          calculatorType="scope-builder"
          includeHubspot={false} // Scope builder doesn't submit to HubSpot
        />
      </div>
    </div>
  );
}
