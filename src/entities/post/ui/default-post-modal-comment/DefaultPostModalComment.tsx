import { useState } from 'react'
import Image, { type StaticImageData } from 'next/image'
import { HeartIcon, HeartRedIcon } from '@/shared/ui/svg/Icon'
import s from './DefaultPostModalComment.module.css'

type CommentProps = {
  authorUserName: string
  commentUserName: string
  commentText: string
  commentTime: string
  avatar: string | StaticImageData
  isPostDescription?: boolean
}

export const CommentItem = ({
  authorUserName,
  commentUserName,
  commentText,
  commentTime,
  avatar,
  isPostDescription = false,
}: CommentProps) => {
  const [isLikedByAuthor, setIsLikedByAuthor] = useState<boolean>(false)

  const isNotPostAuthor = commentUserName !== authorUserName

  // Показываем сердечко, только если это НЕ описание поста И автор комментария — чужой человек
  const showHeart = !isPostDescription && isNotPostAuthor

  const toggleLikeHandler = () => setIsLikedByAuthor((prev) => !prev)

  return (
    <section className={s.commentItem}>
      <Image src={avatar} alt={'user avatar'} width={36} height={36} className={s.avatar} />
      <div className={s.commentText}>
        <p>
          <strong>{commentUserName}:</strong> {commentText}
        </p>

        <div className={s.commentFooter}>
          <span className={s.commentTime}>{commentTime}</span>
          <button className={s.commentLike}>Like: 1</button>
          <button className={s.replyButton}>Answer</button>

          {showHeart && (
            <button
              type="button"
              className={`${s.heartButton} ${isLikedByAuthor ? s.liked : ''}`}
              onClick={toggleLikeHandler}
            >
              {isLikedByAuthor ? <HeartRedIcon /> : <HeartIcon />}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
