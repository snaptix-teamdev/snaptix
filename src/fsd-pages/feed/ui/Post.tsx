import Image, { StaticImageData } from 'next/image'
import avatar2 from '@/public/png/flagRussia.png'
import { FavoriteIcon, HeartIcon, MessengerIcon, PaperPlaneIcon } from '@/shared/ui/svg/Icon'
import { Button } from '@/shared/ui/button/Button'
import s from './Post.module.css'

interface PostProps {
  post: {
    id: string
    author: {
      name: string
      avatar: StaticImageData | string
    }
    image: StaticImageData | string
    text: string
    createdAt: string
    likesCount: number
    commentsCount: number
  }
}

export const Post = ({ post }: PostProps) => {
  return (
    <div className={s.post}>
      <div className={s.postMedia}>
        <div className={s.nameAuthor}>
          <div className={s.postTitle}>
            <div className={s.avatarWrapper}>
              <Image src={post.author.avatar} alt="author avatar" width={36} height={36} />
            </div>
            <div className={s.nickName}>{post.author.name}</div>
            <div className={s.createdAt}>
              <div className={s.wrapperCreatedAt}>
                <div className={s.dot}>.</div>
                {post.createdAt}
              </div>
            </div>
          </div>
          <div className={s.moreActions}>
            <div className={s.dot}></div>
            <div className={s.dot}></div>
            <div className={s.dot}></div>
          </div>
        </div>

        <div className={s.postPhoto}>
          <Image src={post.image} alt="post content" width={490} height={504} priority />
        </div>

        <div className={s.postActions}>
          <div className={s.engagementBar}>
            <HeartIcon />
            <MessengerIcon />
            <PaperPlaneIcon />
          </div>
          <FavoriteIcon />
        </div>
      </div>

      <div className={s.postTextWrapper}>
        <Image src={post.author.avatar} alt="author avatar" width={36} height={36} />
        <div>
          <span className={s.postTextName}>{post.author.name}</span>
          <span className={s.postText}>{post.text}</span>
        </div>
      </div>

      <div className={s.postFooter}>
        <div className={s.likesWrapper}>
          <div className={s.iconsWrapper}>
            <Image className={s.stackedImage} src={post.image} alt="avatar 1" width={24} height={24} />
            <Image className={s.stackedImage} src={post.author.avatar} alt="avatar 2" width={24} height={24} />
            <Image className={s.stackedImage} src={avatar2} alt="avatar 3" width={24} height={24} />
          </div>
          <div>
            {post.likesCount.toLocaleString()} <span className={s.likesCount}>&quot;Like&quot;</span>
          </div>
        </div>
        <div className={s.allComments}>View All Comments ({post.commentsCount})</div>
      </div>

      <div className={s.addComment}>
        <div className={s.commentInputPlaceholder}>Add a Comment...</div>
        <Button variant="ghost" width="auto">
          Publish
        </Button>
      </div>
    </div>
  )
}
