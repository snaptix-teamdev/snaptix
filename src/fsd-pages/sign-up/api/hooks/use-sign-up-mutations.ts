'use client'

import { useMutation } from '@tanstack/react-query'
import { signUp } from '@/fsd-pages/sign-up/api'
import type { SignUpErrorDto, SignUpRequestDto, SignUpResponseDto } from '@/fsd-pages/sign-up/api'

type Options = {
  onSuccess?: (data: SignUpResponseDto) => void
  onError?: (error: SignUpErrorDto) => void
}

export const useSignUpMutation = (options?: Options) => {
  return useMutation<SignUpResponseDto, SignUpErrorDto, SignUpRequestDto>({
    mutationFn: signUp,
    ...options,
  })
}
