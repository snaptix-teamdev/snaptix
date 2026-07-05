import { ReactNode } from 'react'

export interface CardProps {
  isOpen: boolean
  onCloseAction: () => void
  title?: string
  children: ReactNode
  width?: string | number
  height?: string | number
}
