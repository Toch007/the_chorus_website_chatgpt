import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['thechorusabuja.org', 'storage.googleapis.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
  },
  eslint: {
    // ✅ Ignore ESLint errors during builds (Vercel won't fail)
    ignoreDuringBuilds: true,
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  // Headers for better caching
  async headers() {
    return [
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};xtConfig } from 'next';

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
