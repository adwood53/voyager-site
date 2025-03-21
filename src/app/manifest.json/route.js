// src/app/manifest.json/route.js
import { NextResponse } from 'next/server';
import manifest from '../manifest';

export async function GET() {
  const response = NextResponse.json(manifest());

  // Firefox requires the correct content type for manifest files
  response.headers.set('Content-Type', 'application/manifest+json');
  response.headers.set('Cache-Control', 'max-age=604800'); // Cache for a week

  return response;
}
