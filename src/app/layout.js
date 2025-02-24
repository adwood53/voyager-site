/**
 * File: src/app/layout.js
 */
import React from 'react';
import './globals.css';
import Script from 'next/script';
import { Providers } from './utils/providers';

const SITE_NAME = 'Social Innovation People';
const BASE_URL = 'https://www.socialinnovationpeople.co.uk';
const OG_IMAGE_URL = `${BASE_URL}/logo.png`;
const TWITTER_HANDLE = '@YourTwitterHandle';

export const metadata = {
  title: 'Social Innovation Accelerator',
  description:
    'Empowering Social Innovation in Leicester and beyond.',
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Social Innovation Accelerator – Social Innovation People',
    description:
      'Join our Accelerator to tackle systemic social challenges in Leicester and beyond.',
    url: BASE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Social Innovation People - Accelerator Program',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Social Innovation Accelerator – Social Innovation People',
    description:
      'Join our Accelerator to tackle systemic social challenges in Leicester and beyond.',
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    images: [OG_IMAGE_URL],
  },
  // Icons/favicons, etc.
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  'theme-color': '#FF3C00',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <Script strategy="afterInteractive" id="ga-script">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
