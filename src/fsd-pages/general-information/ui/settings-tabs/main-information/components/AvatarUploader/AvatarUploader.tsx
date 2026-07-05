'use client'

import s from './AvatarUploader.module.css'
import { Button } from '@/shared/ui/button/Button'
import Image from 'next/image'
import { CloseIcon, ImageIcon } from '@/shared/ui/svg/Icon'
import { useTranslations } from '@/shared/lib/i18n/TranslationsProvider'

interface AvatarUploaderProps {
  profilePhoto: string | null
  onOpenCardAction: () => void
  onDeleteAction: (e: React.MouseEvent) => void
}

export const AvatarUploader = ({ profilePhoto, onOpenCardAction, onDeleteAction }: AvatarUploaderProps) => {
  const dict = useTranslations()

  return (
    <div className={s.userPhotoWrapper}>
      <div className={s.avatarContainer} onClick={onOpenCardAction}>
        {profilePhoto ? (
          <Image src={profilePhoto} alt={dict.profile.userAvatar} width={205} height={205} className={s.userPhoto} />
        ) : (
          <div className={s.placeholderIcon}>
            <ImageIcon />
          </div>
        )}
        {profilePhoto && (
          <button onClick={onDeleteAction} className={s.deleteButton}>
            <CloseIcon color="var(--color-light-100)" />
          </button>
        )}
      </div>
      <Button onClick={onOpenCardAction} variant="outline">
        {dict.avatarUploader.selectProfilePhoto}
      </Button>
    </div>
  )
}
