'use client'

import { useRouter } from 'next/navigation'
import s from './Profile.module.css'
import Image from 'next/image'
import defaultPhoto from '@/public/img/defaultPhoto.jpg'
import { Button } from '@/shared/ui/button/Button'
import { useAuthStatus } from '@/shared/api/auth'
import { PaidAccountIcon } from '@/shared/ui/svg/Icon'
import { useState, useEffect, useRef } from 'react'
import Card from '@/shared/ui/card/Card'
import ava from '@/public/img/defaultPhoto.jpg'
import { useUserPostsQuery } from '@/features/user-posts'
import { DefaultPostModal } from '@/entities/post/ui/default-post/DefaultPostModal'
import type { PostWithOwner } from '@/entities/post/ui/Post.types'
import { useTranslations } from '@/shared/lib/i18n/TranslationsProvider'
import { useGetProfileSettingsQuery } from '@/fsd-pages/general-information/api/hooks/use-get-profile-settings'

// ==================== TYPES FOR FOLLOWERS ====================
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
  items: Subscriber[]
}

// ==================== MOCK DATA FOR FOLLOWERS ====================
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
  return { ...baseUsers, totalCount: 10, items: newItems }
}

export const Profile = ({ userId }: { userId: string }) => {
  const router = useRouter()
  const { user: currentUser } = useAuthStatus()
  const isOwner = currentUser?.id === userId
  const dict = useTranslations()
  const { data: profileSettings } = useGetProfileSettingsQuery(isOwner)

  const [activePost, setActivePost] = useState<PostWithOwner | null>(null)

  // Публичный запрос использует ID из маршрута и доступен без сессии.
  const {
    data: postsData,
    fetchNextPage,
    hasNextPage,
    isLoading: postsLoading,
    isError: postsError,
    isFetchingNextPage,
  } = useUserPostsQuery(userId, 12)

  // 🔥 Ref для элемента-триггера (сентинела)
  const sentinelRef = useRef<HTMLDivElement>(null)

  // 🔥 Intersection Observer для бесконечного скролла
  useEffect(() => {
    // Не создаём наблюдатель, если грузить нечего или уже грузим
    if (!hasNextPage || isFetchingNextPage || postsLoading) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        // Если сентинел появился в зоне видимости — грузим следующую страницу
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      {
        root: null, // наблюдаем относительно вьюпорта
        rootMargin: '100px', // сработает за 100px до появления элемента
        threshold: 0.1, // достаточно, чтобы 10% элемента было видно
      },
    )

    const currentRef = sentinelRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    // Cleanup: отписываемся при размонтировании или изменении зависимостей
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
      observer.disconnect()
    }
  }, [hasNextPage, isFetchingNextPage, postsLoading, fetchNextPage])

  const paidAccount = true
  const [followers] = useState(createMockFollowers(users))
  const [isCardOpen, setIsCardOpen] = useState(false)

  const allPosts = postsData?.pages.flatMap((page) => page.posts) || []
  const profileOwner = allPosts[0]?.owner
  const profileName =
    (isOwner ? currentUser?.username : null) ?? profileOwner?.username ?? (postsLoading ? '...' : userId)
  const profileAvatar = (isOwner ? profileSettings?.avatarUrl : null) ?? profileOwner?.avatar ?? defaultPhoto

  const handleFollowersClick = () => setIsCardOpen(true)
  const handleCloseCard = () => setIsCardOpen(false)
  const onClickHandel = () => router.push('/settings')

  return (
    <div className={s.wrapper}>
      {/* ==================== HEADER ПРОФИЛЯ ==================== */}
      <div className={s.userInfoWrapper}>
        {/* Аватар профиля */}
        <Image src={profileAvatar} alt={profileName} width={204} height={204} className={s.userPhoto} priority />

        <div className={s.userInfo}>
          <div className={s.userNameWrapper}>
            <div className={s.paidAccountWrapper}>
              <span>{profileName}</span>
              {paidAccount && isOwner && <PaidAccountIcon />}
            </div>
            {isOwner && (
              <Button variant="secondary" width="auto" onClick={onClickHandel}>
                {dict.profile.profileSettings}
              </Button>
            )}
          </div>

          {/* ==================== СТАТИСТИКА ==================== */}
          <div className={s.subscriptionsWrapper}>
            <div className={s.subscriptions}>
              <span className={s.quantity}>2 218</span>
              <span className={s.followers}>{dict.profile.following}</span>
            </div>
            <div className={s.subscriptions}>
              <span onClick={handleFollowersClick} className={s.quantity}>
                {followers.totalCount}
              </span>
              <span className={s.followers} onClick={handleFollowersClick}>
                {dict.profile.followers}
              </span>
            </div>
            <div className={s.subscriptions}>
              <span className={s.quantity}>{postsLoading && allPosts.length === 0 ? '...' : allPosts.length}</span>
              <span className={s.followers}>{dict.profile.publications}</span>
            </div>
          </div>

          {/* ==================== О СЕБЕ ==================== */}
          <div className={s.aboutUser}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
          </div>
        </div>
      </div>

      {/* ==================== СЕТКА ПОСТОВ ==================== */}
      <div className={s.posts}>
        {/* Загрузка (первичная) */}
        {postsLoading && allPosts.length === 0 && <div className={s.loading}>{dict.profile.loadingPosts}</div>}

        {/* Ошибка */}
        {postsError && <div className={s.error}>{dict.profile.errorLoadingPosts}</div>}

        {/* Пусто */}
        {!postsLoading && !postsError && allPosts.length === 0 && (
          <div className={s.empty}>{dict.profile.noPublications}</div>
        )}

        {/* Посты */}
        {allPosts.map((post) => (
          <button key={post.id} type="button" className={s.postItem} onClick={() => setActivePost(post)}>
            {post.media?.[0]?.url ? (
              <Image
                src={post.media[0].url}
                alt={post.description || dict.profile.smallPostImage}
                width={234}
                height={228}
                className={s.postImage}
                sizes="234px"
              />
            ) : (
              <div className={s.postPlaceholder}>
                {post.description?.slice(0, 50)}
                {post.description && post.description.length > 50 ? '...' : ''}
              </div>
            )}
          </button>
        ))}

        {/* 🔥 Сентинел-элемент для Intersection Observer */}
        <div ref={sentinelRef} className={s.sentinel}>
          {isFetchingNextPage && <div className={s.infiniteLoader}>{dict.profile.loading}</div>}
        </div>
      </div>

      {/* ==================== MODAL: ПОДПИСЧИКИ ==================== */}
      <Card
        isOpen={isCardOpen}
        onCloseAction={handleCloseCard}
        title={dict.profile.followers}
        width="644px"
        height="654px"
      >
        <div className={s.container}>
          <input className={s.search} placeholder={dict.profile.search} />
          <div className={s.followersListWrapper}>
            <ul>
              {followers.items.map((f: Subscriber, index) => (
                <li key={index}>
                  <div className={s.followersList}>
                    <div className={s.imgNameFollowerWrapper}>
                      <Image src={ava} alt="" width={36} height={36} className={s.imgFollower} />
                      <span>{f.userName}</span>
                    </div>
                    <div className={s.buttonFollowerWrapper}>
                      <Button variant="primary" width="auto">
                        {dict.profile.follow}
                      </Button>
                      <Button variant="secondary" width="auto">
                        {dict.profile.delete}
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
      {activePost && (
        <DefaultPostModal
          post={activePost}
          userName={activePost.owner.username}
          avatarOwner={activePost.owner.avatar || ava.src}
          canManage={isOwner && currentUser?.id === activePost.owner.userId}
          onCloseAction={() => setActivePost(null)}
          onDescriptionSavedAction={(description) => {
            setActivePost((current) => (current?.id === activePost.id ? { ...current, description } : current))
          }}
        />
      )}
    </div>
  )
}
