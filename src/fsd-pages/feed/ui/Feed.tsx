'use client'

import s from './Feed.module.css'
import avatar from '@/public/png/userAvatar.png'
import defaultPhoto from '@/public/img/defaultPhoto.jpg'
import { Post } from './Post'

const mockPosts = [
  {
    id: '1',
    author: { name: 'Alex designer', avatar: avatar },
    image: defaultPhoto,
    text: 'Сегодня исследовал новые тропы в горах. Вид просто потрясающий! 🏔️ #nature #adventure',
    createdAt: '2 часа назад',
    likesCount: 1240,
    commentsCount: 48,
  },
  {
    id: '2',
    author: { name: 'Tech enthusiast', avatar: avatar },
    image: defaultPhoto,
    text: 'Моё новое рабочее место готово. Минимализм и продуктивность. Как вам сетап? 💻✨',
    createdAt: '5 часов назад',
    likesCount: 856,
    commentsCount: 12,
  },
]

export const Feed = () => {
  return (
    <section className={s.container}>
      {mockPosts.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </section>
  )
}
