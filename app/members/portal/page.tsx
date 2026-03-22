"use client";

import { useMemberAuth } from "@/hooks/useMemberAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Music,
  FileText,
  Bell,
  User,
  Calendar,
  TrendingUp,
  Download,
  LogOut,
  Loader2,
  Home,
} from "lucide-react";

export default function MemberPortalPage() {
  const { user, memberData, loading } = useMemberAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/members/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your portal...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Member Portal</h1>
              <p className="text-sm text-gray-600">The Chorus Abuja</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
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

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  Welcome back, {memberData?.fullName?.split(" ")[0]}!
                </h2>
                <p className="text-blue-100 mb-1">
                  {memberData?.voicePart} • Member since{" "}
                  {new Date(memberData?.joinDate).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-sm text-blue-200">
                  Last login: {memberData?.lastLogin ? new Date(memberData.lastLogin).toLocaleString() : "First time"}
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center border border-white/30">
                <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                <div className="text-3xl font-bold">{memberData?.attendanceRate || 0}%</div>
                <div className="text-sm text-blue-100">Attendance Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link
            href="/members/portal/materials"
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all group hover:-translate-y-1 border border-gray-100"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Rehearsal Materials</h3>
            <p className="text-gray-600 text-sm">Access sheet music, audio files, and learning resources</p>
          </Link>

          <Link
            href="/members/portal/announcements"
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all group hover:-translate-y-1 border border-gray-100"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Bell className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Announcements</h3>
            <p className="text-gray-600 text-sm">View latest updates and important notices</p>
          </Link>

          <Link
            href="/members/portal/profile"
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all group hover:-translate-y-1 border border-gray-100"
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">My Profile</h3>
            <p className="text-gray-600 text-sm">Update your information and preferences</p>
          </Link>

          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Next Rehearsal</h3>
            <p className="text-gray-600 text-sm mb-2">Sunday, 2:00 PM</p>
            <p className="text-xs text-gray-500">St. Matthews Anglican Church</p>
          </div>
        </section>

        {/* Recent Activity Section */}
        <section className="grid lg:grid-cols-2 gap-6">
          {/* Latest Materials */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Latest Materials</h3>
              <Link
                href="/members/portal/materials"
                className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
              >
                View All →
              </Link>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Download className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">No materials yet</h4>
                  <p className="text-sm text-gray-600">Check back soon for updates</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Announcements */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Recent Announcements</h3>
              <Link
                href="/members/portal/announcements"
                className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
              >
                View All →
              </Link>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Bell className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">No announcements yet</h4>
                  <p className="text-sm text-gray-600">Stay tuned for updates</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Info Banner */}
        <section className="mt-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold text-blue-900 mb-2">Welcome to the Member Portal!</h3>
            <p className="text-sm text-blue-800">
              This is your central hub for all choir-related materials and information. Access rehearsal materials, 
              view announcements, and stay connected with The Chorus Abuja. If you need any help, please contact the admin.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
