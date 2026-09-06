'use client'

import { useQuery } from '@tanstack/react-query'
import { getSecurityDevices } from '../api'

export const SECURITY_DEVICES_QUERY_KEY = ['security', 'devices'] as const

export const useSecurityDevicesQuery = () => {
  return useQuery({
    queryKey: SECURITY_DEVICES_QUERY_KEY,
    queryFn: getSecurityDevices,
  })
}
