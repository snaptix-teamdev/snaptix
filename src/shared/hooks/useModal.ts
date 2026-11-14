// hooks/useModal.ts
import { useEffect, useRef } from 'react'

interface UseModalProps {
  isOpen: boolean
  onClose: () => void
}

export const useModal = ({ isOpen, onClose }: UseModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousBodyRef = useRef<string>('')

  // Закрытие по Escape
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Закрытие по клику вне
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose])

  // Блокировка скролла
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = previousBodyRef.current
      return
    }

    previousBodyRef.current = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousBodyRef.current
    }
  }, [isOpen])

  // Автофокус на карточку
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus()
    }
  }, [isOpen])

  return modalRef
}
