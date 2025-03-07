// src/middleware.js - updated
import { clerkMiddleware, getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware({
  publicRoutes: [
    '/',
    '/blog(.*)',
    '/sign-in(.*)',
    '/sign-up(.*)', // Added sign-up to public routes
    '/api/webhooks(.*)',
    '/studio(.*)',
  ],
  afterAuth(auth, req) {
    // Extract the pathname from the URL
    const url = new URL(req.url);
    const path = url.pathname;

    // Handle invitation acceptance redirects
    if (
      auth.isSignedIn &&
      (path.includes('/sign-up') || path.includes('/verification'))
    ) {
      return NextResponse.redirect(new URL('/partner', req.url));
    }

    // If the user is signed in and tries to access the sign-in page, redirect to partner
    if (auth.isSignedIn && path.includes('/sign-in')) {
      return NextResponse.redirect(new URL('/partner', req.url));
    }

    // If the route is protected and the user isn't signed in, redirect to sign-in
    if (!auth.isPublicRoute && !auth.userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  },
});

// Use the simplest pattern that's officially supported
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
