"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";
import Link from "next/link";
import {
  Users,
  FileText,
  Bell,
  Upload,
  CheckCircle,
  XCircle,
  Loader2,
  ArrowLeft,
  UserCheck,
  UserX,
  Music,
  Calendar,
} from "lucide-react";

type MemberAccount = {
  uid: string;
  fullName: string;
  email: string;
  voicePart: string;
  phone: string;
  status: string;
  joinDate: string;
  lastLogin: string | null;
};

export default function AdminMembersPortalPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"members" | "materials" | "announcements">("members");
  
  // Members state
  const [members, setMembers] = useState<MemberAccount[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(false);
  
  // Materials state
  const [materialForm, setMaterialForm] = useState({
    title: "",
    description: "",
    category: "Sheet Music",
    fileUrl: "",
    fileType: "pdf",
  });
  const [isUploadingMaterial, setIsUploadingMaterial] = useState(false);
  
  // Announcements state
  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    content: "",
    priority: "medium" as "high" | "medium" | "low",
  });
  const [isPostingAnnouncement, setIsPostingAnnouncement] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Verify user is an admin
        const response = await fetch(`/api/admin/verify-admin?email=${encodeURIComponent(user.email || "")}`);
        const data = await response.json();

        if (!data.isAdmin) {
          alert("Access denied. You do not have admin privileges.");
          await auth.signOut();
          router.push("/admin/login");
          return;
        }

        setIsLoading(false);
        if (activeTab === "members") {
          fetchMembers();
        }
      } else {
        router.push("/admin/login");
      }
    });

    return () => unsubscribe();
  }, [router, activeTab]);

  useEffect(() => {
    if (!isLoading && activeTab === "members") {
      fetchMembers();
    }
  }, [activeTab, isLoading]);

  const fetchMembers = async () => {
    setIsLoadingMembers(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/members-portal/members", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setMembers(data.members || []);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setIsLoadingMembers(false);
    }
  };

  const updateMemberStatus = async (uid: string, newStatus: string) => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/members-portal/update-member", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ uid, status: newStatus }),
      });

      if (response.ok) {
        fetchMembers(); // Refresh list
        alert(`Member ${newStatus} successfully`);
      } else {
        alert("Failed to update member status");
      }
    } catch (error) {
      console.error("Error updating member:", error);
      alert("Error updating member status");
    }
  };

  const handleUploadMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploadingMaterial(true);

    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/members-portal/upload-material", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...materialForm,
          uploadDate: new Date().toISOString(),
          uploadedBy: auth.currentUser?.email || "Admin",
        }),
      });

      if (response.ok) {
        alert("Material uploaded successfully!");
        setMaterialForm({
          title: "",
          description: "",
          category: "Sheet Music",
          fileUrl: "",
          fileType: "pdf",
        });
      } else {
        alert("Failed to upload material");
      }
    } catch (error) {
      console.error("Error uploading material:", error);
      alert("Error uploading material");
    } finally {
      setIsUploadingMaterial(false);
    }
  };

  const handlePostAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPostingAnnouncement(true);

    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await fetch("/api/admin/members-portal/post-announcement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...announcementForm,
          date: new Date().toISOString(),
          postedBy: auth.currentUser?.email || "Admin",
        }),
      });

      if (response.ok) {
        alert("Announcement posted successfully!");
        setAnnouncementForm({
          title: "",
          content: "",
          priority: "medium",
        });
      } else {
        alert("Failed to post announcement");
      }
    } catch (error) {
      console.error("Error posting announcement:", error);
      alert("Error posting announcement");
    } finally {
      setIsPostingAnnouncement(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Music className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Members Portal Admin</h1>
                <p className="text-sm text-gray-600">Manage member accounts & content</p>
              </div>
            </div>
            <Link
              href="/admin"
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Admin
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-8 border border-gray-200">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("members")}
              className={`flex-1 px-6 py-4 font-semibold transition flex items-center justify-center gap-2 ${
                activeTab === "members"
                  ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Users className="w-5 h-5" />
              Member Accounts
            </button>
            <button
              onClick={() => setActiveTab("materials")}
              className={`flex-1 px-6 py-4 font-semibold transition flex items-center justify-center gap-2 ${
                activeTab === "materials"
                  ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FileText className="w-5 h-5" />
              Upload Materials
            </button>
            <button
              onClick={() => setActiveTab("announcements")}
              className={`flex-1 px-6 py-4 font-semibold transition flex items-center justify-center gap-2 ${
                activeTab === "announcements"
                  ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Bell className="w-5 h-5" />
              Post Announcements
            </button>
          </div>
        </div>

        {/* Members Tab */}
        {activeTab === "members" && (
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Member Accounts</h2>
              <button
                onClick={fetchMembers}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Refresh
              </button>
            </div>

            {isLoadingMembers ? (
              <div className="text-center py-12">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Loading members...</p>
              </div>
            ) : members.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No member accounts yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Voice Part</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Join Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {members.map((member) => (
                      <tr key={member.uid} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{member.fullName}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{member.email}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{member.voicePart}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              member.status === "approved"
                                ? "bg-green-100 text-green-700"
                                : member.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {member.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {new Date(member.joinDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            {member.status !== "approved" && (
                              <button
                                onClick={() => updateMemberStatus(member.uid, "approved")}
                                className="p-1 text-green-600 hover:bg-green-50 rounded transition"
                                title="Approve"
                              >
                                <UserCheck className="w-5 h-5" />
                              </button>
                            )}
                            {member.status !== "rejected" && (
                              <button
                                onClick={() => updateMemberStatus(member.uid, "rejected")}
                                className="p-1 text-red-600 hover:bg-red-50 rounded transition"
                                title="Reject"
                              >
                                <UserX className="w-5 h-5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Materials Tab */}
        {activeTab === "materials" && (
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Rehearsal Material</h2>
            <form onSubmit={handleUploadMaterial} className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={materialForm.title}
                  onChange={(e) => setMaterialForm({ ...materialForm, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  value={materialForm.description}
                  onChange={(e) => setMaterialForm({ ...materialForm, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select
                    value={materialForm.category}
                    onChange={(e) => setMaterialForm({ ...materialForm, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Sheet Music</option>
                    <option>Audio Recordings</option>
                    <option>Learning Resources</option>
                    <option>Concert Materials</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">File Type *</label>
                  <select
                    value={materialForm.fileType}
                    onChange={(e) => setMaterialForm({ ...materialForm, fileType: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pdf">PDF</option>
                    <option value="audio">Audio</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">File URL *</label>
                <input
                  type="url"
                  value={materialForm.fileUrl}
                  onChange={(e) => setMaterialForm({ ...materialForm, fileUrl: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload file to Firebase Storage or external host, then paste URL here
                </p>
              </div>

              <button
                type="submit"
                disabled={isUploadingMaterial}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isUploadingMaterial ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Upload Material
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Announcements Tab */}
        {activeTab === "announcements" && (
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Post Announcement</h2>
            <form onSubmit={handlePostAnnouncement} className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={announcementForm.title}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                <textarea
                  value={announcementForm.content}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={6}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority *</label>
                <select
                  value={announcementForm.priority}
                  onChange={(e) =>
                    setAnnouncementForm({
                      ...announcementForm,
                      priority: e.target.value as "high" | "medium" | "low",
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low (General Info)</option>
                  <option value="medium">Medium (Important)</option>
                  <option value="high">High (Urgent)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isPostingAnnouncement}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isPostingAnnouncement ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Posting...
                  </>
                ) : (
                  <>
                    <Bell className="w-5 h-5" />
                    Post Announcement
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
