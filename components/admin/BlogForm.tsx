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
import FileUploadAdmin from "@/components/admin/FileUploadAdmin";

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

  const handleImageUpload = (url: string, filename: string) => {
    setFormData((prev) => ({ ...prev, image: url }));
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {message && (
          <div className="text-center text-sm p-3 rounded-lg bg-green-50 text-green-700">
            {message}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blog Title *
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt *
          </label>
          <input
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="Short description of the blog post"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Featured Image
          </label>
          <FileUploadAdmin
            onUpload={handleImageUpload}
            folder="blog"
            accept="image/*"
            maxSize={5}
            label="Upload Blog Image"
            description="Upload a featured image for this blog post (max 5MB) - Server-side upload"
          />
          {formData.image && (
            <div className="mt-3">
              <p className="text-sm text-green-600">
                ✅ Image uploaded successfully
              </p>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content *
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your blog content here (Markdown supported)"
            rows={8}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            You can use Markdown formatting for rich text
          </p>
        </div>

        <div className="flex items-center justify-end gap-4 pt-6 border-t">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Saving..."
              : initialData
                ? "Update Blog Post"
                : "Create Blog Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
