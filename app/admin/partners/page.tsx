"use client";

import { useEffect, useState } from "react";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import DataTable from "@/components/admin/DataTable";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import {
  Building2,
  ExternalLink,
  Globe,
  ImageIcon,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";

interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
  createdAt: any;
}

export default function AdminPartnersPage() {
  useAuthRedirect();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    website: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchPartners = async () => {
    try {
      const response = await fetch("/api/partners");
      const result = await response.json();

      if (result.success && result.partners) {
        setPartners(result.partners);
      } else {
        console.error("Failed to fetch partners:", result.message);
      }
    } catch (error) {
      console.error("Error fetching partners:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPartner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.logo.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        await fetchPartners();
        setFormData({ name: "", logo: "", website: "" });
        setShowAddForm(false);
        alert("✅ Partner added successfully!");
      } else {
        alert("❌ " + (result.error || result.message));
      }
    } catch (error) {
      console.error("Error adding partner:", error);
      alert("❌ Failed to add partner");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePartner = async (id: string) => {
    if (!confirm("Are you sure you want to delete this partner?")) return;

    try {
      const response = await fetch(`/api/partners?id=${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        await fetchPartners();
        alert("✅ Partner deleted successfully!");
      } else {
        alert("❌ " + (result.error || result.message));
      }
    } catch (error) {
      console.error("Error deleting partner:", error);
      alert("❌ Failed to delete partner");
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const columns = [
    {
      key: "logo",
      label: "Logo",
      render: (value: string, row: Partner) => (
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
            <img
              src={value}
              alt={row.name}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement!.innerHTML = `
                  <div class="flex items-center justify-center w-full h-full text-gray-400">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                    </svg>
                  </div>
                `;
              }}
            />
          </div>
        </div>
      ),
    },
    {
      key: "name",
      label: "Partner Name",
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-blue-600" />
          <span className="font-semibold text-gray-900">{value}</span>
        </div>
      ),
    },
    {
      key: "website",
      label: "Website",
      render: (value: string) =>
        value ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm truncate max-w-[200px]">{value}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <span className="text-gray-400 text-sm">No website</span>
        ),
    },
    {
      key: "createdAt",
      label: "Added",
      sortable: true,
      render: (value: string) => (
        <span className="text-sm text-gray-500">
          {new Date(value).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (value: any, row: Partner) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDeletePartner(row.id)}
            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition"
            title="Delete partner"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        title="Partners Management"
        description={`Manage partner logos and information displayed on the website (${partners.length} partners)`}
      />

      {/* Add Partner Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4" />
          Add New Partner
        </button>
      </div>

      {/* Add Partner Form */}
      {showAddForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-blue-600" />
            Add New Partner
          </h3>

          <form onSubmit={handleAddPartner} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Partner Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., MTN Foundation"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Logo URL *
              </label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <input
                    type="text"
                    value={formData.logo}
                    onChange={(e) =>
                      setFormData({ ...formData, logo: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="/images/partners/logo.png or https://example.com/logo.png"
                    required
                  />
                </div>
                {formData.logo && (
                  <div className="w-12 h-12 bg-gray-100 rounded border flex items-center justify-center overflow-hidden">
                    <img
                      src={formData.logo}
                      alt="Preview"
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement!.innerHTML = `
                          <div class="text-red-400 text-xs">Invalid</div>
                        `;
                      }}
                    />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Upload images to /public/images/partners/ folder or use external
                URL
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Website (Optional)
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://partner-website.com"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={
                  isSubmitting || !formData.name.trim() || !formData.logo.trim()
                }
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {isSubmitting ? "Adding..." : "Add Partner"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setFormData({ name: "", logo: "", website: "" });
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Partners Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <DataTable
          data={partners}
          columns={columns}
          emptyMessage="No partners found. Add your first partner to get started!"
        />
      </div>
    </div>
  );
}
