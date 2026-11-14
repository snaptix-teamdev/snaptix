'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteMyPost } from '@/features/delete-post/api/api'

export const useDeleteMyPostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postId: string) => deleteMyPost(postId),
    mutationKey: ['deletePost'],
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['posts', 'my'] }),
        queryClient.invalidateQueries({ queryKey: ['posts', 'user'] }),
      ])
    },
  })
}
