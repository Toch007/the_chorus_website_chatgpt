"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { deleteObject, ref } from "firebase/storage";
import { storage, auth } from "@/firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  uploadFile as utilUploadFile,
  validateFile as utilValidateFile,
} from "@/lib/fileUtils";
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
}

export default function FileUpload({
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
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const validateFile = useCallback(
    (file: File): string | null => {
      const allowedTypes = accept ? accept.split(",").map((t) => t.trim()) : [];

      const validation = utilValidateFile(file, {
        maxSize,
        allowedTypes: allowedTypes.length > 0 ? allowedTypes : undefined,
      });

      return validation.isValid ? null : validation.error || "Invalid file";
    },
    [accept, maxSize]
  );

  const uploadFile = useCallback(
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
      };

      setUploadedFiles((prev) => [...prev, uploadingFile]);

      try {
        const result = await utilUploadFile(file, folder, {
          maxSize,
          compress: true,
          quality: 0.8,
        });

        const completedFile: UploadedFile = {
          url: result.url,
          name: file.name,
          size: file.size,
          type: file.type,
          status: "completed",
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
          if (error.message.includes("storage/unauthorized")) {
            errorMessage =
              "Permission denied. Please check Firebase Storage rules.";
          } else if (error.message.includes("storage/unauthenticated")) {
            errorMessage = "Please log in to upload files.";
          } else {
            errorMessage = error.message;
          }
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
    [folder, onUpload, validateFile, maxSize, user]
  );

  const handleFiles = useCallback(
    async (files: FileList) => {
      const filesArray = Array.from(files);

      if (!multiple && filesArray.length > 1) {
        alert("Only one file is allowed");
        return;
      }

      for (const file of filesArray) {
        await uploadFile(file);
      }
    },
    [multiple, uploadFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (disabled) return;

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFiles(files);
      }
    },
    [disabled, handleFiles]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) setIsDragging(true);
    },
    [disabled]
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
          const fileRef = ref(storage, fileToRemove.url);
          await deleteObject(fileRef);
          onDelete(fileToRemove.url);
        } catch (error) {
          console.error("Delete error:", error);
        }
      }

      setUploadedFiles((prev) => prev.filter((f) => f !== fileToRemove));
    },
    [onDelete]
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
              Please log in to upload files. You need admin authentication for
              file uploads.
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
              className={`w-12 h-12 ${disabled ? "text-gray-400" : "text-gray-500"}`}
            />
          </div>

          <div>
            <p
              className={`text-lg font-medium ${disabled ? "text-gray-400" : "text-gray-900"}`}
            >
              {label}
            </p>
            {description && (
              <p
                className={`text-sm mt-1 ${disabled ? "text-gray-300" : "text-gray-500"}`}
              >
                {description}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <button
              type="button"
              disabled={disabled}
              onClick={() => fileInputRef.current?.click()}
              className={`px-4 py-2 rounded-md font-medium transition ${
                disabled
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Choose {multiple ? "Files" : "File"}
            </button>

            {!disabled && (
              <span className="text-sm text-gray-500">
                or drag and drop here
              </span>
            )}
          </div>

          <p className="text-xs text-gray-400">
            {accept === "image/*" ? "Images" : "Files"} up to {maxSize}MB
          </p>
        </div>
      </div>

      {/* Existing File Display */}
      {existingFile && uploadedFiles.length === 0 && (
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded">
                <FileImage className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Current File</p>
                <p className="text-sm text-gray-500">
                  {existingFile
                    .split("/")
                    .pop()
                    ?.split("-")
                    .slice(1)
                    .join("-") || "Unknown"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {showPreview &&
                existingFile.match(/\.(jpg|jpeg|png|gif|webp)$/i) && (
                  <button
                    type="button"
                    onClick={() => openPreview(existingFile)}
                    className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition"
                    title="Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                )}
            </div>
          </div>
        </div>
      )}

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          {uploadedFiles.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded ${
                      file.status === "completed"
                        ? "bg-green-100"
                        : file.status === "error"
                          ? "bg-red-100"
                          : "bg-blue-100"
                    }`}
                  >
                    {file.status === "uploading" && (
                      <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                    )}
                    {file.status === "completed" && (
                      <Check className="w-4 h-4 text-green-600" />
                    )}
                    {file.status === "error" && (
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    )}
                  </div>

                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(file.size)}
                      {file.status === "uploading" && " • Uploading..."}
                      {file.status === "completed" && " • Uploaded"}
                      {file.status === "error" &&
                        file.error &&
                        ` • ${file.error}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {showPreview &&
                    file.status === "completed" &&
                    file.type.startsWith("image/") && (
                      <button
                        type="button"
                        onClick={() => openPreview(file.url)}
                        className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition"
                        title="Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}

                  <button
                    type="button"
                    onClick={() => removeFile(file)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition"
                    title="Remove"
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
