'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useCreateNewPasswordMutation } from '@/fsd-pages/forgot-password/api/hooks/use-create-new-password-mutation'
import { isRecoveryCodeError } from '@/fsd-pages/forgot-password/model/lib/is-recovery-code-error'
import { Button } from '@/shared/ui/button/Button'
import { Input } from '@/shared/ui/input/Input'
import { EyeIcon } from '@/shared/ui/svg/Icon'
import { CreateNewPasswordFormValues, createNewPasswordSchema } from '../model/createNewPasswordSchema'
import s from './CreateNewPasswordForm.module.css'

export const CreateNewPasswordForm = () => {
  const router = useRouter()
  const [serverError, setServerError] = useState('')
  const params = useParams<{ code?: string | string[] }>()
  const searchParams = useSearchParams()
  const codeFromParams = Array.isArray(params.code) ? params.code[0] : params.code
  const recoveryCode = searchParams.get('code') ?? searchParams.get('recoveryCode') ?? codeFromParams

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateNewPasswordFormValues>({
    resolver: zodResolver(createNewPasswordSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const { mutate, isPending } = useCreateNewPasswordMutation()

  const onSubmit = (data: CreateNewPasswordFormValues) => {
    setServerError('')

    if (!recoveryCode) {
      setServerError('Password recovery code is missing')
      return
    }

    mutate(
      {
        password: data.newPassword,
        code: recoveryCode,
      },
      {
        onSuccess: () => {
          router.push('/signIn')
        },
        onError: (error) => {
          if (isRecoveryCodeError(error)) {
            router.push('/password-recovery-expired')
            return
          }

          setServerError(error.errors[0]?.message ?? 'Password reset failed. Please try again.')
        },
      },
    )
  }

  return (
    <form className={s.card} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={s.title}>Create New Password</h2>

      <Input
        label="New password"
        type="password"
        rightIcon={EyeIcon}
        rightIconClickable
        placeholder="New password"
        autoComplete="new-password"
        {...register('newPassword')}
        error={errors.newPassword?.message}
      />

      <Input
        label="Password confirmation"
        type="password"
        rightIcon={EyeIcon}
        rightIconClickable
        placeholder="Password confirmation"
        autoComplete="new-password"
        {...register('passwordConfirmation')}
        error={errors.passwordConfirmation?.message}
      />

      <p className={s.hint}>Your password must be between 6 and 20 characters</p>

      {serverError && <p className={s.serverError}>{serverError}</p>}

      <Button variant="primary" type="submit" disabled={!isValid || isPending}>
        {isPending ? 'Creating...' : 'Create new password'}
      </Button>
    </form>
  )
}
