// components/admin/EditEventForm.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

interface EventData {
  title: string;
  composer: string;
  date: string;
  venue: string;
  status: "upcoming" | "concluded";
}

export default function EditEventForm({ eventId }: { eventId: string }) {
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const docRef = doc(db, "events", eventId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setEventData(docSnap.data() as EventData);
        } else {
          setError("Event not found");
        }
      } catch (err) {
        console.error("Failed to load event:", err);
        setError("Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventData) return;
    try {
      await updateDoc(doc(db, "events", eventId), { ...eventData });
      router.push("/admin/events");
    } catch (err) {
      console.error("Error updating event:", err);
      setError("Update failed");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEventData((prev) => prev ? { ...prev, [name]: value } : prev);
  };

  if (loading) return <p>Loading event data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!eventData) return null;

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Edit Event</h2>

      <input
        name="title"
        value={eventData.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full mb-3 p-2 border rounded"
        required
      />

      <input
        name="composer"
        value={eventData.composer}
        onChange={handleChange}
        placeholder="Composer"
        className="w-full mb-3 p-2 border rounded"
        required
      />

      <input
        name="date"
        value={eventData.date}
        onChange={handleChange}
        placeholder="Date"
        type="date"
        className="w-full mb-3 p-2 border rounded"
        required
      />

      <input
        name="venue"
        value={eventData.venue}
        onChange={handleChange}
        placeholder="Venue"
        className="w-full mb-3 p-2 border rounded"
        required
      />

      <select
        name="status"
        value={eventData.status}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
        required
      >
        <option value="upcoming">Upcoming</option>
        <option value="concluded">Concluded</option>
      </select>

      <button
        type="submit"
        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
      >
        Save Changes
      </button>
    </form>
  );
}
