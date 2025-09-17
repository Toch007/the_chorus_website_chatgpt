"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";

export default function AdminJoinFormPage() {
  const { form } = useParams(); // "choir", "volunteer", "media", "tech"
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!form) return;

    const fetchData = async () => {
      try {
        const colRef = collection(db, `join_${form}`);
        const snapshot = await getDocs(colRef);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [form]);

  const exportToCSV = () => {
    if (applications.length === 0) return;

    const headers = Object.keys(applications[0]).filter((key) => key !== "id");
    const csvRows = [];

    // Add headers row
    csvRows.push(headers.join(","));

    // Add data rows
    applications.forEach((app) => {
      const row = headers.map((h) =>
        `"${String(app[h] ?? "").replace(/"/g, '""')}"`
      );
      csvRows.push(row.join(","));
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${form}_applications.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) return <p className="text-center py-10">Loading applications...</p>;

  if (applications.length === 0)
    return (
      <div className="max-w-4xl mx-auto py-10 text-center">
        <h1 className="text-2xl font-bold capitalize">
          No {form} applications found
        </h1>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold capitalize">
          {form} Applications
        </h1>
        <button
          onClick={exportToCSV}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          ⬇️ Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              {Object.keys(applications[0]).map(
                (key) =>
                  key !== "id" && (
                    <th key={key} className="border px-3 py-2 text-left">
                      {key}
                    </th>
                  )
              )}
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50">
                {Object.keys(app).map(
                  (key) =>
                    key !== "id" && (
                      <td key={key} className="border px-3 py-2">
                        {String(app[key])}
                      </td>
                    )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
