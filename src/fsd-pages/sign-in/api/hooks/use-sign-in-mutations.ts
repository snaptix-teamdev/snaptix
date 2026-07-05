'use client'

import { useMutation } from '@tanstack/react-query'
import { type LoginRequestDto, type LoginResponseDto, signIn } from '@/fsd-pages/sign-in/api'
import type { LoginErrorDto } from '@/fsd-pages/sign-in/api/dto'

type Options = {
  onSuccess: (data: LoginResponseDto) => void
  onError?: (error: LoginErrorDto) => void
}

export const useSignInMutation = (options?: Options) => {
  return useMutation<LoginResponseDto, LoginErrorDto, LoginRequestDto>({
    mutationFn: signIn,
    ...options,
  })
}
