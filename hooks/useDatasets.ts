import { useState, useEffect } from 'react'

export interface Dataset {
  id: string
  title: string
  description: string
  last_updated?: string
  downloads?: number
  geography?: string
  tags?: string[]
  sectors?: string[]
  formats?: string[]
  published_by?: string
  organization?: string
  created?: string
  download_count?:string
  geographies?: string[]
  modified?: string
}

export interface Aggregations {
  [key: string]: Array<{
    key: string
    doc_count: number
  }>
}

interface UseDatasetParams {
  query?: string
  page?: number
  size?: number
  sort?: string
  filters?: {
    sectors?: string[]
    geographies?: string[]
    tags?: string[]
    formats?: string[]
    timePeriod?: string[]
  }
}

export function useDatasets({
  query = '',
  page = 1,
  size = 9,
  sort = 'recent',
  filters = {},
}: UseDatasetParams) {
  const [datasets, setDatasets] = useState<Dataset[]>([])
  const [total, setTotal] = useState(0)
  const [aggregations, setAggregations] = useState<Aggregations>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDatasets = async () => {
      setLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams()
        
        if (query) params.append('query', query)
        params.append('page', page.toString())
        params.append('size', size.toString())
        params.append('sort', sort)

        // Add filters
        if (filters.sectors && filters.sectors.length > 0) {
          params.append('sectors', filters.sectors.join(','))
        }
        if (filters.geographies && filters.geographies.length > 0) {
          params.append('Geography', filters.geographies.join(','))
        }
        if (filters.tags && filters.tags.length > 0) {
          params.append('tags', filters.tags.join(','))
        }
        if (filters.formats && filters.formats.length > 0) {
          params.append('formats', filters.formats.join(','))
        }

        const url = `https://api.datakeep.civicdays.in/api/search/dataset/?${params.toString()}`
        
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Failed to fetch datasets')
        }

        const data = await response.json()
        setDatasets(data.results || [])
        setTotal(data.total || 0)
        setAggregations(data.aggregations || {})
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setDatasets([])
      } finally {
        setLoading(false)
      }
    }

    fetchDatasets()
  }, [query, page, size, sort, filters])

  return { datasets, total, aggregations, loading, error }
}
