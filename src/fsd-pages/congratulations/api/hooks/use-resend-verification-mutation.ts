'use client'

import { useMutation } from '@tanstack/react-query'
import { resendVerificationAction, type ResendVerificationResult } from '@/app/actions/resend-verification'

type Options = {
  onSuccess?: (data: ResendVerificationResult) => void
  onError?: (error: string) => void
}

export const useResendVerificationMutation = (options?: Options) => {
  return useMutation<ResendVerificationResult, string, { email: string }>({
    mutationFn: async (data) => {
      const result = await resendVerificationAction(data)
      if (!result.success) {
        throw result.error || 'Failed to resend verification link'
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
