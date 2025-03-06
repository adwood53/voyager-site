// src/app/components/dashboard/AdminProtectedSection.js
'use client';

import { Protect } from '@clerk/nextjs';
import AdminDashboard from './panels/AdminDashboard';

export default function AdminProtectedSection() {
  return (
    <Protect
      condition={(auth) => {
        // Check for admin or owner role
        return auth.has({ role: ['admin', 'org:admin', 'owner'] });
      }}
      fallback={
        <div>You don't have permission to view this content</div>
      }
    >
      <AdminDashboard />
    </Protect>
  );
}
