// app/admin/events/[id]/edit/page.tsx

"use client";

import EditEventForm from "@/components/admin/EditEventForm";
import { useSearchParams } from "next/navigation";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export default function EditEventPage() {
  useAuthRedirect();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id) return <p>Event ID missing</p>;

  return <EditEventForm eventId={id} />;
}
