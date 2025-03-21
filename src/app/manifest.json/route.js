// src/app/manifest.json/route.js
import { NextResponse } from 'next/server';
import manifest from '../manifest';

export async function GET() {
  const response = NextResponse.json(manifest());

  // Add these headers to ensure proper handling by Firefox
  response.headers.set('Content-Type', 'application/manifest+json');
  response.headers.set('Cache-Control', 'no-cache');

  return response;
}
