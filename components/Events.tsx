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
        <Reveal direction="down" delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
            Upcoming Performances
          </h2>
        </Reveal>

        <Reveal direction="up" delay={0.3}>
          <p className="text-lg text-gray-700 mb-10">
            Stay inspired. Join us at our next concert, outreach, or festival
            appearance.
          </p>
        </Reveal>

        {upcomingEvents.length === 0 ? (
          <Reveal direction="left" delay={0.5}>
            <p className="text-gray-600">No upcoming events at the moment.</p>
          </Reveal>
        ) : (
          <div
            className={`grid gap-8 mb-10 ${
              upcomingEvents.length === 1
                ? "grid-cols-1 justify-items-center max-w-md mx-auto"
                : upcomingEvents.length === 2
                  ? "grid-cols-1 md:grid-cols-2 justify-items-center max-w-4xl mx-auto"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {upcomingEvents.map((event, index) => (
              <Reveal
                key={event.id}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={0.5 + index * 0.1}
              >
                <div className="bg-white rounded-2xl shadow hover:shadow-xl active:shadow-2xl overflow-hidden text-left transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 cursor-pointer min-h-[200px]">
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
                    <h3 className="text-xl font-semibold text-blue-700 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {event.date} • {event.location}
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal direction="up" delay={0.8}>
          <Link
            href="/events"
            className="inline-block bg-blue-800 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 active:bg-blue-900 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transform transition-all duration-300"
          >
            📅 See All Events
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
