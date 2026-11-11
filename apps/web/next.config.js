/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@firewall/shared-types', '@firewall/api-client', '@firewall/ui'],
  images: {
    domains: ['images.unsplash.com'],
  },
};

module.exports = nextConfig;
