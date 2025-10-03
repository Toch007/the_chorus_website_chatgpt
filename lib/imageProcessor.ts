import sharp from "sharp";
import { fileTypeFromBuffer } from "file-type";

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: "webp" | "jpeg" | "png";
  maintainAspectRatio?: boolean;
}

export interface ProcessedFile {
  buffer: Buffer;
  contentType: string;
  size: number;
  originalSize: number;
  dimensions?: {
    width: number;
    height: number;
  };
}

export class ImageProcessor {
  private static readonly DEFAULT_OPTIONS: ImageOptimizationOptions = {
    quality: 85,
    format: "webp",
    maintainAspectRatio: true,
  };

  private static readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  private static readonly ALLOWED_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  /**
   * Process and optimize an image file
   */
  static async processImage(
    fileBuffer: Buffer,
    options: ImageOptimizationOptions = {}
  ): Promise<ProcessedFile> {
    const opts = { ...this.DEFAULT_OPTIONS, ...options };

    // Validate file type
    const fileType = await fileTypeFromBuffer(fileBuffer);
    if (!fileType || !this.ALLOWED_TYPES.includes(fileType.mime)) {
      throw new Error(`Unsupported file type: ${fileType?.mime || "unknown"}`);
    }

    // Check file size
    if (fileBuffer.length > this.MAX_FILE_SIZE) {
      throw new Error("File size too large. Maximum size is 10MB.");
    }

    const originalSize = fileBuffer.length;

    try {
      let sharpInstance = sharp(fileBuffer);

      // Get original dimensions
      const metadata = await sharpInstance.metadata();
      const originalDimensions = {
        width: metadata.width || 0,
        height: metadata.height || 0,
      };

      // Resize if dimensions are specified
      if (opts.width || opts.height) {
        const resizeOptions: sharp.ResizeOptions = {
          fit: opts.maintainAspectRatio ? "inside" : "fill",
          withoutEnlargement: true,
        };

        sharpInstance = sharpInstance.resize(
          opts.width,
          opts.height,
          resizeOptions
        );
      }

      // Convert format and optimize
      let outputBuffer: Buffer;
      let contentType: string;

      switch (opts.format) {
        case "webp":
          outputBuffer = await sharpInstance
            .webp({ quality: opts.quality })
            .toBuffer();
          contentType = "image/webp";
          break;

        case "jpeg":
          outputBuffer = await sharpInstance
            .jpeg({ quality: opts.quality })
            .toBuffer();
          contentType = "image/jpeg";
          break;

        case "png":
          outputBuffer = await sharpInstance
            .png({ quality: opts.quality })
            .toBuffer();
          contentType = "image/png";
          break;

        default:
          outputBuffer = await sharpInstance
            .webp({ quality: opts.quality })
            .toBuffer();
          contentType = "image/webp";
      }

      // Get final dimensions
      const finalMetadata = await sharp(outputBuffer).metadata();
      const finalDimensions = {
        width: finalMetadata.width || 0,
        height: finalMetadata.height || 0,
      };

      return {
        buffer: outputBuffer,
        contentType,
        size: outputBuffer.length,
        originalSize,
        dimensions: finalDimensions,
      };
    } catch (error) {
      throw new Error(
        `Image processing failed: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  /**
   * Create multiple sizes of an image (thumbnails, medium, large)
   */
  static async createImageVariants(
    fileBuffer: Buffer,
    baseName: string
  ): Promise<{ [key: string]: ProcessedFile & { fileName: string } }> {
    const variants = {
      thumbnail: { width: 150, height: 150, quality: 80 },
      small: { width: 400, height: 400, quality: 85 },
      medium: { width: 800, height: 600, quality: 85 },
      large: { width: 1200, height: 900, quality: 90 },
    };

    const results: { [key: string]: ProcessedFile & { fileName: string } } = {};

    // Remove file extension from base name
    const nameWithoutExt = baseName.replace(/\.[^/.]+$/, "");

    for (const [variant, options] of Object.entries(variants)) {
      try {
        const processed = await this.processImage(fileBuffer, options);
        results[variant] = {
          ...processed,
          fileName: `${nameWithoutExt}_${variant}.webp`,
        };
      } catch (error) {
        console.error(`Failed to create ${variant} variant:`, error);
      }
    }

    return results;
  }

  /**
   * Validate file before processing
   */
  static async validateFile(fileBuffer: Buffer): Promise<{
    isValid: boolean;
    error?: string;
    fileType?: string;
    size: number;
  }> {
    try {
      // Check file size
      if (fileBuffer.length > this.MAX_FILE_SIZE) {
        return {
          isValid: false,
          error: "File size too large. Maximum size is 10MB.",
          size: fileBuffer.length,
        };
      }

      // Check file type
      const fileType = await fileTypeFromBuffer(fileBuffer);
      if (!fileType) {
        return {
          isValid: false,
          error: "Unable to detect file type",
          size: fileBuffer.length,
        };
      }

      if (!this.ALLOWED_TYPES.includes(fileType.mime)) {
        return {
          isValid: false,
          error: `Unsupported file type: ${fileType.mime}. Allowed types: ${this.ALLOWED_TYPES.join(", ")}`,
          fileType: fileType.mime,
          size: fileBuffer.length,
        };
      }

      return {
        isValid: true,
        fileType: fileType.mime,
        size: fileBuffer.length,
      };
    } catch (error) {
      return {
        isValid: false,
        error: `Validation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        size: fileBuffer.length,
      };
    }
  }
}

export default ImageProcessor;
