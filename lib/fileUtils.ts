import {
  ref,
  uploadBytes,
  deleteObject,
  listAll,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";
import { storage } from "@/firebase/config";

export interface FileInfo {
  name: string;
  fullPath: string;
  downloadURL: string;
  size: number;
  contentType: string;
  timeCreated: string;
}

/**
 * Generate a unique filename with timestamp
 */
export function generateFileName(
  originalName: string,
  folder?: string
): string {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split(".").pop();
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, "");
  const cleanName = nameWithoutExt.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();

  const fileName = `${timestamp}-${randomId}-${cleanName}.${extension}`;
  return folder ? `${folder}/${fileName}` : fileName;
}

/**
 * Validate file before upload
 */
export function validateFile(
  file: File,
  options: {
    maxSize?: number; // in MB
    allowedTypes?: string[];
    allowedExtensions?: string[];
  } = {}
): { isValid: boolean; error?: string } {
  const { maxSize = 10, allowedTypes = [], allowedExtensions = [] } = options;

  // Check file size
  if (file.size > maxSize * 1024 * 1024) {
    return {
      isValid: false,
      error: `File size exceeds ${maxSize}MB limit`,
    };
  }

  // Check file type
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `File type ${file.type} is not allowed`,
    };
  }

  // Check file extension
  if (allowedExtensions.length > 0) {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      return {
        isValid: false,
        error: `File extension .${fileExtension} is not allowed`,
      };
    }
  }

  return { isValid: true };
}

/**
 * Delete file from Firebase Storage
 */
export async function deleteFile(fileUrl: string): Promise<boolean> {
  try {
    const fileRef = ref(storage, fileUrl);
    await deleteObject(fileRef);
    return true;
  } catch (error) {
    console.error("Error deleting file:", error);
    return false;
  }
}

/**
 * List all files in a folder
 */
export async function listFiles(folderPath: string): Promise<FileInfo[]> {
  try {
    const folderRef = ref(storage, folderPath);
    const result = await listAll(folderRef);

    const files: FileInfo[] = [];

    for (const itemRef of result.items) {
      try {
        const [downloadURL, metadata] = await Promise.all([
          getDownloadURL(itemRef),
          getMetadata(itemRef),
        ]);

        files.push({
          name: itemRef.name,
          fullPath: itemRef.fullPath,
          downloadURL,
          size: metadata.size,
          contentType: metadata.contentType || "unknown",
          timeCreated: metadata.timeCreated,
        });
      } catch (error) {
        console.error(`Error getting info for ${itemRef.name}:`, error);
      }
    }

    return files.sort(
      (a, b) =>
        new Date(b.timeCreated).getTime() - new Date(a.timeCreated).getTime()
    );
  } catch (error) {
    console.error("Error listing files:", error);
    return [];
  }
}

/**
 * Get file info from URL
 */
export async function getFileInfo(fileUrl: string): Promise<FileInfo | null> {
  try {
    const fileRef = ref(storage, fileUrl);
    const [downloadURL, metadata] = await Promise.all([
      getDownloadURL(fileRef),
      getMetadata(fileRef),
    ]);

    return {
      name: fileRef.name,
      fullPath: fileRef.fullPath,
      downloadURL,
      size: metadata.size,
      contentType: metadata.contentType || "unknown",
      timeCreated: metadata.timeCreated,
    };
  } catch (error) {
    console.error("Error getting file info:", error);
    return null;
  }
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Get file extension from filename
 */
export function getFileExtension(filename: string): string {
  return filename.split(".").pop()?.toLowerCase() || "";
}

/**
 * Check if file is an image
 */
export function isImageFile(filename: string): boolean {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp"];
  return imageExtensions.includes(getFileExtension(filename));
}

/**
 * Get file type category
 */
export function getFileCategory(
  filename: string
): "image" | "video" | "audio" | "document" | "other" {
  const extension = getFileExtension(filename);

  const imageExts = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp"];
  const videoExts = ["mp4", "avi", "mov", "wmv", "flv", "webm", "mkv"];
  const audioExts = ["mp3", "wav", "ogg", "aac", "flac", "m4a"];
  const documentExts = [
    "pdf",
    "doc",
    "docx",
    "txt",
    "rtf",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
  ];

  if (imageExts.includes(extension)) return "image";
  if (videoExts.includes(extension)) return "video";
  if (audioExts.includes(extension)) return "audio";
  if (documentExts.includes(extension)) return "document";

  return "other";
}

/**
 * Compress image before upload (basic client-side compression)
 */
export async function compressImage(
  file: File,
  options: { maxWidth?: number; maxHeight?: number; quality?: number } = {}
): Promise<File> {
  const { maxWidth = 1920, maxHeight = 1080, quality = 0.8 } = options;

  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            reject(new Error("Compression failed"));
          }
        },
        file.type,
        quality
      );
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Upload file to Firebase Storage
 */
export async function uploadFile(
  file: File,
  folder: string = "uploads",
  options: {
    compress?: boolean;
    quality?: number;
    maxSize?: number;
  } = {}
): Promise<{ url: string; path: string }> {
  const { compress = true, quality = 0.8, maxSize = 5 } = options;

  // Validate file
  const validation = validateFile(file, { maxSize });
  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  // Compress image if needed
  let fileToUpload = file;
  if (compress && isImageFile(file.name)) {
    try {
      fileToUpload = await compressImage(file, { quality });
    } catch (error) {
      console.warn("Image compression failed, uploading original:", error);
    }
  }

  // Generate unique filename
  const filename = generateFileName(file.name, folder);
  const fileRef = ref(storage, filename);

  try {
    const snapshot = await uploadBytes(fileRef, fileToUpload);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return {
      url: downloadURL,
      path: filename,
    };
  } catch (error) {
    console.error("Upload error:", error);
    throw new Error("Failed to upload file");
  }
}
