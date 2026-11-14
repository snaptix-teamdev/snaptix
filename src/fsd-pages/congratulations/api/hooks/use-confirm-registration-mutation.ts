'use client'

import { useMutation } from '@tanstack/react-query'
import { confirmRegistration } from '@/fsd-pages/congratulations/api'
import type {
  ConfirmRegistrationErrorDto,
  ConfirmRegistrationRequestDto,
  ConfirmRegistrationResponseDto,
} from '@/fsd-pages/congratulations/api'
import { revalidateHomeRegisteredUsersAction } from '@/features/main-page-all-posts/api/revalidate'

type Options = {
  onSuccess?: (data: ConfirmRegistrationResponseDto) => void
  onError?: (error: ConfirmRegistrationErrorDto) => void
}

export const useConfirmRegistrationMutation = (options?: Options) => {
  return useMutation<ConfirmRegistrationResponseDto, ConfirmRegistrationErrorDto, ConfirmRegistrationRequestDto>({
    mutationFn: async (data) => {
      const res = await confirmRegistration(data)
      await revalidateHomeRegisteredUsersAction()
      return res
    },
    ...options,
  })
}
