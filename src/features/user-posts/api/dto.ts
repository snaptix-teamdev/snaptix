import { z } from 'zod'

const mediaSchema = z.object({
  mediaId: z.string(),
  url: z.string(),
})

const ownerSchema = z.object({
  userId: z.string(),
  username: z.string(),
  avatar: z
    .string()
    .nullable()
    .optional()
    .transform((avatar) => avatar ?? null),
})

export const userPostsResponseSchema = z.object({
  posts: z.array(
    z.object({
      id: z.string(),
      description: z.string().nullable(),
      media: z.array(mediaSchema).default([]),
      owner: ownerSchema,
      updatedAt: z.string(),
      createdAt: z.string(),
    }),
  ),
  nextCursorId: z.string().nullable(),
})

export type GetUserPostsRequestDto = {
  userId: string
  cursorId?: string
  pageSize?: number
}
