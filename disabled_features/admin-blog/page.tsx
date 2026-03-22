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
import DataTable from "@/components/admin/DataTable";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { Edit, Trash2, Plus, Calendar, User, FileText } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author?: string;
  date?: string;
  image: string;
  slug: string;
  createdAt?: any;
}

const emptyPost: Omit<BlogPost, "id"> = {
  title: "",
  excerpt: "",
  content: "",
  author: "",
  date: "",
  image: "",
  slug: "",
};

export default function ManageBlogPage() {
  useAuthRedirect();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [formData, setFormData] = useState<Omit<BlogPost, "id">>({
    ...emptyPost,
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const snapshot = await getDocs(collection(db, "posts"));

      if (snapshot.empty) {
        setPosts([]);
        return;
      }

      const data: BlogPost[] = [];
      snapshot.docs.forEach((doc) => {
        const docData = doc.data();
        data.push({
          id: doc.id,
          title: docData.title || "",
          excerpt: docData.excerpt || "",
          content: docData.content || "",
          author: docData.author || "The Chorus Abuja",
          date: docData.date || new Date().toLocaleDateString(),
          image: docData.image || "",
          slug: docData.slug || "",
          createdAt: docData.createdAt || null,
        });
      });

      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEdit = (post: BlogPost) => {
    setFormData({
      title: post.title,
      excerpt: post.excerpt || "",
      content: post.content,
      author: post.author || "",
      date: post.date || "",
      image: post.image || "",
      slug: post.slug || "",
    });
    setEditId(post.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog post?"
    );
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "posts", id));
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post.");
    }
  };

  const handleFormSuccess = () => {
    fetchPosts();
    setEditId(null);
    setFormData({ ...emptyPost });
    setShowForm(false);
  };

  const columns = [
    {
      key: "title",
      label: "Title",
      sortable: true,
      render: (value: string, row: BlogPost) => (
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 rounded-full flex-shrink-0">
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900 line-clamp-2">
              {value}
            </div>
            <div className="text-sm text-gray-500 mt-1 line-clamp-1">
              {row.excerpt || "No excerpt available"}
            </div>
            <div className="text-xs text-blue-600 mt-1">
              /{row.slug || "no-slug"}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "author",
      label: "Author",
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{value}</span>
        </div>
      ),
    },
    {
      key: "date",
      label: "Published Date",
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{value}</span>
        </div>
      ),
    },
  ];

  const actions = [
    {
      label: "Edit Post",
      icon: Edit,
      onClick: (row: BlogPost) => handleEdit(row),
      variant: "primary" as const,
    },
    {
      label: "Delete Post",
      icon: Trash2,
      onClick: (row: BlogPost) => handleDelete(row.id),
      variant: "danger" as const,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        title="Blog Management"
        description={`Manage ${posts.length} blog posts and articles`}
        action={
          <button
            onClick={() => {
              setEditId(null);
              setFormData({ ...emptyPost });
              setShowForm(!showForm);
            }}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            {showForm ? "Hide Form" : "Create Post"}
          </button>
        }
      />

      {showForm && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editId ? "Edit Blog Post" : "Create New Blog Post"}
          </h2>
          <BlogForm
            initialData={editId ? formData : undefined}
            onSuccess={handleFormSuccess}
          />
        </div>
      )}

      <DataTable
        data={posts}
        columns={columns}
        actions={actions}
        searchable={true}
        exportable={true}
        selectable={true}
        pagination={true}
        pageSize={10}
        loading={loading}
        emptyMessage="No blog posts created yet. Start by creating your first post."
      />
    </div>
  );
}
