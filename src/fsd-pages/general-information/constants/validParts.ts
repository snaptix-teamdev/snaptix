import type { Dictionary } from '@/shared/lib/i18n/dictionaries'

// Функция для получения переведённых вкладок
export const getValidParts = (dict: Dictionary) => [
  {
    id: 'general',
    label: dict.settings.generalInformation,
  },
  {
    id: 'devices',
    label: dict.settings.devices,
  },
  {
    id: 'account',
    label: dict.settings.accountManagement,
  },
  {
    id: 'payments',
    label: dict.settings.myPayments,
  },
]

// Функция для получения переведённых типов подписки
export const getTypeSubscription = (dict: Dictionary) => [
  { label: dict.settings.personal, value: 'personal' },
  { label: dict.settings.business, value: 'business' },
]

// Функция для получения переведённых стоимостей подписки
export const getSubscriptionCosts = (dict: Dictionary) => [
  { label: dict.settings.oneDay, value: 'oneDay' },
  { label: dict.settings.sevenDays, value: 'sevenDays' },
  { label: dict.settings.month, value: 'month' },
]
