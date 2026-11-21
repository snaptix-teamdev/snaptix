'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { getUserPosts } from '../api/api'

export const useUserPostsQuery = (userId: string, pageSize = 12) => {
  return useInfiniteQuery({
    queryKey: ['posts', 'user', userId],
    queryFn: ({ pageParam }) => getUserPosts({ userId, cursorId: pageParam, pageSize }),
    getNextPageParam: (lastPage) => lastPage.nextCursorId,
    initialPageParam: undefined as string | undefined,
    enabled: Boolean(userId),
  })
}
