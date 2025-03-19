// src/app/robots.js
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/blog'],
      disallow: ['/studio', '/partner'], // Add any private paths
    },
    sitemap: 'https://www.voyagervrlab.co.uk/sitemap.xml',
  };
}
