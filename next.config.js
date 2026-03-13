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
      'coral-app-dm8qn.ondigitalocean.app',
      'staging.sanimex.com.mx',
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
          'coral-app-dm8qn.ondigitalocean.app',
          'staging.sanimex.com.mx',
          'admin.grupoazulejero.com',
          'secure.gravatar.com',
          'woocommerce-1377145-5371010.cloudwaysapps.com',
        ],
      },
    }),
  ],
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Esto ayuda a debugear el error #130
  async redirects() {
    return [
      {
        source: '/productos/pisos-y-muros/placas-pvc',
        destination: '/productos/pisos-y-muros/placas-xl',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
