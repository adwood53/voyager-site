// src/app/robots.js
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/blog',
        '/about-us',
        '/our-code',
        '/terms',
        '/privacy',
        '/bug-report',
      ],
      disallow: [
        '/studio',
        '/partner',
        '/_next/',
        '/api/',
        '/about-us.html',
        '/green-screen-productions.html',
      ], // Add any private paths
    },
    sitemap: 'https://www.voyagervrlab.co.uk/sitemap.xml',
    content: 'all',
  };
}
