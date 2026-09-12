import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root: a stray package-lock.json in the parent folder
  // otherwise makes Next.js/Turbopack misdetect the project root.
  outputFileTracingRoot: process.cwd(),

  // Enhanced Image Optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "thechorusabuja.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.qrserver.com",
        port: "",
        pathname: "/v1/create-qr-code/**",
      },
    ],
    formats: ["image/webp", "image/avif"],
    qualities: [75, 90],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Advanced caching and optimization
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "react-icons",
      "firebase",
      "@radix-ui/react-dialog",
    ],
    scrollRestoration: true,
  },

  serverExternalPackages: ["firebase-admin"],

  transpilePackages: ["pdf-lib", "@pdf-lib/standard-fonts"],

  // Build optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Security headers for performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
      {
        // API responses (e.g. admin auth checks) must never be cached by browsers/CDN.
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, must-revalidate",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/videos/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  turbopack: {
    root: process.cwd(),
    resolveAlias: {
      "../postinstall.mjs": "./lib/empty.js",
      "./postinstall.mjs": "./lib/empty.js",
    },
  },

  webpack: (config, { isServer }) => {
    //Handle ESM packages
    config.resolve.extensionAlias = {
      ".js": [".js", ".ts", ".tsx"],
      ".mjs": [".mjs", ".mts"],
    };

    // Add NormalModuleReplacementPlugin to ignore postinstall.mjs
    config.plugins.push(
      new (require("webpack").NormalModuleReplacementPlugin)(
        /postinstall\.mjs$/,
        require.resolve("./lib/empty.js"),
      ),
    );

    // Ignore optional dependencies that cause issues
    config.externals = config.externals || [];
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }

    return config;
  },
};

export default nextConfig;
