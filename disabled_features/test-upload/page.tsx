"use client";

import { useState } from "react";
import { testFirebaseUpload } from "@/lib/testUpload";
import FileUpload from "@/components/admin/FileUpload";

export default function FileUploadTest() {
  const [testResult, setTestResult] = useState<any>(null);
  const [uploadResult, setUploadResult] = useState<string>("");

  const handleTestUpload = async () => {
    console.log("Starting Firebase test...");
    const result = await testFirebaseUpload();
    setTestResult(result);
  };

  const handleFileUpload = (url: string, filename: string) => {
    console.log("File uploaded successfully:", { url, filename });
    setUploadResult(`✅ File uploaded: ${filename}\nURL: ${url}`);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">File Upload System Test</h1>

      {/* Firebase Connection Test */}
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-lg font-semibold mb-4">
          1. Firebase Connection Test
        </h2>
        <button
          onClick={handleTestUpload}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Test Firebase Connection
        </button>

        {testResult && (
          <div
            className="mt-4 p-3 rounded"
            style={{
              backgroundColor: testResult.success ? "#dcfce7" : "#fef2f2",
              color: testResult.success ? "#166534" : "#dc2626",
            }}
          >
            <pre>{JSON.stringify(testResult, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* File Upload Component Test */}
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-lg font-semibold mb-4">
          2. FileUpload Component Test
        </h2>

        <FileUpload
          onUpload={handleFileUpload}
          folder="test"
          accept="image/*"
          maxSize={5}
          label="Test File Upload"
          description="Upload an image to test the FileUpload component"
        />

        {uploadResult && (
          <div className="mt-4 p-3 rounded bg-green-50 text-green-700">
            <pre>{uploadResult}</pre>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Test Instructions:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>
            Click "Test Firebase Connection" to verify Firebase Storage is
            working
          </li>
          <li>Try uploading an image using the FileUpload component</li>
          <li>Check the console for detailed logs</li>
          <li>Verify the uploaded files appear in Firebase Storage console</li>
        </ol>
      </div>
    </div>
  );
}
