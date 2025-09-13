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
        <button
          onClick={handleLogout}
          className="text-red-600 hover:underline mt-4"
        >
          🔐 Logout
        </button>
      </div>
    </div>
  );
}
