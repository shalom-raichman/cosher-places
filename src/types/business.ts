export interface Business {
  name: string
  address: string
  city: string
  type: string
  activity: string
  provider: string
}

export interface Filters {
  city: string
  type: string
  activity: string
  search: string
  provider: string
  region?: string
  category?: string
}

export interface FilterOptions {
  cities: string[]
  types: string[]
  activities: string[]
  providers: string[]
  regions?: string[]
}
