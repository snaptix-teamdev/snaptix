'use client'

import s from './RadioGroup.module.css'
import type { RadioGroupProps } from './RadioGroup.types'

export const RadioGroup = ({ options, groupLabel, className, disabled, ...rest }: RadioGroupProps) => {
  return (
    <section className={`${s.groupContainer} ${className || ''}`}>
      {groupLabel && <h4 className={s.groupTitle}>{groupLabel}</h4>}

      <div className={s.optionsList}>
        {options.map((option) => (
          <label key={option.value} className={`${s.containerRadio} ${disabled ? s.disabled : ''}`}>
            <input
              {...rest}
              type={'radio'}
              className={s.hidden}
              value={option.value}
              disabled={disabled}
              checked={rest.value === option.value}
            />
            <span className={`${s.customRadio} ${disabled ? s.disabled : ''}`} />
            {option.label && <span className={s.label}>{option.label}</span>}
          </label>
        ))}
      </div>
    </section>
  )
}
