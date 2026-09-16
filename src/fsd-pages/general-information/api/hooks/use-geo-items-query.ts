'use client'

import { useQuery } from '@tanstack/react-query'
import { getGeoItems } from '../api'

export const GEO_COUNTRIES_QUERY_KEY = ['geo', 'countries'] as const
export const GEO_REGIONS_QUERY_KEY = (countryId?: number) => ['geo', 'regions', countryId] as const
export const GEO_CITIES_QUERY_KEY = (countryId?: number, regionId?: number) =>
  ['geo', 'cities', countryId, regionId] as const

export const useCountriesQuery = () => {
  return useQuery({
    queryKey: GEO_COUNTRIES_QUERY_KEY,
    queryFn: () => getGeoItems(),
  })
}

export const useRegionsQuery = (countryId?: number) => {
  return useQuery({
    queryKey: GEO_REGIONS_QUERY_KEY(countryId),
    queryFn: () => getGeoItems(countryId),
    enabled: !!countryId,
  })
}

export const useCitiesQuery = (countryId?: number, regionId?: number) => {
  return useQuery({
    queryKey: GEO_CITIES_QUERY_KEY(countryId, regionId),
    queryFn: () => getGeoItems(countryId, regionId),
    enabled: !!countryId && !!regionId,
  })
}
