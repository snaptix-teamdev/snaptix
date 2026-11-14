import { useMutation } from '@tanstack/react-query'
import type { ApiError } from '@/shared/api/baseFetch/baseFetch'
import type { CreateNewPasswordRequest } from '../dto'
import { forgotPasswordApi } from '../api'

export const useCreateNewPasswordMutation = () => {
  return useMutation<Record<string, never>, ApiError, CreateNewPasswordRequest>({
    mutationFn: forgotPasswordApi.createNewPassword,
  })
}
