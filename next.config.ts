// next.config.js
/** @type {import('next').Config} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.microlink.io', // Replace with your actual URL
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;