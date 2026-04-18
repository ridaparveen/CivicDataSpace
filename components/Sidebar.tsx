'use client'

import { useState } from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { Aggregations } from '@/hooks/useDatasets'

interface SidebarProps {
  filters: {
    sectors: string[]
    geographies: string[]
    tags: string[]
    formats: string[]
    timePeriod: string[]
  }
  onFilterChange: (filterType: string, value: string, checked: boolean) => void
  onResetFilters: () => void
  aggregations: Aggregations
}

export default function Sidebar({
  filters,
  onFilterChange,
  onResetFilters,
  aggregations,
}: SidebarProps) {

  const [expandedSections, setExpandedSections] = useState({
    sectors: true,
    dataType: true,
    tags: false,
    geographies: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // 🔹 Section Header
  const sectionHeader = (title: string, key: string, count: number) => (
    <button
      onClick={() => toggleSection(key)}
      className={`flex items-center justify-between w-full px-4 py-2 rounded-md text-sm font-medium transition
        ${expandedSections[key] ? 'bg-gray-300' : 'bg-gray-200 hover:bg-gray-300'}
      `}
    >
      <span>{title} ({count})</span>
      <ChevronDownIcon
        className={`w-4 h-4 transition-transform ${
          expandedSections[key] ? 'rotate-180' : ''
        }`}
      />
    </button>
  )

  // 🔹 Checkbox Item
  const checkboxItem = (
    label: string,
    checked: boolean,
    onChange: (checked: boolean) => void
  ) => (
    <label className="flex items-center gap-3 text-sm cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
      />
      <span className="text-gray-700 truncate">{label}</span>
    </label>
  )

  // 🔹 Helper to render aggregation
  const renderAggregation = (
    data: Record<string, number> | undefined,
    filterKey: keyof typeof filters
  ) => {
    if (!data) return <p className="text-xs text-gray-400">No data</p>

    return Object.entries(data)
      .sort((a, b) => b[1] - a[1]) // 🔥 sort by count desc
      .map(([key, count]) =>
        checkboxItem(
          `${key} (${count})`,
          filters[filterKey].includes(key),
          (checked) => onFilterChange(filterKey, key, checked)
        )
      )
  }

  return (
    <aside className="w-56">
      <div className="bg-white rounded-xl shadow-sm p-4 sticky top-20">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-blue-900 font-semibold text-sm">FILTERS</h3>
          <button
            onClick={onResetFilters}
            className="text-amber-600 text-xs font-medium hover:underline"
          >
            RESET
          </button>
        </div>

        {/* ================= DATA TYPE ================= */}
        <div className="mb-4">
          {sectionHeader(
            'Data Type',
            'dataType',
            Object.keys(aggregations?.formats || {}).length
          )}

          {expandedSections.dataType && (
            <div className="mt-3 space-y-2 pl-2">
              {renderAggregation(aggregations?.formats, 'formats')}
            </div>
          )}
        </div>

        {/* ================= SECTORS ================= */}
        <div className="mb-4">
          {sectionHeader(
            'Sectors',
            'sectors',
            Object.keys(aggregations?.sectors || {}).length
          )}

          {expandedSections.sectors && (
            <div className="mt-3 space-y-2 pl-2 max-h-40 overflow-y-auto">
              {renderAggregation(aggregations?.sectors, 'sectors')}
            </div>
          )}
        </div>

        {/* ================= TAGS ================= */}
        <div className="mb-4">
          {sectionHeader(
            'Tags',
            'tags',
            Object.keys(aggregations?.tags || {}).length
          )}

          {expandedSections.tags && (
            <div className="mt-3 space-y-2 pl-2 max-h-40 overflow-y-auto">
              {renderAggregation(aggregations?.tags, 'tags')}
            </div>
          )}
        </div>

        {/* ================= GEOGRAPHIES ================= */}
        <div>
          {sectionHeader(
            'Geographies',
            'geographies',
            Object.keys(aggregations?.geographies || {}).length
          )}

          {expandedSections.geographies && (
            <div className="mt-3 space-y-2 pl-2 max-h-40 overflow-y-auto">
              {renderAggregation(aggregations?.geographies, 'geographies')}
            </div>
          )}
        </div>

      </div>
    </aside>
  )
}