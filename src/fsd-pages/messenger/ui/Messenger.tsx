'use client'
import s from './Messenger.module.css'
import { Input } from '@/shared/ui/input/Input'
import { SearchIcon } from '@/shared/ui/svg/Icon'

export const Messenger = () => {
  return (
    <section className={s.container}>
      <h2>Messenger</h2>
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
