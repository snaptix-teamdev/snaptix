import type { PostOwner, PostWithOwner } from '@/entities/post/ui/Post.types'

export type { PostOwner }

export type PostsRequestDto = {
  pageSize?: number
}

export type LatestPost = PostWithOwner

export type LatestPostsResponseDto = {
  posts: LatestPost[]
}

export type RegisteredUsersCountResponseDto = {
  registeredUsersCount: number
}
