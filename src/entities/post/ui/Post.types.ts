import type { ReactNode } from 'react'

export type Media = {
  mediaId: string
  url: string
}

export type Post = {
  id: string
  description: string | null
  media: Media[]
  updatedAt: string
  createdAt: string
}

export type PostOwner = {
  userId: string
  username: string
  avatar: string | null
}

export type PostWithOwner = Post & {
  owner: PostOwner
}

export type PostLayoutProps = {
  images: Media[]
  children: ReactNode
  variant: 'small' | 'large' // small для ленты постов на главной странице, large для модалки редактирования и самого поста
}
