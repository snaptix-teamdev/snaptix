'use server'
import { cookies } from 'next/headers'

const COOKIE_OPTIONS = {
  httpOnly: false,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: 86400,
  sameSite: 'strict' as const,
}

export async function setAuthAction(accessToken: string) {
  const cookieStore = await cookies()
  cookieStore.set('accessToken', accessToken, COOKIE_OPTIONS)
  cookieStore.set('isAuth', 'true', COOKIE_OPTIONS)
}

export async function clearAuthAction() {
  const cookieStore = await cookies()
  cookieStore.delete('accessToken')
  cookieStore.set('isAuth', 'false', { path: '/', maxAge: 0 })
}
