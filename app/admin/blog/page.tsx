// app/admin/blog/page.tsx

"use client";

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
import BlogForm from "@/components/admin/BlogForm";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const emptyPost = {
  title: "",
  content: "",
  author: "",
  date: "",
  image: "",
};

export default function ManageBlogPage() {
  useAuthRedirect();
  const [posts, setPosts] = useState<any[]>([]);
  const [formData, setFormData] = useState({ ...emptyPost });
  const [editId, setEditId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchPosts = async () => {
    const snapshot = await getDocs(query(collection(db, "posts"), orderBy("date", "desc")));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEdit = (post: any) => {
    setFormData(post);
    setEditId(post.id);
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this blog post?");
    if (!confirm) return;
    await deleteDoc(doc(db, "posts", id));
    fetchPosts();
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.author.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedPosts = filteredPosts.slice(start, start + itemsPerPage);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Blog Posts</h1>

      <BlogForm
        initialData={editId ? formData : undefined}
        onSuccess={() => {
          fetchPosts();
          setEditId(null);
          setFormData({ ...emptyPost });
        }}
      />

      <div className="my-6">
        <input
          type="text"
          placeholder="Search by title or author"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="grid gap-4 mt-4">
        {paginatedPosts.map((post) => (
          <div key={post.id} className="border p-4 rounded bg-white shadow">
            <h2 className="font-semibold text-xl">{post.title}</h2>
            <p className="text-sm text-gray-500">
              {post.author} | {post.date}
            </p>
            <div className="mt-2 flex gap-4">
              <button
                onClick={() => handleEdit(post)}
                className="text-blue-700 underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
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
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
