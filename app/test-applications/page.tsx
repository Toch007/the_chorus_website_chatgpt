"use client";

import { useState } from "react";

export default function TestApplicationsPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const createTestApplications = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/create-test-applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ success: false, error: "Network error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Test Applications Creator
        </h1>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 mb-6">
            Click the button below to create test applications for all
            categories (choir, volunteer, media, tech).
          </p>

          <button
            onClick={createTestApplications}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating Applications..." : "Create Test Applications"}
          </button>

          {result && (
            <div className="mt-6 p-4 rounded-lg border">
              <h3 className="font-semibold mb-2">Result:</h3>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
