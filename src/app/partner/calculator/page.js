'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Link,
} from '@heroui/react';
import PartnerNavbar from '@/src/app/components/PartnerNavbar';
import { useFirebase } from '@/src/contexts/FirebaseContext';
import Image from 'next/image';

export default function ProjectCalculator() {
  const { user, isSignedIn, isLoaded } = useUser();
  const { organization: firestoreOrg, loading } = useFirebase();
  const router = useRouter();

  // Simple form state
  const [projectType, setProjectType] = useState('ar');
  const [audienceSize, setAudienceSize] = useState('small');
  const [complexity, setComplexity] = useState('simple');
  const [calculatedPrice, setCalculatedPrice] = useState(null);

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  // If still loading, show loading state
  if (!isLoaded || loading || !user) {
    return (
      <div className="min-h-screen bg-darkBg flex flex-col items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-20 h-20 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-primary animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <p className="text-textLight">Loading calculator...</p>
        </div>
      </div>
    );
  }

  // Get organization details
  const orgName = firestoreOrg?.name || 'Partner Organization';
  const orgLogo = firestoreOrg?.logo || '/Voyager-Box-Logo.png';

  // Simple calculation function
  const calculatePrice = () => {
    let basePrice = 0;

    // Base price by project type
    switch (projectType) {
      case 'ar':
        basePrice = 5000;
        break;
      case 'vr':
        basePrice = 8000;
        break;
      case 'studio':
        basePrice = 2500;
        break;
      case 'event':
        basePrice = 7000;
        break;
      default:
        basePrice = 5000;
    }

    // Audience size multiplier
    let audienceMultiplier = 1;
    switch (audienceSize) {
      case 'small':
        audienceMultiplier = 1;
        break;
      case 'medium':
        audienceMultiplier = 1.5;
        break;
      case 'large':
        audienceMultiplier = 2;
        break;
      default:
        audienceMultiplier = 1;
    }

    // Complexity multiplier
    let complexityMultiplier = 1;
    switch (complexity) {
      case 'simple':
        complexityMultiplier = 1;
        break;
      case 'moderate':
        complexityMultiplier = 1.5;
        break;
      case 'complex':
        complexityMultiplier = 2.25;
        break;
      default:
        complexityMultiplier = 1;
    }

    // Calculate total price
    const totalPrice =
      basePrice * audienceMultiplier * complexityMultiplier;

    // Calculate partner commission (15%)
    const partnerCommission = totalPrice * 0.15;

    setCalculatedPrice({
      total: totalPrice,
      commission: partnerCommission,
      netVoyager: totalPrice - partnerCommission,
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-darkBg flex flex-col">
      {/* Organization branding header */}
      <header className="w-full p-4 bg-darkCard border-b border-primary border-opacity-20">
        <div className="container mx-auto flex justify-between items-center">
          {/* Organization logo */}
          <div className="flex items-center">
            <Image
              src={orgLogo}
              alt={orgName}
              width={40}
              height={40}
              className="rounded-md mr-3"
            />
            <span className="text-lg font-heading text-textLight">
              {orgName}
            </span>
          </div>

          {/* Voyager logo */}
          <div className="flex items-center">
            <span className="text-textLight opacity-70 mr-2 hidden sm:inline">
              Powered by
            </span>
            <Image
              src="/Voyager-Box-Logo.png"
              alt="Voyager"
              width={36}
              height={36}
              className="rounded-md"
            />
            <span className="text-primary font-heading ml-2">
              VOYAGER
            </span>
          </div>
        </div>
      </header>

      {/* Partner portal navigation */}
      <PartnerNavbar orgDetails={firestoreOrg} />

      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="container mx-auto">
          <Card className="card-voyager bg-darkCard border border-primary border-opacity-20 hover:border-opacity-40 max-w-4xl mx-auto">
            <CardHeader className="border-b border-primary border-opacity-10 pb-4">
              <div className="flex justify-between items-center">
                <h1 className="heading-voyager text-2xl md:text-3xl text-primary">
                  Project Calculator
                </h1>
                <div className="text-right">
                  <p className="text-textLight opacity-80 text-sm">
                    Calculate project costs and commission
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-textLight opacity-80 mb-6">
                Use this simple calculator to estimate project costs
                for your clients. You&#39;ll earn 15% commission on
                all projects.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Project Type */}
                <div>
                  <label className="block text-textLight mb-2">
                    Project Type
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-3 py-2 bg-darkBg text-textLight rounded-md border border-primary border-opacity-30 focus:outline-none focus:border-opacity-70"
                  >
                    <option value="ar">
                      Augmented Reality Campaign
                    </option>
                    <option value="vr">
                      Virtual Reality Experience
                    </option>
                    <option value="studio">Studio Production</option>
                    <option value="event">Virtual Event</option>
                  </select>
                </div>

                {/* Audience Size */}
                <div>
                  <label className="block text-textLight mb-2">
                    Audience Size
                  </label>
                  <select
                    value={audienceSize}
                    onChange={(e) => setAudienceSize(e.target.value)}
                    className="w-full px-3 py-2 bg-darkBg text-textLight rounded-md border border-primary border-opacity-30 focus:outline-none focus:border-opacity-70"
                  >
                    <option value="small">
                      Small (1-100 people)
                    </option>
                    <option value="medium">
                      Medium (101-500 people)
                    </option>
                    <option value="large">Large (500+ people)</option>
                  </select>
                </div>

                {/* Project Complexity */}
                <div>
                  <label className="block text-textLight mb-2">
                    Project Complexity
                  </label>
                  <select
                    value={complexity}
                    onChange={(e) => setComplexity(e.target.value)}
                    className="w-full px-3 py-2 bg-darkBg text-textLight rounded-md border border-primary border-opacity-30 focus:outline-none focus:border-opacity-70"
                  >
                    <option value="simple">
                      Simple (Basic features)
                    </option>
                    <option value="moderate">
                      Moderate (Standard features)
                    </option>
                    <option value="complex">
                      Complex (Advanced features)
                    </option>
                  </select>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <Button
                  onClick={calculatePrice}
                  className="bg-primary text-textLight font-medium hover:bg-accent px-6 py-3 rounded-md transition-all hover:shadow-glow"
                >
                  Calculate Project Cost
                </Button>
              </div>

              {/* Results */}
              {calculatedPrice && (
                <div className="mt-8 p-6 bg-darkBg rounded-lg border border-primary border-opacity-20">
                  <h2 className="text-xl text-primary mb-4">
                    Project Estimate
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="p-4 bg-darkCard rounded-lg text-center">
                      <p className="text-textLight opacity-60 text-sm mb-1">
                        Total Project Cost
                      </p>
                      <p className="text-2xl text-primary font-bold">
                        {formatCurrency(calculatedPrice.total)}
                      </p>
                    </div>

                    <div className="p-4 bg-darkCard rounded-lg text-center">
                      <p className="text-textLight opacity-60 text-sm mb-1">
                        Your Commission (15%)
                      </p>
                      <p className="text-2xl text-primary font-bold">
                        {formatCurrency(calculatedPrice.commission)}
                      </p>
                    </div>

                    <div className="p-4 bg-darkCard rounded-lg text-center">
                      <p className="text-textLight opacity-60 text-sm mb-1">
                        Voyager Net
                      </p>
                      <p className="text-2xl text-primary font-bold">
                        {formatCurrency(calculatedPrice.netVoyager)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <Button className="bg-primary text-textLight font-medium hover:bg-accent px-6 py-2 rounded-md transition-all hover:shadow-glow mr-4">
                      Create Proposal
                    </Button>
                    <Button
                      className="border border-primary text-primary hover:bg-primary hover:bg-opacity-10 px-6 py-2 rounded-md transition-all"
                      onClick={() => setCalculatedPrice(null)}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              )}
            </CardBody>
            <CardFooter className="border-t border-primary border-opacity-10 pt-4 text-center text-textLight opacity-60 text-sm">
              This is a simplified calculator for demonstration
              purposes only.
              <br />
              Contact Voyager support for detailed quotes and custom
              requirements.
            </CardFooter>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full p-4 bg-darkCard border-t border-primary border-opacity-20">
        <div className="container mx-auto text-center text-textLight opacity-60 text-sm">
          &copy; {new Date().getFullYear()} Voyager. All rights
          reserved.
        </div>
      </footer>
    </div>
  );
}
