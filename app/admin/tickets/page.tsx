"use client";

import { useEffect, useState } from "react";

type Ticket = {
  id: string;
  email: string;
  eventName: string;
  purchaserName: string;
  emailStatus: string;
  createdAt: string;
};

export default function TicketsAdminPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [retrying, setRetrying] = useState<string | null>(null);

  // ✅ Fetch tickets (optionally only FAILED)
  const fetchTickets = async (status?: string) => {
    setLoading(true);
    try {
      const url = status
        ? `/api/generateTicket?status=${status}`
        : `/api/generateTicket`;
      const res = await fetch(url);
      const data = await res.json();
      setTickets(data.tickets || []);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Retry sending a failed ticket
  const retryTicket = async (ticketId: string) => {
    setRetrying(ticketId);
    try {
      const res = await fetch("/api/generateTicket", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId }),
      });
      const data = await res.json();
      alert(
        data.success
          ? `Ticket ${ticketId} resent successfully!`
          : `Failed to resend ticket: ${data.error}`
      );
      fetchTickets("FAILED"); // refresh list
    } catch (err) {
      console.error("Retry error:", err);
      alert("Error retrying ticket.");
    } finally {
      setRetrying(null);
    }
  };

  useEffect(() => {
    fetchTickets("FAILED");
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎟 Ticket Dashboard</h1>
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => fetchTickets()}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          All Tickets
        </button>
        <button
          onClick={() => fetchTickets("FAILED")}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Failed Tickets
        </button>
      </div>

      {loading ? (
        <p>Loading tickets...</p>
      ) : tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Event</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="text-center">
                <td className="p-2 border">{ticket.eventName}</td>
                <td className="p-2 border">{ticket.purchaserName}</td>
                <td className="p-2 border">{ticket.email}</td>
                <td
                  className={`p-2 border font-semibold ${
                    ticket.emailStatus === "FAILED"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {ticket.emailStatus}
                </td>
                <td className="p-2 border">
                  {ticket.emailStatus === "FAILED" && (
                    <button
                      onClick={() => retryTicket(ticket.id)}
                      disabled={retrying === ticket.id}
                      className="bg-yellow-500 text-white px-3 py-1 rounded disabled:opacity-50"
                    >
                      {retrying === ticket.id ? "Retrying..." : "Retry"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
