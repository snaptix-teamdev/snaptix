'use client'

import s from './MainInformation.module.css'
import ProfileForm from '@/fsd-pages/general-information/ui/ProfileForm'
import { ChangeEvent, MouseEvent, useRef, useState } from 'react'
import { useFileUpload } from '@/shared/hooks/useFileUpload'
import { AvatarUploader } from '../main-information/components/AvatarUploader/AvatarUploader'
import { PhotoUploadCard } from '../main-information/components/PhotoUploadCard/PhotoUploadCard'
import { DeleteConfirmationCard } from '../main-information/components/DeleteConfirmationCard/DeleteConfirmationCard'

export const MainInformation = () => {
  const [isCardOpen, setIsCardOpen] = useState(false)
  const [isDeleteCardOpen, setIsDeleteCardOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { profilePhoto, previewPhoto, error, setProfilePhoto, createPreview, savePhoto, cancelPreview, clearError } =
    useFileUpload()

  const handleSelectClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      createPreview(file)
    }
    event.target.value = ''
  }

  const openDeleteCard = (e: MouseEvent) => {
    e.stopPropagation()
    setIsDeleteCardOpen(true)
  }

  const confirmDelete = () => {
    setProfilePhoto(null)
    setIsDeleteCardOpen(false)
    clearError()
  }

  const cancelDelete = () => {
    setIsDeleteCardOpen(false)
  }

  const handleDeleteAvatar = (e: MouseEvent) => {
    e.stopPropagation()
    openDeleteCard(e)
  }

  const handleCloseCard = () => {
    setIsCardOpen(false)
    cancelPreview()
  }

  const handleSavePhoto = () => {
    savePhoto()
    setIsCardOpen(false)
  }

  return (
    <div className={s.informationBlock}>
      <AvatarUploader
        profilePhoto={profilePhoto}
        onOpenCardAction={() => setIsCardOpen(true)}
        onDeleteAction={handleDeleteAvatar}
      />
      <div className={s.userInformation}>
        <ProfileForm />
      </div>
      <PhotoUploadCard
        isOpen={isCardOpen}
        onCloseAction={handleCloseCard}
        error={error}
        previewPhoto={previewPhoto}
        onFileSelectAction={handleFileSelect}
        onSelectClickAction={handleSelectClick}
        onSaveAction={handleSavePhoto}
      />
      <DeleteConfirmationCard isOpen={isDeleteCardOpen} onCloseAction={cancelDelete} onConfirmAction={confirmDelete} />
    </div>
  )
}
