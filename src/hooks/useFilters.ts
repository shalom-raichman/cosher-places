import { useMemo, useState } from 'react'
import type { Business, FilterOptions, Filters } from '../types/business'
import { inferRegion } from '../utils/regions'

export function useFilters(businesses: Business[]) {
  const [filters, setFilters] = useState<Filters>({
    city: '',
    type: '',
    activity: '',
    search: '',
    provider: '',
    region: '',
    category: '',
  })

  const filterOptions: FilterOptions = useMemo(() => {
    const cities = [...new Set(businesses.map((b) => b.city).filter(Boolean))].sort()
    const types = [...new Set(businesses.map((b) => b.type).filter(Boolean))].sort()
    const activities = [
      ...new Set(businesses.map((b) => b.activity).filter(Boolean)),
    ].sort()
    const providers = [
      ...new Set(businesses.map((b) => b.provider).filter(Boolean)),
    ].sort()
    return { cities, types, activities, providers }
  }, [businesses])

  const filteredBusinesses: Business[] = useMemo(() => {
    return businesses.filter((business) => {
      const matchesCity = !filters.city || business.city === filters.city
      const matchesType = !filters.type || business.type === filters.type
      const matchesActivity =
        !filters.activity || business.activity.includes(filters.activity)
      const matchesProvider = !filters.provider || business.provider === filters.provider
      const matchesRegion =
        !filters.region || inferRegion(business.city) === filters.region
      const matchesCategory =
        !filters.category || business.activity.includes(filters.category)
      const matchesSearch =
        !filters.search ||
        business.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        business.address.toLowerCase().includes(filters.search.toLowerCase())

      return (
        matchesCity &&
        matchesType &&
        matchesActivity &&
        matchesProvider &&
        matchesRegion &&
        matchesCategory &&
        matchesSearch
      )
    })
  }, [businesses, filters])

  const updateFilter = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      city: '',
      type: '',
      activity: '',
      search: '',
      provider: '',
      region: '',
      category: '',
    })
  }

  return {
    filters,
    filterOptions,
    filteredBusinesses,
    updateFilter,
    clearFilters,
  } as const
}
