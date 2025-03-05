// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io', 'firebasestorage.googleapis.com'],
  },
  // Enable custom domains/subdomains
  async rewrites() {
    return [
      // Rewrite subdomain.voyagervrlab.co.uk to the appropriate handler
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: '(?<subdomain>[^.]+).voyagervrlab.co.uk',
          },
        ],
        destination: '/:subdomain/:path*',
      },
      // Special case for partner login from subdomain
      {
        source: '/partner/:path*',
        has: [
          {
            type: 'host',
            value: '(?<subdomain>[^.]+).voyagervrlab.co.uk',
          },
        ],
        destination: '/partner/:path*?subdomain=:subdomain',
      },
    ];
  },
  // Handle redirects for common paths
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/partner',
        permanent: true,
      },
      {
        source: '/signin',
        destination: '/sign-in',
        permanent: true,
      },
    ];
  },
};
