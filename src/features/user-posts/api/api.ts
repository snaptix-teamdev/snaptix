import { userPostsResponseSchema, type GetUserPostsRequestDto } from './dto'

export const getUserPosts = async ({ userId, cursorId, pageSize = 12 }: GetUserPostsRequestDto) => {
  const params = new URLSearchParams({ pageSize: String(pageSize) })
  if (cursorId) params.set('cursorId', cursorId)

  const response = await fetch(`/api/v1/users/${encodeURIComponent(userId)}/posts?${params.toString()}`, {
    // Гостевой запрос не зависит от состояния или срока действия сессии.
    credentials: 'omit',
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`Failed to load user posts: ${response.status}`)
  }

  const data: unknown = await response.json()
  return userPostsResponseSchema.parse(data)
}
