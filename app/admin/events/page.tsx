// app/admin/events/page.tsx
"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "@/firebase/config";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import DataTable from "@/components/admin/DataTable";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Calendar, MapPin, Edit, Trash2, Plus, Music } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  composer: string;
  date: string;
  venue: string;
  imageUrl: string;
  status: "upcoming" | "concluded";
}

export default function AdminEventsPage() {
  useAuthRedirect();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const snapshot = await getDocs(collection(db, "events"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Event[];
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id: string, imageUrl: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "events", id));
      if (imageUrl) {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      }
      setEvents((prev) => prev.filter((event) => event.id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event.");
    }
  };

  const columns = [
    {
      key: "imageUrl",
      label: "Image",
      sortable: false,
      render: (value: string, row: Event) => (
        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
          {value ? (
            <Image src={value} alt={row.title} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Music className="w-6 h-6 text-gray-400" />
            </div>
          )}
        </div>
      ),
    },
    {
      key: "title",
      label: "Event Title",
      sortable: true,
      render: (value: string, row: Event) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.composer}</div>
        </div>
      ),
    },
    {
      key: "date",
      label: "Date",
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{value}</span>
        </div>
      ),
    },
    {
      key: "venue",
      label: "Venue",
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{value}</span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            value === "upcoming"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  const actions = [
    {
      label: "Edit Event",
      icon: Edit,
      onClick: (row: Event) =>
        (window.location.href = `/admin/events/edit/${row.id}`),
      variant: "primary" as const,
    },
    {
      label: "Delete Event",
      icon: Trash2,
      onClick: (row: Event) => handleDelete(row.id, row.imageUrl),
      variant: "danger" as const,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        title="Events Management"
        description={`Manage ${events.length} events and performances`}
        action={
          <Link
            href="/admin/events/create"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Event
          </Link>
        }
      />

      <DataTable
        data={events}
        columns={columns}
        actions={actions}
        searchable={true}
        exportable={true}
        selectable={true}
        pagination={true}
        pageSize={10}
        loading={loading}
        emptyMessage="No events created yet. Start by creating your first event."
      />
    </div>
  );
}
