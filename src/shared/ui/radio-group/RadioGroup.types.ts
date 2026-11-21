import type { InputHTMLAttributes } from 'react'

export type RadioOption = {
  label: string
  value: string | number
}

export type RadioGroupProps = InputHTMLAttributes<HTMLInputElement> & {
  options: RadioOption[]
  groupLabel?: string
}
