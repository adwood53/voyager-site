'use client';

import { OrganizationSwitcher } from '@clerk/nextjs';

export default function CustomOrganizationSwitcher() {
  return (
    <OrganizationSwitcher
      appearance={{
        elements: {
          rootBox: 'w-full',
          organizationSwitcherTrigger:
            'text-textLight hover:text-primary py-2 px-3 rounded-md border border-primary border-opacity-10 hover:border-opacity-30 transition-all duration-300 w-full flex justify-between',
          organizationPreviewTextContainer: 'text-textLight',
          organizationSwitcherPopoverCard:
            'bg-darkCard border border-primary border-opacity-20 rounded-md shadow-glow-sm',
          organizationSwitcherPopoverActions: 'text-textLight',
          organizationPreviewSecondaryIdentifier:
            'text-primary text-opacity-80',
          organizationSwitcherPopoverActionButton:
            'hover:bg-primary hover:bg-opacity-10 text-textLight',
          organizationPreviewMainIdentifier: 'text-textLight',
          organizationPreview: 'hover:bg-primary hover:bg-opacity-10',
        },
      }}
      hidePersonal={true}
      organizationProfileUrl="/partner/organization"
      createOrganizationUrl="/partner/create-organization"
      afterCreateOrganizationUrl="/partner"
      afterSelectOrganizationUrl="/partner"
      afterLeaveOrganizationUrl="/partner"
    />
  );
}
