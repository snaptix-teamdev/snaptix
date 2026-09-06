'use client'
import { useMemo } from 'react'
import s from './Devices.module.css'
import { Button } from '@/shared/ui/button/Button'
import { LogoutButton } from '@/shared/ui/logout-button/LogoutButton'
import { useLocale, useTranslations } from '@/shared/lib/i18n/TranslationsProvider'
import { useSecurityDevicesQuery } from '@/fsd-pages/general-information/api/hooks/use-security-devices-query'
import {
  useTerminateAllOtherSessionsMutation,
  useTerminateSessionByDeviceIdMutation,
} from '@/fsd-pages/general-information/api/hooks/use-security-device-mutations'
import { useLogout } from '@/shared/api/logout/hooks/use-logout-mutation'
import type { GetActiveDevicesResponseDto } from '@/fsd-pages/general-information/api'

const formatIp = (ip: string | null) => `IP: ${ip ?? '-'}`

export const Devices = () => {
  const dict = useTranslations()
  const { locale } = useLocale()
  const { data: devices = [], isError, isLoading } = useSecurityDevicesQuery()
  const terminateAllOtherSessions = useTerminateAllOtherSessionsMutation()
  const terminateSessionByDeviceId = useTerminateSessionByDeviceIdMutation()
  const logout = useLogout()

  const dateFormatter = useMemo(() => new Intl.DateTimeFormat(locale), [locale])

  const currentDevice = devices.find((device) => device.isCurrent)
  const activeDevices = devices
  const hasDevices = activeDevices.length > 0
  const hasOtherDevices = devices.some((device) => !device.isCurrent)
  const isMutating = terminateAllOtherSessions.isPending || terminateSessionByDeviceId.isPending || logout.isPending

  const formatLastVisit = (date: string) => {
    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
      return `${dict.settings.lastVisit}: ${date}`
    }

    return `${dict.settings.lastVisit}: ${dateFormatter.format(parsedDate)}`
  }

  const renderDevice = (device: GetActiveDevicesResponseDto) => (
    <div key={device.deviceId} className={s.activeDevice}>
      <div className={s.iconDevice}>{dict.settings.logo}</div>
      <div className={s.wrapperDevices}>
        <span className={s.titleDevice}>{device.title}</span>
        <span className={s.ipDevice}>{formatIp(device.ip)}</span>
        <span className={s.dateDevice}>{formatLastVisit(device.lastActiveDate)}</span>
      </div>
      <LogoutButton
        disabled={isMutating}
        onClick={() => {
          if (device.isCurrent) {
            logout.mutate()
            return
          }

          terminateSessionByDeviceId.mutate(device.deviceId)
        }}
      />
    </div>
  )

  return (
    <div className={s.tabContent}>
      <h3>{dict.settings.currentDevice}</h3>
      <div className={s.currentDevice}>
        <div className={s.logoDevice}>{dict.settings.logo}</div>
        <div className={s.descriptionDevice}>
          {isLoading ? (
            <span className={s.statusText}>{dict.settings.loadingDevices}</span>
          ) : currentDevice ? (
            <>
              <span>{currentDevice.title}</span>
              <span>{formatIp(currentDevice.ip)}</span>
            </>
          ) : (
            <span className={s.statusText}>{dict.settings.noCurrentDevice}</span>
          )}
        </div>
      </div>

      {isError && <p className={s.errorText}>{dict.settings.errorLoadingDevices}</p>}

      <div className={s.terminateButtonWrapper}>
        <Button
          variant="outline"
          width="auto"
          disabled={!hasOtherDevices || isMutating}
          onClick={() => terminateAllOtherSessions.mutate()}
        >
          {dict.settings.terminateAllSessions}
        </Button>
      </div>

      <h3 className={s.sectionTitle}>{dict.settings.activeSessions}</h3>
      <div className={s.deviceList}>
        {isLoading ? (
          <span className={s.notDevices}>{dict.settings.loadingDevices}</span>
        ) : hasDevices ? (
          activeDevices.map(renderDevice)
        ) : (
          <span className={s.notDevices}>{dict.settings.noOtherDevices}</span>
        )}
      </div>
    </div>
  )
}
