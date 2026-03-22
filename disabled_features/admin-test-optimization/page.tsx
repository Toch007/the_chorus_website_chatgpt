"use client";

import { useState } from "react";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import FileUploadAdminEnhanced from "@/components/admin/FileUploadAdminEnhanced";

export default function ImageOptimizationTestPage() {
  useAuthRedirect();

  const [uploadedImages, setUploadedImages] = useState<
    Array<{
      url: string;
      name: string;
      metadata?: any;
    }>
  >([]);

  const handleUpload = (url: string, filename: string, metadata?: any) => {
    setUploadedImages((prev) => [...prev, { url, name: filename, metadata }]);
  };

  const handleDelete = (url: string) => {
    setUploadedImages((prev) => prev.filter((img) => img.url !== url));
  };

  return (
    <div className="p-6 space-y-8">
      <AdminPageHeader
        title="Image Optimization Test"
        description="Test the enhanced file upload system with image optimization and variants"
      />

      {/* Basic Upload */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Basic Image Upload</h2>
        <FileUploadAdminEnhanced
          onUpload={handleUpload}
          onDelete={handleDelete}
          accept="image/*"
          folder="test-basic"
          label="Upload Images (Basic)"
          description="Standard upload without optimization"
          enableOptimization={false}
          maxSize={10}
        />
      </div>

      {/* Optimized Upload */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Optimized Image Upload</h2>
        <FileUploadAdminEnhanced
          onUpload={handleUpload}
          onDelete={handleDelete}
          accept="image/*"
          folder="test-optimized"
          label="Upload Images (Optimized)"
          description="Images will be optimized and converted to WebP"
          enableOptimization={true}
          defaultQuality={85}
          maxWidth={1200}
          maxHeight={800}
          maxSize={10}
        />
      </div>

      {/* With Variants */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Upload with Variants</h2>
        <FileUploadAdminEnhanced
          onUpload={handleUpload}
          onDelete={handleDelete}
          accept="image/*"
          folder="test-variants"
          label="Upload Images (With Variants)"
          description="Creates thumbnail, small, medium, and large versions"
          enableOptimization={true}
          enableVariants={true}
          defaultQuality={90}
          maxSize={10}
        />
      </div>

      {/* Multiple Files */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Multiple File Upload</h2>
        <FileUploadAdminEnhanced
          onUpload={handleUpload}
          onDelete={handleDelete}
          accept="image/*"
          folder="test-multiple"
          label="Upload Multiple Images"
          description="Select multiple images for batch processing"
          enableOptimization={true}
          enableVariants={true}
          multiple={true}
          maxSize={10}
        />
      </div>

      {/* Results Display */}
      {uploadedImages.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Upload Results</h2>
          <div className="space-y-4">
            {uploadedImages.map((image, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{image.name}</h3>
                    <p className="text-sm text-gray-600 break-all">
                      {image.url}
                    </p>

                    {image.metadata && (
                      <div className="mt-2 space-y-1">
                        {image.metadata.optimized && (
                          <div className="text-xs text-green-600">
                            ✅ Optimized:{" "}
                            {image.metadata.originalSize
                              ? `${Math.round(((image.metadata.originalSize - (image.metadata.size || 0)) / image.metadata.originalSize) * 100)}% size reduction`
                              : "Yes"}
                          </div>
                        )}

                        {image.metadata.variants && (
                          <div className="text-xs text-blue-600">
                            📊 Variants:{" "}
                            {Object.keys(image.metadata.variants).join(", ")}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="ml-4 flex-shrink-0">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </div>
                </div>

                {image.metadata?.variants && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                    {Object.entries(image.metadata.variants).map(
                      ([variant, data]: [string, any]) => (
                        <div key={variant} className="text-center">
                          <img
                            src={data.url}
                            alt={`${image.name} - ${variant}`}
                            className="w-full h-20 object-cover rounded mb-1"
                          />
                          <p className="text-xs text-gray-600 capitalize">
                            {variant}
                          </p>
                          <p className="text-xs text-gray-500">
                            {Math.round(data.size / 1024)}KB
                          </p>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
