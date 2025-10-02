"use client";

import React, { useState, useCallback, useRef } from "react";
import { auth } from "@/firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  Upload,
  X,
  FileImage,
  Loader2,
  Check,
  AlertCircle,
  Eye,
  Trash2,
} from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  onUpload: (url: string, filename: string) => void;
  onDelete?: (url: string) => void;
  accept?: string;
  maxSize?: number; // in MB
  folder?: string;
  existingFile?: string;
  disabled?: boolean;
  multiple?: boolean;
  showPreview?: boolean;
  label?: string;
  description?: string;
}

interface UploadedFile {
  url: string;
  name: string;
  size: number;
  type: string;
  status: "uploading" | "completed" | "error";
  error?: string;
  progress?: number;
}

export default function FileUploadAdmin({
  onUpload,
  onDelete,
  accept = "image/*",
  maxSize = 5,
  folder = "uploads",
  existingFile,
  disabled = false,
  multiple = false,
  showPreview = true,
  label = "Upload File",
  description,
}: FileUploadProps) {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check authentication status
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const validateFile = useCallback(
    (file: File): string | null => {
      if (maxSize && file.size > maxSize * 1024 * 1024) {
        return `File size must be less than ${maxSize}MB`;
      }

      if (accept && !accept.includes(file.type) && !accept.includes("*")) {
        return `File type not supported. Accepted types: ${accept}`;
      }

      return null;
    },
    [accept, maxSize]
  );

  const uploadFileToServer = useCallback(
    async (file: File): Promise<void> => {
      // Check authentication first
      if (!user) {
        const errorFile: UploadedFile = {
          url: "",
          name: file.name,
          size: file.size,
          type: file.type,
          status: "error",
          error: "Please log in to upload files",
        };
        setUploadedFiles((prev) => [...prev, errorFile]);
        return;
      }

      const validation = validateFile(file);
      if (validation) {
        const errorFile: UploadedFile = {
          url: "",
          name: file.name,
          size: file.size,
          type: file.type,
          status: "error",
          error: validation,
        };
        setUploadedFiles((prev) => [...prev, errorFile]);
        return;
      }

      const uploadingFile: UploadedFile = {
        url: "",
        name: file.name,
        size: file.size,
        type: file.type,
        status: "uploading",
        progress: 0,
      };

      setUploadedFiles((prev) => [...prev, uploadingFile]);

      try {
        // Get auth token
        const idToken = await user.getIdToken();

        // Create form data
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        // Upload to server API
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
          body: formData,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Upload failed");
        }

        const completedFile: UploadedFile = {
          url: result.url,
          name: file.name,
          size: file.size,
          type: file.type,
          status: "completed",
          progress: 100,
        };

        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.name === file.name && f.status === "uploading" ? completedFile : f
          )
        );

        onUpload(result.url, file.name);
      } catch (error) {
        console.error("Upload error:", error);
        let errorMessage = "Upload failed";

        if (error instanceof Error) {
          errorMessage = error.message;
        }

        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.name === file.name && f.status === "uploading"
              ? { ...f, status: "error" as const, error: errorMessage }
              : f
          )
        );
      }
    },
    [folder, onUpload, validateFile, user]
  );

  const handleFiles = useCallback(
    async (files: FileList) => {
      const filesArray = Array.from(files);

      if (!multiple && filesArray.length > 1) {
        alert("Only one file is allowed");
        return;
      }

      for (const file of filesArray) {
        await uploadFileToServer(file);
      }
    },
    [multiple, uploadFileToServer]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (disabled || !user) return;

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFiles(files);
      }
    },
    [disabled, handleFiles, user]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled && user) setIsDragging(true);
    },
    [disabled, user]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        handleFiles(files);
      }
    },
    [handleFiles]
  );

  const removeFile = useCallback(
    async (fileToRemove: UploadedFile) => {
      if (fileToRemove.url && onDelete) {
        try {
          if (!user) {
            alert("Please log in to delete files");
            return;
          }

          const idToken = await user.getIdToken();
          const filePath = fileToRemove.url.split("/").pop();

          const response = await fetch(`/api/upload?path=${filePath}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });

          if (!response.ok) {
            const result = await response.json();
            throw new Error(result.error || "Delete failed");
          }

          onDelete(fileToRemove.url);
        } catch (error) {
          console.error("Error deleting file:", error);
          alert(
            "Failed to delete file: " +
              (error instanceof Error ? error.message : "Unknown error")
          );
        }
      }

      setUploadedFiles((prev) => prev.filter((f) => f !== fileToRemove));
    },
    [onDelete, user]
  );

  const openPreview = useCallback((url: string) => {
    setPreviewUrl(url);
    setShowPreviewModal(true);
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <Loader2 className="w-8 h-8 text-gray-400 mx-auto animate-spin" />
        <p className="text-gray-500 mt-2">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Authentication Warning */}
      {!user && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
            <p className="text-yellow-800">
              Please log in to upload files. Server-side upload requires
              authentication.
            </p>
          </div>
        </div>
      )}

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging
            ? "border-blue-400 bg-blue-50"
            : disabled || !user
              ? "border-gray-200 bg-gray-50"
              : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled || !user}
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="space-y-3">
          <div className="flex justify-center">
            <Upload
              className={`w-12 h-12 ${disabled || !user ? "text-gray-400" : "text-gray-500"}`}
            />
          </div>

          <div>
            <p
              className={`text-lg font-medium ${disabled || !user ? "text-gray-400" : "text-gray-900"}`}
            >
              {label}
            </p>
            {description && (
              <p
                className={`text-sm mt-1 ${disabled || !user ? "text-gray-400" : "text-gray-500"}`}
              >
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled || !user}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              disabled || !user
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Choose {multiple ? "Files" : "File"}
          </button>

          <p className="text-xs text-gray-400">
            {accept === "image/*" ? "Images only" : "All file types"} • Max{" "}
            {maxSize}MB
            {user && " • Server-side upload via Firebase Admin"}
          </p>
        </div>
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {file.status === "uploading" ? (
                    <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                  ) : file.status === "completed" ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(file.size)}
                    {file.status === "uploading" &&
                      file.progress !== undefined &&
                      ` • ${Math.round(file.progress)}%`}
                  </p>
                  {file.error && (
                    <p className="text-sm text-red-600">{file.error}</p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {file.status === "completed" &&
                    file.type.startsWith("image/") && (
                      <button
                        onClick={() => openPreview(file.url)}
                        className="p-1 text-gray-400 hover:text-blue-600 transition"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}

                  <button
                    onClick={() => removeFile(file)}
                    className="p-1 text-gray-400 hover:text-red-600 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && previewUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-full overflow-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Image Preview</h3>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-2 hover:bg-gray-100 rounded transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="relative max-w-full max-h-96">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  width={800}
                  height={600}
                  className="max-w-full h-auto rounded-lg"
                  style={{ maxHeight: "70vh", width: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
