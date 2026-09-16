'use client'

import { Header } from '@/widgets/header'
import { SidebarListClient } from '@/shared/ui/sidebar/SidebarListClient'
import { useAuthStatus } from '@/shared/api/auth'
import { TranslationsProvider } from '@/shared/lib/i18n/TranslationsProvider'
import s from './Layout.module.css'

const SIDEBAR_SKELETON_ITEMS = 7

const SidebarSkeleton = () => (
  <div className={s.sidebarSkeleton} aria-hidden="true">
    {Array.from({ length: SIDEBAR_SKELETON_ITEMS }).map((_, i) => (
      <span key={i} className={s.sidebarSkeletonItem} />
    ))}
  </div>
)

interface AppShellProps {
  children: React.ReactNode
}

export const AppShell = ({ children }: AppShellProps) => {
  const { isAuth, isLoading } = useAuthStatus()

  return (
    <TranslationsProvider>
      <Header isAuth={isAuth} isLoading={isLoading} />
      <div className={s.content}>
        {isLoading ? <SidebarSkeleton /> : isAuth ? <SidebarListClient /> : null}
        <main className={`${s.main} ${!isAuth && !isLoading ? s.mainCentered : ''}`}>{children}</main>
      </div>
    </TranslationsProvider>
  )
}
