'use client'

import { useMutation } from '@tanstack/react-query'
import { resendVerificationLink } from '@/fsd-pages/congratulations/api'
import type {
  ConfirmRegistrationErrorDto,
  ResendVerificationRequestDto,
  ResendVerificationResponseDto,
} from '@/fsd-pages/congratulations/api'

type Options = {
  onSuccess?: (data: ResendVerificationResponseDto) => void
  onError?: (error: ConfirmRegistrationErrorDto) => void
}

export const useResendVerificationMutation = (options?: Options) => {
  return useMutation<ResendVerificationResponseDto, ConfirmRegistrationErrorDto, ResendVerificationRequestDto>({
    mutationFn: resendVerificationLink,
    ...options,
  })
}
