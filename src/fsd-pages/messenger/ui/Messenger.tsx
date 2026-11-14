'use client'
import s from './Messenger.module.css'
import { Input } from '@/shared/ui/input/Input'
import { SearchIcon } from '@/shared/ui/svg/Icon'
import { useTranslations } from '@/shared/lib/i18n/TranslationsProvider'

export const Messenger = () => {
  const dict = useTranslations()

  return (
    <section className={s.container}>
      <h2>{dict.messenger.title}</h2>
      <div className={s.messengerWrapper}>
        <div className={s.messengerHeader}>
          <div className={s.searchWrapper}>
            <div>
              <Input leftIcon={SearchIcon} placeholder="Input search" style={{ width: '245px' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
