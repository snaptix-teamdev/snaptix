'use client'

import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowBackIcon, CloseIcon } from '@/shared/ui/svg/Icon'
import { useCreatePostWizard } from '../model/useCreatePostWizard'
import { getCroppedImg } from '../model/cropUtils'
import { UploadStep } from './steps/UploadStep'
import { CropStep } from './steps/CropStep'
import { FilterStep } from './steps/FilterStep'
import { DescriptionStep } from './steps/DescriptionStep'
import { CloseConfirmModal } from './CloseConfirmModal'
import s from './CreatePostModal.module.css'
import { useTranslations } from '@/shared/lib/i18n/TranslationsProvider'
import type { Dictionary } from '@/shared/lib/i18n/dictionaries'

// Функция для получения переведённых заголовков шагов
const getStepTitles = (dict: Dictionary): Record<string, string> => ({
  upload: dict.createPost.addPhoto,
  crop: dict.createPost.cropping,
  filters: dict.createPost.filters,
  description: dict.createPost.publication,
})

type Props = {
  open: boolean
  onCloseAction: () => void
}

export const CreatePostModal = ({ open, onCloseAction }: Props) => {
  const dict = useTranslations()
  const wizard = useCreatePostWizard(onCloseAction)
  const { step, photos, currentPhotoIndex, description, isCloseConfirmOpen, isPublishing } = wizard

  const STEP_TITLES = getStepTitles(dict)

  const [isCropping, setIsCropping] = useState(false)
  const isWide = step !== 'upload'
  const hasPhotos = photos.length > 0

  const handleCropNext = async () => {
    setIsCropping(true)
    try {
      for (const photo of photos) {
        if (photo.croppedAreaPixels) {
          const croppedSrc = await getCroppedImg(photo.originalSrc, photo.croppedAreaPixels)
          wizard.setCroppedSrc(photo.id, croppedSrc)
        }
      }
      wizard.goNext()
    } finally {
      setIsCropping(false)
    }
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) wizard.requestClose(hasPhotos)
  }

  return (
    <>
      <Dialog.Root open={open} onOpenChange={handleOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className={s.overlay} />
          <Dialog.Content
            className={`${s.content} ${isWide ? s.contentWide : ''}`}
            aria-describedby={undefined}
            onInteractOutside={(e) => {
              e.preventDefault()
              wizard.requestClose(hasPhotos)
            }}
            onEscapeKeyDown={(e) => {
              e.preventDefault()
              wizard.requestClose(hasPhotos)
            }}
          >
            <header className={s.header}>
              <div className={s.headerLeft}>
                {step !== 'upload' && (
                  <button
                    className={s.backBtn}
                    onClick={() => wizard.goBack(hasPhotos)}
                    aria-label={dict.createPost.back}
                  >
                    <ArrowBackIcon width={20} height={20} />
                  </button>
                )}
              </div>

              <Dialog.Title className={s.title}>{STEP_TITLES[step]}</Dialog.Title>

              <div className={s.headerRight}>
                {step === 'crop' && (
                  <button className={s.nextBtn} onClick={handleCropNext} disabled={isCropping}>
                    {isCropping ? dict.createPost.processing : dict.createPost.next}
                  </button>
                )}
                {step === 'filters' && (
                  <button className={s.nextBtn} onClick={wizard.goNext}>
                    {dict.createPost.next}
                  </button>
                )}
                {step === 'description' && (
                  <button className={s.nextBtn} onClick={wizard.publish} disabled={isPublishing}>
                    {isPublishing ? dict.createPost.publishing : dict.createPost.publish}
                  </button>
                )}
                {step === 'upload' && (
                  <button
                    className={s.closeBtn}
                    onClick={() => wizard.requestClose(hasPhotos)}
                    aria-label={dict.createPost.close}
                  >
                    <CloseIcon />
                  </button>
                )}
              </div>
            </header>

            <div className={s.body}>
              {step === 'upload' && (
                <UploadStep
                  onFileSelectedAction={(file) => {
                    const ok = wizard.addPhoto(file)
                    if (ok) wizard.goNext()
                  }}
                  error={wizard.uploadError}
                  onClearErrorAction={wizard.clearUploadError}
                />
              )}

              {step === 'crop' && (
                <CropStep
                  photos={photos}
                  currentIndex={currentPhotoIndex}
                  onSetCurrentPhotoAction={wizard.setCurrentPhoto}
                  onUpdateCropAction={wizard.updateCrop}
                  onUpdateZoomAction={wizard.updateZoom}
                  onUpdateCroppedAreaPixelsAction={wizard.updateCroppedAreaPixels}
                  onRemovePhotoAction={wizard.removePhoto}
                  onAddPhotoAction={wizard.addPhoto}
                />
              )}

              {step === 'filters' && (
                <FilterStep
                  photos={photos}
                  currentIndex={currentPhotoIndex}
                  onSetCurrentPhotoAction={wizard.setCurrentPhoto}
                  onSetFilterAction={wizard.setPhotoFilter}
                />
              )}

              {step === 'description' && (
                <DescriptionStep
                  photos={photos}
                  description={description}
                  onDescriptionChangeAction={wizard.setDescription}
                />
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <CloseConfirmModal
        open={isCloseConfirmOpen}
        onSaveDraftAction={wizard.confirmClose}
        onDiscardAction={wizard.closeCloseConfirm}
      />
    </>
  )
}
