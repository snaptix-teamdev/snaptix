'use client'

import Link from 'next/link'
import s from './Header.module.css'
import { Button } from '@/shared/ui/button/Button'
import { LanguageSwitcher } from '@/widgets/header/ui/language-switcher/LanguageSwitcher'
import { NotificationBell } from '@/widgets/header/ui/notification-bell/NotificationBell'
import { useTranslations } from '@/shared/lib/i18n/TranslationsProvider' // Импорт хука

interface Props {
  isAuth?: boolean
  isLoading?: boolean
}

export const Header = ({ isAuth, isLoading }: Props) => {
  // Получаем переводы
  const dict = useTranslations()

  return (
    <header>
      <div className={s.container}>
        <Link href="/" className={s.logo}>
          Snaptix
        </Link>

        <div className={s.nav}>
          {isLoading ? (
            <div className={s.guestActions} aria-hidden="true">
              <span className={`${s.skeleton} ${s.skeletonSelect}`} />
              <span className={`${s.skeleton} ${s.skeletonBtn}`} />
              <span className={`${s.skeleton} ${s.skeletonBtn}`} />
            </div>
          ) : isAuth ? (
            <div className={s.authActions}>
              <div className={s.notificationWrapper}>
                <NotificationBell />
              </div>
              <LanguageSwitcher />
            </div>
          ) : (
            <div className={s.guestActions}>
              <LanguageSwitcher />
              <Link href="/signIn" className={s.loginBtn}>
                {dict.auth.logIn}
              </Link>
              <Link href="/signup">
                <Button variant="primary">{dict.auth.signUp}</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
