/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@mdxeditor/editor', 'react-diff-view'],
  reactStrictMode: true,

  webpack: (config) => {
    // this will override the experiments
    config.experiments = { ...config.experiments, topLevelAwait: true };
    // this will just update topLevelAwait property of config.experiments
    // config.experiments.topLevelAwait = true
    return config;
  },

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
