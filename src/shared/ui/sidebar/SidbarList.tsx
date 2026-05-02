'use client'

import { useState } from 'react'
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

export const SidebarList = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  return (
    <>
      <Sidebar>
        <Sidebar.Item href="/feed" icon={<HomeIcon />} activeIcon={<HomeActiveIcon />}>
          Feed
        </Sidebar.Item>
        <Sidebar.Item href="/create" icon={<CreateIcon />} activeIcon={<CreateActiveIcon />}>
          Create
        </Sidebar.Item>
        <Sidebar.Item href="/profile" icon={<ProfileIcon />} activeIcon={<ProfileActiveIcon />}>
          My Profile
        </Sidebar.Item>
        <Sidebar.Item href="/messenger" icon={<MessengerIcon />} activeIcon={<MessengerActiveIcon />}>
          Messenger
        </Sidebar.Item>
        <Sidebar.Item href="/search" icon={<SearchIcon />}>
          Search
        </Sidebar.Item>

        <Sidebar.Item href="/stats" icon={<StatsIcon />} className={s.groupIndent}>
          Statistics
        </Sidebar.Item>
        <Sidebar.Item href="/favorites" icon={<FavoriteIcon />} activeIcon={<FavoriteActiveIcon />}>
          Favorites
        </Sidebar.Item>

        <Sidebar.Item href="#" onClick={() => setIsLogoutModalOpen(true)} icon={<LogoutIcon />} className={s.logout}>
          Log Out
        </Sidebar.Item>
      </Sidebar>

      {isLogoutModalOpen && <LogOutModal userId={'123'} onClose={() => setIsLogoutModalOpen(false)} />}
    </>
  )
}
