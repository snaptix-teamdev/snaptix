'use client'
import s from './Devices.module.css'
import { Button } from '@/shared/ui/button/Button'
import { LogoutButton } from '@/shared/ui/logout-button/LogoutButton'
import { useTranslations } from '@/shared/lib/i18n/TranslationsProvider'

const DEVICE_LIST = [
  {
    id: 1,
    icon: '',
    title: 'Apple iMac 27',
    ip: 'IP: 22.345.345.12',
    date: 'Last visit: 22.09.2022',
  },
  {
    id: 2,
    icon: '',
    title: 'Apple iMac 27',
    ip: 'IP: 22.345.345.12',
    date: 'Last visit: 22.09.2022',
  },
  {
    id: 3,
    icon: '',
    title: 'Apple iMac 27',
    ip: 'IP: 22.345.345.12',
    date: 'Last visit: 22.09.2022',
  },
  {
    id: 4,
    icon: '',
    title: 'Apple iMac 27',
    ip: 'IP: 22.345.345.12',
    date: 'Last visit: 22.09.2022',
  },
]

export const Devices = () => {
  const dict = useTranslations()
  const hasDevices = DEVICE_LIST.length > 0

  return (
    <div className={s.tabContent}>
      <h3>{dict.settings.currentDevice}</h3>
      <div className={s.currentDevice}>
        <div className={s.logoDevice}>{dict.settings.logo}</div>
        <div className={s.descriptionDevice}>
          <span>Chrome</span>
          <span>IP: 22.345.345.12</span>
        </div>
      </div>

      <div className={s.terminateButtonWrapper}>
        <Button
          variant="outline"
          width="auto"
          style={{ visibility: hasDevices ? 'visible' : 'hidden' }}
          disabled={!hasDevices}
        >
          {dict.settings.terminateAllSessions}
        </Button>
      </div>

      <h3 className={s.sectionTitle}>{dict.settings.activeSessions}</h3>
      <div className={s.deviceList}>
        {hasDevices ? (
          DEVICE_LIST.map((d) => {
            return (
              <div key={d.id} className={s.activeDevice}>
                <div className={s.iconDevice}>icon</div>
                <div className={s.wrapperDevices}>
                  <span className={s.titleDevice}>{d.title}</span>
                  <span className={s.ipDevice}>{d.ip}</span>
                  <span className={s.dateDevice}>{d.date}</span>
                </div>
                <LogoutButton />
              </div>
            )
          })
        ) : (
          <span className={s.notDevices}>{dict.settings.noOtherDevices}</span>
        )}
      </div>
    </div>
  )
}
