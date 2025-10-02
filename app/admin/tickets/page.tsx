"use client";

import { useEffect, useState } from "react";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import DataTable from "@/components/admin/DataTable";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import {
  Ticket,
  User,
  Mail,
  Calendar,
  RefreshCw,
  CheckCircle,
  XCircle,
  Filter,
} from "lucide-react";

interface TicketData {
  id: string;
  email: string;
  eventName: string;
  purchaserName: string;
  emailStatus: string;
  createdAt: string;
  reference?: string;
  amount?: number;
  tier?: string;
  status?: string;
  ticketId?: string;
}

export default function TicketsAdminPage() {
  useAuthRedirect();
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [retrying, setRetrying] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("");

  // ✅ Fetch tickets (optionally only FAILED)
  const fetchTickets = async (status?: string) => {
    setLoading(true);
    try {
      const url = status ? `/api/tickets?status=${status}` : `/api/tickets`;
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
      const res = await fetch("/api/tickets", {
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
      fetchTickets(filterStatus || undefined); // refresh list
    } catch (err) {
      console.error("Retry error:", err);
      alert("Error retrying ticket.");
    } finally {
      setRetrying(null);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
    fetchTickets(status || undefined);
  };

  const columns = [
    {
      key: "eventName",
      label: "Event",
      sortable: true,
      render: (value: string, row: TicketData) => (
        <div className="flex items-center gap-2">
          <Ticket className="w-4 h-4 text-purple-600" />
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-xs text-gray-500">Ref: {row.reference}</div>
          </div>
        </div>
      ),
    },
    {
      key: "tier",
      label: "Ticket Type",
      sortable: true,
      render: (value: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            value === "Diamond"
              ? "bg-purple-100 text-purple-800"
              : value === "Gold"
                ? "bg-yellow-100 text-yellow-800"
                : value === "Silver"
                  ? "bg-gray-100 text-gray-800"
                  : "bg-blue-100 text-blue-800"
          }`}
        >
          {value || "Standard"}
        </span>
      ),
    },
    {
      key: "purchaserName",
      label: "Purchaser",
      sortable: true,
      render: (value: string, row: TicketData) => (
        <div className="flex items-start gap-3">
          <div className="p-2 bg-green-100 rounded-full flex-shrink-0">
            <User className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "emailStatus",
      label: "Status",
      sortable: true,
      render: (value: string) => (
        <span
          className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${
            value === "SUCCESS"
              ? "bg-green-100 text-green-800"
              : value === "FAILED"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {value === "SUCCESS" ? (
            <CheckCircle className="w-3 h-3" />
          ) : value === "FAILED" ? (
            <XCircle className="w-3 h-3" />
          ) : null}
          {value}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Purchase Date",
      sortable: true,
      render: (value: string) => {
        const date = new Date(value);
        return (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        );
      },
    },
  ];

  const actions = [
    {
      label: "Retry Email",
      icon: RefreshCw,
      onClick: (row: TicketData) => retryTicket(row.id),
      variant: "primary" as const,
      show: (row: TicketData) => row.emailStatus === "FAILED",
    },
  ];

  const failedTickets = tickets.filter(
    (ticket) => ticket.emailStatus === "FAILED"
  ).length;
  const successTickets = tickets.filter(
    (ticket) => ticket.emailStatus === "SUCCESS"
  ).length;

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        title="Tickets Management"
        description={`Manage ${tickets.length} ticket purchases • ${successTickets} successful, ${failedTickets} failed`}
        action={
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <select
                value={filterStatus}
                onChange={(e) => handleFilterChange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Tickets</option>
                <option value="SUCCESS">Successful</option>
                <option value="FAILED">Failed</option>
              </select>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">
                  {successTickets} Success
                </span>
              </div>
              <div className="flex items-center gap-2 bg-red-50 px-3 py-2 rounded-lg">
                <XCircle className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-600">
                  {failedTickets} Failed
                </span>
              </div>
            </div>
          </div>
        }
      />

      <DataTable
        data={tickets}
        columns={columns}
        actions={actions}
        searchable={true}
        exportable={true}
        selectable={true}
        pagination={true}
        pageSize={15}
        loading={loading}
        emptyMessage="No tickets purchased yet. Ticket purchases will appear here when customers buy tickets."
      />
    </div>
  );
}
