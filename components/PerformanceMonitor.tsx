"use client";

import { useEffect, useState } from "react";

interface PerformanceMetrics {
  pageLoadTime: number;
  domContentLoaded: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});
  const [showMetrics, setShowMetrics] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== "development") return;

    const measurePerformance = () => {
      if (typeof window !== "undefined" && "performance" in window) {
        const navigation = performance.getEntriesByType(
          "navigation"
        )[0] as PerformanceNavigationTiming;

        const newMetrics: Partial<PerformanceMetrics> = {
          pageLoadTime: navigation.loadEventEnd - navigation.fetchStart,
          domContentLoaded:
            navigation.domContentLoadedEventEnd - navigation.fetchStart,
        };

        // Web Vitals
        if ("PerformanceObserver" in window) {
          // First Contentful Paint
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              if (entry.name === "first-contentful-paint") {
                setMetrics((prev) => ({
                  ...prev,
                  firstContentfulPaint: entry.startTime,
                }));
              }
            });
          }).observe({ entryTypes: ["paint"] });

          // Largest Contentful Paint
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            setMetrics((prev) => ({
              ...prev,
              largestContentfulPaint: lastEntry.startTime,
            }));
          }).observe({ entryTypes: ["largest-contentful-paint"] });

          // Cumulative Layout Shift
          new PerformanceObserver((list) => {
            let cls = 0;
            list.getEntries().forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                cls += entry.value;
              }
            });
            setMetrics((prev) => ({ ...prev, cumulativeLayoutShift: cls }));
          }).observe({ entryTypes: ["layout-shift"] });

          // First Input Delay
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              setMetrics((prev) => ({
                ...prev,
                firstInputDelay: entry.processingStart - entry.startTime,
              }));
            });
          }).observe({ entryTypes: ["first-input"] });
        }

        setMetrics(newMetrics);
      }
    };

    // Wait for page to fully load
    if (document.readyState === "complete") {
      measurePerformance();
    } else {
      window.addEventListener("load", measurePerformance);
    }

    return () => window.removeEventListener("load", measurePerformance);
  }, []);

  if (
    process.env.NODE_ENV !== "development" ||
    Object.keys(metrics).length === 0
  ) {
    return null;
  }

  const formatTime = (time: number) => `${Math.round(time)}ms`;

  const getScoreColor = (metric: string, value: number) => {
    const thresholds = {
      pageLoadTime: { good: 2000, poor: 4000 },
      domContentLoaded: { good: 1000, poor: 2000 },
      firstContentfulPaint: { good: 1800, poor: 3000 },
      largestContentfulPaint: { good: 2500, poor: 4000 },
      cumulativeLayoutShift: { good: 0.1, poor: 0.25 },
      firstInputDelay: { good: 100, poor: 300 },
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return "text-gray-600";

    if (value <= threshold.good) return "text-green-600";
    if (value <= threshold.poor) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setShowMetrics(!showMetrics)}
        className="bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors"
      >
        📊 Performance
      </button>

      {showMetrics && (
        <div className="absolute bottom-12 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80 text-xs">
          <h3 className="font-semibold mb-3 text-gray-800">
            Performance Metrics
          </h3>

          <div className="space-y-2">
            {metrics.pageLoadTime && (
              <div className="flex justify-between">
                <span>Page Load:</span>
                <span
                  className={getScoreColor(
                    "pageLoadTime",
                    metrics.pageLoadTime
                  )}
                >
                  {formatTime(metrics.pageLoadTime)}
                </span>
              </div>
            )}

            {metrics.domContentLoaded && (
              <div className="flex justify-between">
                <span>DOM Ready:</span>
                <span
                  className={getScoreColor(
                    "domContentLoaded",
                    metrics.domContentLoaded
                  )}
                >
                  {formatTime(metrics.domContentLoaded)}
                </span>
              </div>
            )}

            {metrics.firstContentfulPaint && (
              <div className="flex justify-between">
                <span>FCP:</span>
                <span
                  className={getScoreColor(
                    "firstContentfulPaint",
                    metrics.firstContentfulPaint
                  )}
                >
                  {formatTime(metrics.firstContentfulPaint)}
                </span>
              </div>
            )}

            {metrics.largestContentfulPaint && (
              <div className="flex justify-between">
                <span>LCP:</span>
                <span
                  className={getScoreColor(
                    "largestContentfulPaint",
                    metrics.largestContentfulPaint
                  )}
                >
                  {formatTime(metrics.largestContentfulPaint)}
                </span>
              </div>
            )}

            {metrics.cumulativeLayoutShift !== undefined && (
              <div className="flex justify-between">
                <span>CLS:</span>
                <span
                  className={getScoreColor(
                    "cumulativeLayoutShift",
                    metrics.cumulativeLayoutShift
                  )}
                >
                  {metrics.cumulativeLayoutShift.toFixed(3)}
                </span>
              </div>
            )}

            {metrics.firstInputDelay && (
              <div className="flex justify-between">
                <span>FID:</span>
                <span
                  className={getScoreColor(
                    "firstInputDelay",
                    metrics.firstInputDelay
                  )}
                >
                  {formatTime(metrics.firstInputDelay)}
                </span>
              </div>
            )}
          </div>

          <div className="mt-3 pt-2 border-t border-gray-200 text-xs text-gray-600">
            <div className="flex justify-between text-[10px]">
              <span className="text-green-600">● Good</span>
              <span className="text-yellow-600">● Needs Work</span>
              <span className="text-red-600">● Poor</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PerformanceMonitor;
