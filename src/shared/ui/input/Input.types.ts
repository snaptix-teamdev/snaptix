import React, { InputHTMLAttributes, ReactNode } from 'react'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string | ReactNode
  rightIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  leftIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  error?: string
  rightIconClickable?: boolean
}
