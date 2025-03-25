// src/app/layout.js
import { Quicksand } from 'next/font/google';
import localFont from 'next/font/local';
import React from 'react';
import './globals.css';
import Script from 'next/script';
import ClientWrapper from '@/src/app/components/ClientWrapper';
import Analytics from '@/src/app/components/Analytics';

const SITE_NAME = 'Voyager';
const BASE_URL = 'https://www.voyagervrlab.co.uk';
const OG_IMAGE_URL = `${BASE_URL}/Voyager-Box-Logo.png`;
const TWITTER_HANDLE = '@YourTwitterHandle';

// Define fonts
const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const labora = localFont({
  src: [
    {
      path: '../../public/fonts/Labora-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Labora-Italic.otf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata = {
  title: 'Voyager Immersive - AR, VR & Interactive Experiences',
  description:
    'Expand your services, elevate your brand, and earn more with our white label immersive technology solutions. Specialists in AR, VR, and interactive experiences.',
  keywords:
    'white label, immersive technology, AR, VR, virtual events, partner program, studio access, voyager vr lab',
  metadataBase: new URL(BASE_URL),
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Voyager Immersive',
    description:
      'Expand your services, elevate your brand, and earn more with our white label immersive technology solutions.',
    url: BASE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Voyager Immersive',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Voyager Immersive',
    description:
      'Expand your services, elevate your brand, and earn more with our white label immersive technology solutions.',
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    images: [OG_IMAGE_URL],
  },
  // Icons/favicons, etc.
  icons: {
    icon: [
      { url: './favicon.ico', sizes: '128x128' }, // Updated path
    ],
    apple: [
      { url: './favicon.ico' }, // Updated path
    ],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  'theme-color': '#FF3C00',
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Voyager VR Lab',
    url: 'https://www.voyagervrlab.co.uk',
    logo: 'https://www.voyagervrlab.co.uk/Voyager-Box-Logo.png',
    description:
      'Expand your services, elevate your brand, and earn more with our white label immersive technology solutions.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'The Hub, 58a Granby St',
      addressLocality: 'Leicester',
      postalCode: 'LE1 1DH',
      addressCountry: 'UK',
    },
    telephone: '+447470361585',
    email: 'connect@voyagervrlab.co.uk',
  };

  return (
    <html lang="en-GB">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        <meta name="googlebot" content="all" />
      </head>
      <body
        className={`${quicksand.variable} ${labora.variable} font-body`}
      >
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
