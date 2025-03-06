// src/app/partner/page.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useFirebase } from '@/src/contexts/FirebaseContext';
import PartnerLayout from '@/src/app/components/PartnerLayout';

export default function Partner() {
  const { user, isSignedIn, isLoaded } = useUser();
  const { organization: firestoreOrg, loading } = useFirebase();
  const router = useRouter();

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  // If still loading, return null
  if (!isLoaded || loading) {
    return null;
  }

  // Dashboard items with icons and descriptions
  const dashboardItems = [
    {
      icon: '📊',
      title: 'Project Calculator',
      description:
        'Calculate project costs and generate proposals for your clients',
      href: '/partner/calculator',
    },
    {
      icon: '📁',
      title: 'Project Manager',
      description: 'View and manage your existing immersive projects',
      href: '/partner/projects',
    },
    {
      icon: '🛠️',
      title: 'Sales Toolkit',
      description:
        'Access your white-label sales and marketing materials',
      href: '/partner/resources',
    },
    {
      icon: '👥',
      title: 'Team Settings',
      description:
        'Manage your team members, permissions, and organization settings',
      href: '/partner/team',
    },
  ];

  return (
    <PartnerLayout
      pageTitle={`Welcome, ${user?.firstName || 'Partner'}`}
      pageDescription="Manage your immersive technology projects and white-label resources"
    >
      <div className="grid md:grid-cols-2 gap-6">
        {dashboardItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all group"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl">
                {item.icon}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h2>
                <p className="text-gray-500 mt-2">
                  {item.description}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </PartnerLayout>
  );
}
