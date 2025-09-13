// app/admin/newsletter/page.tsx

"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";

export default function NewsletterAdminPage() {
  const [subscribers, setSubscribers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = async () => {
    const snapshot = await getDocs(collection(db, "newsletterSubscribers"));
    const data = snapshot.docs.map((doc) => doc.data().email);
    setSubscribers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const exportCSV = () => {
    const csv = subscribers.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "subscribers.csv";
    link.click();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Newsletter Subscribers</h1>

      {loading ? (
        <p>Loading...</p>
      ) : subscribers.length === 0 ? (
        <p>No subscribers found.</p>
      ) : (
        <>
          <button
            onClick={exportCSV}
            className="mb-4 bg-blue-700 text-white px-4 py-2 rounded"
          >
            Export to CSV
          </button>

          <ul className="space-y-2 bg-white p-4 rounded shadow">
            {subscribers.map((email, index) => (
              <li key={index} className="border-b last:border-none py-2">
                {email}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
