// app/admin/events/[id]/edit/page.tsx

"use client";

import { Suspense } from "react";
import EditEventForm from "@/components/admin/EditEventForm";
import { useSearchParams } from "next/navigation";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

function EditEventContent() {
  useAuthRedirect();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id) return <p>Event ID missing</p>;

  return <EditEventForm eventId={id} />;
}

export default function EditEventPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
        </div>
      }
    >
      <EditEventContent />
    </Suspense>
  );
}
