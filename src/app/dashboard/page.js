// src/app/dashboard/page.js
import { currentUser, useOrganization } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { Card, CardBody, CardHeader } from '@heroui/react';
import PartnerNavbar from '@/src/app/components/PartnerNavbar';
import { getOrgDetails } from '@/src/lib/organizations';

export default async function Dashboard() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  // Get organization details from hostname or URL parameters
  const orgDetails = await getOrgDetails();

  return (
    <div className="min-h-screen bg-darkBg flex flex-col">
      {/* Organization branding header */}
      <header className="w-full p-4 bg-darkCard border-b border-primary border-opacity-20">
        <div className="container mx-auto flex justify-between items-center">
          {/* Organization logo */}
          {orgDetails?.logo && (
            <div>
              <Image
                src={orgDetails.logo}
                alt={orgDetails.name || 'Partner'}
                width={180}
                height={60}
                className="object-contain"
              />
            </div>
          )}

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
      <PartnerNavbar orgDetails={orgDetails} />

      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="container mx-auto">
          <Card className="card-voyager bg-darkCard border border-primary border-opacity-20 hover:border-opacity-40">
            <CardHeader className="border-b border-primary border-opacity-10 pb-4">
              <div className="flex justify-between items-center">
                <h1 className="heading-voyager text-2xl md:text-3xl text-primary">
                  Welcome,{' '}
                  {user.firstName || user.username || 'Partner'}
                </h1>
                <div className="text-right">
                  <p className="text-textLight opacity-80">
                    {orgDetails?.name || 'Partner Organization'}
                  </p>
                  <p className="text-primary text-sm">
                    {user.organizationMemberships[0]?.role ||
                      'Member'}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-textLight opacity-80 mb-6">
                This is your organization's Voyager portal. From here
                you can manage your immersive projects and access your
                white-label resources.
              </p>

              {/* Dashboard content - customize as needed */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-darkBg p-4 rounded-md border border-primary border-opacity-10 hover:border-opacity-30 transition-all">
                  <h2 className="text-xl text-primary mb-2">
                    Your Projects
                  </h2>
                  <p className="text-textLight opacity-70">
                    View and manage your immersive projects
                  </p>
                </div>

                <div className="bg-darkBg p-4 rounded-md border border-primary border-opacity-10 hover:border-opacity-30 transition-all">
                  <h2 className="text-xl text-primary mb-2">
                    Resources
                  </h2>
                  <p className="text-textLight opacity-70">
                    Access your sales toolkit and marketing materials
                  </p>
                </div>

                <div className="bg-darkBg p-4 rounded-md border border-primary border-opacity-10 hover:border-opacity-30 transition-all">
                  <h2 className="text-xl text-primary mb-2">Team</h2>
                  <p className="text-textLight opacity-70">
                    Manage your team members and permissions
                  </p>
                </div>
              </div>
            </CardBody>
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
