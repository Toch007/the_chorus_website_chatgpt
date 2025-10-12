"use client";

import { useEffect } from "react";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";

interface CriticalResourcesProps {
  images?: string[];
  fonts?: string[];
  scripts?: string[];
}

export default function CriticalResources({
  images = [],
  fonts = [],
  scripts = [],
}: CriticalResourcesProps) {
  const { shouldPreloadImages, networkInfo } = usePerformanceMonitor();

  useEffect(() => {
    // Only preload on good connections and capable devices
    if (!shouldPreloadImages) return;

    // Preload critical images
    images.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    });

    // Preload fonts
    fonts.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "font";
      link.type = "font/woff2";
      link.crossOrigin = "anonymous";
      link.href = src;
      document.head.appendChild(link);
    });

    // Preload scripts
    scripts.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "script";
      link.href = src;
      document.head.appendChild(link);
    });

    // Add performance hints
    const dnsPreconnect = [
      "https://storage.googleapis.com",
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
    ];

    dnsPreconnect.forEach((url) => {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = url;
      document.head.appendChild(link);
    });
  }, [shouldPreloadImages, images, fonts, scripts]);

  // Add resource hints based on network conditions
  useEffect(() => {
    if (
      networkInfo?.effectiveType === "4g" ||
      networkInfo?.effectiveType === "3g"
    ) {
      // Prefetch next page resources on good connections
      const prefetchRoutes = ["/about", "/events", "/join"];

      prefetchRoutes.forEach((route) => {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = route;
        document.head.appendChild(link);
      });
    }
  }, [networkInfo]);

  return null;
}
