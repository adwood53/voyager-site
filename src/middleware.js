// src/middleware.js - updated
import { clerkMiddleware, getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware({
  publicRoutes: [
    '/',
    '/blog(.*)',
    '/sign-in(.*)',
    '/api/webhooks(.*)',
    '/studio(.*)',
  ],
  afterAuth(auth, req) {
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
