import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable React strict mode
  reactStrictMode: true,
  eslint: {
    /**
     * Disable linting during production builds
     * Warning: This allows production builds to successfully complete even if
     * your project has ESLint errors.
     */
    ignoreDuringBuilds: true,
  },
  /* config options here */
};

export default nextConfig;
