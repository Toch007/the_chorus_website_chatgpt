"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/config";

export default function AddMemberForm() {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    section: "",
    bio: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await addDoc(collection(db, "members"), formData);
      setMessage("✅ Member added successfully.");
      setFormData({ name: "", title: "", section: "", bio: "", image: "" });
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add member.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && <p className="text-center text-sm">{message}</p>}

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full name"
        required
        className="w-full border p-2 rounded"
      />

      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title (e.g. Alto, Tenor, Music Director)"
        required
        className="w-full border p-2 rounded"
      />

      <input
        name="section"
        value={formData.section}
        onChange={handleChange}
        placeholder="Section (e.g. alto, tenor, accompanists)"
        required
        className="w-full border p-2 rounded"
      />

      <input
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Image path (e.g. /images/JohnDoe.jpg)"
        required
        className="w-full border p-2 rounded"
      />

      <textarea
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        placeholder="Bio"
        required
        rows={5}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded"
      >
        {loading ? "Adding..." : "Add Member"}
      </button>
    </form>
  );
}
