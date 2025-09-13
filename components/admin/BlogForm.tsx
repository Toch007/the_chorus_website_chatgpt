// components/admin/BlogForm.tsx

"use client";

import { useState, useEffect } from "react";
import { db } from "@/firebase/config";
import {
  addDoc,
  updateDoc,
  doc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export default function BlogForm({ initialData, onSuccess }: any) {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    slug: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        excerpt: initialData.excerpt || "",
        content: initialData.content || "",
        image: initialData.image || "",
        slug: initialData.slug || "",
      });
    }
  }, [initialData]);

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
      const data = {
        ...formData,
        slug: formData.slug || generateSlug(formData.title),
        createdAt: initialData?.id ? initialData.createdAt : serverTimestamp(),
      };

      if (initialData?.id) {
        await updateDoc(doc(db, "posts", initialData.id), data);
        setMessage("✅ Blog updated successfully.");
      } else {
        await addDoc(collection(db, "posts"), data);
        setMessage("✅ Blog created successfully.");
      }

      setFormData({ title: "", excerpt: "", content: "", image: "", slug: "" });
      onSuccess?.();
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to save blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && <p className="text-center text-sm">{message}</p>}

      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
        className="w-full border p-2 rounded"
      />

      <input
        name="excerpt"
        value={formData.excerpt}
        onChange={handleChange}
        placeholder="Short excerpt"
        required
        className="w-full border p-2 rounded"
      />

      <input
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Image path (e.g. /images/blog.jpg)"
        required
        className="w-full border p-2 rounded"
      />

      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Blog content (markdown supported)"
        rows={6}
        required
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-700 text-white py-2 px-4 rounded"
      >
        {loading ? "Saving..." : initialData ? "Update Blog" : "Add Blog"}
      </button>
    </form>
  );
}
