import { baseFetch } from '@/shared/api/baseFetch/baseFetch'
import type { GetActiveDevicesResponseDto, GetGeoResponseDto } from './dto'

const SECURITY_DEVICES_URL = '/api/v1/security/devices'
const GEO_ITEMS_URL = '/api/v1/geo'

export const getSecurityDevices = () => {
  return baseFetch<GetActiveDevicesResponseDto[]>(SECURITY_DEVICES_URL, { method: 'GET' })
}

export const terminateAllOtherSessions = () => {
  return baseFetch<Record<string, never>>(SECURITY_DEVICES_URL, { method: 'DELETE' })
}

export const terminateSessionByDeviceId = (deviceId: string) => {
  return baseFetch<Record<string, never>>(`${SECURITY_DEVICES_URL}/${deviceId}`, { method: 'DELETE' })
}

export const getGeoItems = (countryId?: number, regionId?: number) => {
  const params = new URLSearchParams()

  if (countryId) params.append('countryId', countryId.toString())
  if (regionId) params.append('regionId', regionId.toString())

  const queryString = params.toString() ? `?${params.toString()}` : ''

  return baseFetch<GetGeoResponseDto>(`${GEO_ITEMS_URL}${queryString}`, { method: 'GET' })
}
