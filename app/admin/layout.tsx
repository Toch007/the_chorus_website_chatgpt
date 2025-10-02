// app/admin/layout.tsx

"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [pendingApplications, setPendingApplications] = useState(0);

  useEffect(() => {
    const fetchApplicationStats = async () => {
      try {
        const [choirSnap, volunteerSnap, mediaSnap, techSnap] =
          await Promise.all([
            getDocs(collection(db, "join_choir")),
            getDocs(collection(db, "join_volunteer")),
            getDocs(collection(db, "join_media")),
            getDocs(collection(db, "join_tech")),
          ]);

        const total =
          choirSnap.size + volunteerSnap.size + mediaSnap.size + techSnap.size;
        setPendingApplications(total);
      } catch (error) {
        console.error("Error fetching application stats:", error);
      }
    };

    fetchApplicationStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar pendingApplications={pendingApplications} />
      <div className="flex-1 lg:ml-0">
        <main className="h-full">{children}</main>
      </div>
    </div>
  );
}
