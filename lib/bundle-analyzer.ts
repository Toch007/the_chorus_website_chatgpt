import { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

// This function can be used to wrap your Next.js config for bundle analysis
export default function withAnalyzer(config: NextConfig): NextConfig {
  return withBundleAnalyzer(config);
}
