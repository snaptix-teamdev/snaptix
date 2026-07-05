'use client'

import * as Dialog from '@radix-ui/react-dialog'
import styles from './Modal.module.css'
import { ModalProps } from '@/shared/ui/modalsPost/Modal.types'
import { CloseIcon } from '@/shared/ui/svg/Icon'

export const Modal = ({ open, onOpenChangeAction, title, children, footer, className, size = 'sm' }: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChangeAction}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={`${styles.content} ${styles[size]} ${className ?? ''}`} aria-describedby={undefined}>
          {/* Шапка: заголовок + кнопка закрытия */}
          <header className={styles.header}>
            <Dialog.Title className={styles.title}>{title}</Dialog.Title>
            <Dialog.Close className={styles.close} aria-label="Закрыть">
              <CloseIcon />
            </Dialog.Close>
          </header>

          {/* Тело модального окна */}
          <div className={styles.body}>{children}</div>

          {/* Футер отображается только при наличии содержимого */}
          {footer && <footer className={styles.footer}>{footer}</footer>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
