// Enhanced Members Page Features - Implementation Ideas

import { useState } from "react";
import { Filter, GridIcon, List, SortAsc, Users } from "lucide-react";

// 1. ADVANCED FILTERING COMPONENT
export function MembersFilter({
  onFilterChange,
}: {
  onFilterChange: (filters: any) => void;
}) {
  const [activeSection, setActiveSection] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "section" | "alphabetical">(
    "section"
  );

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 border">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        {/* Section Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-blue-600" />
          <select
            value={activeSection}
            onChange={(e) => setActiveSection(e.target.value)}
            className="bg-blue-50 border-0 rounded-lg px-4 py-2 text-blue-800"
          >
            <option value="all">All Sections</option>
            <option value="soprano">Soprano</option>
            <option value="alto">Alto</option>
            <option value="tenor">Tenor</option>
            <option value="bass">Bass</option>
          </select>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-md transition-all ${
              viewMode === "grid"
                ? "bg-white shadow-sm text-blue-600"
                : "text-gray-500"
            }`}
          >
            <GridIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-md transition-all ${
              viewMode === "list"
                ? "bg-white shadow-sm text-blue-600"
                : "text-gray-500"
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2">
          <SortAsc className="w-5 h-5 text-blue-600" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-blue-50 border-0 rounded-lg px-4 py-2 text-blue-800"
          >
            <option value="section">By Section</option>
            <option value="name">By Name</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>
    </div>
  );
}

// 2. ENHANCED STATISTICS COMPONENT
export function MembersStatistics({
  membersGrouped,
}: {
  membersGrouped: Record<string, any[]>;
}) {
  const totalMembers = Object.values(membersGrouped).flat().length;
  const sectionCounts = Object.entries(membersGrouped).map(
    ([section, members]) => ({
      section: section.charAt(0).toUpperCase() + section.slice(1),
      count: members.length,
    })
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
        <Users className="w-8 h-8 text-white mx-auto mb-3" />
        <div className="text-3xl font-bold text-white mb-1">{totalMembers}</div>
        <div className="text-blue-100 text-sm">Total Members</div>
      </div>

      {sectionCounts
        .filter((s) => !["Music director", "Accompanists"].includes(s.section))
        .map(({ section, count }) => (
          <div
            key={section}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
          >
            <div className="text-2xl font-bold text-white mb-1">{count}</div>
            <div className="text-blue-100 text-sm">{section}</div>
          </div>
        ))}
    </div>
  );
}

// 3. LIST VIEW COMPONENT
export function MembersList({ members }: { members: any[] }) {
  return (
    <div className="space-y-4">
      {members.map((member, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border flex items-center gap-6"
        >
          <div className="w-16 h-16 relative rounded-full overflow-hidden flex-shrink-0">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-800">
              {member.name}
            </h3>
            <p className="text-blue-600 text-sm">{member.title}</p>
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
              {member.bio}
            </p>
          </div>
          <div className="text-sm text-gray-500 bg-blue-50 px-3 py-1 rounded-full">
            {member.section}
          </div>
        </div>
      ))}
    </div>
  );
}

// 4. ENHANCED MEMBER CARD WITH ADDITIONAL INFO
export function EnhancedMemberCard({ member }: { member: any }) {
  return (
    <div className="group relative">
      {/* Existing card content... */}

      {/* Additional overlay info on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl flex items-end p-4">
        <div className="text-white">
          <div className="text-sm font-medium">{member.section}</div>
          <div className="text-xs opacity-80">Click to learn more</div>
        </div>
      </div>
    </div>
  );
}

// 5. SEARCH SUGGESTIONS
export function SearchWithSuggestions({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const [suggestions] = useState([
    "Soprano",
    "Alto",
    "Tenor",
    "Bass",
    "Music Director",
    "Accompanist",
  ]);

  return (
    <div className="relative">
      {/* Search input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search members by name or section..."
          className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border border-gray-200 bg-white/95 backdrop-blur-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* Quick filter tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onSearch(suggestion)}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
