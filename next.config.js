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

const removeImports = require('next-remove-imports')();
module.exports = removeImports(nextConfig);
