"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import DataGrid from "@/components/DataGrid";
import Footer from "@/components/Footer";
import { useDatasets } from "@/hooks/useDatasets";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  LayoutGrid,
  Rows2,
  Search,
} from "lucide-react";

export default function Home() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState({
    sectors: [] as string[],
    geographies: [] as string[],
    tags: [] as string[],
    formats: [] as string[],
    timePeriod: [] as string[],
  });

  const { datasets, total, aggregations, loading, error } = useDatasets({
    query: searchQuery,
    page,
    size: pageSize,
    sort: sortBy,
    filters,
  });

  const handleFilterChange = (filterType: string, value: string, checked: boolean) => {
    setFilters((prev) => {
      const key = filterType.toLowerCase() as keyof typeof prev;
      const values = prev[key];

      return {
        ...prev,
        [key]: checked ? [...values, value] : values.filter((v) => v !== value),
      };
    });
    setPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      sectors: [],
      geographies: [],
      tags: [],
      formats: [],
      timePeriod: [],
    });
    setSearchQuery("");
    setPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="flex-1">

        {/* Breadcrumb */}
        <div className="bg-amber-400 px-4 py-2 text-sm">
          Home <span className="mx-2">{">"}</span> <b>All Data</b>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-6 px-4 py-6 max-w-7xl mx-auto">

          {/* Sidebar */}
          <div className="w-full lg:w-56">
            <Sidebar
              datasets={datasets}
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              aggregations={aggregations}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">

            {/* Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

              {/* LEFT */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">

                {/* Search */}
                <div className="relative w-full sm:max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Start typing to search for any Dataset"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-2 text-gray-500">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "text-blue-900" : "hover:bg-gray-200"}`}
                  >
                    <LayoutGrid className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "text-blue-900" : "hover:bg-gray-200"}`}
                  >
                    <Rows2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-3 justify-between sm:justify-end">
                <ArrowUpDown className="w-5 h-5 text-blue-900" />

                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setPage(1);
                  }}
                  className="border rounded-md px-3 py-2 text-sm"
                >
                  <option value="recent">Latest Updated</option>
                  <option value="alphabetical">Alphabetical</option>
                </select>
              </div>
            </div>

            {/* Data */}
            <DataGrid
              datasets={datasets}
              viewMode={viewMode}
              loading={loading}
              error={error}
            />

            {/* Pagination */}
            {!loading && datasets.length > 0 && (
              <div className="mt-6 bg-white rounded-2xl shadow-sm px-4 sm:px-6 py-3">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 sm:gap-6">

                  {/* Rows */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Rows per page</span>
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setPage(1);
                      }}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      <option value={5}>05</option>
                      <option value={9}>09</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  </div>

                  {/* Page Info */}
                  <div className="text-sm text-gray-600">
                    Page {String(page).padStart(2, "0")} of{" "}
                    {String(Math.ceil(total / pageSize)).padStart(2, "0")}
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">

                    <button onClick={() => setPage(1)} disabled={page === 1}>
                      <ChevronsLeft className="w-4 h-4" />
                    </button>

                    <button onClick={() => setPage((p) => Math.max(1, p - 1))}>
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() =>
                        setPage((p) =>
                          Math.min(Math.ceil(total / pageSize), p + 1)
                        )
                      }
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setPage(Math.ceil(total / pageSize))}
                    >
                      <ChevronsRight className="w-4 h-4" />
                    </button>

                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}