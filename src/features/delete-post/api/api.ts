import { baseFetch } from '@/shared/api/baseFetch/baseFetch'

export const deleteMyPost = (postId: string) => {
  return baseFetch(`/api/v1/posts/${postId}`, {
    method: 'DELETE',
  })
}
