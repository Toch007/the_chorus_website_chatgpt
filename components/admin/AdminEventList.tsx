// components/admin/AdminEventList.tsx
"use client";

import { useEffect, useState } from "react";
import { db, storage } from "@/firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import Image from "next/image";
import Link from "next/link";


type Event = {
  id: string;
  title: string;
  composer: string;
  date: string;
  venue: string;
  imageUrl: string;
  status: "upcoming" | "concluded";
};

export default function AdminEventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const snapshot = await getDocs(collection(db, "events"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Event[];
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (eventId: string, imageUrl: string) => {
    const confirm = window.confirm("Are you sure you want to delete this event?");
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "events", eventId));
      if (imageUrl) {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      }
      setEvents(events.filter((e) => e.id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event.");
    }
  };

  if (loading) return <p className="text-center">Loading events...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Events</h1>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded shadow-md p-4">
              {event.imageUrl && (
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-sm text-gray-600">{event.composer}</p>
              <p className="text-sm">{event.date}</p>
              <p className="text-sm">{event.venue}</p>
              <span
                className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${
                  event.status === "upcoming" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"
                }`}
              >
                {event.status}
              </span>
              <div className="flex justify-end gap-2 mt-4">
                {/* Placeholder for future Edit */}
                <Link
  href={`/admin/events/edit/${event.id}`}
  className="text-blue-600 hover:underline"
>
  Edit
</Link>
                <button
                  onClick={() => handleDelete(event.id, event.imageUrl)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
