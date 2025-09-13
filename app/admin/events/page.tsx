// app/admin/events/page.tsx
"use client";

import AdminEventList from "@/components/admin/AdminEventList";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminEventsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <p className="text-center mt-10">Checking authentication...</p>;
  }

  return <AdminEventList />;
}
