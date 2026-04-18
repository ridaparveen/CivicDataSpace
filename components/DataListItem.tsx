'use client'

import { Dataset } from '@/hooks/useDatasets'
import {
  CalendarIcon,
  DownloadIcon,
  MapPinIcon,
  BarChart3Icon,
  Cloud,
  Globe,
  BarChart,
  FileJson,
  FileText,
  FileSpreadsheet,
  FileCode,
  File
} from 'lucide-react'

interface DataListItemProps {
  dataset: Dataset
}

const formatDate = (dateString?: string) => {
  if (!dateString) return 'N/A'
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return dateString
  }
}
const getFormatIcon = (format: string) => {
  const f = format.toLowerCase()

  let color = "text-gray-500"
  let label = format.toUpperCase()

  if (f.includes('json')) {
    color = "text-blue-600"
    label = "JSON"
  } 
  else if (f.includes('pdf')) {
    color = "text-red-600"
    label = "PDF"
  } 
  else if (f.includes('csv')) {
    color = "text-yellow-600"
    label = "CSV"
  } 
  else if (f.includes('xml')) {
    color = "text-green-600"
    label = "XML"
  }

  return (
    <div className="relative w-9 h-9 flex items-center justify-center">
      
      {/* File Icon */}
      <File className={`w-7 h-7 ${color}`} />

      {/* Label INSIDE */}
      <span className="absolute text-[8px] font-bold text-gray-700">
        {label}
      </span>

    </div>
  )
}
export default function DataListItem({ dataset }: DataListItemProps) {
console.log('Rendering DataListItem for dataset:', dataset)
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-6">

      {/* Title */}
      <h3 className="text-lg font-semibold text-blue-900 mb-2 hover:text-blue-700 cursor-pointer">
        {dataset.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
        {dataset.description}
      </p>

      {/* Meta Row */}
      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-4">
        
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-amber-600" />
          <span>Last Updated : <b>{formatDate(dataset.modified)}</b></span>
        </div>

        <div className="flex items-center gap-2">
          <DownloadIcon className="w-4 h-4 text-amber-600" />
          <span>Downloads : <b>{dataset.downloads ?? '500+'}</b></span>
        </div>

        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-amber-600" />
          <span>Geography : <b>{dataset.geographies ?? 'N/A'}</b></span>
        </div>

        <div className="flex items-center gap-2">
          <BarChart className="w-4 h-4 text-amber-600" />
          <span>With Charts</span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-wrap justify-between items-start gap-6">

        {/* LEFT */}
        <div className="flex flex-col gap-3">

          {/* Sectors */}
          {dataset.sectors?.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="font-medium">Sectors :</span>

              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 border">
                <Cloud className="w-4 h-4 text-amber-500" />
              </div>
            </div>
          )}

          {/* Tags */}
          {dataset.tags?.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-700 font-medium">Tags :</span>

              {dataset.tags.slice(0, 4).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-md text-xs font-medium bg-teal-100 text-teal-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-3 items-end">

          {/* Published */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Published by :</span>
            <div className="w-8 h-8 rounded-full bg-gray-200 border flex items-center justify-center">
              👤
            </div>
          </div>

          {/* Formats */}
         <div className="flex items-center gap-2">
  <span className="text-sm text-gray-600">Formats :</span>

  {dataset.formats?.map((format, idx) => (
    <div key={idx}>
      {getFormatIcon(format)}
    </div>
  ))}
</div>
        </div>

      </div>
    </div>
  )
}