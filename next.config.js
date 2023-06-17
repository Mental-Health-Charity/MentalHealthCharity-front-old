/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['hubertkajdan.com', 'i.imgur.com'],
  },
  distDir: 'build',
};

module.exports = nextConfig;
