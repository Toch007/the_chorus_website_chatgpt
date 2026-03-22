// app/admin/newsletter/page.tsx

"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import DataTable from "@/components/admin/DataTable";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import {
  Mail,
  Trash2,
  Calendar,
  Users,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface Subscriber {
  id: string;
  email: string;
  status: string;
  subscribedAt: any;
  unsubscribedAt?: any;
}

export default function NewsletterAdminPage() {
  useAuthRedirect();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCount, setActiveCount] = useState(0);

  const fetchSubscribers = async () => {
    try {
      // Fetch all subscribers to show both subscribed and unsubscribed
      const q = query(
        collection(db, "newsletterSubscribers"),
        orderBy("subscribedAt", "desc")
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        email: doc.data().email,
        status: doc.data().status || "subscribed",
        subscribedAt: doc.data().subscribedAt,
        unsubscribedAt: doc.data().unsubscribedAt,
      }));
      setSubscribers(data);
      setActiveCount(data.filter((sub) => sub.status === "subscribed").length);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleDelete = async (id: string, email: string) => {
    const confirm = window.confirm(
      `Are you sure you want to remove ${email} from the newsletter?`
    );
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "newsletterSubscribers", id));
      setSubscribers((prev) => prev.filter((sub) => sub.id !== id));
    } catch (error) {
      console.error("Error deleting subscriber:", error);
      alert("Failed to remove subscriber. Please try again.");
    }
  };

  const columns = [
    {
      key: "email",
      label: "Email Address",
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-full">
            <Mail className="w-4 h-4 text-blue-600" />
          </div>
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center gap-2">
          {value === "subscribed" ? (
            <>
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">
                Subscribed
              </span>
            </>
          ) : (
            <>
              <XCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-600">
                Unsubscribed
              </span>
            </>
          )}
        </div>
      ),
    },
    {
      key: "subscribedAt",
      label: "Subscription Date",
      sortable: true,
      render: (value: any) => {
        const date = value?.toDate?.() || new Date(value);
        return (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        );
      },
    },
  ];

  const actions = [
    {
      label: "Remove Subscriber",
      icon: Trash2,
      onClick: (row: Subscriber) => handleDelete(row.id, row.email),
      variant: "danger" as const,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        title="Newsletter Subscribers"
        description={`Manage ${subscribers.length} total subscribers (${activeCount} active)`}
        action={
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">
                {activeCount} Active
              </span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">
                {subscribers.length} Total
              </span>
            </div>
          </div>
        }
      />

      <DataTable
        data={subscribers}
        columns={columns}
        actions={actions}
        searchable={true}
        exportable={true}
        selectable={true}
        pagination={true}
        pageSize={20}
        loading={loading}
        emptyMessage="No newsletter subscribers yet. Subscriptions will appear here when people sign up."
      />
    </div>
  );
}
