/**
 * File: middleware.js
 * Author: Anthony Woodward MSc
 * Description: Basic Auth middleware to protect /studio route.
 */

import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Only protect routes that start with /studio
  if (pathname.startsWith('/studio')) {
    const authHeader = request.headers.get('authorization');
    const basicAuth = authHeader?.split(' ') || [];

    if (basicAuth[0] !== 'Basic' || !basicAuth[1]) {
      return new NextResponse('Unauthorized', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
      });
    }

    // Decode base64 username:password
    const decoded = atob(basicAuth[1]);
    const [username, password] = decoded.split(':');

    // Compare with environment variables or hardcoded credentials
    const validUser = username === process.env.STUDIO_USERNAME;
    const validPass = password === process.env.STUDIO_PASSWORD;

    if (!validUser || !validPass) {
      return new NextResponse('Unauthorized', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
      });
    }
  }

  // If everything checks out or if route doesn't start with /studio, continue
  return NextResponse.next();
}
