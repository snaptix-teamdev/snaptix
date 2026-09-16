'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Modal } from '@/shared/ui/modalsPost/Modal'
import { LogOutModal } from '@/widgets/modals'
import { useTranslations } from '@/shared/lib/i18n/TranslationsProvider'

interface ProfileModalActionsProps {
  id: string
  postId?: string
  action?: string
}

/**
 * Клиентские модалки профиля (создание/выход) и нормализация URL.
 * Просмотр поста рендерится отдельно через SSR в page.tsx.
 */
export const ProfileModalActions = ({ id, postId, action }: ProfileModalActionsProps) => {
  const router = useRouter()
  const dict = useTranslations()

  // postId + action одновременно недопустимы — оставляем только просмотр поста.
  useEffect(() => {
    if (postId && action) {
      router.replace(`/profile/${id}?postId=${postId}`)
    }
  }, [postId, action, id, router])

  if (postId && action) return null

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) router.back()
  }

  if (action === 'create') {
    return (
      <Modal open onOpenChangeAction={handleOpenChange} title={dict.profileModal.createPost}>
        <div>{dict.profileModal.createPostForm}</div>
      </Modal>
    )
  }

  if (action === 'logout') {
    return <LogOutModal userId={id} onCloseAction={() => router.back()} />
  }

  return null
}
