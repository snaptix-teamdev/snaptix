'use client'
import s from './Search.module.css'
import { useTranslations } from '@/shared/lib/i18n/TranslationsProvider'

export const Search = () => {
  const dict = useTranslations()
  return (
    <section className={s.container}>
      <div>
        <h2>{dict.search.title}</h2>
      </div>
    </section>
  )
}
