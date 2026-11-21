'use client'

import s from './ChangeMenuPostModal.module.css'
import { Basket, PencilPaper } from '@/shared/ui/svg/Icon'
import { useState, useEffect, useRef } from 'react'
import { useTranslations } from '@/shared/lib/i18n/TranslationsProvider' // Импорт хука

type ChangeMenuPostModalProps = {
  onEditAction: () => void
  onDeleteAction: () => void
}

export const ChangeMenuPostModal = ({ onEditAction, onDeleteAction }: ChangeMenuPostModalProps) => {
  const dict = useTranslations()

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  const toggleMenuHandler = () => setIsMenuOpen((prev) => !prev)

  const handleEditClick = () => {
    onEditAction()
    setIsMenuOpen(false)
  }

  const handleDeleteClick = () => {
    onDeleteAction()
    setIsMenuOpen(false)
  }

  return (
    <section className={s.menuContainer} ref={menuRef}>
      <button className={s.moreActions} onClick={toggleMenuHandler}>
        •••
      </button>

      {isMenuOpen && (
        <section className={s.dropdownMenu}>
          <button className={s.menuItem} onClick={handleEditClick}>
            <span>{<PencilPaper />}</span>
            <span>{dict.postMenu.edit}</span>
          </button>

          <button className={s.menuItem} onClick={handleDeleteClick}>
            <span>{<Basket />}</span>
            <span>{dict.postMenu.delete}</span>
          </button>
        </section>
      )}
    </section>
  )
}
