'use client';
import React from 'react';
import { NextStudio } from 'next-sanity/studio';
import studioConfig from '@/sanity.config'; // Adjust the import path as needed

export default function StudioPage() {
  return <NextStudio config={studioConfig} />;
}
