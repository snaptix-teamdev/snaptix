'use client'

import { useQuery } from '@tanstack/react-query'
import { getMe } from '../api'

export const useMeQuery = () => {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: getMe,
    staleTime: 5 * 60 * 1000,
  })
}
