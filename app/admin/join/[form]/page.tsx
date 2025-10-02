"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import DataTable from "@/components/admin/DataTable";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { FileText, Users, Download } from "lucide-react";

interface JoinApplication {
  id: string;
  name?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
  experience?: string;
  skills?: string;
  availability?: string;
  submittedAt?: string;
  [key: string]: any;
}

export default function AdminJoinFormPage() {
  useAuthRedirect();
  const { form } = useParams(); // "choir", "volunteer", "media", "tech"
  const [applications, setApplications] = useState<JoinApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!form) return;

    const fetchData = async () => {
      try {
        const colRef = collection(db, `join_${form}`);
        const snapshot = await getDocs(colRef);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as JoinApplication[];
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [form]);

  // Generate dynamic columns based on the data structure
  const generateColumns = () => {
    if (applications.length === 0) return [];

    const sampleApp = applications[0];
    const excludeKeys = ["id"];
    const priorityKeys = ["name", "fullName", "email", "phone"];

    const allKeys = Object.keys(sampleApp).filter(
      (key) => !excludeKeys.includes(key)
    );

    // Sort keys to prioritize common fields
    const sortedKeys = [
      ...priorityKeys.filter((key) => allKeys.includes(key)),
      ...allKeys.filter((key) => !priorityKeys.includes(key)),
    ];

    return sortedKeys.map((key) => ({
      key,
      label:
        key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1"),
      sortable: true,
      render: (value: any, row: JoinApplication) => {
        if (key === "name" || key === "fullName") {
          return (
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  {value || "N/A"}
                </div>
                {row.email && (
                  <div className="text-sm text-gray-500">{row.email}</div>
                )}
              </div>
            </div>
          );
        }

        if (key === "email") {
          return (
            <a
              href={`mailto:${value}`}
              className="text-blue-600 hover:underline"
            >
              {value || "N/A"}
            </a>
          );
        }

        if (key === "phone") {
          return (
            <a href={`tel:${value}`} className="text-blue-600 hover:underline">
              {value || "N/A"}
            </a>
          );
        }

        if (typeof value === "string" && value.length > 100) {
          return (
            <div className="max-w-xs">
              <div className="truncate" title={value}>
                {value}
              </div>
            </div>
          );
        }

        return <span className="text-sm text-gray-600">{value || "N/A"}</span>;
      },
    }));
  };

  const formTitles = {
    choir: "Choir Applications",
    volunteer: "Volunteer Applications",
    media: "Media Team Applications",
    tech: "Technical Team Applications",
  };

  const formDescriptions = {
    choir: "Manage applications from people wanting to join the choir",
    volunteer: "Manage volunteer applications and coordinator requests",
    media: "Manage applications for media and photography team",
    tech: "Manage technical team and sound engineering applications",
  };

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        title={
          formTitles[form as keyof typeof formTitles] || `${form} Applications`
        }
        description={`${formDescriptions[form as keyof typeof formDescriptions] || `Manage ${form} applications`} • ${applications.length} total applications`}
        action={
          <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
            <FileText className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">
              {applications.length} Applications
            </span>
          </div>
        }
      />

      <DataTable
        data={applications}
        columns={generateColumns()}
        actions={[]}
        searchable={true}
        exportable={true}
        selectable={true}
        pagination={true}
        pageSize={15}
        loading={loading}
        emptyMessage={`No ${form} applications received yet. Applications will appear here when submitted.`}
      />
    </div>
  );
}
