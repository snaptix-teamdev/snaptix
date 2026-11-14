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
  const isValidId = Boolean(countryId && !isNaN(countryId) && countryId !== 0)

  return useQuery({
    queryKey: GEO_REGIONS_QUERY_KEY(countryId),
    queryFn: () => getGeoItems(countryId),
    enabled: isValidId,
    placeholderData: isValidId ? undefined : { result: [] },
  })
}

export const useCitiesQuery = (countryId?: number, regionId?: number) => {
  const isValidCountry = Boolean(countryId && !isNaN(countryId) && countryId !== 0)
  const isValidRegion = Boolean(regionId && !isNaN(regionId) && regionId !== 0)
  const isEnabled = isValidCountry && isValidRegion

  return useQuery({
    queryKey: GEO_CITIES_QUERY_KEY(countryId, regionId),
    queryFn: () => getGeoItems(countryId, regionId),
    enabled: isEnabled,
    // Подставляем пустой массив в результат, если запрос заблокирован
    placeholderData: isEnabled ? undefined : { result: [] },
  })
}
