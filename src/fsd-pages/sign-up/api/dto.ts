import type { ApiError } from '@/shared/api/baseFetch/baseFetch'

export type SignUpRequestDto = {
  username: string
  email: string
  password: string
}

export type SignUpResponseDto = Record<string, never>

export type SignUpErrorDto = ApiError
