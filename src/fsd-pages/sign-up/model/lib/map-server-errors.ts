import { FieldValues, Path, UseFormSetError } from 'react-hook-form'
import type { SignUpErrorDto } from '@/fsd-pages/sign-up/api'

export const mapServerErrors = <T extends FieldValues>(error: SignUpErrorDto, setError: UseFormSetError<T>) => {
  const errors = error?.errors ?? []

  let handled = false

  for (const err of errors) {
    if (err.code === 'USER_EMAIL_ALREADY_EXISTS') {
      setError('email' as Path<T>, { message: 'User with this email is already registered' })
      handled = true
    }
    if (err.code === 'USER_USERNAME_ALREADY_EXISTS') {
      setError('username' as Path<T>, { message: 'User with this username is already registered' })
      handled = true
    }
  }

  if (!handled) {
    setError('root' as Path<T>, { message: 'Something went wrong. Please try again later.' })
  }
}
