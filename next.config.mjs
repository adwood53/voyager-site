// next.config.mjs - updated
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.sanity.io',
      'firebasestorage.googleapis.com',
      'img.clerk.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        pathname: '/**',
      },
    ],
  },
  // Handle redirects for common paths
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/green-screen-productions.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/about-us.html',
        destination: '/about-us',
        permanent: true,
      },
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

export default nextConfig;
