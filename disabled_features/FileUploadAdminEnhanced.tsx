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
  Settings,
  Zap,
  Image as ImageIcon,
  Sliders,
} from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  onUpload: (url: string, filename: string, metadata?: any) => void;
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
  enableOptimization?: boolean;
  enableVariants?: boolean;
  defaultQuality?: number;
  maxWidth?: number;
  maxHeight?: number;
}

interface OptimizationSettings {
  enabled: boolean;
  quality: number;
  maxWidth?: number;
  maxHeight?: number;
  createVariants: boolean;
}

interface UploadedFile {
  url: string;
  name: string;
  size: number;
  originalSize?: number;
  type: string;
  status: "uploading" | "completed" | "error";
  error?: string;
  progress?: number;
  optimized?: boolean;
  variants?: { [key: string]: { url: string; size: number } };
}

export default function FileUploadAdmin({
  onUpload,
  onDelete,
  accept = "image/*",
  maxSize = 10,
  folder = "uploads",
  existingFile,
  disabled = false,
  multiple = false,
  showPreview = true,
  label = "Upload Files",
  description = "Drag and drop files here or click to browse",
  enableOptimization = true,
  enableVariants = false,
  defaultQuality = 85,
  maxWidth,
  maxHeight,
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [optimizationSettings, setOptimizationSettings] =
    useState<OptimizationSettings>({
      enabled: enableOptimization && accept.includes("image"),
      quality: defaultQuality,
      maxWidth,
      maxHeight,
      createVariants: enableVariants,
    });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Authentication
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }

    if (accept !== "*" && !file.type.match(accept.replace("*", ".*"))) {
      return `File type not supported. Expected: ${accept}`;
    }

    return null;
  };

  const uploadFile = async (file: File) => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    // Add optimization parameters
    if (optimizationSettings.enabled && file.type.startsWith("image/")) {
      formData.append("optimize", "true");
      formData.append("quality", optimizationSettings.quality.toString());
      if (optimizationSettings.maxWidth) {
        formData.append("maxWidth", optimizationSettings.maxWidth.toString());
      }
      if (optimizationSettings.maxHeight) {
        formData.append("maxHeight", optimizationSettings.maxHeight.toString());
      }
      if (optimizationSettings.createVariants) {
        formData.append("createVariants", "true");
      }
    }

    const idToken = await user.getIdToken();

    const response = await fetch("/api/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Upload failed");
    }

    return await response.json();
  };

  const processFiles = useCallback(
    async (selectedFiles: FileList) => {
      if (!user || authLoading) return;

      const newFiles: UploadedFile[] = Array.from(selectedFiles).map(
        (file) => ({
          url: "",
          name: file.name,
          size: file.size,
          type: file.type,
          status: "uploading" as const,
          progress: 0,
        })
      );

      setFiles((prev) => [...prev, ...newFiles]);

      for (let i = 0; i < newFiles.length; i++) {
        const file = selectedFiles[i];
        const fileIndex = files.length + i;

        try {
          const validationError = validateFile(file);
          if (validationError) {
            setFiles((prev) =>
              prev.map((f, idx) =>
                idx === fileIndex
                  ? { ...f, status: "error", error: validationError }
                  : f
              )
            );
            continue;
          }

          // Simulate progress
          const progressInterval = setInterval(() => {
            setFiles((prev) =>
              prev.map((f, idx) =>
                idx === fileIndex && f.status === "uploading"
                  ? { ...f, progress: Math.min((f.progress || 0) + 10, 90) }
                  : f
              )
            );
          }, 200);

          const result = await uploadFile(file);

          clearInterval(progressInterval);

          setFiles((prev) =>
            prev.map((f, idx) =>
              idx === fileIndex
                ? {
                    ...f,
                    url: result.url,
                    status: "completed",
                    progress: 100,
                    originalSize: result.originalSize,
                    optimized: result.optimized,
                    variants: result.variants,
                  }
                : f
            )
          );

          onUpload(result.url, file.name, {
            originalSize: result.originalSize,
            optimized: result.optimized,
            variants: result.variants,
          });
        } catch (error) {
          setFiles((prev) =>
            prev.map((f, idx) =>
              idx === fileIndex
                ? {
                    ...f,
                    status: "error",
                    error:
                      error instanceof Error ? error.message : "Upload failed",
                  }
                : f
            )
          );
        }
      }
    },
    [
      user,
      authLoading,
      files.length,
      folder,
      maxSize,
      accept,
      onUpload,
      optimizationSettings,
    ]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (disabled || !user) return;

      const droppedFiles = e.dataTransfer.files;
      if (droppedFiles.length > 0) {
        processFiles(droppedFiles);
      }
    },
    [disabled, user, processFiles]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files;
      if (selectedFiles && selectedFiles.length > 0) {
        processFiles(selectedFiles);
      }
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [processFiles]
  );

  const removeFile = useCallback(
    (index: number) => {
      const file = files[index];
      if (file.url && onDelete) {
        onDelete(file.url);
      }
      setFiles((prev) => prev.filter((_, i) => i !== index));
    },
    [files, onDelete]
  );

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500 mr-2" />
        <span className="text-gray-600">Checking authentication...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800">Please log in to upload files.</p>
      </div>
    );
  }

  const isImage = accept.includes("image");

  return (
    <div className="space-y-4">
      {/* Optimization Settings */}
      {isImage && enableOptimization && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Zap className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="font-medium text-blue-900">Image Optimization</h3>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="text-blue-600 hover:text-blue-800"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center space-x-4 mb-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={optimizationSettings.enabled}
                onChange={(e) =>
                  setOptimizationSettings((prev) => ({
                    ...prev,
                    enabled: e.target.checked,
                  }))
                }
                className="mr-2"
              />
              <span className="text-sm text-blue-800">Enable optimization</span>
            </label>

            {enableVariants && (
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={optimizationSettings.createVariants}
                  onChange={(e) =>
                    setOptimizationSettings((prev) => ({
                      ...prev,
                      createVariants: e.target.checked,
                    }))
                  }
                  className="mr-2"
                />
                <span className="text-sm text-blue-800">Create variants</span>
              </label>
            )}
          </div>

          {showSettings && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 pt-3 border-t border-blue-200">
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">
                  Quality: {optimizationSettings.quality}%
                </label>
                <input
                  type="range"
                  min="60"
                  max="100"
                  value={optimizationSettings.quality}
                  onChange={(e) =>
                    setOptimizationSettings((prev) => ({
                      ...prev,
                      quality: parseInt(e.target.value),
                    }))
                  }
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">
                  Max Width (px)
                </label>
                <input
                  type="number"
                  placeholder="Auto"
                  value={optimizationSettings.maxWidth || ""}
                  onChange={(e) =>
                    setOptimizationSettings((prev) => ({
                      ...prev,
                      maxWidth: e.target.value
                        ? parseInt(e.target.value)
                        : undefined,
                    }))
                  }
                  className="w-full px-3 py-1 border border-blue-300 rounded text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-1">
                  Max Height (px)
                </label>
                <input
                  type="number"
                  placeholder="Auto"
                  value={optimizationSettings.maxHeight || ""}
                  onChange={(e) =>
                    setOptimizationSettings((prev) => ({
                      ...prev,
                      maxHeight: e.target.value
                        ? parseInt(e.target.value)
                        : undefined,
                    }))
                  }
                  className="w-full px-3 py-1 border border-blue-300 rounded text-sm"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled}
        />

        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
            <Upload className="w-6 h-6 text-gray-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{label}</h3>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          <p className="text-xs text-gray-500">
            Maximum file size: {maxSize}MB
            {optimizationSettings.enabled &&
              " • Images will be optimized automatically"}
          </p>
        </div>
      </div>

      {/* Existing File Preview */}
      {existingFile && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Current File</h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileImage className="w-5 h-5 text-gray-600 mr-2" />
              <span className="text-sm text-gray-700">{existingFile}</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => window.open(existingFile, "_blank")}
                className="p-1 text-gray-600 hover:text-blue-600"
              >
                <Eye className="w-4 h-4" />
              </button>
              {onDelete && (
                <button
                  onClick={() => onDelete(existingFile)}
                  className="p-1 text-gray-600 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">
            {files.length === 1 ? "Uploaded File" : `${files.length} Files`}
          </h4>
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-white border rounded-lg"
            >
              <div className="flex items-center flex-1 min-w-0">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded flex items-center justify-center mr-3">
                  {file.status === "uploading" ? (
                    <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                  ) : file.status === "completed" ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      {file.optimized && (
                        <span className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded">
                          <Zap className="w-3 h-3 mr-1" />
                          Optimized
                        </span>
                      )}
                      {file.variants && (
                        <span className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          <ImageIcon className="w-3 h-3 mr-1" />
                          {Object.keys(file.variants).length} variants
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-1">
                    <div className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                      {file.originalSize && file.originalSize !== file.size && (
                        <span className="text-green-600 ml-1">
                          (saved {formatFileSize(file.originalSize - file.size)}
                          )
                        </span>
                      )}
                    </div>

                    {file.status === "uploading" && (
                      <div className="text-xs text-blue-600">
                        {file.progress}%
                      </div>
                    )}
                  </div>

                  {file.status === "uploading" && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div
                          className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                          style={{ width: `${file.progress || 0}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {file.error && (
                    <p className="text-xs text-red-600 mt-1">{file.error}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                {file.status === "completed" && showPreview && file.url && (
                  <button
                    onClick={() => window.open(file.url, "_blank")}
                    className="p-1 text-gray-600 hover:text-blue-600"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => removeFile(index)}
                  className="p-1 text-gray-600 hover:text-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
