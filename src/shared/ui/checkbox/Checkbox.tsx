import { CheckBoxProps } from '@/shared/ui/checkbox/CheckBox.types'
import { useId } from 'react'
import s from './Checkbox.module.css'
import { Check } from '@/shared/ui/svg/Icon'

export const Checkbox = ({ label, disabled, checked = false, error, ...props }: CheckBoxProps) => {
  const id = useId()
  return (
    <>
      <label htmlFor={id} className={`${s.wrapper} ${disabled ? s.disabled : ''}`}>
        <input id={id} type="checkbox" className={s.input} checked={checked} disabled={disabled} {...props} />
        <span className={s.boxWrapper}>
          <span className={s.box}>{checked && <Check className={s.icon} width={18} height={18} />}</span>
        </span>
        {label && <span className={s.label}>{label}</span>}
      </label>
      {error && <span className={s.errorText}>{error}</span>}
    </>
  )
}
