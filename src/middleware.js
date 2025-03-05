// src/middleware.js
import { clerkMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: [
    '/',
    '/blog(.*)',
    '/sign-in(.*)',
    '/api/webhook(.*)',
    '/studio(.*)',
  ],
  // Enable organization features
  tokenVerificationClaims: ['org_id', 'org_role', 'org_slug'],
});

export const config = {
  matcher: ['/((?!_next|public|favicon.ico|assets).*)'],
};
