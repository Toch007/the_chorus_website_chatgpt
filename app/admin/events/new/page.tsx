"use client";
import EventForm from "@/components/admin/EventForm";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export default function NewEventPage() {
  useAuthRedirect();
  return <EventForm />;
}
