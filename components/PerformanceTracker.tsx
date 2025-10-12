"use client";

import { useEffect } from "react";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";

export default function PerformanceTracker() {
  const { metrics, performanceScore, networkInfo, isLowEndDevice } =
    usePerformanceMonitor();

  useEffect(() => {
    // Only log in development
    if (process.env.NODE_ENV === "development") {
      console.group("🚀 Performance Metrics");
      console.log("📊 Core Web Vitals:", metrics);
      console.log("🎯 Performance Score:", performanceScore);
      console.log("🌐 Network Info:", networkInfo);
      console.log("📱 Low-end Device:", isLowEndDevice);
      console.groupEnd();

      // Send to analytics in production
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "performance_metrics", {
          fcp: metrics.fcp,
          lcp: metrics.lcp,
          fid: metrics.fid,
          cls: metrics.cls,
          performance_score: performanceScore,
          network_type: networkInfo?.effectiveType,
          is_low_end_device: isLowEndDevice,
        });
      }
    }
  }, [metrics, performanceScore, networkInfo, isLowEndDevice]);

  // Visual performance indicator in development
  if (process.env.NODE_ENV === "development" && performanceScore !== null) {
    return (
      <div className="fixed bottom-4 right-4 z-50 bg-black bg-opacity-80 text-white p-2 rounded text-xs">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              performanceScore >= 90
                ? "bg-green-500"
                : performanceScore >= 70
                  ? "bg-yellow-500"
                  : "bg-red-500"
            }`}
          />
          Performance: {performanceScore}
        </div>
        {isLowEndDevice && (
          <div className="text-yellow-300">📱 Low-end mode</div>
        )}
        {networkInfo && (
          <div className="text-gray-300">📶 {networkInfo.effectiveType}</div>
        )}
      </div>
    );
  }

  return null;
}
