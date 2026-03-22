"use client";

import { useEffect, useState } from "react";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import NewsletterComposer from "@/components/admin/NewsletterComposer";
import { Mail, Users, Send, BookOpen } from "lucide-react";
import Link from "next/link";

export default function NewsletterSendPage() {
  useAuthRedirect();
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriberCount();
  }, []);

  const fetchSubscriberCount = async () => {
    try {
      // Fetch subscriber count from server-side API using Admin SDK
      const { getAuth } = await import("firebase/auth");
      const auth = getAuth();
      const token = await auth.currentUser?.getIdToken();

      if (!token) {
        console.error("Not authenticated");
        setSubscriberCount(0);
        setLoading(false);
        return;
      }

      const response = await fetch("/api/admin/newsletter/count", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch subscriber count");
      }

      const data = await response.json();
      console.log("Subscriber count from API:", data.count);
      setSubscriberCount(data.count || 0);
    } catch (error) {
      console.error("Error fetching subscriber count:", error);
      setSubscriberCount(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        title="Send Newsletter"
        description="Compose and send newsletters to all subscribers"
        action={
          <Link
            href="/admin/newsletter"
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            <Users className="w-4 h-4" />
            View Subscribers
          </Link>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Subscribers</p>
              <p className="text-2xl font-bold text-gray-900">
                {loading ? "..." : subscriberCount}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Ready to Send</p>
              <p className="text-2xl font-bold text-gray-900">
                {loading ? "..." : subscriberCount > 0 ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Send className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Email Service</p>
              <p className="text-lg font-bold text-gray-900">Resend</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-medium text-blue-900 mb-2">Newsletter Tips</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Always send a test email to yourself first</li>
              <li>• Use HTML for better formatting and styling</li>
              <li>
                • Keep subject lines short and compelling (under 50 characters)
              </li>
              <li>• Include images with absolute URLs (https://...)</li>
              <li>• Unsubscribe links are automatically added to all emails</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Composer */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Compose Newsletter
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Create and send your newsletter to all subscribers
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent" />
          </div>
        ) : (
          <NewsletterComposer subscriberCount={subscriberCount} />
        )}
      </div>
    </div>
  );
}
