'use client'

import s from './DeleteConfirmationCard.module.css'
import { Button } from '@/shared/ui/button/Button'
import Card from '@/shared/ui/card/Card'
import { useTranslations } from '@/shared/lib/i18n/TranslationsProvider'

interface DeleteConfirmationCardProps {
  isOpen: boolean
  onCloseAction: () => void
  onConfirmAction: () => Promise<void>
  isDeleting: boolean
  hasError: boolean
}

export const DeleteConfirmationCard = ({
  isOpen,
  onCloseAction,
  onConfirmAction,
  isDeleting,
  hasError,
}: DeleteConfirmationCardProps) => {
  const dict = useTranslations()

  return (
    <Card width={438} height={240} isOpen={isOpen} onCloseAction={onCloseAction} title={dict.deletePhotoCard.title}>
      <div className={s.deleteCardContainer}>
        <p className={s.deleteText}>{dict.deletePhotoCard.confirmation}</p>
        {hasError && (
          <p className={s.deleteError} role="alert">
            {dict.deletePhotoCard.deleteError}
          </p>
        )}
        <div className={s.deleteActions}>
          <Button variant="outline" width="auto" onClick={onCloseAction} disabled={isDeleting}>
            {dict.deletePhotoCard.no}
          </Button>
          <Button variant="primary" width="auto" onClick={onConfirmAction} disabled={isDeleting}>
            {isDeleting ? dict.deletePhotoCard.deleting : dict.deletePhotoCard.yes}
          </Button>
        </div>
      </div>
    </Card>
  )
}
