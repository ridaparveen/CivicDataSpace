'use client'

import { useState, useRef, useEffect } from "react"
import { Dataset } from '@/hooks/useDatasets'
import { CalendarIcon, DownloadIcon, Globe, Cloud, BarChart3 } from 'lucide-react'

interface DataCardProps {
  dataset: Dataset
}

const formatDate = (dateString?: string) => {
  if (!dateString) return 'N/A'
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return dateString
  }
}

export default function DataCard({ dataset }: DataCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)
  const textRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const el = textRef.current
    if (el) {
      setIsTruncated(el.scrollHeight > el.clientHeight)
    }
  }, [dataset.description])

  return (
    <div className="bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-shadow p-6 max-w-sm flex flex-col h-full">

      {/* Top Content */}
      <div className="flex flex-col flex-grow">

        {/* Title */}
        <h3 className="text-base font-semibold text-blue-900 mb-4 line-clamp-2">
          {dataset.title}
        </h3>

        {/* Meta Info */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4 text-amber-600" />
            <span>{formatDate(dataset.created)}</span>
          </div>

          <div className="flex items-center gap-1">
            <DownloadIcon className="w-4 h-4 text-amber-600" />
            <span>
              {dataset.download_count !== undefined
                ? `${dataset.download_count}+`
                : "N/A"}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Globe className="w-4 h-4 text-amber-600" />
            <span>
              {dataset.geographies?.[0] ?? "N/A"}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-4 pt-4 border-t border-gray-100 leading-relaxed">
          <span
            ref={textRef}
            className={`transition-all duration-300 ${expanded ? "" : "line-clamp-3"}`}
          >
            {dataset.description}
          </span>

          {isTruncated && (
            <span
              onClick={() => setExpanded(!expanded)}
              className="text-blue-600 cursor-pointer ml-1 hover:underline"
            >
              {expanded ? "See Less" : "See More"}
            </span>
          )}
        </p>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between pt-4 mt-auto">

        {/* Feature Icons */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
            <Cloud className="w-4 h-4 text-blue-500" />
          </div>

          <div className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
            <BarChart3 className="w-4 h-4 text-yellow-500" />
          </div>
        </div>

        {/* Published By */}
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <span className="text-gray-500">Published by</span>
          <div className="w-8 h-8 rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center">
            👤
          </div>
        </div>

      </div>
    </div>
  )
}