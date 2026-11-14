export type Locale = 'ru' | 'en'

export const DEFAULT_LOCALE: Locale = 'ru'

export const LOCALE_COOKIE_NAME = 'locale'

export const locales: Locale[] = ['ru', 'en']

// Вспомогательная функция для проверки, является ли строка валидным языком
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}
