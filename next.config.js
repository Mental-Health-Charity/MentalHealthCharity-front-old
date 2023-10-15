/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['hubertkajdan.com', 'i.imgur.com', 'placehold.co'],
  },
  distDir: 'build',
};

const removeImports = require('next-remove-imports')();
module.exports = removeImports(nextConfig);
