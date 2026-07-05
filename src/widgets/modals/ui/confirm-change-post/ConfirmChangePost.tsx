'use client'

import { ModalLayout } from '@/widgets/modals/ui/ModalLayout'
import { useTranslations } from '@/shared/lib/i18n/TranslationsProvider'

export const ConfirmChangePostModal = ({ onConfirm, onClose }: { onConfirm: () => void; onClose: () => void }) => {
  const dict = useTranslations()

  return (
    <ModalLayout title={dict.confirmChangePost.title} onClose={onClose} onConfirm={onConfirm} isPending={false}>
      <p style={{ padding: 0, lineHeight: '1.5' }}>
        {dict.confirmChangePost.bodyLine1}
        <br />
        {dict.confirmChangePost.bodyLine2}
      </p>
    </ModalLayout>
  )
}
