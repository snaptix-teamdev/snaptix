'use client'

import * as Popover from '@radix-ui/react-popover'
import { DateRange, DayPicker } from 'react-day-picker'
import { useState } from 'react'
import { format } from 'date-fns'
import s from './DatePicker.module.css'
import 'react-day-picker/dist/style.css'
import { ru, enUS, Locale } from 'date-fns/locale' //TODO вынести, если/когда будем менять язык ?
import { CalendarIcon, CalendarOutlineIcon } from '../svg/Icon'

type LocalLanguage = 'ru' | 'en'

const ERROR_MESSAGES: Record<LocalLanguage, string> = {
  ru: 'Ошибка!',
  en: 'Error!',
}

const DATE_FNS_LOCALES: Record<LocalLanguage, Locale> = {
  ru: ru,
  en: enUS,
}

const getCommonProps = (localeKey: LocalLanguage) => {
  const locale = DATE_FNS_LOCALES[localeKey]

  return {
    locale,
    className: s.myCalendar,
    showOutsideDays: true,
    formatters: {
      formatCaption: (date: Date) => {
        const formatted = format(date, 'LLLL yyyy', { locale })
        return formatted.charAt(0).toUpperCase() + formatted.slice(1)
      },
    },
    modifiers: {
      weekend: (date: Date) => date.getDay() === 0 || date.getDay() === 6,
      weekday: (date: Date) => date.getDay() >= 1 && date.getDay() <= 5,
    },
    modifiersClassNames: {
      today: s.today,
      selected: s.selectedDay,
      weekend: s.weekendDay,
      weekday: s.weekdayDay,
      outside: s.outsideDay,
      range_start: s.rangeStart,
      range_end: s.rangeEnd,
      range_middle: s.rangeMiddle,
    },
  }
}

export type DatePickerProps = {
  mode?: 'single' | 'range'
  value?: Date | DateRange
  onChange?: (date: Date | DateRange) => void
  error?: boolean
  errorText?: string
  locale?: LocalLanguage
  disabled?: boolean
}

export function DatePicker({
  value,
  onChange,
  mode = 'single',
  error,
  errorText,
  locale = 'ru',
  disabled = false,
}: DatePickerProps) {
  const [date, setDate] = useState<Date | DateRange | undefined>(value) //?? new Date()
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (date: Date | DateRange | undefined) => {
    if (!date) return

    setDate(date)
    onChange?.(date)
    // setIsOpen(false)
  }

  const formatValue = () => {
    if (mode === 'single') {
      return format((date as Date) ?? new Date(), 'dd/MM/yyyy')
    }

    if (mode === 'range') {
      const range = date && typeof date === 'object' && !(date instanceof Date) ? (date as DateRange) : undefined
      const from = format(range?.from ?? new Date(), 'dd/MM/yyyy')
      const to = format(range?.to ?? new Date(), 'dd/MM/yyyy')
      return `${from} - ${to}`
    }
  }

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <div className={`${s.wrapper}  `}>
        <Popover.Trigger asChild>
          <button
            className={`${s.popover} ${error ? s.error : ''} ${disabled ? s.disabled : ''} ${isOpen ? s.open : ''}`}
            disabled={disabled}
          >
            {formatValue()}
            {isOpen ? <CalendarIcon /> : <CalendarOutlineIcon />}
          </button>
        </Popover.Trigger>
        {error && !disabled && <span className={s.errorText}>{errorText ?? ERROR_MESSAGES[locale]}</span>}
      </div>

      <Popover.Content align="start" className={`calendar-popover`}>
        {mode === 'single' ? (
          <DayPicker {...getCommonProps(locale)} mode="single" selected={date as Date} onSelect={handleSelect} />
        ) : (
          <DayPicker {...getCommonProps(locale)} mode="range" selected={date as DateRange} onSelect={handleSelect} />
        )}
      </Popover.Content>
    </Popover.Root>
  )
}
