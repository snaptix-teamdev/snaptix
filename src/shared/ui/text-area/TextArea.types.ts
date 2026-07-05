export type TextAreaProps = {
  value: string
  onValueChangeAction: (value: string) => void
  placeholder?: string
  className?: string
  error?: string
  disabled?: boolean
  maxLength?: number
}
