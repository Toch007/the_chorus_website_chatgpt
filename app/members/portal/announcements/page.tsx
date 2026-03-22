"use client";

import { useMemberAuth } from "@/hooks/useMemberAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Music,
  Bell,
  AlertCircle,
  Info,
  CheckCircle,
  LogOut,
  Loader2,
  Home,
  ArrowLeft,
  Calendar,
  Filter,
} from "lucide-react";

type Announcement = {
  id: string;
  title: string;
  content: string;
  priority: "high" | "medium" | "low";
  date: string;
  postedBy: string;
};

export default function AnnouncementsPage() {
  const { user, memberData, loading } = useMemberAuth();
  const router = useRouter();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<Announcement[]>([]);
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [isLoadingAnnouncements, setIsLoadingAnnouncements] = useState(true);

  const priorities = ["all", "high", "medium", "low"];

  useEffect(() => {
    if (user) {
      fetchAnnouncements();
    }
  }, [user]);

  useEffect(() => {
    filterAnnouncements();
  }, [selectedPriority, announcements]);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch("/api/members/announcements");
      const data = await response.json();
      setAnnouncements(data.announcements || []);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setIsLoadingAnnouncements(false);
    }
  };

  const filterAnnouncements = () => {
    let filtered = announcements;

    if (selectedPriority !== "all") {
      filtered = filtered.filter((a) => a.priority === selectedPriority);
    }

    setFilteredAnnouncements(filtered);
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/members/login");
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "medium":
        return <Info className="w-5 h-5 text-yellow-500" />;
      case "low":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-blue-500" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const styles = {
      high: "bg-red-100 text-red-700 border-red-200",
      medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
      low: "bg-green-100 text-green-700 border-green-200",
    };
    return styles[priority as keyof typeof styles] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Music className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
              <p className="text-sm text-gray-600">The Chorus Abuja</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/members/portal"
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Portal</span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Filter Section */}
        <section className="mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredAnnouncements.length} of {announcements.length} announcements
            </div>
          </div>
        </section>

        {/* Announcements List */}
        <section className="space-y-6">
          {isLoadingAnnouncements ? (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading announcements...</p>
            </div>
          ) : filteredAnnouncements.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-100">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {announcements.length === 0 ? "No announcements yet" : "No results found"}
              </h3>
              <p className="text-gray-600">
                {announcements.length === 0
                  ? "Check back soon! Important updates will appear here."
                  : "Try adjusting your filter criteria"}
              </p>
            </div>
          ) : (
            filteredAnnouncements.map((announcement) => (
              <div
                key={announcement.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 overflow-hidden"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-1">{getPriorityIcon(announcement.priority)}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {announcement.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(announcement.date).toLocaleDateString()}</span>
                          </div>
                          <span>•</span>
                          <span>Posted by {announcement.postedBy}</span>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full border ${getPriorityBadge(
                        announcement.priority
                      )}`}
                    >
                      {announcement.priority.toUpperCase()}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {announcement.content}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>

        {/* Help Section */}
        <section className="mt-8">
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
            <h3 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              About Announcements
            </h3>
            <p className="text-sm text-purple-800 mb-4">
              Stay updated with important choir information, event details, rehearsal changes, and 
              general notices. High priority announcements require immediate attention.
            </p>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 text-sm">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-purple-800">High = Urgent</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Info className="w-4 h-4 text-yellow-500" />
                <span className="text-purple-800">Medium = Important</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-purple-800">Low = General Info</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
