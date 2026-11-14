'use server'

import { revalidateTag } from 'next/cache'
import { postTag } from '@/entities/post/api'
import { HOME_POSTS_TAG } from '@/features/main-page-all-posts/api'

export async function revalidateEditedPostAction(postId: string) {
  revalidateTag(postTag(postId))
  revalidateTag(HOME_POSTS_TAG)
}
