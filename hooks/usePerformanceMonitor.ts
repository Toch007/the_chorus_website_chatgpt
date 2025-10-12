"use client";

import { useEffect, useState } from "react";

interface PerformanceMetrics {
  fcp: number | null; // First Contentful Paint
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  ttfb: number | null; // Time to First Byte
}

interface NetworkInfo {
  effectiveType: string;
  downlink: number;
  rtt: number;
}

export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
  });

  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  useEffect(() => {
    // Detect low-end devices
    const detectLowEndDevice = () => {
      const hardwareConcurrency = navigator.hardwareConcurrency || 2;
      const deviceMemory = (navigator as any).deviceMemory || 4;

      setIsLowEndDevice(hardwareConcurrency <= 2 || deviceMemory <= 2);
    };

    // Get network information
    const getNetworkInfo = () => {
      const connection =
        (navigator as any).connection ||
        (navigator as any).mozConnection ||
        (navigator as any).webkitConnection;

      if (connection) {
        setNetworkInfo({
          effectiveType: connection.effectiveType || "unknown",
          downlink: connection.downlink || 0,
          rtt: connection.rtt || 0,
        });
      }
    };

    // Performance Observer for Core Web Vitals
    if ("PerformanceObserver" in window) {
      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === "first-contentful-paint") {
            setMetrics((prev) => ({ ...prev, fcp: entry.startTime }));
          }
        }
      });
      fcpObserver.observe({ entryTypes: ["paint"] });

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        setMetrics((prev) => ({ ...prev, lcp: lastEntry.startTime }));
      });
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          setMetrics((prev) => ({
            ...prev,
            fid: entry.processingStart - entry.startTime,
          }));
        }
      });
      fidObserver.observe({ entryTypes: ["first-input"] });

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            setMetrics((prev) => ({ ...prev, cls: clsValue }));
          }
        }
      });
      clsObserver.observe({ entryTypes: ["layout-shift"] });

      // Time to First Byte
      const navigation = performance.getEntriesByType("navigation")[0] as any;
      if (navigation) {
        const ttfb = navigation.responseStart - navigation.fetchStart;
        setMetrics((prev) => ({ ...prev, ttfb }));
      }

      return () => {
        fcpObserver.disconnect();
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      };
    }

    detectLowEndDevice();
    getNetworkInfo();
  }, []);

  // Performance scoring
  const getPerformanceScore = () => {
    if (!metrics.fcp || !metrics.lcp) return null;

    let score = 100;

    // FCP scoring (good: <1.8s, needs improvement: 1.8-3s, poor: >3s)
    if (metrics.fcp > 3000) score -= 30;
    else if (metrics.fcp > 1800) score -= 15;

    // LCP scoring (good: <2.5s, needs improvement: 2.5-4s, poor: >4s)
    if (metrics.lcp > 4000) score -= 30;
    else if (metrics.lcp > 2500) score -= 15;

    // FID scoring (good: <100ms, needs improvement: 100-300ms, poor: >300ms)
    if (metrics.fid && metrics.fid > 300) score -= 20;
    else if (metrics.fid && metrics.fid > 100) score -= 10;

    // CLS scoring (good: <0.1, needs improvement: 0.1-0.25, poor: >0.25)
    if (metrics.cls && metrics.cls > 0.25) score -= 20;
    else if (metrics.cls && metrics.cls > 0.1) score -= 10;

    return Math.max(0, score);
  };

  const shouldReduceAnimations = () => {
    return (
      isLowEndDevice ||
      networkInfo?.effectiveType === "slow-2g" ||
      networkInfo?.effectiveType === "2g"
    );
  };

  const shouldPreloadImages = () => {
    return (
      !isLowEndDevice &&
      networkInfo?.effectiveType !== "slow-2g" &&
      networkInfo?.effectiveType !== "2g"
    );
  };

  return {
    metrics,
    networkInfo,
    isLowEndDevice,
    performanceScore: getPerformanceScore(),
    shouldReduceAnimations: shouldReduceAnimations(),
    shouldPreloadImages: shouldPreloadImages(),
  };
}
