// components/admin/EventForm.tsx

"use client";

import { useState, useEffect } from "react";
import { addDoc, updateDoc, doc, collection } from "firebase/firestore";
import { db } from "@/firebase/config";

interface EventFormProps {
  initialData?: any;
  onSuccess?: () => void;
}

const emptyEvent = {
  title: "",
  date: "",
  location: "",
  description: "",
  image: "",
  details: "",
  status: "upcoming",
};

export default function EventForm({ initialData, onSuccess }: EventFormProps) {
  const [formData, setFormData] = useState(initialData || emptyEvent);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.id) {
        const { id, ...rest } = formData;
        await updateDoc(doc(db, "events", id), rest);
      } else {
        await addDoc(collection(db, "events"), formData);
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Event submission failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <input
        className="border p-2 rounded"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <input
        className="border p-2 rounded"
        placeholder="Date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        required
      />
      <input
        className="border p-2 rounded"
        placeholder="Location"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        required
      />
      <input
        className="border p-2 rounded"
        placeholder="Image URL"
        value={formData.image}
        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        required
      />
      <textarea
        className="border p-2 rounded"
        placeholder="Short Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        required
      />
      <textarea
        className="border p-2 rounded"
        placeholder="Details"
        value={formData.details}
        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
        required
      />
      <select
        className="border p-2 rounded"
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        required
      >
        <option value="upcoming">Upcoming</option>
        <option value="past">Past</option>
      </select>
      <button
        type="submit"
        className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Saving..." : formData.id ? "Update Event" : "Add Event"}
      </button>
    </form>
  );
}
