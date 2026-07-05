'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Dictionary } from './dictionaries'
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME, isValidLocale, type Locale } from './config'
import ru from './dictionaries/ru'
import en from './dictionaries/en'

// Словари — обычные объекты, поэтому их можно держать на клиенте и переключать
// синхронно, без сетевого дозапроса. Локаль определяется на клиенте (как auth),
// что позволяет публичным страницам оставаться статическими (SSG/ISR).
const DICTIONARIES: Record<Locale, Dictionary> = { ru, en }

type TranslationsContextValue = {
  dict: Dictionary
  locale: Locale
  setLocale: (locale: Locale) => void
}

const TranslationsContext = createContext<TranslationsContextValue | null>(null)

const readLocaleFromCookie = (): Locale | null => {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${LOCALE_COOKIE_NAME}=([^;]*)`))
  if (!match) return null
  const decoded = decodeURIComponent(match[1])
  return isValidLocale(decoded) ? decoded : null
}

const detectBrowserLocale = (): Locale | null => {
  if (typeof navigator === 'undefined') return null
  return navigator.language.toLowerCase().startsWith('ru') ? 'ru' : 'en'
}

const writeLocaleCookie = (locale: Locale) => {
  document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`
}

export const TranslationsProvider = ({ children }: { children: React.ReactNode }) => {
  // Первый рендер (SSR + гидрация) — всегда дефолтная локаль, чтобы разметка
  // сервера и клиента совпадала. Реальную локаль применяем после монтирования.
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)

  useEffect(() => {
    // Локаль читается из cookie/браузера — источников, доступных только после
    // монтирования. Применяем её через setState в эффекте намеренно: так первый
    // клиентский рендер совпадает с SSR (дефолтная локаль), и нет hydration-
    // мисматча. Это ровно кейс синхронизации с внешним состоянием.
    const detected = readLocaleFromCookie() ?? detectBrowserLocale()
    if (detected && detected !== DEFAULT_LOCALE) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocaleState(detected)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo<TranslationsContextValue>(
    () => ({
      dict: DICTIONARIES[locale],
      locale,
      setLocale: (next: Locale) => {
        writeLocaleCookie(next)
        setLocaleState(next)
      },
    }),
    [locale],
  )

  return <TranslationsContext.Provider value={value}>{children}</TranslationsContext.Provider>
}

export const useTranslations = (): Dictionary => {
  const context = useContext(TranslationsContext)

  if (!context) {
    throw new Error('useTranslations должен использоваться внутри TranslationsProvider')
  }

  return context.dict
}

export const useLocale = () => {
  const context = useContext(TranslationsContext)

  if (!context) {
    throw new Error('useLocale должен использоваться внутри TranslationsProvider')
  }

  return { locale: context.locale, setLocale: context.setLocale }
}