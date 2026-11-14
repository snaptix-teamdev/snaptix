import type { Post } from '@/entities/post/ui/Post.types'

export type GetMyPostsResponseDto = {
  posts: Post[]
  nextCursorId: string | null
}

export type GetMyPostsRequestDto = {
  cursorId?: string
  pageSize?: number
}
