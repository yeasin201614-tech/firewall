/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@firewall/shared-types', '@firewall/api-client', '@firewall/ui'],
};

module.exports = nextConfig;
