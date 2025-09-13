// app/admin/events/manage/page.tsx

"use client";

import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import EventForm from "@/components/admin/EventForm";
import Link from "next/link";
import BlogForm from "@/components/admin/BlogForm";

export default function ManageEventsPage() {
  useAuthRedirect();
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  const fetchEvents = async () => {
    const snapshot = await getDocs(query(collection(db, "events"), orderBy("date", "desc")));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setEvents(data);
  };

  const fetchPosts = async () => {
    const snapshot = await getDocs(query(collection(db, "posts"), orderBy("createdAt", "desc")));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setPosts(data);
  };

  useEffect(() => {
    fetchEvents();
    fetchPosts();
  }, []);

  const handleEdit = (event: any) => {
    setSelectedEvent(event);
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this event?");
    if (!confirm) return;
    await deleteDoc(doc(db, "events", id));
    fetchEvents();
  };

  const filteredEvents = events.filter((evt) =>
    evt.title.toLowerCase().includes(search.toLowerCase()) ||
    evt.location.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedEvents = filteredEvents.slice(start, start + itemsPerPage);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Events</h1>

      <EventForm
        initialData={selectedEvent}
        onSuccess={() => {
          fetchEvents();
          setSelectedEvent(null);
        }}
      />

      <div className="my-6">
        <input
          type="text"
          placeholder="Search by title or location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="grid gap-4 mt-4">
        {paginatedEvents.map((evt) => (
          <div key={evt.id} className="border p-4 rounded bg-white shadow">
            <h2 className="font-semibold text-xl">{evt.title}</h2>
            <p className="text-sm text-gray-500">{evt.date} | {evt.location}</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleEdit(evt)}
                className="text-blue-700 underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(evt.id)}
                className="text-red-600 underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      <div className="mt-10 text-center">
        <Link
          href="/admin/newsletter"
          className="text-blue-700 underline hover:text-blue-900"
        >
          📧 View Newsletter Subscribers
        </Link>
      </div>

      <hr className="my-10" />

      <h2 className="text-2xl font-semibold mb-4">Manage Blog Posts</h2>
      <BlogForm
        initialData={selectedPost}
        onSuccess={() => {
          fetchPosts();
          setSelectedPost(null);
        }}
      />

      <div className="mt-6 grid gap-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded bg-white shadow">
            <h3 className="text-lg font-bold">{post.title}</h3>
            <p className="text-sm text-gray-600">{post.excerpt}</p>
            <p className="text-xs text-gray-400">Slug: {post.slug}</p>
            <p className="text-xs text-gray-400">Date: {post.createdAt?.toDate?.().toLocaleDateString?.() || "N/A"}</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => setSelectedPost(post)}
                className="text-blue-700 underline"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
