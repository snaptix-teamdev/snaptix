'use server'

import { revalidateTag } from 'next/cache'
import { HOME_POSTS_TAG, REGISTERED_USERS_COUNT_TAG } from './server'

export async function revalidateHomePostsAction() {
  revalidateTag(HOME_POSTS_TAG)
}

export async function revalidateHomeRegisteredUsersAction() {
  revalidateTag(REGISTERED_USERS_COUNT_TAG)
}
