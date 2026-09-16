'use client'

import { Modal } from '@/shared/ui/modalsPost/Modal'
import { Button } from '@/shared/ui/button/Button'
import { useTranslations } from '@/shared/lib/i18n/TranslationsProvider'

type Props = {
  open: boolean
  onDiscardAction: () => void
  onSaveDraftAction: () => void
}

export const CloseConfirmModal = ({ open, onDiscardAction, onSaveDraftAction }: Props) => {
  const dict = useTranslations()

  return (
    <Modal
      open={open}
      onOpenChangeAction={() => {}}
      title={dict.closeConfirm.title}
      footer={
        <>
          <Button variant="outline" width="auto" onClick={onDiscardAction}>
            {dict.closeConfirm.discard}
          </Button>
          <Button variant="primary" width="auto" onClick={onSaveDraftAction}>
            {dict.closeConfirm.saveDraft}
          </Button>
        </>
      }
    >
      <p>{dict.closeConfirm.body}</p>
    </Modal>
  )
}
