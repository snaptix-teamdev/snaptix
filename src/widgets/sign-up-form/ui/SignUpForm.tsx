'use client'
import { Input } from '@/shared/ui/input/Input'
import s from './SignUpForm.module.css'
import { Checkbox } from '@/shared/ui/checkbox/Checkbox'
import { useForm } from 'react-hook-form'
import { SignUpFormValues, signUpSchema } from '@/widgets/sign-up-form/model/signUpSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/shared/ui/button/Button'
import { EyeIcon } from '@/shared/ui/svg/Icon'
import { OAuthButtons } from '@/shared/ui/oauth/OAuthButtons'
import { useSignUpMutation } from '@/fsd-pages/sign-up/api/hooks/use-sign-up-mutations'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { mapServerErrors } from '@/fsd-pages/sign-up/model/lib/map-server-errors'
import { Modal } from '@/shared/ui/modalsPost/Modal'

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    reset,
    setError,
    formState: { errors, isValid },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      agree: false,
    },
  })
  const [showModal, setShowModal] = useState(false)
  const [registeredEmail, setRegisteredEmail] = useState('')

  const router = useRouter()
  const { mutate, isPending } = useSignUpMutation({
    onSuccess: () => {
      // getValues (не реактивный watch) — читаем email до reset(); совместимо с
      // React Compiler, который не может безопасно мемоизировать watch().
      setRegisteredEmail(getValues('email'))
      reset()
      setShowModal(true)
    },
    onError: (error) => {
      mapServerErrors(error, setError)
    },
  })

  // watch — реактивная подписка на чекбокс (нужна для checked и disabled кнопки).
  // React Compiler не может мемоизировать react-hook-form watch(); это известное
  // ограничение библиотеки, а не баг, поэтому подавляем предупреждение точечно.
  // eslint-disable-next-line react-hooks/incompatible-library
  const agreeValue = watch('agree')

  const onSubmit = (data: SignUpFormValues) => {
    mutate({
      username: data.username,
      email: data.email,
      password: data.password,
    })
  }

  return (
    <>
      <form className={s.container} onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign Up</h2>
        <OAuthButtons />
        <Input
          label="Username"
          type="text"
          placeholder="Username"
          {...register('username')}
          error={errors.username?.message}
        />
        <Input
          label="Email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          rightIcon={EyeIcon}
          type="password"
          rightIconClickable={true}
          placeholder="Password"
          autoComplete="new-password"
          {...register('password')}
          error={errors.password?.message}
        />
        <Input
          label="Password confirmation"
          type="password"
          rightIcon={EyeIcon}
          placeholder="Password confirmation"
          rightIconClickable={true}
          autoComplete="new-password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
        <Checkbox
          {...register('agree')}
          checked={agreeValue}
          label={
            <span className={s.agreeLabel}>
              I agree to the{' '}
              <a href="/terms-of-service" onClick={(e) => e.stopPropagation()}>
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy-policy" onClick={(e) => e.stopPropagation()}>
                Privacy Policy
              </a>
            </span>
          }
          error={errors.agree?.message}
        />
        <Button variant={'primary'} type="submit" disabled={!isValid || !agreeValue || isPending}>
          {isPending ? 'Loading...' : 'Sign Up'}
        </Button>
        <p>Do you have an account?</p>
        <Button variant={'ghost'} onClick={() => router.push('/signIn')}>
          Sign In
        </Button>
      </form>
      {showModal && (
        <Modal
          open={showModal}
          title={'Email sent'}
          onOpenChangeAction={setShowModal}
          footer={
            <Button width={'auto'} variant={'primary'} onClick={() => setShowModal(false)}>
              OK
            </Button>
          }
        >
          <p>We have sent a link to confirm your email to {registeredEmail}</p>
        </Modal>
      )}
    </>
  )
}
