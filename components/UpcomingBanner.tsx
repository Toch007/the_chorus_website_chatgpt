// components/UpcomingBanner.tsx

"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  where,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import Link from "next/link";
import { motion } from "framer-motion";

type EventType = {
  id: string;
  title: string;
  date: string;
  location: string;
  ticketed?: boolean;
  status: string;
};

export default function UpcomingBanner() {
  const [nextEvent, setNextEvent] = useState<EventType | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const fetchNextEvent = async () => {
      // Temporary fix: fetch all events and filter in code to avoid index requirement
      const q = query(collection(db, "events"));
      const snapshot = await getDocs(q);
      const allEvents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as any),
      })) as EventType[];

      // Filter and sort in memory
      const upcomingEvents = allEvents
        .filter((event) => event.status === "upcoming")
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

      if (upcomingEvents.length > 0) {
        setNextEvent(upcomingEvents[0]);
      }
    };

    fetchNextEvent();
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!nextEvent) return;

    const fullText = `${nextEvent.title} — ${nextEvent.date} @ ${nextEvent.location}`;

    if (isTyping && textIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, textIndex + 1));
        setTextIndex(textIndex + 1);
      }, 100); // Typing speed
      return () => clearTimeout(timeout);
    } else if (isTyping && textIndex >= fullText.length) {
      // Pause at end, then restart
      const timeout = setTimeout(() => {
        setIsTyping(false);
        setTextIndex(0);
        setDisplayedText("");
      }, 3000); // Pause for 3 seconds
      return () => clearTimeout(timeout);
    } else if (!isTyping) {
      // Start typing again
      const timeout = setTimeout(() => {
        setIsTyping(true);
      }, 500); // Brief pause before restarting
      return () => clearTimeout(timeout);
    }
  }, [nextEvent, textIndex, isTyping]);

  if (!nextEvent) return null;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-gradient-to-r from-yellow-100 via-yellow-50 to-yellow-100 text-blue-900 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left shadow-lg border-b-2 border-yellow-300"
    >
      <motion.div
        className="flex-1"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-2xl"
          >
            🎭
          </motion.div>
          <div>
            <div className="text-sm font-medium text-blue-700 mb-1">
              🔔 Next Event
            </div>
            <div className="font-bold text-lg">
              {displayedText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-blue-600"
              >
                |
              </motion.span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        {nextEvent.ticketed ? (
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 0 0 rgba(59, 130, 246, 0.4)",
                "0 0 0 10px rgba(59, 130, 246, 0)",
                "0 0 0 0 rgba(59, 130, 246, 0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Link
              href="events/solomon"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-3 rounded-full hover:from-blue-800 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg flex items-center gap-2 group"
            >
              <motion.span
                animate={{ rotate: [0, 20, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              >
                🎟️
              </motion.span>
              <span>Get Tickets</span>
              <motion.span className="group-hover:translate-x-1 transition-transform">
                →
              </motion.span>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Link
              href="/events"
              className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-3 rounded-full hover:from-blue-800 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg flex items-center gap-2 group"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                📅
              </motion.span>
              <span>View Events</span>
              <motion.span className="group-hover:translate-x-1 transition-transform">
                →
              </motion.span>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
