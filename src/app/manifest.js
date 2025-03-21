// src/app/manifest.js
export default function manifest() {
  return {
    name: 'Voyager Partner',
    short_name: 'vPartner',
    description:
      'Manage your immersive technology projects and white-label resources',
    start_url: '/partner',
    id: '/partner',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    categories: ['business', 'software'],
    orientation: 'any',
    icons: [
      {
        src: '/Voyager-Box-Logo-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/Voyager-Box-Logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/Voyager-Box-Logo-maskable.png', // You'll need to create this maskable icon
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: '/screenshots/partner-screenshot.png', // You'll need to create these screenshot files
        sizes: '1280x720',
        type: 'image/png',
        platform: 'wide',
        label: 'Dashboard view of Voyager Partner Portal',
      },
    ],
  };
}
