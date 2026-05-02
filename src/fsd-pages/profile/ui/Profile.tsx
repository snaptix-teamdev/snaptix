'use client'
import { useRouter } from 'next/navigation'
import s from './Profile.module.css'
import Image from 'next/image'
import defaultPhoto from '@/public/img/defaultPhoto.jpg'
import { Button } from '@/shared/ui/button/Button'
import { useAuth } from '@/shared/hooks/useAuth'
import { PaidAccountIcon } from '@/shared/ui/svg/Icon'
import { useState } from 'react'
import Card from '@/shared/ui/card/Card'
import ava from '@/public/img/defaultPhoto.jpg'

//followers Mock
export interface Avatar {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
}
export interface Subscriber {
  id: number
  userId: number
  userName: string
  createdAt: string
  avatars: Avatar[]
  isFollowing: boolean
  isFollowedBy: boolean
}
export interface SubscribersResponse {
  totalCount: number
  pagesCount: number
  page: number
  pageSize: number
  prevCursor: number
  nextCursor: number
  items: Subscriber[] // ← массив, а не объект
}
export const users: SubscribersResponse = {
  totalCount: 10,
  pagesCount: 1,
  page: 1,
  pageSize: 10,
  prevCursor: 0,
  nextCursor: 0,
  items: [
    {
      id: 1,
      userId: 1001,
      userName: 'Алексей',
      createdAt: '2024-02-15T10:30:00.000Z',
      avatars: [
        {
          url: 'https://randomuser.me/api/portraits/men/1.jpg',
          width: 300,
          height: 300,
          fileSize: 25000,
          createdAt: '2024-01-10T08:00:00.000Z',
        },
      ],
      isFollowing: false,
      isFollowedBy: true,
    },
  ],
}
const createMockFollowers = (baseUsers: SubscribersResponse): SubscribersResponse => {
  const newItems = [...baseUsers.items]
  for (let i = 0; i <= 8; i++) {
    newItems.push({
      ...baseUsers.items[0],
      id: i,
      userId: 1000 + i,
      userName: `${baseUsers.items[0].userName}_${i}`,
    })
  }

  return {
    ...baseUsers,
    totalCount: 10,
    items: newItems,
  }
}

export const Profile = () => {
  const router = useRouter()
  //const currentUserId = 123 // Заменить на реальное получение ID текущего пользователя

  const { isAuth } = useAuth() //авторизован или нет
  const paidAccount = true // платный акк или нет
  // eslint-disable-next-line
  const [followers, setFollowers] = useState(createMockFollowers(users))
  const [isCardOpen, setIsCardOpen] = useState(false)

  const handleFollowersClick = () => {
    setIsCardOpen(true)
  }
  const handleCloseCard = () => {
    setIsCardOpen(false)
  }

  const onClickHandel = () => {
    router.push('/settings')
  }

  return (
    <div className={s.wrapper}>
      <div className={s.userInfoWrapper}>
        <Image src={defaultPhoto} alt="User avatar" width={204} height={204} className={s.userPhoto} />
        <div className={s.userInfo}>
          <div className={s.userNameWrapper}>
            <div className={s.paidAccountWrapper}>
              <span>UserName</span>
              {paidAccount && isAuth && <PaidAccountIcon />}
            </div>
            {isAuth && (
              <Button variant={'secondary'} width={'auto'} onClick={onClickHandel}>
                Profile Settings
              </Button>
            )}
          </div>

          <div className={s.subscriptionsWrapper}>
            <div className={s.subscriptions}>
              <span className={s.quantity}>2 218</span>
              <span className={s.followers}>Following</span>
            </div>
            <div className={s.subscriptions}>
              <span onClick={handleFollowersClick} className={s.quantity}>
                {followers.totalCount}
              </span>
              <span className={s.followers} onClick={handleFollowersClick}>
                Followers
              </span>
            </div>
            <div className={s.subscriptions}>
              <span className={s.quantity}>2 218</span>
              <span className={s.followers}>Publications</span>
            </div>
          </div>
          <div className={s.aboutUser}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
      <div className={s.posts}>
        <Image src={defaultPhoto} alt="User avatar" width={234} height={228} />
        <Image src={defaultPhoto} alt="User avatar" width={234} height={228} />
        <Image src={defaultPhoto} alt="User avatar" width={234} height={228} />
        <Image src={defaultPhoto} alt="User avatar" width={234} height={228} />
        <Image src={defaultPhoto} alt="User avatar" width={234} height={228} />
        <Image src={defaultPhoto} alt="User avatar" width={234} height={228} />
        <Image src={defaultPhoto} alt="User avatar" width={234} height={228} />
        <Image src={defaultPhoto} alt="User avatar" width={234} height={228} />
      </div>
      <Card isOpen={isCardOpen} onClose={handleCloseCard} title="Followers" width="644px" height="654px">
        {/* Здесь позже добавим список подписчиков */}
        <div className={s.container}>
          <input className={s.search} placeholder=" Search" />
          <div className={s.followersListWrapper}>
            <ul>
              {followers.items.map((f: Subscriber, index) => {
                return (
                  <li key={index}>
                    <div className={s.followersList}>
                      <div className={s.imgNameFollowerWrapper}>
                        <Image src={ava} alt={''} width={36} height={36} className={s.imgFollower} />
                        <span>{f.userName}</span>
                      </div>
                      <div className={s.buttonFollowerWrapper}>
                        <Button variant="primary" width="auto">
                          Follow
                        </Button>
                        <Button variant="secondary" width="auto">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}
