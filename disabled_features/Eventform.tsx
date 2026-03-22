"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import FileUploadAdmin from "@/components/admin/FileUploadAdmin";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export default function EventForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [composer, setComposer] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = (url: string, filename: string) => {
    setImageUrl(url);
    toast.success(`✅ Image uploaded: ${filename}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const eventData = {
        title,
        composer,
        date,
        location,
        imageUrl,
        createdAt: Timestamp.now(),
      };

      await addDoc(collection(db, "events"), eventData);

      toast.success("✅ Event created successfully!");
      router.push("/admin/events");
    } catch (err) {
      console.error(err);
      toast.error("❌ Something went wrong. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        title="Add New Event"
        description="Create a new event for The Chorus Abuja"
      />

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter event title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Composer *
                </label>
                <input
                  type="text"
                  value={composer}
                  onChange={(e) => setComposer(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter composer name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Date *
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter event location"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Image
              </label>
              <FileUploadAdmin
                onUpload={handleImageUpload}
                folder="events"
                accept="image/*"
                maxSize={5}
                label="Upload Event Image"
                description="Upload an image for this event (max 5MB) - Server-side upload"
              />
              {imageUrl && (
                <div className="mt-3">
                  <p className="text-sm text-green-600">
                    ✅ Image uploaded successfully
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={
                  uploading || !title || !composer || !date || !location
                }
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? "Creating Event..." : "Create Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
