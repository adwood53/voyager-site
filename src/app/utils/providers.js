'use client';
import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { HeroUIProvider } from '@heroui/react';

export function Providers({ children }) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}
