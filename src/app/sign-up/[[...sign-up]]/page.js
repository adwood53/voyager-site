// src/app/sign-up/[[...sign-up]]/page.js
'use client';

import { SignUp } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();

  // Auto-redirect to partner if user arrives directly at this page
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      // Only redirect if they're not coming from Clerk invitation flow
      if (!url.searchParams.has('__clerk_ticket')) {
        router.push('/partner');
      }
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-darkBg">
      <SignUp redirectUrl="/partner" />
    </div>
  );
}
