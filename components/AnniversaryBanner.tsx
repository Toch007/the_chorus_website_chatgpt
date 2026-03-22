"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Calendar, Music } from "lucide-react";
import Link from "next/link";

export default function AnniversaryBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if banner was previously dismissed
    const dismissed = localStorage.getItem("anniversary-banner-dismissed");
    if (!dismissed) {
      // Show banner after a short delay
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem("anniversary-banner-dismissed", "true");
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed top-20 left-0 right-0 z-40 px-4"
        >
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-2xl shadow-2xl border-4 border-amber-300 overflow-hidden">
              <div className="relative px-6 py-4 md:px-8 md:py-5">
                {/* Decorative sparkles */}
                <div className="absolute top-2 left-4 opacity-30">
                  <Sparkles className="w-6 h-6 text-white animate-pulse" />
                </div>
                <div className="absolute bottom-2 right-4 opacity-30">
                  <Sparkles className="w-6 h-6 text-white animate-pulse" />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 md:gap-4 flex-1">
                    <div className="hidden sm:block">
                      <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                        <Music className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="inline-block px-3 py-1 bg-white/90 text-amber-700 text-xs font-bold rounded-full uppercase tracking-wide">
                          🎉 Special Announcement
                        </span>
                      </div>
                      <h3 className="text-lg md:text-2xl font-bold text-white mb-1">
                        Celebrating 5 Years of Excellence!
                      </h3>
                      <p className="text-sm md:text-base text-amber-50">
                        Join us in September for our anniversary concert
                        featuring Mendelssohn's "St. Paul"
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 md:gap-3">
                    <Link
                      href="/events/5th-anniversary"
                      className="hidden sm:flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-white text-amber-600 font-bold rounded-lg hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <Calendar className="w-4 h-4" />
                      <span className="hidden md:inline">Learn More</span>
                      <span className="md:hidden">Details</span>
                    </Link>

                    <button
                      onClick={handleDismiss}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors group"
                      aria-label="Dismiss announcement"
                    >
                      <X className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Mobile CTA */}
                <div className="sm:hidden mt-3 pt-3 border-t border-amber-400/30">
                  <Link
                    href="/events/5th-anniversary"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-white text-amber-600 font-bold rounded-lg hover:bg-amber-50 transition-all shadow-lg"
                  >
                    <Calendar className="w-4 h-4" />
                    Learn More About Our Anniversary
                  </Link>
                </div>
              </div>

              {/* Animated border gradient */}
              <div className="h-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 animate-pulse" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
