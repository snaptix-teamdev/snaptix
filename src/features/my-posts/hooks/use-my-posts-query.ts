'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { getMyPosts } from '../api/api'

export const useMyPostsQuery = (options?: { pageSize?: number }) => {
  return useInfiniteQuery({
    queryKey: ['posts', 'my'],
    queryFn: ({ pageParam }) =>
      getMyPosts({
        cursorId: pageParam,
        pageSize: options?.pageSize ?? 12,
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursorId,
    initialPageParam: undefined as string | undefined,

    // Опционально: не делать запрос, если пользователь не авторизован
    // Это можно контролировать через useAuth() на уровне компонента
  })
}
