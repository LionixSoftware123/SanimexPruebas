const withPlugins = require('next-compose-plugins');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const webpack = (config) => {
  config.module.rules.push({
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: ['@svgr/webpack'],
  });

  return config;
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack,
  staticPageGenerationTimeout: 5000,
  images: {
    domains: [
      'sanimex.com.mx',
      'admin.sanimex.com.mx',
      'secure.gravatar.com',
      'woocommerce-1377145-5371010.cloudwaysapps.com',
    ],
  },
};

module.exports = withPlugins([
  [
    nextConfig,
    withBundleAnalyzer({
      reactStrictMode: false,
      compress: true,
      optimization: {
        minimize: true,
      },
      eslint: {
        ignoreDuringBuilds: false,
      },
      experimental: {
        nextScriptWorkers: true,
      },
      images: {
        domains: [
          'sanimex.com.mx',
          'admin.sanimex.com.mx',
          'admin.grupoazulejero.com',
          'secure.gravatar.com',
          'woocommerce-1377145-5371010.cloudwaysapps.com',
        ],
      },
    }),
  ],
]);
