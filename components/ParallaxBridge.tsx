// components/ParallaxBridge.tsx
"use client";

import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";

// ✅ Declare prop types
type ParallaxBridgeProps = {
  image: string;
  heading: string;
  subtext?: string;
  height?: string;
  ticketUrl?: string; 
};

export default function ParallaxBridge({
  image,
  heading,
  subtext,
  height = "h-[60vh]",
  ticketUrl,
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

        {ticketUrl && (
          <div className="mt-4">
            <Link
              href={ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg hover:bg-primary/90 transition"
            >
              🎟️ Get Tickets
            </Link>
          </div>
        )}
      </motion.div>
    </section>
  );
}
