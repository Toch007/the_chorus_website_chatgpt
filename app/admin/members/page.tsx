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
} from "firebase/firestore";
import AddMemberForm from "@/components/AddMemberForm";
import DataTable from "@/components/admin/DataTable";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Edit, Trash2, Plus, User } from "lucide-react";
import Image from "next/image";

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
  const [showAddForm, setShowAddForm] = useState(false);

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

  const columns = [
    {
      key: "image",
      label: "Photo",
      sortable: false,
      render: (value: string, row: Member) => (
        <div className="flex items-center">
          {value ? (
            <Image
              src={value}
              alt={row.name}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-400" />
            </div>
          )}
        </div>
      ),
      width: "80px",
    },
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (value: string, row: Member) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.title}</div>
        </div>
      ),
    },
    {
      key: "section",
      label: "Section",
      sortable: true,
      render: (value: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            value.toLowerCase().includes("soprano")
              ? "bg-pink-100 text-pink-800"
              : value.toLowerCase().includes("alto")
                ? "bg-purple-100 text-purple-800"
                : value.toLowerCase().includes("tenor")
                  ? "bg-blue-100 text-blue-800"
                  : value.toLowerCase().includes("bass")
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "bio",
      label: "Bio",
      sortable: false,
      render: (value: string) => (
        <div className="max-w-xs">
          <p className="text-sm text-gray-600 truncate" title={value}>
            {value}
          </p>
        </div>
      ),
    },
  ];

  const actions = [
    {
      label: "Edit Member",
      icon: Edit,
      onClick: (row: Member) => setEditing(row),
      variant: "primary" as const,
    },
    {
      label: "Delete Member",
      icon: Trash2,
      onClick: (row: Member) => handleDelete(row.id),
      variant: "danger" as const,
    },
  ];

  if (loading) {
    return (
      <div className="p-6">
        <AdminPageHeader
          title="Members Management"
          description="Manage choir members and their information"
        />
        <div className="mt-6">
          <DataTable data={[]} columns={columns} loading={true} />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        title="Members Management"
        description={`Manage ${members.length} choir members and their information`}
        action={
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Member
          </button>
        }
      />

      {showAddForm && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Add New Member
            </h2>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <AddMemberForm />
        </div>
      )}

      <DataTable
        data={members}
        columns={columns}
        actions={actions}
        searchable={true}
        exportable={true}
        selectable={true}
        pagination={true}
        pageSize={10}
        emptyMessage="No members found. Add your first member to get started."
      />

      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Edit Member: {editing.name}
              </h3>
              <button
                onClick={() => setEditing(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  name="name"
                  value={editing.name}
                  onChange={(e) =>
                    setEditing({ ...editing, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  name="title"
                  value={editing.title}
                  onChange={(e) =>
                    setEditing({ ...editing, title: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section
                </label>
                <select
                  name="section"
                  value={editing.section}
                  onChange={(e) =>
                    setEditing({ ...editing, section: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a section</option>
                  <option value="Soprano">Soprano</option>
                  <option value="Alto">Alto</option>
                  <option value="Tenor">Tenor</option>
                  <option value="Bass">Bass</option>
                  <option value="Accompanists">Accompanists</option>
                  <option value="Music Director">Music Director</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  name="image"
                  value={editing.image}
                  onChange={(e) =>
                    setEditing({ ...editing, image: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={editing.bio}
                  onChange={(e) =>
                    setEditing({ ...editing, bio: e.target.value })
                  }
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
