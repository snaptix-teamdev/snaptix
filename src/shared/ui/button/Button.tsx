import { ReactNode } from 'react'
import s from './Button.module.css'
import { ButtonProps } from '@/shared/ui/button/Button.types'

type Props = ButtonProps & {
  children?: ReactNode
}

export const Button = ({
  children,
  variant = 'primary',
  leftIcon,
  className = '',
  disabled,
  onClick,
  width = 'full',
  ...props
}: Props) => {
  const widthClass = width === 'auto' ? s.autoWidth : ''
  const classes = [s.button, s[variant], widthClass, disabled ? s.disabled : '', className].filter(Boolean).join(' ')

  return (
    <button className={classes} disabled={disabled} onClick={onClick} {...props}>
      {leftIcon && <span className={s.icon}>{leftIcon}</span>}
      <span>{children}</span>
    </button>
  )
}
