// components/ParallaxBridge.tsx
"use client";

import { motion } from "framer-motion";
import React from "react";

// ✅ Declare prop types
type ParallaxBridgeProps = {
  image: string;
  heading: string;
  subtext?: string;
  height?: string;
};

// ✅ Use props in the function signature
export default function ParallaxBridge({
  image,
  heading,
  subtext,
  height = "h-[60vh]",
}: ParallaxBridgeProps) {
  return (
    <section
      className={`relative ${height} bg-fixed bg-center bg-cover flex items-center justify-center`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 text-white text-center px-4"
      >
        <h2 className="text-2xl md:text-4xl font-semibold">{heading}</h2>
        {subtext && (
          <p className="mt-2 text-sm md:text-base text-gray-200">{subtext}</p>
        )}
      </motion.div>
    </section>
  );
}
