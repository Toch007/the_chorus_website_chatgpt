"use client";

import { useEffect, useState } from "react";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import DataTable from "@/components/admin/DataTable";
import {
  MessageSquare,
  Star,
  Trash2,
  Mail,
  Calendar,
  User,
} from "lucide-react";

interface Feedback {
  id: string;
  name: string;
  email: string;
  rating: number;
  message: string;
  eventName?: string;
  submittedAt: string;
  status: "new" | "reviewed" | "archived";
}

export default function AdminFeedbackPage() {
  useAuthRedirect();
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    averageRating: 0,
    new: 0,
  });

  const fetchFeedback = async () => {
    try {
      const response = await fetch("/api/feedback");
      const data = await response.json();

      if (data.success) {
        setFeedback(data.feedback);

        // Calculate stats
        const total = data.feedback.length;
        const newCount = data.feedback.filter(
          (f: Feedback) => f.status === "new"
        ).length;
        const avgRating =
          total > 0
            ? data.feedback.reduce(
                (sum: number, f: Feedback) => sum + f.rating,
                0
              ) / total
            : 0;

        setStats({
          total,
          averageRating: Math.round(avgRating * 10) / 10,
          new: newCount,
        });
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this feedback?")) return;

    try {
      const response = await fetch(`/api/feedback?id=${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        await fetchFeedback();
        alert("✅ Feedback deleted successfully");
      } else {
        alert("❌ " + data.error);
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
      alert("❌ Failed to delete feedback");
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const columns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (value: string, row: Feedback) => (
        <div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-gray-900">{value}</span>
          </div>
          {row.eventName && (
            <div className="text-xs text-gray-500 mt-1">
              Event: {row.eventName}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (value: string) => (
        <a
          href={`mailto:${value}`}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
        >
          <Mail className="w-3 h-3" />
          {value}
        </a>
      ),
    },
    {
      key: "rating",
      label: "Rating",
      sortable: true,
      render: (value: number) => (
        <div className="flex flex-col gap-1">
          {renderStars(value)}
          <span className="text-xs text-gray-500">{value}/5</span>
        </div>
      ),
    },
    {
      key: "message",
      label: "Feedback",
      render: (value: string) => (
        <div className="max-w-md">
          <p className="text-sm text-gray-700 line-clamp-2">{value}</p>
        </div>
      ),
    },
    {
      key: "submittedAt",
      label: "Date",
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Calendar className="w-3 h-3" />
          {new Date(value).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === "new"
              ? "bg-green-100 text-green-700"
              : value === "reviewed"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700"
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  const actions = [
    {
      label: "Delete",
      icon: Trash2,
      onClick: (row: Feedback) => handleDelete(row.id),
      variant: "danger" as const,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        title="Feedback Management"
        description="View and manage feedback from your audience"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Feedback</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Rating</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-gray-900">
                  {stats.averageRating}
                </p>
                <span className="text-sm text-gray-500">/ 5.0</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <MessageSquare className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">New Feedback</p>
              <p className="text-2xl font-bold text-gray-900">{stats.new}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <DataTable
          data={feedback}
          columns={columns}
          actions={actions}
          searchable={true}
          exportable={true}
          pagination={true}
          pageSize={20}
          loading={loading}
          emptyMessage="No feedback yet. Encourage your audience to share their thoughts!"
        />
      </div>
    </div>
  );
}
