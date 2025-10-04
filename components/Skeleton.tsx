"use client";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "rectangular" | "circular";
  width?: string;
  height?: string;
}

export default function Skeleton({
  className = "",
  variant = "rectangular",
  width = "100%",
  height = "20px",
}: SkeletonProps) {
  const baseClasses =
    "animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]";

  const variantClasses = {
    text: "rounded h-4",
    rectangular: "rounded-lg",
    circular: "rounded-full",
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{ width, height }}
    />
  );
}
