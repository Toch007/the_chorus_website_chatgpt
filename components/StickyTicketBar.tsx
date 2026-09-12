"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Ticket } from "lucide-react";
import { shouldShowThankYouPage } from "@/config/paul";

export default function StickyTicketBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Don't show once the concert is over
    if (shouldShowThankYouPage()) return;

    // Don't show if already dismissed this session
    const wasDismissed = sessionStorage.getItem("sticky-bar-dismissed");
    if (wasDismissed) return;

    const handleScroll = () => {
      // Show after scrolling past ~one screen height
      if (window.scrollY > window.innerHeight * 0.8) {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("sticky-bar-dismissed", "true");
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 border-t border-white/10 shadow-2xl"
        >
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
            {/* Left: concert info */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="hidden sm:flex flex-shrink-0 w-9 h-9 rounded-full bg-amber-500/20 border border-amber-400/40 items-center justify-center">
                <Ticket className="w-4 h-4 text-amber-400" />
              </div>
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm leading-tight truncate">
                  🎶 Mendelssohn&apos;s Paul — 5th Anniversary
                </p>
                <p className="text-gray-400 text-xs truncate">
                  Sat Sep 13, 2026 · NUC Auditorium, Maitama
                </p>
              </div>
            </div>

            {/* Right: CTA + dismiss */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="hidden md:inline-flex items-center gap-1 text-amber-400 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse inline-block" />
                Tickets on sale
              </span>
              <Link
                href="/events/paul/tickets"
                className="bg-amber-500 hover:bg-amber-400 text-white text-sm font-bold px-5 py-2 rounded-full shadow-md hover:shadow-amber-400/30 hover:scale-105 transition-all duration-200 whitespace-nowrap"
              >
                Get Tickets
              </Link>
              <button
                onClick={handleDismiss}
                aria-label="Dismiss"
                className="ml-1 p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
