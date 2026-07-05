'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import Image from 'next/image'
import s from './SmallPost.module.css'
import { getPostCreatedTime } from '@/shared/utils/getPostCreatedTime'
import defaultAvatar from '@/public/png/userAvatar.png'
import { PostLayout } from '@/entities/post/ui/PostLayout'
import type { LatestPost } from '@/features/main-page-all-posts/api'

export type SmallPostProps = LatestPost

export const SmallPost = ({ id, media, owner, description, createdAt }: SmallPostProps) => {
  const router = useRouter()
  const [isOpenedText, setIsOpenedText] = useState<boolean>(false)

  const isLongText = description ? description.length > 100 : false
  const userAvatar = owner.avatar ? owner.avatar : defaultAvatar

  const openPost = () => router.push(`/profile/${owner.userId}?postId=${id}`)

  const toggleText = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpenedText((prev) => !prev)
  }

  return (
    <div
      className={s.cardLink}
      role="link"
      tabIndex={0}
      onClick={openPost}
      onKeyDown={(e) => {
        if (e.key === 'Enter') openPost()
      }}
    >
      <PostLayout images={media} variant={'small'}>
        <article className={s.smallCardWrapper}>
          <section className={s.author}>
            <Image src={userAvatar} alt={'user avatar'} width={36} height={36} className={s.avatar} />
            <h3>{owner.username}</h3>
          </section>
          <time className={s.time}>{getPostCreatedTime(createdAt)}</time>
          <section className={s.description}>
            <div className={`${s.text} ${!isOpenedText ? s.collapsed : ''}`}>{description}</div>
            {isLongText && (
              <span className={s.click} onClick={toggleText}>
                {isOpenedText ? 'Hide' : 'Show more'}
              </span>
            )}
          </section>
        </article>
      </PostLayout>
    </div>
  )
}
