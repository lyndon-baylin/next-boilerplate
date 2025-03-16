import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
