// components/UpcomingBanner.tsx

"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, where, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/firebase/config";
import Link from "next/link";

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

  useEffect(() => {
    const fetchNextEvent = async () => {
      const q = query(
        collection(db, "events"),
        where("status", "==", "upcoming"),
        orderBy("date", "asc"),
        limit(1)
      );
      const snapshot = await getDocs(q);
      const evs = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) })) as EventType[];
      if (evs.length > 0) {
        setNextEvent(evs[0]);
      }
    };

    fetchNextEvent();
  }, []);

  if (!nextEvent) return null;

  return (
    <div className="bg-yellow-100 text-blue-900 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
      <div>
        <strong>Next Event:</strong> {nextEvent.title} — {nextEvent.date} @ {nextEvent.location}
      </div>
      {nextEvent.ticketed ? (
        <a
          href="https://tix.africa/the-chorus-solomon"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-900 text-white px-4 py-2 rounded-full hover:bg-blue-800 transition"
        >
          🎟️ Get Tickets
        </a>
      ) : (
        <Link
          href="/events"
          className="bg-blue-900 text-white px-4 py-2 rounded-full hover:bg-blue-800 transition"
        >
          View Events
        </Link>
      )}
    </div>
  );
}
