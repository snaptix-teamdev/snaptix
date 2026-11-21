import { baseFetch } from '@/shared/api/baseFetch/baseFetch'

export const updatePostDescription = ({ postId, description }: { postId: string; description: string }) => {
  return baseFetch(`/api/v1/posts/${postId}`, {
    method: 'PATCH',
    body: JSON.stringify({ description }),
  })
}
