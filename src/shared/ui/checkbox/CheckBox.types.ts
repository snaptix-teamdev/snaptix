import { InputHTMLAttributes, ReactNode } from 'react'

export type CheckBoxProps = {
  label?: ReactNode
  error?: string
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>
