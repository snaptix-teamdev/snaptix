'use client'

import { useMutation, useQueryClient, type InfiniteData } from '@tanstack/react-query'
import { updatePostDescription } from '@/features/change-descp-post/api/api'
import type { Post } from '@/entities/post/ui/Post.types'

type PostsPage = {
  posts: Post[]
  nextCursorId: string | null
}

export const useChangePostDescriptMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updatePostDescription,
    mutationKey: ['post', 'updatePostDescription'],
    onSuccess: (_result, { postId, description }) => {
      const updatePost = (data: InfiniteData<PostsPage> | undefined) => {
        if (!data) return data

        return {
          ...data,
          pages: data.pages.map((page) => ({
            ...page,
            posts: page.posts.map((post) => (post.id === postId ? { ...post, description } : post)),
          })),
        }
      }

      queryClient.setQueriesData<InfiniteData<PostsPage>>({ queryKey: ['posts', 'user'] }, updatePost)
      queryClient.setQueriesData<InfiniteData<PostsPage>>({ queryKey: ['posts', 'my'] }, updatePost)
      void queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
}
