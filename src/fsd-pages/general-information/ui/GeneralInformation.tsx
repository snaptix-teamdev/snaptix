'use client'

import { useState } from 'react'
import s from './GeneralInformation.module.css'
import { Tabs } from '@/shared/ui/tabs/Tabs'
import { getValidParts } from '../constants/validParts'
import { Devices } from './settings-tabs/devices/Devices'
import { Payments } from './settings-tabs/payments/Payments'
import { Subscriptions } from './settings-tabs/subscriptions/Subscriptions'
import { MainInformation } from './settings-tabs/main-information/MainInformation'
import { useTranslations } from '@/shared/lib/i18n/TranslationsProvider'

type GeneralInformationProps = {
  part?: string
}

export const GeneralInformation = ({ part }: GeneralInformationProps) => {
  console.log(part)
  const dict = useTranslations()
  const [activeTab, setActiveTab] = useState('general')

  const VALID_PARTS = getValidParts(dict)

  const renderContent = () => {
    switch (activeTab) {
      case 'devices':
        return <Devices />

      case 'account':
        return <Subscriptions />

      case 'payments':
        return <Payments />

      case 'general':
      default:
        return <MainInformation />
    }
  }

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }

  return (
    <div className={s.wrapper}>
      <div className={s.informationBlockWrapper}>
        <div className={s.tabs}>
          <Tabs tabs={VALID_PARTS} activeTab={activeTab} onChange={handleTabChange} />
        </div>
        {renderContent()}
      </div>
    </div>
  )
}
