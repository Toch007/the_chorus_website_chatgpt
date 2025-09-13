// app/admin/events/[id]/edit/page.tsx

"use client";

import EditEventForm from "@/components/admin/EditEventForm";
import { useSearchParams } from "next/navigation";

export default function EditEventPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id) return <p>Event ID missing</p>;

  return <EditEventForm eventId={id} />;
}
