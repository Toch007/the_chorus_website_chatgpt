// app/admin/blogs/manage/page.tsx

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
import BlogForm from "@/components/admin/BlogForm";

export default function ManageBlogsPage() {
  useAuthRedirect();

  const [blogs, setBlogs] = useState<any[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchBlogs = async () => {
    const snapshot = await getDocs(query(collection(db, "posts"), orderBy("date", "desc")));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleEdit = (blog: any) => {
    setSelectedBlog(blog);
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this blog post?");
    if (!confirm) return;
    await deleteDoc(doc(db, "posts", id));
    fetchBlogs();
  };

  const filteredBlogs = blogs.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.author?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedBlogs = filteredBlogs.slice(start, start + itemsPerPage);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Blog Posts</h1>

      <BlogForm
        initialData={selectedBlog}
        onSuccess={() => {
          fetchBlogs();
          setSelectedBlog(null);
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
        {paginatedBlogs.map((blog) => (
          <div key={blog.id} className="border p-4 rounded bg-white shadow">
            <h2 className="font-semibold text-xl">{blog.title}</h2>
            <p className="text-sm text-gray-500">By {blog.author} | {blog.date}</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleEdit(blog)}
                className="text-blue-700 underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog.id)}
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
    </div>
  );
}
