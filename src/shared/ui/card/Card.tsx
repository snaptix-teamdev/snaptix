'use client'
import s from './Card.module.css'
import { CloseIcon } from '@/shared/ui/svg/Icon'
import { useModal } from '@/shared/hooks/useModal'
import { CardProps } from '@/shared/ui/card/Card.types'

export default function Card({ isOpen, onCloseAction, title, children, width = '492px', height = '584px' }: CardProps) {
  const cardRef = useModal({ isOpen, onClose: onCloseAction })

  if (!isOpen) return null

  const cardStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  }

  return (
    <div className={s.overlay}>
      <div ref={cardRef} className={s.card} style={cardStyle} tabIndex={-1}>
        {title && (
          <div className={s.header}>
            <span id="card-title" className={s.title}>
              {title}
            </span>
            <button onClick={onCloseAction} className={s.closeButton}>
              <CloseIcon color="var(--color-light-100)" />
            </button>
          </div>
        )}
        <div className={s.content}>{children}</div>
      </div>
    </div>
  )
}
