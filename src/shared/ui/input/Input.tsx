'use client'

import { useState } from 'react'
import s from './Input.module.css'
import { InputProps } from '@/shared/ui/input/Input.types'
import { EyeIcon, EyeOffIcon } from '@/shared/ui/svg/Icon'

export const Input = ({
  label,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  error,
  rightIconClickable = false,
  type,
  disabled,
  ...rest
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const isPasswordToggle = rightIconClickable && type === 'password'
  const inputType = isPasswordToggle ? (showPassword ? 'text' : 'password') : type

  // Для поля пароля иконка отражает состояние: скрыт — перечёркнутый глаз, показан — открытый.
  const ResolvedRightIcon = isPasswordToggle ? (showPassword ? EyeIcon : EyeOffIcon) : RightIcon

  const handleRightIconClick = () => {
    if (isPasswordToggle) {
      setShowPassword((prev) => !prev)
    }
  }

  return (
    <div className={s.root}>
      {label && <label className={`${s.label} ${disabled ? s.labelDisabled : ''}`}>{label}</label>}
      <div className={s.control}>
        {LeftIcon && (
          <div className={s.leftIcon}>
            <LeftIcon width={16} height={16} />
          </div>
        )}

        <input
          className={`${s.input} ${LeftIcon ? s.withLeftIcon : ''} ${error ? s.error : ''}`}
          type={inputType}
          disabled={disabled}
          {...rest}
        />

        {ResolvedRightIcon && (
          <button type="button" className={s.rightIcon} onClick={handleRightIconClick}>
            <ResolvedRightIcon width={16} height={16} />
          </button>
        )}
      </div>
      {error && <span className={s.errorText}>{error}</span>}
    </div>
  )
}
