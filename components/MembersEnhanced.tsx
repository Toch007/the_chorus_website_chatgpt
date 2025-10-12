"use client";

import { useState } from "react";
import {
  Filter,
  GridIcon,
  List,
  SortAsc,
  Users,
  Search,
  X,
} from "lucide-react";

interface FilterOptions {
  section: string;
  sortBy: "name" | "section" | "alphabetical";
  viewMode: "grid" | "list";
}

interface MembersFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
  totalResults: number;
}

export function MembersFilter({
  onFilterChange,
  onSearch,
  searchQuery,
  totalResults,
}: MembersFilterProps) {
  const [activeSection, setActiveSection] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "section" | "alphabetical">(
    "section"
  );
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = [
    "Soprano",
    "Alto",
    "Tenor",
    "Bass",
    "Music Director",
    "Accompanist",
  ];

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    const filters = {
      section: newFilters.section || activeSection,
      sortBy: newFilters.sortBy || sortBy,
      viewMode: newFilters.viewMode || viewMode,
    };

    if (newFilters.section) setActiveSection(newFilters.section);
    if (newFilters.sortBy) setSortBy(newFilters.sortBy);
    if (newFilters.viewMode) setViewMode(newFilters.viewMode);

    onFilterChange(filters);
  };

  const clearSearch = () => {
    onSearch("");
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search members by name or section..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            className="w-full pl-12 pr-12 py-4 text-lg rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Search Results Counter */}
        {searchQuery && (
          <div className="mt-3 text-sm text-blue-600">
            {totalResults} member{totalResults !== 1 ? "s" : ""} found
          </div>
        )}

        {/* Quick Filter Tags */}
        {(showSuggestions || !searchQuery) && (
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-sm text-gray-500 mr-2">Quick filters:</span>
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  onSearch(suggestion.toLowerCase());
                  setShowSuggestions(false);
                }}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          {/* Section Filter */}
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-blue-600" />
            <select
              value={activeSection}
              onChange={(e) => handleFilterChange({ section: e.target.value })}
              className="bg-blue-50 border-0 rounded-lg px-4 py-2 text-blue-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="all">All Sections</option>
              <option value="music director">Music Director</option>
              <option value="accompanists">Accompanists</option>
              <option value="soprano">Soprano</option>
              <option value="alto">Alto</option>
              <option value="tenor">Tenor</option>
              <option value="bass">Bass</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => handleFilterChange({ viewMode: "grid" })}
              className={`p-2 rounded-md transition-all ${
                viewMode === "grid"
                  ? "bg-white shadow-sm text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              title="Grid View"
            >
              <GridIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleFilterChange({ viewMode: "list" })}
              className={`p-2 rounded-md transition-all ${
                viewMode === "list"
                  ? "bg-white shadow-sm text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-3">
            <SortAsc className="w-5 h-5 text-blue-600" />
            <select
              value={sortBy}
              onChange={(e) =>
                handleFilterChange({ sortBy: e.target.value as any })
              }
              className="bg-blue-50 border-0 rounded-lg px-4 py-2 text-blue-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="section">By Section</option>
              <option value="name">By Name</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MembersStatisticsProps {
  membersGrouped: Record<string, any[]>;
  filteredCount?: number;
  isFiltered?: boolean;
}

export function EnhancedMembersStatistics({
  membersGrouped,
  filteredCount = 0,
  isFiltered = false,
}: MembersStatisticsProps) {
  const totalMembers = Object.values(membersGrouped).flat().length;
  const displayCount = isFiltered ? filteredCount : totalMembers;

  const sectionCounts = Object.entries(membersGrouped)
    .filter(
      ([section]) => !["music director", "accompanists"].includes(section)
    )
    .map(([section, members]) => ({
      section: section.charAt(0).toUpperCase() + section.slice(1),
      count: members.length,
      percentage: Math.round((members.length / totalMembers) * 100),
    }));

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 mb-12">
      <div className="col-span-2 lg:col-span-1 bg-white/25 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/30 shadow-lg">
        <Users className="w-8 h-8 text-white mx-auto mb-3" />
        <div className="text-3xl font-bold text-white mb-1">
          {displayCount}
          {isFiltered && (
            <span className="text-lg text-blue-200 ml-1">/ {totalMembers}</span>
          )}
        </div>
        <div className="text-blue-100 text-sm">
          {isFiltered ? "Filtered" : "Total"} Members
        </div>
      </div>

      {sectionCounts.map(({ section, count, percentage }) => (
        <div
          key={section}
          className="bg-white/25 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/30 hover:bg-white/35 transition-colors shadow-lg"
        >
          <div className="text-2xl font-bold text-white mb-1">{count}</div>
          <div className="text-blue-100 text-sm mb-2">{section}</div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="text-xs text-blue-200 mt-1">{percentage}%</div>
        </div>
      ))}
    </div>
  );
}

interface Member {
  name: string;
  title: string;
  section: string;
  bio: string;
  image: string;
}

interface MembersListViewProps {
  members: Member[];
  onMemberClick: (member: Member) => void;
}

export function MembersListView({
  members,
  onMemberClick,
}: MembersListViewProps) {
  return (
    <div className="space-y-4">
      {members.map((member, index) => (
        <div
          key={index}
          onClick={() => onMemberClick(member)}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border cursor-pointer group flex items-center gap-6 hover:-translate-y-1"
        >
          <div className="w-16 h-16 relative rounded-full overflow-hidden flex-shrink-0">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-blue-800 group-hover:text-blue-900 transition-colors">
              {member.name}
            </h3>
            <p className="text-blue-600 text-sm font-medium">{member.title}</p>
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">
              {member.bio ||
                `${member.name} is a dedicated member of The Chorus Abuja, contributing their talent and passion to our ensemble.`}
            </p>
          </div>
          <div className="flex-shrink-0">
            <div className="text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-full font-medium border">
              {member.section.charAt(0).toUpperCase() + member.section.slice(1)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
