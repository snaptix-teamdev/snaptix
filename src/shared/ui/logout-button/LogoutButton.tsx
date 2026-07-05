'use client'

import { LogoutIcon } from '@/shared/ui/svg/Icon'
import s from './LogoutButton.module.css'
import { useTranslations } from '@/shared/lib/i18n/TranslationsProvider'

type LogoutButtonProps = {
  onClick?: () => void
}

export const LogoutButton = ({ onClick }: LogoutButtonProps) => {
  const dict = useTranslations()

  return (
    <button className={s.logoutBtn} onClick={onClick}>
      <LogoutIcon />
      <span>{dict.sidebar.logOut}</span>
    </button>
  )
}
