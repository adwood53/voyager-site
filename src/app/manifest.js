export default function manifest() {
  return {
    name: 'Voyager Partner',
    short_name: 'vPartner',
    description:
      'Manage your immersive technology projects and white-label resources',
    start_url: '/partner',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/Voyager-Box-Logo-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/Voyager-Box-Logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
