'use client'

import { Dataset } from '@/hooks/useDatasets'
import DataCard from './DataCard'
import DataListItem from './DataListItem'

interface DataGridProps {
  datasets: Dataset[]
  viewMode: 'grid' | 'list'
  loading: boolean
  error: string | null
}

export default function DataGrid({
  datasets,
  viewMode,
  loading,
  error,
}: DataGridProps) {
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 font-medium">Error loading datasets: {error}</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
        </div>
        <p className="mt-4 text-gray-600">Loading datasets...</p>
      </div>
    )
  }

  if (datasets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No datasets found. Try adjusting your filters.</p>
      </div>
    )
  }

  return (
    <div>
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {datasets.map(dataset => (
            <DataCard key={dataset.id} dataset={dataset} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {datasets.map(dataset => (
            <DataListItem key={dataset.id} dataset={dataset} />
          ))}
        </div>
      )}
    </div>
  )
}
