// src/app/components/OrganizationSwitcher.js
'use client';

import { OrganizationSwitcher } from '@clerk/nextjs';

export default function CustomOrganizationSwitcher() {
  return (
    <OrganizationSwitcher
      appearance={{
        elements: {
          organizationSwitcherTrigger:
            'text-textLight hover:text-primary py-2',
          organizationPreviewTextContainer: 'text-textLight',
          organizationSwitcherPopoverCard:
            'bg-darkCard border border-primary border-opacity-20',
        },
      }}
    />
  );
}
