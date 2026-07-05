'use client'

import { useState } from 'react'
import { useTranslations } from '@/shared/lib/i18n/TranslationsProvider' // Импорт хука
import { Sidebar } from './Sidebar'
import s from './Sidebar.module.css'
import {
  CreateActiveIcon,
  CreateIcon,
  FavoriteActiveIcon,
  FavoriteIcon,
  HomeActiveIcon,
  HomeIcon,
  LogoutIcon,
  MessengerActiveIcon,
  MessengerIcon,
  ProfileActiveIcon,
  ProfileIcon,
  SearchIcon,
  StatsIcon,
} from '@/shared/ui/svg/Icon'
import { LogOutModal } from '@/widgets/modals'
import { CreatePostModal } from '@/features/create-post'

export const SidebarListClient = () => {
  const dict = useTranslations()

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)

  return (
    <>
      <Sidebar>
        <Sidebar.Item href="/feed" icon={<HomeIcon />} activeIcon={<HomeActiveIcon />}>
          {dict.sidebar.feed}
        </Sidebar.Item>
        <Sidebar.Item
          href="/create"
          icon={<CreateIcon />}
          activeIcon={<CreateActiveIcon />}
          onClick={() => setIsCreatePostOpen(true)}
        >
          {dict.sidebar.create}
        </Sidebar.Item>
        <Sidebar.Item href="/profile" icon={<ProfileIcon />} activeIcon={<ProfileActiveIcon />}>
          {dict.sidebar.myProfile}
        </Sidebar.Item>
        <Sidebar.Item href="/messenger" icon={<MessengerIcon />} activeIcon={<MessengerActiveIcon />}>
          {dict.sidebar.messenger}
        </Sidebar.Item>
        <Sidebar.Item href="/search" icon={<SearchIcon />}>
          {dict.sidebar.search}
        </Sidebar.Item>

        <Sidebar.Item href="/stats" icon={<StatsIcon />} className={s.groupIndent}>
          {dict.sidebar.statistics}
        </Sidebar.Item>
        <Sidebar.Item href="/favorites" icon={<FavoriteIcon />} activeIcon={<FavoriteActiveIcon />}>
          {dict.sidebar.favorites}
        </Sidebar.Item>

        <Sidebar.Item href="#" onClick={() => setIsLogoutModalOpen(true)} icon={<LogoutIcon />} className={s.logout}>
          {dict.sidebar.logOut}
        </Sidebar.Item>
      </Sidebar>

      {isLogoutModalOpen && <LogOutModal userId={'123'} onCloseAction={() => setIsLogoutModalOpen(false)} />}
      <CreatePostModal open={isCreatePostOpen} onCloseAction={() => setIsCreatePostOpen(false)} />
    </>
  )
}
