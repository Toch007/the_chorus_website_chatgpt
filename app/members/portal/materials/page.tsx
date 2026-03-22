"use client";

import { useMemberAuth } from "@/hooks/useMemberAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Music,
  FileText,
  Download,
  Search,
  Filter,
  LogOut,
  Loader2,
  Home,
  ArrowLeft,
  Calendar,
  Folder,
  Volume2,
  File,
} from "lucide-react";

type Material = {
  id: string;
  title: string;
  description: string;
  category: string;
  fileUrl: string;
  fileType: string; // pdf, audio, video
  uploadDate: string;
  uploadedBy: string;
};

export default function MaterialsPage() {
  const { user, memberData, loading } = useMemberAuth();
  const router = useRouter();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoadingMaterials, setIsLoadingMaterials] = useState(true);

  const categories = ["all", "Sheet Music", "Audio Recordings", "Learning Resources", "Concert Materials"];

  useEffect(() => {
    if (user) {
      fetchMaterials();
    }
  }, [user]);

  useEffect(() => {
    filterMaterials();
  }, [searchQuery, selectedCategory, materials]);

  const fetchMaterials = async () => {
    try {
      const response = await fetch("/api/members/materials");
      const data = await response.json();
      setMaterials(data.materials || []);
    } catch (error) {
      console.error("Error fetching materials:", error);
    } finally {
      setIsLoadingMaterials(false);
    }
  };

  const filterMaterials = () => {
    let filtered = materials;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((m) => m.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (m) =>
          m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredMaterials(filtered);
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/members/login");
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "audio":
        return <Volume2 className="w-6 h-6 text-purple-600" />;
      case "pdf":
        return <FileText className="w-6 h-6 text-red-600" />;
      default:
        return <File className="w-6 h-6 text-blue-600" />;
    }
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
              <h1 className="text-2xl font-bold text-gray-900">Rehearsal Materials</h1>
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

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <section className="mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search materials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredMaterials.length} of {materials.length} materials
            </div>
          </div>
        </section>

        {/* Materials Grid */}
        <section>
          {isLoadingMaterials ? (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading materials...</p>
            </div>
          ) : filteredMaterials.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-100">
              <Folder className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {materials.length === 0 ? "No materials yet" : "No results found"}
              </h3>
              <p className="text-gray-600">
                {materials.length === 0
                  ? "Check back soon! The admin will upload rehearsal materials here."
                  : "Try adjusting your search or filter criteria"}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaterials.map((material) => (
                <div
                  key={material.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 overflow-hidden group"
                >
                  <div className="p-6">
                    {/* File Icon and Category */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        {getFileIcon(material.fileType)}
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        {material.category}
                      </span>
                    </div>

                    {/* Title and Description */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {material.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {material.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(material.uploadDate).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Download Button */}
                    <a
                      href={material.fileUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Help Section */}
        <section className="mt-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              About Rehearsal Materials
            </h3>
            <p className="text-sm text-blue-800">
              This section contains all rehearsal materials uploaded by the admin including sheet music, 
              audio recordings, and learning resources. Download materials to prepare for rehearsals. 
              If you need specific materials, please contact the choir director.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
