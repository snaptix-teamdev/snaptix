'use client'

import { useState, useCallback, useMemo, useRef } from 'react'
import { PostLayout } from '@/entities/post/ui/PostLayout'
import s from './PostDescriptionModal.module.css'
import Image from 'next/image'
import { useModal } from '@/shared/hooks/useModal'
import { Button } from '@/shared/ui/button/Button'
import { TextArea } from '@/shared/ui/text-area/TextArea'
import { CrossWhiteIcon } from '@/shared/ui/svg/Icon'
import { ConfirmChangePostModal } from '@/widgets/modals/ui/confirm-change-post/ConfirmChangePost'
import { useChangePostDescriptMutation } from '@/features/change-descp-post/hooks/use-change-post-descript-mutation'
import type { Post } from '@/entities/post/ui/Post.types'
import { useMeQuery } from '@/shared/api/auth'
import defaultAvatar from '@/public/png/userAvatar.png'
import { useTranslations } from '@/shared/lib/i18n/TranslationsProvider'
import { revalidateEditedPostAction } from '../../api/revalidate-edited-post'

type PostDescriptionModal = {
  isOpen: boolean
  onCloseAction: () => void
  onSavedAction: (description: string) => void
  onServerCacheUpdatedAction?: () => void
  avatarOwner?: string
} & Post

export const PostDescriptionModal = ({
  description,
  id,
  isOpen,
  onCloseAction,
  onSavedAction,
  onServerCacheUpdatedAction,
  avatarOwner,
  media,
}: PostDescriptionModal) => {
  const dict = useTranslations()
  const [currentDescription, setCurrentDescription] = useState(description ?? '')
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [lastSavedDescription, setLastSavedDescription] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const savingRef = useRef(false)

  const { data: me } = useMeQuery()

  const { mutateAsync: updatePostDescript, isPending } = useChangePostDescriptMutation()
  const hasUnsavedText = currentDescription !== (lastSavedDescription ?? description ?? '')
  const needsCacheRefresh = lastSavedDescription !== null

  const userAvatar = avatarOwner ? avatarOwner : defaultAvatar

  const handleCloseConfirm = useCallback(() => {
    if (isConfirmOpen || savingRef.current) return

    if (hasUnsavedText) {
      setIsConfirmOpen(true)
    } else {
      onCloseAction()
    }
  }, [onCloseAction, hasUnsavedText, isConfirmOpen])

  const handleSaveChangeDescription = async () => {
    if (savingRef.current || (!hasUnsavedText && !needsCacheRefresh)) return
    savingRef.current = true
    setErrorMessage(null)

    try {
      if (hasUnsavedText) {
        try {
          await updatePostDescript({ postId: id, description: currentDescription })
        } catch {
          setErrorMessage(dict.editPost.saveError)
          return
        }

        setLastSavedDescription(currentDescription)
        onSavedAction(currentDescription)
      }

      setIsRefreshing(true)
      try {
        await revalidateEditedPostAction(id)
      } catch {
        setErrorMessage(dict.editPost.refreshError)
        return
      } finally {
        setIsRefreshing(false)
      }

      onCloseAction()
      onServerCacheUpdatedAction?.()
    } finally {
      savingRef.current = false
    }
  }

  const modalRef = useModal({ isOpen, onClose: handleCloseConfirm })

  const postImages = useMemo(() => {
    return media?.map((m) => ({ url: m.url, mediaId: m.mediaId })) || []
  }, [media])

  if (!isOpen) return null

  return (
    <>
      <div className={s.overlay} onClick={(e) => e.stopPropagation()}>
        <div className={s.modalContent} ref={modalRef} tabIndex={-1}>
          <section className={s.titleBlock}>
            <h1>{dict.editPost.title}</h1>
            <button type="button" className={s.close} onClick={handleCloseConfirm}>
              <CrossWhiteIcon />
            </button>
          </section>
          <PostLayout variant={'large'} images={postImages}>
            <div className={s.editForm}>
              <section className={s.author}>
                <Image src={userAvatar} alt={dict.editPost.userAvatar} width={36} height={36} className={s.avatar} />
                <h3>{me?.username}</h3>
              </section>
              <section className={s.description}>
                <label htmlFor="textArea" className={s.label}>
                  {dict.editPost.addDescription}
                </label>
                <TextArea
                  id="textArea"
                  className={s.area}
                  value={currentDescription}
                  onValueChangeAction={(value) => {
                    setCurrentDescription(value)
                    setErrorMessage(null)
                  }}
                  maxLength={500}
                />
                <div className={s.charCount}>{currentDescription.length} / 500</div>
              </section>
              {errorMessage && (
                <p role="alert" className={s.error}>
                  {errorMessage}
                </p>
              )}
              <div className={s.save}>
                <Button
                  type="button"
                  width={'auto'}
                  variant={'primary'}
                  onClick={handleSaveChangeDescription}
                  disabled={isPending || isRefreshing || (!hasUnsavedText && !needsCacheRefresh)}
                >
                  {needsCacheRefresh && !hasUnsavedText ? dict.editPost.retryRefresh : dict.editPost.saveChanges}
                </Button>
              </div>
            </div>
          </PostLayout>
        </div>
      </div>

      {isConfirmOpen && (
        <ConfirmChangePostModal
          onConfirm={() => {
            setIsConfirmOpen(false)
            onCloseAction()
          }}
          onClose={() => setIsConfirmOpen(false)}
        />
      )}
    </>
  )
}
