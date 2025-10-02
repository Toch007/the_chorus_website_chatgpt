"use client";

import { useEffect, useState } from "react";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import FileUploadAdmin from "@/components/admin/FileUploadAdmin";
import { auth } from "@/firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";
import { formatFileSize, getFileCategory } from "@/lib/fileUtils";

interface FileInfo {
  name: string;
  fullPath: string;
  downloadURL: string;
  size: number;
  contentType: string;
  timeCreated: string;
}
import {
  FolderOpen,
  FileImage,
  FileText,
  Music,
  Video,
  Download,
  RefreshCw,
  Trash2,
  Eye,
  Search,
  Filter,
} from "lucide-react";
import Image from "next/image";

const STORAGE_FOLDERS = [
  { name: "events", label: "Event Images", icon: FileImage },
  { name: "partners", label: "Partner Logos", icon: FileImage },
  { name: "blog", label: "Blog Images", icon: FileImage },
  { name: "members", label: "Member Photos", icon: FileImage },
  { name: "media", label: "Media Files", icon: Video },
  { name: "documents", label: "Documents", icon: FileText },
  { name: "uploads", label: "General Uploads", icon: FolderOpen },
];

const FILE_CATEGORY_ICONS = {
  image: FileImage,
  video: Video,
  audio: Music,
  document: FileText,
  other: FolderOpen,
};

export default function AdminFilesPage() {
  useAuthRedirect();

  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState("uploads");
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [previewFile, setPreviewFile] = useState<FileInfo | null>(null);

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);
  const fetchFiles = async (folder: string) => {
    if (!user || authLoading) {
      console.log("Waiting for authentication...");
      return;
    }

    setLoading(true);
    try {
      const idToken = await user.getIdToken();
      const response = await fetch(`/api/upload?folder=${folder}`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch files");
      }

      const data = await response.json();
      setFiles(data.files || []);
    } catch (error) {
      console.error("Error fetching files:", error);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedFolder && user && !authLoading) {
      fetchFiles(selectedFolder);
    }
  }, [selectedFolder, user, authLoading]);

  const handleFileUpload = async (url: string, filename: string) => {
    // Refresh the file list
    await fetchFiles(selectedFolder);
    alert(`✅ File uploaded successfully: ${filename}`);
  };

  const handleFileDelete = async (file: FileInfo) => {
    if (!confirm(`Are you sure you want to delete "${file.name}"?`)) return;

    try {
      if (!user) {
        alert("❌ Please log in to delete files");
        return;
      }

      const idToken = await user.getIdToken();
      const response = await fetch(`/api/upload?path=${file.fullPath}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Delete failed");
      }

      setFiles((prev) => prev.filter((f) => f.fullPath !== file.fullPath));
      alert("✅ File deleted successfully");
    } catch (error) {
      console.error("Error deleting file:", error);
      alert(
        "❌ Error deleting file: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

  const handleDownload = (file: FileInfo) => {
    const link = document.createElement("a");
    link.href = file.downloadURL;
    link.download = file.name;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || getFileCategory(file.name) === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const folderStats = {
    totalFiles: files.length,
    totalSize: files.reduce((sum, file) => sum + file.size, 0),
    categories: files.reduce(
      (acc, file) => {
        const category = getFileCategory(file.name);
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ),
  };

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="p-6">
        <AdminPageHeader
          title="File Management"
          description="Loading file management system..."
        />
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mr-3" />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show error if not authenticated
  if (!user) {
    return (
      <div className="p-6">
        <AdminPageHeader
          title="File Management"
          description="Authentication required"
        />
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-800">
            Please log in to access file management.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        title="File Management"
        description="Upload, organize, and manage all website files and media"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Folders */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-blue-600" />
              Folders
            </h3>

            <div className="space-y-2">
              {STORAGE_FOLDERS.map((folder) => {
                const IconComponent = folder.icon;
                return (
                  <button
                    key={folder.name}
                    onClick={() => setSelectedFolder(folder.name)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition ${
                      selectedFolder === folder.name
                        ? "bg-blue-50 border border-blue-200 text-blue-700"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-sm font-medium">{folder.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Folder Stats */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Files:</span>
                  <span className="font-medium">{folderStats.totalFiles}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Size:</span>
                  <span className="font-medium">
                    {formatFileSize(folderStats.totalSize)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Controls */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex-1 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search files..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Types</option>
                    <option value="image">Images</option>
                    <option value="video">Videos</option>
                    <option value="audio">Audio</option>
                    <option value="document">Documents</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => fetchFiles(selectedFolder)}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg border border-gray-300 transition disabled:opacity-50"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                  />
                  Refresh
                </button>

                <button
                  onClick={() => setShowUploadForm(!showUploadForm)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <FolderOpen className="w-4 h-4" />
                  Upload Files
                </button>
              </div>
            </div>
          </div>

          {/* Upload Form */}
          {showUploadForm && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Upload to:{" "}
                {STORAGE_FOLDERS.find((f) => f.name === selectedFolder)?.label}
              </h3>

              <FileUploadAdmin
                onUpload={handleFileUpload}
                folder={selectedFolder}
                multiple={true}
                accept="*/*"
                maxSize={20}
                label="Upload Files"
                description="Drag & drop files here or click to browse. Server-side upload via Firebase Admin."
              />
            </div>
          )}

          {/* Files Grid */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Files ({filteredFiles.length})
              </h3>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
            ) : filteredFiles.length === 0 ? (
              <div className="text-center py-12">
                <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  {files.length === 0
                    ? "No files in this folder"
                    : "No files match your search"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredFiles.map((file) => {
                  const category = getFileCategory(file.name);
                  const IconComponent = FILE_CATEGORY_ICONS[category];
                  const isImage = category === "image";

                  return (
                    <div
                      key={file.fullPath}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                    >
                      {/* File Preview/Icon */}
                      <div className="aspect-square bg-gray-50 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                        {isImage ? (
                          <Image
                            src={file.downloadURL}
                            alt={file.name}
                            width={150}
                            height={150}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <IconComponent className="w-12 h-12 text-gray-400" />
                        )}
                      </div>

                      {/* File Info */}
                      <div className="space-y-2">
                        <h4
                          className="font-medium text-gray-900 text-sm truncate"
                          title={file.name}
                        >
                          {file.name}
                        </h4>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{formatFileSize(file.size)}</span>
                          <span className="capitalize">{category}</span>
                        </div>

                        <div className="text-xs text-gray-400">
                          {new Date(file.timeCreated).toLocaleDateString()}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 mt-3">
                        {isImage && (
                          <button
                            onClick={() => setPreviewFile(file)}
                            className="flex-1 flex items-center justify-center gap-1 p-2 text-blue-600 hover:bg-blue-50 rounded text-xs transition"
                          >
                            <Eye className="w-3 h-3" />
                            View
                          </button>
                        )}

                        <button
                          onClick={() => handleDownload(file)}
                          className="flex-1 flex items-center justify-center gap-1 p-2 text-green-600 hover:bg-green-50 rounded text-xs transition"
                        >
                          <Download className="w-3 h-3" />
                          Download
                        </button>

                        <button
                          onClick={() => handleFileDelete(file)}
                          className="flex-1 flex items-center justify-center gap-1 p-2 text-red-600 hover:bg-red-50 rounded text-xs transition"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-full overflow-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="text-lg font-semibold">{previewFile.name}</h3>
                <p className="text-sm text-gray-500">
                  {formatFileSize(previewFile.size)} •{" "}
                  {new Date(previewFile.timeCreated).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => setPreviewFile(null)}
                className="p-2 hover:bg-gray-100 rounded transition"
              >
                ✕
              </button>
            </div>

            <div className="p-4">
              <Image
                src={previewFile.downloadURL}
                alt={previewFile.name}
                width={800}
                height={600}
                className="max-w-full h-auto rounded-lg"
                style={{ maxHeight: "70vh", width: "auto" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
