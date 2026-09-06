'use client'

import type { ButtonHTMLAttributes } from 'react'
import { LogoutIcon } from '@/shared/ui/svg/Icon'
import s from './LogoutButton.module.css'
import { useTranslations } from '@/shared/lib/i18n/TranslationsProvider'

type LogoutButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const LogoutButton = ({ className = '', onClick, ...props }: LogoutButtonProps) => {
  const dict = useTranslations()
  const classes = [s.logoutBtn, className].filter(Boolean).join(' ')

  return (
    <button className={classes} onClick={onClick} type="button" {...props}>
      <LogoutIcon />
      <span>{dict.sidebar.logOut}</span>
    </button>
  )
}
