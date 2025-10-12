"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface LazyLoadWrapperProps {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number;
  triggerOnce?: boolean;
  placeholder?: ReactNode;
  fallback?: ReactNode;
}

export default function LazyLoadWrapper({
  children,
  className = "",
  rootMargin = "100px",
  threshold = 0.1,
  triggerOnce = true,
  placeholder,
  fallback,
}: LazyLoadWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [rootMargin, threshold, triggerOnce]);

  useEffect(() => {
    if (isVisible && !isLoaded) {
      // Simulate loading delay for smooth UX
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isVisible, isLoaded]);

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div ref={ref} className={className}>
      {!isVisible && placeholder && (
        <div className="animate-pulse bg-gray-200 rounded">{placeholder}</div>
      )}

      {isVisible && !isLoaded && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {isVisible && isLoaded && !hasError && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onError={handleError}
        >
          {children}
        </motion.div>
      )}

      {hasError && fallback && (
        <div className="text-center p-4 text-gray-500">{fallback}</div>
      )}
    </div>
  );
}
