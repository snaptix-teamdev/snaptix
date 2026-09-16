'use client'

import { useQuery } from '@tanstack/react-query'
import { getMeOrNull } from '../api'

/**
 * Клиентская проверка авторизации через /me (UC-2: авторизацию проверяем на клиенте).
 * isLoading — пока нет ответа /me, показываем skeleton в header/sidebar.
 */
export const useAuthStatus = () => {
  const query = useQuery({
    queryKey: ['auth', 'status'],
    queryFn: getMeOrNull,
    staleTime: 5 * 60 * 1000,
  })

  return {
    user: query.data ?? null,
    isAuth: !!query.data,
    isLoading: query.isLoading,
  }
}
