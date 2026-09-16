import { baseFetch } from '@/shared/api/baseFetch/baseFetch'
import type { GetActiveDevicesResponseDto } from './dto'

const SECURITY_DEVICES_URL = '/api/v1/security/devices'

export const getSecurityDevices = () => {
  return baseFetch<GetActiveDevicesResponseDto[]>(SECURITY_DEVICES_URL, { method: 'GET' })
}

export const terminateAllOtherSessions = () => {
  return baseFetch<Record<string, never>>(SECURITY_DEVICES_URL, { method: 'DELETE' })
}

export const terminateSessionByDeviceId = (deviceId: string) => {
  return baseFetch<Record<string, never>>(`${SECURITY_DEVICES_URL}/${deviceId}`, { method: 'DELETE' })
}
