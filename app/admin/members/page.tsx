// app/admin/members/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase/config";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import AddMemberForm from "@/components/AddMemberForm";

interface Member {
  id: string;
  name: string;
  title: string;
  section: string;
  bio: string;
  image: string;
}

export default function AdminMembersPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [editing, setEditing] = useState<Member | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        fetchMembers();
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const fetchMembers = async () => {
    const querySnapshot = await getDocs(collection(db, "members"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Member, "id">),
    }));
    setMembers(data);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;

    const { id, ...rest } = editing;
    try {
      await updateDoc(doc(db, "members", id), rest);
      setEditing(null);
      fetchMembers();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this member?")) return;

    try {
      await deleteDoc(doc(db, "members", id));
      fetchMembers();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase()) ||
    member.title.toLowerCase().includes(search.toLowerCase()) ||
    member.section.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow rounded p-6 mb-10">
        <h1 className="text-2xl font-bold mb-4 text-center">Add New Member</h1>
        <AddMemberForm />
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Existing Members</h2>

        <input
          type="text"
          placeholder="Search by name, title, or section..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 p-2 border rounded"
        />

        <ul className="divide-y">
          {paginatedMembers.map((member) => (
            <li key={member.id} className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-gray-500">
                    {member.title} - {member.section}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditing(member)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex justify-between mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm self-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {editing && (
          <form onSubmit={handleUpdate} className="mt-6 space-y-4">
            <h3 className="font-bold text-lg">Editing {editing.name}</h3>
            <input
              name="name"
              value={editing.name}
              onChange={(e) =>
                setEditing({ ...editing, name: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            />
            <input
              name="title"
              value={editing.title}
              onChange={(e) =>
                setEditing({ ...editing, title: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            />
            <input
              name="section"
              value={editing.section}
              onChange={(e) =>
                setEditing({ ...editing, section: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            />
            <input
              name="image"
              value={editing.image}
              onChange={(e) =>
                setEditing({ ...editing, image: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            />
            <textarea
              name="bio"
              value={editing.bio}
              onChange={(e) =>
                setEditing({ ...editing, bio: e.target.value })
              }
              rows={5}
              className="w-full border p-2 rounded"
              required
            />
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
