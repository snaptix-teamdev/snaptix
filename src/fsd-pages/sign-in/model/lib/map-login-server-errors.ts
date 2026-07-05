import { FieldValues, Path, UseFormSetError } from 'react-hook-form'
import type { LoginErrorDto } from '@/fsd-pages/sign-in/api/dto'

export const mapLoginServerErrors = <T extends FieldValues>(error: LoginErrorDto, setError: UseFormSetError<T>) => {
  const firstError = error?.errors?.[0]

  if (firstError?.code === 'UNAUTHORIZED') {
    setError('email' as Path<T>, { message: 'Incorrect email or password' })
    setError('password' as Path<T>, { message: 'Incorrect email or password' })
    return
  }

  setError('root' as Path<T>, { message: 'Something went wrong. Please try again later.' })
}
