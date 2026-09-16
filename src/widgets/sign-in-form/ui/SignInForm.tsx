'use client'

import { Input } from '@/shared/ui/input/Input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/shared/ui/button/Button'
import { EyeIcon } from '@/shared/ui/svg/Icon'
import { OAuthButtons } from '@/shared/ui/oauth/OAuthButtons'
import { type SignInFormValues, signInSchema } from '@/widgets/sign-in-form/model/signInSchema'

import s from './SignInForm.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSignInMutation } from '@/fsd-pages/sign-in/api/hooks/use-sign-in-mutations'
import { mapLoginServerErrors } from '@/fsd-pages/sign-in/model/lib/map-login-server-errors'
import { setAuthAction } from '@/app/actions/actions'
import { useTranslations } from '@/shared/lib/i18n/TranslationsProvider'
import { useQueryClient } from '@tanstack/react-query'

export const SignInForm = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  // Получаем переводы
  const dict = useTranslations()

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isValid },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const { mutate, isPending } = useSignInMutation({
    onSuccess: async (data) => {
      await setAuthAction(data.accessToken)
      queryClient.invalidateQueries({ queryKey: ['auth', 'status'] })
      reset()
      router.push('/profile')
    },
    onError: (error) => mapLoginServerErrors(error, setError),
  })

  const onSubmit = (data: SignInFormValues) => mutate(data)

  return (
    <form className={s.container} onSubmit={handleSubmit(onSubmit)}>
      <section className={s.header}>
        <h2>{dict.signIn.title}</h2>
      </section>
      <OAuthButtons />
      <Input
        label={dict.signIn.emailLabel}
        type="email"
        placeholder={dict.signIn.emailPlaceholder}
        autoComplete="email"
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        label={dict.signIn.passwordLabel}
        rightIcon={EyeIcon}
        type="password"
        rightIconClickable={true}
        placeholder={dict.signIn.passwordPlaceholder}
        autoComplete="new-password"
        {...register('password')}
        error={errors.password?.message}
      />
      <section className={s.buttons}>
        <Link className={s.forgot} href="/forgot-password">
          {dict.signIn.forgotPassword}
        </Link>
        <Button variant={'primary'} type="submit" disabled={!isValid || isPending}>
          {dict.signIn.submitButton}
        </Button>
        <p>{dict.signIn.noAccount}</p>
        <Link href="/signup">
          <Button variant={'ghost'}>{dict.signIn.signUpButton}</Button>
        </Link>
      </section>
    </form>
  )
}
