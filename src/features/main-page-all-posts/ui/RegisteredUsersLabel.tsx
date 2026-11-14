'use client'

import { useTranslations } from '@/shared/lib/i18n/TranslationsProvider'

// Подпись счётчика — единственный переводимый текст на главной. Локаль живёт на
// клиенте, поэтому подпись рендерится клиентским компонентом, а сами данные
// (посты и счётчик) остаются серверными (SSG).
export const RegisteredUsersLabel = () => {
  const dict = useTranslations()

  return <h2>{dict.mainPage.registeredUsers}</h2>
}