export type TextAreaProps = {
  value: string
  onValueChangeAction: (value: string) => void
  id?: string
  placeholder?: string
  className?: string
  error?: string
  disabled?: boolean
  maxLength?: number
}
