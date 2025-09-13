// app/admin/layout.tsx

import type { ReactNode } from "react";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex justify-end pr-6 pt-4">
        <LogoutButton />
      </div>
      {children}
    </div>
  );
}
