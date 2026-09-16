'use client'

import type { ReactNode, MouseEvent } from 'react'
import { CrossWhiteIcon } from '@/shared/ui/svg/Icon'
import { Button } from '@/shared/ui/button/Button'
import { useTranslations } from '@/shared/lib/i18n/TranslationsProvider'
import s from './ModalLayout.module.css'

type Props = {
  onConfirm: () => void
  onClose: () => void
  isPending: boolean
  title: string
  children: ReactNode
}

export const ModalLayout = ({ title, children, onClose, onConfirm, isPending = false }: Props) => {
  const dict = useTranslations()

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className={s.overlay} onClick={handleOverlayClick}>
      <div className={s.modal}>
        <header className={s.header}>
          <h3>{title}</h3>
          <button className={s.close} onClick={onClose}>
            <CrossWhiteIcon />
          </button>
        </header>
        <section className={s.content}>{children}</section>

        <footer className={s.buttons}>
          <Button variant="outline" onClick={onConfirm} disabled={isPending}>
            {dict.modal.confirm}
          </Button>
          <Button variant="primary" onClick={onClose}>
            {dict.modal.cancel}
          </Button>
        </footer>
      </div>
    </div>
  )
}
