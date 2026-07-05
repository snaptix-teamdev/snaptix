// components/PhotoUploadCard/PhotoUploadCard.tsx
'use client'

import s from './PhotoUploadCard.module.css'
import { Button } from '@/shared/ui/button/Button'
import Card from '@/shared/ui/card/Card'
import Image from 'next/image'
import { useRef } from 'react'
import { ImageIcon } from '@/shared/ui/svg/Icon'
import { useTranslations } from '@/shared/lib/i18n/TranslationsProvider'

interface PhotoUploadCardProps {
  isOpen: boolean
  onCloseAction: () => void
  error: string | null
  previewPhoto: string | null
  onFileSelectAction: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSelectClickAction: () => void
  onSaveAction: () => void
}

export const PhotoUploadCard = ({
  isOpen,
  onCloseAction,
  error,
  previewPhoto,
  onFileSelectAction,
  onSelectClickAction,
  onSaveAction,
}: PhotoUploadCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dict = useTranslations()

  const handleSelectClick = () => {
    fileInputRef.current?.click()
    onSelectClickAction()
  }

  return (
    <Card width={492} height={564} isOpen={isOpen} onCloseAction={onCloseAction} title={dict.photoUploadCard.addProfilePhoto}>
      <div className={s.uploadContainer}>
        <div className={s.errorImg} style={{ visibility: error ? 'visible' : 'hidden' }}>
          <span className={s.errorTitle}>{dict.photoUploadCard.error}</span>
          <span className={s.errorText}>{error || ''}</span>
        </div>

        {previewPhoto ? (
          <>
            <div className={s.previewContainer}>
              <Image src={previewPhoto} alt={dict.photoUploadCard.preview} width={340} height={340} className={s.previewImage} />
            </div>
            <div className={s.previewActions}>
              <Button variant="primary" width="auto" onClick={onSaveAction}>
                {dict.photoUploadCard.save}
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className={s.uploadArea} onClick={handleSelectClick}>
              <ImageIcon />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={onFileSelectAction}
                className={s.hiddenInput}
              />
            </div>
            <div className={s.actions}>
              <Button variant="primary" width="auto" onClick={handleSelectClick}>
                {dict.photoUploadCard.selectFromComputer}
              </Button>
            </div>
          </>
        )}
      </div>
    </Card>
  )
}
