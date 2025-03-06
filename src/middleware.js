// src/middleware.js
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  publicRoutes: [
    '/',
    '/blog(.*)',
    '/sign-in(.*)',
    '/api/webhook(.*)',
    '/studio(.*)',
  ],
});

// Use the simplest pattern that's officially supported
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
