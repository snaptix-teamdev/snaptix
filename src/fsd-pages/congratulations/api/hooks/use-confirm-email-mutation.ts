'use client'

import { useMutation } from '@tanstack/react-query'
import { confirmEmailAction, type ConfirmEmailResult } from '@/app/actions/confirm-email'

type Options = {
  onSuccess?: (data: ConfirmEmailResult) => void
  onError?: (error: string) => void
}

export const useConfirmEmailMutation = (options?: Options) => {
  return useMutation<ConfirmEmailResult, string, { confirmationCode: string }>({
    mutationFn: async (data) => {
      const result = await confirmEmailAction(data)

      if (!result.success && result.error) {
        throw result.error
      }

      return result
    },
    onError: (error) => {
      options?.onError?.(error)
    },
    onSuccess: (data) => {
      options?.onSuccess?.(data)
    },
  })
}
