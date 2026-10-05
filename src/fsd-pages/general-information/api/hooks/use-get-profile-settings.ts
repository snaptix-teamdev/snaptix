'use client'

import { useQuery } from '@tanstack/react-query'
import { getProfileSettings } from '@/fsd-pages/general-information/api'

export const USER_PROFILE_QUERY_KEY = ['user', 'profile'] as const

export const useGetProfileSettingsQuery = () => {
  return useQuery({
    queryKey: USER_PROFILE_QUERY_KEY,
    queryFn: getProfileSettings,
  })
}
