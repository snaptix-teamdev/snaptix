import type { ApiError } from '@/shared/api/baseFetch/baseFetch'

export type LoginRequestDto = {
  email: string
  password: string
}

export type LoginResponseDto = {
  accessToken: string
}

export type LoginErrorDto = ApiError
