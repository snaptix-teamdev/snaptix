import { Bell } from '@/shared/ui/svg/Icon'
import s from './NotificationBell.module.css'

// это массив сообщений
const unreadMessages = ['msg1', 'msg2', 'msg3', 'msg4']

export const NotificationBell = () => {
  const count = unreadMessages.length

  return (
    <div className={s.notificationWrapper}>
      <Bell className={s.bellIcon} />

      {count > 0 && <span className={s.badge}>{count}</span>}
    </div>
  )
}
