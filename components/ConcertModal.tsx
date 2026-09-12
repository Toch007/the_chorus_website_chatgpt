"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Ticket } from "lucide-react";
import { shouldShowThankYouPage } from "@/config/paul";

const STORAGE_KEY = "concert-modal-dismissed-paul-2026";

export default function ConcertModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Don't show once the concert is over
    if (shouldShowThankYouPage()) return;

    // Don't show if already dismissed
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) return;

    // Show after 3.5 seconds
    const timer = setTimeout(() => {
      setVisible(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative w-full max-w-md pointer-events-auto rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-slate-900 to-blue-950 border border-white/10">
              {/* Dismiss button */}
              <button
                onClick={handleDismiss}
                aria-label="Close"
                className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/40 hover:bg-white/20 text-white/70 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Concert image */}
              <div className="relative h-48 w-full">
                <Image
                  src="/images/paul.jpeg"
                  alt="Mendelssohn's Paul"
                  fill
                  className="object-cover"
                  sizes="448px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <div className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-400/40 rounded-full px-3 py-1 text-amber-400 text-xs font-bold mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse inline-block" />
                    Tickets on Sale Now
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="px-6 pt-4 pb-6">
                <p className="text-xs text-amber-400 uppercase tracking-widest font-bold mb-1">
                  5th Anniversary Concert
                </p>
                <h2 className="text-2xl font-bold text-white mb-1 leading-tight">
                  Mendelssohn&apos;s{" "}
                  <span className="italic text-amber-400">Paul</span>
                </h2>
                <p className="text-gray-300 text-sm mb-4">
                  Paulus, Op. 36 — an epic oratorio performed live by The Chorus
                  Abuja.
                </p>

                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Calendar className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    Saturday, September 13, 2026
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    NUC Auditorium, Maitama, Abuja
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Ticket className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    Bronze · Silver · Gold · Diamond — from ₦10,000
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/events/paul/tickets"
                    onClick={handleDismiss}
                    className="flex-1 text-center bg-amber-500 hover:bg-amber-400 text-white font-bold px-6 py-3 rounded-full shadow-lg shadow-amber-500/30 hover:scale-105 transition-all duration-200"
                  >
                    🎟 Buy Tickets
                  </Link>
                  <Link
                    href="/events/paul"
                    onClick={handleDismiss}
                    className="flex-1 text-center border border-white/20 text-white/80 hover:text-white hover:bg-white/10 font-medium px-6 py-3 rounded-full transition"
                  >
                    Learn More
                  </Link>
                </div>

                <button
                  onClick={handleDismiss}
                  className="mt-3 w-full text-center text-xs text-gray-500 hover:text-gray-400 transition"
                >
                  Remind me later
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
