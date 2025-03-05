// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io', 'firebasestorage.googleapis.com'],
  },
  // Enable custom domains/subdomains
  async rewrites() {
    return {
      beforeFiles: [
        // Rewrite subdomain.voyagervrlab.co.uk to voyagervrlab.co.uk
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: '(?<subdomain>[^.]+).voyagervrlab.co.uk',
            },
          ],
          destination: '/partner/:path*?subdomain=:subdomain',
        },
      ],
    };
  },
};

export default nextConfig;
