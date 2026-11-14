import 'server-only'
import type { PostWithOwner } from '@/entities/post/ui/Post.types'

const BACKEND_URL = process.env.BACKEND_URL ?? 'https://snaptix.ru'
const REVALIDATE_SECONDS = 60

export const postTag = (postId: string) => `post-${postId}`

/**
 * Публичный (доступный всем) фетч одиночного поста для SSR.
 * Возвращает null, если пост не найден (404) — вызывающая сторона решает,
 * показать 404-страницу или пустую модалку.
 */
export const getPostByIdServer = async (postId: string): Promise<PostWithOwner | null> => {
  const res = await fetch(`${BACKEND_URL}/api/v1/posts/${postId}`, {
    headers: { Accept: 'application/json' },
    next: { revalidate: REVALIDATE_SECONDS, tags: [postTag(postId)] },
  })

  if (res.status === 404) return null
  if (!res.ok) {
    throw new Error(`Backend /api/v1/posts/${postId} failed: ${res.status}`)
  }

  return res.json() as Promise<PostWithOwner>
}
