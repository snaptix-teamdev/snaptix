import type { ReactNode } from 'react'

export type SidebarProps = {
  children: ReactNode
}

export type SidebarItemProps = {
  href: string
  icon: ReactNode
  activeIcon?: ReactNode
  onClick?: () => void
  children: ReactNode
  className?: string
  disabled?: boolean
}
