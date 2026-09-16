'use client'

import { type ChangeEvent, useEffect, useRef } from 'react'

import s from './TextArea.module.css'
import type { TextAreaProps } from './TextArea.types'

export const TextArea = ({
  className,
  placeholder,
  error,
  disabled,
  value,
  onValueChangeAction,
  maxLength,
}: TextAreaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = () => {
    const element = textareaRef.current
    if (element) {
      element.style.height = 'auto'
      element.style.height = `${element.scrollHeight}px`
    }
  }

  useEffect(() => {
    adjustHeight()
  }, [value])

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    if (maxLength && text.length <= maxLength) {
      onValueChangeAction(text)
    }
  }

  const textAreaClassName = `${s.textArea} ${error ? s.error : ''} ${className || ''}`

  return (
    <div className={s.containerArea}>
      <textarea
        disabled={disabled}
        className={textAreaClassName}
        ref={textareaRef}
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      {error && <span className={s.errorMessage}>{error}</span>}
    </div>
  )
}
