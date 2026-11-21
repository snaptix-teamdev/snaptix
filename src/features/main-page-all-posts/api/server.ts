import 'server-only'
import type { LatestPostsResponseDto, RegisteredUsersCountResponseDto } from './dto'

const BACKEND_URL = process.env.BACKEND_URL ?? 'https://snaptix.ru'

export const HOME_POSTS_TAG = 'home-posts'
export const REGISTERED_USERS_COUNT_TAG = 'registered-users-count'

const REVALIDATE_SECONDS = 10 * 60 // 10 минут

const fetchJson = async <T>(path: string, tag: string): Promise<T> => {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    headers: { Accept: 'application/json' },
    next: { revalidate: REVALIDATE_SECONDS, tags: [tag] },
  })
  if (!res.ok) {
    throw new Error(`Backend ${path} failed: ${res.status}`)
  }
  return res.json() as Promise<T>
}

export const getLatestPostsServer = (pageSize = 4) =>
  fetchJson<LatestPostsResponseDto>(`/api/v1/home/latest-posts?pageSize=${pageSize}`, HOME_POSTS_TAG)

export const getRegisteredUsersCountServer = () =>
  fetchJson<RegisteredUsersCountResponseDto>('/api/v1/home/registered-users-count', REGISTERED_USERS_COUNT_TAG)
