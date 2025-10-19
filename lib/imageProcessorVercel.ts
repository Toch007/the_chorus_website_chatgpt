// Vercel-compatible image processor
import { ImageOptimizationOptions } from './imageProcessor';

interface ProcessedFile {
  buffer: Buffer;
  contentType: string;
  size: number;
  originalSize: number;
  dimensions?: {
    width: number;
    height: number;
  };
}

export class ImageProcessorVercel {
  private static readonly DEFAULT_OPTIONS: ImageOptimizationOptions = {
    quality: 85,
    format: "webp",
    maintainAspectRatio: true,
  };

  /**
   * Process image with dynamic sharp import for Vercel compatibility
   */
  static async processImage(
    fileBuffer: Buffer,
    options: ImageOptimizationOptions = {}
  ): Promise<ProcessedFile> {
    const opts = { ...this.DEFAULT_OPTIONS, ...options };
    
    try {
      // Dynamic import to avoid build-time issues
      const sharp = (await import('sharp')).default;
      
      const originalSize = fileBuffer.length;
      let processor = sharp(fileBuffer);
      
      // Get original dimensions
      const metadata = await processor.metadata();
      const originalWidth = metadata.width || 0;
      const originalHeight = metadata.height || 0;
      
      // Resize if needed
      if (opts.width || opts.height) {
        processor = processor.resize(opts.width, opts.height, {
          fit: opts.maintainAspectRatio ? 'inside' : 'fill',
          withoutEnlargement: true,
        });
      }
      
      // Set format and quality
      if (opts.format === 'webp') {
        processor = processor.webp({ quality: opts.quality || 85 });
      } else if (opts.format === 'jpeg') {
        processor = processor.jpeg({ quality: opts.quality || 85 });
      } else if (opts.format === 'png') {
        processor = processor.png({ quality: opts.quality || 85 });
      }
      
      const processedBuffer = await processor.toBuffer();
      const finalMetadata = await sharp(processedBuffer).metadata();
      
      return {
        buffer: Buffer.from(processedBuffer),
        contentType: opts.format === 'webp' ? 'image/webp' : 
                    opts.format === 'jpeg' ? 'image/jpeg' : 'image/png',
        size: processedBuffer.length,
        originalSize,
        dimensions: {
          width: finalMetadata.width || originalWidth,
          height: finalMetadata.height || originalHeight,
        }
      };
      
    } catch (error) {
      console.error('Sharp processing failed:', error);
      
      // Fallback: return original buffer
      return {
        buffer: fileBuffer,
        contentType: 'image/jpeg', // Default fallback
        size: fileBuffer.length,
        originalSize: fileBuffer.length,
      };
    }
  }

  /**
   * Validate image file
   */
  static async validateFile(buffer: Buffer): Promise<{ isValid: boolean; error?: string }> {
    try {
      const { fileTypeFromBuffer } = await import('file-type');
      const fileType = await fileTypeFromBuffer(buffer);
      
      if (!fileType) {
        return { isValid: false, error: 'Unable to determine file type' };
      }
      
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(fileType.mime)) {
        return { isValid: false, error: 'Unsupported image format' };
      }
      
      if (buffer.length > 10 * 1024 * 1024) {
        return { isValid: false, error: 'File too large (max 10MB)' };
      }
      
      return { isValid: true };
    } catch (error) {
      return { isValid: false, error: 'File validation failed' };
    }
  }
}