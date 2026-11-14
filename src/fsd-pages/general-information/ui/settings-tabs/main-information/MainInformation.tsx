'use client'

import s from './MainInformation.module.css'
import ProfileForm from '@/fsd-pages/general-information/ui/ProfileForm'
import { ChangeEvent, MouseEvent, useState } from 'react'
import { useFileUpload } from '@/shared/hooks/useFileUpload'
import { AvatarUploader } from '../main-information/components/AvatarUploader/AvatarUploader'
import { PhotoUploadCard } from '../main-information/components/PhotoUploadCard/PhotoUploadCard'
import { DeleteConfirmationCard } from '../main-information/components/DeleteConfirmationCard/DeleteConfirmationCard'
import { useGetProfileSettingsQuery } from '@/fsd-pages/general-information/api/hooks/use-get-profile-settings'
import { useUploadAvatarMutation } from '@/fsd-pages/general-information/api/hooks/use-upload-avatar-mutation'
import { useDeleteAvatarMutation } from '@/fsd-pages/general-information/api/hooks/use-delete-avatar-mutation'
import { useTranslations } from '@/shared/lib/i18n/TranslationsProvider'

export const MainInformation = () => {
  const [isCardOpen, setIsCardOpen] = useState(false)
  const [isDeleteCardOpen, setIsDeleteCardOpen] = useState(false)
  const dict = useTranslations()

  const { selectedFile, previewPhoto, error, createPreview, cancelPreview } = useFileUpload({
    validationErrorMessage: dict.photoUploadCard.validationError,
  })
  const { data: profile } = useGetProfileSettingsQuery()
  const {
    mutateAsync: uploadAvatar,
    isPending: isAvatarUploading,
    isError: isAvatarUploadError,
    reset: resetAvatarUpload,
  } = useUploadAvatarMutation()
  const {
    mutateAsync: deleteAvatar,
    isPending: isAvatarDeleting,
    isError: isAvatarDeleteError,
    reset: resetAvatarDelete,
  } = useDeleteAvatarMutation()

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      resetAvatarUpload()
      createPreview(file)
    }
    event.target.value = ''
  }

  const openDeleteCard = (e: MouseEvent) => {
    e.stopPropagation()
    resetAvatarDelete()
    setIsDeleteCardOpen(true)
  }

  const confirmDelete = async () => {
    if (isAvatarDeleting) return

    try {
      await deleteAvatar()
      setIsDeleteCardOpen(false)
    } catch {
      // Mutation сохраняет ошибку, а окно подтверждения остается открытым.
    }
  }

  const cancelDelete = () => {
    if (isAvatarDeleting) return

    resetAvatarDelete()
    setIsDeleteCardOpen(false)
  }

  const handleDeleteAvatar = (e: MouseEvent) => {
    e.stopPropagation()
    openDeleteCard(e)
  }

  const handleCloseCard = () => {
    if (isAvatarUploading) return

    resetAvatarUpload()
    setIsCardOpen(false)
    cancelPreview()
  }

  const handleSavePhoto = async () => {
    if (!selectedFile || isAvatarUploading) return

    try {
      await uploadAvatar(selectedFile)
      cancelPreview()
      setIsCardOpen(false)
    } catch {
      // Mutation сохраняет ошибку, а модальное окно остается открытым для повторной попытки.
    }
  }

  return (
    <div className={s.informationBlock}>
      <AvatarUploader
        profilePhoto={profile?.avatarUrl ?? null}
        onOpenCardAction={() => setIsCardOpen(true)}
        onDeleteAction={handleDeleteAvatar}
      />
      <div className={s.userInformation}>
        <ProfileForm />
      </div>
      <PhotoUploadCard
        isOpen={isCardOpen}
        onCloseAction={handleCloseCard}
        error={error ?? (isAvatarUploadError ? dict.photoUploadCard.uploadError : null)}
        previewPhoto={previewPhoto}
        onFileSelectAction={handleFileSelect}
        onSaveAction={handleSavePhoto}
        isSaving={isAvatarUploading}
      />
      <DeleteConfirmationCard
        isOpen={isDeleteCardOpen}
        onCloseAction={cancelDelete}
        onConfirmAction={confirmDelete}
        isDeleting={isAvatarDeleting}
        hasError={isAvatarDeleteError}
      />
    </div>
  )
}
