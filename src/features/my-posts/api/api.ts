import { baseFetch } from '@/shared/api/baseFetch/baseFetch'
import type { GetMyPostsRequestDto, GetMyPostsResponseDto } from './dto'

export const getMyPosts = ({ cursorId, pageSize = 12 }: GetMyPostsRequestDto) => {
  // Формируем URL с query-параметрами
  const params = new URLSearchParams()
  if (pageSize) params.set('pageSize', String(pageSize))
  if (cursorId) params.set('cursorId', cursorId)

  const url = `/api/v1/users/me/posts?${params.toString()}`
  return baseFetch<GetMyPostsResponseDto>(url, { method: 'GET' })
}
