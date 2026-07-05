import { type ReactNode } from 'react'

export type ModalProps = {
  /** Управляет видимостью модального окна */
  open: boolean
  /** Callback при изменении состояния (клик по оверлею, Escape) */
  onOpenChangeAction: (open: boolean) => void
  /** Заголовок модального окна */
  title: string
  /** Содержимое тела модального окна */
  children: ReactNode
  /** Содержимое футера (например, кнопки действий) */
  footer?: ReactNode
  /** Дополнительный CSS-класс для контентной панели */
  className?: string
  /** Вариант ширины */
  size?: 'sm' | 'md' | 'lg'
}
