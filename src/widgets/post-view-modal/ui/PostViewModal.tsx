'use client'

import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DefaultPostModal } from '@/entities/post/ui/default-post/DefaultPostModal'
import { useAuthStatus } from '@/shared/api/auth'
import type { PostWithOwner } from '@/entities/post/ui/Post.types'

type PostViewModalProps = {
  post: PostWithOwner
  /** id автора из маршрута /profile/[authorId] — фолбэк при закрытии по прямой ссылке */
  authorId: string
}

/**
 * Роутинг-обёртка над DefaultPostModal для просмотра поста по URL (UC-2).
 * Сам контент (шапка автора, комментарии, лайки, футер) рендерит DefaultPostModal.
 * Комментарии/лайки пока на мок-данных — бэкенд их ещё не отдаёт.
 */
export const PostViewModal = ({ post, authorId }: PostViewModalProps) => {
  const router = useRouter()
  const { user } = useAuthStatus()

  // Меню edit/delete — только автору поста (после клиентского /me).
  const canManage = !!user && user.id === post.owner.userId

  const close = useCallback(() => {
    // Переход внутри приложения (с главной / профиля) — возвращаемся назад.
    // Прямая ссылка (своей истории нет) — на профиль автора.
    if (window.history.length > 1) {
      router.back()
    } else {
      router.replace(`/profile/${authorId}`)
    }
  }, [router, authorId])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [close])

  return (
    <DefaultPostModal
      post={post}
      userName={post.owner.username}
      avatarOwner={post.owner.avatar ?? undefined}
      onCloseAction={close}
      canManage={canManage}
    />
  )
}
