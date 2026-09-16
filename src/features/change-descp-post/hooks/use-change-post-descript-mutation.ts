'use client'

import { useMutation } from '@tanstack/react-query'
import { updatePostDescription } from '@/features/change-descp-post/api/api'

export const useChangePostDescriptMutation = () => {
  return useMutation({
    mutationFn: updatePostDescription,
    mutationKey: ['post', 'updatePostDescription'],
  })
}
