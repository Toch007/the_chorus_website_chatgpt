// app/admin/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import {
  Users,
  Calendar,
  FileText,
  Mail,
  Ticket,
  UserPlus,
  Building2,
  BarChart3,
  TrendingUp,
  Activity,
  ExternalLink,
} from "lucide-react";

interface DashboardStats {
  totalMembers: number;
  totalEvents: number;
  newsletterSubscribers: number;
  pendingApplications: number;
  recentEvents: number;
  blogPosts: number;
  totalDonations: number;
  totalPartners: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalMembers: 0,
    totalEvents: 0,
    newsletterSubscribers: 0,
    pendingApplications: 0,
    recentEvents: 0,
    blogPosts: 0,
    totalDonations: 0,
    totalPartners: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/admin/login");
      } else {
        setAuthenticated(true);
        fetchDashboardStats();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      const result = await response.json();

      if (result.success && result.stats) {
        setStats(result.stats);
      } else {
        console.error("Failed to fetch dashboard stats:", result.message);
        // Set default stats if API fails
        setStats({
          totalMembers: 0,
          totalEvents: 0,
          newsletterSubscribers: 0,
          pendingApplications: 0,
          recentEvents: 0,
          blogPosts: 0,
          totalDonations: 0,
          totalPartners: 0,
        });
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      // Set stats to 0 if there's an error to prevent undefined behavior
      setStats({
        totalMembers: 0,
        totalEvents: 0,
        newsletterSubscribers: 0,
        pendingApplications: 0,
        recentEvents: 0,
        blogPosts: 0,
        totalDonations: 0,
        totalPartners: 0,
      });
    } finally {
      setStatsLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  if (!authenticated) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 lg:ml-0">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6 lg:ml-0 ml-12">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome back! Here's your choir management overview.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Members
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {statsLoading ? "..." : stats.totalMembers}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">Active</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Events
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {statsLoading ? "..." : stats.totalEvents}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <Activity className="w-4 h-4 text-blue-500 mr-1" />
              <span className="text-blue-600 font-medium">
                {statsLoading ? "..." : stats.recentEvents} this month
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Newsletter</p>
                <p className="text-3xl font-bold text-gray-900">
                  {statsLoading ? "..." : stats.newsletterSubscribers}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <BarChart3 className="w-4 h-4 text-purple-500 mr-1" />
              <span className="text-purple-600 font-medium">Subscribers</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Applications
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {statsLoading ? "..." : stats.pendingApplications}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <UserPlus className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <Activity className="w-4 h-4 text-orange-500 mr-1" />
              <span className="text-orange-600 font-medium">
                Pending Review
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Partners</p>
                <p className="text-3xl font-bold text-gray-900">
                  {statsLoading ? "..." : stats.totalPartners}
                </p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-full">
                <Building2 className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <BarChart3 className="w-4 h-4 text-indigo-500 mr-1" />
              <span className="text-indigo-600 font-medium">Collaborating</span>
            </div>
          </div>
        </div>

        {/* Main Management Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Core Management */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Core Management
            </h2>
            <div className="space-y-3">
              <Link
                href="/admin/members"
                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-200 hover:border-blue-200 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">
                    Manage Members
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
              </Link>

              <Link
                href="/admin/events"
                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-green-50 rounded-lg border border-gray-200 hover:border-green-200 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900">
                    Manage Events
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-600" />
              </Link>

              <Link
                href="/admin/blog"
                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-purple-50 rounded-lg border border-gray-200 hover:border-purple-200 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900">
                    Manage Blog Posts
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-600" />
              </Link>

              <Link
                href="/admin/newsletter"
                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-indigo-50 rounded-lg border border-gray-200 hover:border-indigo-200 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-indigo-600" />
                  <span className="font-medium text-gray-900">
                    Newsletter Subscribers
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-indigo-600" />
              </Link>

              <Link
                href="/admin/tickets"
                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-yellow-50 rounded-lg border border-gray-200 hover:border-yellow-200 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Ticket className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium text-gray-900">
                    Manage Tickets
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-yellow-600" />
              </Link>

              <Link
                href="/admin/partners"
                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-indigo-50 rounded-lg border border-gray-200 hover:border-indigo-200 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-indigo-600" />
                  <span className="font-medium text-gray-900">
                    Manage Partners
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-indigo-600" />
              </Link>
            </div>
          </div>

          {/* Join Applications */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-orange-600" />
              Join Applications
              {stats.pendingApplications > 0 && (
                <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {stats.pendingApplications} pending
                </span>
              )}
            </h2>
            <div className="space-y-3">
              <Link
                href="/admin/join/choir"
                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-orange-50 rounded-lg border border-gray-200 hover:border-orange-200 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="text-xl">🎶</div>
                  <span className="font-medium text-gray-900">
                    Choir Applications
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-600" />
              </Link>

              <Link
                href="/admin/join/volunteer"
                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-orange-50 rounded-lg border border-gray-200 hover:border-orange-200 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="text-xl">🙌</div>
                  <span className="font-medium text-gray-900">
                    Volunteer Applications
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-600" />
              </Link>

              <Link
                href="/admin/join/media"
                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-orange-50 rounded-lg border border-gray-200 hover:border-orange-200 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="text-xl">🎥</div>
                  <span className="font-medium text-gray-900">
                    Media Team Applications
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-600" />
              </Link>

              <Link
                href="/admin/join/tech"
                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-orange-50 rounded-lg border border-gray-200 hover:border-orange-200 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="text-xl">🛠️</div>
                  <span className="font-medium text-gray-900">
                    Tech Team Applications
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-600" />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Overview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {statsLoading ? "..." : stats.totalMembers}
              </div>
              <div className="text-sm text-gray-600">Total Members</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {statsLoading ? "..." : stats.totalEvents}
              </div>
              <div className="text-sm text-gray-600">Total Events</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {statsLoading ? "..." : stats.blogPosts}
              </div>
              <div className="text-sm text-gray-600">Blog Posts</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {statsLoading ? "..." : stats.pendingApplications}
              </div>
              <div className="text-sm text-gray-600">Applications</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
