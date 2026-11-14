import { baseFetch } from '@/shared/api/baseFetch/baseFetch'
import type { GetMeResponseDto } from './dto'

export const getMe = () => baseFetch<GetMeResponseDto>('/api/v1/auth/me', { method: 'GET' })

const getAccessToken = (): string | null => {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/(?:^|;\s*)accessToken=([^;]*)/)
  return match ? decodeURIComponent(match[1]) : null
}

/**
 * Guest-safe проверка авторизации для клиентского /me.
 * В отличие от baseFetch, на 401 НЕ редиректит на /signIn и не чистит куки —
 * просто возвращает null (гость). Это нужно, чтобы неавторизованный пользователь
 * мог спокойно просматривать публичный контент (UC-2).
 */
export const getMeOrNull = async (): Promise<GetMeResponseDto | null> => {
  const request = (token: string | null) =>
    fetch('/api/v1/auth/me', {
      method: 'GET',
      credentials: 'include',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })

  let res = await request(getAccessToken())

  // Тихо пробуем обновить токен один раз; гость просто получит null.
  if (res.status === 401) {
    const refresh = await fetch('/api/v1/auth/refresh-tokens', { method: 'POST', credentials: 'include' })
    if (!refresh.ok) return null
    const data = await refresh.json().catch(() => null)
    const accessToken = data?.accessToken ?? null
    if (!accessToken) return null
    res = await request(accessToken)
  }

  if (!res.ok) return null
  return (await res.json()) as GetMeResponseDto
}
