"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import Reveal from "./Reveal";

type EventType = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  status: "upcoming" | "past";
};

export default function Events() {
  const [upcomingEvents, setUpcomingEvents] = useState<EventType[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const q = query(
          collection(db, "events"),
          where("status", "==", "upcoming")
        );
        const snapshot = await getDocs(q);
        const events = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as EventType[];

        setUpcomingEvents(events.slice(0, 2)); // Limit to 2 upcoming events
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="bg-gray-100 py-16 px-6 md:px-20" id="events">
      <div className="max-w-6xl mx-auto text-center">
        <Reveal direction="up">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
            Upcoming Events
          </h2>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <p className="text-lg text-gray-700 mb-10">
            Mark your calendars for our upcoming concerts and performances.
          </p>
        </Reveal>

        {upcomingEvents.length === 0 ? (
          <Reveal direction="up" delay={0.3}>
            <p className="text-gray-600">No upcoming events at the moment.</p>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {upcomingEvents.map((event, index) => (
              <Reveal key={event.id} direction="up" delay={index * 0.2}>
                <div className="bg-white rounded-2xl shadow overflow-hidden text-left">
                  {event.image && (
                    <Image
                      src={event.image}
                      alt={event.title}
                      width={600}
                      height={400}
                      className="w-full h-56 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-blue-700">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      {event.date} • {event.location}
                    </p>
                    <p className="text-gray-700 mt-4">{event.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal direction="left" delay={0.4}>
          <Link
            href="/events"
            className="inline-block bg-blue-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            View More Events
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
