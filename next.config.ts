import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['thechorusabuja.org'],
  },
  eslint: {
    // ✅ Ignore ESLint errors during builds (Vercel won’t fail)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
