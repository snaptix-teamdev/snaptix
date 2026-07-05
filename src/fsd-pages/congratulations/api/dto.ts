import type { ApiError } from '@/shared/api/baseFetch/baseFetch'

export type ConfirmRegistrationRequestDto = {
  code: string
}

export type ConfirmRegistrationResponseDto = Record<string, never>

export type ConfirmRegistrationErrorDto = ApiError

export type ResendVerificationRequestDto = {
  email: string
}

export type ResendVerificationResponseDto = Record<string, never>
