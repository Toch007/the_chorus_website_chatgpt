// app/admin/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/admin/login");
      } else {
        setAuthenticated(true);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) return <p className="text-center py-20">Loading dashboard...</p>;
  if (!authenticated) return null;

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-6 text-center">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="flex flex-col gap-4 items-center">
        {/* Existing Links */}
        <a href="/admin/members" className="text-blue-700 underline hover:text-blue-900">
          ➕ Manage Members
        </a>
        <a href="/admin/events" className="text-blue-700 underline hover:text-blue-900">
          📅 Manage Events
        </a>
        <a href="/admin/blog" className="text-blue-700 underline hover:text-blue-900">
          📝 Manage Blog Posts
        </a>
        <a href="/admin/newsletter" className="text-blue-700 underline hover:text-blue-900">
          📧 View Newsletter Subscribers
        </a>

        {/* ✅ New Join Forms Management */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Join Forms</h2>
          <div className="flex flex-col gap-2">
            <a href="/admin/join/choir" className="text-green-700 underline hover:text-green-900">
              🎶 View Choir Applications
            </a>
            <a href="/admin/join/volunteer" className="text-green-700 underline hover:text-green-900">
              🙌 View Volunteer Applications
            </a>
            <a href="/admin/join/media" className="text-green-700 underline hover:text-green-900">
              🎥 View Media Applications
            </a>
            <a href="/admin/join/tech" className="text-green-700 underline hover:text-green-900">
              🛠️ View Tech Applications
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
