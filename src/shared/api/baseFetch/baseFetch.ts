export type ApiErrorItem = {
  status: number
  code: string
  field: string | null
  message: string
}

export type ApiError = {
  errors: ApiErrorItem[]
}

const AUTH_ENDPOINTS = ['/api/v1/auth/login', '/api/v1/auth/refresh-tokens']

const getAccessToken = (): string | null => {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/(?:^|;\s*)accessToken=([^;]*)/)
  return match ? decodeURIComponent(match[1]) : null
}

const updateAccessTokenCookie = (token: string) => {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
  document.cookie = `accessToken=${encodeURIComponent(token)}; path=/; max-age=86400; SameSite=Strict${secure}`
}

const clearAuthCookies = () => {
  document.cookie = 'accessToken=; path=/; max-age=0'
  document.cookie = 'isAuth=false; path=/; max-age=0'
}

const refreshAccessToken = async (): Promise<string | null> => {
  const res = await fetch('/api/v1/auth/refresh-tokens', {
    method: 'POST',
    credentials: 'include',
  })
  if (!res.ok) return null
  const data = await res.json()
  return data.accessToken ?? null
}

const buildHeaders = (token: string | null, extra?: HeadersInit): HeadersInit => ({
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
  ...(extra ?? {}),
})

export const baseFetch = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const isAuthEndpoint = AUTH_ENDPOINTS.some((e) => url.includes(e))
  const token = isAuthEndpoint ? null : getAccessToken()

  const makeRequest = (t: string | null) =>
    fetch(url, {
      credentials: 'include',
      ...options,
      headers: buildHeaders(t, options?.headers),
    })

  let res = await makeRequest(token)

  if (res.status === 401 && !isAuthEndpoint) {
    const newToken = await refreshAccessToken()

    if (newToken) {
      updateAccessTokenCookie(newToken)
      res = await makeRequest(newToken)
    } else {
      if (typeof window !== 'undefined') {
        clearAuthCookies()
        window.location.href = '/signIn'
      }
      throw { errors: [{ status: 401, code: 'UNAUTHORIZED', field: null, message: 'Session expired' }] } as ApiError
    }
  }

  // const isNoContent = res.status === 204
  // const data = isNoContent ? ({} as T) : await res.json()
  //
  // if (!res.ok) {
  //   throw data as ApiError
  // }
  // return data
  //

  let data: T | null = null

  const text = await res.text()

  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      // На случай, если в ответе не JSON, а просто строка
      data = text as unknown as T
    }
  }

  if (!res.ok) {
    // Если бэк прислал ошибку без тела, генерируем стандартную
    throw (data ?? { errors: [{ status: res.status, message: 'Unknown error' }] }) as ApiError
  }

  // Если тело пустое (например, 204), возвращаем пустой объект, приведенный к типу T
  return data ?? ({} as T)
}
