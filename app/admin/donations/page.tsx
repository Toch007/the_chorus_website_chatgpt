"use client";

import { useEffect, useState } from "react";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import DataTable from "@/components/admin/DataTable";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import {
  DollarSign,
  Mail,
  Calendar,
  User,
  Heart,
  TrendingUp,
} from "lucide-react";

interface Donation {
  id: string;
  amount: number;
  email: string;
  reference: string;
  createdAt: any;
  donorName?: string;
}

export default function AdminDonationsPage() {
  useAuthRedirect();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDonations = async () => {
    try {
      const response = await fetch("/api/donations/list");
      const result = await response.json();

      if (result.success && result.donations) {
        const data = result.donations.map((donation: any) => ({
          id: donation.id,
          amount: donation.amount || 0,
          email: donation.email || "",
          reference: donation.reference || "",
          createdAt: donation.createdAt,
          donorName: donation.name || "Anonymous",
        }));
        setDonations(data);
      } else {
        console.error("Failed to fetch donations:", result.message);
      }
    } catch (error) {
      console.error("Error fetching donations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const columns = [
    {
      key: "reference",
      label: "Reference",
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-red-500" />
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      ),
    },
    {
      key: "email",
      label: "Donor",
      sortable: true,
      render: (value: string, row: Donation) => (
        <div className="flex items-start gap-3">
          <div className="p-2 bg-green-100 rounded-full flex-shrink-0">
            <User className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{row.donorName}</div>
            <div className="text-sm text-gray-500">{value}</div>
          </div>
        </div>
      ),
    },
    {
      key: "amount",
      label: "Amount",
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-green-600" />
          <span className="font-semibold text-green-700">
            ₦{value.toLocaleString()}
          </span>
        </div>
      ),
    },
    {
      key: "createdAt",
      label: "Donation Date",
      sortable: true,
      render: (value: any) => {
        const date = value?.toDate?.() || new Date(value);
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

  // Calculate statistics
  const totalAmount = donations.reduce(
    (sum, donation) => sum + donation.amount,
    0
  );
  const averageDonation =
    donations.length > 0 ? totalAmount / donations.length : 0;
  const thisMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format
  const thisMonthDonations = donations.filter((donation) => {
    const donationDate =
      donation.createdAt?.toDate?.() || new Date(donation.createdAt);
    return donationDate.toISOString().slice(0, 7) === thisMonth;
  });
  const monthlyTotal = thisMonthDonations.reduce(
    (sum, donation) => sum + donation.amount,
    0
  );

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        title="Donations Management"
        description={`Manage ${donations.length} donations • Total raised: ₦${totalAmount.toLocaleString()}`}
        action={
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">
                  ₦{monthlyTotal.toLocaleString()} this month
                </span>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                <DollarSign className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">
                  ₦{Math.round(averageDonation).toLocaleString()} avg
                </span>
              </div>
            </div>
          </div>
        }
      />

      <DataTable
        data={donations}
        columns={columns}
        actions={[]}
        searchable={true}
        exportable={true}
        selectable={true}
        pagination={true}
        pageSize={15}
        loading={loading}
        emptyMessage="No donations received yet. Donations will appear here when supporters contribute."
      />
    </div>
  );
}
