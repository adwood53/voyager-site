/**
 * File: src/lib/sanity.js
 * Author: Anthony Woodward MSc
 * Description: Sets up the Sanity client for data fetching.
 */

import { createClient } from 'next-sanity';

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2023-02-16',
};

export const sanityClient = createClient(sanityConfig);
