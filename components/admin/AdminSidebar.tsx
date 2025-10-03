"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Mail,
  Ticket,
  Heart,
  UserPlus,
  Building2,
  FolderOpen,
  Settings,
  LogOut,
  Zap,
  Menu,
  X,
  ChevronRight,
  Home,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: any;
  badge?: number;
  children?: NavItem[];
}

interface AdminSidebarProps {
  pendingApplications?: number;
}

export default function AdminSidebar({
  pendingApplications = 0,
}: AdminSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([
    "applications",
  ]);
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/admin/login";
  };

  const toggleExpanded = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((item) => item !== itemName)
        : [...prev, itemName]
    );
  };

  const navigation: NavItem[] = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Members",
      href: "/admin/members",
      icon: Users,
    },
    {
      name: "Events",
      href: "/admin/events",
      icon: Calendar,
    },
    {
      name: "Blog Posts",
      href: "/admin/blog",
      icon: FileText,
    },
    {
      name: "Newsletter",
      href: "/admin/newsletter",
      icon: Mail,
    },
    {
      name: "Tickets",
      href: "/admin/tickets",
      icon: Ticket,
    },
    {
      name: "Donations",
      href: "/admin/donations",
      icon: Heart,
    },
    {
      name: "Partners",
      href: "/admin/partners",
      icon: Building2,
    },
    {
      name: "File Manager",
      href: "/admin/files",
      icon: FolderOpen,
    },
    {
      name: "Image Optimization",
      href: "/admin/test-optimization",
      icon: Zap,
    },
    {
      name: "Applications",
      href: "#",
      icon: UserPlus,
      badge: pendingApplications,
      children: [
        {
          name: "Choir",
          href: "/admin/join/choir",
          icon: () => <span className="text-sm">🎶</span>,
        },
        {
          name: "Volunteer",
          href: "/admin/join/volunteer",
          icon: () => <span className="text-sm">🙌</span>,
        },
        {
          name: "Media Team",
          href: "/admin/join/media",
          icon: () => <span className="text-sm">🎥</span>,
        },
        {
          name: "Tech Team",
          href: "/admin/join/tech",
          icon: () => <span className="text-sm">🛠️</span>,
        },
      ],
    },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  const renderNavItem = (item: NavItem, depth = 0) => {
    const active = isActive(item.href);
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.name.toLowerCase());

    if (hasChildren) {
      return (
        <div key={item.name}>
          <button
            onClick={() => toggleExpanded(item.name.toLowerCase())}
            className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors ${
              active
                ? "bg-blue-100 text-blue-700 border-r-2 border-blue-500"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
              {item.badge && item.badge > 0 && (
                <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
            <ChevronRight
              className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-90" : ""}`}
            />
          </button>

          {isExpanded && (
            <div className="mt-1 ml-4 space-y-1">
              {item.children?.map((child) => renderNavItem(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    if (item.href === "#") return null;

    return (
      <Link
        key={item.name}
        href={item.href}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
          depth > 0 ? "pl-8" : ""
        } ${
          active
            ? "bg-blue-100 text-blue-700 border-r-2 border-blue-500"
            : "text-gray-700 hover:bg-gray-100"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <item.icon className="w-5 h-5 flex-shrink-0" />
        <span className="font-medium">{item.name}</span>
        {item.badge && item.badge > 0 && (
          <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full ml-auto">
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 bg-white rounded-lg shadow-md border border-gray-200"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:shadow-none`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TC</span>
            </div>
            <div>
              <h2 className="font-bold text-gray-900">The Chorus</h2>
              <p className="text-xs text-gray-600">Admin Panel</p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => renderNavItem(item))}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors mb-2"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Back to Website</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-700 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
