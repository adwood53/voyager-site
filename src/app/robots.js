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
      ],
      disallow: ['/studio', '/partner', '/_next/', '/api/'], // Add any private paths
    },
    sitemap: 'https://www.voyagervrlab.co.uk/sitemap.xml',
    content: 'all',
  };
}
